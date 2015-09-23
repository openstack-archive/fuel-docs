* There is a known issue when a Fuel 6.1 to Fail 7.0 upgrade fails.
  One of Keystone's ports fails to bind and the service fails
  to start when Fuel Upgrade reverts the environment back to 6.1.
  This issue can be worked around by waiting approximately 10 minutes
  and then verifying normal operation via ``dockerctl check all``.
  Note that this impacts only users who attempt at 6.1 to 7.0 upgrade
  and the upgrade fails for some reason.
  See `LP1495933 <https://bugs.launchpad.net/fuel/+bug/1495933>`_.
