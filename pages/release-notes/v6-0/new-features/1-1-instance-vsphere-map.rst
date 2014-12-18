
1:1 mapping between Nova Compute service instance and vSphere cluster
---------------------------------------------------------------------

Fuel 6.0 supports 1:1 mapping between the :ref:`Nova compute<nova-term>`
service and the :ref:`vSphere<vsphere-term>` clusters that are formed by
:ref:`ESXi<esxi-term>` hosts. Earlier releases used a 1-to-many mapping,
meaning that all vSphere clusters were managed by a single vCenter server. This
created a single point of failure; if the service failed for some reason, the
entire cloud lost access to Compute resources.

Fuel 6.0 launches multiple instances of the Nova Compute service and configures
each service to use a single vSphere cluster. The Nova Compute service runs on
OpenStack Controller nodes as it always did. See the `1-1 mapping between
nova-compute service instance and vsphere cluster
<https://blueprints.launchpad.net/fuel/+spec/1-1-nova-compute-vsphere-cluster-mapping>`_
blueprint for implementation details.

