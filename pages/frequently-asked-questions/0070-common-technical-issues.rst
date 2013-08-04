.. _common-technical-issues:

Common Technical Issues
-----------------------

1. Puppet fails with::

      err: Could not retrieve catalog from remote server: Error 400 on SERVER: 
       undefined method 'fact_merge' for nil:NilClass"

  * This is a Puppet bug.  See: http://projects.puppetlabs.com/issues/3234
  * Workaround: ``service puppetmaster restart``

2. Puppet client will never resend the certificate to Puppet Master. The 
   certificate cannot be signed and verified.
    
    * This is a Puppet bug.  See: http://projects.puppetlabs.com/issues/4680
    * Workaround:
        * On Puppet client::

            rm -f /etc/puppet/ssl/certificate_requests/\*.pem
            rm -f /etc/puppet/ssl/certs/\*.pem

        * On Puppet master::

            rm -f /var/lib/puppet/ssl/ca/requests/\*.pem

3. The manifests are up-to-date under ``/etc/puppet/manifests``, but Puppet 
   Master keeps serving the previous version of manifests to the clients. 
   Manifests seem to be cached by the Puppet Master.

    * More information: https://groups.google.com/forum/?fromgroups=#!topic/puppet-users/OpCBjV1nR2M
    * Workaround: ``service puppetmaster restart``

4. Timeout error for fuel-controller-XX when running ``puppet-agent --test`` to 
   install OpenStack when using HDD instead of SSD ::

      | Sep 26 17:56:15 fuel-controller-02 puppet-agent[1493]: Could not retrieve catalog from remote server: execution expired
      | Sep 26 17:56:15 fuel-controller-02 puppet-agent[1493]: Not using cache on failed catalog
      | Sep 26 17:56:15 fuel-controller-02 puppet-agent[1493]: Could not retrieve catalog; skipping run

   * Workaround: ``vi /etc/puppet/puppet.conf``
        * add: ``configtimeout = 1200``

5. On running "``puppet agent --test``", the error messages below occur::

     | err: /File[/var/lib/puppet/lib]: Could not evaluate: Could not retrieve information from environment production source(s) puppet://fuel-pm.localdomain/plugins

   * Workaround: http://projects.reductivelabs.com/issues/2244

    and ::

      | err: Could not retrieve catalog from remote server: Error 400 on SERVER: stack level too deep
      | warning: Not using cache on failed catalog
      | err: Could not retrieve catalog; skipping run

    * Workaround: The second problem can be solved by rebooting Puppet master.

.. _create-the-XFS-partition:

Creating the XFS partition
--------------------------

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

4. Finally, add the new partition to fstab so it mounts automatically, then mount all current partitions::

    echo "/dev/sdb1 /srv/node/sdb1 xfs
    noatime,nodiratime,nobarrier,logbufs=8 0 0" >> /etc/fstab
    mount -a

Redeploying a node from scratch
-------------------------------

Compute and Cinder nodes in an HA configuration and controller in any 
configuration cannot be redeployed without completely redeploying the cluster.  
However, in a non-HA situation you can redeploy a compute or Cinder node.  
To do so, follow these steps:

1. Remove the certificate for the node by executing the command     
    ``puppet cert clean <hostname>`` on fuel-pm.
2. Re-boot the node over the network so it can be picked up by cobbler.
3. Run the puppet agent on the target node using ``puppet agent --test``.
