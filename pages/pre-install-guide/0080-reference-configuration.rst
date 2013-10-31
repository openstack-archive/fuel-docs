Reference configuration of hardware switches
--------------------------------------------

This section describes reference configuration for Cisco and Juniper
network switches.

Tagged ports
------------

**Cisco Catalyst**

::

        interface [Ten]GigabitEthernet[interface number]
          description [port description]
          switchport trunk encapsulation dot1q
          switchport trunk allowed vlan [vlan IDs for specific networks]
          switchport mode trunk
          spanning-tree portfast trunk        
         switchport trunk native vlan [vlan ID] - if necessary one untagged VLAN

        

**Cisco Nexus/ Arista**

::

 interface ethernet[interface number]
   description [port description]
   switchport
   switchport mode trunk
           switchport trunk allowed vlan [vlan IDs for specific networks]
           switchport trunk native vlan [vlan ID] - if necessary one untagged VLAN

**Juniper**

::

 interfaces {
        [interface_name]-[interface_number] {
            unit 0 {
                family ethernet-switching {
                    port-mode trunk;
                    vlan {
                        members [ vlan IDs or names of specific
 networks];
                         }
                native-vlan-id [vlan ID] if necessary one untagged VLAN
                }
            }
        }
 }


Untagged ports
--------------

**Cisco Catalyst**

::
  
        interface [Ten]GigabitEthernet[interface number]
          description [port description]
          switchport access [vlan ID for specific network]
          switchport mode access
        spanning-tree portfast
     

**Cisco Nexus/Arista**

:: 
  
 interface ethernet[interface number]
  description [port description]
  switchport
         switchport access vlan [vlan ID for specific network]

**Juniper**

::
  
 interfaces {
         [interface_name]-[interface_number] {
            unit 0 {
                family ethernet-switching {
                       port-mode access;
                 vlan {
                        members [vlan ID or name for specific network];
                         }
                }
            }
        }
 }
