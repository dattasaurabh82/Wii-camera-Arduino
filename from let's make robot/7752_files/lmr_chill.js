// lmr_chill.js

$(document).ready(function() {
	$('a[class*=morechill]').hide();

	$("div.chill").bind("click", function(){
		var newLocation = $(this).find('a').attr('href');

		if(newLocation){
			window.location.href = newLocation;
		}else{
			return false;
		}

		//alert(thisUrl);
	});

    $('div.chill').each(function(){
      $(this).qtip({
         content: $(this).next('.cz-poster'),
         position: { target: 'mouse' },
         show: {
			when: 'mouseover',
			solo: true,
			delay: 250,
			effect: {
				type: 'fade',
				length: 250
			}
		 },
         hide: 'mouseout',
         style: {
			tip: true, // Apply a speech bubble tip to the tooltip at the designated tooltip corner
            border: {
               width: 1,
               radius: 0,
               color: '#999999'
            },
            name: 'light', // Use the default light style
		 }
	 })
 });




});	// end $(document).ready(function()
