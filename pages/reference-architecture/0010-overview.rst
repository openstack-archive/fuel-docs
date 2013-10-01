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
  `nova-compute` controls the life cycle of these VMs.

**Networking:**
  Because an OpenStack cluster (virtually) always includes multiple
  servers, the ability for them to communicate with each other and with
  the outside world is crucial.

  Networking in OpenStack was originally handled by the `nova-network`
  service, but it has given way to the newer `neutron` (formerly
  `quantum`) networking service. `nova-network` still has some
  advantages over `neutron`, so Fuel supports both. With `nova-network`,
  Flat-DHCP and VLAN modes are available. With `neutron`, VLAN or GRE
  can be used for network segmentation.

**Storage:**
  OpenStack provides for two different types of storage: block storage
  and object storage. Block storage is traditional data storage, with
  volumes composed of small, fixed-size blocks that are mapped to
  locations on storage media. In OpenStack, block storage is managed by
  `cinder` service.

  Object storage implements a pragmatic middle ground between block
  storage and hierarchical file systems: data is exposed as a flat set
  of variable-size objects, and is separated from metadata. OpenStack
  provides a reference implementation of object storage in `swift`
  service, Fuel also supports using `Ceph` as object storage backend for
  various OpenStack components.

  In addition to being useful to store your users' data, object storage
  is also used by the OpenStack `glance` service for storing the images
  used to create new VMs.

These services can be combined in many different ways. Out of the box,
Fuel supports the following deployment configurations:

- :ref:`Multi-node <Multi-node>`
- :ref:`Multi-node with HA <Multi-node_HA>`
- :ref:`RHOS Multi-node <RHOS_Multi-node>`
- :ref:`RHOS Multi-node with HA <RHOS_Multi-node_HA>`
