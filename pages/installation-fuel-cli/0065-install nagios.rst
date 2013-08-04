Installing Nagios Monitoring using Puppet
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Fuel provides a way to deploy Nagios for monitoring your OpenStack cluster. Nagios is an open source distributed management and monitoring infrastructure that is commonly used in data centers to keep an eye on thousands of servers. Nagios requires the installation of a software agent on all nodes, as well as having a master server for Nagios which will collect and display all the results. The agent, the Nagios NRPE addon, allows OpenStack to execute Nagios plugins on remote Linux/Unix machines. The main reason for doing this is to monitor key resources (such as CPU load, memory usage, etc.), as well as provide more advanced metrics and performance data on local and remote machines.

Nagios Agent
++++++++++++

In order to install Nagios NRPE on a compute or controller node, a node should have the following settings: ::

  class {'nagios':
    proj_name       => 'test',
    services        => ['nova-compute','nova-network','libvirt'],
    whitelist       => ['127.0.0.1', $nagios_master],
    hostgroup       => 'compute',
  }

* ``proj_name``: An environment for nagios commands and the directory (``/etc/nagios/test/``).
* ``services``: All services to be monitored by nagios.
* ``whitelist``: The array of IP addreses trusted by NRPE.
* ``hostgroup``: The group to be used in the nagios master (do not forget create the group in the nagios master).

Nagios Server
+++++++++++++

In order to install Nagios Master on any convenient node, a node should have the following applied: ::

  class {'nagios::master':
    proj_name       => 'test',
    templatehost    => {'name' => 'default-host','check_interval' => '10'},
    templateservice => {'name' => 'default-service' ,'check_interval'=>'10'},
    hostgroups      => ['compute','controller'],
    contactgroups   => {'group' => 'admins', 'alias' => 'Admins'}, 
    contacts        => {'user' => 'hotkey', 'alias' => 'Dennis Hoppe',
                 'email' => 'nagios@%{domain}',
                 'group' => 'admins'},
  }

* ``proj_name``: The environment for nagios commands and the directory (``/etc/nagios/test/``).
* ``templatehost``: The group of checks and intervals parameters for hosts (as a Hash).
* ``templateservice``: The group of checks and intervals parameters for services  (as a Hash).
* ``hostgroups``: All groups which on NRPE nodes (as an Array).
* ``contactgroups``: The group of contacts (as a Hash).
* ``contacts``: Contacts to receive error reports (as a Hash)

Health Checks
+++++++++++++

You can see the complete definition of the available services to monitor and their health checks at ``deployment/puppet/nagios/manifests/params.pp``.

Here is the list: ::

  $services_list = {
    'nova-compute' => 'check_nrpe_1arg!check_nova_compute',
    'nova-network' => 'check_nrpe_1arg!check_nova_network',
    'libvirt' => 'check_nrpe_1arg!check_libvirt',
    'swift-proxy' => 'check_nrpe_1arg!check_swift_proxy',
    'swift-account' => 'check_nrpe_1arg!check_swift_account',
    'swift-container' => 'check_nrpe_1arg!check_swift_container',
    'swift-object' => 'check_nrpe_1arg!check_swift_object',
    'swift-ring' => 'check_nrpe_1arg!check_swift_ring',
    'keystone' => 'check_http_api!5000',
    'nova-novncproxy' => 'check_nrpe_1arg!check_nova_novncproxy',
    'nova-scheduler' => 'check_nrpe_1arg!check_nova_scheduler',
    'nova-consoleauth' => 'check_nrpe_1arg!check_nova_consoleauth',
    'nova-cert' => 'check_nrpe_1arg!check_nova_cert',
    'cinder-scheduler' => 'check_nrpe_1arg!check_cinder_scheduler',
    'cinder-volume' => 'check_nrpe_1arg!check_cinder_volume',
    'haproxy' => 'check_nrpe_1arg!check_haproxy',
    'memcached' => 'check_nrpe_1arg!check_memcached',
    'nova-api' => 'check_http_api!8774',
    'cinder-api' => 'check_http_api!8776',
    'glance-api' => 'check_http_api!9292',
    'glance-registry' => 'check_nrpe_1arg!check_glance_registry',
    'horizon' => 'check_http_api!80',
    'rabbitmq' => 'check_rabbitmq',
    'mysql' => 'check_galera_mysql',
    'apt' => 'nrpe_check_apt',
    'kernel' => 'nrpe_check_kernel',
    'libs' => 'nrpe_check_libs',
    'load' => 'nrpe_check_load!5.0!4.0!3.0!10.0!6.0!4.0',
    'procs' => 'nrpe_check_procs!250!400',
    'zombie' => 'nrpe_check_procs_zombie!5!10',
    'swap' => 'nrpe_check_swap!20%!10%',
    'user' => 'nrpe_check_users!5!10',
    'host-alive' => 'check-host-alive',
  }
