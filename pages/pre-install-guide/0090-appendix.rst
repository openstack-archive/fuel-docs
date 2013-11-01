Example 1: HA + Nova-network FlatDHCP manager
---------------------------------------------

As a model example, the following configuration is used:

* **Deployment mode:** Multi-node HA

* **Networking model:** Nova-network FlatDHCP manager

**Hardware and environment:**

* 7 servers with two 1Gb/s ethernet NIC and IPMI
* 1 Cisco Catalyst 2960G switch
* Independent out of band management network for IPMI
* Connection to the Internet or/and DC network via a router called
  **Gateway** and IP 172.16.1.1

**Node Server roles:**

* 1 server as Fuel Node
* 3 servers as Controller Node
* 1 server as Cinder Node
* 2 servers as Compute Node


**Network configuration plan:**

* Public network 172.16.1.0/24
* Floting network 172.16.0.0/24 in VLAN 100
* Management network 192.168.0.0/24 in VLAN 101
* Storage network 192.168.1.0/24 in VLAN 102
* Private (Fixed) network 10.0.0.0/24 in VLAN 103
* Administrative network (for Fuel) 10.20.0.0/24 in VLAN 104

**Network Parameters:**

* Fuel server IP: 10.20.0.2/24 
* Default gateway: 10.20.0.1 
* DNS 10.20.0.1

.. note:: The Internet and rest of DC access is available through the  Public 
          network (for Openstack Nodes) and Administrative network (Fuel server)

From the server node side, ports with the following VLAN IDs for
networks are used:

* eth0 -  Management VLAN 101 (tagged), Storage VLAN 102(tagged) and 
 Administrative VLAN 104 (untagged)
* eth1 -  Public/Floating VLAN 100 (tagged), Private VLAN 103 (tagged)


Detailed Port Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following table describes the detailed  port configuration and VLAN
assignment. 

+--------+-------------------+--------+-----------+-------------------------+
| Switch | Server name       | Server | tagged /  | VLAN ID                 |
| Port   |                   | NIC    | untagged  |                         |
+========+===================+========+===========+=========================+   
| G0/1   | Fuel              | eth0   | untagged  | 104                     |
+--------+-------------------+--------+-----------+-------------------------+
| G0/2   | Fuel              | eth1   | untagged  | 100                     |
+--------+-------------------+--------+-----------+-------------------------+  
| G0/3   | Compute Node 1    | eth0   | tagged    | 101, 102, 104 (untagged)|
+--------+-------------------+--------+-----------+-------------------------+
| G0/4   | Compute Node 1    | eth1   | tagged    | 100, 103                |
+--------+-------------------+--------+-----------+-------------------------+
| G0/5   | Compute Node n    | eth0   | tagged    | 101, 102, 104 (untagged)|
+--------+-------------------+--------+-----------+-------------------------+
| G0/6   | Compute Node n    | eth1   | tagged    | 100, 103                |
+--------+-------------------+--------+-----------+-------------------------+
| G0/7   | Controller Node 1 | eth0   | tagged    | 101, 102, 104(untagged) |
+--------+-------------------+--------+-----------+-------------------------+
| G0/8   | Controller Node 1 | eth1   | tagged    | 100, 103                |
+--------+-------------------+--------+-----------+-------------------------+
| G0/9   | Controller Node 2 | eth0   | tagged    | 101, 102, 104 (untagged)|
+--------+-------------------+--------+-----------+-------------------------+
| G0/10  | Controller Node 2 | eth1   | tagged    | 100, 103                |
+--------+-------------------+--------+-----------+-------------------------+
| G0/11  | Controller Node 3 | eth0   | tagged    | 101, 102, 104 (untagged)|
+--------+-------------------+--------+-----------+-------------------------+
| G0/12  | Controller Node 3 | eth1   | tagged    | 100, 103                |
+--------+-------------------+--------+-----------+-------------------------+
| G0/13  | Cinder Node       | eth0   | tagged    | 101, 102, 104 (untagged)|
+--------+-------------------+--------+-----------+-------------------------+
| G0/14  | Cinder Node       | eth1   | tagged    | 100, 103                |
+--------+-------------------+--------+-----------+-------------------------+
| G0/24  | Router (default   | -      | untagged  | 100                     |
|        | gateway)          |        |           |                         |
+--------+-------------------+--------+-----------+-------------------------+
  

Connect the cable servers to the switch as in the diagram below:

.. image:: /_images/preinstall_d_switch_connect.jpg 
   :align: center

The following diagram describes network for this environment.

.. image:: /_images/preinstall_d_logic_network.jpg
   :align: center

To deploy Mirantis OpenStack, use the following  switch
configuration.
  
Switch configuration (Cisco Catalyst 2960G)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

  service timestamps debug datetime msec localtime show-timezone
  service timestamps log datetime msec localtime show-timezone
  service password-encryption
  service sequence-numbers
  !
  hostname OpenStack\_sw1
  !
  logging count
  logging buffered 64000 informational
  logging rate-limit console 100 except errors
  logging console informational
  enable secret r00tme
  !
  username root privilege 15 secret r00tme
  !
  no aaa new-model
  aaa session-id common
  ip subnet-zero
  ip domain-name domain.ltd
  ip name-server [ip of domain name server]
  !
  spanning-tree mode rapid-pvst
  spanning-tree loopguard default
  spanning-tree etherchannel guard misconfig
  spanning-tree extend system-id
  !
  ip ssh time-out 60
  ip ssh authentication-retries 2
  ip ssh version 2
  !
  vlan 100
   name Public
  vlan 101
   name Management
  vlan 102
   name Storage
  vlan 103
   name Private
  vlan 104
   name Admin
   !
  interface GigabitEthernet0/1
     description Fule Node eth0
     switchport access vlan 104
     switchport mode access
     spanning-tree portfast
     !
  interface GigabitEthernet0/2
     description Fule Node eth1 (optional to have direct access to Public net) 
     switchport access vlan 100
     switchport mode access
     spanning-tree portfast
  interface GigabitEthernet0/3
     description Compute Node 1 eth0
     switchport trunk native vlan 104
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 101, 102, 104
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/4
     description Compute Node 1 eth1
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 100, 103
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/5
     description Compute Node 2 eth0
     switchport trunk native vlan 104
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 101, 102, 104
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/6
     description Compute Node 2 eth1
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 100, 103
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/7
     description Controller Node 1 eth0  
     switchport trunk native vlan 104
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 101, 102, 104
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/8
     description Controller Node 1 eth1
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 100, 103
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/9
     description Controller Node 2 eth0
     switchport trunk native vlan 104
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 101, 102, 104
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/10
     description Controller Node 2 eth1
     switchport trunk encapsulation dot1
     switchport trunk allowed vlan 100, 103
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/11
     description Controller Node 3 eth0
     switchport trunk native vlan 104
     switchport trunk encapsulation dot1q
     switchport trunk allowed vlan 101, 102, 104
     switchport mode trunk
     spanning-tree portfast trunk
  interface GigabitEthernet0/12
    description Controller Node 3 eth1
    switchport trunk encapsulation dot1q
    switchport trunk allowed vlan 100, 103
    switchport mode trunk
    spanning-tree portfast trunk
  interface GigabitEthernet0/13
    description Cinder Node eth0
    switchport trunk native vlan 104
    switchport trunk encapsulation dot1q
    switchport trunk allowed vlan 101, 102, 104
    switchport mode trunk
    spanning-tree portfast trunk
  
  interface GigabitEthernet0/14
    description Cinder Node eth1
    switchport trunk encapsulation dot1q
    switchport trunk allowed vlan 100, 103
    switchport mode trunk
    spanning-tree portfast trunk
  interface GigabitEthernet0/24
    description Connection to default gateway
    switchport access vlan 100
    switchport mode access
  !
  interface Vlan100
   ip address 172.16.1.254 255.255.255.0
   ip address 172.16.0.254 255.255.255.0 secondary
   no shutdown
  !
  ip route 0.0.0.0 0.0.0.0 172.16.1.1
  !
  ip classless
  no ip http server
  no ip http secure-server
  !
  line con 0
   session-timeout 15
   privilege level 15
   login local
   password r00tme
  !
  line vty 0 15
   session-timeout 15
   login local
   password r00tme
  !
  ntp server [ntp_server1] prefer
  ntp server [ntp_server2]


Switch configuration (Juniper EX4200)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

  system {
      host-name OpenStack_sw1;
      domain-name domain.ltd;
      authentication-order [ password ];
      root-authentication {
          encrypted-password "xxxxxxxxxxxxxxxxxxx";
      }
  }
  services {
          ssh;
      }
      ntp {
          server [ntp_server1] prefer;
          server [ntp_server2];
      }
  }
  
  interfaces {
      ge-0/0/0 {
          description Fule Node eth0;
              unit 0 {
                  family ethernet-switching {
                         port-mode access;
                       vlan {
                          members vlan_104;
                           }
                  }
              }
      }
      ge-0/0/1 {
          description Fule Node eth1 (optional to have direct access to Public
  net);
              unit 0 {
                  family ethernet-switching {
                         port-mode access;
                       vlan {
                          members vlan_100;
                           }
                  }
              }
      }
      ge-0/0/2 {
          description Compute Node 1 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_104;
                  }
              }
      }
      ge-0/0/3 {
          description Compute Node 1 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_100, vlan_103;
                           }
                  }
              }
       }
      ge-0/0/4 {
          description Compute Node 2 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_104;
                  }
              }
      }
      ge-0/0/5 {
          description Compute Node 2 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_100, vlan_103;
                           }
                  }
              }
      }
      ge-0/0/6 {
          description Controller Node 1 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_104;
                  }
              }
      }
      ge-0/0/7 {
          description controller Node 1 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_100, vlan_103;
                           }
                  }
              }
      }
      ge-0/0/8 {
          description Controller Node 2 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_104;
                  }
              }
       }
      ge-0/0/9 {
          description Controller Node 2 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_100, vlan_103;
                           }
                  }
              }
      }
      ge-0/0/10 {
          description Controller Node 3 eth0;
                 unit 0 {
                  family ethernet-switching {
                  port-mode trunk;
                  vlan {
                      members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_104;
                  }
              }
      }
      ge-0/0/11 {
          description Controller Node 3 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_100, vlan_103;
                           }
                  }
              }
      }
      ge-0/0/12 {
          description Cinder Node 1 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_104;
                  }
              }
      }
      ge-0/0/13 {
          description Cinder Node 1 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_100, vlan_103;
                           }
                  }
              }
      }
      ge-0/0/23 {
          description Connection to default gateway;
          unit 0 {
              family ethernet-switching {
                     port-mode access;
                   vlan {
                      members vlan_100;
                       }
              }
          }
       }
       vlan {
          unit 100 {
              family inet {
                  address 172.16.1.254/24;
                  address 172.16.0.254/24;
              }
          }
       }
  }
  routing-options {
      static {
          route 0.0.0.0/0 next-hop 172.16.1.1;
      }
  }
  protocols {
      dcbx {
          interface all;
      }
      rstp {
          bridge-priority 32k;
          interface ge-0/0/0.0 {
          edge;
          }
          interface ge-0/0/1.0 {
          edge;
          }
          interface ge-0/0/23.0 {
          edge;
          }
          bpdu-block-on-edge;
      }
      lldp {
          interface all;
      }
  }
  vlans {
      vlan_1;
      vlan_100 {
          description Public;
          vlan-id 100;
          l3-interface vlan.100;
      }
      vlan_101 {
          description Management;
          vlan-id 101;
      }
      vlan_102 {
          description Storage;
          vlan-id 102;
      }
      vlan_103 {
          description Private;
          vlan-id 103;
      }
      vlan_104 {
          description Admin;
          vlan-id 104;
      }
  }

Example 2: HA + Neutron with GRE
--------------------------------
As a model example, the following configuration is used:

* **Deploying mode:** Multi-node HA

* **Networking model:** Neutron with GRE

**Hardware and environment:**

* 7 servers with two 1Gb/s ethernet NIC and IPMI
* 1 Cisco Catalyst 3750 switch
* Independent out of band management network for IPMI
* Connection to the Internet or/and DC network via a router called
  **Gateway** and IP 172.16.1.1

**Node servers roles:**

* 1 server as Fuel Node
* 3 servers as Controller Node
* 1 server as Cinder Node
* 2 servers as Compute Node

**Network Configuration Plan:**

* Floating/Public network 172.16.0.0/24 in VLAN 100 (unttaged on
  servers)
* Floating IP range 172.16.0.130 - 254
* Internal network (private) 192.168.111.0/24
* Gateway 192.168.111.1
* DNS 8.8.4.4, 8.8.8.8
* Tunnel ID range 2 - 65535
* Management network 192.168.0.0/24 in VLAN 101
* Storage network 192.168.1.0/24 in VLAN 102
* Administrative network (for Fuel) 10.20.0.0/24 in VLAN 103

**Network Parameters**

* Fuel server: IP 10.20.0.2/24
* Default gateway: 10.20.0.1 
* DNS: 10.20.0.1

.. note:: The Internet and rest of DC access via Public network (for Openstack
          Nodes) and Administrative network (Fuel server).

From server side, ports with following VLAN IDs are used:

*  eth0 - Administrative VLAN 103 (untagged)
*  eth1 - Public/Floating VLAN 100 (untagged), Management VLAN 101
   (tagged), Storage VLAN 102 (tagged)

Detailed port configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following table describes port configuration for this deployment.

+--------+-------------------+--------+-----------+-------------------------+
| Switch | Server name       | Server | tagged /  | VLAN ID                 |
| Port   |                   | NIC    | untagged  |                         |
+========+===================+========+===========+=========================+
| G0/1   | Fuel              | eth0   | untagged  | 103                     |
+--------+-------------------+--------+-----------+-------------------------+
| G0/2   | Fuel              | eth1   | untagged  | 100                     |
+--------+-------------------+--------+-----------+-------------------------+
| G0/3   | Compute Node 1    | eth0   | untagged  | 103                     |
+--------+-------------------+--------+-----------+-------------------------+
| G0/4   | Compute Node 1    | eth1   | tagged    | 100(untagged), 101, 102 |
+--------+-------------------+--------+-----------+-------------------------+
| G0/5   | Compute Node n    | eth0   | tagged    | 103                     |
+--------+-------------------+--------+-----------+-------------------------+
| G0/6   | Compute Node n    | eth1   | tagged    | 100(untagged), 101, 102 |
+--------+-------------------+--------+-----------+-------------------------+
| G0/7   | Controller Node 1 | eth0   | tagged    | 103                     |
+--------+-------------------+--------+-----------+-------------------------+
| G0/8   | Controller Node 1 | eth1   | tagged    | 100(untagged), 101, 102 |
+--------+-------------------+--------+-----------+-------------------------+
| G0/9   | Controller Node 2 | eth0   | tagged    | 103                     |
+--------+-------------------+--------+-----------+-------------------------+
| G0/10  | Controller Node 2 | eth1   | tagged    | 100(untagged), 101, 102 |
+--------+-------------------+--------+-----------+-------------------------+
| G0/11  | Controller Node 3 | eth0   | tagged    | 103                     |
+--------+-------------------+--------+-----------+-------------------------+
| G0/12  | Controller Node 3 | eth1   | tagged    | 100(untagged), 101, 102 |
+--------+-------------------+--------+-----------+-------------------------+
| G0/13  | Cinder Node       | eth0   | tagged    | 103                     |
+--------+-------------------+--------+-----------+-------------------------+
| G0/14  | Cinder Node       | eth1   | tagged    | 100(untagged), 101, 102 |
+--------+-------------------+--------+-----------+-------------------------+
| G0/24  | Router (default   | -      | untagged  | 100                     |
|        | gateway)          |        |           |                         |
+--------+-------------------+--------+-----------+-------------------------+


Switch configuration (Cisco Catalyst 2960G)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the following configuration to deploy Mirantis OpenStack using Cisco
Catalyst 2960G network switch.

::

  service timestamps debug datetime msec localtime show-timezone
  service timestamps log datetime msec localtime show-timezone
  service password-encryption
  service sequence-numbers
  !
  hostname OpenStack_sw1
  !
  logging count
  logging buffered 64000 informational
  logging rate-limit console 100 except errors
  logging console informational
  enable secret r00tme
  !
  username root privilege 15 secret r00tme
  !
  no aaa new-model
  aaa session-id common
  ip subnet-zero
  ip domain-name domain.ltd
  ip name-server [ip of domain name server]
  !
  spanning-tree mode rapid-pvst
  spanning-tree loopguard default
  spanning-tree etherchannel guard misconfig
  spanning-tree extend system-id
  !
  ip ssh time-out 60
  ip ssh authentication-retries 2
  ip ssh version 2
  !
  vlan 100
  name Public
  vlan 101
  name Management
  vlan 102
  name Storage
  vlan 103
  name Admin
  !
  interface GigabitEthernet0/1
   description Fule Node eth0
   switchport access vlan 103
   switchport mode access
   spanning-tree portfast
  !
  interface GigabitEthernet0/2
   description Fule Node eth1 (optional to have direct access to Public net)
   switchport access vlan 100
   switchport mode access
   spanning-tree portfast
  !
  interface GigabitEthernet0/3
   description Compute Node 1 eth0
   switchport access vlan 103
   switchport mode access
   spanning-tree portfast
  !
  interface GigabitEthernet0/4
   description Compute Node 1 eth1
   switchport trunk native vlan 100
   switchport trunk encapsulation dot1q
   switchport trunk allowed vlan 100, 101 102
   switchport mode trunk
   spanning-tree portfast trunk
  !
  interface GigabitEthernet0/5
   description Compute Node 2 eth0
   switchport access vlan 103
   switchport mode access
   spanning-tree portfast
  !
  interface GigabitEthernet0/6
   description Compute Node 2 eth1
   switchport trunk native vlan 100
   switchport trunk encapsulation dot1q
   switchport trunk allowed vlan 100, 101 102
   switchport mode trunk
   spanning-tree portfast trunk
  !
  interface GigabitEthernet0/7
   description Controller Node 1 eth0
   switchport access vlan 103
   switchport mode access
   spanning-tree portfast
  !
  interface GigabitEthernet0/8
   description Controller Node 1 eth1
   switchport trunk native vlan 100
   switchport trunk encapsulation dot1q
   switchport trunk allowed vlan 100, 101 102
   switchport mode trunk
   spanning-tree portfast trunk
  !
  interface GigabitEthernet0/9
   description Controller Node 2 eth0
   switchport access vlan 103
   switchport mode access
   spanning-tree portfast
  !
  interface GigabitEthernet0/10
   description Controller Node 2 eth1
   switchport trunk native vlan 100
   switchport trunk encapsulation dot1q
   switchport trunk allowed vlan 100, 101 102
   switchport mode trunk
   spanning-tree portfast trunk
  !
  interface GigabitEthernet0/11
   description Controller Node 3 eth0
   switchport access vlan 103
   switchport mode access
   spanning-tree portfast
  !
  interface GigabitEthernet0/12
   description Controller Node 3 eth1
   switchport trunk native vlan 100
   switchport trunk encapsulation dot1q
   switchport trunk allowed vlan 100, 101 102
   switchport mode trunk
   spanning-tree portfast trunk
  !
  interface GigabitEthernet0/13
   description Cinder Node eth0
   switchport access vlan 103
   switchport mode access
   spanning-tree portfast
  !
  interface GigabitEthernet0/14
   description Cinder Node eth1
   switchport trunk native vlan 100
   switchport trunk encapsulation dot1q
   switchport trunk allowed vlan 100, 101 102
   switchport mode trunk
   spanning-tree portfast trunk
  !
  interface GigabitEthernet0/24
   description Connection to default gateway
   switchport access vlan 100
   switchport mode access
  !
  interface Vlan100
   ip address 172.16.1.254 255.255.255.0
   ip address 172.16.0.254 255.255.255.0 secondary
   no shutdown
  !
  ip route 0.0.0.0 0.0.0.0 172.16.1.1
  !
  ip classless
  no ip http server
  no ip http secure-server
  !
  line con 0
  session-timeout 15
  privilege level 15
  login local
  password r00tme
  !
  line vty 0 15
  session-timeout 15
  login local
  password r00tme
  !
  ntp server [ntp_server1] prefer
  ntp server [ntp_server2]

Switch configuration (Juniper EX4200)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the following configuration to deploy Mirantis OpenStack using
Juniper EX4200 network switch.

::

  system {
      host-name OpenStack_sw1;
      domain-name domain.ltd;
      authentication-order [ password ];
      root-authentication {
          encrypted-password "xxxxxxxxxxxxxxxxxxx";
      }             
  }
  services {
          ssh;
      }
      ntp {
          server [ntp_server1] prefer;
          server [ntp_server2];
      }
  }
  
  interfaces {
      ge-0/0/0 {
          description Fule Node eth0;
              unit 0 {
                  family ethernet-switching {
                         port-mode access;
                       vlan {
                          members vlan_103;
                           }
                  }
              }
      }
      ge-0/0/1 {
          description Fule Node eth1 (optional to have direct access to Public
  net);
              unit 0 {
                  family ethernet-switching {
                         port-mode access;
                       vlan {
                          members vlan_100;
                           }
                  }
              }
      }
      ge-0/0/2 {
          description Compute Node 1 eth0;
          unit 0 {
              family ethernet-switching {
                     port-mode access;
                   vlan {
                      members vlan_103;
                       }
              }
          }
      }
      ge-0/0/3 {
          description Compute Node 1 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                   native-vlan-id vlan_100;
                  }
              }
       }
      ge-0/0/4 {
          description Compute Node 2 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode access;
                      vlan {
                          members vlan_103;
                           }
                   }
              }
      }
      ge-0/0/5 {
          description Compute Node 2 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_100;
                  }
              }
      }
      ge-0/0/6 {
          description Controller Node 1 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode access;
                      vlan {
                          members vlan_103;
                           }
                  }
              }
      }
      ge-0/0/7 {
          description controller Node 1 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_100;
                  }
              }
      }
      ge-0/0/8 {
          description Controller Node 2 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode access;
                      vlan {
                          members vlan_103;
                           }
                  }
              }
       }
      ge-0/0/9 {
          description Controller Node 2 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_100;
                  }
              }
      }
      ge-0/0/10 {
          description Controller Node 3 eth0;
                 unit 0 {
                  family ethernet-switching {
                  port-mode access;
                  vlan {
                      members vlan_103;
                           }
                  }
              }
      }
      ge-0/0/11 {
          description Controller Node 3 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_100;
                  }
              }
      }
      ge-0/0/12 {
          description Cinder Node 1 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode access;
                      vlan {
                          members vlan_103;
                           }
                  }
              }
      }
      ge-0/0/13 {
          description Cinder Node 1 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_100;
                  }
              }
      }
      ge-0/0/23 {
          description Connection to default gateway;
          unit 0 {
              family ethernet-switching {
                     port-mode access;
                   vlan {
                      members vlan_100;
                       }
              }
          }
       }
       vlan {
          unit 100 {
              family inet {
                  address 172.16.1.254/24;
                  address 172.16.0.254/24;
              }
          }
       }
  
  }
  routing-options {
      static {
          route 0.0.0.0/0 next-hop 172.16.1.1;
      }
  }
  protocols {
      dcbx {
          interface all;
      }
      rstp {
          bridge-priority 32k;
          interface ge-0/0/0.0 {
          edge;
          }
          interface ge-0/0/1.0 {
          edge;
          }
          interface ge-0/0/2.0 {
          edge;
          }
          interface ge-0/0/4.0 {
          edge;
          }
          interface ge-0/0/6.0 {
          edge;
          }
          interface ge-0/0/8.0 {
          edge;
          }
          interface ge-0/0/10.0 {
          edge;
          }
          interface ge-0/0/12.0 {
          edge;
          }
          interface ge-0/0/23.0 {
          edge;
          }
          bpdu-block-on-edge;
      }
      lldp {
          interface all;
      }
  }
  vlans {
      vlan_1;
      vlan_100 {
          description Public;
          vlan-id 100;
          l3-interface vlan.100;
      }
      vlan_101 {
          description Management;
          vlan-id 101;
      }
      vlan_102 {
          description Storage;
          vlan-id 102;
      }
      vlan_103 {
          description Admin;
          vlan-id 103;
      }
  }
