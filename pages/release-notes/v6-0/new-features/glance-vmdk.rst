
Glance can use VMDK as a storage backend
----------------------------------------

Glance can now use the vSphere Datastore (:ref:`VMDK<vmdk-term>`) as its
storage backend when vCenter is used as the hypervisor. This greatly reduces
the time required to copy images from Glance. See the `Use vSphere Datastore
backend for Glance with vCenter
<https://blueprints.launchpad.net/fuel/+spec/vsphere-glance-backend>`_
blueprint for implementation details.

