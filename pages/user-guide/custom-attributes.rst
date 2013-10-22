Passing Custom Attributes From Fuel To Puppet
---------------------------------------------

You can also modify provisioning and deployment facts before passing them further. This operation can be done at your own risk, and after that some features might become unaccessible from UI. Also, there will be a warning telling that some attributes were modified from the outside.

This procedure now is available through Fuel-CLI.

Firstly, you should setup an environment as always, assign roles to nodes but don't start deployment yet. Now you can dump provisioning facts in YAML using this command::

   fuel --env 1 provisioning default

For deployment facts, this will be::

   fuel --env 1 deployment default

where ``--env 1`` is global optional argument pointing to specific environment.

This command will create a directory called "provisioning_1" (or "deployment_1" in case of deployment facts), which will include a number of YAML files corresponding to roles, which are currently assigned to nodes. Each file includes facts for current role, so you can freely modify and save them. The command for applying changes is::

   fuel --env 1 provisioning upload  # or 'deployment'

You can also use ``--dir`` option to set a directory where to load facts from, if it's not default.

This operation leads to two things:
	
	* facts which are about to send to orchestrator are replaced completely with the ones you specified
	* cluster sets *is_customized* flag, which is checked by UI, so you will get a message about facts customization

Passing custom attributes can be helpful in cases you have some Puppet manifests which should be run, but are not supported by Fuel itself.