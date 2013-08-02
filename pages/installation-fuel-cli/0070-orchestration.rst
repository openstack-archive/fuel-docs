Deploying OpenStack using Puppet Manifests
------------------------------------------

.. contents:: :local:

You have two options for deploying OpenStack using Puppet manifests. The best 
method is to use orchestration, but you can also deploy your nodes manually.

.. _orchestration:

Deploying via orchestration
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Performing a small series of manual installs many be an acceptable approach in 
some circumstances, but if you plan on deploying to a large number of servers 
then we strongly suggest that you consider orchestration. You can perform a 
deployment using orchestration with Fuel using the "astute" script. This script 
is configured using the "astute.yaml" file that was created when you ran 
"openstack_system" earlier in this process.

To confirm that your servers are ready for orchestration, execute the 
following command::

  mco ping

You should see all three controllers, plus the compute node, in the response 
to the command::

  fuel-compute-01                                    time=107.26 ms
  fuel-controller-01                                 time=120.14 ms
  fuel-controller-02                                 time=135.94 ms
  fuel-controller-03                                 time=139.33 ms

To run the orchestrator, log in to ``fuel-pm`` and execute::

  astute -f astute.yaml

You will see a message on ``fuel-pm`` stating that the installation has 
started on fuel-controller-01.  To see what's going on on the target node on 
Ubuntu-based OS, enter this command::

  tail -f /var/log/syslog

for CentOS or RedHat use this command::

  tail -f /var/log/messages

Note that Puppet will require several runs to install all the different 
roles. The first time it runs, the orchestrator will show an error. This 
error means that the installation isn't complete, but will be rectified 
after the various rounds of installation are completed.  Also, after the 
first run on each server, the orchestrator doesn't output messages on 
fuel-pm; when it's finished running, it will return you to the command 
prompt.  In the meantime, you can see what's going on by watching the logs 
on each individual machine.

Installing OpenStack using Puppet directly
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If, for some reason, you choose not to use orchestration -- one common 
example it when adding a single node to an existing (non-HA) cluster -- you 
have the option to install on one or more nodes using Puppet.

Start by logging in to the target server -- fuel-controller-01 to start, if 
you're starting from scratch -- and running the Puppet agent.

One optional step would be to use the script command to log all of your 
output so you can check for errors::

    script agent-01.log
    puppet agent --test

You will to see a great number of messages scroll by, and the installation 
will take a significant amount of time. When the process has completed, 
press CTRL-D to stop logging and grep for errors::

    grep err: agent-01.log

If you find any errors relating to other nodes you may safely ignore them 
for now.

Now you can run the same installation procedure on fuel-controller-02 and 
fuel-controller-03, as well as fuel-compute-01.

Note that the controllers must be installed sequentially due to the nature 
of assembling a MySQL cluster based on Galera. This means that one server 
must complete its installation before the next installation is started. 
However, compute nodes can be installed concurrently once the controllers 
are in place.

In some cases, you may find errors related to resources that are not yet 
available when the installation takes place. To solve that problem, simply 
re-run the puppet agent on the affected node after running the other 
controllers, and again grep for error messages. When you see no errors on 
any of your nodes, your OpenStack cluster is ready to go.

Examples of OpenStack installation sequences
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When running Puppet manually, the exact sequence depends on the 
configuration goals you're trying to achieve.  In most cases, you'll need to 
run Puppet more than once; with every pass Puppet collects and adds 
necessary absent information to the OpenStack configuration, stores it to 
PuppedDB and applies necessary changes.  

.. note:: 
   *Sequentially run* means you don't start the next node deployment until previous one is finished.
   
**Example 1: Full OpenStack deployment with standalone storage nodes**

  * Create necessary volumes on storage nodes as described in	 :ref:`create-the-XFS-partition`.
  * Sequentially run a deployment pass on every SwiftProxy node (``fuel-swiftproxy-01 ... fuel-swiftproxy-xx``), starting with the ``primary-swift-proxy node``. Node names are set by the ``$swift_proxies`` variable in ``site.pp``. There are 2 Swift Proxies by default.
  * Sequentially run a deployment pass on every storage node (``fuel-swift-01`` ... ``fuel-swift-xx``). 
  * Sequentially run a deployment pass on the controller nodes (``fuel-controller-01 ... fuel-controller-xx``). starting with the ``primary-controller`` node.
  * Run a deployment pass on the Neutron (formerly Quantum) node (``fuel-quantum``) to install the Neutron router.
  * Run a deployment pass on every compute node (``fuel-compute-01 ... fuel-compute-xx``) - unlike the controllers, these nodes may be deployed in parallel.
  * Run an additional deployment pass on Controller 1 only (``fuel-controller-01``) to finalize the Galera cluster configuration.
	
**Example 2: Compact OpenStack deployment with storage and swift-proxy 
combined with nova-controller on the same nodes**

  * Create the necessary volumes on controller nodes as described in :ref:`create-the-XFS-partition`
  * Sequentially run a deployment pass on the controller nodes (``fuel-controller-01 ... fuel-controller-xx``), starting with the ``primary-controller node``. Errors in Swift storage such as */Stage[main]/Swift::Storage::Container/Ring_container_device[<device address>]: Could not evaluate: Device not found check device on <device address>* are expected during the deployment passes until the very final pass.
  * Run an additional deployment pass on Controller 1 only (``fuel-controller-01``) to finalize the Galera cluster configuration.
  * Run a deployment pass on the Neutron node (``fuel-quantum``) to install the Neutron router.
  * Run a deployment pass on every compute node (``fuel-compute-01 ... fuel-compute-xx``) - unlike the controllers these nodes may be deployed in parallel.

**Example 3:** **OpenStack HA installation without Swift**

  * Sequentially run a deployment pass on the controller nodes (``fuel-controller-01 ... fuel-controller-xx``), starting with the primary controller. No errors should appear during this deployment pass.
  * Run an additional deployment pass on the primary controller only (``fuel-controller-01``) to finalize the Galera cluster configuration.
  * Run a deployment pass on the Neutron node (``fuel-quantum``) to install the Neutron router.
  * Run a deployment pass on every compute node (``fuel-compute-01 ... fuel-compute-xx``) - unlike the controllers these nodes may be deployed in parallel.

**Example 4:** **The simplest OpenStack installation: Controller + Compute 
on the same node**

  * Set the ``node /fuel-controller-[\d+]/`` variable in ``site.pp`` to match the hostname of the node on which you are going to deploy OpenStack. Set the ``node /fuel-compute-[\d+]/`` variable to **mismatch** the node name. Run a deployment pass on this node. No errors should appear during this deployment pass.
  * Set the ``node /fuel-compute-[\d+]/`` variable in ``site.pp`` to match the hostname of the node on which you are going to deploy OpenStack. Set the ``node /fuel-controller-[\d+]/`` variable to **mismatch** the node name. Run a deployment pass on this node. No errors should appear during this deployment pass.
