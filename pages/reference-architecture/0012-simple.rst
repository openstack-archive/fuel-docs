.. raw:: pdf

   PageBreak

.. index:: Reference Architectures: Non-HA Simple, Non-HA Simple

.. _Simple:

Simple (no High Availability) Deployment
========================================

In a production environment, you will never have a Simple non-HA
deployment of OpenStack, partly because it forces you to make a number
of compromises as to the number and types of services that you can
deploy. It is, however, extremely useful if you just want to see how
OpenStack works from a user's point of view. 

.. image:: /_images/deployment-simple_svg.jpg
  :align: center

More commonly, your OpenStack installation will consist of multiple
servers. Exactly how many is up to you, of course, but the main idea
is that your controller(s) are separate from your compute servers, on
which your users' VMs will actually run. One arrangement that will
enable you to achieve this separation while still keeping your
hardware investment relatively modest is to house your storage on your
controller nodes.
