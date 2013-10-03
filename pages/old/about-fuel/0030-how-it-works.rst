.. raw:: pdf

   PageBreak

.. index: How Fuel Works

.. _How-Fuel-Works:

How Fuel Works
==============

Fuel works on a simple premise. Rather than installing each of the 
components that make up OpenStack directly, you instead use a configuration 
management system like Puppet to create scripts that can provide a 
configurable, reproducible, sharable installation process.

In practice, Fuel works as follows:

1. First, set up Fuel Master Node using the ISO. This process only needs to 
   be completed once per installation.

2. Next, discover your virtual or physical nodes and configure your 
   OpenStack cluster using the Fuel UI.

3. Finally, deploy your OpenStack cluster on discovered nodes. Fuel will 
   perform all deployment magic for you by applying pre-configured and 
   pre-integrated Puppet manifests via Astute orchestration engine.

Fuel is designed to enable you to maintain your cluster while giving you the 
flexibility to adapt it to your own configuration.

.. image:: /_images/how-it-works_svg.jpg
  :align: center

Fuel comes with several pre-defined deployment configurations, some of them 
include additional configuration options that allow you to adapt OpenStack 
deployment to your environment.

Fuel UI integrates all of the deployments scripts into a unified, 
Web-based Graphical User Interface that walks administrators through the 
process of installing and configuring a fully functional OpenStack environment.
