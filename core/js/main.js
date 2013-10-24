/* ==========================================================================
   JS Code for all Global Elements and Site-Wide Selectors 
   
   Author: Max Quattromani
   Version: 1.2.0 - Updated: 10/3/13
   ========================================================================== */

// Place any jQuery/helper for global/common/shared elements here.

$(function() {
	//js height()for side nav
	var windowTimer = null;
	var currentYear = (new Date).getFullYear();

	// Add classes to first and last of each list
	$('li:first-child').addClass('twc-first');
	$('li:last-child').addClass('twc-last');
					
	// set #custLoc checkbox :checked
	$('input#custLoc').data('checked', true);
	
	// Get current year
	$('#year').text((new Date).getFullYear());

// Placeholder Support
	$('input[placeholder]').placeholder();
});