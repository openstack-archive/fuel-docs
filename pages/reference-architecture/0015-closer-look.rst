A closer look at the Multi-node (HA) Compact deployment
=======================================================

In this section, you'll learn more about the Multi-node (HA) Compact
deployment configuration and how it achieves high availability. As you may 
recall, this configuration looks something like this:

.. fancybox:: /_images/deployment-ha-compact_svg.png
    :width: 400px
    :height: 250px

OpenStack services are interconnected by RESTful HTTP-based APIs and
AMQP-based RPC messages. So redundancy for stateless OpenStack API
services is implemented through the combination of Virtual IP (VIP)
management using keepalived and load balancing using HAProxy. Stateful
OpenStack components, such as the state database and messaging server,
rely on their respective active/active modes for high availability.
For example, RabbitMQ uses built-in clustering capabilities, while the
database uses MySQL/Galera replication.

.. fancybox:: /_images/ha-overview_svg.png
    :width: 400px
    :height: 250px

Lets take a closer look at what an OpenStack deployment looks like, and
what it will take to achieve high availability for an OpenStack
deployment.

