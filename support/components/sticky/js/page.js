$(function(){
	var stickyTop = $('.sticky').offset().top;
	
	var stickyNav = function(){  
		var scrollTop = $(window).scrollTop();  

		if (scrollTop > stickyTop){
			$('.sticky').addClass('fixed');
			$('.spacer').css({'height':$('.sticky').height()+'px'});  
		} else {  
			$('.sticky').removeClass('fixed'); 
			$('.spacer').css({'height':'0px'});  
		}  
	};  
	
	stickyNav();  
  
	$(window).scroll(function(){  
    stickyNav();  
	});  
});