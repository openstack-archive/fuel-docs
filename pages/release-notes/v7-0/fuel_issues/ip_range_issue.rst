* Deployment will fail with a "Not enough IP addresses" error message
  if there is an insufficient number of IP addresses.
  Sample scenarios:

  * You enable the "Assign public network to all nodes" option and
    specify an insufficient range of IP addresses.
  * The number of available IP addresses is less than the number
    of Controllers plus two IP addresses.
  * There is a number of IP addresses reserved for plugins and hence
    cannot be used for the deployment.
  
  See `LP1487996 <https://bugs.launchpad.net/fuel/7.0.x/+bug/1487996>`_.
