.. raw:: pdf

   PageBreak

.. index:: HA with Pacemaker and Corosync

How HA with Pacemaker and Corosync Works
========================================

.. index:: Corosync Settings

Corosync Settings
-----------------

Corosync is using Totem protocol which is an implementation of Virtual Synchrony 
protocol. It uses it in order to provide connectivity between cluster nodes, 
decide if cluster is quorate to provide services, to provide data layer for 
services that want to use features of Virtual Synchrony.

Corosync is used in Fuel as communication and quorum service for Pacemaker 
cluster resource manager (`crm`). It's main configuration file is located in 
``/etc/corosync/corosync.conf``.

The main Corosync section is ``totem`` section which describes how cluster nodes 
should communicate::

  totem {
    version:                             2
    token:                               3000
    token_retransmits_before_loss_const: 10
    join:                                60
    consensus:                           3600
    vsftype:                             none
    max_messages:                        20
    clear_node_high_bit:                 yes
    rrp_mode:                            none
    secauth:                             off
    threads:                             0
    interface {
      ringnumber:  0
      bindnetaddr: 10.107.0.8
      mcastaddr:   239.1.1.2
      mcastport:   5405
    }
  }

Corosync usually uses multicast UDP transport and sets "redundant ring" for 
communication. Currently Fuel deploys controllers with one redundant ring. Each 
ring has it’s own multicast address and bind net address that specifies on which 
interface Corosync should join corresponding multicast group. Fuel uses default 
Corosync configuration, which can also be altered in Fuel manifests.

.. seealso:: ``man corosync.conf`` or Corosync documentation at 
  http://clusterlabs.org/doc/ if you want to know how to tune installation 
  completely

.. index:: Pacemaker Settings

Pacemaker Settings
------------------

Pacemaker is the cluster resource manager used by Fuel to manage Quantum 
resources, HAProxy, virtual IP addresses and MySQL Galera (or simple MySQL 
Master/Slave replication in case of RHOS installation) cluster. It is done by 
use of Open Cluster Framework (see http://linux-ha.org/wiki/OCF_Resource_Agents) 
agent scripts which are deployed in order to start/stop/monitor Quantum services, 
to manage HAProxy, virtual IP addresses and MySQL replication. These are located 
at ``/usr/lib/ocf/resource.d/mirantis/quantum-agent-[ovs|dhcp|l3]``, 
``/usr/lib/ocf/resource.d/mirantis/mysql``, ``/usr/lib/ocf/resource.d/ocf/haproxy``. 
Firstly, MySQL agent is started, HAproxy and virtual IP addresses are set up. 
Then Open vSwitch and metadata agents are cloned on all the nodes. Then dhcp and 
L3 agents are started and tied together by use of Pacemaker constraints called 
"colocation".

.. seealso:: `Using Rules to Determine Resource 
   Location <http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html/Pacemaker_Explained/_using_rules_to_determine_resource_location.html>`_

MySQL HA script primarily targets to the cluster rebuild after power failure or 
equal type of disaster - it needs working Corosync in which it forms quorum of 
an epochs of replication and then electing master from node with newest epoch. 
Be aware of default five minute interval in which every cluster member should be 
booted to participate in such election. Every node is a self-aware, that means 
if nobody pushes higher epoch that it retrieved from Corosync (neither no one did), 
it will just elect itself as a master.

.. index:: How Fuel Deploys HA

How Fuel Deploys HA
-------------------

Fuel installs Corosync service, configures ``corosync.conf`` and includes Pacemaker 
service plugin into ``/etc/corosync/service.d``. Then Corosync service starts and 
spawns corresponding Pacemaker processes. Fuel configures cluster properties of 
Pacemaker and then injects resources configuration for virtual IPs, HAProxy, 
MySQL and Quantum agent resources::

  primitive p_haproxy ocf:pacemaker:haproxy \
    op monitor interval="20" timeout="30" \
    op start interval="0" timeout="30" \
    op stop interval="0" timeout="30"
  primitive p_mysql ocf:mirantis:mysql \
    op monitor interval="60" timeout="30" \
    op start interval="0" timeout="450" \
    op stop interval="0" timeout="150"
  primitive p_quantum-dhcp-agent ocf:mirantis:quantum-agent-dhcp \
    op monitor interval="20" timeout="30" \
    op start interval="0" timeout="360" \
    op stop interval="0" timeout="360" \
    params tenant="services" password="quantum" username="quantum" \
    os_auth_url="http://10.107.2.254:35357/v2.0" \
    meta is-managed="true"
  primitive p_quantum-l3-agent ocf:mirantis:quantum-agent-l3 \
    op monitor interval="20" timeout="30" \
    op start interval="0" timeout="360" \
    op stop interval="0" timeout="360" \
    params tenant="services" password="quantum" syslog="true" username="quantum" \
    debug="true" os_auth_url="http://10.107.2.254:35357/v2.0" \
    meta is-managed="true" target-role="Started"
  primitive p_quantum-metadata-agent ocf:mirantis:quantum-agent-metadata \
    op monitor interval="60" timeout="30" \
    op start interval="0" timeout="30" \
    op stop interval="0" timeout="30"
  primitive p_quantum-openvswitch-agent ocf:pacemaker:quantum-agent-ovs \
    op monitor interval="20" timeout="30" \
    op start interval="0" timeout="480" \
    op stop interval="0" timeout="480"
  primitive vip__management_old ocf:heartbeat:IPaddr2 \
    op monitor interval="2" timeout="30" \
    op start interval="0" timeout="30" \
    op stop interval="0" timeout="30" \
    params nic="br-mgmt" iflabel="ka" ip="10.107.2.254"
  primitive vip__public_old ocf:heartbeat:IPaddr2 \
    op monitor interval="2" timeout="30" \
    op start interval="0" timeout="30" \
    op stop interval="0" timeout="30" \
    params nic="br-ex" iflabel="ka" ip="172.18.94.46"
  clone clone_p_haproxy p_haproxy \
    meta interleave="true"
  clone clone_p_mysql p_mysql \
    meta interleave="true" is-managed="true"
  clone clone_p_quantum-metadata-agent p_quantum-metadata-agent \
    meta interleave="true" is-managed="true"
  clone clone_p_quantum-openvswitch-agent p_quantum-openvswitch-agent \
    meta interleave="true"

And ties them with Pacemaker colocation resource::

  colocation dhcp-with-metadata inf: p_quantum-dhcp-agent \
    clone_p_quantum-metadata-agent
  colocation dhcp-with-ovs inf: p_quantum-dhcp-agent \
    clone_p_quantum-openvswitch-agent
  colocation dhcp-without-l3 -100: p_quantum-dhcp-agent p_quantum-l3-agent
  colocation l3-with-metadata inf: p_quantum-l3-agent clone_p_quantum-metadata-agent
  colocation l3-with-ovs inf: p_quantum-l3-agent clone_p_quantum-openvswitch-agent
  order dhcp-after-metadata inf: clone_p_quantum-metadata-agent p_quantum-dhcp-agent
  order dhcp-after-ovs inf: clone_p_quantum-openvswitch-agent p_quantum-dhcp-agent
  order l3-after-metadata inf: clone_p_quantum-metadata-agent p_quantum-l3-agent
  order l3-after-ovs inf: clone_p_quantum-openvswitch-agent p_quantum-l3-agent

