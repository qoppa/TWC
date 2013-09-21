// Place page specific jQuery here

$(function() {
	$('.tabs li:last').addClass('active');
	$('.tabs li').click(function() {
		$('.tabs ul li').removeClass('active');
		$(this).addClass('active');
		var currentTab = $(this).children('a').attr('href');
		$('div[id*="stores_map_"]').hide();
		$(currentTab).show();
		return false;
	});

    // Clear Exchange Equipment checkbox if checked on pageload
    $('#exchange-equipment').removeAttr('checked');
    
    // Reveal Pickup Exchange when 'Exchange Equipment' is checked
    $('#icon-exchange').click(function() {
        if( $(this).is(':checked')) {
            $('.pickup-exchange').slideDown();
        } else {
            $('.pickup-exchange').slideUp();
        }
    }); 
    
    
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