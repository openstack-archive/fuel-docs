.. index:: Neutron vs. nova-network, Quantum vs. nova-network

Neutron vs. nova-network
========================

Neutron (formerly Quantum) is a service which provides Networking-as-a-Service 
functionality in OpenStack. It has a rich tenant-facing API for defining network 
connectivity and addressing in the cloud, and gives operators the ability to 
leverage different networking technologies to power their cloud networking.

There are various deployment use cases for Neutron. Fuel supports the most 
common of them, called Provider Router with Private Networks. It provides each 
tenant with one or more private networks, which can communicate with the outside 
world via a Neutron router.

Neutron is not, however, required in order to run an OpenStack environment. If 
you don't need (or want) this added functionality, it's perfectly acceptable to 
continue using nova-network.

In order to deploy Neutron, you need to enable it in the Fuel configuration. 
Fuel will then set up an additional node in the OpenStack installation to act 
as an L3 router, or, depending on the configuration options you've chosen, 
install Neutron on the controllers.


Terminology
-----------

* **Public network** network used for Internet access to all nodes.
  This network also may be called “external”.
* **Floating IP network** subnet (always part of public network), that
  is allocated for access to the internet for each tenant. The local router or 
  DHCP server directly assigns IP addresses for this network. If a tenant delegate 
  floating-ip address to tenant IP address got from here.
* **Private network** network, that used for pass tenant private traffic.
* **Admin network** network, used for PXE booting and communicating 
  between Fuel Node and each cluster node.
* **Storage network** network, used for communicating between storage nodes 
  (using Ceph, swift, or cinder) and compute nodes.
* **Router** virtual neutron router.
* **NIC** network interface card (ethernet adapter).

Overview
--------
Openstack networking with Neutron (Quantum) has some differences from 
Nova-network. Neutron is able to virtualize and manage both layer 2 (logical) 
and layer 3 (network) of the OSI network model, as compared to simple layer 3 
virtualization provided by nova-network. This is the main difference between 
the two networking models for OpenStack. Virtual networks (one or more) can be 
created for a single tenant, forming an isolated L2 network called a 
"private network." Each private network can support one or many IP subnets.
Private networks can be segmented using two different technologies:

* **VLAN segmentation** Isolated tenant "private network" traffic is managed by 
Neutron by the use of a dedicated network adapter. This network adapter must be 
attached to an untagged network segment. This network segment also must be 
reserved only for Neutron on each host (Computes and Controllers). You should 
not use any other 802.1q VLANs on this network for other purposes. 
Additionally, each private network requires its own dedicated VLAN, selected 
from a given range configured in Fuel UI. 

* **GRE segmentation** In this mode of operation, Neutron does not
require a dedicated network adapter. Neutron builds a mesh of GRE tunnels from
each compute node and controller nodes to every other node. Private networks
for each tenant make use of this mesh for isolated traffic. Additionally, your
Public network should remain untagged if you consolidate all Neutron traffic to
one NIC.

Some networks may be 802.1q networks and based on one NIC. But Administrative 
and Private (if you use VLAN-segmentation) networks must placed on dedicated 
NIC. Also recommended make Public network as untagged, if you union some 
networks by 801.1q to one NIC.

Commonly, network map for VLAN mode may be looked as:

.. image:: /_images/Neutron_32_gre_v2.png
  :align: center


Commonly, network map for GRE mode may be looked as:

.. image:: /_images/Neutron_32_vlan_v2.png
  :align: center
  
The most likely configuration for different number NICs on cluster nodes:

+------+----------------------------------------+----------------------------------------+ 
| NICs | VLAN                                   |                        GRE             | 
+======+========================================+========================================+ 
|   2  |  Not supported                         | .. image:: /_images/q32_gre_2nic.svg   | 
|      |                                        |    :align: center                      |
+------+----------------------------------------+----------------------------------------+
|   3  | .. image:: /_images/q32_vlan_3nic.svg  | .. image:: /_images/q32_gre_3nic.svg   |
|      |    :align: center                      |    :align: center                      |
+------+----------------------------------------+----------------------------------------+
|   4  | .. image:: /_images/q32_vlan_4nic.svg  | .. image:: /_images/q32_gre_4nic.svg   |
|      |    :align: center                      |    :align: center                      |
+------+----------------------------------------+----------------------------------------+


Known limitations
-----------------

* You need not less two network cards per node for deploy OpenStack with 
Neutron/GRE and not less three network cards -- for Neutron/VLAN.

* After installation you have no reserved floating-ip for admin tenant. It not 
need for outcoming connectivity to internet, but need for receive incoming 
requests from there. Cluster administrator should to create floating IP pool. 
After that in tenant appear pool of floating-ip addresses. For add floating-ip 
address to tenant you should to execute following commands:

| get admin credentials:
| # source /root/openrc
| get admin tenant-ID:
| # keystone tenant-list

+----------------------------------+----------+---------+
|                id                |   name   | enabled |
+==================================+==========+=========+
| b796f91df6b84860a7cd474148fb2229 |  admin   |   True  |
+----------------------------------+----------+---------+
| cba7b0ff68ee4985816ac3585c8e23a9 | services |   True  |
+----------------------------------+----------+---------+

| create floating-ip for admin tenant:
| # quantum floatingip-create --tenant-id=b796f91df6b84860a7cd474148fb2229 net04_ext


FAQ
---

| Q: For demo purpose I try deploy FUEL with Neutron configured on on Virtualbox,
     but deployment failed.
| A: You should to choose ”Allow all” promiscuous mode on all network 
     interfaces in VirtualBox and modify the network cards to use the PCnet 
     PCI II model network card.


