
Neutron agent state reporting
-----------------------------

Mirantis OpenStack 6.1 has obtained its own logic to determine
if agents are dead or alive. Agents now do not rely
REST API calls to notify a neutron server
which maintains agents' state by collecting state
reports from agents via AMQP. They can report their
own status by saving it in local files.
So, when a message queue has issues the Cluster Resource Manager
still can respond in time if something goes
wrong with an agent.

See the `Neutron agents blueprint <https://blueprints.launchpad.net/fuel/+spec/neutron-agents-local-reports>`_
for details about the implementation.
