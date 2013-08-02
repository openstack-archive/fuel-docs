Generating the Puppet Manifest
------------------------------

Before you can deploy OpenStack, you will need to configure the site.pp 
file. Previous versions of Fuel required you to manually configure 
``site.pp``. Version 3.1 includes the ``openstack_system`` script, which 
uses the ``config.yaml`` file and reference architecture templates to create 
the appropriate Puppet manifest.  To create ``site.pp``, execute this 
command::

  openstack_system -c config.yaml \
    -t /etc/puppet/modules/openstack/examples/site_openstack_ha_compact.pp \
    -o /etc/puppet/manifests/site.pp \
    -a astute.yaml

The four parameters in the command above are:

   * ``-c``:  The absolute or relative path to the ``config.yaml`` file you 
   customized earlier.

   * ``-t``:  The template file to serve as a basis for ``site.pp``.  
   Possible templates include ``site_openstack_ha_compact.pp``, 
   ``site_openstack_ha_minimal.pp``, ``site_openstack_ha_full.pp``, 
   ``site_openstack_single.pp``, and ``site_openstack_simple.pp``.

   * ``-o``:  The output file.  This should always be 
   ``/etc/puppet/manifests/site.pp``.

   * ``-a``:  The orchestration configuration file, to be output for use in 
   the next step.

From there you're ready to install your OpenStack components. Before that, 
however, let's look at what is actually in the new ``site.pp`` manifest, so 
that you can understand how to customize it if necessary.  (Similarly, if 
you are installing Fuel Library without the ISO, you will need to make these 
customizations yourself.)
