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

Deployment Modes
-----------------------------
You can use Fuel™ for OpenStack to create virtually any OpenStack 
configuration. However, Mirantis provides several pre-defined 
architectures for your convenience. 
The pre-defined architectures include:
 
* **Multi-node (non-HA)**
  The Multi-node (non-HA) environment provides an easy way 
  to install an entire OpenStack cluster without requiring the degree 
  of increased hardware involved in ensuring high availability.
  Mirantis recommends that you use this architecture for testing
  purposes.
  
* **Multi-node with HA**
  The Multi-node with HA environment is dedicated for highly available
  production deployments. Using Multi-node with HA you can deploy
  additional services, such as Cinder, Neutron, and Ceph.
  You can create the following multi-node environments: 
 
  * **Compact HA**
    The Compact HA installation provides high availability and at 
    the same time saves on hardware. When you deploy  Compact 
    HA, Fuel uses controller nodes to install Swift. Therefore,
    the hardware requirements are reduced by eliminating the need
    for additional  storage servers while addressing the high
    availability requirements.

  * **Full HA**
    The Full HA installation requires maximum hardware and provides 
    complete highly available OpenStack deployment. With Full HA, you 
    can install independent Ceph and Cinder nodes. Using the standalone
    Ceph and Cinder servers, you can isolate their operations from 
    the controller nodes.
   
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

Fuel Installation Procedures
----------------------------
You must complete the following tasks to install Fuel:

# Install the Fuel Master Node on physical or virtual hardware using
  the Fuel installation image
# Power on the other nodes to make them accessible for Fuel Master node
# Deploy the OpenStack environment on the discovered nodes using Fuel UI.

Fuel is designed to maintain the OpenStack environment while providing
the flexibility to adapt it to your configuration.

.. image:: /_images/how-it-works_svg.jpg
