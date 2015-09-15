Other
-----

Resolved issues
+++++++++++++++

* Previously, if a user wanted to make a backup of an environment to a
  remote server, the authorization prompt appeared only after backing
  up all containers which could take about half an hour. And if a user
  did not enter the pass during the `LoginGraceTime` (the default value
  is 120 seconds), the connection was lost. Now the authorization
  prompt apperars first, and a key-based authentication is used to
  copy the backup archive. See `LP1352369`_.

.. Links
.. _`LP1352369`: https://bugs.launchpad.net/fuel/7.0.x/+bug/1352369