.. index:: Introduction

.. _Introduction:

Introduction
================================
This section introduces Fuel for OpenStack and its components. 


Introducing Fuel™ for OpenStack
--------------------------------

Mirantis Fuel™ for Openstack is a set of deployment tools that helps you to 
quickly deploy your cloud environment. Fuel includes the scripts that 
dramatically facilitate and speed up the process of cloud deployment. 
Typically, OpenStack installation requires you familiarize yourself 
with the processes of installation of OpenStack environment components.
Fuel eliminates the need to study these processes. With Fuel, system 
administrators can provision an OpenStack single node, as well as 
clustered cloud in terms of minutes.

The following diagram describes how Fuel functions:

.. image:: /_images/how-it-works_svg.jpg
  :align: center

About Fuel Deployment Options
-----------------------------
You can use Fuel™ for OpenStack to create virtually any OpenStack 
configuration. However, Mirantis provides several pre-defined 
architectures for your convenience. 
The pre-defined architectures include:
 
* **Simple (non-HA)**
   The Simple (non-HA) installation provides an easy way 
   to install an entire OpenStack cluster without requiring the degree 
   of increased hardware involved in ensuring high availability.
   Mirantis recommends that you use this architecture for testing
   purposes.
  
* **Compact High Availability**
   The Compact HA architecture provides high availability and at 
   the same time saves on hardware. When you deploy the Compact 
   HA, Fuel uses controller nodes to install Swift. Therefore, it reduces
   the hardware requirements by eliminating the need for additional 
   storage servers while addressing high availability requirements.

* **Full High Availability**
   The Full HA installation requires maximum hardware and provides 
   complete highly available OpenStack deployment. With Full HA, you 
   can install independent Swift and Proxy nodes. Using standalone
   Swift and Proxy servers, you can isolate their operations from 
   your controller nodes.
   
With Fuel, you can create your own cloud environment that include
additional components. 
For more information, contact `Mirantis <http://www.mirantis.com/contact/>`_.

.. seealso:: `Reference Architecture <../html/reference-architecture.html>`_

About Fuel Components
-----------------------

You can use Fuel to quickly deploy and manage the OpenStack environment.

Fuel includes the following components:

* **Master Node (Controller Node)**
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
