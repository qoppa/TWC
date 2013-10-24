$(function(){
	$('.icon-camera').click(function(){
		if($(this).hasClass('hide-all')){
			$(this).removeClass('hide-all');
			$('figure').show();
			htmlText = 'Hide';
		} else {
			$(this).addClass('hide-all');
			$('figure').hide();
			htmlText = 'Show';
		}
		
		$(this).html('<a analyticsname="test" href="#"><span>'+htmlText+' All</span></a>');
		return false;
	});
});