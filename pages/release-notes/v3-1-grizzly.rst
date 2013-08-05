.. index:: Release Notes; v3.1-grizzly

.. _RelNotes_3.1:

v3.1-grizzly
============

New Features in Fuel 3.1
-------------------------

.. contents:: :local:

* Combined Fuel library and Fuel Web products
* Option to deploy Red Hat Enterprise Linux® OpenStack® Platform
* Mirantis OpenStack Health Check
* Ability to deploy properly in networks that are not utilizing VLAN tagging
* Integrated ability to connect to remote nodes via SSH
* Improved High Availability resiliency
* Horizon password entry can be hidden

Fuel 3.1 with Integrated graphical and command line controls
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In earlier releases, Fuel was distributed as two packages – “Fuel Web” for 
graphical workflow, and “Fuel library” for command-line based manipulation. 
Starting with this 3.1 release, we’ve integrated these two capabilities into 
a single offering, referred to simply as Fuel.  If you used Fuel Web, you’ll 
see that capability along with its latest improvements to that capability in 
the the Fuel User Interface (UI), providing a streamlined, graphical console 
that enables a point-and-click experience for the most commonly deployed 
configurations. Advanced users with more complex environmental needs can 
still get command-line access to the underlying deployment engine (aka “Fuel 
Library”).
  
Option to deploy Red Hat Enterprise Linux® OpenStack® Platform
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Mirantis Fuel now includes the ability to deploy the Red Hat Enterprise 
Linux OpenStack Platform (a solution that includes both Red Hat Enterprise 
Linux and the Red Hat OpenStack distribution).  During the definition of a 
new environment, the user will be presented with the option of either 
installing the Mirantis provided OpenStack distribution onto CentOS powered 
nodes or installing the Red Hat provided OpenStack distribution onto Red Hat 
Enterprise Linux powered nodes.

.. note:: A Red Hat subscription is required to download and deploy Red Hat 
    Enterprise Linux OpenStack Platform.
	
Mirantis OpenStack Health Check 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

New in this release is the Mirantis OpenStack Health Check which can be 
accessed through a tab in the Fuel UI.  The OpenStack HealthCheck is a 
battery of tests that can be run against an OpenStack deployment to ensure 
that it is installed properly and operating correctly.  The suite of tests 
exercise not only the core components within OpenStack, but also the added 
packages included in the Mirantis OpenStack distribution.  Tests can be run 
individually or in groups.  A full list of available tests can be found in 
the documentation.

Ability to deploy properly in networks that are not utilizing VLAN tagging
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In some environments, it may not be possible or desired to utilize VLANs to 
segregate network traffic. In these networks, Fuel can now be configured 
through the Fuel UI to disable the need for VLAN tagging.  This 
configuration option is available through the Network Settings tab.

Integrated ability to connect to remote nodes via SSH
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The ability to connect to a remote node via SSH is now available from the 
machine details screen.  SSH key management is automatically handled by 
Fuel, so the user need only click on she SSH Console button to connect.

Improved High Availability resiliency
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To improve the resiliency of the Mirantis OpenStack High Availability 
reference architecture, Fuel now deploys all HA services under Pacemaker, a 
scalable cluster resource manager developed by Clusterlabs.  Additional 
options in the Fuel Library have also been added to Corosync to enable more 
granular tuning. 

Horizon password entry can now be hidden
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In the OpenStack settings tab, the input of the password used for Horizon 
access can now be hidden by clicking on the "Eye" icon to the left of the 
field. The icon is a simple toggle that turns the feature on and off. 
