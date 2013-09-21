// Place page specific jQuery here

$('.page-header .horizontal ul li').click(function() {
   $(this).children('ul').toggleClass('is-active') 
});