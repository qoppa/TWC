$(function() {
	
	// Swap Select
	$('div#select2').hide();
	$('div#select3').hide();
	
	$("a#select2").click(function() {
		$('div#select1').hide();
		$('div#select2').show();	
		return false;
	});
	
	$("a#select3").click(function() {
		$('div#select2').hide();
		$('div#select3').show();	
		return false;
	});
	
	$("a#select4").click(function() {
		$('div#select3').hide();
		$('div#select2').show();	
		return false;
	});
	
	$("a#select5").click(function() {
		$('div#select2').hide();
		$('div#select1').show();	
		return false;
	});
	
	// Modal
	//Get the window height 
	$("a.topopup").not('.noTop').click(function() {
		loadPopup();
		$("html, body").animate({ scrollTop: 180 }, 'fast');
	return false;
	});
	
	// event for close the popup	
	$("div.close").click(function() {
		disablePopup();
	});
	
	$(this).keyup(function(event) {
		if (event.which == 27) {
			disablePopup();
		}  	
	});
	
	$("div#backgroundPopup").click(function() {
		disablePopup();
	});

	// Functions	
	var popupStatus = 0;
	
	function loadPopup() { 
		if(popupStatus == 0) {
			$("#toPopup").fadeIn(0500);
			$("#backgroundPopup").css("opacity", "0.7");
			$("#backgroundPopup").fadeIn(0001); 
			popupStatus = 1;
		}	
	}
		
	function disablePopup() {
		if(popupStatus == 1) {
			$("#toPopup").fadeOut("normal");  
			$("#backgroundPopup").fadeOut("normal");  
			popupStatus = 0;
		}
	}
	// Swap Modal Content
	$(function() {
		$('a#modal_9').click(function() {
			$('div.modal_10').hide();
			$('div.modal_11').hide();
			$('div.modal_9').show();
			return false;
		});
		$('a#modal_10').click(function() {
			$('div.modal_9').hide();
			$('div.modal_11').hide();
			$('div.modal_10').show();
			return false;
		});
		
		$('a#modal_11').click(function() {
			$('div.modal_9').hide();
			$('div.modal_10').hide();
			$('div.modal_11').show();
			return false;
		});
	});
});

