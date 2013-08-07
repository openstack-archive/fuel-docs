
FUEL™ for OpenStack Documentation
=================================

This repository contains the FUEL™ for OpenStack user and administrator 
guides. For more details, see the [FUEL™ for OpenStack 
portal](http://fuel.mirantis.com "FUEL™ for OpenStack portal").

Contributing
============

We welcome all people who are interested in helping our Documentation team 
to improve our documentation. There are no formal membership requirements, 
so feel free to hop in. The best way to contibute is to fork our repository, 
do your changes and send us a Pull Request. You are invited to contribute 
any type of contribution like new ideas, testing, and even deployment scripts.

We also have an IRC channel at ``#openstack-fuel`` on ``irc.freenode.net`` 
where you can ask questions and give feedback. 

Prerequisites
=============

[Sphinx Documentation Generator](http://sphinx-doc.org/ "Sphinx 
Documentation Generator") must be installed to build the documentation. 
Please note that easy_install is a component of Python's Setup Tools 
package, which is commonly an optional install on most distributions.

To get started, you need to install Sphinx and necessary extensions:

    sudo easy_install -U Sphinx
    sudo easy_install -U cloud_sptheme
    sudo easy_install -U sphinxcontrib-fancybox
    sudo easy_install -U rst2pdf
    sudo easy_install -U sphinxcontrib-blockdiag
    sudo easy_install -U sphinxcontrib-actdiag
    sudo easy_install -U sphinxcontrib-seqdiag
    sudo easy_install -U sphinxcontrib-nwdiag
    sudo easy_install -U sphinxcontrib-plantuml

In addition to these eggs you will need to install 
[PlantUML](http://plantuml.sourceforge.net/ "PlantUML") and 
[ImageMagick](http://www.imagemagick.org/ "ImageMagick").

To install PlantUML you run this wget process:

    sudo wget \
    http://sourceforge.net/projects/plantuml/files/plantuml.jar/download \
    -O /sbin/plantuml.jar

To edit SVG images we use [Inkscape](http://inkscape.org/ "Inkscape") but 
you may use any other SVG-capable tool you like. We're not picky.
    
Building
========

To build a guide in HTML format, go to its directory and then run the 
``make`` command in that directory, like so:

    make html

To generate the PDF file run this:

    make pdf

You will find generated HTML documentation at:

    _build/html
    
You will find generated PDF documentation at:

	_build/pdf
