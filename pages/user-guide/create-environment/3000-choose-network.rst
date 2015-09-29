
.. raw:: pdf

  PageBreak

.. _choose-network-ug:

Network service
---------------

.. image:: /_images/user_screen_shots/network-services.png

Five network topologies are supported;
see :ref:`net-topology-plan`.

With the Neutron network selected, the jumbo frames feature
will be automatically enabled during the deployment process.
The jumbo frames parameters will be based on the MTU value of the
node's private network interface.

.. note:: It is not recommended to set different MTU values
   on the private network interfaces of nodes in one cluster
   as this may result in an unstable network.

.. note:: Make sure that the appropriate MTU value is configured
          on the hardware switch that the private interface is
          connected to. Otherwise only standard frames (1528 bytes)
          will pass through.

Enabling the jumbo frames allows for the following benefits:

* Transmission of large packets with reduced CPU utilization
* Increased throughput by reducing the number of frames that
  need processing
* Reduced total overhead byte count of all the frames sent

You can choose any of the Neutron topologies on this screen.
If you choose Legacy Networking (nova-network) here,
you can choose between the FlatDHCP and VLAN topologies
on the Network Settings page.
