.. index:: Network Configuration Options

.. _NetworkConfiguration:

Network Configuration Options
=============================

This section describes how to configure network settings depending on
your environment requirements and prerequisites.

Networks used by OpenStack
--------------------------

Public network is used for communication between a cluster and external
networks (the Internet, corporate network, end users).

Floating network is used for communication from external networks to
VMs. A Floating network IP address can be assigned to a single VM.

Storage network is part of cluster’s internal network. It is used 
to separate storage traffic (Swift, Ceph, iSCSI, and so on) from other types of
cluster’s internal communications.

Management network is also part of a cluster’s internal network. It serves 
all other internal communications, including DB queries, AMQP messaging,
high availability services, and so on.

Private network is an internal network used for VM’s communications between
tenants (also called Fixed network).

Administrative network is a network shared between the Fuel master node
and all clusters deployed by the Fuel master node. It’s used for
administrative purposes and network-based installation of Node servers.

OVS is an abbreviation for Open vSwitch, a production quality, multilayer 
virtual switch licensed under the open source `Apache
2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>`__  license.

For more information on each of these networks, check out the
`:ref:ReferenceArchitecture`_.


Network deployment models
=========================

This section describes the following network deployement models:

* :ref:`Nova-network <novanetwork>`
* :ref:`Nuetron <neutron>`

.. _novanetwork:

Nova-network
------------

Nova-network offers two variants for deploying the private network for tenants:
FlatDHCP Manager and VLAN Manager.

FlatDHCP Manager
~~~~~~~~~~~~~~~~

|image0|

For an overview of FlatDHCP Manager, refer to the `ReferenceArchitecture_`.

This guide illustrates the recommended way to connect the physical interfaces
of your servers to the OpenStack network.

To associate each of the OpenStack networks to server NICs, this can be done
in Fuel UI.
* First, go to *Add Nodes*.
* Next, select the role for this host and *Apply Changes*
* Select the role you want to modify, and click *Configure Interfaces*.
* Drag and drop the appropriate networks onto the physical interfaces.  

Depending how many NICs you have in your node servers, you can use the 
following examples to plan your NIC assignment. 

1 NIC deployment

-  eth0 - VLAN tagged port for networks: Storage, Public/Floating,
   Private, Management and Administrative (untagged)

2 NIC deployment

-  eth0 - Management network (tagged), Storage network (tagged) and
   Administrative network  (untagged)  
-  eth1 - VLAN tagged port with VLANs for networks: Public/Floating,
   Private

3 NIC deployment

-  eth0 - untagged port for Administrative network
-  eth1 - VLAN tagged port with VLANs for networks: Public/Floating,
   Private, Management 

-  eth2 - untagged port for Storage network

4 NIC deployment

-  eth0 - untagged port for Administrative network

-  eth1 - tagged port for networks: Public/Floating, Management
-  eth2 - untagged port for Private network
-  eth3 - untagged port for Storage network

Routing recommendations

-  Use the default routing via a router in the Public network
-  Use the the management network to access to your management
   infrastructure (L3 connectivity if necessary)
-  The administrative network or only the Fuel server (via dedicated
   NIC) should have Internet access
-  The Storage and Private network (VLANs) should be configured without
   access to other networks (no L3 connectivity)


VLAN Manager
~~~~~~~~~~~~

|image1|

This guide illustrates the recommended way to connect the physical interfaces
of your servers to the Openstack network.

To connect OpenStack networks to server Ethernet cards, in the Fuel UI
add a role to node, click on Configure Interfaces, and then drag and
drop the appropriate networks onto the physical interfaces.  Here are
the recommended network configurations depending on the number of NICs
you have in the node server:

1 NIC deployment

-  eth0 - VLAN tagged port for networks: Storage, Public/Floating,
   Private  (where the number of VLANs depends on the number of tenant
   networks with a continuous range), Management and Administrative
   network (untagged)

2 NIC deployment

-  eth0 - Management network (tagged), Storage network (tagged) and
   Administrative network  (untagged)  
-  eth1 - VLAN tagged port with minimum two VLANs for networks:
   Public/Floating, Private (where number of VLANs depend on number of
   tenant networks - continuous range)

3 NIC deployment

-  eth0 - untagged port for Administrative network
-  eth1 - VLAN tagged port with two VLANs for networks: Public/Floating,
   Management Private (where the number of VLANs depends on the number
   of tenant networks with a continuous range)
-  eth2 - untagged port for Storage network

4 NIC deployment

-  eth0 - untagged port for Administrative network
-  eth1 - tagged port for networks: Public/Floating, Management
-  eth2 - VLAN tagged port for Private network, with defined VLAN range
   IDs - continuous range
-  eth3 - untagged port for Storage network

Routing recommendations

-  Use the default routing via a router in the Public network
-  Use the the management network to access to your management
   infrastructure (L3 connectivity if necessary)
-  The administrative network or only the Fuel server (via dedicated
   NIC) should have Internet access
-  The Storage and Private network (VLANs) should be configured without
   access to other networks (no L3 connectivity)

.. _neutron:

Neutron
-------

VLAN segmentation
~~~~~~~~~~~~~~~~~

The minimum number of NICs for this configuration is 3.

|image2|


This guide illustrates the recommended way to connect the physical interfaces   
of your servers to the Openstack network.

To connect OpenStack networks to server ethernet cards, in the Fuel UI
add a role to node, click on Configure Interfaces, and then drag and
drop the appropriate networks onto the physical interfaces.  Here are
the recommended network configurations depending on the number of NICs
you have in the node server:

3 NIC deployment

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management,
   Storage
-  eth2 (br-eth2) - port for Private network (where the number of VLANs
   depends on the number of tenant networks with a continuous range)

|image3|

4 NIC deployment

-  eth0 - port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management
-  eth2 (br-eth2) - port for Private network, with defined VLAN range
   IDs
-  eth3 (br-eth1) - port for Storage network

|image4|

Routing recommendations

-  Use the default routing via a router in the Public network
-  Use the the management network to access to your management
   infrastructure (L3 connectivity if necessary)
-  The administrative network or only the Fuel server (via dedicated
   NIC) should have Internet access
-  The Storage and Private network (VLANs) should be configured without
   access to other networks (no L3 connectivity)

GRE Segmentation
~~~~~~~~~~~~~~~~

|image5|

Open vSwitch (OVS) - GRE tunnels are provided via Management Network.
Please note that in this setup, there is no physical Private
network.

This guide illustrates the recommended way to connect the physical interfaces   
of your servers to the Openstack network.

To connect OpenStack networks to server ethernet cards, in the Fuel UI
add a role to node, click on Configure Interfaces, and then drag and
drop the appropriate networks onto the physical interfaces.  Here are
the recommended network configurations depending on the number of NICs
you have in the node server:

2  NIC deployment 

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management,
   Storage

|image6|

3  NIC deployment 

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management
-  eth2 (br-eth2) - port for Storage network

|image7|

4  NIC deployment 

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for Management network
-  eth2 (br-eth2) - port for Public/Floating network
-  eth3 (br-eth3) - port for Storage network

|image8|

Routing recommendations

-  Default routing via router in the Public network
-  The management network access to your management infrastructure (L3
   connectivity if necessary)
-  Administrative network or only Fuel server (via dedicated NIC) should
   have Internet access
-  Storage and Private network (VLANs) without access to other networks
   (no L3 connectivity)

Routing recommendations
^^^^^^^^^^^^^^^^^^^^^^^

Consider the following routing recommendationswhen you configure your 
network:

-  Use the default routing via a router in the Public network
-  Use the the management network to access to your management
   infrastructure (L3 connectivity if necessary)
-  The Storage and VM networks should be configured without access to
   other networks (no L3 connectivity)

.. |image89| image:: /_images/image04.jpg
.. |image9| image:: /_images/image04.jpg
.. |image10| image:: /_images/image12.jpg
.. |image11| image:: /_images/image22.png
.. |image12| image:: /_images/image10.png
.. |image13| image:: /_images/image03.png
.. |image14| image:: /_images/image18.png
.. |image15| image:: /_images/image19.png
.. |image16| image:: /_images/image00.png
.. |image17| image:: /_images/image08.png
.. |image18| image:: /_images/image04.jpg
.. |image19| image:: /_images/image06.jpg
.. |image20| image:: /_images/image22.png
.. |image21| image:: /_images/image10.png
.. |image22| image:: /_images/image03.png
.. |image23| image:: /_images/image14.png
.. |image24| image:: /_images/image02.png
.. |image25| image:: /_images/image19.png
.. |image26| image:: /_images/image17.png
.. |image27| image:: /_images/image07.png
