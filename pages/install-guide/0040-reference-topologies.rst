.. raw:: pdf

   PageBreak

.. index:: Deployment Configurations

.. _Deployment_Configurations:

Deployment Configurations Provided By Fuel
==========================================

One of the advantages of Fuel is that it comes with a number of pre-built 
deployment configurations that you can use to quickly build your own 
OpenStack cloud infrastructure. These are widely accepted configurations of 
OpenStack, with its constituent components expertly tailored to serve
multipurpose cloud use cases. Fuel provides the ability to create the 
following environment types directly out of the box:

**Multi-node**: The Multi-node installation provides an easy way 
to install an entire OpenStack environment without requiring the expense of 
extra hardware required to ensure high availability.

**Multi-node (HA)**: When you are ready to move to production, the Multi-node 
(HA) configuration is a straightforward way to create an OpenStack environment 
that provides high availability. With three controller nodes and the 
ability to individually assign roles such as Controller, Compute, Cinder,
and Ceph Object Storage Daemon (OSD). Fuel provides the ability to combine 
roles to fit your sizing needs.

.. note::

  Controller and Compute roles cannot be combined on the same host.

In addition to these configurations, Fuel is designed to be completely 
customizable. For assistance on deeper customization options based on the 
included configurations you can `contact Mirantis for further assistance 
<http://www.mirantis.com/contact/>`_.
