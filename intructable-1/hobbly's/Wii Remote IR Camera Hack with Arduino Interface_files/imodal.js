/*
follows bootstrap pattern of jquery plugin definition
should probably just extend bootstrap's modal

usage:
<div class="imodal" id="test-modal" style="display:none">
  <div class="imodal-inner">
    <a href="#" class="imodal-close" data-dismiss="imodal"><img alt="close" src="/static/img/imodal-close.png"/></a>
    <div class="imodal-header">
      <h3>Get More Out of Instructables</h3>
    </div>
    <div class="imodal-body">
      <p>Get More Out of Instructables</p>
    </div>
  </div>
</div>

<a class="btn btn-small addto-btn" href="#test-modal" data-toggle="imodal">Open Modal</a>
*/

!function($) {
  var iModal = function(element, options) {
    this.options = options;
    this.$element = $(element).delegate('[data-dismiss="imodal"]', 'click.dismiss.imodal', $.proxy(this.hide, this));
    this.options.remote && this.$element.find('.imodal-body').load(this.options.remote);
  };

  iModal.prototype = {
    constructor: iModal,
    
    toggle: function() {
      return this[!this.isShown ? 'show' : 'hide']()  
    },
    
    show: function() {
      var that = this, e = $.Event('show');
      this.$element.trigger(e);
      if (this.isShown || e.isDefaultPrevented()) return
      this.isShown = true;
      this.escape();
      this.toggleBackdrop();          
      if (!this.$element.parent().length) {
        this.$element.appendTo(document.body);
      }
      modalPosition = function(modal) {
        modal.css({position:'fixed', left:Math.floor($(window).width()/2)-Math.floor(modal.width()/2)+"px"});
      };
      modalPosition(this.$element);      
      this.$element.show();
      this.$element.focus();
      this.enforceFocus();
      this.$element.addClass('in');      
      this.$element.trigger('shown');
      $(window).resize(function(e) {
          modalPosition(that.$element);
      });      
    },
    
    hide: function(e) {  
      e && e.preventDefault();
      e = $.Event('hide');
      this.$element.trigger(e);
      if (!this.isShown || e.isDefaultPrevented()) return
      this.isShown = false;
      this.escape();
      $(document).off('focusin.imodal');
      this.$element.removeClass('in');
      this.$element.hide().trigger('hidden');
      this.toggleBackdrop();      
    },
    
    escape: function() {
      var that = this;
      if (this.isShown && this.options.keyboard) {
        this.$element.on('keyup.dismiss.imodal', function(e) {
          e.which == 27 && that.hide();
        });
      } else if (!this.isShown) {
        this.$element.off('keyup.dismiss.imodal');
      }
    },

    enforceFocus: function () {
      var that = this;
      $(document).on('focusin.imodal', function(e) {
        if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
          that.$element.focus();
        }
      })
    },
        
    removeBackdrop: function() {
      this.$backdrop.remove();
      this.$backdrop = null;
    },

    toggleBackdrop: function() {
      if (this.isShown && this.options.backdrop) {
        var backdrop = $("#modalMask");
        if (backdrop.length < 1) {
            backdrop = $('<div id="modalMask"/>').appendTo(document.body);
            backdrop.click($.proxy(this.hide, this));
        }
        backdrop.show();
        this.$backdrop = backdrop;
      } else if (!this.isShown && this.$backdrop) {
        this.removeBackdrop();
      }          
    }           
  };
  
  $.fn.imodal = function(option) {
    return this.each(function () {
      var $this = $(this), 
        data = $this.data('imodal'), 
        options = $.extend({}, $.fn.imodal.defaults, $this.data(), typeof option == 'object' && option);
      if (!data) $this.data('imodal', (data = new iModal(this, options)));
      if (typeof option == 'string') data[option]();
      else if (options.show) data.show();
    })
  };
  
  $.fn.imodal.defaults = {
    backdrop:true, 
    keyboard:true, 
    show:true
  };

  $.fn.imodal.Constructor = iModal;
    
  $(function () {
    $('body').on('click.imodal', '[data-toggle="imodal"]', function(e) {
      var $this = $(this), 
        href = $this.attr('href'), 
        $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))),
        option = $target.data('imodal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());
      e.preventDefault();
      $target.imodal(option).one('hide', function(){$this.focus();});
    })
  });
}(window.jQuery);