.. raw:: pdf

   PageBreak

.. index:: Installing Fuel Master Node

Installing Fuel Master Node
===========================

.. contents :local:

Fuel is distributed as both ISO and IMG images, each of them contains 
an installer for Fuel Master node. The ISO image is used for CD media devices, 
iLO or similar remote access systems. The IMG file is used for USB memory sticks.

Once installed, Fuel can be used to deploy and manage OpenStack clusters. It 
will assign IP addresses to the nodes, perform PXE boot and initial 
configuration, and provision of OpenStack nodes according to their roles in 
the cluster.

.. _Install_Bare-Metal:

On Bare-Metal Environment
-------------------------

To install Fuel on bare-metal hardware, you need to burn the provided ISO to 
a CD/DVD or create a bootable USB stick. You would then begin the 
installation process by booting from that media, very much like any other OS.

Burning an ISO to optical media is a deeply supported function on all OSes. 
For Linux there are several interfaces available such as `Brasero` or `Xfburn`, 
two of the more commonly pre-installed desktop applications. There are also 
a number for Windows such as `ImgBurn <http://www.imgburn.com/>`_ and the 
open source `InfraRecorder <http://infrarecorder.org/>`_.

Burning an ISO in Mac OS X is deceptively simple. Open `Disk Utility` from 
`Applications > Utilities`, drag the ISO into the disk list on the left side 
of the window and select it, insert blank media with enough room, and click 
`Burn`. If you prefer a utility, check out the open source `Burn 
<http://burn-osx.sourceforge.net/Pages/English/home.html>`_.

Installing the ISO to a bootable USB stick, however, is an entirely different 
matter. Canonical suggests `PenDriveLinux` which is a GUI tool for Windows.

On Windows, you can write the installation image with a number of different 
utilities. The following list links to some of the more popular ones and they are 
all available at no cost: 

- `Win32 Disk Imager <http://sourceforge.net/projects/win32diskimager/>`_.
- `ISOtoUSB <http://www.isotousb.com/>`_.

After the installation is complete, you will need to allocate bare-metal 
nodes for your OpenStack cluster, put them on the same L2 network as the 
Master node, and PXE boot. The UI will discover them and make them available 
for installing OpenStack.

On VirtualBox
-------------

If you are going to evaluate Fuel on VirtualBox, you should know that we 
provide a set of scripts that create and configure all of the required VMs for 
you, including the Master node and Slave nodes for OpenStack itself. It's a very 
simple, single-click installation.  

.. note:: 

  These scripts are not supported on Windows, but you can still test on 
  VirtualBox by creating the VMs by yourself. See :ref:`Install_Manual` for more 
  details.

The requirements for running Fuel on VirtualBox are:

A host machine with Linux or Mac OS.
  The scripts have been tested on Mac OS 10.7.5, Mac OS 10.8.3, Ubuntu 12.04 and Ubuntu 12.10.

VirtualBox 4.2.12 (or later) must be installed with the extension pack. Both 
can be downloaded from `<http://www.virtualbox.org/>`_.

8 GB+ of RAM
  to handle 4 VMs for non-HA OpenStack installation (1 Master node, 1 Controller 
  node, 1 Compute node, 1 Cinder node) or 
  to handle 5 VMs for HA OpenStack installation (1 Master node, 3 Controller 
  nodes, 1 Compute node)

.. _Install_Automatic:

Automatic Mode
++++++++++++++

When you unpack the scripts, you will see the following important files and 
folders:

`iso`
  This folder needs to contain a single ISO image for Fuel. Once you 
  downloaded ISO from the portal, copy or move it into this directory.

`config.sh`
  This file contains configuration, which can be fine-tuned. For example, you 
  can select how many virtual nodes to launch, as well as how much memory to give them.

`launch.sh`
  Once executed, this script will pick up an image from the ``iso`` directory,
  create a VM, mount the image to this VM, and automatically install the Fuel 
  Master node.
  After installation of the Master node, the script will create Slave nodes for 
  OpenStack and boot them via PXE from the Master node.
  Finally, the script will give you the link to access the Web-based UI for the 
  Master Node so you can start installation of an OpenStack cluster.

Deployment configuration to access OpenStack API and VMs from host machine
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Helper scripts for VirtualBox create network adapters eth0, eth1, eth2 which
are represented on host machine as 
vboxnet0, vboxnet1, vboxnet2 correspondingly, and assign
IP addresses for adapters: vboxnet0 - 10.20.0.1/24, 
vboxnet1 - 172.16.1.1/24, vboxnet2 - 172.16.0.1/24.
For the demo environment on
VirtualBox, the first NIC is used to run Fuel network traffic, including PXE discovery.

To access the Horizon and OpenStack REST API via public network from the host machine,
it is required to have route from your host to the public IP address on the OpenStack controller.
Also, if access to floating IP of VM is required, it is also required to have route
to the floating IP on compute host, which is binded to public interface there.
To make this configuration possible on VirtualBox demo environment, the user has
to run public network untagged. On the image below you can see the configuration of
public and floating networks which will allow to make this happen.

.. image:: /_images/vbox_public_settings.png
  :align: center

By default public and floating networks are run on the first network interface.
It is required to change it, as you can see on this image below:

.. image:: /_images/vbox_node_settings.png
  :align: center


(add note that this would 
During installation the Slave nodes access the Internet via Master node. 
But when installation is done Slave nodes on guest VMs shall access the 
Internet via the Public network. To make it happen the following command must be 
executed on host::

  sudo iptables -t nat -A POSTROUTING -s 172.16.1.0/24 \! -d 172.16.1.0/24 -j MASQUERADE

To access VMs managed by OpenStack it is needed to provide IP addresses from 
floating IP range. When OpenStack cluster is deployed it is needed to create 
security groups to provide access to guest VMs using following commands::

  nova secgroup-add-rule default icmp -1 -1 0.0.0.0/0
  nova secgroup-add-rule default tcp 22 22 0.0.0.0/0

You can also add these security groups from Horizon UI.

IP ranges for Public and Management networks (172.16.*.*) defined in `config.sh` 
script. You can reassign these IP ranges before running VirtualBox scripts only.   
  
.. _Install_Manual:

Manual mode
+++++++++++

.. note::

    However, these manual steps will allow you to set up the evaluation environment 
    for vanilla OpenStack release only. `RHOS installation is not possible.`
    
    To download and deploy RedHat OpenStack you need to use automated VirtualBox
    helper scripts or install Fuel :ref:`Install_Bare-Metal`.

If you cannot or would rather not run our helper scripts, you can still run 
Fuel on VirtualBox by following these steps.

Master Node deployment
^^^^^^^^^^^^^^^^^^^^^^

First, create the Master Node VM.

1. Configure the host-only interface vboxnet0 in VirtualBox.

* IP address: 10.20.0.1
* Interface mask: 255.255.255.0
* DHCP disabled

2. Create a VM for the master node with the following parameters:

* OS Type: Linux, Version: Red Hat (64bit)
* RAM: 1024 MB
* HDD: 20 GB, with dynamic disk expansion
* CDROM: mount Fuel ISO
* Network 1: host-only interface vboxnet0

3. Power on the VM in order to start the installation.

4. Wait for the Welcome message with all information needed to login into the UI 
of Fuel.

Adding Slave Nodes
^^^^^^^^^^^^^^^^^^

Next, create Slave nodes where OpenStack needs to be installed.

1. Create 3 or 4 additional VMs depending on your wish with the following parameters:

* OS Type: Linux, Version: Red Hat (64bit)
* RAM: 1024 MB
* HDD: 30 GB, with dynamic disk expansion
* Network 1: host-only interface vboxnet0, PCnet-FAST III device

2. Set priority for the network boot:

.. image:: /_images/vbox-image1.png
  :align: center

3. Configure the network adapter on each VM:

.. image:: /_images/vbox-image2.png
  :align: center

Changing network parameters before the installation
---------------------------------------------------

You can change the network settings for the Fuel (PXE booting) network, which 
is ``10.20.0.2/24 gw 10.20.0.1`` by default.

In order to do so, press the <TAB> key on the very first installation screen 
which says "Welcome to Fuel Installer!" and update the kernel options. For 
example, to use 192.168.1.10/24 IP address for the Master Node and 192.168.1.1 
as the gateway and DNS server you should change the parameters to those shown 
in the image below:

.. image:: /_images/network-at-boot.jpg
  :align: center

When you're finished making changes, press the <ENTER> key and wait for the 
installation to complete.

Changing network parameters after installation
----------------------------------------------

It is still possible to configure other interfaces, or add 802.1Q sub-interfaces 
to the Master Node to be able to access it from your network if required.
It is easy to do via standard network configuration scripts for CentOS. When the 
installation is complete, you can modify 
``/etc/sysconfig/network-scripts/ifcfg-eth\*`` scripts. For example, if *eth1* 
interface is on the L2 network which is planned for PXE booting, and *eth2* is 
the interface connected to your office network switch, *eth0* is not in use, then 
settings can be the following:

/etc/sysconfig/network-scripts/ifcfg-eth0::

  DEVICE=eth0
  ONBOOT=no

/etc/sysconfig/network-scripts/ifcfg-eth1::

  DEVICE=eth1
  ONBOOT=yes
  HWADDR=<your MAC>
  ..... (other settings in your config) .....
  PEERDNS=no
  BOOTPROTO=static
  IPADDR=192.168.1.10
  NETMASK=255.255.255.0

/etc/sysconfig/network-scripts/ifcfg-eth2::

  DEVICE=eth2
  ONBOOT=yes
  HWADDR=<your MAC>
  ..... (other settings in your config) .....
  PEERDNS=no
  IPADDR=172.18.0.5
  NETMASK=255.255.255.0

.. warning::

  Once IP settings are set at the boot time for Fuel Master Node, they 
  **should not be changed during the whole lifecycle of Fuel.**

After modification of network configuration files, it is required to apply the 
new configuration::

  service network restart

Now you should be able to connect to Fuel UI from your network at 
http://172.18.0.5:8000/

Name resolution (DNS)
---------------------

During Master Node installation, it is assumed that there is a recursive DNS 
service on 10.20.0.1.

If you want to make it possible for Slave nodes to be able to resolve public names,
you need to change this default value to point to an actual DNS service.
To make the change, run the following command on Fuel Master node (replace IP to 
your actual DNS)::

  echo "nameserver 172.0.0.1" > /etc/dnsmasq.upstream

PXE booting settings
--------------------

By default, `eth0` on Fuel Master node serves PXE requests. If you are planning 
to use another interface, then it is required to modify dnsmasq settings (which 
acts as DHCP server). Edit the file ``/etc/cobbler/dnsmasq.template``, find the line 
``"interface=eth0"`` and replace the interface name with the one you want to use. 

Launch command to synchronize cobbler service afterwards::

  cobbler sync

During synchronization cobbler builds actual dnsmasq configuration file 
``/etc/dnsmasq.conf`` from template ``/etc/cobbler/dnsmasq.template``. That is 
why you should not edit ``/etc/dnsmasq.conf``. Cobbler rewrites it each time 
when it is synchronized.

If you want to use virtual machines to launch Fuel then you have to be sure
that dnsmasq on master node is configured to support the PXE client you use on your
virtual machines. We enabled *dhcp-no-override* option because without it
dnsmasq tries to move ``PXE filename`` and ``PXE servername`` special fields 
into DHCP options. Not all PXE implementations can recognize those options and 
therefore they will not be able to boot. For example, CentOS 6.4 uses gPXE 
implementation instead of more advanced iPXE by default.

When Master Node installation is done
-------------------------------------

Once the Master node is installed, power on all other nodes and log in to the 
Fuel UI.

Slave nodes will be booted in bootstrap mode (CentOS based Linux in memory) via 
PXE and you will see notifications in the user interface about discovered nodes. 
This is the point when you can create an environment, add nodes into it, and 
start configuration...

Networking configuration is most complicated part, so please read the networking 
section of documentation carefully.
