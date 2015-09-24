* Mirantis OpenStack environments 6.1 or earlier do not support
  HTTPS connection to the Fuel Master node. By default, the HTTPS
  access is disabled and the corresponding value in
  the``/etc/fuel/astute.yaml`` file is set to ``false``. Do not change
  this value if your deployment includes Mirantis OpenStack
  environments that are older than version 7.0.

  Example::

     SSL:
     force_https: false

  See `LP1497271 <https://bugs.launchpad.net/fuel/+bug/1497271>`_.
  See also :ref:`tls-ssl-ops`.
