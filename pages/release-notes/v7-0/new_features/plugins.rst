
.. _plugins_rn_7.0:

Fuel Plugins
++++++++++++

* Previously, VIP reservation was based on network metadata.
  Now, VIP reservation is based on the network roles description,
  enabling a plugin developer to create extra VIPs to be used in
  developer's deployment scripts.
  See more in
  `Virtual IP reservation via Fuel Plugin's metadata <https://wiki.openstack.org/wiki/Fuel/Plugins#Virtual_IP_reservation_via_Fuel_Plugin.27s_metadata>`_
  section of the Fuel Plugins SDK.

* After adding and enabling custom plugins for
  a cluster, you can now define a new role described in these plugins
  via Fuel Web UI as well as via :ref:`Fuel CLI<cli_usage>`.
  You can find more information in
  `Configuration of Fuel Plugins with new roles <https://wiki.openstack.org/wiki/Fuel/Plugins#Configuration_of_Fuel_Plugins_with_new_roles>`_
  section of the Fuel Plugins SDK.

* Fuel 7.0 enables you to separate the main services from the Controller role
  and deploy them on a custom role with a plugin.
  See `How to separate services from Controller with a plugin <https://wiki.openstack.org/wiki/Fuel/Plugins#How_to_separate_services_from_Controller_with_a_plugin>`_
  for details.

* Sometimes, new functionality, minor updates, or security fixes
  should be delivered. Hence, a plugin developer creates a new version
  of a plugin. For more information on how
  Fuel plugin versioning works, see
  `Plugin versioning system <https://wiki.openstack.org/wiki/Fuel/Plugins#Plugin_versioning_system>`_
  section of the Fuel Plugins SDK.
