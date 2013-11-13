// Place page specific jQuery here

$('.refineList').click(function(){
	$('.form-filters').toggle();
	
	if($('.form-filters').is(':hidden')){
		$('.refineList a').find('span').removeClass('icon-angle-up').addClass('icon-angle-down');
	} else {
		$('.refineList a').find('span').removeClass('icon-angle-down').addClass('icon-angle-up');
	}
	
	return false;
});