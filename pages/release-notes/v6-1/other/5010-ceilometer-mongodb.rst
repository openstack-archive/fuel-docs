
.. _ceilometer-mongodb-rn:

OpenStack Telemetry (Ceilometer) and MongoDB Database
-----------------------------------------------------

Resolved Ceilometer and MongoDB Issues
++++++++++++++++++++++++++++++++++++++

* The Ceilometer ``pipeline.yaml`` file was changed to receive all the
  Nova disk ``.rate`` pollsters. See `LP1400324`_.

* The support for a number of Swift notifications has been added.
  These include ``storage.objects.incoming.bytes``,
  ``storage.objects.outgoing.bytes``, and ``storage.api.request``.
  See `LP1400240`_.

* The Telemetry messaging listener is changed from the eventlet
  ``notification_listener`` executor to the blocking one. It is done
  to avoid failures of the ceilometer-agent-notification instances after
  restart and connection to RabbitMQ (that previously had socket errors
  about handshake timeout in its logs). See `LP1393505`_.

* The ``time_to_live`` parameter is now set to one week, and cron job runs
  once a week to clean up the outdated metrics from the database.
  See `LP1399164`_.

Known Ceilometer and MongoDB Issues
+++++++++++++++++++++++++++++++++++

* When ``ceilometerclient`` tries to return more than 500 000 records
  from MongoDB, a response from Ceilometer API has error status
  because of a timeout. See `LP1434589`_.

.. _`LP1400324`: https://bugs.launchpad.net/mos/6.1.x/+bug/1400324
.. _`LP1400240`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1400240
.. _`LP1393505`: https://bugs.launchpad.net/mos/+bug/1393505
.. _`LP1399164`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1399164
.. _`LP1434589`: https://bugs.launchpad.net/fuel/+bug/1434589


