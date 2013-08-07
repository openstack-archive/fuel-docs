.. raw:: pdf

   PageBreak

.. index:: Redeploying An Environment

.. _Redeploying_An_Environment:

Redeploying An Environment
==========================

.. contents :local:

Because Puppet is additive only, there is no ability to revert changes as you 
would in a typical application deployment. If a change needs to be backed out, 
you must explicitly add a configuration to reverse it, check the configuration 
in, and promote it to production using the pipeline. This means that if a 
breaking change does get deployed into production, typically a manual fix is 
applied, with the proper fix subsequently checked into version control.

Fuel offers the ability to isolate code changes while developing a deployment 
and minimizes the headaches associated with maintaining multiple configurations 
through a single Puppet Master by creating what are called environments.

Environments
------------

Puppet supports assigning nodes 'environments'. These environments can be 
mapped directly to your development, QA and production life cycles, so it’s a 
way to distribute code to nodes that are assigned to those environments.

**On the Master node:**

  The Puppet Master tries to find modules using its ``modulepath`` setting, 
  which by default is ``/etc/puppet/modules``. It is common practice to set 
  this value once in your ``/etc/puppet/puppet.conf``. Environments expand on 
  this idea and give you the ability to use different settings for different 
  configurations.

  For example, you can specify several search paths. The following example 
  dynamically sets the ``modulepath`` so Puppet will check a per-environment 
  folder for a module before serving it from the main set:

  .. code-block:: ini

    [master]
      modulepath = $confdir/$environment/modules:$confdir/modules

    [production]
      manifest   = $confdir/manifests/site.pp

    [development]
      manifest   = $confdir/$environment/manifests/site.pp

**On the Slave Node:**

  Once the slave node makes a request, the Puppet Master gets informed of its 
  environment. If you don’t specify an environment, the agent uses the default 
  ``production`` environment.

  To set aslave-side environment, just specify the environment setting in the 
  ``[agent]`` block of ``puppet.conf``:

  .. code-block:: ini

    [agent]
      environment = development

Deployment pipeline
-------------------

1. Deploy

  In order to deploy multiple environments that don't interfere with each other, 
  you should specify the ``deployment_id`` option in YAML file. 
  It should be an even integer value in the range of 2-254.

  This value is used in dynamic environment-based tag generation. Fuel applies 
  that tag globally to all resources and some services on each node.

2. Clean/Revert

  At this stage you just need to make sure the environment has the 
  original/virgin state.

3. Puppet node deactivate

  This will ensure that any resources exported by that node will stop appearing 
  in the catalogs served to the slave nodes::

      puppet node deactivate <node>

  where ``<node>`` is the fully qualified domain name as seen in 
  ``puppet cert list --all``.

  You can deactivate nodes manually one by one, or execute the following 
  command to automatically deactivate all nodes::

      cert list --all | awk '! /DNS:puppet/ { gsub(/"/, "", $2); print $2}' | xargs puppet node deactivate

4. Redeploy

  Start the puppet agent again to apply a desired node configuration.

.. seealso::

  http://puppetlabs.com/blog/a-deployment-pipeline-for-infrastructure/

  http://docs.puppetlabs.com/guides/environment.html
