.. index:: HA with Pacemaker and Corosync

HA with Pacemaker and Corosync
==============================

.. index:: Corosync settings

Corosync settings
-----------------

Corosync is using Totem protocol which is an implementation of Virtual Synchrony 
protocol. It uses it in order to provide connectivity between cluster nodes, 
decide if cluster is quorate to provide services, to provide data layer for 
services that want to use features of Virtual Synchrony.

Corosync is used in Fuel as communication and quorum service for Pacemaker 
cluster resource manager. It's main configuration file is located in 
``/etc/corosync/corosync.conf``.

The main corosync section is `totem` section which describes how cluster nodes 
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
interface corosync should join corresponding multicast group. Fuel uses default 
corosync configuration, which can also be altered in Fuel manifests.

.. seealso:: ``man corosync.conf`` or corosync documentation at 
  http://clusterlabs.org/doc/ if you want to know how to tune installation 
  completely

.. index:: Pacemaker settings

Pacemaker settings
------------------

Pacemaker is the cluster resource manager used by Fuel to manage Quantum 
resources, HAProxy, virtual IP addresses and MySQL Galera (or simple MySQL 
Master/slave replication in case of RHOS installation) cluster. It is done by 
use of Open Cluster Framework (see http://linux-ha.org/wiki/OCF_Resource_Agents ) 
agent scripts which are deployed in order to start/stop/monitor Quantum services, 
to manage HAProxy, virtual IP addresses and MySQL replication. These are located 
at ``/usr/lib/ocf/resource.d/mirantis/quantum-agent-[ovs|dhcp|l3]``, 
``/usr/lib/ocf/resource.d/mirantis/mysql``, ``/usr/lib/ocf/resource.d/ocf/haproxy``. 
Firstly, MySQL agent is started, HAproxy  and virtual IP addresses are set up. 
Then Open vSwitch and metadata agents are cloned on all the nodes. Then dhcp and 
L3 agents are started and tied together by use of pacemaker constraints called 
"colocation".

.. seealso:: `Using Rules to Determine Resource 
   Location <http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html/Pacemaker_Explained/_using_rules_to_determine_resource_location.html>`_

MySQL HA script primarily targets to the cluster rebuild after power failure or 
equal type of disaster - it needs working corosync in which it forms quorum of 
an epochs of replication and then electing master from node with newest epoch. 
Be aware of default five minute interval in which every cluster member should be 
booted to participate in such election. Every node is a self-aware, that means 
if nobody pushes higher epoch that it retrieved from corosync(neither no one did), 
it will just elect itself as a master.

.. index:: How Fuel Deploys HA

How Fuel Deploys HA
-------------------

Fuel installs corosync service, configures `corosync.conf` and includes pacemaker 
service plugin into `/etc/corosync/service.d`. Then corosync service starts and 
spawns corresponding pacemaker processes. Fuel configures cluster properties of 
pacemaker and then injects resources configuration for virtual IPs, haproxy, 
mysql and quantum agent resources::

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

And ties them with pacemaker colocation resource::

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

.. index:: HowTo: Troubleshoot Corosync/Pacemaker

How To Troubleshoot Corosync/Pacemaker
--------------------------------------

Pacemaker and Corosync come with several CLI utilities that can help you 
troubleshoot and understand what is going on.

crm - Cluster Resource Manager
++++++++++++++++++++++++++++++

This is the main pacemaker utility it shows you state of pacemaker cluster. 
Several most popular commands that you can use to understand whether your 
cluster is consistent:

**crm status**

This command shows you the main information about pacemaker cluster and state of 
resources being managed::

  crm(live)# status
  ============
  Last updated: Tue May 14 15:13:47 2013
  Last change: Mon May 13 18:36:56 2013 via cibadmin on fuel-controller-01
  Stack: openais
  Current DC: fuel-controller-01 - partition with quorum
  Version: 1.1.6-9971ebba4494012a93c03b40a2c58ec0eb60f50c
  5 Nodes configured, 5 expected votes
  3 Resources configured.
  ============

  Online: [ fuel-controller-01 fuel-controller-02 fuel-controller-03 
  fuel-controller-04 fuel-controller-05 ]

  p_quantum-plugin-openvswitch-agent (ocf::pacemaker:quantum-agent-ovs): Started fuel-controller-01
  p_quantum-dhcp-agent (ocf::pacemaker:quantum-agent-dhcp): Started fuel-controller-01
  p_quantum-l3-agent (ocf::pacemaker:quantum-agent-l3): Started fuel-controller-01

**crm(live)# resource**

Here you can enter resource-specific commands::

  crm(live)resource#  status`

  p_quantum-plugin-openvswitch-agent  (ocf::pacemaker:quantum-agent-ovs) Started 
  p_quantum-dhcp-agent   (ocf::pacemaker:quantum-agent-dhcp) Started 
  p_quantum-l3-agent     (ocf::pacemaker:quantum-agent-l3) Started 

**crm(live)resource#  start|restart|stop|cleanup <resource_name>**

These commands let you correspondingly start, stop, restart resources. 

**cleanup**

Cleanup command cleans resources state on the nodes in case of their failure or 
unexpected operation, e.g. some residuals of SysVInit operation on resource, in 
which case pacemaker will manage it by itself, thus deciding in which node to 
run the resource.

E.g.::

  3 Nodes configured, 3 expected votes
  3 Resources configured.
  ============

  3 Nodes configured, 3 expected votes
  16 Resources configured.


  Online: [ controller-01 controller-02 controller-03 ]

   vip__management_old	(ocf::heartbeat:IPaddr2):   	Started controller-01
   vip__public_old    	(ocf::heartbeat:IPaddr2):   	Started controller-02
   Clone Set: clone_p_haproxy [p_haproxy]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_mysql [p_mysql]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_quantum-openvswitch-agent [p_quantum-openvswitch-agent]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_quantum-metadata-agent [p_quantum-metadata-agent]
    Started: [ controller-01 controller-02 controller-03 ]
   p_quantum-dhcp-agent   (ocf::mirantis:quantum-agent-dhcp): 	Started controller-01
   p_quantum-l3-agent 	(ocf::mirantis:quantum-agent-l3):   	Started controller-03

In this case there were residual OpenStack agent processes that were started by 
pacemaker in case of network failure and cluster partitioning. After the 
restoration of connectivity pacemaker saw these duplicate resources running on 
different nodes. You can let it clean up this situation automatically or, if you 
do not want to wait, cleanup them manually.

.. seealso:: 

  crm interactive help and documentation resources for Pacemaker 
  (e.g. http://doc.opensuse.org/products/draft/SLE-HA/SLE-ha-guide_sd_draft/cha.ha.manual_config.html).

In some network scenarios one can get cluster split into several parts and 
``crm status`` showing something like this::

  On ctrl1
  ============
  ….
  Online: [ ctrl1 ]

  On ctrl2
  ============
  ….
  Online: [ ctrl2 ]

  On ctrl3
  ============
  ….
  Online: [ ctrl3 ]

You can troubleshoot this by checking corosync connectivity between nodes. 
There are several points:

1) Multicast should be enabled in the network, IP address configured as 
   multicast should not be filtered, mcastport and mcasport - 1 udp ports should 
   be accepted on management network between controllers

2) corosync should start after network interfaces are configured

3) `bindnetaddr` should be in the management network or at least in the same 
   multicast reachable segment

You can check this in output of ``ip maddr show``:

.. code-block:: none
   :emphasize-lines: 1,8
  
   5:  br-mgmt
      link  33:33:00:00:00:01
      link  01:00:5e:00:00:01
      link  33:33:ff:a3:e2:57
      link  01:00:5e:01:01:02
      link  01:00:5e:00:00:12
      inet  224.0.0.18
      inet  239.1.1.2
      inet  224.0.0.1
      inet6 ff02::1:ffa3:e257
      inet6 ff02::1

**corosync-objctl**

This command is used to get/set runtime corosync configuration values including 
status of corosync redundant ring members::

  runtime.totem.pg.mrp.srp.members.134245130.ip=r(0) ip(10.107.0.8) 
  runtime.totem.pg.mrp.srp.members.134245130.join_count=1
  ...
  runtime.totem.pg.mrp.srp.members.201353994.ip=r(0) ip(10.107.0.12) 
  runtime.totem.pg.mrp.srp.members.201353994.join_count=1
  runtime.totem.pg.mrp.srp.members.201353994.status=joined


If IP of the node is 127.0.0.1 it means that corosync started when only loopback 
interfaces was available and bound to it.

If there is only one IP in members list that means there is corosync connectivity 
issue because the node does not see the other ones. The same stays for the case 
when members list is incomplete.

.. index:: HowTo: Smoke Test HA

How To Smoke Test HA
--------------------

To test if Quantum HA is working, simply shut down the node hosting, e.g. Quantum 
agents (either gracefully or hardly). You should see agents start on the other node::


  # crm status

  Online: [ fuel-controller-02 fuel-controller-03 fuel-controller-04 fuel-controller-05 ]
  OFFLINE: [ fuel-controller-01 ]

  p_quantum-plugin-openvswitch-agent (ocf::pacemaker:quantum-agent-ovs): Started fuel-controller-02
  p_quantum-dhcp-agent (ocf::pacemaker:quantum-agent-dhcp): Started fuel-controller-02
  p_quantum-l3-agent (ocf::pacemaker:quantum-agent-l3): Started fuel-controller-02

and see corresponding Quantum interfaces on the new Quantum node::

  # ip link show

  11: tap7b4ded0e-cb: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc 
  12: qr-829736b7-34: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc 
  13: qg-814b8c84-8f: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc 

You can also check ``ovs-vsctl show output`` to see that all corresponding 
tunnels/bridges/interfaces are created and connected properly::

  ce754a73-a1c4-4099-b51b-8b839f10291c
    Bridge br-mgmt
        Port br-mgmt
            Interface br-mgmt
                type: internal
        Port "eth1"
            Interface "eth1"
    Bridge br-ex
        Port br-ex
            Interface br-ex
                type: internal
        Port "eth0"
            Interface "eth0"
        Port "qg-814b8c84-8f"
            Interface "qg-814b8c84-8f"
                type: internal
    Bridge br-int
        Port patch-tun
            Interface patch-tun
                type: patch
                options: {peer=patch-int}
        Port br-int
            Interface br-int
                type: internal
        Port "tap7b4ded0e-cb"
            tag: 1
            Interface "tap7b4ded0e-cb"
                type: internal
        Port "qr-829736b7-34"
            tag: 1
            Interface "qr-829736b7-34"
                type: internal
    Bridge br-tun
        Port "gre-1"
            Interface "gre-1"
                type: gre
                options: {in_key=flow, out_key=flow, remote_ip="10.107.0.8"}
        Port "gre-2"
            Interface "gre-2"
                type: gre
                options: {in_key=flow, out_key=flow, remote_ip="10.107.0.5"}
        Port patch-int
            Interface patch-int
                type: patch
                options: {peer=patch-tun}
        Port "gre-3"
            Interface "gre-3"
                type: gre
                options: {in_key=flow, out_key=flow, remote_ip="10.107.0.6"}
        Port "gre-4"
            Interface "gre-4"
                type: gre
                options: {in_key=flow, out_key=flow, remote_ip="10.107.0.7"}
        Port br-tun
            Interface br-tun
                type: internal
    ovs_version: "1.4.0+build0"
 