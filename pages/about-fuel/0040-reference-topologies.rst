.. index:: Deployment Configurations

.. _Deployment_Configurations:

Deployment Configurations Provided By Fuel
==========================================

One of the advantages of Fuel is that it comes with a number of pre-built 
deployment configurations that you can use to quickly build your own 
OpenStack cloud infrastructure. These are well-specified configurations of 
OpenStack and its constituent components that are expertly tailored to one 
or more common cloud use cases. Fuel provides the ability to create the 
following cluster types without requiring extensive customization:

**Single node**: Perfect for getting a feel for how OpenStack works, the 
Single-node installation is the simplest way to get OpenStack up and 
running. The Single-node installation provides an easy way to install an 
entire OpenStack cluster on a single physical server system or in a virtual 
machine environment. 

**Multi-node (non-HA)**: The Multi-node (non-HA) installation enables you to 
try out additional OpenStack services like Cinder, Neutron (formerly 
Quantum), and Swift without requiring the degree of increased hardware 
involved in ensuring high availability. In addition to the ability to 
independently specify which services to activate, you also have the 
following options:

  **Compact Swift**: When you choose this option, Swift will be installed on 
  your controllers, reducing your hardware requirements by eliminating the need 
  for additional Swift servers.

  **Standalone Swift**: This option enables you to install independant Swift 
  nodes, so that you can separate their operation from your controller nodes.

**Multi-node (HA)**: When you're ready to begin your move to production, the 
Multi-node (HA) configuration is a straightforward way to create an 
OpenStack cluster that provides high availability. With three controller 
nodes and the ability to individually specify services such as Cinder, 
Neutron, and Swift, Fuel provides the following variations of the Multi-node 
(HA) configuration:

  **Compact Swift**: When you choose this option, Swift will be installed on 
  your controllers, reducing your hardware requirements by eliminating the need 
  for additional Swift servers while still addressing high availability 
  requirements.

  **Standalone Swift**: This option enables you to install independant Swift 
  nodes, so that you can separate their operation from your controller nodes.

  **Compact Neutron**: If you don't need the flexibility of a separate Neutron 
  node, Fuel provides the option to combine your Neutron node with one of your 
  controllers.

In addition to these configurations, Fuel is designed to be completely 
customizable. For assistance on deeper customization options based on the 
included configurations you can `contact Mirantis for further assistance 
<http://www.mirantis.com/contact/>`_.
