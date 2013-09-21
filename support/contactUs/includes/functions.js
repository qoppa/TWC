// Page Specific JS Functions
if (document.documentElement.clientWidth >= 1100) {
	$(function() {
		$('.promo-slides').slider({
			slideWidth: 310,
			minSlides: 2,
			maxSlides: 3,
			slideMargin: 25
		});
	});
}
if (document.documentElement.clientWidth <= 1099) {
	$(function() {
		$('.promo-slides').slider({
			slideWidth: 310,
			minSlides: 1,
			maxSlides: 2,
			slideMargin: 25
		});
	});
}
