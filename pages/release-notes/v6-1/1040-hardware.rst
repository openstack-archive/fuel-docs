
.. _hardware-rn:

Hardware Support Issues
=======================

Resolved hardware issues
------------------------

* RAID-1 spans all configured disks on a node.
  Fuel 6.0 and older
  puts a boot partition on each disk
  because OpenStack does not have access to the BIOS.
  Starting with Fuel 6.1, the boot partition
  is put on the first disk only.
  See `LP1258347`_.

* More than 28 disks per node, which used to be a limitation,
  are now supported from Ubuntu installation.
  See `LP1340414`_.

Known hardware issues
---------------------

* You may experience some performance drop on CEPH
  on disks with 4 KB sector size, since the default
  sector size for operation is 512-bytes.
  See `LP1318614`_.

* Adaptec 6805E RAID controller does not work in bootstrap.
  See `LP1438676`_.

* HP BL120/320 RAID controller line is not supported.

  To get a nonstandard ISO, please :ref:`contact Mirantis support <support-rn>`.

  Note that it is impossible to update the kernel if there are no drivers
  for this version. This happens because the source code for the hpvsa
  module is not open, and HP publishes the hpvsa binaries only for specific
  kernel versions. They do not always coincide with those used in Fuel
  with Ubuntu.

  Currently, no equipment for testing is available, and the testing itself
  can not be performed due to the closed HP VSA source code.
  ISO may be assembled only for kernel versions specified by HP.

  See `LP1359331`_ for the details.

  For information about kernel modules that are compiled for specific kernel
  versions, see `HP storage`_ and `hpvsa update`_.

* Dell PER RAID H330/730/730P/830 controllers on bootstrap (kernel 3.10.55)
  are not supported. See `LP1420330`_.

  The custom ISO for the issue can be downloaded from `here`_.
  Moreover, there is a `publicly available bootstrap archive`_
  that can be used as a workaround with Fuel 6.0.1 and Fuel 6.1. To make
  the driver work, you need to download and unpack the archive
  and substitude ``linux.img`` and ``initramfs.img`` files on
  the deployed Fuel master node in the ``/var/www/nailgun/bootstrap``
  folder with the files from it.

* Intel X710 CNA is not supported at the moment. See `LP1445562`_.

* Intel X540-AT2 is not supported, and we strongly not recommend using
  it at the moment.
 




.. Links:
.. _`LP1258347`: https://bugs.launchpad.net/fuel/+bug/1258347
.. _`LP1340414`: https://bugs.launchpad.net/bugs/1340414
.. _`LP1318614`: https://bugs.launchpad.net/fuel/+bug/1318614
.. _`LP1438676`: https://bugs.launchpad.net/fuel/+bug/1438676
.. _`LP1359331`: https://bugs.launchpad.net/fuel/+bug/1359331
.. _`HP storage`: https://launchpad.net/~hp-iss-team/+archive/ubuntu/hp-storage
.. _`hpvsa update`: https://launchpad.net/~hp-iss-team/+archive/ubuntu/hpvsa-update
.. _`LP1445562`: https://bugs.launchpad.net/fuel/+bug/1445562
.. _`LP1420330`: https://bugs.launchpad.net/fuel/+bug/1420330
.. _`here`: http://jenkins-product.srt.mirantis.net:8080/view/custom_iso/job/custom_6.0_iso/75/
.. _`publicly available bootstrap archive`: http://seed-us1.fuel-infra.org/fuelweb-iso/bootstrap-2.6.32-504.1.3-megaraid_sas-06.902.01.00.tar.gz

