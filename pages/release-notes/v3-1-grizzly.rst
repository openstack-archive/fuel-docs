.. index:: Release Notes: Fuel 3.1

.. _RelNotes_3.1:

New Features in Fuel 3.1
========================

.. contents:: :local:
  :depth: 1
  :backlinks: none

Fuel 3.1 with Integrated Graphical and Command Line controls
------------------------------------------------------------

In earlier releases, Fuel was distributed as two packages – `Fuel Web` for 
graphical workflow, and `Fuel Library` for command-line based manipulation. 
Starting with this 3.1 release, we’ve integrated these two capabilities into 
a single offering, referred to simply as Fuel. If you used Fuel Web, you’ll 
see that capability along with its latest improvements to that capability in 
the the Fuel User Interface (UI), providing a streamlined, graphical console 
that enables a point-and-click experience for the most commonly deployed 
configurations. Advanced users with more complex environmental needs can 
still get command-line access to the underlying deployment engine (aka `Fuel 
Library`).

Option to deploy Red Hat Enterprise Linux® OpenStack® Platform
--------------------------------------------------------------

Mirantis Fuel now includes the ability to deploy the Red Hat Enterprise Linux® 
OpenStack® Platform (a solution that includes both Red Hat Enterprise Linux® 
and the Red Hat OpenStack® distribution). During the definition of a new 
environment, the user will be presented with the option of either installing 
the Mirantis-provided OpenStack distribution onto CentOS-powered nodes or 
installing the Red Hat provided OpenStack distribution onto Red Hat Enterprise 
Linux® powered nodes.

.. note:: A Red Hat subscription is required to download and deploy Red Hat 
  Enterprise Linux® OpenStack® Platform.  

Mirantis OpenStack Health Check
-------------------------------

New in this release is the Mirantis OpenStack Health Check which can be 
accessed through a tab in the Fuel UI. The OpenStack HealthCheck is a battery 
of tests that can be run against an OpenStack deployment to ensure that it is 
installed properly and operating correctly.  The suite of tests exercise not 
only the core components within OpenStack, but also the added packages included 
in the Mirantis OpenStack distribution. Tests can be run individually or in 
groups. A full list of available tests can be found in the documentation.

Ability to deploy properly in networks that are not utilizing VLAN tagging
--------------------------------------------------------------------------

In some environments, it may not be possible or desired to utilize VLANs to 
segregate network traffic. In these networks, Fuel can now be configured 
through the Fuel UI to disable the need for VLAN tagging. This configuration 
option is available through the Network Settings tab.

Full support of Quantum networking engine
-----------------------------------------

This release now supports all the features of Quantum OpenStack virtual 
networking implementation including network namespaces feature ported to 
2.6.32 CentOS kernel allowing virtual networks overlapping.

Improved High Availability resiliency
-------------------------------------

To improve the resiliency of the Mirantis OpenStack High Availability reference 
architecture, Fuel now deploys all HA services under Pacemaker, a scalable 
cluster resource manager developed by ClusterLabs.  

Horizon password entry can be hidden
------------------------------------

In the OpenStack settings tab, the input of the password used for Horizon 
access can now be hidden by clicking on the eye icon to the left of the field. 
This icon acts as a toggle between hidden and visible input modes.

Resolved Issues in Fuel 3.1
===========================

.. contents:: :local:
  :depth: 1
  :backlinks: none

Disk Configuration now displays proper size and validates input
---------------------------------------------------------------

Previously, the `Total Space` displayed in the `Disk Configuration` screen was 
slightly larger than what was actually available. This has now been corrected 
to be accurate. In addition, user input validation has been improved when 
making changes to ensure that space is not incorrectly allocated. And finally, 
the unit of measure has been changed to MB from GB in the `Disk Configuration` 
screen.  

Improved behavior for allocating space
--------------------------------------

In Fuel 3.0.x, users were forced to manually zero out fields in the 
`Disk Configuration` screen if the total allocated space exceeded the total 
disk size before the "USE ALL UNALLOCATED SPACE" option could be utilized. 
Now you can now enter a value above the maximum available for a volume group 
(as long as it does not exceed total disk size), select "USE ALL UNALLOCATED 
SPACE" for a second volume group and that group will be assigned the available 
space up to the maximum disk size. In addition, the current allocated sizes 
are reflected graphically in the bars above the volume group.

Eliminated the need to specify a bootable disk
----------------------------------------------

Previously, the `Disk Configuration` screen had a special `Make bootable`
option. This release of Fuel makes the option unnecessary because Fuel now has 
a Master Boot Record (MBR) and boot partition installed on all hard drives.
BIOS can now be configured to load from any disk and the node will boot the 
operating system. Because of this, the `Make bootable` option has been removed.

Floating IP allocation speed increased
--------------------------------------

In Fuel 3.0.x, the step of floating IP allocation was taking significant time. 
During cluster provisioning, it was taking up to 8 minutes for creating the 
pool of 250 floating IP addresses. This has now been reduced down to seconds 
instead of minutes.

Ability to map logical networks to physical interfaces
------------------------------------------------------

With the introduction of the ability to deploy properly in networks that are 
not utilizing VLAN tagging, it is now possible to map logical OpenStack 
networks to physical interfaces without using VLANs. 

Separate Logical Volume Manager (LVM) now used for Glance storage
-----------------------------------------------------------------

Glance storage was previously configured to use a root partition on a 
controller node. Because of this, in HA mode, Swift was configured to use 
only 5 GB of storage. A user was unable to load large images into Glance in 
HA mode and could receive an out of space error message if a small root 
partition were used. This situation has been corrected by creating special LVM 
for Glance storage. You can modify the size of this partition in the 
`Disk Configuration` screen.

Memory leaks in nailgun service
-------------------------------

Nailgun is the RESTful API backend service that is used in Fuel. In 3.0.1 an 
increase in memory consumption could occur over time. This has now been fixed.

Network Verification failures
-----------------------------

In some cases, the "Verify Networks" option in the `Network configuration` tab 
reported a connectivity problem, however manual checks confirmed that the 
connection was fine. The problem was identified as a loss of packets when a 
particular Python library was used. That library has been replaced and 
verification now functions properly.

Installing Fuel Master node onto a system with em# network interfaces
---------------------------------------------------------------------

In Fuel 3.0.1 a fix was included to recognize network interfaces that start 
with `em` (meaning "embedded") instead of `eth`. However the fix only applied 
to the Slave nodes used to deploy OpenStack components. The Fuel Master node 
was still affected. This has now been corrected and Fuel can be deployed on 
machines where the operating systems uses the prefix of `em` instead of `eth`.

Provisioning failure on large hard drives
-----------------------------------------

In previous releases, when ext4 was used as a file system for a partition, 
provisioning would fail for for large volumes (larger than 16 TB) in some 
cases. Ext4 has been replaced by the xfs file system which works well on large 
volumes.

Access to OpenStack API or VNC console in Horizon when running in VirtualBox
----------------------------------------------------------------------------

Previously it was impossible to access the OpenStack API or VNC console in 
Horizon when running the OpenStack environment created in VirtualBox by the 
Mirantis demo VirtualBox. This was caused by an inability to create a route 
to the OpenStack public network from a host system due to a lack of VLAN tags. 
With the introduction of the ability to deploy properly in networks that are 
not utilizing VLAN tagging, it is now possible to create the route. 
Information on how to create this route is documented in the user guide.

Other resolved issues
---------------------

If CPU speed could not be determined through an operating system level query on 
a slave node, that node would not register properly with the Fuel Master node.
This issue has been corrected to register the node even if some information 
about the node is unavailable.

Known Issues in Fuel 3.1
========================

.. contents:: :local:
  :depth: 1
  :backlinks: none

Limited Support for OpenStack Grizzly
-------------------------------------

The following improvements in Grizzly are not currently supported directly by 
Fuel:

- Nova Compute

  - Cells
  - Availability zones
  - Host aggregates

- Neutron (formerly Quantum)

  - LBaaS (Load Balancer as a Service)
  - Multiple L3 and DHCP agents per cloud
  
- Keystone

  - Multi-factor authentication
  - PKI authentication
  
- Swift

  - Regions
  - Adjustable replica count
  - Cross-project ACLs

- Cinder

  - Support for FCoE
  - Support for LIO as an iSCSI backend
  - Support for multiple backends on the same manager
  
- Ceilometer

- Heat

It is expected that these capabilities will be supported in future releases 
of Fuel.

In addition, support for High Availability of Neutron (Quantum) on Red Hat 
Enterprise Linux® (RHEL) is not available due to a limitation within the 
Red Hat kernel. It is expected that this issue will be addressed by a patch to 
RHEL in late 2013.

Nagios deployment is disabled
-----------------------------

Due to instability of PuppetDB and Nagios manifests we decided to 
temporarily disable the Nagios deployment feature. It is planned to re-enable
this feature in next release with improved and much more stable manifests.

Ability to deploy Swift and Neutron (Quantum) is limited to Fuel CLI
--------------------------------------------------------------------

At this time, customers wishing to deploy Swift or Neutron (Quantum) will need 
to do so through the Fuel CLI.  An option to deploy these components as 
standalone nodes is not currently present in the Fuel UI.  It is expect that 
a near future release will enable this capability.

Ability to add new nodes without redeployment
---------------------------------------------

It’s possible to add new compute and Cinder nodes to an existing OpenStack 
environment. However, this capability can not be used yet to deploy additional 
controller nodes in HA mode.

Ability to deploy properly in networks that are not utilizing VLAN tagging
--------------------------------------------------------------------------

While included in Fuel and fully supported, network environments can be complex 
and Mirantis has not exhaustively identified all of the configurations where 
this feature works properly. Fuel does not prevent the user from creating an 
environment that may not work properly, although the `Verify Networks` function 
will confirm necessary connectivity. As Mirantis discovers environments where a 
lack of VLAN tagging causes issue, they will be further documented.  
Currently, a known limitation is that untagged networks should not be mapped to 
the physical network interface that is used for PXE provisioning. Another known 
situation occurs when the user separates the public and floating networks onto 
different physical interfaces without VLAN tagging, which will cause deployment 
to fail.

Time synchronization failures in a VirtualBox environment
---------------------------------------------------------

If the ntpd service fails on the Fuel master node, desynchronization of nodes 
in the environment will occur. OpenStack identifies services as broken if the 
time synchronization is broken, which will cause the "Services list 
availability" test in the Mirantis OpenStack HealthCheck to fail. In addition, 
instances may fail to boot. This issue appears to be limited to VirtualBox 
environments as it could not be replicated on KVM and physical hardware 
deployments.

If a controller’s root partition runs out of space, the controller fails to operate
-----------------------------------------------------------------------------------

Logging is configured to send most of messages over rsyslog, and disk space 
consuming services use their own logical volumes (such as Cinder, Compute). 
However, if processes write to the root partition and the root partition runs 
out of disk space, the controller will fail.

The "Create instance volume" test in the Mirantis OpenStack Healthcheck tab has a wrong result for attachment volumes
---------------------------------------------------------------------------------------------------------------------

The "Create instance volume" test is designed to confirm that a volume can be 
created. However, even if OpenStack fails to attach the volume to the VM, the 
test still passes.

Other Limitations:
------------------

- When using the Fuel UI, IP addresses for Slave nodes (but not the Master node)
  are assigned via DHCP during PXE booting from the master node. Because of 
  this, even after installation, the Fuel Master node must remain available 
  and continue to act as a DHCP server.

- When using the Fuel UI, the floating VLAN and public networks must use the 
  same L2 network. In the UI, these two networks are locked together, and can 
  only run via the same physical interface on the server.

- Deployments done through the Fuel UI creates all networks on all servers, 
  even if they are not required by a specific role (e.g. A Cinder node will 
  have VLANs created and addresses obtained from the public network).

- Some of OpenStack services listen on all interfaces, which may be detected 
  and reported by security audits or scans. Please discuss this issue with 
  your security administrator if it is of concern in your organization.

- The provided scripts that enable Fuel to be automatically installed on 
  VirtualBox will create separated host interfaces. If a user associates 
  logical networks to different physical interfaces on different nodes, it 
  will lead to network connectivity issues between OpenStack components. 
  Please check to see if this has happened prior to deployment by clicking on 
  the `Verify Networks` button on the networking tab.

- The networks tab was redesigned to allow the user to provide IP ranges 
  instead of CIDRs, however not all user input is properly verified. Entering 
  a wrong wrong value may cause failures in deployment.

- Fuel UI may not reflect changes in NICs or disks after initial discovery, 
  and it can lead to failure in deployment. In other words, if user powers on 
  the node, it gets discovered, and then some disks are replaced or network 
  cards added or removed, rediscovering of changed hardware may not be done 
  correctly. For example, the `Total Space` displayed in the `Disk 
  Configuration` screen may be different than the actual size of the disk.

- Neutron (Quantum) Metadata API agents in High Availability mode are only 
  supported for Compact and Full scenarios if network namespaces (netns) is 
  not used.
  
- The Neutron (Quantum) namespace metadata proxy is not supported unless netns 
  is used.
  
- Neutron (Quantum) multi-node balancing conflicts with pacemaker, so the two 
  should not be used together in the same environment.

- When deploying Neutron (Quantum) with the Fuel CLI and when virtual 
  machines need to have access to internet and/or external networks you need 
  to set the floating network prefix and public_address so that they do not 
  intersect with the network external interface to which it belongs. This is 
  due to specifics of how Neutron(Quantum) sets Network Address Translation 
  (NAT) rules and a lack of namespaces support in CentOS 6.4. 

- In environments with a large number of tenant networks, e.g. over 300, 
  network verification may stop responding. In these cases, the networks 
  themselves are unaffected and it is only the test that ceases to function 
  correctly.
