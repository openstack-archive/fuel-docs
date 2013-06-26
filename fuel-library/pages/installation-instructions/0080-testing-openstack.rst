Testing OpenStack
-----------------

Now that you've installed OpenStack, its time to take your new
OpenStack cloud for a drive. Follow these steps:

#. On the host machine, open your browser to http://192.168.0.10/  
(adjust this value to your own ``public_virtual_ip``) and login as nova/nova 
(unless you changed this information in ``site.pp``)

#. Click the ``Project`` tab in the left-hand column.

#. Under ``Manage Compute``, choose ``Access & Security`` to set security settings:

  #. Click ``Create Keypair`` and enter a name for the new keypair. The private 
  key should be downloaded automatically. Make sure to keep it safe.
  #. Click ``Access & Security`` again and click ``Edit Rules`` for the default 
  Security Group. Add a new rule allowing TCP connections from port 22 to port 
  22 for all IP addresses using a CIDR of 0.0.0.0/0. Click ``Add Rule`` to save 
  the new rule.
  #. Add a second new rule allowing ICMP connections with a type and code of -1 
  to the default Security Group and click ``Add Rule`` to save.

#. Click ``Allocate IP To Project`` and add two new floating IPs. Notice that 
they come from the pool specified in ``config.yaml`` and ``site.pp``.

#.  Click ``Images & Snapshots``, then ``Create Image``. Enter a name and 
specify the ``Image Location`` as 
https://launchpad.net/cirros/trunk/0.3.0/+download/cirros-0.3.0-x86_64-disk.img 
with a ``Format`` of QCOW2. Check the ``Public`` checkbox.

#. The next step is to upload an image to use for creating VMs, but an
   OpenStack Horizon has a known bug that prevents you from doing this in the 
   browser. Instead, log in to any of the controllers as ``root`` and execute 
   the following commands::

    # cd ~
    # source openrc
    # glance image-create \
	  --name cirros 
	  --container-format bare \
	  --disk-format qcow2 \
	  --is-public yes \
	  --location https://launchpad.net/cirros/trunk/0.3.0/+download/cirros-0.3.0-x86_64-disk.img

#. Go back to the browser and refresh the page. Launch a new instance of this image
   using the tiny flavor. Click the ``Networking`` tab and choose the default 
   ``net04_ext`` network, then click the ``Launch`` button.

#. On the ``Instances`` page:

  #. Click the ``New Instance`` and review settings.
  #. Click the ``Logs`` tab to look at the logs.
  #. Click the ``VNC`` tab to log in. If you see just a big black rectangle, the 
  machine is in screensaver mode; click the grey area and press the space bar to 
  wake it up, then login as ``cirros/cubswin:)``.
  #. At the command line, enter ``ifconfig -a | more`` and see the assigned IP 
  address.
  #. Enter ``sudo fdisk -l`` to see that no volume has yet been assigned to this VM.

#. On the ``Instances`` page, click ``Assign Floating IP`` and assign an IP 
address to your instance. You can either choose from one of the existing created 
IPs by using the pulldown menu or click the plus sign (+) to choose a network 
and allocate a new IP address.
  #. From your host machine, ping the floating ip assigned to this VM.
  #. If that works, try to ``ssh cirros@floating-ip`` from the host machine.

#. Back in the browser, click ``Volumes`` and ``Create Volume``.  Create the new 
volume, and attach it to the instance.
#. Go back to the ``VNC`` tab and repeat ``fdisk -l`` and see the new 
unpartitioned disk attached.

From here, your new VM is ready to use.
