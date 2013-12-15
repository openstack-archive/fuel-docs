.. raw:: pdf

   PageBreak

.. index:: Reference Architectures: Multi-node

.. _Multi-node:

Multi-node Deployment
========================================

For a production environment, you will typically create a high-availability deployment of OpenStack. However, the Multi-node (non-HA) deployment is extremely useful if you just want to see how OpenStack works from a user's point of view. 

.. image:: /_images/deployment-simple.*
  :width: 60%
  :align: center

More commonly, your OpenStack installation will consist of multiple
servers. Exactly how many is up to you, of course, but the main idea
is that your controller(s) are separate from your compute servers, on
which your users' VMs will actually run. One arrangement that will
enable you to achieve this separation while still keeping your
hardware investment relatively modest is to house your storage on your
controller nodes.
