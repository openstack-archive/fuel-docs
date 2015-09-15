* Node reinstallation may break connection to a management Virtual IP
  (VIP) address. As a result, OpenStack services will fail on Controller
  nodes.

  To work around the issue, switch the stop order of corosycn/Pacemaker:

  In {/etc/rc6.d, /etc/rc1.d, /etc/rc0.d} do the following::

    rm K20pacemaker

  And then::

    ln -s ../init.d/pacemaker K00pacemaker

 See `LP1492210 <https://bugs.launchpad.net/fuel/+bug/1492210>`_.
