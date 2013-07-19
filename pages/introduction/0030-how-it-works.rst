How Fuel Works
--------------

Fuel works on a simple premise. Rather than installing each of the myriad components that make up OpenStack directly, you instead use a configuration management system like Puppet to create scripts that can provide a configurable, reproducible, sharable installation process.

In practice, that means that the process of using Fuel Library looks like this:

   #. First, use Fuel's automation tools and instructions to set up a master node with Puppet Master and Cobbler. This process only needs to be completed once per installation.

   #. Next, use Fuel's snippets, kickstart files, and preseed files for Cobbler to boot the appropriate servers from bare metal and automatically install the appropriate operating systems. These virtual or physical servers boot up already prepared to call on the Puppet Master to receive their respective OpenStack components.

   #. Finally, to complete the basic OpenStack install, use Fuel's puppet manifests to install OpenStack on the newly created servers. These manifests are completely customizable, enabling you to start with one of the included OpenStack architectures and adapt to your own situation as necessary.

.. image:: https://docs.google.com/drawings/pub?id=15vTTG2_575M7-kOzwsYyDmQrMgCPT2joLF2Cgiyzv7Q&w=678&h=617
	:align: center

Fuel comes with several pre-defined deployment configurations, some of which include additional options from which you can choose.

As of the 3.1 release of Fuel for OpenStack, Fuel Web is included as part of the package. Fuel Web is a simplified way to deploy production-grade OpenStack clouds. Fuel Web provides a streamlined, graphical console experience using the underlying scripts from Fuel Library, including proven deployment configurations and a well-organized workflow for deploying and managing OpenStack environments.

Fuel Web integrates all of the components of Fuel Library into a unified, web-based graphical user interface that walks administrators through the process of installing and configuring a fully functional OpenStack environment.