
.. _other-rn:

Issues in other components
==========================

* Glance may create unjustified CPU load on a standby cluster.
  The issue is with the multiple concurrent actions with the
  cloud (e.g. various CRUD operations) performed by users.
  Each new action may create a heavier load on the CPU.
  The workaround is to restart the affected service, which will
  drop the CPU consumption by the service back to almost zero.
  See `LP1463522 <https://bugs.launchpad.net/fuel/+bug/1463522>`_.

* Rebooting more than one controller may cause nova-compute services to
  stop reporting their status. This is an issue with the oslo.messaging
  queuing.
  See `LP1465757 <https://bugs.launchpad.net/fuel/+bug/1465757>`_
  and `LP1463440 <https://bugs.launchpad.net/fuel/+bug/1463440>`_.

.. include:: /pages/release-notes/v6-1/other/4010-horizon.rst
.. include:: /pages/release-notes/v6-1/other/6040-murano.rst
.. include:: /pages/release-notes/v6-1/other/4020-keystone.rst
.. include:: /pages/release-notes/v6-1/other/5010-ceilometer-mongodb.rst

