
Fuel 6.0 can update existing 5.x Mirantis OpenStack environments (Experimental)
-------------------------------------------------------------------------------

An :ref:`experimental feature<experimental-features-term>` enables the Fuel
Master Node to update existing 5.x environments to more recent maintenance
releases of Mirantis OpenStack releases within the same release series (e.g.
5.0.2 to 5.0.3, or 5.1 to 5.1.1). Once the Fuel Master Node is upgraded, the UI
provides an option to update an existing environment.

See :ref:`update-openstack-environ-ug` for instructions. You can also use Fuel
CLI to update the environment; see :ref:`cli_usage` for details.

.. note::
  No update functionality is provided in the 6.0 Technical Preview release. You
  cannot update from an earlier Fuel version and you will not be able to update
  to the 6.0 GA release from the 6.0 Technical Preview release.

.. note::
  If you are running Fuel 4.x or earlier, you cannot upgrade but must install
  Mirantis OpenStack 6.0 and redeploy your environment to use the new release.

