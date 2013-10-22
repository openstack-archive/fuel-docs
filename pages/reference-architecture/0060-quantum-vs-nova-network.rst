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

* Public network -- network, that gives access to the internet for each node. This network also may be named “external”.
* Floating IP network -- subnet (always part of public network), that used for give access to the internet for each tenant. Each router, that has gateway, take IP address for NAT tenant network from here. If we delegate floating-ip address to tenant -- IP address got from here.
* Private network -- network, that used for pass tenant private traffic.
* Administrative network -- network, used for PXE booting and communicating between Fuel Node and each cluster node.
* Storage network -- network, used for communicating between storage nodes (ceph, swift, cinder) and compute nodes.
* Router -- virtual neutron router.
* NIC -- network interface card (ethernet adapter).

Overview
--------
Openstack networking with Neutron (Quantum) some differences with Nova-Network. Network virtualization in the Neutron  provided on 2nd level OSI (instead 3-d level in nova-network) -- it a main different between old and new openstack networking. Virtual networks (one or more) builds for each tenant. It a L2-networks. This network's usually call “Private-Networks”.  We can use more than one IP subnet over each private-network. On physical level private-networks may segmented by two methods:

* VLAN segmentation mode. For isolating tenants network private traffic Neutron will be use dedicated network adapter. Connected to dedicated untagged network segment. No other network can't share this network adapter. Even 802.1q vlans. For each private network Neutron select vlan-id (from given range) and use one vlan for one private network. You network hardware must pass 802.1q traffic between all compute and controller nodes.

* GRE segmentation mode. In this operation mode no need dedicated network adapter. Neutron build mesh of GRE tunnels from each to each compute and controller nodes. For isolating tenants network private traffic Neutron use virtual networks above this mesh.
Some networks may be 802.1q networks and based on one NIC. But Administrative and Private (if you use VLAN-segmentation) networks must placed on dedicated NIC. Also recommended make Public network as untagged, if you union some networks by 801.1q to one NIC.

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

* You need not less two network cards per node for deploy OpenStack with Neutron/GRE and not less three network cards -- for Neutron/VLAN.

* After installation you have no reserved floating-ip for admin tenant. It not need for outcoming connectivity to internet, but need for receive incoming requests from there. Cluster administrator should to create floating IP pool. After that in tenant appear pool of floating-ip addresses. For add floating-ip address to tenant you should to execute following commands:

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

| Q: For demo purpose I try deploy FUEL to virtual machines on Virtualbox. Deploy not succefful.
| A: You should to enable “promisc” mode on all network interfaces in Virtualbox. Your VMs must use only PCnet PCI II model network card.


