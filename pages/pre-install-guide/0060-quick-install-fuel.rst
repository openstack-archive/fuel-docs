
.. _FuelQuickInstall:

Configuring Fuel Using the ISO image
====================================

Mirantis provides the Fuel ISO image that is easy to install on a virtual machine
or physical hardware.

To install Fuel using the ISO image:

1. Download the Fuel ISO from the `Mirantis web-site <http://software.mirantis.com/>`_.

2. Mount or burn the ISO.

3. Power on your machine.
   The Fuel boot menu appears.

4. Optionally, configure the IP address, default gateway, and DNS server by
   pressing TAB.

5. Optionally, set the ``showmenu`` property to **Yes** to open the extended
   network configuration menu during installation.

6. After Fuel completes the installation, point your browser to default Fuel UI
   URL: `http://10.20.0.2:8000 <http://10.20.0.2:8000>`__.

7. Alternatively, point your browser to the IP address and port number that
   you specified.

8. In the Fuel UI, create a new OpenStack environment.

9. Configure the network settings using the address plan.

10. Verify the network configuration by clicking **Verify Networks**.

11. In the **Settings** tab, modify additional options:

   * Access

   * OpenStack Components

   * Hypervisor type

   * Scheduler driver

   * Syslog

   * Storage

12. Assign a role for each node server.

13. Optionally, associate NICs with the OpenStack networks:

   1. Select the nodes.
   2. Click **Configure Interfaces**.
   3. Drag and drop the appropriate networks onto the physical interfaces.
   4. Click **Apply**.

14. Click **Deploy Changes**.
    Depending on your environment deployment of Mirantis OpenStack may take
    some time.

After you deployed Mirantis OpenStack, verify the configuration by
running the tests from the **Health Check** tab.

.. image:: /_images/grub-screen.png
   :align: center

Booting the ISO image.

.. image:: /_images/grub-cmdline.png
   :align: center

Editing grub command line.

.. image:: /_images/fuel-wizard.png
   :align: center

Create a new environment.

.. image:: /_images/fuel-network-settings.png
   :align: center

Network settings page.

.. image:: /_images/fuel-settings.png
   :align: center

Settings page.

.. image:: /_images/fuel-nodes.png
   :align: center

Add nodes to environment.

.. image:: /_images/fuel-nodes-selected.png
   :align: center

Select discovered nodes.

.. image:: /_images/fuel-node-network.png
   :align: center

Node's network settings.

.. seealso:: :ref:`Installation Guide<install-guide>`
