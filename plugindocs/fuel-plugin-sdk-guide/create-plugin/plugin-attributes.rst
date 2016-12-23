
.. _plugin-attributes:

Additional attributes for NICs, bonds, and nodes
------------------------------------------------

You can provide additional attributes for NICs, bonds, and nodes. This is
useful for a plugin providing "per interface" or "per node" technology.

An example of this use case is virtual functions support for vRouter on
each network interface in Contrail.

**To provide additional attributes for NICs:**

Edit the ``nic_attributes.yaml`` file with the additional attributes.

**Example:**

.. code-block:: yaml

    attribute_a:
      label: "NIC attribute A"
      description: "Your description"
      type: "text"
      value: ""
    attribute_b:
      label: "NIC attribute B"
      description: "Your description"
      type: "checkbox"
      value: false

**To provide additional attributes for bonds:**

Edit the ``bond_attributes.yaml`` file with the additional attributes.

**Example:**

.. code-block:: yaml

    attribute_a:
      label: "Bond attribute A"
      description: "Your description"
      type: "text"
      value: ""
    attribute_b:
      label: "Bond attribute B"
      description: "Your description"
      type: "checkbox"
      value: false

**To provide additional attributes for nodes:**

Edit the ``node_attributes.yaml`` file with the additional attributes.

**Example:**

.. code-block:: yaml

    plugin_section_a:
      metadata:
        group: "your_new_section"
        label: "Section A"
      attribute_a:
        label: "Node attribute A for section A"
        description: "Your description"
        type: "text"
      attribute_b:
        label: "Node attribute B for section A"
        description: "Your description"
        type: "checkbox"