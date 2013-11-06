// Place page specific jQuery here

$(function() {
	$('.tab-content').first().show();
	$('.tabs li:first').addClass('active');
    
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
} else {
	$('#stores_map_details').show();
}

	$(window).resize(function(){
		if ($(window).width() <= 1099) {
			// Legend SlideUp
			$('.locate-stores-filters legend').click(function() {
				$('.filter-section').slideToggle('slow', function() {
					// Animation complete.
				});
				$(this).toggleClass('rotate_chevron');
			});			
		} else if($(window).width() > 1099){
			$('#stores_map_map').show();
			$('#stores_map_details').show();
		}
		
		currState = $('.tabs ul li').closest('.active').text();
		
		if ($(window).width() >= 500 && $(window).width() <= 1099){
			$('#stores_map_details').hide();
			$('#stores_map_map').hide();
			
			if(currState == 'Map'){
				$('#stores_map_map').show();
			} else {
				$('#stores_map_details').show();
			}
		}
	});
});


var selected_tab = $(this).find('a').attr('href');
$(selected_tab).show();