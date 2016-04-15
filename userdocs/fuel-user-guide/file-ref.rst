.. _file-ref:

Fuel configuration files reference
==================================

You can modify some of the Fuel settings directly in the corresponding
configuration files.

.. warning:: For advanced OpenStack users only!
   Editing the Fuel configuration files
   may severely damage your OpenStack environment.

After you modify a ``yaml`` file, you will get an notification in
the Fuel web UI that some settings have been changed and, therefore,
some features may become inaccessible in the Fuel web UI.

The following table provides descriptions of the Fuel configuration files.

+-------------------------------+-------------+------------------------------+
| File                          | Node        | Description                  |
+===============================+=============+==============================+
| :ref:`astute-yaml-master-ref` | Fuel Master | Configuration attributes     |
|                               | node        | passed to Puppet             |
+-------------------------------+-------------+------------------------------+
| :ref:`astute-yaml-target-ref` | Fuel Slave  | Configuration attributes     |
|                               | nodes       | passed to Puppet             |
+-------------------------------+-------------+------------------------------+
| :ref:`engine-yaml-ref`        | Fuel Master | Provisioning engine (Cobbler)|
|                               | node        | and basic configuration of   |
|                               |             | the Fuel Slave nodes         |
+-------------------------------+-------------+------------------------------+
| :ref:`network-1-yaml-ref`     | Fuel Master | Network group configuration  |
|                               | node        |                              |
+-------------------------------+-------------+------------------------------+
| :ref:`openstack-yaml-ref`     | Fuel Master | Basic configuration of the   |
|                               | node        | Fuel Slave nodes             |
+-------------------------------+-------------+------------------------------+
| :ref:`settings-yaml-ref`      | Fuel Master | Fuel settings                |
|                               | node        |                              |
+-------------------------------+-------------+------------------------------+

This section includes the following topics:

.. toctree::
   :maxdepth: 1

   file-ref/astute-yaml-master.rst
   file-ref/astute-yaml-target.rst
   file-ref/engine-yaml.rst
   file-ref/network-1-yaml.rst
   file-ref/openstack-yaml.rst
   file-ref/settings-yaml.rst
