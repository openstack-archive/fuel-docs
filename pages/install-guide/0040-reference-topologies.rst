.. raw:: pdf

   PageBreak

.. index:: Deployment Configurations

.. _Deployment_Configurations:

Deployment Configurations Provided By Fuel
==========================================

One of the advantages of Fuel is that it comes with a number of pre-built 
deployment configurations that you can use to quickly build your own 
OpenStack cloud infrastructure. These are widely accepted configurations of 
OpenStack, with its constituent components expertly tailored to serve
multipurpose cloud use cases. Fuel provides the ability to create the 
following cluster types directly out of the box:

**Simple (non-HA)**: The Simple (non-HA) installation provides an easy way 
to install an entire OpenStack cluster without requiring the expense of 
extra hardware required to ensure high availability.

**Multi-node (HA)**: When you are ready to move to production, the Multi-node 
(HA) configuration is a straightforward way to create an OpenStack 
cluster that provides high availability. With three controller nodes and the 
ability to individually specify services such as Cinder, Neutron (formerly 
Quantum), Swift, and Ceph, Fuel provides the following variations of the 
Multi-node (HA) configurations:

- **Compact HA**: When you choose this option, Swift will be installed on 
  your controllers, reducing your hardware requirements by eliminating the need 
  for additional Swift servers while still addressing high availability 
  requirements.

- **Full HA**: This option enables you to install dedicated Cinder or Ceph
  nodes, so that you can separate their operations from your controller nodes.

In addition to these configurations, Fuel is designed to be completely 
customizable. For assistance on deeper customization options based on the 
included configurations you can `contact Mirantis for further assistance 
<http://www.mirantis.com/contact/>`_.
