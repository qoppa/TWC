// Place page specific jQuery here

$(function() {
	$('li.faq_listing span').hide();
	$('li.faq_listing > a').each(function () {
		$(this).click(function() {
			$(this).parent().addClass('openFAQ');
			$(this).next('span').slideToggle();
			return false;
		});
	});
});

