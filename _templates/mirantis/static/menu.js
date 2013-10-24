jQuery(document).ready(function(){
/*Start DocumentReady*/
  
  // Set "act" classes for subnavigation
  var url=document.location.href;
  jQuery.each(jQuery(".subglobalNav a"),function(){
    if(this.href==url){
      jQuery(this).addClass('act');
    };
  });

  // Set "active" classes for navigation items
  var url=location.href;
  if(url.split('/')[3]!=0){url=url.split('/')[3];
  jQuery.each(jQuery("#globalLink a[href*='\\/"+url+"']"),function(){
    jQuery(this).addClass('active');
    var id = jQuery(this).attr('name').substr(2,1);
    jQuery("#subglobal"+id).addClass('currentSubNav');
    jQuery("#gl"+id).css({ "background-color": "#f4f7fa"});
  });};

  //Menu Initalization on start
  jQuery(".currentSubNav").css({'visibility': 'visible', opacity: 0.0});

  //Menu subitems showing "ommousehover"
  jQuery(".glink").mouseover(function(){
    var id = jQuery(this).attr('name').substr(2,1);
    jQuery("#gl"+id).css({ "background-color": "#f4f7fa"});
    if(jQuery(".currentSubNav").attr('id') == "subglobal"+id) { 
      jQuery(".subglobalNav").each(function(){
         if(!jQuery(this).hasClass("currentSubNav")) jQuery(this).css('visibility', 'hidden');
      });
    } else {
      jQuery(".subglobalNav").css('visibility', 'hidden');
      jQuery("#subglobal"+id).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 100);

    }
  }).mouseout(function(){
    var id = jQuery(this).attr('name').substr(2,1);
    jQuery(".glink").css({ "background-color": "#FFFFFF"});
    if(jQuery(".currentSubNav").attr('id') == "subglobal"+id) {
      jQuery("#gl"+id).css({ "background-color": "#f4f7fa"});
    } else {
      jQuery("#subglobal"+id).css({visibility: "hidden"});
      jQuery(".currentSubNav").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 100);
      jQuery("#subglobal"+id).mouseover(function(){
         jQuery("#subglobal"+id).css({visibility: "visible"});
         jQuery("#gl"+id).css({ "background-color": "#f4f7fa"});
         jQuery(".currentSubNav").css({visibility: "hidden"});
      }).mouseout(function(){
         jQuery("#subglobal"+id).css({visibility: "hidden"});
         jQuery("#gl"+id).css({ "background-color": "#ffffff"});
         jQuery(".currentSubNav").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 100);
      });

    }
  });

/*End DocumentReady*/
});

jQuery(window).load(function(){  
   // Set menu margins
   var headerWidth = jQuery("#masthead").width();
   var navWidth = 0;
   jQuery(".glink").each(function(){
       navWidth += jQuery(this).outerWidth();
   });

   jQuery(".subglobalNav").each(function(index){
       var id = parseInt(jQuery(this).attr('id').substr(9,1));
       var width = jQuery(this).width();
       var centerPosition = headerWidth - (jQuery("#gl" + id).position().left + jQuery("#gl" + id).outerWidth()/2);
       var margin = parseInt(centerPosition - width/2);
       var margin = jQuery("#gl" + id).position().left - 5;

       if (margin < 0) margin = 0;
       jQuery(this).css({marginLeft: margin,opacity: 1.0})
   });
});
