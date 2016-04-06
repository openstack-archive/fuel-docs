// Toggle main sections
$(".docs-sidebar-section-title").click(function () {
    $('.docs-sidebar-section').not(this).closest('.docs-sidebar-section').removeClass('active');
    $(this).closest('.docs-sidebar-section').toggleClass('active');
// Bug #1422454
// Commenting out next line, the default behavior which was preventing links
// from working.
//    event.preventDefault();
});

/* Bug #1422454
   The toggle functions below enable the expand/collapse, but for now
   there's no easy way to get deeper links from other guides. So,
   commenting both toggle functions out.
// Toggle 1st sub-sections
$(".docs-sidebar-section ol lh").click(function () {
    $('.docs-sidebar-section ol').not(this).closest('.docs-sidebar-section ol').removeClass('active');
    $(this).closest('.docs-sidebar-section ol').toggleClass('active');
    if ($('.docs-has-sub').hasClass('active')) {
      $(this).closest('.docs-sidebar-section ol li').addClass('open');
    }
    event.preventDefault();
});

// Toggle 2nd sub-sections
$(".docs-sidebar-section ol > li > a").click(function () {
    $('.docs-sidebar-section ol li').not(this).removeClass('active').removeClass('open');
    $(this).closest('.docs-sidebar-section ol li').toggleClass('active');
    if ($('.docs-has-sub').hasClass('active')) {
      $(this).closest('.docs-sidebar-section ol li').addClass('open');
    }
    event.preventDefault();
});

/* Bug #1417291
   The rule below creates a shaded plus sign next to
   a numbered sublist of a bulleted list.
   It's probably there to implement expand/collapse of
   list items, but unfortunately it affects also those
   lists where expand/collapse is not intended.

   I am commenting it out to fix this bug. If it causes
   problems elsewhere, they have to be fixed elsewhere. */

// $('ol > li:has(ul)').addClass('docs-has-sub');

// webui popover
$(document).ready(function() {
    function checkWidth() {
        var windowSize = $(window).width();

        if (windowSize <= 767) {
            $('.gloss').webuiPopover({placement:'auto',trigger:'click'});
        }
        else if (windowSize >= 768) {
            $('.gloss').webuiPopover({placement:'auto',trigger:'hover'});
        }
    }

    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
});

// Bootstrap stuff
$('.docs-actions i').tooltip();
$('.docs-sidebar-home').tooltip();

// Hide/Toggle definitions
$("#toggle-definitions").click(function () {
  $(this).toggleClass('docs-info-off');
  if ($('.gloss').hasClass('on')) {
      $('.gloss').removeClass('on').addClass('off').webuiPopover('destroy');
  } else if ($('.gloss').hasClass('off')) {
      $('.gloss').removeClass('off').addClass('on').webuiPopover();
  }
});

// Smooth scroll
$('a').click(function () {
    if($.attr(this, 'href').indexOf("#") != -1){
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
        return false;
    }
});

// Change character image on refresh
// Add file names and captions to doc-characters.json
if($('#superuser-img').length > 0) { //This shouldn't happen unless #superuser-img is available
  $.getJSON('/common/js/doc-characters.json', function(data) {
    var item = data.images[Math.floor(Math.random()*data.images.length)];
    $('<img src="common/images/docs/' + item.image + '">').appendTo('#superuser-img');
    $('<p>' + item.caption + '<strong>OpenStack Operator</strong></p>').appendTo('#superuser-img');
  });
}

/* BB 150310
   openstackdocstheme provides three types of admonitions, important, note
   and warning. We decorate their title paragraphs with Font Awesome icons
   by adding the appropriate FA classes.                               */

$('div.important > p.admonition-title').addClass('fa fa-info-circle');
$('div.note > p.admonition-title').addClass('fa fa-check-circle');
$('div.warning > p.admonition-title').addClass('fa fa-exclamation-triangle');

/* BB 150310
   We also insert a space between the icon and the admonition title
   ("Note", "Warning", "Important" or their i18n equivalents).

   This could be done with a single clause $('p.admonition-title')....,
   affecting all types of admonitions. I play it safe here and explicitly
   work on the three openstackdocstheme admonitions.

   The first parameter of the text() callback is not needed here (it's
   the index of the HTML element that we are modifying)                 */

$('div.important > p.admonition-title').text(function(ignored_para,original) {
    return " "+original
});
$('div.note > p.admonition-title').text(function(ignored_para,original) {
    return " "+original
});
$('div.warning > p.admonition-title').text(function(ignored_para,original) {
    return " "+original
});

// Gives the log a bug icon the information it needs to generate the bug in
// Launchpad with pre-filled information such as git SHA, git.openstack.org
// source URL, published document URL and tag.
function logABug(bugTitle, bugProject, fieldComment, fieldTags) {
    var lineFeed = "%0A";
    var urlBase = "https://bugs.launchpad.net/" + bugProject + "/+filebug?field.title="
    var currentURL = "URL: " + window.location.href;
    var bugLink = urlBase  + encodeURIComponent(bugTitle) +
        "&field.comment=" + lineFeed + lineFeed + "-----------------------------------" + lineFeed + fieldComment +
        lineFeed + currentURL +
        "&field.tags=" + fieldTags;
    document.getElementById("logABugLink1").href=bugLink;
    document.getElementById("logABugLink2").href=bugLink;
    document.getElementById("logABugLink3").href=bugLink;
}
