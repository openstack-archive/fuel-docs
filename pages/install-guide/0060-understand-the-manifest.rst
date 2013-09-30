.. raw:: pdf

   PageBreak

.. index:: CLI Deployment Workflow

Understanding the CLI Deployment Workflow
=========================================

To deploy OpenStack using CLI successfully you need nodes to pass through the 
"Prepare->Discover->Provision->Deploy" workflow. Following sections describe how 
to do this from the beginning to the end of the deployment.
During `Prepare` stage nodes should be connected correctly to the Master node for 
network booting. Then turn on the nodes to boot using PXE provided by Fuel Master node.

Discover
--------

Nodes being booted into bootstrap mode run all the required services for the node 
to be managed by Fuel Master node. When booted into bootstrap phase, node 
contains ssh authorized keys of Master node which allows Cobbler server installed
on Master node to reboot the node during provision phase. Also, bootstrap mode 
configures MCollective on the node and specifies ID used by Astute orchestrator 
to check the status of the node.

Provision
---------

Provisioning is done using Cobbler.

Deploy
------

Deployment is done using Astute orchestrator, which parses ``nodes`` and 
``attributes`` sections and recalculates parameters needed for deployment.
Calculated parameters are passed to the nodes being deployed by use of 
``nailyfact`` MCollective agent that uploads these attributes to
``/etc/naily.facts`` file of the node. Then puppet parses this file using 
Facter plugin and uploads these facts into puppet. These facts are used 
during catalog compilation phase by puppet master. Finally catalog is executed 
and Astute orchestrator passes to the next node in deployment sequence.

.. raw:: pdf

   PageBreak

.. index:: Deploying Using CLI

Deploying OpenStack Cluster Using CLI
=====================================

.. contents :local:

.. TODO(mihgen): Provide new information about deployment via CLI
