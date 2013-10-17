.. raw:: pdf

   PageBreak

.. index:: Fuel UI: Post-Deployment Check

.. _Post-Deployment-Check:

Post-Deployment Check
=====================

.. contents :local:

On occasion, even a successful deployment may result in some OpenStack 
components not working correctly. If this happens, Fuel offers the ability 
to perform post-deployment checks to verify operations. Part of Fuel's goal 
is to provide easily accessible status information about the most commonly 
used components and the most recently performed actions. To perform these 
checks you will use Sanity and Smoke checks, as described below:

**Sanity Checks**
  Reveal whether the overall system is functional. If it fails, you will most 
  likely need to restart some services to operate OpenStack. 

**Smoke Checks**
  Dive in a little deeper and reveal networking, system-requirements, 
  functionality issues.

Sanity Checks will likely be the point on which the success of your 
deployment pivots, but it is critical to pay close attention to all 
information collected from theses tests. Another way to look at these tests 
is by their names. Sanity Checks are intended to assist in maintaining your 
sanity. Smoke Checks tell you where the fires are so you can put them out 
strategically instead of firehosing the entire installation.

Benefits 
--------

* Using post-deployment checks helps you identify potential issues which 
  may impact the health of a deployed system.

* All post-deployment checks provide detailed descriptions about failed 
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

Running Post-Deployment Checks 
------------------------------

Now, let`s take a closer look on what should be done to execute the tests and 
to understand if something is wrong with your OpenStack environment.

.. image::  /_images/healthcheck_tab.jpg
  :align: center

As you can see on the image above, the Fuel UI now contains a ``Health Check``
tab, indicated by the Heart icon.

All of the post-deployment checks are displayed on this tab. If your 
deployment was successful, you will see a list of tests this show a green 
Thumbs Up in the last column. The Thumb indicates the status of the 
component. If you see a detailed message and a Thumbs Down, that 
component has failed in some manner, and the details will indicate where the 
failure was detected. All tests can be run on different environments, which 
you select on main page of Fuel UI. You can run checks in parallel on 
different environments.

Each test contains information on its estimated and actual duration. There is 
information included about test processing time from in-house testing and 
indicate this in each test. Note that average times are listed from the slowest 
to the fastest systems tested, so your results may vary.

Once a test is complete, the results will appear in the Status column. If 
there was an error during the test, the you will see the error message 
below the test name. To assist in troubleshooting, the test 
scenario is displayed under the failure message and the failed step is 
highlighted. You will find more detailed information on these tests later in 
this section.

An actual test run looks like this:

.. image::  /_images/ostf_screen.jpg
  :align: center

What To Do When a Test Fails 
----------------------------

If a test fails, there are several ways to investigate the problem. You may 
prefer to start in Fuel UI, since its feedback is directly related to the 
health of the deployment. To do so, start by checking the following:

* Under the `Health Check` tab
* In the OpenStack Dashboard
* In the test execution logs (in Environment Logs)
* In the individual OpenStack components' logs

Certainly there are many different conditions that can lead to system 
breakdowns, but there are some simple items that can be examined before you 
start digging deeply. The most common issues include:

* Not all OpenStack services are running
* Some defined quota has been exceeded
* Something has broken in the network configuration
* A general lack of resources (memory/disk space)

The first thing to be done is to ensure all OpenStack services are up and 
running. To do this, you can run the sanity test set or execute the following 
command on your Controller node::

  nova-manage service list

If any service is off (has “XXX” status), you can restart it using this command::

  service openstack-<service name> restart

If all services are on, but you`re still experiencing some issues, you can 
gather information from OpenStack Dashboard (exceeded number of instances, 
fixed IPs, etc). You may also read the logs generated by tests which are 
stored in Logs -> Fuel Master -> Health Check and check if any operation is 
in ERROR status. If it looks like the last item, you may have underprovisioned 
our environment and should check your math and your project requirements.

Sanity Tests Description 
------------------------

Sanity checks work by sending a query to all OpenStack components to get a 
response back from them. Many of these tests are simple in that they ask 
each service for a list of its associated objects and then waits for a 
response. The response can be something, nothing, an error, or a timeout, 
so there are several ways to determine if a service is up. The following list 
includes the suite of sanity tests implemented:

* Instance list availability
* Images list availability
* Volume list availability
* Snapshots list availability
* Flavor list availability
* Limits list availability
* Services list availability
* User list availability
* Check all the services execute normally
* Check Internet connectivity from a compute
* Check DNS resolution on a compute
* Networks availability
* Ports availability

Smoke Tests Description 
-----------------------

Smoke tests verify how your system handles basic OpenStack operations under 
normal circumstances. The Smoke test series uses timeout tests for 
operations that have a known completion time to determine if there is any 
smoke, and thusly fire. An additional benefit to the Smoke Test series is 
that you can observe how fast your environment is the first time you run it. 

All tests use the basic OpenStack services (Nova, Glance, Keystone, Cinder, 
etc), therefore if any of these are inactive, the test using it will fail. It 
is recommended to run all sanity checks prior to your smoke checks to determine 
that all services are alive. This helps ensure that you don't get any false 
negatives. The following is a description of each sanity test available:

* Flavor creation
* Volume creation
* Instance booting and snapshotting
* Keypair creation
* Security group creation
* Network parameters check
* Instance creation
* Floating IP assignment
* Network connectivity check through floating IP
* User creation and authentication in Horizon
