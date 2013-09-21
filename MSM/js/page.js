// Place page specific jQuery here

$(function() {
	$('.faq_listing span').hide();
	$(".faq_listing").click(function() {
		$(this).addClass('openFAQ');
		$(this).children('span').slideToggle();
		return false;
	});
});