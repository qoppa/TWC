// Operational Messages
	// if more than 1 marquee message, show left/right nav
	if($('.marquee-messages ul li').length > 1){
		$('.controls').show();
	}
		
    $('.marquee-messages ul li').first().addClass('selected').show();
		$('.marquee-messages ul li:gt(0)').addClass('opMessages');
    
    $('#marquee-right').click(function(){
    	if($('.selected').next().index() == -1){
    		$('.marquee-messages ul li').removeClass('selected').hide().first().addClass('selected').fadeIn();
    	} else {
    		$('.marquee-messages ul li').hide();
    		$('.selected').removeClass('selected').next().addClass('selected').fadeIn();
    	}
    });
    
    $('#marquee-left').click(function(){
    	if($('.selected').prev().index() == -1){
    		$('.marquee-messages ul li').removeClass('selected').hide().last().addClass('selected').fadeIn();
    	} else {
    		$('.marquee-messages ul li').hide();
    		$('.selected').removeClass('selected').prev().addClass('selected').fadeIn();
    	}
    });
