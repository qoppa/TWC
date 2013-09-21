// Page Specific JS Functions

//Init 3 up carousel
$('.3-up-carousel').show();
//Removes the random CQ "new * section" element which throws off slide index
$('.3-up-carousel .new').remove();

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
