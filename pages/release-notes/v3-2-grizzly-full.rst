.. index:: Release Notes: Fuel 3.2

.. _RelNotes_3.2:

Release Notes for Mirantis OpenStack version 3.2
================================================

.. contents:: :local:
  :depth: 1
  :backlinks: none

Overview
---------

Mirantis, Inc. is releasing version 3.2 of Mirantis OpenStack.  
Mirantis OpenStack is a complete solution that includes three 
major components:

* Fuel lifecycle management application
* Mirantis OpenStack hardened packages
* Mirantis Support

These release notes supplement the product documentation and list 
enhancements, resolved issues and known issues in this version. 

What is Mirantis OpenStack?
------------------------------

Mirantis OpenStack is made up of three items:

* **Fuel for OpenStack**
 
 Fuel is our lifecycle management application that deploys multiple 
 OpenStack clouds from a single interface and then enables you to 
 manage those clouds post-deployment.  You can add nodes, remove 
 nodes or even remove an entire cloud and return the resources to 
 the pool of available resources. Fuel also eases the complexities 
 of network and storage configuration through an simple to use 
 graphical user experience. Baked into Fuel are:

 * Mirantis reference architectures that we’ve tested and certified
   to ensure that your deployed cloud can scale, is reliable and is
   production quality.

 * An open and flexible library that enables customers to make 
   configuration changes that may be more advanced or focused than 
   the default choices within Fuel. This library also empowers 
   organizations to fold additional drivers or integrations into 
   the deployed environment.

* **Mirantis OpenStack hardened packages**

 These packages include the core OpenStack projects, updated with 
 each stable release of OpenStack. Also included are: 

 * Packages to ensure high availability

 * Any defect fixes reported by our customers that may not yet 
   have been merged into the community source.

 * Mirantis driven premium OpenStack projects (e.g. Savanna and Murano)

 * Mirantis certified partner plug-ins, drivers and integrations
 
 Another benefit you get from Mirantis OpenStack as compared to some
 competitors is our broad support for operating systems, hypervisors
 and deployment topologies.  We  don’t restrict your choices to one
 OS or one hypervisor type like some of our competitors.  In addition,
 you can choose the OpenStack roles you want on each available node.

* **Mirantis Support**

 In addition, Mirantis OpenStack offers a subscription to our 
 world-class support with defined service level agreements based on 
 the severity of your issue.  For example, with premium support we 
 guarantee a response in one hour for severity 1 issues.


New Features in Mirantis OpenStack 3.2
--------------------------------------

* Expanded choice of Ubuntu, CentOS or Red Hat Enterprise Linux as 
  the host Operating System
* Mirantis OpenStack hardened packages synchronized with latest stable 
  OpenStack Grizzly maintenance release
* Guided deployment wizard to simplify environmental configuration
* Ability to combine multiple roles onto a single node for HW consolidation
* Inclusion of Inktank’s Ceph software-defined storage system in the 
  hardened packages and the ability to deploy Ceph via Fuel
* Neutron (Quantum) as a deployment choice from the Fuel UI
* Inclusion of the OpenStack Savanna and Murano projects in the 
  hardened packages and the ability to deploy them via Fuel
* Published API to Fuel for Create, Read, Update & Delete (CRUD) 
  operations
* Additional High Availability tests added to OpenStack Health Check
* Ability to register Fuel from within the UI
* Extended configuration menu during Fuel Master Node install for 
  network settings
* Pre-deployment check for conflicting DHCP servers in network
* Expansion of log management to include OpenStack logs and configurations
* Reporting of node usage and assigned roles
* Increase security with dynamic and unique SSH keys for VM Migration

Expanded choice of Ubuntu, CentOS or Red Hat Enterprise Linux as the host Operating System
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Fuel 3.2 has added support for deploying the Mirantis OpenStack 
hardened packages onto Ubuntu 12.04 as a host Operating System for 
the OpenStack nodes.  The Ubuntu 12.04 operating system is included 
in the ISO for Mirantis OpenStack, so you can select Ubuntu from 
the Releases window and deploy without requiring Internet access or 
downloading additional software.  This expands your choices for 
deployment to Centos with Mirantis OpenStack hardened packages, Red 
Hat Enterprise Linux with Red Hat Open Stack or Ubuntu with Mirantis 
OpenStack hardened packages.  

Mirantis OpenStack hardened packages synchronized with latest stable OpenStack Grizzly maintenance release
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The OpenStack core projects in the Mirantis OpenStack hardened 
packages have been synchronized with the OpenStack Grizzly 2013.1.3 
bug fix update.  Fuel 3.2 will deploy this 2013.1.3 version of Grizzly 
when deploying an OpenStack environment on CentOS or Ubuntu.  

Guided deployment wizard to simplify environmental configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
New in Fuel 3.2 is a guided deployment wizard that will walk you 
through the major decisions regarding your desired OpenStack 
configuration prior to deployment.  This wizard will enable you to 
make a choice about:

* Operating System and distribution combination
* Reference architecture
* Hypervisor
* Networking service
* Storage backend for Cinder
* Storage backend for Glance
* Installation of Savanna premium project (Hadoop for OpenStack)
* Installation of Murano premium project (Windows data services for OpenStack)

Your decisions about hypervisor, network, storage backends and premium 
project installation can be reviewed and changed on the Settings tab 
prior to deployment.  If you wish to change your choice regarding OS, 
distribution, network service or reference architecture you will need 
to delete your proposed environment and restart the wizard.   

Ability to combine multiple roles onto a single node for HW consolidation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To provide additional flexibility and options during deployment of 
your OpenStack Cluster, Fuel 3.2 now enables certain roles to be 
combined together onto a single node.  Previously, for example, Cinder 
could only be deployed as a standalone node from the Fuel UI.  Now, 
Cinder can be combined with a Controller or Compute node or Ceph can be 
combined with a Controller or Compute node.

To make this process even easier, we’ve added the ability to assign the 
same roles to multiple nodes in a single operation.  Just select the 
unallocated nodes that you want to share a common role, choose the role 
and then apply.  You can also group nodes by similar hardware types, 
allowing you to select all the nodes of a particular hardware configuration 
for role assignment with one click.

Once assigned, you can review the nodes and roles assigned to those 
nodes by grouping in a similar manner - either by roles or by hardware 
configuration.

In addition to role assignment, you can also configure the network 
interfaces or disk configuration for a set of nodes from the Fuel UI.  
Once you’ve selected one or more allocated nodes, the Configure Disks and 
Configure Interfaces buttons will become active if the nodes you’ve 
selected share a similar disk configuration or number and type of network 
interfaces.

Inclusion of Inktank’s Ceph software-defined storage system in the 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
hardened packages and the ability to deploy Ceph via Fuel
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Included now in the Mirantis OpenStack hardened packages is Inktank’s 
Ceph software-defined storage system.  Ceph can be used either as an 
object storage option for Glance or as a block storage option for Cinder. 
As you define an OpenStack environment through the Fuel UI, you may 
choose to use Ceph for one, both or neither of these functions.  In 
addition, you may choose where to install the Ceph roles - either as 
a standalone node or combined with a Controller or Compute node.

Neutron (Quantum) as a deployment choice from the Fuel UI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Previous versions of Fuel enabled deployment of Neutron (Quantum) 
through the Fuel CLI Library.  In Fuel 3.2, the ability to deploy 
Neuton as the network component for OpenStack has been elevated to 
the Fuel UI as well.  Neutron can be configured to use Generic 
Routing Encapsulation (GRE) segmentation or VLAN segmentation from 
the deployment wizard.  Additional settings can be through the Network 
settings tab prior to deploying the OpenStack environment.

Inclusion of the OpenStack Savanna and Murano projects in the hardened 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
packages and the ability to deploy them via Fuel
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Savanna and Murano are related OpenStack projects initially led by 
Mirantis.  Savanna enables on demand provisioning of Hadoop clusters 
that can run on top of OpenStack.  Savanna includes support for many 
different distributions of Hadoop including Hortonworks, Cloudera and 
even Intel.  This empowers Big Data solutions to take full advantage of 
the elastic nature of OpenStack. Savanna is currently a project that’s 
in incubation, but we’re confident that it will become a full project 
in OpenStack in a future release of OpenStack.
Murano enables windows based services to be deployed on top of 
OpenStack.  These datacenter services include Active Directory, IIS, 
Microsoft SQL and ASP.NET.  This enables companies to provide 
developers or end users with Window’s based services that they either 
depend on, or as a tool for transitioning them away from legacy 
dependencies toward open source or other offerings.

Both of these projects are now included in the Mirantis OpenStack 
packages and can be configured for deployment on top of OpenStack 
through Fuel.  Initial configuration is done via the Fuel UI but 
Savanna and Murano also integrated into Horizon, enabling further 
configuration to be done natively from the OpenStack dashboard.

In addition to the ability to deploy Savanna or Murano, additional 
tests have been added to the OpenStack Health Check to confirm the 
successful deployment and operational status of Savanna and Murano.

Published API to Fuel for Create, Read, Update & Delete (CRUD) operations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The API originally created between the Fuel UI and Fuel CLI Library is
now public and available in Fuel 3.2.  This RESTful API enables 
auxiliary applications to activate standard CRUD operations (Create, 
Read, Update, Delete) to manage your cloud infrastructure through 
Fuel.  Using Fuel you could, for example, create a cloud on demand, 
remove a cloud that was no longer needed or add and remove nodes from 
an existing cloud.  This could be done either from a self-service 
portal or by your cloud operations staff.  In addition to cloud 
deployment operations, you can also run the health checks on demand 
or collect log information for troubleshooting.  Details on commands 
that can be executed through the API can be found in the extended 
documentation.

Additional High Availability tests added to OpenStack Health Check
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To confirm that a highly available deployment is configured properly 
and running as expected, an additional test module has been added to 
the OpenStack Health Check within Fuel.  This group of tests can be 
run separately or along with the other post-deployment health checks 
and can be activated via the API for automated confirmation of high 
availability.

Ability to register Fuel from within the UI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To ensure that self-evaluating customers get the support they need 
when they need it, an option has been added to the Support window 
in the Fuel UI that enables registration of Fuel once it has been 
installed.  This registration activates the 30 day complimentary 
basic subscription support, enabling evaluation customers to contact 
Mirantis world-class support via the Mirantis support portal with 
questions or issues. 

Extended configuration menu during Fuel Master Node install for network settings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Advanced customers deploying the Fuel master node into their own 
network setups with unique network parameters may need to specify a 
broader set of network settings (e.g. interfaces to use for PXE booting, 
IP address ranges, network masks, etc). Incorrect settings could result 
in permanent problems that are not easily corrected later.  To ensure 
that these critical parameters are set appropriately for the Fuel master 
node, a full featured configuration menu is now available during 
installation of the Fuel master node.  
To access this advanced menu, you may optionally press a key when 
prompted during the first boot of Fuel Master Node.  If a key is not 
pressed, the installation will continue automatically and the default 
values for parameters will be used.  
This menu, once activated, enables configuration of the managed network, 
network interfaces, DNS settings and access to the operating system 
through a shell login.  Once the parameters are saved, the installation 
continues. 

Pre-deployment check for conflicting DHCP servers in network
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To ensure your network is configured properly, the Verify Networks 
option in the Networks tab has been enhanced to check for conflicting 
DHCP servers.  Since the Fuel master node acts as a DHCP and PXE boot 
server for available nodes, a conflict would cause the deployment to 
fail.

Expansion of log management to include OpenStack logs and configurations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The types of logs collected by Fuel from the Logs tab has been 
increased to include the logs from OpenStack services.  In addition, 
OpenStack configuration files are now downloaded when collecting the 
logs from remote nodes onto the Fuel Master Node.  This collection is 
initiated from the Support screen on the main page of the Fuel UI.

Reporting of node usage and assigned roles
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To better manage your resources and assist with capacity planning, 
Fuel now tracks your node usage across all of your deployed clouds 
and makes that information available in a single report.  This report 
can be launched from within the Fuel UI or accessed as a CSV formatted 
file on the Fuel Master Node.  The report indicates the following:

* The environment name of deployed clouds
* The Node count for each cloud
* The total number of deployed nodes across all clouds
* The total number of discovered, unallocated nodes
* The number of nodes for each (combined) role configuration

Increase security with dynamic and unique SSH keys for VM Migration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In previous versions of Fuel, SSH-keys were hard coded and non-unique
for services using SSH as a communication protocol for VM migration 
and mysql replication.  In Mirantis OpenStack 3.2, unique SSH keys 
are generated per managed environment when that environment is deployed.

Resolved Issues in Mirantis OpenStack 3.2
------------------------------------------

Fuel doesn't work when the configured DHCP interface is not eth0
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In previous releases, the Fuel master node was configured by default 
to use the eth0 interface for DHCP and this settings was not easily 
changed.  The interface for DHCP can now be configured during the 
installation of the Fuel Master Node by utilizing the new Extended 
configuration menu during Fuel Master Node install for network settings.

OpenStack nodes won't boot if the boot order of the disks changed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Previously, after deployment of a OpenStack node, if the boot order 
of the disks was changed, the node would not boot properly. This issue 
has been corrected in Mirantis OpenStack 3.2.  

Glance cache is not properly cleaned up after deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The cache for Glance is located at /var/lib/glance/image-cache by 
default. In simple deployment mode Fuel creates a special Logical 
Volume Manager (LVM) for /var/lib/glance, to serve as a place for 
images (/var/lib/glance/images) and image-cache. Previously, this 
area was not cleaned up after deployment, so the initial size of 
images would take twice the required amount of space.  In the case 
of High Availability (HA) situations, Swift is used for storage but 
the cache is still in /var/lib/glance/image-cache.  In this case, the 
LVM is not installed (because Swift is used instead) so the image 
cache is written to the root partition.  Since the root partition is 
very small, it fills up quickly.  
In Mirantis OpenStack 3.2, these storage areas are properly cleaned up.

The KVM or QEMU hypervisors crashed due to incorrect disk cache mode
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If the parameter cache was set to 'none' in libvirt xml, the 
hypervisors could crash when launched on a compute node.  To correct 
this issue, the parameter disk_cachemodes is now set to 
"file=writethrough" in nova.conf, which protects the hypervisor from 
crashing in this scenario.

Namespaces support in CentOS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Previously, deployments using CentOS as the host operating system did 
not have default support for network namespaces.  In this release, 
CentOS deployments have network namespaces support built-in as provided 
by upstream fixes to the Linux kernel contributed by Mirantis. This 
built-in support allows greater flexibility with Neutron configurations 
for tenant networks.

Known Issues in Mirantis OpenStack 3.2
--------------------------------------

Support for OpenStack Grizzly
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following improvements in Grizzly are not currently supported 
directly by Fuel:

* Nova Compute

  * Cells
  * Availability zones
  * Host aggregates

* Neutron (formerly Quantum)

  * LBaaS (Load Balancer as a Service)
  * Multiple L3 and DHCP agents per cloud

* Keystone

  * Multi-factor authentication
  * PKI authentication

* Swift

  * Regions
  * Adjustable replica count
  * Cross-project ACLs

* Cinder

  * Support for FCoE
  * Support for LIO as an iSCSI backend

* Ceilometer

It is expected that these capabilities will be supported in a future 
release of Mirantis OpenStack.

In addition, support for High Availability of Neutron (Quantum) 
on Red Hat Enterprise Linux (RHEL) is not available due to a limitation 
within the RHEL kernel.  It is expected that this issue will addressed 
by a patch to RHEL in late 2013.  This issue does not affect the CentOS 
or Ubuntu distributions included in the Mirantis OpenStack hardened 
packages. 

Ability to deploy Swift as a standalone node is limited to Fuel Library
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
At this time, customers wishing to deploy Swift as a standalone node 
will need to do so through the Fuel Library.  An option to deploy 
these components as standalone nodes is not currently present in the 
Fuel UI.  It is expected that a future release will enable this 
capability.

Ability to add new nodes without redeployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
It’s possible to add new compute and Cinder nodes to an existing 
OpenStack environment. However, this capability can not be used yet 
to deploy additional controller nodes in HA mode.

Ability to deploy properly in networks that are not utilizing VLAN tagging
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
While included in Fuel and fully supported, network environments can 
be complex and Mirantis has not exhaustively identified all of the 
configurations where this feature works properly.  Fuel does not 
prevent the user from creating an environment that may not work 
properly, although the Verify Networks function will confirm necessary 
connectivity. As Mirantis discovers environments where a lack of VLAN 
tagging causes issue, they will be further documented.  Currently, a 
known limitation is that untagged networks should not be mapped to 
the physical network interface that is used for PXE provisioning.

Sanity Tests For Murano And Heat Are Broken
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Mirantis added sanity tests for Murano and Heat. The tests verify that 
these services work correctly after OpenStack cluster is deployed.
However, the tests may fail due to a bug.

Platform Tests' Limitations
^^^^^^^^^^^^^^^^^^^^^^^^^^^
Platform Tests ensure that platform level services operate correctly
after OpenStack cluster is deployed. Heat, Savanna and Murano services
are verified by Platform Tests. However due to a bug the tests are not
working properly and always fail.

Other Limitations
^^^^^^^^^^^^^^^^^
* The Fuel master node is installed with CentOS as the host Operating 
  System.  While OpenStack nodes can be installed with Ubuntu, Red Hat 
  Enterprise Linux or CentOS as the host OS, the Fuel master node is 
  only supported on CentOS.
* When using the Fuel UI, IP addresses for slave nodes (but not the 
  master node) are assigned via DHCP during PXE booting from the 
  master node.  Because of this, even after installation, the Fuel 
  master node must remain available and continue to act as a DHCP 
  server.
* When using the Fuel UI, the floating VLAN and public networks must 
  use the same L2 network and L3 Subnet.  In the UI, these two 
  networks are locked together, and can only run via the same physical 
  interface on the server.  This is due to a limitation in Neutron.
* Deployments done through the Fuel UI creates all networks on all 
  servers, even if they are not required by a specific role (e.g. A 
  Cinder node will have VLANs created and addresses obtained from 
  the public network).
* Some of OpenStack services listen on all interfaces, which may be 
  detected and reported by security audits or scans.  Please discuss 
  this issue with your security administrator if it is of concern in 
  your organization.
* The provided scripts that enable Fuel to be automatically installed 
  on VirtualBox will create separated host interfaces. If a user 
  associates logical networks to different physical interfaces on 
  different nodes, it will lead to network connectivity issues between 
  OpenStack components.  Please check to see if this has happened prior 
  to deployment by clicking on the “Verify Networks” button on the 
  networking tab.
* The networks tab was redesigned to allow the user to provide IP 
  ranges instead of CIDRs, however not all user input is properly 
  verified. Entering a wrong value may cause failures in deployment.
* When configuring disks on nodes where Ubuntu has been selected as 
  the host OS, the Base System partition is limited to the first disk
  and must be smaller or equal to the size of the first disk due to
  Ubuntu provisioning limitations.

How to obtain the product
-------------------------
Mirantis OpenStack is distributed as a self-contained ISO that, once 
downloaded, does not require Internet access to provision OpenStack 
nodes if deploying using the Mirantis OpenStack hardened packages.  
This ISO is available in the Fuel Download section of the Mirantis 
Portal.  Here you will also find the Oracle VirtualBox scripts to 
enable quick and easy deployment of a multi-node OpenStack cloud for 
evaluation purposes.

Contacting Support
------------------

You can contact support online, through E-mail, or by phone. 
Instructions on how to use any of these contact options can be found 
here: https://mirantis.zendesk.com/home.


Issues fixed in this release
----------------------------

*Management network not configured correctly during deployment*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Fixed the issue with the incorrect management network configuration. 
  The IP address is now correctly assigned to the network interface that belongs
  to management network. 
  
*Fuel-web rabbitmq use of short names should use IP addresses*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Short DNS name resolution now works on the Management networking, 
  satisfying a technical requirement in RabbitMQ
  
*Metadata issue in FuelWeb 3.0.1*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Kernel namespaces are enabled for CentOS in order to make Neuton metadata
  service operable. Ubuntu 12.04 LTS supports kernel namespaces out of the box.
  Red Hat will enable kernel namespaces in upcoming RHEL 6.5 release.
  Updated Cirros image with fixed Cloudinit component is included to the Fuel ISO.
  
*FuelWeb doesn't work when DHCP interface is not eth0*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Added the ability to set and configure DHCP settings to the Fuel Master Node 
  installation wizard.
  
*Add links to sub-headers in the Understanding the Puppet Manifest documentation page*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Added missing links to Fuel online documentation.
  
*Mistakes on page Configuring the network of Fuel Web docs*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Fixed Fuel online documentation
  
*Glance cache must be cleaned up periodically*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Added new controller health-check logic to maintain (manage?) free space, 
  cleanups, and so on. 

*RedHat subscriptions for RHOS-backed Fuel*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Corrected Fuel 3.2 security settings bug, blocking RHEL download for RedHat personnel, 
  if they were downloading RHEL distribution media from internal RedHat network.
  
*Nodes of OpenStack don't boot up if boot order of disks changed.*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Implemented a new partition manager that helps to eliminate issues with many hard drive configurations.
The fixed issues include:

* GRUB fails to boot a node when disk size exceeds 4 GB.
* GRUB fails to boot a boot if more than one single hard drives are connected to the target node

  
*Fuel can not install master node with disks larger than 3TB*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Added support for Fuel Master Node installation on disk drives that have capacities that exceed 2.2 TB.
  By default, GUID Partition Table is used.
   
*FuelWeb 3.0.1 Missing keystone_ec2_url configuration option in /etc/nova/nova.conf*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Fixed the issue with incorrect ``keystone_ec2_url`` parameter setting in ``/etc/nova/nova.conf``
  
*Debug logging option enabled out of box in "/etc/openstack-dashboard/local_settings"*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Changed the default setting of debug mode for the OpenStack dashboard to off.
  This eliminates the excessive log messages generation on controller nodes.
  This also reduces the log size on the Fuel Master as well.
  Debug mode can be enabled in Environment Settings before deploying.
  
*Default gateway is not defined on slaves for certain configuration*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Default gateway is correctly set for all configurations.
  
*Can not add security group to instance with Horizon dashboard*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Fixed the OpenStack dashboard issue. Due to the input validation bug, 
  Horizon incorrectly enables the usage of underscores in names of security groups. 
  This issue is fixed in the Havana OpenStack release. Havana refers to security
  groups by IDs, while Grizzly refers by names.
  
*KVM-QEMU crashes due to incorrect disk cache mode*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Fixed the issue when Fuel incorrectly sets KVM disk cache mode on bare-metal nodes.
  

*Smoke test fails at "Create new security group"*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Fixed smoke tests in Fuel UI.
 
*Traceback: fuel_health.tests.platform_tests.test_platform_savanna.PlatformSavannaTests.test_platform_savanna*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Fixed Murano+Savanna built-in smoke test failure.
  
  
Known issues
------------ 
  
*Instance volume doesn't create in Horizon*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Instance volume creation built-in test in OpenStack dashboard is broken.
  
*Size of networks change after moving to VLAN Manager and untagging*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Size of networks changes incorrectly after all networks made untagged and VLAN manager selected.
  
*Red Hat OpenStack with HA: error on controller and compute nodes*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  RHOS may fail to deploy with default settings in HA mode
  
*No storage and management network ranges in astute.yaml with Neutron*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Ceph uses storage_network_range and management_network_range keys in fuel_settings 
  to configure Ceph cluster and public networks. 
  When Neutron is enabled, these settings are not present in astute.yaml.
  
*If controller-1 runs out of space, HA breaks and OpenStack API fails*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  OpenStack API and RabbitMQ stops operation in case Controller1 runs out 
  of free space on root partition.
  
*Using hardware iSCSI as backend for Cinder and Swift*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  OpenStack documentation does not include description for several built-in
  Cinder backend drivers. Need to add description for OpeniSCSI driver, since 
  it is not clear for all customers how to connect remote iSCSI target to Cinder.
  
*Can not create more than one volume in Horizon*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Google Chrome issue. Several fast clicks to Create Volume button make OpenStack 
  dashboard completely stuck until cookies not cleared.
  
*Separate netmask field for storage network on network settings page*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Need to add ability to define the netmask separate with the address range Fuel
  assigns to deployed nodes.
  
*Ubuntu: quantum agents crm start hangs randomly*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  One of quantum agents instances may hang at start step when deployed in HA mode.
  
*Upgrade scsi-target-utils package to version 1.0.25 or higher*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  scsi-target-utils prior to version 1.0.25 may fail in case user creates several 
  volumes at the same time using some batch script.
  
*Redesign rc-scripts for quantum-<...>-agent*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Neutron OVS agent drops all virtual networks and related settings on compute node after 
  manual restart. Normally it is managed by Controller and get all settings from it.
  
*deleting a node should remove it from nova services*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Nova-compute service list does not updated after the node was deleted from 
  OpenStack cluster and continues to show already deleted nodes as shut down.
  
*(/Strage[main]/Nova::Api/Exec[nova-db-sync]) change from notrun to 0 failed:*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Fuel deployment may fail because `nova-db sync` failure to access the controller node 
  via mgmt interface despite the Fuel network test show all is OK.
  
*Nodes failed to reboot*
^^^^^^^^^^^^^^^^^^^^^^^^
  OpenStack deployment with nova-network and VLAN manager may fail with the following
  Cobbler error: `internal error, unknown distro name bootstrap`
  This issue happens because Cobbler SSH fence agent is unable to login to the 
  bootstrap node.
  
*Public network in Neutron must be IP range, not CIDR*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Fuel does not allow to use IP ranges for Public network with Neutron enabled.
  
*CentOS kickstart does not wipe volume groups*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Fuel does not silently erase existing volume groups on the node before creating
  new ones at the time of OpenStack node deployment.

*Need validation of network ranges*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  It is possible to create several networks with the same network number. 
  It causes issues with instances can't obtain DHCP address.

*quantum net unreachable long time (5-6 minutes)*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Neutron L3 agent migration time may exceed 5 minutes.

*Only 10 Gb for / partition*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Fuel installs OpenStack nodes with too low free space on root partition.

*IntegrityError: (IntegrityError) null value in column "mac" violates not-null constraint*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Puppet agent may save incorrect data to master node.
  
*Test "Stack list availability" has failed without any messages*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  OSTF tests may fail without any messages.

*Test "Create stack, check its details, then update and delete stack" has failed without any messages*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  OSTF tests may fail without any messages.

*Puppet need certificate. Deployment on Ubuntu has failed*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Ceph node deployment may fail due to Puppet certificate error.

*Ubuntu: OSTF run: Unable to launch instance*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Libvirt-bin for Ubuntu should be updated to version 1.1.1

*Check network connectivity from instance without floating IP" functional test failed on good ha nova-network env*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  External DNS accessibility test fails when external DNS is actually accessible.

*OSTF tests skip "Create instance flavor"*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Test "Create instance flavor" is skipped by mistake.

*Traceback: fuel_health.tests.sanity.test_sanity_murano.MuranoSanityTests.test_create_and_delete_service*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Murano (Windows virtual machine support in OpenStack) tests failure.
  This failure happens by design - manual test preparations from user side
  required to run Murano tests.
  These steps may be found at https://github.com/Mirantis/fuel-docs/pull/29
  
*Traceback: fuel_health.tests.platform_tests.test_murano.MuranoDeploymentSmokeTests.test_deploy_sql_cluster*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Issue with SQL cluster deployment in built-in smoke tests.

*Traceback: fuel_health.tests.platform_tests.test_murano.MuranoDeploymentSmokeTests.test_deploy_iis_farm*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Issue with AD,  IIS and ASPNet farm deployment in built-in smoke tests.

*Traceback: fuel_health.tests.platform_tests.test_heat.TestStackAction.test_stack*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Broken test stack in built-in smoke tests.

*RHOS HA mode: Test "Check data replication over mysql" failed without message*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  MySQL data replication test under RHOS in built-in smoke tests is broken.
