
.. _plugin_versioning_system:

Plugin versioning system
------------------------

When the developer adds new functionality to a plugin, minor updates
or security fixes should be delivered.
The plugin developer creates a new version of the plugin: this can be
a major version or a minor one:

* Major -- Changes in API, functionality, major OpenStack release introduced.
* Minor -- Security fixes only.

The plugin versioning is the following:

+-----+-----------------------+---------------------+-----------------+---------+---------+
|     | **Plugin file format**|**fuel-plugin value**|**metadata.yaml**|**major**|**minor**|
+-----+-----------------------+---------------------+-----------------+---------+---------+
| RPM | fuel-plugin-1.0-1.0.0 | 1.0                 | 1.0.1           |1.0.0    | 1.0.1   |
+-----+-----------------------+---------------------+-----------------+---------+---------+

**Plugin versioning example**

If a plugin has version ``1.0.1`` in the ``metadat.yaml`` file, the file name
of the plugin must be ``plugin-1.0-1.0.1-N.rpm``.

If you use the default setting of the Fuel plugin builder, N equals 1. You can
also specify a value from the ``build_version`` variable defined in the
:ref:`metadata.yaml` file that allows to iterate the package version without
updating the plugin version.

Update procedure
~~~~~~~~~~~~~~~~

+-----+----------+-------------------------------------------------------------------------------------+
|     |**Update**|**Limitations**                                                                      |
+-----+----------+-------------------------------------------------------------------------------------+
| fp  |  No      | 1.0                                                                                 | 
+-----+----------+-------------------------------------------------------------------------------------+
| RPM |  Yes     | Can be updated to minor version only with *fuel plugins --update <fuel-plugin-file>*|
|     |          | command. To get a major one, user has to download it from `Fuel Plugins Catalog     |
|     |          | <https://www.mirantis.com/validated-solution-integrations/fuel-plugins/>`_ and      | 
|     |          | create a new environment from scratch.                                              |
+-----+----------+-------------------------------------------------------------------------------------+

Versioning scheme
~~~~~~~~~~~~~~~~~

* Versioning does not support the ``.fp`` plugins. The user must download and
  install the ``.fp`` plugin from scratch.
* For RPM plugins, the versioning is as follows:

.. image:: /_images/deliverables/scr_plugin_versioning.png
   :width: 70%
   :align: center

.. note::
     Change the versioning scheme for customized packages to
     have a clear indicator which package is installed - the official
     Mirantis OpenStack or customized ones. Otherwise, check the
     Python files to understand which package is actually installed.
