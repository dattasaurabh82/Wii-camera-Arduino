$(document).ready(function() {

	//When page loads...
	//$(".tab_content").hide(); //Hide all content
	//$("ul.tabs li:first").find("a").addClass("active").show(); //Activate first tab
	//$(".tab_content:first").show(); //Show first tab content
	$(".components-hide").hide();

	//On Click Event
	$("ul.ctabs li").click(function() {

		$("ul.ctabs li").removeClass("active"); //Remove any "active" class
		$("ul.ctabs a").removeClass("active");
		$("a.all-active").removeClass("all-active");
		$(this).addClass("active"); //Add "active" class to selected tab
		$(this).find("a").addClass("active");
		$(".tab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});



		//When page loads...
	//$(".cstab_content").hide(); //Hide all content
	//$("ul.cstabs li:first").find("a").addClass("active").show(); //Activate first tab
	//$(".cstab_content:first").show(); //Show first tab content

	//On Click Event
	$("ul.cstabs li").click(function() {

		$("ul.cstabs li").removeClass("active"); //Remove any "active" class
		$("ul.cstabs a").removeClass("active");
		$(this).addClass("active"); //Add "active" class to selected tab
		$(this).find("a").addClass("active");
		$(".cstab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).show(); //Fade in the active ID content
		return false;
	});

	$('select').change(function(){
		$('#component-search-form').submit();
	});

	$(".components-toplinks-form #edit-submit").remove();

});
