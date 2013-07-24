Introduction to Fuel for OpenStack
==================================

.. This guide explains how to use Fuel to easily create and maintain an OpenStack 
   cloud infrastructure.

Fuel™ for OpenStack can be used to create virtually any OpenStack configuration. 
To make things easier, the installation includes several pre-defined 
architectures. For the sake of simplicity, this guide emphasises a single, 
common reference architecture; the multi-node, high-availability configuration. 
We begin with an explanation of this architecture, then move on to the details 
of creating the configuration in a test environment using VirtualBox. Finally, 
we give you the information you need to know to create this and other OpenStack 
architectures in a production environment.

This guide assumes that you are familiar with general Linux commands and 
administration concepts, as well as general networking concepts. You should have 
some familiarity with grid or virtualization systems such as Amazon Web Services 
or VMware, as well as OpenStack itself, but you don't need to be an expert.

The Fuel User Guide is organized as follows:

* :ref:`About Fuel <About_Fuel>`, gives you an 
  overview of Fuel and gives you a general idea of how it works.

* :ref:`Reference Architecture <Reference-Architecture>`, provides a 
  general look at the components that make up OpenStack.

* :ref:`Create a multi-node OpenStack cluster using Fuel Web <Fuel-Web-Cluster>`, 
  takes you step-by-step through the process of creating a high-availability 
  OpenStack cluster using Fuel Web. 

* :ref:`Create a multi-node OpenStack cluster using Fuel <Create-Cluster>`, 
  takes you step-by-step through the more advanced process of creating a 
  high-availability OpenStack cluster using the standard Fuel tools.

* :ref:`Production Considerations <Production>`, looks at the 
  real-world questions and problems involved in creating an OpenStack cluster 
  for production use. We discuss issues such as network layout and hardware 
  requirements, and provide tips and tricks for creating a cluster of up to 100 
  nodes.

* With the current (3.1) release Fuel and FuelWeb has been integrated. We encourage all 
  users to use the Fuel Web process for installation and configuration. However, 
  the standard Fuel installation process is still available for those of you who 
  prefer a more detailed approach to deployment. Even with a utility as powerful 
  as Fuel, creating an OpenStack cluster can be complex, and  
  :ref:`Frequently Asked Questions <FAQ>`, covers many of the issues that tend 
  to arise during the process. 

Lets start off by taking a look at Fuel itself. We'll start by explaining what 
it is and :ref:`how Fuel works <How-Fuel-Works>` , and then move to the process 
of installation itself.
