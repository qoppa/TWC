// Place page specific jQuery here

$(function() {	

$('#clear-service').click(function() {
	$('ul#service').find(':checked').each(function() {
		$(this).removeAttr('checked');
	});	
	return false;
});

$('#clear-categories').click(function() {
	$('ul#categories').find(':checked').each(function() {
		$(this).removeAttr('checked');
	});	
	return false;
});

$('#clear-type').click(function() {
	$('ul#type').find(':checked').each(function() {
		$(this).removeAttr('checked');
	});	
	return false;
});

$('.filters-options button[type="reset"]').click(function() {
	$('.search-filters input:checkbox').prop('checked', true);
});

	// Legend SlideUp
	$('.filters-control b.label').click(function() {
		$('.filters-mobile-wrapper').slideToggle('slow', function() {
			// Animation complete.
		});
		$(this).toggleClass('rotate_chevron');
	});
	
});