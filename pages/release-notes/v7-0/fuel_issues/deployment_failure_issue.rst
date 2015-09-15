* Fuel Master node deployment may fail due to a hanging yum process
  inside a Docker container. This can be caused by a corrupted Docker
  storage backend. If the container itself cannot be deleted via
  ``dockerctl delete $CONTAINERNAME`` due to an error, such as
  "Error response from daemon: Cannot destroy container
  fuel-core-7.0-keystone: Driver devicemapper failed to remove
  root filesystem
  01b3d040dcd6eef87611548846e0c3ec53caa8c8520807d2479470d95a896784:
  Error running DeleteDevice dm_task_run failed", you should reinstall
  Fuel Master node and deploy again.
  See `LP1495403 <https://bugs.launchpad.net/bugs/1495403>`_.

