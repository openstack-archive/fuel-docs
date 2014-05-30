
.. _nova-network-term:

Nova Network
------------

The Nova-network model was the original networking model for OpenStack.
It supports two topologies -- the FlatDHCPManager and VLAN Manager --
that can be used to deploy private networks for tenants;
see :ref:`nova-topologies-arch`
for more information about using Nova-network in Mirantis OpenStack.

Nova network is scheduled for deprecation
in favor of the :ref:`neutron-term` network model.
See `Deprecation of Nova Network <http://docs.openstack.org/trunk/openstack-ops/content/nova-network-deprecation.html>`_ for more details.

:ref:`net-topology-plan` gives considerations
for choosing a network topology.
