// $Id: panels.js,v 1.1.2.9 2008/05/27 19:25:57 sdboyer Exp $

Drupal.Panels = {};

Drupal.Panels.autoAttach = function() {
  if ($.browser.msie) {
    // If IE, attach a hover event so we can see our admin links.
    $("div.panel-pane").hover(
      function() {
        $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
      },
      function() {
        $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
      }
    );
    $("div.admin-links").hover(
      function() {
        $(this).addClass("admin-links-hover"); return true;
      },
      function(){
        $(this).removeClass("admin-links-hover"); return true;
      }
    );
  }
};

$(Drupal.Panels.autoAttach);
