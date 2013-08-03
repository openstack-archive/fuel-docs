Overview 
========

.. contents:: :local:

Before you install any hardware or software, you must know what 
you're trying to achieve. This section looks at the basic components of
an OpenStack infrastructure and organizes them into one of the more
common reference architectures. You'll then use that architecture as a
basis for installing OpenStack in the next section.

As you know, OpenStack provides the following basic services:

.. topic:: Compute: 

    Compute servers are the workhorses of your installation; they're 
    the servers on which your users' virtual machines are created. 
    `nova-scheduler` controls the life-cycle of these VMs.

.. topic:: Networking: 

    Because an OpenStack cluster (virtually) always includes 
    multiple servers, the ability for them to communicate with each other and with 
    the outside world is crucial. Networking was originally handled by the 
    `nova-network` service, but it has given way to the newer Neutron (formerly 
    Quantum) networking service. Authentication and authorization for these 
    transactions are handled by `keystone`.

.. topic:: Storage: 

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

.. index:: Deployment Configurations; Simple (non-HA)

Simple (non-HA) deployment
--------------------------

In a production environment, you will never have a Simple non-HA
deployment of OpenStack, partly because it forces you to make a number
of compromises as to the number and types of services that you can
deploy. It is, however, extremely useful if you just want to see how
OpenStack works from a user's point of view. 

.. fancybox:: /_images/deployment-simple_svg.png
    :width: 400px
    :height: 200px

More commonly, your OpenStack installation will consist of multiple
servers. Exactly how many is up to you, of course, but the main idea
is that your controller(s) are separate from your compute servers, on
which your users' VMs will actually run. One arrangement that will
enable you to achieve this separation while still keeping your
hardware investment relatively modest is to house your storage on your
controller nodes.

.. index:: Deployment Configurations; Compact HA

Multi-node (HA) deployment (Compact)
------------------------------------

Production environments typically require high availability, which
involves several architectural requirements. Specifically, you will
need at least three controllers, and
certain components will be deployed in multiple locations to prevent
single points of failure. That's not to say, however, that you can't
reduce hardware requirements by combining your storage, network, and controller
nodes:

.. fancybox:: /_images/deployment-ha-compact_svg.png
    :width: 400px
    :height: 250px

.. index:: Deployment Configurations; Full HA

Multi-node (HA) deployment (Full)
--------------------------------------------

For large production deployments, its more common to provide
dedicated hardware for storage. This architecture gives you the advantages of 
high availability, but this clean separation makes your cluster more 
maintainable by separating storage and controller functionality:

.. fancybox:: /_images/deployment-ha-full_svg.png
    :width: 400px
    :height: 200px

Where Fuel really shines is in the creation of more complex architectures, so 
in this document you'll learn how to use Fuel to easily create a multi-node HA 
OpenStack cluster. To reduce the amount of hardware you'll need to follow the 
installation, however, the guide focuses on the Multi-node HA Compact 
architecture.

Lets take a closer look at the details of this deployment configuration.
