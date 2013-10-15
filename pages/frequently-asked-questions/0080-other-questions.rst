.. raw:: pdf

   PageBreak

Other Questions
===============

.. TODO(mihgen): Provide more clear and reflecting reality answer
1. **[Q]** Why did you decide to provide OpenStack packages through your own 
   repository?

   **[A]** We are fully committed to providing our customers with working and 
   stable bits and pieces in order to make successful OpenStack deployments. 
   Please note that we do not distribute our own version of OpenStack; we rather 
   provide a plain vanilla distribution. Put simply, there is no vendor lock-in
   with Fuel. For your convenience, we maintain repositories containing a
   history of OpenStack packages certified to work with our Puppet manifests.

   The advantage of this approach is that you can install any OpenStack version 
   you want (with possible custom big fixes). Even if you are running Essex, 
   just use the Puppet manifests which reference OpenStack packages for Essex 
   from our repository. With each new release we add new OpenStack packages to 
   our repository and create a new branch with Puppet manifests (which, in 
   turn, reference these packages) corresponding to each release. With EPEL 
   this would not be possible, as that repository only keeps the latest version
   for OpenStack packages.
