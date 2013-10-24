// Page Specific JS Functions
$(function() {
 //Init three up carousel
	$('.three-up-carousel').css({'visibility':'visible'});
	//Removes the random CQ "new * section" element which throws off slide index
	$('.three-up-carousel .new').remove();
	
	$('.promo-slides').slider({
		slideWidth: 310,
		maxSlides: 3,
		slideMargin: 25
	});
});