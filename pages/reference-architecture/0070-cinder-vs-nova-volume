.. index:: Cinder vs. nova-volume

Cinder vs. nova-volume
----------------------

Cinder is a persistent storage management service, also known as 
block-storage-as-a-service. It was created to replace nova-volume, and
provides persistent storage for VMs.

If you want to use Cinder for persistent storage, you will need to both
enable Cinder and create the block devices on which it will store data.
You will then provide information about those blocks devices during the Fuel
install.

Cinder block devices can be:

* created by Cobbler during the initial node installation, or
* attached manually (e.g. as additional virtual disks if you are using 
  VirtualBox, or as additional physical RAID, SAN volumes)
