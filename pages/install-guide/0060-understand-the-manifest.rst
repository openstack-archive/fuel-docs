.. raw:: pdf

   PageBreak

.. index:: CLI Deployment Workflow

Understanding the CLI Deployment Workflow
=========================================

To deploy OpenStack using CLI successfully you need nodes to pass through the 
"Prepare->Discover->Provision->Deploy" workflow. Following sections describe how 
to do this from the beginning to the end of the deployment.
During `Prepare` stage nodes should be connected correctly to the Master node for 
network booting. Then turn on the nodes to boot using PXE provided by Fuel Master node.

Discover
--------

Nodes being booted into bootstrap mode run all the required services for the node 
to be managed by Fuel Master node. When booted into bootstrap phase, node 
contains ssh authorized keys of Master node which allows Cobbler server installed
on Master node to reboot the node during provision phase. Also, bootstrap mode 
configures MCollective on the node and specifies ID used by Astute orchestrator 
to check the status of the node.

Provision
---------

Provisioning is done using Cobbler. Astute orchestrator parses ``nodes`` section 
of YAML configuration file and creates corresponding Cobbler systems using 
parameters specified in ``engine`` section of YAML file. After the systems are 
created, it connects to Cobbler engine and reboots nodes according to the power 
management parameters of the node. 

Deploy
------

Deployment is done using Astute orchestrator, which parses ``nodes`` and 
``attributes`` sections and recalculates parameters needed for deployment.
Calculated parameters are passed to the nodes being deployed by use of 
``nailyfact`` MCollective agent that uploads these attributes to
``/etc/naily.facts`` file of the node. Then puppet parses this file using 
Facter plugin and uploads these facts into puppet. These facts are used 
during catalog compilation phase by puppet master. Finally catalog is executed 
and Astute orchestrator passes to the next node in deployment sequence.

.. raw:: pdf

   PageBreak

.. index:: Deploying Using CLI

Deploying OpenStack Cluster Using CLI
=====================================

.. contents :local:

After you understood how deployment workflow is traversed, you can finally start. 
Connect the nodes to Master node and power them on. You should also plan your 
cluster configuration meaning that you should know which node should host which 
role in the cluster. As soon as nodes boot into bootstrap mode and populate 
their data to MCollective you will need to fill configuration YAML file and
consequently trigger Provisioning and Deployment phases.

YAML High Level Structure
-------------------------

The high level structure of deployment configuration file is:

.. code-block:: yaml

  nodes:          # Array of nodes
  - name:         # Definition of node 
    role:
    .....           
  attributes:     # OpenStack cluster attributes used during deployment
  engine:         # Cobbler engine parameters

nodes Section
+++++++++++++

In this section you define nodes, their IP/MAC addresses, disk partitioning, 
their roles in the cluster and so on. 

attributes Section
++++++++++++++++++

In this section OpenStack cluster attributes such as which networking engine 
(Quantum or Nova Network) to use, whether to use Cinder block storage, which 
usernames and passwords to use for internal and public services of
OpenStack and so on.

engine Section
++++++++++++++

This section specifies parameters used to connect to Cobbler engine during 
provisioning phase.

Collecting Identities
---------------------

After the nodes boot to bootstrap mode, you need to collect their MCollective 
identities. You can do this in two ways:

- Login to the node, open ``/etc/mcollective/server.cfg`` and find node ID in 
  the `identity` field::

    identity = 7
  
- Get discovered nodes JSON file by issuing GET HTTP request to 
  http://<master_ip>:8000/api/nodes/

Calculating Partitioning of the Nodes
-------------------------------------

In order to provision nodes, you need to calculate partitioning for each 
particular node. 

Currently, the smallest partitioning scheme includes two partitions: **root** 
and **swap**. These ones reside on **os** LVM volume group. If you want
to have separate partition for Glance and Swift what we strongly suggest you 
to do, then you need to create a partition with mount point ``/var/lib/glance``.

If you want the node to work as cinder LVM storage you will also need to 
create a ``cinder`` LVM Volume Group.

.. warning:: Do not use '_' and '-' symbols in cinder volume names since the 
  Anaconda limitation.

Partitioning is done by parsing ``ks_spaces`` section of node's ``ks_meta`` hash.
Example ``ks_spaces`` is pasted below.

Be also aware that the sizes are provided in MiBs (= 1024KiB = 1048576 bytes) 
and Anaconda uses 32MiB physical extents for LVM. 
Thus your LVM PVs size MUST be multiple of 32.

.. code-block:: yaml

  # == ks_spaces
  # Kickstart data for disk partitioning
  # The simplest way to calculate is to use REST call to nailgun api,
  # recalculate disk size into MiB and dump the following config. 
  # Workflow is as follows:
  # GET request to http://<fuel-master-node>:8000/api/nodes
  # Parse JSON and derive disk data from meta['disks']. 
  # Set explicitly which disk is system and which is for cinder.
  # $system_disk_size=floor($system_disk_meta['disks']['size']/1048576)
  # $system_disk_path=$system_disk_meta['disks']['disk']
  # $cinder_disk_size=floor($cinder_disk_meta['disks']['size']/1048576)
  #
  # $cinder_disk_path=$cinder_disk_meta['disks']['disk']
  #
  # All further calculations are made in MiB
  # Calculation of system partitions
  #
  # For each node:
  #    calculate size of physical volume for operating system:
  #    $pv_size = $system_disk_size - 200 - 1
  #    declare $swap_size
  #    calculate size of root partition:
  #        $free_vg_size = $pv_size - $swap_size
  #        $free_extents = floor($free_vg_size/32)
  #        $system_disk_size = 32 * $free_extents 
  #  ks_spaces: '"[
  #                {
  #                 \"type\": \"disk\", 
  #                 \"id\": \"$system_disk_path\",
  #                 \"volumes\":
  #                  [
  #                   {
  #                    \"mount\": \"/boot\", 
  #                    \"type\": \"partition\", 
  #                    \"size\": 200
  #                   },
  #                   {
  #                    \"type\": \"mbr\"
  #                   },
  #                   {
  #                    \"size\": $pv_size, 
  #                    \"type\": \"pv\", 
  #                    \"vg\": \"os\"
  #                   }
  #                  ],
  #                 \"size\": $system_disk_size
  #                },
  #                {
  #                 \"type\": \"vg\", 
  #                 \"id\": \"os\", 
  #                 \"volumes\":
  #                  [
  #                   {
  #                    \"mount\": \"/\", 
  #                    \"type\": \"lv\", 
  #                    \"name\": \"root\", 
  #                    \"size\": $system_disk_size 
  #                   },
  #                   {
  #                    \"mount\": \"swap\", 
  #                    \"type\": \"lv\", 
  #                    \"name\": \"swap\", 
  #                    \"size\": $swap_size
  #                   }
  #                  ]
  #                },
  #                {
  #                 \"type\": \"disk\", 
  #                 \"id\": \"$path_to_cinder_disk\",
  #                 \"volumes\":
  #                  [
  #                   {
  #                    \"type\": \"mbr\"
  #                   },
  #                   {
  #                    \"size\": $cinder_disk_size, 
  #                    \"type\": \"pv\", 
  #                    \"vg\": \"cinder\"
  #                   }
  #                  ],
  #                 \"size\": $cinder_disk_size
  #                }
  #               ]"'
  ks_spaces: '"
              [
               {
                \"type\": \"disk\", 
                \"id\": \"disk/by-path/pci-0000:00:06.0-virtio-pci-virtio3\",
                \"volumes\": 
                 [
                  {
                   \"mount\": \"/boot\", 
                   \"type\": \"partition\", 
                   \"size\": 200
                  },
                  {
                   \"type\": \"mbr\"
                  }, 
                  {
                   \"size\": 20000, 
                   \"type\": \"pv\", 
                   \"vg\": \"os\"
                  }
                 ],
                \"size\": 20480
               }, 
               {
                \"type\": \"vg\", 
                \"id\": \"os\", 
                \"volumes\": 
                 [
                  {
                   \"mount\": \"/\", 
                   \"type\": \"lv\", 
                   \"name\": \"root\", 
                   \"size\": 10240
                  }, 
                  {
                   \"mount\": \"swap\", 
                   \"type\": \"lv\", 
                   \"name\": \"swap\", 
                   \"size\": 2048
                  }
                 ]
               }
              ]"'

.. raw:: pdf

   PageBreak

.. index:: Configuring Nodes for Provisioning

Configuring Nodes for Provisioning
==================================

In order to provision nodes you need to configure ``nodes`` section of YAML 
file for each node.
Sample YAML configuration for provisioning is listed below:

.. code-block:: yaml

  nodes: 
    # == id 
    # MCollective node id in mcollective server.cfg.
  - id: 1
    # == uid
    # UID of the node for deployment engine. Should be equal to `id`
    uid: 1  
    # == mac
    # MAC address of the interface being used for network boot.
    mac: 64:43:7B:CA:56:DD
    # == name
    # name of the system in cobbler
    name: controller-01
    # == ip
    # IP issued by cobbler DHCP server to this node during network boot.
    ip: 10.20.0.94
    # == profile
    # Cobbler profile for the node. 
    # Default: centos-x86_64
    # [centos-x86_64|rhel-x86_64]
    # CAUTION:
    # rhel-x86_64 is created only after rpmcache class is run on master node
    # and currently not supported in CLI mode
    profile: centos-x86_64
    # == fqdn
    # Fully-qualified domain name of the node
    fqdn: controller-01.domain.tld
    # == power_type
    # Cobbler power-type. Consult cobbler documentation for available options.
    # Default: ssh
    power_type: ssh
    # == power_user
    # Username for cobbler to manage power of this machine
    # Default: unset
    power_user: root
    # == power_pass
    # Password/credentials for cobbler to manage power of this machine
    # Default: unset
    power_pass: /root/.ssh/bootstrap.rsa
    # == power_address
    # IP address of the device managing the node power state.
    # Default: unset
    power_address: 10.20.0.94
    # == netboot_enabled
    # Disable/enable netboot for this node.
    netboot_enabled: '1'
    # == name_servers
    # DNS name servers for this node during provisioning phase.
    name_servers: ! '"10.20.0.2"'
    # == puppet_master
    # Hostname or IP address of puppet master node
    puppet_master: fuel.domain.tld
    # == ks_meta
    # Kickstart metadata used during provisioning
    ks_meta: 
      # == ks_spaces
      # Kickstart data for disk partitioning
      # The simplest way to calculate is to use REST call to nailgun api,
      # recalculate disk size into MiB and dump the following config. 
      # Workflow is as follows:
      # GET request to http://<fuel-master-node>:8000/api/nodes
      # Parse JSON and derive disk data from meta['disks']. 
      # Set explicitly which disk is system and which is for cinder.
      # $system_disk_size=floor($system_disk_meta['disks']['size']/1048576)
      # $system_disk_path=$system_disk_meta['disks']['disk']
      # $cinder_disk_size=floor($cinder_disk_meta['disks']['size']/1048576)
      #
      # $cinder_disk_path=$cinder_disk_meta['disks']['disk']
      #
      # All further calculations are made in MiB
      # Calculation of system partitions
      #
      # For each node:
      #    calculate size of physical volume for operating system:
      #    $pv_size = $system_disk_size - 200 - 1
      #    declare $swap_size
      #    calculate size of root partition:
      #        $free_vg_size = $pv_size - $swap_size
      #        $free_extents = floor($free_vg_size/32)
      #        $system_disk_size = 32 * $free_extents 
      #  ks_spaces: '"[
      #                {
      #                 \"type\": \"disk\", 
      #                 \"id\": \"$system_disk_path\",
      #                 \"volumes\":
      #                  [
      #                   {
      #                    \"mount\": \"/boot\", 
      #                    \"type\": \"partition\", 
      #                    \"size\": 200
      #                   },
      #                   {
      #                    \"type\": \"mbr\"
      #                   },
      #                   {
      #                    \"size\": $pv_size, 
      #                    \"type\": \"pv\", 
      #                    \"vg\": \"os\"
      #                   }
      #                  ],
      #                 \"size\": $system_disk_size
      #                },
      #                {
      #                 \"type\": \"vg\", 
      #                 \"id\": \"os\", 
      #                 \"volumes\":
      #                  [
      #                   {
      #                    \"mount\": \"/\", 
      #                    \"type\": \"lv\", 
      #                    \"name\": \"root\", 
      #                    \"size\": $system_disk_size 
      #                   },
      #                   {
      #                    \"mount\": \"swap\", 
      #                    \"type\": \"lv\", 
      #                    \"name\": \"swap\", 
      #                    \"size\": $swap_size
      #                   }
      #                  ]
      #                },
      #                {
      #                 \"type\": \"disk\", 
      #                 \"id\": \"$path_to_cinder_disk\",
      #                 \"volumes\":
      #                  [
      #                   {
      #                    \"type\": \"mbr\"
      #                   },
      #                   {
      #                    \"size\": $cinder_disk_size, 
      #                    \"type\": \"pv\", 
      #                    \"vg\": \"cinder\"
      #                   }
      #                  ],
      #                 \"size\": $cinder_disk_size
      #                }
      #               ]"'
      ks_spaces: '"[
                    {
                     \"type\": \"disk\", 
                     \"id\": \"disk/by-path/pci-0000:00:06.0-virtio-pci-virtio3\",
                     \"volumes\": 
                      [
                       {
                        \"mount\": \"/boot\", 
                        \"type\": \"partition\", 
                        \"size\": 200
                       },
                       {
                        \"type\": \"mbr\"
                       }, 
                       {
                        \"size\": 20000, 
                        \"type\": \"pv\", 
                        \"vg\": \"os\"
                       }
                      ],
                     \"size\": 20480
                    }, 
                    {
                     \"type\": \"vg\", 
                     \"id\": \"os\", 
                     \"volumes\": 
                      [
                       {
                        \"mount\":\"/\", 
                        \"type\": \"lv\", 
                        \"name\": \"root\", 
                        \"size\": 10240 
                       }, 
                       {
                        \"mount\": \"swap\", 
                        \"type\": \"lv\", 
                        \"name\": \"swap\", 
                        \"size\": 2048
                       }
                      ]
                    }
                   ]"'
      # == mco_enable
      # If mcollective should be installed and enabled on the node
      mco_enable: 1
      # == mco_vhost
      # Mcollective AMQP virtual host
      mco_vhost: mcollective
      # == mco_pskey
      # **NOT USED** 
      mco_pskey: unset
      # == mco_user
      # Mcollective AMQP user
      mco_user: mcollective
      # == puppet_enable
      # should puppet agent start on boot
      # Default: 0
      puppet_enable: 0
      # == install_log_2_syslog
      # Enable/disable on boot remote logging
      # Default: 1
      install_log_2_syslog: 1
      # == mco_password
      # Mcollective AMQP password
      mco_password: marionette
      # == puppet_auto_setup
      # Whether to install puppet during provisioning
      # Default: 1
      puppet_auto_setup: 1
      # == puppet_master
      # hostname or IP of puppet master server 
      puppet_master: fuel.domain.tld
      # == puppet_auto_setup
      # Whether to install mcollective during provisioning
      # Default: 1
      mco_auto_setup: 1
      # == auth_key
      # Public RSA key to be added to cobbler authorized keys 
      auth_key: ! '""'
      # == puppet_version
      # Which puppet version to install on the node
      puppet_version: 2.7.19
      # == mco_connector
      # Mcollective AMQP driver.
      # Default: rabbitmq
      mco_connector: rabbitmq
      # == mco_host
      # AMQP host to which Mcollective agent should connect
      mco_host: 10.20.0.2
    # == interfaces
    # Hash of interfaces configured during provision state
    interfaces:
      eth0:
        ip_address: 10.20.0.94
        netmask: 255.255.255.0
        dns_name: controller-01.domain.tld
        static: '1'
        mac_address: 64:43:7B:CA:56:DD
    # == interfaces_extra
    # extra interfaces information
    interfaces_extra:
      eth2:
        onboot: 'no'
        peerdns: 'no'
      eth1:
        onboot: 'no'
        peerdns: 'no'
      eth0:
        onboot: 'yes'
        peerdns: 'no'
    # == meta
    # Metadata needed for log parsing during deployment jobs.
    meta:
      # == Array of hashes of interfaces
      interfaces:
      - mac: 64:D8:E1:F6:66:43 
        max_speed: 100
        name: <iface name>
        ip: <IP>
        netmask: <Netmask>
        current_speed: <Integer>
      - mac: 64:C8:E2:3B:FD:6E
        max_speed: 100
        name: eth1
        ip: 10.21.0.94
        netmask: 255.255.255.0
        current_speed: 100
      disks:
      - model: VBOX HARDDISK
        disk: disk/by-path/pci-0000:00:0d.0-scsi-2:0:0:0
        name: sdc
        size: 2411724800000
      - model: VBOX HARDDISK
        disk: disk/by-path/pci-0000:00:0d.0-scsi-1:0:0:0
        name: sdb
        size: 536870912000
      - model: VBOX HARDDISK
        disk: disk/by-path/pci-0000:00:0d.0-scsi-0:0:0:0
        name: sda
        size: 17179869184
      system:
        serial: '0'
        version: '1.2'
        fqdn: bootstrap
        family: Virtual Machine
        manufacturer: VirtualBox
    error_type: 

After you populate YAML file with all the required data, fire Astute 
orchestrator and point it to corresponding YAML file:

.. code-block:: bash

  [root@fuel ~]# astute -f simple.yaml -c provision

Wait for command to finish. Now you can start configuring OpenStack cluster 
parameters.

.. raw:: pdf

   PageBreak

.. index:: Configuring Nodes for Deployment

Configuring Nodes for Deployment
================================

Node Configuration
------------------

In order to deploy OpenStack cluster, you need to populate each node's ``nodes`` 
section of the file with data related to deployment.

.. code-block:: yaml

  nodes:
  ..... 
    # == role
    # Specifies role of the node
    # [primary-controller|controller|storage|swift-proxy|primary-swift-proxy]
    # Default: unspecified
    role: primary-controller
    # == network_data
    # Array of network interfaces hashes
    # ===  name: scalar or array of one or more of 
    # [management|fixed|public|storage]
    # ==== 'management' is used for internal communication
    # ==== 'public' is used for public endpoints
    # ==== 'storage' is used for cinder and swift storage networks
    # ==== 'fixed' is used for traffic passing between VMs in Quantum 'vlan' 
    #      segmentation mode or with Nova Network enabled
    # ===  ip: IP address to be configured by puppet on this interface
    # ===  dev: interface device name
    # ===  netmask: network mask for the interface
    # ===  vlan:  vlan ID for the interface
    # ===  gateway: IP address of gateway (**not used**)
    network_data:
    - name: public
      ip: 10.20.0.94
      dev: eth0
      netmask: 255.255.255.0
      gateway: 10.20.0.1
    - name:
      - management
      - storage
      ip: 10.20.1.94
      netmask: 255.255.255.0
      dev: eth1
    - name: fixed
      dev: eth2
    # == public_br
    # Name of the public bridge for Quantum-enabled configuration
    public_br: br-ex
    # == internal_br
    # Name of the internal bridge for Quantum-enabled configuration
    internal_br: br-mgmt

General Parameters
------------------

Once nodes are populated with role and networking information, 
it is time to set some general parameters for deployment.

.. code-block:: yaml

  attributes:
  ....
    # == master_ip
    # IP of puppet master.
  - master_ip: 10.20.0.2
    # == deployment_id
    # Id if deployment used do differentiate environments
    deployment_id: 1
    # == deployment_source
    # [web|cli] - should be set to cli for CLI installation
    deployment_source: cli
    # == management_vip
    # Virtual IP address for internal services 
    # (MySQL, AMQP, internal OpenStack endpoints)
    management_vip: 10.20.1.200 
    # == public_vip
    # Virtual IP address for public services 
    # (Horizon, public OpenStack endpoints)
    public_vip: 10.20.0.200
    # == auto_assign_floating_ip
    # Whether to assign floating IPs automatically
    auto_assign_floating_ip: true
    # == start_guests_on_host_boot
    # Default: true 
    start_guests_on_host_boot: true
    # == create_networks 
    # whether to create fixed or floating networks
    create_networks: true
    # == compute_scheduler_driver 
    # Nova scheduler driver class
    compute_scheduler_driver: nova.scheduler.multi.MultiScheduler
    == use_cow_images:
    # Whether to use cow images
    use_cow_images: true
    # == libvirt_type
    # Nova libvirt hypervisor type
    # Values: qemu|kvm
    # Default: kvm
    libvirt_type: qemu
    # == dns_nameservers
    # array of DNS servers configured during deployment phase.
    dns_nameservers:
    - 10.20.0.1
    # Below go credentials and access parameters for main OpenStack components
    mysql:
      root_password: root
    glance:
      db_password: glance 
      user_password: glance
    swift:
      user_password: swift_pass
    nova:
      db_password: nova
      user_password: nova
    access:
      password: admin
      user: admin
      tenant: admin
      email: admin@example.org
    keystone:
      db_password: keystone
      admin_token: nova
    quantum_access:
      user_password: quantum
      db_password: quantum
    rabbit:
      password: nova
      user: nova
    cinder:
      password: cinder
      user: cinder
    # == floating_network_range
    # CIDR (for quantum == true) or array if IPs (for quantum == false)
    # Used for creation of floating networks/IPs during deployment
    floating_network_range: 10.20.0.150/26
    # == fixed_network_range
    # CIDR for fixed network created during deployment.
    fixed_network_range: 10.20.2.0/24
    # == ntp_servers
    # List of ntp servers
    ntp_servers:
    - pool.ntp.org

.. raw:: pdf

   PageBreak

.. index:: Configure Deployment Scenario

Configure Deployment Scenario
=============================

Choose deployment scenario you want to use. 
Currently supported scenarios are:

- HA Compact (:download:`Download example YAML file </_static/compact.yaml>`)
- HA Full (:download:`Download example YAML file </_static/full.yaml>`)
- Non-HA Multinode Simple (:download:`Download example YAML file </_static/simple.yaml>`)

.. code-block:: yaml

  attributes:
  ....
    # == deployment_mode
    # [ha|ha_full|multinode]
    deployment_mode: ha

..
  Enabling Nova Network
  ---------------------

  If you want to use Nova Network as networking engine for your
  OpenStack cloud, you need to set ``quantum`` parameter to *false* in 
  your config file:

  .. code-block:: yaml

    attributes:
    .....
      quantum: false

  You need also to configure some nova-network related parameters:

  .. code-block:: yaml

    attributes:
    .....
      novanetwork_parameters:
        vlan_start: <1-1024>
        # == network_manager
        # Which nova-network manager to use
        network_manager: String
        # == network_size
        # which network size to use during fixed network range segmentation
        network_size: <Integer>
        # == num_networks
        # number of networks  into which to split fixed_network_range
        num_networks: <Integer>  

Enabling Quantum
----------------

In order to deploy OpenStack with Quantum you need to enable ``quantum`` in your 
YAML file

.. code-block:: yaml

  attributes:
  .....
    quantum: false

You need also to configure some nova-network related parameters:

.. code-block:: yaml

  attributes:
  .....
    #Quantum part, used only if quantum='true'
    quantum_parameters:
      # == tenant_network_type
      # Which type of network segmentation to use.
      # Values: gre|vlan
      tenant_network_type: gre
      # == segment_range
      # Range of IDs for network segmentation. Consult Quantum documentation. 
      # Values: gre|vlan
      segment_range: ! '300:500'
      # == metadata_proxy_shared_secret
      # Shared secret for metadata proxy services 
      # Values: String
      metadata_proxy_shared_secret: quantum

Enabling Cinder
---------------

Our example uses Cinder, and with some very specific variations from the default. 
Specifically, as we said before, while the Cinder scheduler will continue to 
run on the controllers, the actual storage can be specified by setting 
``cinder_nodes`` array.

.. code-block:: yaml

  attributes:
  .....
    # == cinder_nodes
    # Which nodes to use as cinder-volume backends
    # Array of values 
    # 'all'|<hostname>|<internal IP address of node>|'controller'|<node_role>
    cinder_nodes:
    - controller

Configuring Syslog Parameters
-----------------------------

To configure syslog servers to use, specify several parameters:

.. code-block:: yaml

  # == base_syslog
  # Main syslog server configuration.
  base_syslog:
    syslog_port: '514'
    syslog_server: 10.20.0.2
  # == syslog
  # Additional syslog servers configuration.
  syslog:
    syslog_port: '514'
    syslog_transport: udp
    syslog_server: ''

Setting Verbosity
----------------- 

You also have the option to determine how much information OpenStack provides 
when performing configuration:

.. code-block:: yaml

  attributes:
  ....
    verbose: true
    debug: false

Enabling Horizon HTTPS/SSL mode
-------------------------------

Using the ``horizon_use_ssl`` variable, you have the option to decide whether 
the OpenStack dashboard (Horizon) uses HTTP or HTTPS:

.. code-block:: yaml

  attributes:
  ....
    horizon_use_ssl: false

This variable accepts the following values:

`false`:
  In this mode, the dashboard uses HTTP with no encryption.

`default`:  
  In this mode, the dashboard uses keys supplied with the standard Apache SSL 
  module package.

`exist`:
  In this case, the dashboard assumes that the domain name-based certificate, 
  or keys, are provisioned in advance. This can be a certificate signed by any 
  authorized provider, such as Symantec/Verisign, Comodo, GoDaddy, and so on. 
  The system looks for the keys in these locations:

  * public  `/etc/pki/tls/certs/domain-name.crt`
  * private `/etc/pki/tls/private/domain-name.key`

..    for Debian/Ubuntu:
..      * public  ``/etc/ssl/certs/domain-name.pem``
..      * private ``/etc/ssl/private/domain-name.key``

`custom`:
  This mode requires a static mount point on the fileserver for ``[ssl_certs]`` 
  and certificate pre-existence.  To enable this mode, configure the puppet 
  fileserver by editing ``/etc/puppet/fileserver.conf`` to add::

    [ssl_certs]
      path /etc/puppet/templates/ssl
      allow *

  From there, create the appropriate directory::

    mkdir -p /etc/puppet/templates/ssl

  Add the certificates to this directory.
  
  Then reload the puppetmaster service for these changes to take effect.

Dealing With Multicast Issues
-----------------------------

Fuel uses Corosync and Pacemaker cluster engines for HA scenarios, thus requiring 
consistent multicast networking. Sometimes it is not possible to configure 
multicast in your network. In this case, you can tweak Corosync to use 
unicast addressing by setting ``use_unicast_corosync`` variable to ``true``.

.. code-block:: yaml

  # == use_unicast_corosync
  # which communication protocol to use for corosync
  use_unicast_corosync: false

.. index:: Triggering the Deployment

.. raw:: pdf

   PageBreak

Finally Triggering the Deployment
=================================

After YAML is updated with all the required parameters you can finally trigger 
deployment by issuing ``deploy`` command to Astute orchestrator.

.. code-block:: none

    [root@fuel ~]# astute -f simple.yaml -c deploy

And wait for command to finish.
