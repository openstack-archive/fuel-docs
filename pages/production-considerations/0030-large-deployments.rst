.. raw:: pdf

   PageBreak

.. index:: Large Scale Deployments

.. _Large_Scale_Deployments:

Large Scale Deployments
=======================

When deploying large clusters (of 100 nodes or more) there are two basic 
bottlenecks:

Careful planning is key to eliminating these potential problem areas, but 
there's another way. 

Fuel takes care of these problems through caching and orchestration. We feel, 
however, that it's always good to have a sense of how to solve these problems 
should they appear.

Certificate signing requests and Puppet Master/Cobbler capacity
---------------------------------------------------------------

When deploying a large cluster, you may find that Puppet Master begins to have 
difficulty when you start exceeding 20 or more simultaneous requests. Part of 
this problem is because the initial process of requesting and signing 
certificates involves \*.tmp files that can create conflicts. To solve this 
problem, you have two options: 

* reduce the number of simultaneous requests, 
* or increase the number of Puppet Master/Cobbler servers.

The number of simultaneous certificate requests that are active can be 
controlled by staggering the Puppet agent run schedule. This can be 
accomplished through orchestration. You don't need extreme staggering (1 to 5 
seconds will do) but if this method isn't practical, you can increase the number 
of Puppet Master/Cobbler servers.

If you're simply overwhelming the Puppet Master process and not running into 
file conflicts, one way to get around this problem is to use Puppet Master with 
Thin as the backend component and nginx as a frontend component.  This 
configuration dynamically scales the number of Puppet Master processes to better 
accommodate changing load.

.. You can find sample configuration files for nginx and puppetmasterd at [CONTENT NEEDED HERE].

You can also increase the number of servers by creating a cluster that utilizes 
a round robin DNS configuration through a service like HAProxy. You will need 
to ensure that these nodes are kept in sync. For Cobbler, that means a 
combination of the ``--replicate`` switch, XMLRPC for metadata, rsync for 
profiles and distributions. Similarly, Puppet Master can be kept in sync with a 
combination of rsync (for modules, manifests, and SSL data) and database 
replication.

.. 
  image:: /_images/cobbler-puppet-ha.jpg
  :align: center
    
Downloading of operating systems and other software
---------------------------------------------------

Large deployments can also suffer from a bottleneck in terms of the additional 
traffic created by downloading software from external sources. One way to avoid 
this problem is by increasing LAN bandwidth through bonding multiple gigabit 
interfaces. You might also want to consider 10G Ethernet trunking between 
infrastructure switches using CAT-6a or fiber cables to improve backend speeds 
to reduce latency and provide more overall pipe. 

.. seealso:: :ref:`Sizing_Hardware` for more information on choosing networking equipment.

..
    Another option is to prevent the need to download so much data in the first place 
    using either apt-cacher to cache frequently downloaded packages or to set up a 
    private repository. The downside of using your own repository, however, is that 
    you have to spend more time manually updating it. Apt-cacher automates this 
    process. To use apt-cacher, the kickstart that Cobbler sends to each node 
    should specify Cobbler's IP address and the apt-cacher port as the proxy server. 
    This will prevent all of the nodes from having to download the software 
    individually.
    
    `Contact Mirantis <http://www.mirantis.com/contact/>`_ for information on 
    creating a private repository.
