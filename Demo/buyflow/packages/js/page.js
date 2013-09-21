$(function() {
	// Tabs
	$('.tabs li:first').addClass('active');
	$('.tabs li').click(function() {
		$('.tabs ul li').removeClass('active');
		$(this).addClass('active');
		var currentTab = $(this).children('a').attr('href');
		$('div[id*="tab_"]').hide();
		$(currentTab).show();
		return false;
	});
	
	$('.tabs li:first').addClass('active');
	$('.tabs li').click(function() {
		$('.tabs ul li').removeClass('active');
		$(this).addClass('active');
		var currentTab = $(this).children('a').attr('href');
		$('div[id*="modal_tab_"]').hide();
		$(currentTab).show();
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
			$("#backgroundPopup").fadeIn("normal"); 
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
		$('a#modal_1').click(function() {
			$('div.modal_1').hide();
			$('div.modal_3').hide();
			$('div.modal_4').hide();
			$('div.modal_5').hide();
			$('div.modal_6').hide();
			$('div.modal_2').show();
			return false;
		});
		
		$('a#modal_2').click(function() {
			$('div.modal_2').hide();
			$('div.modal_3').hide();
			$('div.modal_4').hide();
			$('div.modal_5').hide();
			$('div.modal_6').hide();
			$('div.modal_1').show();
			return false;
		});
		
		$('a#modal_3').click(function() {
			$('div.modal_1').hide();
			$('div.modal_2').hide();
			$('div.modal_4').hide();
			$('div.modal_5').hide();
			$('div.modal_6').hide();
			$('div.modal_3').show();
			return false;
		});
		
		$('a#modal_4').click(function() {
			$('div.modal_1').hide();
			$('div.modal_2').hide();
			$('div.modal_3').hide();
			$('div.modal_5').hide();
			$('div.modal_6').hide();
			$('div.modal_4').show();
			return false;
		});
		
		$('a#modal_5').click(function() {
			$('div.modal_1').hide();
			$('div.modal_2').hide();
			$('div.modal_3').hide();
			$('div.modal_4').hide();
			$('div.modal_6').hide();
			$('div.modal_5').show();
			return false;
		});
		
		$('a#modal_6').click(function() {
			$('div.modal_1').hide();
			$('div.modal_2').hide();
			$('div.modal_3').hide();
			$('div.modal_4').hide();
			$('div.modal_5').hide();
			$('div.modal_6').show();
			return false;
		});
	});
});

