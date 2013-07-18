FUEL™ for OpenStack Documentation
=================================

This repository contains the FUEL™ for OpenStack user and administrator guides.

For more details, see the [FUEL™ for OpenStack portal](http://fuel.mirantis.com 
"FUEL™ for OpenStack portal").

Prerequisites
=============

[Sphinx Documentation Generator](http://sphinx-doc.org/ "Sphinx Documentation 
Generator") must be installed to build the documentation.

To get started, you need to install Sphinx and necessary extensions:

      sudo easy_install -U Sphinx
      sudo easy_install -U rst2pdf
      sudo easy_install -U sphinxcontrib-blockdiag
      sudo easy_install -U sphinxcontrib-actdiag
      sudo easy_install -U sphinxcontrib-seqdiag
      sudo easy_install -U sphinxcontrib-nwdiag

Plus you will need to install [PlantUML](http://plantuml.sourceforge.net/ 
"PlantUML") and [ImageMagick](http://www.imagemagick.org/ "ImageMagick").

To edit SVG images we use [Inkscape](http://inkscape.org/ "Inkscape") but you 
can use any other tool you want.
    
Building
========

To build a guide in HTML format, go to its directory and then run the ``make`` 
command in that directory. For example:

    make html

To generate the PDF file you shall do:

    make pdf

You will find generated HTML documentation at:

	_build/html


Contributing
============
We are welcome all people interested in helping our team to improve our 
documentation, and there are no formal membership requirements. The best way to 
contibute is to fork our repository, do your changes and send us Pull Request.

There is also an IRC at ``#openstack-fuel`` on ``irc.freenode.net`` where you 
can ask your questions and give your feedback.

We welcome all types of contributions, from new ideas to documentation
to testing to deployment scripts.
