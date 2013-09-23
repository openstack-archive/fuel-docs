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

Deployment is done using Astute orchestrator, which parses ** which section should we parse ?**
Parameters are passed to the nodes being deployed by use of 
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

After you understood how deployment workflow is traversed, you can finally start. 
Connect the nodes to Master node and power them on. You should also plan your 
cluster configuration meaning that you should know which node should host which 
role in the cluster. As soon as nodes boot into bootstrap mode and populate 
their data to MCollective you will ** to be replaced **

.. raw:: pdf

   PageBreak

.. index:: Configuring Nodes for Deployment

Configuring Nodes for Deployment
================================

Node Configuration
------------------

General Parameters
------------------
.. raw:: pdf

   PageBreak

.. index:: Configure Deployment Scenario

Configure Deployment Scenario
=============================

Choose deployment scenario you want to use. 
Currently supported scenarios are:

Enabling Nova Network
---------------------

Enabling Quantum
----------------

Configuring Syslog Parameters
-----------------------------

Setting Verbosity
----------------- 

Dealing With Multicast Issues
-----------------------------

Fuel uses Corosync and Pacemaker cluster engines for HA scenarios, thus requiring 
consistent multicast networking. Sometimes it is not possible to configure 
multicast in your network. In this case, you can tweak Corosync to use 
unicast addressing by setting

.. index:: Triggering the Deployment

.. raw:: pdf

   PageBreak

Finally Triggering the Deployment
=================================
