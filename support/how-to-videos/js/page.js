// Place page specific jQuery here

$('.page-header .horizontal ul li').click(function() {
   $(this).children('ul').toggleClass('is-active') 
});

$('#submit').click(function(){
	$('ul.vertical').toggle();
	return false;
});

$('.closeSearch').click(function(){
	$('ul.vertical').hide();
	return false;
});

$('.clearCheckboxes').click(function(){
	$('input[type="checkbox"]').removeAttr('checked');
	return false;
});
