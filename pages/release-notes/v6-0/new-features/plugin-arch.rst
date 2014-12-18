
Pluggable Architecture
----------------------

Fuel 6.0 supports a pluggable architecture that allows new functionality to be
added to Fuel from a self-contained archive. Tools are provided that allow
contributors to package and test Fuel plugins.

This first release of the Pluggable Architecture feature has the following
constraints:

- The plugin cannot change the business logic and should not contain any
  python code for deployment orchestration logic; python can be used for
  deployment, as can bash and Puppet.
- The plugin can provide additional attributes for the environment.
- The plugin must not add a new kernel.
- The plugin must not modify provisioning data.
- The plugin must not modify deployment data other than new data that
  qualifies as "cluster attributes" for :ref:`Nailgun<nailgun-term>`.

To install a plugin, the operator downloads the plugin package to the Fuel
Master node then runs the following command to install it::

  fuel plugins --install some/path/fuel_plugin_name-1.0.0.fp

See the `Plugins for neutron/cinder in fuel
<https://blueprints.launchpad.net/fuel/+spec/cinder-neutron-plugins-in-fuel>`_
blueprint and `Add cli commands to interact with plugins
<https://github.com/stackforge/fuel-web/commit/316b8854afe06fec1afd0b9d61f404825864dcb4>`_
for implementation details.

