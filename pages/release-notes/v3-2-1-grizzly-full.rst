.. index:: Release Notes: Fuel 3.2.1

.. _RelNotes_3.2.1:

Release Notes for Mirantis OpenStack version 3.2.1
==================================================

.. contents:: :local:
  :depth: 1
  :backlinks: none

Overview
---------

This version (3.2.1) is a maintenance release to Mirantis OpenStack 3.2
and contains defect fixes and several resolutions for issues initially
reported against version 3.2. You do not need to install version 3.2
prior to installing 3.2.1 because the 3.2.1 release includes version 3.2.


These release notes supplement the product documentation and list enhancements,
resolved issues, and known issues in this version. 

New Features in Mirantis OpenStack 3.2.1
----------------------------------------

* OpenStack Grizzly maintenance release 2013.1.4
* Public IP ranges can now be set in Neutron network manager

OpenStack Grizzly maintenance release 2013.1.4
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The OpenStack core projects in the Mirantis OpenStack hardened packages
have been synchronized with the OpenStack Grizzly 2013.1.4 bug fix update.
Fuel 3.2.x will deploy this 2013.1.4 version of Grizzly when deploying
an OpenStack environment on CentOS or Ubuntu.  For Red Hat Enterprise Linux
OpenStack Platform (RHEL-OSP), Fuel will deploy RHEL-OSP version 3.0.

Public IP ranges can now be set in Neutron network manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The ability to set up an explicit list of public IP addresses
allows users to incorporate an OpenStack cloud into an existing network segment.

OpenStack Health Checks can now be launched from the Fuel CLI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In previous releases, the OpenStack Health Check tests could be launched from the Fuel
UI or API. In Mirantis OpenStack 3.2.1, these tests can now be launched from the Fuel CLI
as well. This enables you to run sanity checks for a deployed environment from the
command line.

Known Issues in Mirantis OpenStack 3.2.1
----------------------------------------

Second role of the node is not applied sometimes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Launchpad bug: https://bugs.launchpad.net/fuel/+bug/1256244

In case of installation of several roles on the node deployment
finishes with READY status (with all nodes set to 'ready'),
albeit the second role is not applied on the some nodes. In this
case additional run of puppet on the failed nodes is required by
issuing 'puppet agent -tvd' command.

Issues with Neutron-enabled installations when using certain NIC models
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Some drivers for legacy and virtual Ethernet adapters--for example, e1000, r8139 or
vmxnet--may not work with OpenVSwitch Neutron-enabled CentOS/RHEL installations. A
workaround for this issue is is to use the VLAN splinters Open vSwitch flag, which can be
enabled in the UI by checking the VLAN splinters checkbox on the Settings tab in you
environment. However, this option introduces performance issues and is not
recommended to be used with more than 256 VLANs for VLAN splinter-enabled
environments.

Poor network performance in Neutron-enabled configurations for virtio-enabled VMs on CentOS and RHEL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Currently, there is a regression introduced by the backporting of the OpenVSwitch
networking code into the CentOS/RHEL kernel, which affects the performance of virtual
machines using the paravirtualized VirtIO network adapters. A known workaround is to
disable Generic and TCP Segmentation Offload on the VMs by issuing the following
commands:
`ethtool -K <iface_name> gso off`
`ethtool -K <iface_name> tso off`

Health Check Platform tests have been fixed injection into VMs fails on CentOS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
VM creation may with the following error:
`ERROR: Error injecting data into image`

In this situation, nova service will fail to inject files into VM instances.
This is due to a nova/qemu bug that may be related to an incorrect path but
the details of the failure are not yet determined.

Launch instance test in Health Check sometimes fails in HA mode
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Rarely, if an instance is launched from Horizon or Nova API, it launches correctly but the
Health Check framework reports that it has failed to launch.

Issues fixed in this release
----------------------------

The following is a list of customer facing issues resolved in Mirantis OpenStack 3.2.1.
https://launchpad.net/fuel/+milestone/3.2.1 has the full list of issues publicly
reported against the the 3.2.1 version.

Fuel uses Nova security groups even when deployed with Quantum
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In cases when Quantum was enabled, Nova used the Nova firewall provider instead of the
Quantum security group provider. This issue is now resolved and Nova properly uses the
Quantum security group provider.

Wrong IP address assigned to nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Due to Puppet’s threading operations using Nginx as a HTTP frontend, in some cases
nodes were assigned wrong IP addresses. This bug was fixed by applying stricter logic to
the Puppet functions parsing the data from the Puppet master.

Health Check Platform tests have been fixed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Mirantis OpenStack Health Check Platform tests were introduced in Mirantis OpenStack
3.2. They ensure that the platform-level services operate correctly after an OpenStack
environment is deployed. Heat, Savanna, and Murano services are verified by platform
tests. However, due to a bug, the tests occasionally did not work properly. The issue has
been fixed in Mirantis OpenStack 3.2.1 and the tests should now work consistently.

Red Hat deployments time out while registering to an RHN Satellite Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Launchpad bug: https://bugs.launchpad.net/fuel/+bug/1257285

In the case where the DNS resolution would work but no Internet access to an RHN
Satellite Server existed, a Red Hat deployment timed out while performing the satellite
registration. This used to restrict an entire deployment from moving forward. Now, if
connectivity fails, the error is logged, but the deployment proceeds.

High CPU load on the Fuel Master node due to 'mcollective_broadcast’ exchange absence
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Launchpad bug: https://bugs.launchpad.net/fuel/+bug/1252269

The master node installation previously would fail to create mcollective AMQP exchanges
due to a race condition between the RabbitMQ service start and the exchange creation
command immediately following. This issue has been fixed in Mirantis OpenStack 3.2.1.

HA sustainability fixes
^^^^^^^^^^^^^^^^^^^^^^^
Launchpad bugs: 
https://bugs.launchpad.net/fuel/+bug/1249426
https://bugs.launchpad.net/fuel/+bug/1253099

Several race conditions have been fixed in the HA mode for the Pacemaker services,
which we introduced by incorrectly coding the Corosync Puppet libraries and the
corresponding parts of services manifests, including “Illegal seek” and “Execution expired”
errors. These race conditions have now been corrected.

Nova-compute service is unable to restart if at least one active instance exists on the compute node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Restarts of nova-compute services failed in Neutron-enabled configurations due to the
wrong file access writes for the Neutron rootwrap directory. This required additional steps
to be done to make Compute nodes work after restarting the nova-compute services or
rebooting the Compute node. This condition has been addressed and a nova-compute
service can now restart even if an active instance exists on the Compute node.

Ubuntu NIC naming inconsistent with the discovered interface names
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Interface names were previously inconsistent due to the differences between the bootstrap
image and Ubuntu kernels. These inconsistencies caused a failure in the deployment process.
Explicit udev rules have been implemented so that provisioning may consistently identify interface names.

Ceph did not work with dedicated journal drives
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Previously, Ceph had been unable to work with dedicated journal drives.
This issue has been fixed by moving the partitioning of Ceph drives to the provisioning stage.

Static files for Horizon were missing on the second and subsequent controllers in the HA mode
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In the previous releases, the required static files for Horizon were not properly
provisioned on the second and subsequent controllers when deployed in a
High Availability reference architecture.  The Horizon static files are now explicitly
generated on secondary controllers during deployment.

Incorrect calculation of Glance’s cache size
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The cache size for Glance was incorrectly limited during the deployment
in previous releases.  Glance’s cache size is now set to 10% of
/var/lib/glance disk capacity, but not below 5 GB.

Untagged public network by default
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The default settings for new clusters now use untagged networks by default.
It allows to simplify access to VirtualBox installations.

Ability to set external sources of NTP synchronization for the Fuel Master
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
During the Fuel Master node installation, you can use the extended configuration
menu to configure custom NTP upstream servers, which is useful for data
centers without direct Internet access.

Provisioning issues on particular RAID controllers (such as Dell R620)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Some RAID controllers advertise underlying block devices with a size
of zero, which were previously counted as real disks and erroneously
were used for node provisioning. These zero-size block devices
are now ignored during node provisioning.

Compute nodes do not have default gateway after the deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In some instances, Fuel did not properly set the default gateway for the Compute nodes.
This issue has been fixed by setting up a correct interface activation order during the deployment phase.

