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
	
	var contentLen = $('.25-25-25-25').length;

	if(contentLen < 3){
		$('.viewMore').hide();	
	}
	
	$('.25-25-25-25').each(function(i){
		if(i > 2){
			$(this).css({'display':'none'});	
		}
	});
	
	$('.viewMore').click(function(){	
		$('.25-25-25-25').each(function(i){
			if(i > 2){
				$(this).slideToggle(function(){	
					if($(this).is(':hidden')){
						$('.viewMore').first().text('View More');
						$('.viewMore span').removeClass('expanded');
					} else {
						$('.viewMore').first().text('View Less');
						$('.viewMore span').addClass('expanded');
					}
				});
			}
		});
		return false;
	});
});