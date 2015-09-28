* Deleting Controller nodes while Swift is copying data
  may result in lost images.

  Sample scenario:

  #. You deploy an environment with Controller nodes.
  #. You add new Controller nodes to the environment.
  #. Swift starts copying data from the original Controller
     nodes to the new ones.
  #. You immediately delete the original Controller nodes.
  #. As a result, you have:

    * The initially deployed Controller nodes are deleted.
    * The new Controller nodes are incomplete, because Swift
      did not finish copying the data from the original Controller
      nodes.

    Some of the images are lost.

  Do not delete the original Controller nodes before Swift finishes
  copying the data successfully.

  See `LP1498368 <https://bugs.launchpad.net/fuel/+bug/1498368>`_.
