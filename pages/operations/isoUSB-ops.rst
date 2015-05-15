.. _isoUSB-ops:

Writing a bootable Fuel 6.1 ISO to a USB drive
==============================================

Having downloaded a Fuel ISO, and having
plugged in your USB drive, issue the following command:

 ::

   # dd if=/way/to/your/ISO of=/way/to/your/USB/stick

where */way/to/your/ISO* is the path to your Fuel ISO,
and */way/to/your/USB/stick* is the path to your USB drive.

For example, if your Fuel ISO is in the */home/user/fuel-isos/*
folder and your USB drive is at */dev/sdc*, issue the following:

 ::

  # dd if=/home/user/fuel-isos/fuel-6.1.iso of=/dev/sdc

.. note:: This operation will wipe all the data you have on
          on the USB drive and will place a bootable Fuel ISO
          on it. You also have to write the ISO to the USB
          drive itself, not to a partition on it.
