
.. _upload-iso-vsphere:

Upload the ISO to the vCenter Datastore
+++++++++++++++++++++++++++++++++++++++

Log into the vSphere web client
and click on the vCenter item in the left menu:

.. image:: /_images/vCenter/2.1-Fuel-vCenter-go-to-vCenter.png


Now go to the Datastores and choose your datastore
(`datastore1` in our example):

.. image:: /_images/vCenter/2.2a-fuel-vcenter-go-to-datastore.png


.. image:: /_images/vCenter/2.2b-fuel-vcenter-select-your-datastore.png



Go to the Actions menu and choose the ‘Browse Files’ item:

.. image:: /_images/vCenter/2.3-fuel-vcenter-brouse-files.png



Click on the ‘Upload Files’ icon
then browse your filesystem and select the Mirantis OpenStack image:

.. image:: /_images/vCenter/2.4-fuel-vcenter-click-upload.png



Now you must create a network for Fuel PXE traffic
and enable Promiscuous mode on it.

Go back to the vCenter screen and choose the ‘Hosts’ item in the left menu:


.. image:: /_images/vCenter/3.1-fuel-vcenter-go-to-hosts.png



Click on the host where you want to run the Fuel Master node:

.. image:: /_images/vCenter/3.2-fuel-vcenter-choose-host.png


Click on the ‘Networking’ button.

.. image:: /_images/vCenter/3.3-fuel-vcenter-choose-manage-networking.png


Click on the ‘Add Host Networking’ icon:

.. image:: /_images/vCenter/3.4-fuel-vcenter-create-network.png


