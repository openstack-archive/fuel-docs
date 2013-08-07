Corosync crashes without network connectivity
---------------------------------------------

Depending on a wide range of systems and configurations in network it is 
possible for Corosync's networking protocol, TOTEM, to time out. If this 
happens for an extended period of time, Corosync may crash. In addition, 
MySQL may have stopped. This guide illustrates the process of working 
through Corosync with MySQL issues. 

**Workaround:**

1. Verify that corosync is really broken ``service corosync status``.

* You should see next error: ``corosync dead but pid file exists``

2. Start corosync manually ``service corosync start``.

3. Run ``ps -ef | grep mysql`` and kill ALL(!) **mysqld** and 
   **mysqld_safe** processes.

4. Wait while pacemaker starts mysql processes again.

* You can check it with ``ps -ef | grep mysql`` command.
* If it doesn't start, run ``crm resource p_mysql`` start.

5. Check with ``crm status`` command that this host is part of the cluster 
   and p_mysql is not within "Failed actions".
