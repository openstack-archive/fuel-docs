Configuration tests description
-------------------------------

Configuration tests verify if the default user data
(e.g. username, password for OpenStack cluster) were changed.
The following is a description of each test available:

* Check usage of the default credentials (password)
  for root user to SSH on the Fuel Master node.
  If the default password was not changed, the
  test will fail with a recommendation to change it.
* Check usage of the default credentials for OpenStack cluster.
  If the default values are used for the admin user, the
  test will fail with a recommendation to
  change the password/username for the OpenStack user with the admin role.

