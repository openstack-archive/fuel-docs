Issues Resolved in Mirantis OpenStack 4.0
=========================================

Deployment process limited by scalability and performance issues due to the implementation of the Puppet server
---------------------------------------------------------------------------------------------------------------

To address multiple issues including certificate signing, scalability,
and performance issues, the Puppet Master server has been removed from
the Fuel Master Node. Puppet modules and manifests are now synchronized
between the master node and the managed nodes. The modules and manifests
are then applied locally.

Slow network connection occurs between nodes when using Neutron and GRE
-----------------------------------------------------------------------

Previously, network performance occasionally was slower than expected between
nodes when using the Neutron with GRE segmentation as the network type on
CentOS. This issue was primarily caused by packet fragmentation. This has
been corrected in Mirantis OpenStack 4.0. Further detail can be found at https://bugs.launchpad.net/fuel/+bug/1256289.

The deployment progress bars were not as accurate as desired
------------------------------------------------------------

When deploying an environment (after the "Deploy Changes" button had been
pressed), the progress bars in the Nodes tab were not reflecting their
status as accurately as expected. The cluster deployment progress bar has
now been made more accurate and makes more precise estimates of deployment
time. More detail can be found at https://bugs.launchpad.net/fuel/+bug/1257342.

A loss of commits for Pacemaker change transactions could cause deployments to fail
-----------------------------------------------------------------------------------

Occasionally, updates between commits of Pacemaker CIB change transactions
were lost which caused deployment failures. The order of service creation
has been modified to ensure that these commits are properly made. More detail
can be found at  https://bugs.launchpad.net/fuel/+bug/1259134.

Swap size for deployed nodes was not calculated correctly
---------------------------------------------------------

In previous releases, the swap size of deployed nodes was not accurately
calculated. This issue has been corrected and swap sizes will now be calculated
correctly according to the recommended values and depending on the physical
memory size. More detail can be found at https://bugs.launchpad.net/fuel/+bug/1259486.

HP Smart Array controller partitions were not correctly detected
----------------------------------------------------------------

In previous releases, Fuel could not work as expected with HP Smart Array
controllers due to an inability to correctly detect partitions during
the bootstrap process. This issue has now been corrected, and Fuel will
now properly support use of HP Smart Array controllers. More detail can be
found at https://bugs.launchpad.net/fuel/+bug/1259276.

Disabled feature can_set_mount_point in horizon
-----------------------------------------------

This option allows you to choose the device name for the mounted volume.
Setting this parameter to "True" is `not supported by QEMU or KVM
<https://bugs.launchpad.net/nova/+bug/1075971>`_ and causes `Cinder to
show the wrong device names for attached volumes
<https://bugs.launchpad.net/nova/+bug/1217874>`_.

No way to specify range of IP addresses in public network
---------------------------------------------------------

Previously, It was only possible to specify a subnet for a public network
on the Networks tab of the Fuel UI. Because of this limitation, it was
not possible to exclude certain IP addresses that were used by some other
environments not related to the Mirantis OpenStack environment. In this
release, it is now possible to set a flexible range for Fuel use, for
example 12.0.0.10 to 12.0.0.20.

Security groups do not function on Neutron-enabled installations
----------------------------------------------------------------

Due to the wrong configuration of security groups on Compute hosts,
access to virtual machines was unrestricted. This has been corrected,
and security groups are now enabled by default for Neutron installation.
To access VMs, you are required to allow connectivity first via the
Nova API or Horizon.

Wrong default gateway for the external Neutron network
------------------------------------------------------

The UI setting for the Neutron gateway was ignored in the previous release. It was
calculated automatically as the first network IP. In this release, this UI
setting works properly.

Documentation on enabling NIC Bonding through the Fuel CLI Library was incomplete
---------------------------------------------------------------------------------

In previous releases, NIC Bonding could be enabled through the Fuel
CLI Library but was not fully covered in the public facing documentation.
The documentation on how to enable NIC Bonding has been made more
complete and thorough.

This documentation also includes a workaround for customers who do not
have the required minimum number of NIC interfaces for their choice of
network type. Please refer to the documentation section "Advanced Network
Configuration using Open VSwitch" for more information on the workaround.
