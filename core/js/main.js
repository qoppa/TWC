/* ==========================================================================
   JS Code for all Global Elements and Site-Wide Selectors 
   
   Author: Max Quattromani
   Version: 1.0.4 - Updated: 8/30/13
   ========================================================================== */

// Place any jQuery/helper for global/common/shared elements here.

$(function() {

	// Geoloc prompt persist
/*
	$(window).load(function() {
	    $('li.twc-drop-nav').addClass('persist');
	});
*/	
	
	//js height()for side nav
	var windowTimer = null;
	$(window).bind('resize',function(){
		if($(window).width() >= 1099){
			if(windowTimer) clearTimeout(windowTimer);
			windowTimer = setTimeout(adjustTopicHeight, 150);
		} else {
			$('#topics').css({'height':'auto'});
		}
	});

	$('li.twc-drop-nav').mouseenter(function() {
		$(this).addClass('persist');
    });
   
    $('a.twc-change').click(function () {
	    $('li.twc-drop-nav').toggleClass('persist');
    });

	// Add classes to pirst and last of each list
	$('li:first-child').addClass('twc-first');
	$('li:last-child').addClass('twc-last');

	$('.twc-alert .twc-alert-text:first').prepend('<a class="twc-icon twc-alert-close twc-show_hide" href="" style=""></a>');
	
	$('.twc-show_hide').click(function(e) {
		$(this).parent().slideToggle();
		e.preventDefault();
	});
   
    $.fn.promoSlider = function(opts) {
        $(this).data('initialized', true);
        var $that = this;
        
        var slider =  $("ul.carousel-apps", this);
        var speed = 400;
        var num_items = $("ul.carousel-apps > li", this).size();
        var item_width = 274.5;
        var left_offset = -9.5;
        var left_value = left_offset - item_width;
        
        slider.css('width', (item_width * num_items));
        slider.css('left', left_offset);
        
        if (num_items > 2) {
            $('.btnnext', this).show();
            $('.btnprev', this).show();
                        
            $("ul.carousel-apps li:first", this).before($("ul.carousel-apps li:last", this));
            slider.css('left', left_value);
            
            $('.btnprev', this).click(function() {
                if (! slider.is(':animated')) {
                    var left_indent = parseInt(slider.css('left')) + item_width;
                
                    slider.animate({'left' : left_indent}, speed, function() {
                        $("ul.carousel-apps li:first", $that).before($("ul.carousel-apps li:last", $that));
                        slider.css({'left' : left_value});
                    });
                }
                return false;
            });
            
            $('.btnnext', this).click(function() {
                if (! slider.is(':animated')) {
                    var left_indent = parseInt(slider.css('left')) - item_width;
                
                    slider.animate({'left' : left_indent}, speed, function() {
                        $("ul.carousel-apps li:last", $that).after($("ul.carousel-apps li:first", $that));
                        slider.css({'left' : left_value});
                    });
                }
                return false;
            });
        }            
    }

    $('.carousel.groupr').each(function() {
        if($(this).data('initialized') !== true) {
            $(this).promoSlider();
        }
    });
				
	// set #custLoc checkbox :checked
	$('input#custLoc').data('checked', true);
	
	// deselect mobile nav menu dropdowns when other is selected 
	$('input[name=navradio]').click(function(e) {  
	    var radChecked = $(this).data('checked') || false;
	    $('input[name=navradio]').data('checked', false);
	    if (radChecked) {
	        this.checked = false;
	        $(this).data('checked', false);
	    } else {
	       this.checked = true;
	       $(this).data('checked', true);
	    }
	});

	// footer menu toggle
	$('div[class*="twc-col3_333333-c"]').each(function() {
		var $dropdown = $(this);
		$('h3.label', $dropdown).click(function() {
			var label = $(this);
			$(label).toggleClass('current');
			$('h3.label').not(label).removeClass('current');
			$menu = $('ul', $dropdown);
			$('ul').not($menu).removeClass('mobile');
			$menu.toggleClass('mobile');
		});
	});
	
	// Get current year
	var currentYear = (new Date).getFullYear();
	    $('#year').text((new Date).getFullYear());
    });

    // Close the dropdown when the user clicks anywhere else on the screen
    $(document).click(function(e) {
    	if (e.target.className != "selectArrow") {
    		$('div.selectOptions').css('display', 'none');
    	}
    });
    
    // Email Share Module
    $('button#email').click(function(){
        $('.email-module').toggle();
    });
    
    $('.email-module .close').click(function() {
    	$('.email-module').toggle();
    });

// Placeholder Support
$(function() {
   jQuery.support.placeholder = false;
   test = document.createElement('input');
   if('placeholder' in test) jQuery.support.placeholder = true;
});
$(function() {
   if(!$.support.placeholder) { 
      var active = document.activeElement;
      $(':text').focus(function () {
         if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
            $(this).val('').removeClass('hasPlaceholder');
         }
      }).blur(function () {
         if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
            $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
         }
      });
      $(':text').blur();
      $(active).focus();
      $('form:eq(0)').submit(function () {
         $(':text.hasPlaceholder').val('');
      });
   }

// Operational Messages
		// if more than 1 marquee message, show left/right nav
		if($('.marquee-messages ul li').length > 1){
			$('.controls').show();
		}
		
    $('.marquee-messages ul li').first().addClass('selected').show();
    
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
   
});
// End Placeholder support



// Modal
	//Get the window height 
	$(".topopup").click(function() {
		loadPopup();
	return false;
	});
	
	// event for close the popup	
	$("div.close").click(function() {
		disablePopup();
	});
	
	$(this).keyup(function(event) {
		if (event.which == 27) {
			disablePopup();
		}  	
	});
	
	$("div#backgroundPopup").click(function() {
		disablePopup();
	});

	// Functions	
	var popupStatus = 0;
	
	function loadPopup() { 
		if(popupStatus == 0) {
			$("#toPopup").fadeIn(0500);
			$("#backgroundPopup").fadeIn("normal"); 
			popupStatus = 1;
		}	
	}
		
	function disablePopup() {
		if(popupStatus == 1) {
			$("#toPopup").fadeOut("normal");  
			$("#backgroundPopup").fadeOut("normal");  
			popupStatus = 0;
		}
	}
	
	function adjustTopicHeight(){
		var topicHeight = $('#topics-container').height();
		$('#topics').css({'height':topicHeight});
	}