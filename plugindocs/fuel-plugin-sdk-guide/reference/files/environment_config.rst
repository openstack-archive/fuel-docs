.. _environment_config.yaml:

=======================
environment_config.yaml
=======================

Fuel uses the ``environment_config.yaml`` file for the additional attributes
that will appear on the :guilabel:`Settings` tab of the Fuel web UI.

When Fuel deploys the environment, these attributes pass to the task executor
so that the data is available in the ``/etc/astute.yaml`` file on each target
node and can be accessed from your bash or Puppet scripts.

Example:

.. code-block:: ini

	attributes:
		metadata:
			group: 'other'
			restrictions:
				- "settings:common.libvirt_type.value == 'kvm'"
		fuel_plugin_name_attr1:
			value: 'Set default value'
			label: 'Text field 1'
			description: 'Description for text field 1'
			weight: 25
			type: 'text'
		fuel_plugin_name_attr2:
			value: 'Set default value'
			label: 'Text field 2'
			description: 'Description for text field 2'
			weight: 25
			type: 'text'

The file should consist of the``attributes`` keywords, followed by ``metadata``
and the list of atttributes. The ``metadata`` keyword may contain ``group``
and ``restrictions``. 

For descriptions of the fields, refer to `this section`_ in Fuel Developer Guide.

.. _this section: http://docs.openstack.org/developer/fuel-docs/devdocs/develop/nailgun/customization/settings.html
