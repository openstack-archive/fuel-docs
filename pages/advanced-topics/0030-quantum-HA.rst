OpenStack Networking HA
-----------------------

NOTE:  THIS DOCUMENT HAS NOT BEEN EDITED AND IS NOT READY FOR PUBLIC CONSUMPTION.

Fuel 2.1 introduced support for OpenStack Networking utilizing a high-availability configuration. To accomplish this, Fuel uses a combination of Pacemaker and Corosync to ensure that if the networking service goes down, it will be restarted either on the existing node or on separate node.

This document explains how to configure these options in your own installation.

