// Page Specific JS Functions
$(function(){$(".three-up-carousel").css({visibility:"visible"});$(".three-up-carousel .new").remove();document.documentElement.clientWidth>=1100&&$(function(){$(".promo-slides").slider({slideWidth:310,minSlides:2,maxSlides:3,slideMargin:25})});document.documentElement.clientWidth<=1099&&document.documentElement.clientWidth>=706&&$(function(){$(".promo-slides").slider({slideWidth:310,minSlides:1,maxSlides:2,slideMargin:25})});document.documentElement.clientWidth<=706&&$(function(){$(".promo-slides").slider({slideWidth:310,minSlides:1,maxSlides:1,slideMargin:0})})});