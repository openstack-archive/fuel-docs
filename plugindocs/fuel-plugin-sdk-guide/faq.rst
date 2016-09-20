.. _faq:

FAQ
===

**Where can I find the Fuel Plugin Builder source code?**

You can find the source code for Fuel Plugin Builder and basic plugin
examples in the `fuel-plugins <https://github.com/openstack/fuel-plugins>`_
repository.

**Are there any plugin examples?**

The basic plugin examples are in the
`fuel-plugins <https://github.com/openstack/fuel-plugins>`_ repository.

For the existing plugins with open source code, see the section
:ref:`existing-plugins`.

**I need to provide some external packages within my plugin,
but I do not want to place them in the plugin repository. Is there
any other way?**

Use the ``pre_build_hook`` script to download packages in the
required directories:

.. code-block:: ini

  #!/bin/bash
  set -eux

  ROOT="$(dirname `readlink -f $0`)"
  RPM_REPO="${ROOT}"/repositories/centos/
  DEB_REPO="${ROOT}"/repositories/ubuntu/

  wget -P "${RPM_REPO}" http://mirror.fuel-infra.org/fuel-plugins/\
  6.0/centos/glusterfs-3.5.2-1.mira2.x86_64.rpm
  wget -P "${DEB_REPO}" http://mirror.fuel-infra.org/fuel-plugins/\
  6.0/ubuntu/glusterfs-client_3.5.2-4_amd64.deb

In this example, the hook downloads two packages to the plugin's directories
before Fuel Plugin Builder starts the build process.

**What is the user context that the Fuel plugin hooks are invoked in:
root or fuel user?**

Fuel executes the plugin hooks under the root user.

**Are there role-naming conventions for plugins?**

There are no strict requirements for naming plugin roles. We recommend using
a role name that contains the name of your product and unequivocally
associates with the plugin.

**The large installer file stays a deployed node in ``/etc/fuel/plugins/...``
after the deployment completes. Should we remove it after a successful
deployment on a node to save space?**

We recommend providing any product specific files as packages that are put in
the repositories on the Fuel master nodes. The other option is to download the
files from external sources at the time of the deployment.

With downloading the files from external sources, you can update the
product specific packages without updating the plugin itself. The files copied
to ``/etc/fuel/plugins`` are synced to the target nodes anew when the
deployment starts; this includes the cases when we only start a subset of
tasks by hand. This might be non-optimal to store the files in external
source and delete the files in plugin code.

**I don't see a way to add just my one new role for a plugin to an
already-deployed BASE_OS machine.**

Plugins are not expected to use the BASE-OS role.The BASE_OS role is not
intended to be combined with other roles. This role should be used when
you want to install just an operating system and do the rest of the work
manually. The Fuel plugin should either define its own roles
or add tasks to already existed roles. The operating system is installed
automatically when the plugin defines its own roles.