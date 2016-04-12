.. _sysreqs_sample_target_node_config:

Sample hardware configuration for Fuel Slave nodes
--------------------------------------------------

The example provided in this section is a general-purpose medium-size
hardware configuration that you can use for a variety of OpenStack
installations and later moderately scale to accommodate
growing requirements of your environment.

.. note::
    This example is not a best practice document of how to design an
    OpenStack environment. The purpose of the example is to help
    OpenStack administrators to understand how to plan an installation
    and demonstrate how an OpenStack environment may look.

The sample OpenStack environment includes:

+--------------------------+-----------------------------+
| Number of servers        | 12                          |
|                          | The servers include:        |
|                          |                             |
|                          | * 1 Fuel Master node        |
|                          | * 3 Controller nodes        |
|                          | * 3 Storage nodes           |
|                          | * 5 Compute nodes           |
+--------------------------+-----------------------------+
| Network                  | Neutron, using VLAN or GRE  |
|                          | topology                    |
+--------------------------+-----------------------------+
| Storage                  | Ceph as back end for Cinder |
|                          | Glance and Nova (ephemeral  |
|                          | storage)                    |
+--------------------------+-----------------------------+
| Additional Components    | No additional components.   |
|                          | If you want to install      |
|                          | Ceilometer with the MongoDB |
|                          | database, you must add three|
|                          | more servers.               |
+--------------------------+-----------------------------+


.. _sysreqs_sample_target_node_config_controller:

Controller nodes
++++++++++++++++

In this example, we use Ceph as a back end for ephemeral storage.
Therefore, in addition to the basic OpenStack components and a MySQL
database,
controller nodes require sufficient resources to run Ceph monitors.

Each controller node must include:

+--------------+-----------------------------------+
| CPU          | 2 CPUs with at least six physical |
|              | cores each                        |
+--------------+-----------------------------------+
| RAM          | * For testing: 2 GB               |
|              | * For production:                 |
|              |                                   |
|              |   * 24 GB (minimum)               |
|              |   * 64 GB for deployments of      |
|              |     1000 VMs or more              |
+--------------+-----------------------------------+
| Network      | * For testing: 2 x 1 Gbit/s NICs  |
|              | * For production: 2 x 10 Gbit/s   |
|              |   NICs                            |
+--------------+-----------------------------------+
| Storage      | Hardware RAID 1 with at least 1 TB|
|              | formatted capacity for the host   |
|              | host operating system disk        |
|              |                                   |
|              | Larger disks may be warranted     |
|              | depending on the expected database|
|              | and log storage requirements.     |
+--------------+-----------------------------------+


.. _sysreqs_sample_target_node_config_compute:

Compute nodes
+++++++++++++

Your virtual machines are hosted on the compute nodes; therefore,
you must allocate enough resources to run these virtual machines.

Each compute node must include:

+---------------+----------------------------------+
| CPU           | Dual-socket CPU with a minimum   |
|               | of 4 cores per socket            |
+---------------+----------------------------------+
| RAM           | 64 GB                            |
+---------------+----------------------------------+
| Storage       | Hardware RAID 1 controller with  |
|               | at least 500 GB capacity for     |
|               | the host operating system disk   |
+---------------+----------------------------------+
| Network       | * For testing: 2 x 1 Gbit/s NICs |
|               | * For production: 2 x 10 Gbit/s  |
|               |   NICs                           |
+---------------+----------------------------------+


.. _sysreqs_sample_target_node_config_storage:

Storage nodes
+++++++++++++

We recommend that you separate Ceph nodes for scalability and robustness.
The hardware estimate provided below is based on the requirement of 0.5 cores
per Ceph-OSD CPU and 1 GB of RAM per 1 TB of Ceph-OSD space. You can
configure
all Ceph storage and journal hard disks in JBOD (Just a Bunch of Disks) mode
on the RAID controller or plug them directly to the available SATA or SAS
ports
on the mainboard.

Each storage node must include:

+------------------------+---------------------------------+
| CPU                    | Single-socket CPU with at least |
|                        | 4 physical cores                |
+------------------------+---------------------------------+
| RAM                    | 24 GB                           |
+------------------------+---------------------------------+
| Storage                | RAID 1 controller with at least |
|                        | 500 GB capacity for the host    |
|                        | operating system disk           |
|                        |                                 |
|                        | For production installations,   |
|                        | set the Ceph object replication |
|                        | factor to 3 or greater.         |
+------------------------+---------------------------------+
| Network                | * For testing: 2 x 1 Gbit/s NICs|
|                        | * For production: 2 x 10 Gbit/s |
|                        |   NICs                          |
+------------------------+---------------------------------+
| Storage                | * 18 TB for Ceph storage        |
|                        |   (6 x 3 TB)                    |
|                        | * 1-2 x 64 GB SSDs or more, for |
|                        |   the Ceph journal              |
+------------------------+---------------------------------+

