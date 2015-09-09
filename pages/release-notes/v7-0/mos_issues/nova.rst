
.. _nova_rn_7.0:

Nova
----

Known issues
+++++++++++++++

* Because the scheduler's caching in environments with one controller
  may not function correctly, you may not be able to launch
  multiple identical instances and may receive the following
  error message::

     "No valid host was found"

  To fix the issue, restart `nova-scheduler`

  .. code-block:: console

     # service nova-scheduler restart

  See `LP1461537`_.


Resolved issues
+++++++++++++++

* The fix solves an issue with the lost tokens
  when one of the memcached servers, which holds
  them, is rebooted. Therefore, an `admin` token
  that `neutronclient` holds becomes invalid.
  In case of 401 HTTP errors, the ``token_endpoint.Token``
  plugin used by Nova does not request a new token from
  Keystone.
  See `LP1486503`_.

.. Links
.. _`LP1486503`: https://bugs.launchpad.net/fuel/+bug/1486503
.. _`LP1461537`: https://bugs.launchpad.net/mos/7.0.x/+bug/1461537
