// Place page specific jQuery here

$(function() {
	$('.tabs li:first').addClass('active');
	$('.answers').hide();
	
	$('.tabs li').click(function() {
		$('.tabs ul li').removeClass('active');
		
		$(this).addClass('active');
		var currentTab = $(this).children('a').attr('href');
		$('div[id*="-access"]').hide();
		$(currentTab).show();
		
		// Swap out banner text
		var $banner = $('h2.banner');
		if($banner.text() == "Sign in to Access TWC WiFi"){
               $banner.text("Connect with a TWC Access Pass or try out TWC WiFi with a FREE trial!");
            } else {
               $banner.text("Sign in to Access TWC WiFi");
           }
		return false;
	});
	
	var isOpen = false;
	
	$("li.expand-box").each(function(index){
		if($(this).find('ul li').length > 1){
			$(this).removeClass('expand-box').addClass('expand-nested');
			$(this).find('ul li').addClass('expand-childLI');
			$(this).children('ul').slideUp();
		}
	});
	
	$('li.expand-box').click(function(){
		
		if($(this).find('.answers').first().is(':hidden')){
		  $(this).find('span').removeClass('icon-chevron-down').addClass('icon-chevron-up');
		} else {
		  $(this).find('span').removeClass('icon-chevron-up').addClass('icon-chevron-down');
		}

		$(this).find('.answers').first().css({'display':'block'});
		$(this).children('ul').slideToggle();
		
   		 return false;
	});
	
	$(document).on("click", ".expand-nested",function(){
		if(isOpen){
			$('.expand-nested').toggleClass('expanded');
			$(this).children('ul').slideUp();
			$(this).find('ul li').removeClass('expand-childLI');
			isOpen = false;
		} else {
			$('.expand-nested').toggleClass('expanded')
			$(this).children('ul').slideDown();
			$(this).find('ul li').addClass('expand-childLI');
			isOpen = true;
		}
		return false;
	});
	
	$(document).on("click", ".expand-childLI",function(){
		$(this).toggleClass('expanded');
		$(this).find('.answers').slideToggle();
		
		return false;
	});
		
	if($(window).width() < 500){
		$('#signIn').appendTo('#mobileSignIn');
	}
		
	$(window).resize(function(){
		if($(window).width() < 500){
			$('#signIn').appendTo('#mobileSignIn');
		} else if($(window).width() > 500){
			$('#signIn').insertAfter('.topContent');
		}
	});
});