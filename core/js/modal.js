// Get the first and last ID's to remove prev/next buttons

//Get the window height z
$(".modal").click(function() {
	var modal = $(this).attr('id');

	loadPopup(modal);
	return false;
});

$('.modal-next').click(function(){
	var modal = $(this).attr('data-next');
	var currModal = modal-1;
	
	loadPopup(modal,currModal);
	return false;
});

$('.modal-prev').click(function(){
	var modal = $(this).attr('data-prev');
	var currModal = modal-1+2;
	
	loadPopup(modal,currModal);
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

function loadPopup(modal,currModal) { 
	$('#modal'+currModal).css({'display':'none'});
	$('#modal'+modal).css({'margin-top':-$('#modal'+modal).height() / 2,'display':'block'});
	$('.modal-next').attr('data-next',modal-1+2);
	$('.modal-prev').attr('data-prev',modal-1);
	$('#modal'+modal).fadeIn(0500);
	$(".overlay").fadeIn("normal");
}
	
function disablePopup() {
	$(".modal-container").fadeOut("normal");  
	$(".overlay").fadeOut("normal");  
}