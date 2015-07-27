
.. _sahara-rn:

Data Processing (Sahara)
------------------------

Resolved Sahara Issues
++++++++++++++++++++++

Sahara cluster provisioning stability improved.
The bigger clusters can now be started using Sahara. Provisioning time however
may slightly increase due to the new services polling strategy used in Sahara.
See `LP1444423 <https://bugs.launchpad.net/mos/+bug/1444423>`_.
