.. raw:: pdf

   PageBreak

.. index Reference Architectures

Overview 
========

.. contents :local:

Before you install any hardware or software, you must know what 
you're trying to achieve. This section looks at the basic components of
an OpenStack infrastructure and organizes them into one of the more
common reference architectures. You'll then use that architecture as a
basis for installing OpenStack in the next section.

As you know, OpenStack provides the following basic services:

**Compute:**
  Compute servers are the workhorses of your installation; they're 
  the servers on which your users' virtual machines are created. 
  `nova-compute` controls the life-cycle of these VMs.

**Networking:**
  Because an OpenStack cluster (virtually) always includes 
  multiple servers, the ability for them to communicate with each other and with 
  the outside world is crucial. Networking was originally handled by the 
  `nova-network` service, but it has given way to the newer Neutron (formerly 
  Quantum) networking service. `nova-network` still has some advantages over Neutron,
  and it is supported by Fuel in both Flat-DHCP and VLAN modes.

**Storage:**
  OpenStack provides for two different types of storage: block 
  storage and object storage. Block storage is traditional data storage, with 
  small, fixed-size blocks that are mapped to locations on storage media. At its 
  simplest level, OpenStack provides block storage using `nova-volume`, but it 
  is common to use `cinder`.

  Object storage, on the other hand, consists of single variable-size objects 
  that are described by system-level metadata, and you can access this capability 
  using `swift`.

  OpenStack storage is used for your users' objects, but it is also used for 
  storing the images used to create new VMs. This capability is handled by `glance`.

These services can be combined in many different ways. Out of the box,
Fuel supports the following deployment configurations:

- :ref:`Non-HA Simple <Simple>`
- :ref:`HA Compact <HA_Compact>`
- :ref:`HA Full <HA_Full>`
- :ref:`RHOS Non-HA Simple <RHOS_Simple>`
- :ref:`RHOS HA Compact <RHOS_Compact>`
