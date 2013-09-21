// Place page specific jQuery here

$(function() {	
		
		$('li.heading h5').click(function() {
			$(this).toggleClass('expanded');
			$(this).parent().children('ul').slideToggle();
		});
	
});