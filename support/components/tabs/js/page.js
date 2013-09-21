
// Tabs

/*
$(function() {
	$('.tabs li:last').addClass('active');
	$('.tabs li').click(function() {
		$('.tabs ul li').removeClass('active');
		$(this).addClass('active');
		var currentTab = $(this).children('a').attr('href');
		$('div[id*='tab']').hide();
		$(currentTab).show();
		return false;
	});
});
*/


$(function() {	
	$('.tabs li').click(function() {
		var selected_tab = $(this).find('a').attr('href');
		
		$('.tabs li').removeClass('active');
		$('.tab-content').hide();
		$(this).addClass('active');
		$(selected_tab).show();
		return false;
	});
});
