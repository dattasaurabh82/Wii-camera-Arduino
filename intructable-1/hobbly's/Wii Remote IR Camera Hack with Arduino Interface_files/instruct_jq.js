function ___loadFeedback(cb) {
  if(typeof feedBack === "undefined") {
      head.js("/static/js/feedback.jq.js");
      head.ready(cb());
  }
  else
      cb();
}

function subscribe(type, subscriptionId, button, successcallback ) {

  // assume we're subscribing someone, unless we're told to unsubscribe them:
  var action = 'ADD';

  var el = $(button);
  if (el.hasClass('subscribeState')) {/*action is already add by default*/;}
  if (el.hasClass('unsubscribeState')) {action = "REMOVE"}

  if (el.is('input')) {
      // the old way of doing this needs an input to be modified here instead of using the callback
      // this method was abandoned because the new buttons needed icons and fancy changes; those behaviors are
      // moved to the page on which the buttons appear.
      el.val("following");
      el.attr("disabled", "true");
      el.addClass("disabled");
      el.fadeIn(100);
      el.click(function(){return false;});
  }

  $.ajax('/you/subscriptions/',{
      type: 'POST',
      data: {
          subscriptionId: subscriptionId,
          type : type,
          posted: new Date().getTime(),
          action: action
      },
      success: successcallback,
      error: function( jqXHR ) {
          ___loadFeedback(function() {feedBack.addFromJSON( jqXHR.responseText );});
      }
  });
}

function convertToPhotoInstructable( objScr, instructableId, publishDate ) {
	var oldText = objScr.value;
	objScr.value = objScr.value + ' - Wait...';
	var params = {entryId: instructableId, posted: new Date().getTime()};
	if(publishDate){
		params.publishDate = publishDate;
	}

    $.post('/edit/convertToPhotoInstructable',params, function(t){
	    	___loadFeedback(function() {
                objScr.value = oldText;
	    	    objScr.style.color = 'green';
                feedBack.add( t  );
            });
    }).error(function(t){
        ___loadFeedback(function() {feedBack.add( t.status + ' -- ' + t.statusText  );});
    });
}

function addToGuide( guideId, instructableId ) {
  $.ajax( '/edit/guideAdd', {
      type: 'POST',
      data : {
          guideId: guideId,
          instructableId: instructableId,
          posted: new Date().getTime()
      },
      success: function( data ) {
          ___loadFeedback(function() {feedBack.add(data);});
      },
      error: function( jqXHR, statusText, errorThrown ) {
          ___loadFeedback(function() {feedBack.add( jqXHR.status + ' -- ' + errorThrown );});
      }
  } );
}

function ManageQuarantineEntry(params,obj) {
  if(obj){
      $(obj).css('color', '#00cc00');
  }

  params['posted'] = new Date().getTime();

  $.ajax('/admin/quarantine', {
      data: params,
      type: 'POST',
      dataType: 'json',
      success: function( data ) {
          ___loadFeedback(function() {feedBack.addFromJSON(data);});
      },
      error: function( jqXHR, statusText, errorThrown ) {
          ___loadFeedback(function() {feedBack.add( jqXHR.status + ' -- ' + errorThrown );});
      }
  });
}

function MarkEntrySticky( entryID, type, stickyChk ) {
  var params = '';
  var urlvalue = '';
  var chboxvalue = "";
  if( stickyChk.checked ) {
      params = "entryID=" + entryID
              + "&type=" + type;
      chboxvalue = 'on';
  }
  else {
      params = "entryID=" + entryID
              + "&type=" + type;
      chboxvalue = 'off';
  }

  $.ajax('/ajax/sticky', {
      data: params,
      type: 'POST',
      success: function( data ) {
          ___loadFeedback(function() {
              if( chboxvalue == 'on' ) {
                  feedBack.add("Sticky mark is set successfully.");
              }
              else if( chboxvalue == 'off' ) {
                  feedBack.add("Sticky mark is unset successfully.");
              }
          });
      },

      error: function( jqXHR, statusText, errorThrown ) {
          ___loadFeedback(function() {
            feedBack.clear ();
            feedBack.add (jqXHR.status + ' -- QUESTION objects are not sticky-able ' + errorThrown);
          });
      }
  });
}

function resetEntryURL(entryId, entryType){
    $.post("/edit/resetURL?entryId="+entryId+"&categoryString=" + entryType, function(data){
      ___loadFeedback(function() {
            feedBack.addFromJSON($.parseJSON(data), 'feedback', 3000);
            setTimeout(function(){location.reload();},2000);
          });
    });
}

function ApproveEntryAs(entryID, featureChk) {
    var params='';
    var chboxvalue="";
    if (featureChk.checked){
        params = "entryID=" + entryID + "&status=CHECKED";
        chboxvalue='on';
    } else {
        params = "entryID=" + entryID + "&status=UNCHECKED";
        chboxvalue='off';
    }

    $.ajax('/ajax/approve', {
        data: params,
        type: 'POST',
        success: function( data ) {
            ___loadFeedback(function() {
                if(chboxvalue=='on')
                    feedBack.add('Approval set and existing flags removed.', 'feedback');
                else if(chboxvalue=='off')
                    feedBack.add('Approval removed.', 'feedback');
            });
        },

        error: function( jqXHR, statusText, errorThrown ) {
            ___loadFeedback(function() {feedBack.add( jqXHR.status + ' -- ' + errorThrown );});
        }
    });
}

(function($) {
  var AjaxActionBtn = function(el, options) {
    this.$element = $(el);
    this.options = $.extend({}, $.fn.ajaxActionBtn.defaults, options);
    if (this.$element.hasClass('btn'))
      this.$element
        .on("mouseover", function() {
          if ($(this).data('flag') == 1)
              $(this).children('span').html($(this).data('undotxt'));
        })
        .on("mouseout", function(){
          if ($(this).data('flag') == 1)
            $(this).children('span').html($(this).data('donetxt'));
        });
  }
  
  AjaxActionBtn.prototype = {
    constructor: AjaxActionBtn,

    flag: function() {
      var $el = this.$element,
          flagMenu = $el.closest('.flag-menu'),
          instructableId = flagMenu.data('entry-id'),
          msgConfirm = flagMenu.find('.msg-confirm').text(),
          msgSuccess = flagMenu.find('.msg-success').text(),
          flagAs = $el.data('flag-as');
      if (window.confirm(msgConfirm+flagAs)) {
        this.perform({
          entryID: instructableId,
          action: 'SET',
          flag: flagAs
        }, 
        function() {
          ___loadFeedback(function(){
            setTimeout(function() {
              window.feedBack.add(msgSuccess);
              }, 1000);
            });
        });      
      }
    },
    
    vote: function() {
      var $el = this.$element, revert = ($el.data('flag') == 1);
      this.perform({
        contestId: $el.data("contestid"),
        instructableId: $el.data('instructableid'),
        add: !revert,
        posted: new Date().getTime()
      });      
    },
    
    favorite: function() {
      var $el = this.$element, revert = ($el.data('flag') == 1);
      this.perform({entryId: $el.data('instructableid')});              
    },
        
    follow: function() {
      var $el = this.$element, revert = ($el.data('flag') == 1);
      this.perform ({
        subscriptionId: $el.data('followid'),
        type : 'USER',
        posted: new Date().getTime(),
        action: revert ? "REMOVE" : "ADD"
      }, 
      function() {            
        if (revert) {
          $el.data('flag', 0);
          $el.children('.bg-icon').removeClass('checkmarksmall').addClass('plus');
          $el.children('span').html($el.data('dotxt'));
        } else {
          $el.data('flag', 1);
          $el.children('.bg-icon').removeClass('plus').addClass('checkmarksmall');
          $el.children('span').html($el.data('donetxt'));
        }              
      });              
    },
    
    addToContest: function() {
      var $el = this.$element, revert = ($el.data('flag') == 1);
      this.perform ({
        contestId: $el.data('contestid'),
        instructableId: $el.data('instructableid'),
        action: revert ? "REMOVE" : "ADD",
        posted: new Date().getTime()
      });     
    },
    
    addToGroup: function() {
      var $el = this.$element, revert = ($el.data('flag') == 1),
          data = {groupId: $el.data('groupid'), posted: new Date().getTime()};        
      data[(revert)?"removeId":"approveId"] = $el.data("instructableid");  
      this.perform(data);      
    },
    
    addToGuide: function() {
      var $el = this.$element;
      this.perform ({
        guideId: $el.data("guideid"),
        instructableId: $el.data("instructableid"),
        posted: new Date().getTime()
      }, 
      function() {
        $el.addClass('disabled');
        $el.children('.checkmark').addClass('active');
        $el.children('span').html($el.data('donetxt'));
      });    
    },
    
    perform: function(data, callback, continueAfterCallback) {
      var $el = this.$element, revert = ($el.data('flag') == 1);
      $el.addClass('disabled');
      $el.children('span').html('Loading...');      
      $.ajax({
        url: $.fn.ajaxActionBtn.defaults[this.$element.data('action')+'Url'],
        type: 'POST',
        'data': data,
        success: function(data) {
          $el.trigger('ajax-action-success', [data]);
          $el.removeClass('disabled');
          $el.fadeOut(400, function(){
            if (callback) {
              callback(data);
              if (!continueAfterCallback) {
                $el.fadeIn(400);
                return;
              }
            }            
            $el.children('.bg-icon').toggleClass('active');
            if (revert) {
              $el.data('flag', 0);     
              $el.children('span').html($el.data('dotxt'));
            } else {                    
              $el.data('flag', 1);
              $el.children('span').html($el.data('donetxt'));                                                 
            }
            $el.fadeIn(400);
          });
        }
      });
    }  
  }
  
  $.fn.ajaxActionBtn = function(option) {
    return this.each(function() {   
      var $this = $(this),
          data = $this.data('ajaxaction'),
          options = typeof option == 'object' && option;
      if (!data) $this.data('ajaxaction', (data = new AjaxActionBtn(this))); // create new instance for this dom element if doesn't exist
      if (typeof option == 'string') data[option](); // call initial function based on option parameter
    })
  }
  
  $.fn.ajaxActionBtn.defaults = {
    loadingText: 'loading...',
    followUrl: '/you/subscriptions/',
    addToContestUrl: '/contest/enter/',
    addToGroupUrl: '/group/addinstructable', 
    addToGuideUrl: '/edit/guideAdd',
    favoriteUrl: '/ajax/favorite',
    flagUrl: '/ajax/flag',
    voteUrl: '/contest/vote/'
  }
    
  $.fn.ajaxActionBtn.Constructor = AjaxActionBtn
  
  $(function () {
    $('body').on('click.ajaxActionBtn', '[data-action]', function(e) {
      e.preventDefault();
      if (!$(this).hasClass('disabled'))
        $(this).ajaxActionBtn($(this).data('action'));
    });
  })  
})(window.jQuery);