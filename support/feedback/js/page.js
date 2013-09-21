/* ==========================================================================
   jQuery code for Feedback
   
   Author: Max Quattromani
   Version: 10.0 - Updated: 8/14/13
   ========================================================================== */
   
$(function() {
	
	$('#submit').click(function() {
		$('.feedback-container').hide();
		$('.feedback-response').fadeIn();
		
		return false;
	});
	
});