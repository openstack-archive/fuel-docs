.. _stop_deployment:

Stop and resume the OpenStack environment deployment
----------------------------------------------------

You may need to stop and resume the deployment of your OpenStack environment
in the following cases:

* When some nodes fail during the provisioning or go offline during the
  deployment.
* When you need to adjust the deployment settings, such as networks, plugins,
  configuration parameters, and so on.

Once you stop the deployment, Fuel waits for a particular deployment engine
to finish its execution on all the running nodes and reports the status back
to Nailgun. Using the task-based deployment, Fuel prevents new tasks from
starting but completes the tasks that are already in progress.

Once you resume the deployment, Fuel restarts the deployment with necessary
tasks being restarted on particular nodes. For example, if the host operating
system provisioning had been completed before you stopped the deployment,
then Fuel restarts the deployment tasks only. However, the input data will
change.

**To stop and resume the OpenStack environment deployment:**

#. During the environment deployment, click the :guilabel:`Dashboard` tab in
   the Fuel web UI.
#. In the deployment progress bar area, click :guilabel:`Stop`.
#. Click the :guilabel:`Nodes` tab:

   * If the nodes were stopped during the *provisioning* process, they are
     rebooted to bootstrap and appear as *OFFLINE*. Fuel resets the environment
     to the state before you have started the deployment.

     #. Wait until Fuel reboots the nodes. The nodes must have the
        *PENDING ADDITION* status. All settings in all tabs must be unlocked.
     #. Apply any required changes to the OpenStack environment configuration.

   * If the nodes were stopped during the *deploying* process, they have
     either the *ERROR* or *STOPPED* status.

     #. Troubleshoot the nodes being in the *ERROR* status, if any.
     #. Configure the environment if necessary.

#. Resume the deployment by clicking :guilabel:`Deploy Changes`.
