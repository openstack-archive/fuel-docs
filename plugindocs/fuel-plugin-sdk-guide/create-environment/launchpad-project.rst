.. _launchpad-project:

Launchpad project
-----------------

Launchpad is the bug tracking system that all OpenStack projects,
including Fuel and Fuel plugins, use. You must create a Launchpad
project as described in the official Launchpad documentation and
use it as a single entry point for reporting issues on your plugin
and tracking development progress.

All Fuel plugins must follow the following conventions:

* The project name must be in the ``fuel-plugin-<your plugin's name>``
  format.
* The project page must link to the source plugin repository and its
  entry in `DriverLog <https://wiki.openstack.org/wiki/DriverLog>`_.
* The project teams must incorporate all development team members.
* The milestones must repeat the plugin release specified in the
  ``metadata.yaml file``. For example, ``1.0.0``, ``2.0.0``.

.. seealso::

   - `List of existing Launchpad projects <https://wiki.openstack.org/wiki/Fuel/Plugins/Launchpad_projects_list>`_
   - `Launchpad documentation <https://help.launchpad.net/Projects>`_
