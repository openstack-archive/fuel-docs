.. _mg-metering:

Metering
++++++++

Metering is usually done at the source of measurement point with the
help of a monitoring agent running on each node being measured. The
goal of metering is to collect operational data **metrics** which are
collections of numeric values organized in groups of consecutive,
chronologically ordered lists. Each data input consists of a recorded
measurement value, a timestamp at which the measurement took place,
and a set of properties describing it. When data inputs from a metric
are segmented into fixed intervals and summarized by a mathematical
transformation in some meaningful way, they can be stored as time
series and interpreted on two-dimensional plots.

The benefits of using time series for monitoring are in their ability
to accurately illustrate the process of change in the context of
historical data. They are indispensable as they answer the
question when and what has changed in an OpenStack cloud.
