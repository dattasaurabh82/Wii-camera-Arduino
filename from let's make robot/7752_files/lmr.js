/* File created 20091004 by Rudolph */

// This is for the Flags module, causes popup disappear after 5 seconds
$(document).bind('flagGlobalAfterLinkUpdate', function(event, data) {
  window.setTimeout(function() {
    $('.flag-message', data.link).hide();
  }, 5*1000);
});

$(document).ready(function() {
    $('.lmr-userinfo').each(function(){
      $(this).qtip({
         content: $(this).next('.lmr-userinfo-data'),
         position: {
            corner: {
                target: 'bottomRight',
                tooltip: 'topRight'
            },
            adjust: { screen: true }
        },
         show: {
             effect: {
                 type: 'fade',
                 length: 500
             }
         },

         hide: {
            fixed: true,
            effect: {
                type: 'fade',
                length: 250
            }
         },
         style: {
            padding: '0px 0px',
            name: 'light',
            width: { min: 200, max: 400 }
         }
      });
    });






/*
    $('div.hide ul').each(function() {
		$(this).removeClass('links');
		$(this).removeClass('inline');
		$(this).find('li').addClass('leaf');
		$(this).parent().hide();
	});

*/

$('ul.sub-links').each(function() {
	$(this).removeClass('links');
	$(this).removeClass('inline');
	$(this).find('li').addClass('leaf');
	$(this).hide();
});


$('.links_menu_more').each(function() {
	$(this).qtip({
		content: $(this).next('ul.sub-links'),
		position: {
			corner: {
				target: 'bottomLeft',
				tooltip: 'topLeft'
			},
			adjust: { screen: false }
		},
		show: {
             effect: {
                 type: 'fade',
                 length: 500
             }
         },

         hide: {
            fixed: true,
            effect: {
                type: 'fade',
                length: 500
            }
         },
         style: {
            padding: '0px 0px',
            name: 'light'
            //width: { min: 500 }
         }
	 });
});

/*
    $('.title-link-options').each(function() {
		//$(this).next('div.links').prepend('<div class="hidden-links-active">Options</div>');
		//$(this).append('<div class="hidden-links">&nbsp;</div>');
		$(this).addClass('hidden-links-active');
		var thisDiv = $(this);
		//alert($(this).attr('id'));
		//var Tag = this.tagName;
		//var Title = '<'+Tag+' class="title hidden-links">'+$(this).html()+'</'+Tag+'>';
      $(this).qtip({
         content: { text: $('#hide-'+$(this).attr('id'))
					//title: ''	// used to be Title, var set above
					 },

         position: {
            corner: {
                target: 'bottomLeft',
                tooltip: 'topLeft'
            },
            adjust: { screen: false }
        },
         show: {
             effect: {
                 type: 'fade',
                 length: 500
             }
         },

         hide: {
            fixed: true,
            effect: {
                type: 'fade',
                length: 500
            }
         },
         style: {
            padding: '0px 0px',
            name: 'light'
            //width: { min: 500 }
         },
         //api: { beforeShow: function(){ 	thisDiv.removeClass('hidden-links-active');
		//								thisDiv.addClass('hidden-links');

		//							},
		//		beforeHide: function() { 	thisDiv.removeClass('hidden-links');
		//								thisDiv.addClass('hidden-links-active');
		//							}
		//		}
      });
	});
*/





});
