* Fuel setup menu does not support devices with serial interface.
  This means that you cannot change the default access credentials
  in the Fuel setup menu.

  As a workaround, do the following:

  #. Install Fuel from ISO as you normally would.
  #. On the first reboot, boot with the ``console=ttyS0 1`` option.
  #. Modify the password manually. Alternatively, you can also
     start the networking service::

       /etc/init.d/networking start

     And then start the setup menu where you can change the default
     credentials by running the following command on the Fuel Master
     node::

       fuelmenu

  See `LP1438658 <https://bugs.launchpad.net/bugs/1438658>`_.
