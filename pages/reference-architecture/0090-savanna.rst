.. index:: Savanna Deployment

.. _savanna-deployment-label:

Savanna Deployment
------------------

Savanna is a service for launching Hadoop clusters on OpenStack. It is
designed to be vendor-agnostic and currently supports two distributions:
Vanilla Apache Hadoop and Hortonworks Data Platform. For Savanna usage
guidelines consider reading User Guide section of the Savanna docs located
here: http://savanna.readthedocs.org/en/0.2.2

**Notes and Limitations**

Currently Savanna does not configure security groups, and at the same
time it requires access to the VMs. That means that the default
security group must have 22 port open for Savanna to work properly.
HDP plugin also requires 8080 port to be open. Also you might have
to open some ports for your use, like 50030 and 50070 to access
JobTracker and NameNode web interface, or 80 to access Ambari console
if HDP plugin is used. Also any inter-VM communication must not be
blocked. That is a requirement only for tenants where
Savanna will be used.

Note that Fuel configures Savanna to use floating IPs to access and
configure VMs. If your installation does not have floating IP auto
assignment enabled (for nova-network) or Neutron is used, then on
each Hadoop cluster launch you will need to specify network from
which Savanna should assign floating IPs to the cluster nodes.

Hadoop requires at least 1G of memory to run. That means you must
use flavors having not less than 1G of memory for Hadoop cluster
nodes.
