$(function() {	
	
	// Set first topic active for mobile open
    $('.twc-LOBTopics ul li:first').addClass('active').addClass('expanded').next().slideDown();

    $('li.topic:has(ul li.topic)').children('h5').addClass('arrow');

    $('.twc-LOBTopics ul li h5').click(function() {
    	$('.twc-LOBTopics li.active').removeClass('active');
		$(this).parent('li').addClass('active');
		$(this).parent('li').toggleClass('expanded');
		$(this).next('ul').slideToggle();
		$(this).parent().siblings().removeClass('expanded').children().next().slideUp();
		
		if($(this).parent().hasClass('expanded')) {
    		
		} else {
    		$(this).siblings('ul').children('li.topic.expanded').children('ul').slideUp();
		}
		
        return false;
	});

});
