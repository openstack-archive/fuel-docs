.. _update_fuel:

============================
Update Fuel to latest Mitaka
============================

A number of the Fuel Newton and Ocata features are back-ported to Mitaka
after the Fuel Mitaka release. An important part of the update procedure
is the Linux kernel upgrade to version 4.4. You can update
the Fuel Master node to consume these features.

.. warning:: During the Fuel Master node update, its services are restarted
             as well as ``astute`` and ``nailgun``. Therefore, updating
             of the Fuel Master node can result in a downtime
             of the entire environment if any.

             Before applying the updates to production, you must plan a
             maintenance window and back up your deployment if any
             as well as test the updates on your staging environment.

**To update the Fuel Master node from the initially released Mitaka to the latest Mitaka version:**

#. Log in to the Fuel Master node CLI as root.
#. Add the update repository to the list of your repositories.
   For example, ``mos92-updates``:

   .. code-block:: console

     yum install -y http://mirror.fuel-infra.org/mos-repos/centos/mos9.0-centos7/9.2-updates/x86_64/Packages/mos-release-9.2-1.el7.x86_64.rpm

#. Clean the YUM cache:

   .. code-block:: console

      yum clean all

#. Install the ``mos-playbooks`` package:

   .. code-block:: console

    yum install -y mos-playbooks

#. Change the directory to ``mos_playbooks/mos_mu/``.

#. Perform a preparation playbook for the Fuel Master node. The playbook
   installs and prepares necessary tools for the update. Also, it restarts
   the ``astute`` and ``nailgun`` services.

   .. code-block:: console

    ansible-playbook playbooks/mos9_prepare_fuel.yml

#. Update the Fuel Master node packages, services, and configuration:

   .. code-block:: console

    ansible-playbook playbooks/update_fuel.yml -e '{"rebuild_bootstrap":false}'

   .. warning:: During the update procedure, the Fuel Master node
                services will be restarted automatically.

#. Upgrade the Ubuntu kernel to version 4.4 for the Fuel bootstrap:

   .. code-block:: console

    ansible-playbook playbooks/mos9_fuel_upgrade_kernel_4.4.yml

#. Verify that the Fuel Master node is successfully updated using
   the :command:`fuel2 fuel-version` command. The output should be as follows:

   .. code-block:: console

    fuel2 fuel-version
    openstack_version: mitaka-9.0
    release: '9.2'
