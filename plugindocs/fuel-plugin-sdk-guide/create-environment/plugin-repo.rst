.. _plugin-repo:

Request an OpenStack repository
-------------------------------

When you are ready to move your plugin project to a repository
in the OpenStack namespace, request a repository in the Fuel for
OpenStack Launchpad project.

Before requesting an OpenStack repository, verify that you have
the following:

* An account in Launchpad.
* A list of members to whom you want to grant the core reviewer
  status in your plugin project.
* A list of members to whom you want to grant the release developer
  status.

**To request an OpenStack repository:**

#. Ensure you are registered with the following resources:
#. Go to the `Fuel project in Launchpad <https://launchpad.net/fuel>`_.
#. Click :guilabel:`Report a bug`.
#. In :guilabel:`Summary`, type in ``Create a Fuel Plugin project in
   /Openstack``.
#. In the :guilabel:`Further information` field put the following details:

   * Plugin name.
   * Plugin functionality overview.
   * Developer's contact information (email, skype, etc.).

     Ensure that all members to who you want to grant the core reviewer rights
     are registered at
     `<https://review.openstack.org>`__. Otherwise, they cannot be granted the
     core review status.

   * List of core review developers with contact information: name, email in
     `<https://review.openstack.org>`__. These developers will merge changes.
   * List of release developers with contact information: name, email in
     `<https://review.openstack.org>`__. These developers will create release
     branches and tags in the repository.
     `Example <https://review.openstack.org/#/admin/groups/692,members>`__.

#. Click :guilabel:`Extra`.
#. In :guilabel:`Tags`, type ``devops``.

   When the Launchpad ticket is marked ``Fix Committed`` or ``Fix Released``,
   your repository is created.

#. Fill your repository with the required files:

   * Your plugin code. See :ref:`describe-plugin`.
   * Documentation.
