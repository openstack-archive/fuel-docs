.. _Post-Deployment-Check:

Post-deployment check
=====================

On occasion, even a successful deployment may result in some OpenStack 
components not working correctly. If this happens, Fuel 3.1 offers the 
ability to perform post-deployment checks to verify operations. The goal of 
this functionality is to provide near real-time information on the status of 
the most commonly used components and the most recently performed actions. 
To perform these checks you will use Sanity and Smoke checks, as described 
below:

	* **Sanity Checks** reveal whether the overall system is functional. If 
	it fails, most likely you will need to restart some services to operate 
	OpenStack.

	* **Smoke Checks** give an understanding if something should be fixed 
	relatively to specific OpenStack functions. Smoke checks reveal 
	networking, system-requirements, functionality issues.

Sanity Checks will likely be the point on which the success of your 
deployment pivots, but it critical to pay close attention to all information 
derived from theses tests. Another way to look at these tests is how they 
are named Sanity Checks are intended to assist in maintaining your sanity. 
Smoke Checks tell you where the fires are so you can put them out 
strategically instead of firehosing the entire installation.

Benefits 
--------

	* Using post-deployment checks helps you identify potential issues which 
	may impact the health of a deployed system.  

	* All post-deployment checks provide detailed description on failed 
	operations and tell you which component or components are not working 
	properly.  

	* Previously, performing these checks manually would have consumed a 
	great deal of time. Now, with these checks the process will take only a 
	few minutes. 

	* Aside from verifying that everything is working correctly, the process 
	will also determine how quickly your system works.  

	* Post-deployment checks continue to be useful, for example after 
	sizable changes are made in the system you can use the checks to 
	determine if any new failure points have been introduced.  

Running post-deployment checks 
------------------------------

Now, let`s take a closer look on what should 
be done to execute the tests and to understand if something is wrong with 
your system.

.. _IMAGE_FILE_HERE::

As you can see in the image above, the Fuel UI now contains a “Healthcheck” 
tab, indicated by the Heart icon.

All of the post-deployment checks are displayed on this tab. If your 
deployment was successful, you will see a list of tests this show a green 
Thumbs Up in the last column. The Thumb indicates the status of the 
component. If you see a detailed message and a Thumbs Down, that 
component has failed in some manner, and the details will indicate where the 
failure was detected. All tests can be run on different environments, which 
you select on main page of Fuel UI. You can run checks in parallel on 
different environments.

Each test contains information on its estimated and actual duration. We have 
included information about test processing time from our own tests and 
indicate this in each test. Note that we show average times from the slowest 
to the fastest systems we have tested, so your results will vary.

Once a test is complete the results will appear in the Status column. If 
there was an error during the test the UI will display the error message 
below the test name. To assist in the troubleshooting process, the test 
scenario is displayed under the failure message and the failed step is 
highlighted. You will find more detailed information on these tests later in 
this section. 

An actual test run looks like this:

.. _IMAGE_FILE_HERE::

What should be done when a test failed 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If a test failed, there are several ways to investigate the problem. You may 
prefer to start in Fuel UI since it's feedback is directly related to the 
health of the deployment. To do so, start by checking the following:

	* Under the Healthcheck tab
	* In the OpenStack dashboard
	* In the test execution logs (/var/log/ostf-stdout.log)
	* In the individual OpenStack components logs

Of course, there are many different conditions that can lead to system 
breakdowns, but there are some simple things that can be examined before you 
dig deep. The most common issues are: 

	* Not all OpenStack services are running
	* Any defined quota has been exceeded
	* Something has broken in the network configuration
	* There is a general lack of resources (memory/disk space)

The first thing to be done is to ensure all OpenStack services are on. To do 
this you can run sanity test set, or execute the following command on your 
controller node:

.. code::
nova-manage service list

If any service is off (has “XXX” status), you can restart it using this command: 

.. code::
service openstack-<service name> restart

If all services are on, but you`re still experiencing some issues, you can 
gather information on OpenStack Dashboard (exceeded number of instances, 
fixed ips etc). You may also read the logs generated by tests which is 
stored at /var/log/ostf-stdout.log, or go to /var/log/<component> and view 
if any operation has ERROR status. If it looks like the last item, you may 
have underprovisioned your environment and should check your math and your 
project requirements.

Sanity tests description 
^^^^^^^^^^^^^^^^^^^^^^^^

Sanity checks work by sending a query to all OpenStack components to get a 
response back from them. Many of these tests are simple in that they ask 
each service for a list of it's associated objects and waits for a response. 
The response can be something, nothing, and error, or a timeout, so there 
are several ways to determine if a service is up. The following list shows 
what test is used for each service:

**Instances list availability**
Test checks that Nova component can return list of instances. 
Test scenario:
	# Request list of instances.
	# Check returned list is not empty.

**Images list availability**
Test checks that Glance component can return list of images.
Test scenario: 
	# Request list of images.
	# Check returned list is not empty.

**Volumes list availability**
Test checks that Swift component can return list of volumes.
Test scenario:
	# Request list of volumes.
	# Check returned list is not empty.

**Snapshots list availability**
Test checks that Glance component can return list of snapshots.
Test scenario:
	# Request list of snapshots.
	# Check returned list is not empty.

**Flavors list availability**
Test checks that Nova component can return list of flavors.
Test scenario:
	# Request list of flavors.
	# Check returned list is not empty.

**Limits list availability**
Test checks that Nova component can return list of absolute limits.
Test scenario:
	# Request list of limits.
	# Check response.

**Services list availability**
Test checks that Nova component can return list of services.
Test scenario:
	# Request list of services. 
	# Check returned list is not empty.

**User list availability**
Test checks that Keystone component can return list of users.
Test scenario:
	# Request list of services.
	# Check returned list is not empty.

**Services execution monitoring** 
Test checks that all of the expected services are on, meaning the test will 
fail if any of the listed services is in “XXX” status. 
Test scenario:
	# Connect to a controller via SSH.
	# Execute nova-manage service list command.
	# Check there are no failed services.

**DNS availability**
Test checks that DNS is available. 
Test scenario:
	# Connect to a controller node via SSH.
	# Execute host command for the controller IP.
	# Check DNS name can be successfully resolved.

**Networks availability**
Test checks that Nova component can return list of available networks. 
Test scenario:
	# Request list of networks.
	# Check returned list is not empty.

**Ports availability**
Test checks that Nova component can return list of available ports.
Test scenario:
	# Request list of ports.
	# Check returned list is not empty.

For more information refer to nova cli reference.

Smoke tests description 
^^^^^^^^^^^^^^^^^^^^^^^

Smoke tests verify how your system handles basic OpenStack operations under 
normal circumstances. The Smoke test series uses timeout tests for 
operations that have a known completion time to determine if there is any 
smoke, and thusly fire. An additional benefit to the Smoke Test series is 
that you get to see how fast your environment is the first time you run them. 

All tests use basic OpenStack services (Nova, Glance, Keystone, Cinder etc), 
therefore if any of them is off, the test using it will fail. It is 
recommended to run all sanity checks prior to your smoke checks to determine 
all services are alive. This helps ensure that you don't get any false 
negatives. The following is a description of each sanity test available:

**Flavor creation**
Test checks that low requirements flavor can be created.
Target component: Nova
       Scenario:
           1. Create small-size flavor.
           2. Check created flavor has expected name.
           3. Check flavor disk has expected size.

For more information refer to nova cli reference.

**Volume creation**
Test checks that a small-sized volume can be created.
Target component: Compute
       Scenario:
           1. Create a new small-size volume.
           2. Wait for "available" volume status.
           3. Check response contains "display_name" section.
           4. Create instance and wait for "Active" status
           5. Attach volume to instance.
           6. Check volume status is "in use".
           7. Get created volume information by its id.
           8. Detach volume from instance.
           9. Check volume has "available" status.
           10. Delete volume.

If you see that created volume is in ERROR status, it can mean that you`ve 
exceeded the maximum number of volumes that can be created. You can check it 
on OpenStack dashboard. For more information refer to volume management 
instructions.

**Instance booting and snapshotting**
Test creates a keypair, checks that instance can be booted from default 
image, then a snapshot can be created from it and a new instance can be 
booted from a snapshot.  Test also verifies that instances and images reach 
ACTIVE state upon their creation. 
Target component: Glance
       Scenario:
           1. Create new keypair to boot an instance.
           2. Boot default image.
           3. Make snapshot of created server.
           4. Boot another instance from created snapshot.
 
If you see that created instance is in ERROR status, it can mean that you`ve 
exceeded any system requirements limit. The test is using a nano-flavor with 
parameters: 64 RAM, 1 GB disk space, 1 virtual CPU presented. For more 
information refer to nova cli reference, image management instructions.

**Keypair creation**
Target component: Nova.
	Scenario:
		1. Create a new keypair, check if it was created successfully 
		(check name is expected, response status is 200).
For more information refer to nova cli reference.

**Security group creation**
Target component: Nova
	Scenario:
		1. Create security group, check if it was created correctly 
		(check name is expected, response status is 200).
For more information refer to nova cli reference.

**Network parameters check**
Target component: Nova
	Scenario:
		1. Get list of networks.
		2. Check seen network labels equal to expected ones.
		3. Check seen network ids equal to expected ones.
For more information refer to nova cli reference.

**Instance creation**
Target component: Nova
	Scenario:
		1. Create new keypair (if it`s nonexistent yet).
		2. Create new sec group (if it`s nonexistent yet).
		3. Create instance with usage of created sec group and keypair.
For more information refer to nova cli reference, instance management 
instructions.

**Floating IP assignment**
Target component: Nova
	Scenario:
		1. Create new keypair (if it`s nonexistent yet).
		2. Create new sec group (if it`s nonexistent yet).
		3. Create instance with usage of created sec group and keypair.
		4. Create new floating ip.
		5. Assign floating ip to created instance.
For more information refer to nova cli reference, floating ips management 
instructions.

**Network connectivity check through floating IP**
Target component: Nova
	Scenario:
		1. Create new keypair (if it`s nonexistent yet).
		2. Create new sec group (if it`s nonexistent yet).
		3. Create instance with usage of created sec group and keypair.
		4. Check connectivity for all floating ips using ping command.

If this test failed, it`s better to run a network check and verify that all 
connections are correct. For more information refer to the Nova CLI reference's
floating IPs management instructions.

**User creation and authentication in Horizon**
Test creates new user, tenant, user role with admin privileges and logs in 
to dashboard. Target components: Nova, Keystone
	Scenario:
		1. Create a new tenant.
		2. Check tenant was created successfully.
		3. Create a new user.
		4. Check user was created successfully.
		5. Create a new user role.
		6. Check user role was created successfully.
		7. Perform token authentication.
		8. Check authentication was successful.
		9. Send authentication request to Horizon.
		10. Verify response status is 200.

If this test fails on the authentication step, you should first try opening 
the dashboard - it may be unreachable for some reason and then you should 
check your network configuration. For more information refer to nova cli 
reference.
