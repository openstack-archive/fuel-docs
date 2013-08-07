.. index:: Introduction

.. _Introduction:

===============================
Introducing Fuel™ for OpenStack
===============================

OpenStack is an extensible, versatile, and flexible cloud management 
platform. By exposing its portfolio of cloud infrastructure services – 
compute, storage, networking and other core resources — through ReST APIs, 
OpenStack enables a wide range of control over these services, both from the 
perspective of an integrated Infrastructure as a Service (IaaS) controlled 
by applications, as well as automated manipulation of the infrastructure 
itself.

This architectural flexibility doesn’t set itself up magically. It asks you, 
the user and cloud administrator, to organize and manage an extensive array 
of configuration options. Consequently, getting the most out of your 
OpenStack cloud over time – in terms of flexibility, scalability, and 
manageability – requires a thoughtful combination of complex configuration 
choices. This can be very time consuming and requires that you become 
familiar with a lot of documentation from a number of different projects.

Mirantis Fuel™ for OpenStack was created to eliminate exactly these problems. 
This step-by-step guide takes you through this process of:

* Configuring OpenStack and its supporting components into a robust cloud 
  architecture
* Deploying that architecture through an effective, well-integrated automation 
  package that sets up and maintains the components and their configurations
* Providing access to a well-integrated, up-to-date set of components known to 
  work together

Fuel™ for OpenStack can be used to create virtually any OpenStack 
configuration. To make things easier, the installation includes several 
pre-defined architectures. For the sake of simplicity, this guide emphasises 
a single, common reference architecture; the multi-node, high-availability 
configuration. We begin with an explanation of this architecture, then move 
on to the details of creating the configuration in a test environment using 
VirtualBox. Finally, we give you the information you need to know to create 
this and other OpenStack architectures in a production environment.

This guide assumes that you are familiar with general Linux commands and 
administration concepts, as well as general networking concepts. You should 
have some familiarity with grid or virtualization systems such as Amazon Web 
Services or VMware, as well as OpenStack itself, but you don't need to be an 
expert.

The Fuel User Guide is organized as follows:

* :ref:`About_Fuel`, gives you an 
  overview of Fuel and gives you a general idea of how it works.

* :ref:`Reference-Architectures`, provides a 
  general look at the components that make up OpenStack.

* :ref:`Create-Cluster-UI`,
  takes you step-by-step through the process of creating a high-availability 
  OpenStack cluster using Fuel UI. 

* :ref:`Deploy-Cluster-CLI`, 
  takes you step-by-step through the more advanced process of creating a 
  high-availability OpenStack cluster using the command line and Puppet 
  manifests.

* :ref:`Production`, looks at the 
  real-world questions and problems involved in creating an OpenStack cluster 
  for production use. We discuss issues such as network layout and hardware 
  requirements, and provide tips and tricks for creating a cluster of up to 100 
  nodes.

* With the current (3.1) release Fuel UI (aka FuelWeb) and Fuel CLI 
  (aka Fuel Library) are integrated. We encourage all users to use the Fuel 
  UI for installation and configuration. However, the standard Fuel CLI 
  installation process is still available for those who prefer a more 
  detailed approach to deployment. Even with a utility as powerful as Fuel, 
  creating an OpenStack cluster can be complex, and :ref:`FAQ` section covers 
  many of the issues that tend to arise during the process. 

Lets start off by taking a closer look at Fuel itself. We'll start by explaining 
:ref:`How-Fuel-Works` and then move to the process of installation itself.  
