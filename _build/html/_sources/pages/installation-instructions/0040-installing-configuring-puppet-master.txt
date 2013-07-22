Installing & Configuring Fuel
-----------------------------

Having planned your test or production deployment and have determined the resources you will be using, it's time to begin putting the pieces together. To do that, you'll need to create the Puppet master and Cobbler servers, which will actually provision and configure your OpenStack nodes.

Installing the Puppet Master is a one-time procedure for the entire infrastructure. Once done, Puppet Master will act as a single point of management for all of your servers, and you will never have to return to these installation steps again.

The deployment of the Puppet Master server, named fuel-pm in these instructions, varies slightly between the physical and simulation environments. In a physical infrastructure, fuel-pm must have a network presence on the same network as the physical machines in order to faciliate PXE booting. In a simulation environment fuel-pm only needs host-only virtual network connectivity.

At this point, you should have either a physical or virtual machine that can be booted from the Mirantis ISO, downloaded from http://fuel.mirantis.com/your-downloads/.

This ISO can be used to create fuel-pm on a physical or virtual machine based on CentOS 6.4. If for some reason you cannot use the ISO, follow the instructions in :ref:`Creating the Puppet master <Create-PM>` to create your own fuel-pm, then skip ahead to :ref:`Configuring fuel-pm <Configuring-Fuel-PM>`.

Installing Fuel from the ISO
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Start the new machine to install the ISO. The only real installation decision you will need to make is to specify the interface through which the installer can access the Internet. Select the eth1 interface you created earlier which should be configured for access to the public network.

Configuring fuel-pm from the ISO installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once fuel-pm finishes installing, you'll be presented with a basic menu. You can use this menu to set the basic information Fuel will need to configure your installation. You can customize these steps to suit your own need, of course, but here are the steps to take for the example installation:

#. Your admin node must be called ``fuel-pm``, and your domain name must be ``localdomain``.
#. To configure the management interface, choose 2.

   * The example specifies eth0 as the internal, or management interface, so select that interface.
   * The management network in the example is using static IP addresses, so specify NO for for using DHCP.
   * Enter the IP address of 10.0.0.100 for the Puppet Master with a netmask of 255.255.255.0. 
   * Set the gateway and DNS servers if desired.  In this example, we'll use the router at 192.168.0.1 as the gateway.

#. To configure the external interface that VMs will use to send traffic to and from the internet, choose 3. Set the interface to eth1. By default, this interface uses DHCP, which is what the example calls for.

#. To choose the start and end addresses to be used during PXE boot, choose 4.  In the case of this example, the start address is 10.0.0.201 and the end address is 10.0.0.254. Later, these nodes will receive IP addresses from Cobbler.

#. Future versions of Fuel will enable you to choose a custom set of repositories.

#. If you need to specify a proxy through which fuel-pm will access the Internet, press 6.

#. Once you've finished editing, choose 9 to save your changes and exit the menu.

Please note:  Even though defaults are shown, you must set actual values; if you simply press "enter" you will wind up with empty values.

To re-enter the menu at any time, type:

bootstrap_admin_node.sh
