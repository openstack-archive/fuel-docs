..raw:: pdf

  PageBreak

..index:: Prerequisites

Hardware Requirements
===========================
The amount of hardware depends on your deployment requirements. 
When you plan your OpenStack environment, consider the following:

* **CPU**
  
  Depends on the number of virtual machines that you plan to deploy
  in your cloud environment and the CPU per virtual machine.
  See :ref:'Calculating CPU Requirements'

* **Memory**
  
  Depends on the amount of RAM assigned per virtual machine and the
  controller node.
  
* **Storage**
 
  Depends on the local drive space per virtual machine, remote volumes
  that can be attached to a virtual machine, and object storage.

* **Networking**
  
  Depends on the OpenStack architecture, network bandwidth per virtual
  machine, and network storage. 
  
Example of Hardware Requirements Calculation 
-------------------------------------------------
When you calculate resources for your OpenStack environment, consider 
resources required for expanding your environment.

The example described in this section presumes that your environment 
has the following prerequisites:

* 100 virtual machines
* 2 x Amazon EC2 compute units 2 GHz average
* 16 x Amazon EC2 compute units 16 GHz maximum






