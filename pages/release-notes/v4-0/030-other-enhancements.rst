Other Enhancements
==================

Ceph storage support expanded (experimental)
--------------------------------------------

The Nova (Compute) service in Mirantis OpenStack now supports VM instances
backed by ephemeral volumes stored in Ceph. With Glance, Cinder, and Nova
all supporting the Ceph RBD backend; OpenStack VM instances can now take
advantage of Ceph clustered storage capabilities through all of the steps
of their life cycle. Ephemeral volumes can be created as copy-on-write
clones of Glance images, recovered from Compute node failures thanks to
Ceph object replication, and shared among Compute nodes to enable a live
migration of VMs.

Due to a `known Ceph issue <http://tracker.ceph.com/issues/5426>`_
that could lead to a `Ceph SEGV error while extracting cloned images from RBD <https://bugs.launchpad.net/fuel/+bug/1260911>`_,
there is a small possibility that an ephemeral volume may become corrupted when
using this feature. Due to such a possibility, this feature is considered
experimental and should only be used for evaluation purposes. Use in production
environments is not recommended. Mirantis is working closely with InkTank to
resolve this issue as soon as possible and if a resolution is quickly found,
a patch will be released to Mirantis OpenStack 4.0.

Internationalization of the Fuel UI is now available (experimental)
-------------------------------------------------------------------

The Fuel project has added a framework that enables partners and community
members to localize the Fuel UI by modifying the `translate.json <https://github.com/stackforge/fuel-web/blob/master/nailgun/static/i18n/translation.json>`_
file. A sample that translates the UI into zh-CN (Simplified Chinese) has been
created by a community partner, 99cloud, and can be found in the file.
The framework is currently experimental.

Added selective node deployment/provisioning
--------------------------------------------

In earlier releases, the Fuel UI and CLI deployed the operating system
and OpenStack components in a single action activated by the "Deploy
Changes" button on the UI or the ``deploy`` command via CLI. In Mirantis
OpenStack 4.0, it is possible to deploy the operating system and OpenStack
components in separate actions. This option is not expected to be used
for typical deployments but may be useful in focused development or
testing scenarios like OpenStack scalability testing as part of the
`OpenStack Rally <https://wiki.openstack.org/wiki/Rally>`_ project.

Validation of user-supplied network settings has been improved
--------------------------------------------------------------

Additional error checking has been added to the Fuel UI when entering
information into the network settings under the Network tab. A full
list of the limitations that are checked can be found on `OpenStack Etherpad
<https://etherpad.openstack.org/p/limitations-of-networking-configuration>`_.

Performance of virtual machines
-------------------------------

The default value for the CPU governor on Compute nodes has been changed
to 'performance'. This change is expected to increase the overall speed
and responsiveness of virtual machines for almost all physical hardware.

Swift ring partition power is being dynamically calculated
----------------------------------------------------------

The default value for the Swift ring partition power is now being calculated
according to https://answers.launchpad.net/swift/+question/211929. This places
some restrictions on the maximum allowed number of devices in certain Swift
installations. If you want to increase the ability of your Swift installation to
be resized after the deployment, then you will need to set ``swift['resize_value']``
in the 'settings.yaml' file of your cluster using the Fuel CLI to the
corresponding value (which should be more than 2 in case you want to
extend your installation).
