.. raw:: pdf

   PageBreak

HowTo Notes
===========

.. index:: HowTo: Create the XFS partition

.. _create-the-XFS-partition:

HowTo: Create the XFS partition
-------------------------------

In most cases, Fuel creates the XFS partition for you.  If for some reason you 
need to create it yourself, use this procedure:

1. Create the partition itself::

  fdisk /dev/sdb
    n(for new)
    p(for partition)
    <enter> (to accept the defaults)
    <enter> (to accept the defaults)
    w(to save changes)

2. Initialize the XFS partition::

  mkfs.xfs -i size=1024 -f /dev/sdb1

3. For a standard swift install, all data drives are mounted directly under 
   /srv/node, so first create the mount point::

  mkdir -p /srv/node/sdb1

4. Finally, add the new partition to fstab so it mounts automatically, then 
   mount all current partitions::

  echo "/dev/sdb1 /srv/node/sdb1 xfs
  noatime,nodiratime,nobarrier,logbufs=8 0 0" >> /etc/fstab
  mount -a

.. index:: HowTo: Redeploy a node from scratch

.. _Redeploy_node_from_scratch:
    
HowTo: Redeploy a node from scratch
------------------------------------

Compute and Cinder nodes in an HA configuration and controller in any 
configuration cannot be redeployed without completely redeploying the cluster.  
However, in a non-HA situation you can redeploy a Compute or Cinder node.  
To do so, follow these steps:

1. Remove the certificate for the node by executing the command     
   ``puppet cert clean <hostname>`` on Fuel Master node.
2. Reboot the node over the network so it can be picked up by cobbler.
3. Run the puppet agent on the target node using ``puppet agent --test``.

.. _Enable_Disable_Galera_autorebuild:

.. index:: HowTo: Galera Cluster Autorebuild

HowTo: Enable/Disable Galera Cluster Autorebuild Mechanism
----------------------------------------------------------

By defaults Fuel reassembles Galera cluster automatically without need for any 
user interaction.

To prevent `autorebuild feature` you shall do::

  crm_attribute -t crm_config --name mysqlprimaryinit --delete

To re-enable `autorebuild feature` you should do::
  
  crm_attribute -t crm_config --name mysqlprimaryinit --update done

