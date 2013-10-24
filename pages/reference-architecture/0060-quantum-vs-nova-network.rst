.. index:: Neutron vs. nova-network, Quantum vs. nova-network

Neutron vs. Nova Network
========================

Terminology
-----------

* **Public network** (also known as External network) used for Internet 
  access for all nodes.
* **Floating IP network** subnet within public network allocated for tenant 
  Internet access. A Neutron server directly assigns IP addresses for this network.
  If a user delegates a floating IP address to an instance, an IP address will 
  be assigned from this subnet (by SNAT/DNAT).
* **Private network** used for passing tenant private traffic.
* **Admin network** shared network between Fuel Master and all nodes in the 
  cluster for PXE installation and orchestration of environment for deployment.
* **Storage network** network used for communicating between storage nodes 
  (using Ceph, swift, or cinder) and compute nodes.
* **Management network** (also known as Internal) used
  for necessary communication between controllers and computes for AMQP
  messaging, DB queries, other inter-controller traffic required for
  supporting services.
* **Router** virtual Neutron router.
* **NIC** network interface card (ethernet adapter).

Overview
--------

With Fuel you can chose between two network providers: Nova Network and Neutron.

Nova Network
------------

Nova Network is based on standart Linux bridges and uses firewall of the host node.
Nova Network was a default network provider in OpenStack before Grizzly release.
It can use two network managers: Flat DHCP Manager and Vlan Manager.

* **Flat DHCP Manager** keeps all tenants in one L2 broadcast segment, so there is nothing
  about security and tenant isolation. If you want to make a quick and simple
  cluster you can use this manager.

* **Vlan Manager** uses VLANs to separate tenants from each other.

Because of Nova Network uses the host node's kernel for an IP routing, 
the IP address spaces inside of tenants can't be intersected.
Also you can not apply restrictions to a tenant's internal traffic at cluster level.
All traffic filtering in Nova Network applies at the border between external network and
tenant's internal network.

Neutron
-------

Neutron (formerly Quantum) is a service which provides Networking-as-a-Service 
functionality in OpenStack. It has a rich tenant-facing API for defining 
network connectivity and addressing in the cloud, and gives operators the 
ability to leverage different networking technologies to power their cloud 
networking.

There are various deployment use cases for Neutron. Fuel supports the most 
common of them, called Per-tenant Routers with Private Networks. 
Each tenant has a virtual Neutron router with one or more private networks,
which can communicate with the outside world. 
This allows full routing isolation for each tenant private network.

Neutron is not, however, required in order to run an OpenStack environment. If 
you don't need (or want) this added functionality, it's perfectly acceptable to 
continue using Nova Network.

In order to deploy Neutron, you need to enable it in the Fuel configuration. 
Fuel sets up Neutron components on each of the controllers to act as a router 
in HA (if deploying in HA mode).

OpenStack networking with Neutron has some differences from 
Nova Network. Neutron is able to virtualize and manage both layer 2 (logical) 
and layer 3 (network) of the OSI network model, as compared to simple layer 3 
virtualization provided by Nova Network. This is the main difference between 
the two networking models for OpenStack. Virtual networks (one or more) can be 
created for a single tenant, forming an isolated L2 network called a 
"private network". Each private network can support one or many IP subnets.
Private networks can be segmented using two different technologies:

* **VLAN segmentation** "Private network" traffic is managed by Neutron
  by the use of a dedicated network adapter. This network segment also must be 
  reserved only for Neutron on each host (Computes and Controllers). 
  Additionally, each private network requires its own dedicated VLAN, selected 
  from a given range configured in Fuel UI. 
* **GRE segmentation** In this mode of operation, Neutron does not
  require a dedicated network adapter. Neutron builds a mesh of GRE tunnels from
  each compute node and controller nodes to every other node. Private networks
  for each tenant make use of this mesh for isolated traffic.
  The good point for using GRE segmentation is when you don't have enough 
  free VLAN ranges in your network backbone or single L2 segment for all nodes
  cannot be established. But GRE processing eats system resources a lot as well
  as network performance.

It is important to note:

* if you use tagged networks for your configuration 
  and combine multiple networks onto one NIC, you should make the Public 
  network untagged on this NIC. 
  It is not a requirement, but best for access to the Openstack Dashboard 
  and public Openstack API.
* Is a best if you place the Private, Admin, Public and Management networks on a 
  separate NIC to ensure that traffic is separated adequately.
* Admin and Private networks must be located on separate NICs from the 
  other networks.

A typical network configuration for Neutron with VLAN segmentation might look
like this:

.. image:: /_images/Neutron_32_vlan_v2.png
  :align: center


A typical network configuration for Neutron with GRE segmentation might look
like this:

.. image:: /_images/Neutron_32_gre_v2.png
  :align: center
  
The most likely configuration for different number NICs on cluster nodes:

+------+----------------------------------------+-------------------------------------------+ 
| NICs | VLAN                                   |                        GRE                | 
+======+========================================+===========================================+ 
|   2  |  Not supported                         | .. image:: /_images/q32_gre_2nic.svg      | 
|      |                                        |    :align: center                         |
|      |                                        |    :width: 500                            |
|      |                                        |    :height: 200                           |
+------+----------------------------------------+-------------------------------------------+
|   3  | .. image:: /_images/q32_vlan_3nic.svg  | .. image:: /_images/q32_gre_3nic.svg      |
|      |    :align: center                      |    :align: center                         |
|      |    :width: 500                         |    :width: 500                            |
|      |    :height: 250                        |    :height: 250                           |
+------+----------------------------------------+-------------------------------------------+
|   4  | .. image:: /_images/q32_vlan_4nic.svg  | .. image:: /_images/q32_gre_4nic.svg      |
|      |    :align: center                      |    :align: center                         |
|      |    :width: 500                         |    :width: 500                            |
|      |    :height: 300                        |    :height: 300                           |
+------+----------------------------------------+-------------------------------------------+


Known limitations
-----------------

* To deploy OpenStack using Neutron with GRE segmentation, each node requires at
least 2 NICs.
* To deploy OpenStack using Neutron with VLAN segmentation, each node requires
at least 3 NICs.

* Neutron will not allocate a floating IP range for your tenants. After each 
  tenant is created, a floating IP range must be created. Note that this does 
  not prevent Internet connectivity for a tenant's instances, but it would 
  prevent them from receiving incoming connections. You, the administrator, 
  should assign a floating IP network for the tenant. Below are steps you can 
  follow to do this:

  ::

    %get admin credentials:
    (bash)# source /root/openrc
    %get admin tenant-ID:
    (bash)# keystone tenant-list
    
    +----------------------------------+----------+---------+
    |                id                |   name   | enabled |
    +==================================+==========+=========+
    | b796f91df6b84860a7cd474148fb2229 |  admin   |   True  |
    +----------------------------------+----------+---------+
    | cba7b0ff68ee4985816ac3585c8e23a9 | services |   True  |
    +----------------------------------+----------+---------+
    
    %create floating-ip for admin tenant:
    (bash)# quantum floatingip-create --tenant-id=b796f91df6b84860a7cd474148fb2229 net04_ext

* You can't combine Private or Admin network with any other networks on one NIC.
* To deploy OpenStack using Neutron with GRE segmentation, each node requires at
  least 2 NICs.
* To deploy OpenStack using Neutron with VLAN segmentation, each node requires
  at least 3 NICs.

FAQ
---

| Q: I tried to deploy a Fuel OpenStack environment on VirtualBox, but the 
     deployment fails on Neutron setup. How do I fix this?
| A: You should to choose ”Allow all” promiscuous mode on all network 
     interfaces in VirtualBox and modify the network cards to use the PCnet 
     PCI II model network card.


