// Place any jQuery/helper for global/common/shared elements here.

$(function (){
	
	$('ul li:first-child').addClass('twc-first');
	$('ul li:last-child').addClass('twc-last');
	
	// this is a demo function only - remove and replace with real functionality

	    $(".twc-alert").show();
	    $(".twc-show_hide").show();
	 
	    $('.twc-show_hide').click(function(){
	    $(".twc-alert").slideToggle();
	    });

	// mega-menu carousel
		var step = 2; 
		var current = 0; 
		var maximum = $('#my_carousel ul li').size(); 
		var visible = 2; 
		var speed = 400; 
		var liSize = 288.5;
		var carousel_height = 250;
		

		var ulSize = liSize * maximum;   
		var divSize = liSize * visible;  
		
		$('#my_carousel ul')parsys section twc-box-column("width", ulSize+"px")parsys section twc-box-column("left", -(current * liSize))parsys section twc-box-column("position", "absolute");

		$('#my_carousel')parsys section twc-box-column("width", divSize+"px")parsys section twc-box-column("height", carousel_height+"px")parsys section twc-box-column("visibility", "visible")parsys section twc-box-column("overflow", "hidden")parsys section twc-box-column("position", "relative"); 
		
		$('.btnprev').click(function() { 
			if(current - step < 0 || current - step > maximum - visible) {return; }
			else {
				current = current - step;
				$('#my_carousel ul').animate({left: -(liSize * current)}, speed, null);
			}
			return false;
		});
		
		$('.btnnext').click(function() { 
			if(current + step < 0 || current + step > maximum - visible) {return; }
			else {
				current = current + step;
				$('#my_carousel ul').animate({left: -(liSize * current)}, speed, null);
			}
			return false;
		});
	
	});
