// Modal	
//Get the window height 
$(".modal").click(function() {
	var modal = $(this).attr('id');
	$('#modal'+modal)parsys section twc-box-column({'margin-top':-$('#modal'+modal).height() / 2});
	loadPopup(modal);
	return false;
});

// event for close the popup	
$(".modal-close").click(function() {
	disablePopup();
});

$(this).keyup(function(event) {
	if (event.which == 27) {
		disablePopup();
	}  	
});

$(".overlay").click(function() {
	disablePopup();
});

var popupStatus = 0;

function loadPopup(arg) { 
	if(popupStatus == 0) {
		$('#modal'+arg).fadeIn(0500);
		$(".overlay").fadeIn("normal"); 
		popupStatus = 1;
	}	
}
	
function disablePopup() {
	if(popupStatus == 1) {
		$(".toPopup").fadeOut("normal");  
		$(".overlay").fadeOut("normal");  
		popupStatus = 0;
	}
}
