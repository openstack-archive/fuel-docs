* High Availability (HA) will fail if a node runs out of RAM and swap
  memory for various reasons. The workaround is to try migrating
  resources manually via ``crm resource migrate``. If the
  migration attempt fails, restart the affected Controller node
  and try again.
  See `LP11422186 <https://bugs.launchpad.net/bugs/1422186>`_.
