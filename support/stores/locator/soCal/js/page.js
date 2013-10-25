// Place page specific jQuery here

$(function() {
	$('.tabs li:last').addClass('active');
    
    // Mute Legend Icon based on Filter Selections
    $("input").change(function() {
        var selected_checkbox = $(this).attr('id');
        if($(this).is(':checked')) {
            $('.legend_icons').find('.' + selected_checkbox).parent().removeClass('muted');
        }
        else {
           $('.legend_icons').find('.' + selected_checkbox).parent().addClass('muted');
        }
    });

if (document.documentElement.clientWidth <= 1099) {
	// Legend SlideUp
	$('.locate-stores-filters legend').click(function() {
		$('.filter-section').slideToggle('slow', function() {
			// Animation complete.
		});
		$(this).toggleClass('rotate_chevron');
	});
}
});


var selected_tab = $(this).find('a').attr('href');
		$(selected_tab).show();