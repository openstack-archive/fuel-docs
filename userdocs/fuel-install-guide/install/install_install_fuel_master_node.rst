.. _install_install_fuel_master_node:

Install the Fuel Master node
----------------------------

Before you install the Fuel Master node, complete the steps described in
:ref:`Before you install Fuel <install_before_you_install_fuel>`,

If you choose installation using pre-built ISO image, you also need
to complete the steps described here
:ref:`Download the ISO image <install_download_iso>`, and
:ref:`Preparing an installation media <install_prepare_install_media>`.

and then start the Fuel Master node installation process as follows:

#. Insert or mount through IPMI (or using any other remote control utility
   supported by your hardware) the media with the Fuel ISO on the server
   that will be your Fuel Master node.

#. Verify that the Fuel installation media is the first device in the boot
   order.

#. Power on the server. The `Welcome to Fuel Installer` screen appears.

#. Select the installation media. If necessary, modify the boot settings by
   pressing the Tab key to display the loader command line. Using this command
   line, configure the IP address, default gateway, and DNS server settings of
   the Fuel Master node.

#. Proceed to :ref:`Configure network parameters <install_set_up_fuel>`.

If you choose installation using RPM packages then follow the procedure
described here

#. Install CentOS 7 on the node you assume to be the Fuel Master node as
   described in the official CentOS documentation

#. Install some additional packages that are necessary::
     sudo yum install -y PyYAML net-tools

#. Install fuel-release RPM package from one of the Fuel mirrors::
     sudo rpm -i http://packages.fuel-infra.org/repositories/centos/master-centos7/os/x86_64/Packages/fuel-release-10.0.0-1.mos6376.git.a8c98d0.noarch.rpm

.. note::

   Due to version part of the package name particular URL can differ
   from what is written here in the documentation.

#. Install fuel-setup package::
     sudo yum install -y fuel-setup

#. Run the Fuel bootstrap script::
     sudo /usr/sbin/bootstrap_admin_node.sh

#. Proceed to :ref:`Fuel setup configuration <install_set_up_fuel>`.

.. note::

   You can install the Fuel Master node on VMware vSphere. For more information,
   see: :ref:`Before you install Fuel on VMware vSphere <vsphere_intro>`.
