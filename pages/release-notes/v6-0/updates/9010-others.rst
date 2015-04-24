
.. _updates-others-rn:

RabbitMQ
--------

Resolved Issues
+++++++++++++++

* Previously, while deleting a router, the RabbitMQ duplicated
  messages for the Neutron L3 agent. The issue is fixed, and the
  warning "Info for router XXX were not found. Skipping router
  removal." does not appear any more.
  See `LP1412772 <https://bugs.launchpad.net/mos/6.0-updates/+bug/1412772>`_.

Python
------

Resolved Issues
+++++++++++++++

* The memory leak in python-libvirt that affected Compute service
  has been fixed. See `LP1419362 <https://bugs.launchpad.net/mos/6.0-updates/+bug/1419362>`_.

Other Resolved Issues
---------------------

* Sometimes the rpc subsystem could lose its temporary queues
  and caused actions failure. The issue is fixed.
  See `LP1415932 <https://bugs.launchpad.net/mos/+bug/1415932>`_.

* Previously, the download of a large file from Swift via Horizon
  was performed incorrectly: the downloaded file was smaller than
  the actual one. Putting the whole file to memory before returning
  it inside http response caused memory overrun. The issue is fixed,
  and Horizon now streams the files into http response by smaller
  (size is configurable) chunks. So large objects from Swift can
  now be successfully downloaded via Horizon.
  See `LP1423311 <https://bugs.launchpad.net/mos/+bug/1423311>`_
