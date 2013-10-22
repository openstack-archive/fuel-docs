.. raw:: pdf

   PageBreak

.. index:: Fuel UI: Network Configuration

Understanding Environment deployment with Fuel-CLI
==================================================

.. contents :local:

Basic usage
-----------------------------------------

Fuel CLI has following usage pattern:

::

  fuel [global optional args] <namespace> [action] <optional args>

*Example*::

  fuel --env-id=1 node set --node-id=1,4,5 --role=controller,compute

where ``--env-id=1`` is global optional argument pointing to specific environment, ``node`` - is a namespace for all node control functions, ``set`` is action that assigns specific nodes to some environments in some roles.

for getting list of all global optional args and namespaces you can run:
::

  fuel --help

and for getting actions and optional args for some namespace run:
::

  fuel <namespace> --help

CLI commands reference
-----------------------------------------

Release
+++++++

Get list of all avaliable releases:

::

  fuel release

or short version

::

  fuel rel

for specific release

::

  fuel rel --rel 1


Environment
+++++++++++

To list environments:

::

  fuel env

To create an environment, run:

::

  fuel env create --name MyEnv --rel 1 

by default it creates environment in ``multinode`` mode, and ``nova`` network mode, to specify other modes you can add optional arguments

::

  fuel env create --name MyEnv --rel 1 --mode ha --network-mode neutron

For changing environments name, mode or network mode exists ``set`` action

::

  fuel --env 1 env set --name NewEmvName --mode ha_compact

To delete the environment:

::

  fuel --env 1 env delete


Node
++++

To list all available nodes run:

::

  fuel node list

and filter them by environment

::

  fuel --env-id 1 node list

Assign some nodes to environemnt with with specific roles

::

  fuel node set --node 1 --role controller --env 1
  fuel node set --node 2,3,4 --role compute,cinder --env 1

Remove some nodes from environment

::

  fuel node remove --node 2,3 --env 1

Also you can do it without ``--env`` or ``--node`` to remove some nodes without knowing their environment and remove all nodes of some environment respectevly.

::

  fuel node remove --node 2,3
  fuel node remove --env 1

Configuring
+++++++++++

Configuration of environment or some node is universal and done in three stages

1. Download current or default configuration. works for (network, settings, deployment, provisioning, node --disk, node --network)
   
*Example*::

   fuel --env 1 network download
   fuel --env 1 settings download
   fuel --env 1 deployment default
   fuel --env 1 provisioning download
   fuel node --node-id 2 --disk --download

2. Add to downloaded files or edit them with your favorite text editor.
3. Upload files to nailgun server

*Example*::

   fuel --env 1 provisioning upload
   fuel node --node-id 2 --disk --upload  


Deployment
++++++++++

Finally you can deploying environmnet changes with

  fuel --env 1 deploy

