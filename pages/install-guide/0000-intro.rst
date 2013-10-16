.. index:: Introduction

.. _Introduction:

Introduction
================================
This section introduces Fuel for OpenStack and its components. 


Introducing Fuel for OpenStack
--------------------------------

Mirantis Fuel for Openstack is a set of deployment tools that helps you to 
quickly deploy your cloud environment. Fuel includes the scripts that 
dramatically facilitate and speed up the process of cloud deployment. 
Typically, OpenStack installation requires you familiarize yourself 
with the processes of installation of OpenStack environment components.
Fuel eliminates the need to study these processes. With Fuel, system 
administrators can provision an OpenStack single node, as well as 
clustered cloud in terms of minutes.

The following diagram describes how Fuel functions:

Deployment Modes
-----------------------------
You can use Fuel for OpenStack to create virtually any OpenStack 
configuration. However, Mirantis provides several pre-defined 
architectures for your convenience. 
The pre-defined architectures include:
 
* **Multi-node**
  The Multi-node environment provides an easy way 
  to install an entire OpenStack environment without requiring the degree 
  of increased hardware involved in ensuring high availability.
  Mirantis recommends that you use this architecture for testing
  purposes.
  
* **Multi-node HA**
  The Multi-node with HA environment is dedicated for highly available
  production deployments. Using Multi-node with HA you can deploy
  additional services, such as Cinder, Neutron, and Ceph.
  You can create the following multi-node environments: 

With Fuel, you can create your own cloud environment that include
additional components. 

For more information, contact `Mirantis <http://www.mirantis.com/contact/>`_.

.. seealso:: `Reference Architecture`

About Fuel Components
-----------------------

You can use Fuel to quickly deploy and manage the OpenStack environment.

Fuel includes the following components:

* **Master Node**
   A controller node that manages the OpenStack environment including
   deployment of additional controller and compute nodes, configuring
   network settings, and so on. For HA deployments, Mirantis recommends
   to deploy at least 3 controller nodes.
  
* **Compute Node(s)**
   A compute node is a server where you run virtual machines and 
   applications.
  
* **Storage Node(s)**
   Optional component. You can deploy a separate Swift storage node
   Mirantis recommends to deploy standalone storage nodes for high 
   availability environments. 


Fuel Installation Procedures
----------------------------
You must complete the following tasks to install Fuel:

1. Install the Fuel Master Node on physical or virtual hardware using 
   the Fuel installation image
2. Power on the other nodes to make them accessible for Fuel Master node
3. Deploy the OpenStack environment on the discovered nodes using Fuel
   UI or CLI.

Fuel is designed to maintain the OpenStack environment while providing
the flexibility to adapt it to your configuration.

.. image:: /_images/how-it-works_svg.jpg
