// Place any jQuery/helper for global/common/shared elements here.

$(function() {

	// Geoloc prompt persist
/*
	$(window).load(function() {
	    $('li.twc-drop-nav').addClass('persist');
	});
*/	
	$('li.twc-drop-nav').mouseenter(function() {
		$(this).addClass('persist');
    });
   
    $('a.twc-change').click(function () {
	    $('li.twc-drop-nav').toggleClass('persist');
    });

	// Add classes to pirst and last of each list
	$('li:first-child').addClass('twc-first');
	$('li:last-child').addClass('twc-last');
	// this is a demo function only - remove and replace with real functionality
	$(".twc-alert").show();
	$(".twc-show_hide").show();
	$('.twc-show_hide').click(function(e) {
		$(".twc-alert").slideToggle();
		e.preventDefault();
	});
	
	// mega-menu carousel
	var step = 1;
	var current = 0;
	var visibleSlides = 2;
	var numSlides = $(".twc-submenu #my_carousel > ul.carousel-apps > li").size();
	var liSize = 274.5;
	var carousel_height = 236;
	var ulSize = liSize * numSlides;
	var divSize = liSize * visibleSlides;
	var speed = 400;
	$('#my_carousel ul').css("width", ulSize + "px").css("left", -(current * liSize)).css("position", "absolute");
	$('#my_carousel').css("width", divSize + "px").css("height", carousel_height + "px").css("visibility", "visible").css("overflow", "hidden").css("position", "relative").css("left", "-19px");
	$('.btnprev').click(function() {
		if (current - step < 0 || current - step > numSlides - visibleSlides) {
			$('#my_carousel ul').animate({
				left: -(liSize * (numSlides - 2))
			}, speed, null);
			current = numSlides - visibleSlides;
			return;
		} else {
			current = current - step;
			$('#my_carousel ul').animate({
				left: -(liSize * current)
			}, speed, null);
		}
	});
	$('.btnnext').click(function() {
		//rewind to first
		if (current + step < 0 || current + step > numSlides - visibleSlides) {
			current = current + step;
			$('#my_carousel ul').animate({
				left: 0
			}, speed, null);
			current = 0;
			return;
		} else {
			current = current + step;
			$('#my_carousel ul').animate({
				left: -(liSize * current)
			}, speed, null);
		}
		return false;
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

	// Select Boxes
	enableSelectBoxes();

	function enableSelectBoxes() {
		$('div.selectBox').each(function() {
			$(this).children('span.selected').html($(this).children('div.selectOptions').children('span.selectOption:first').html());
			$(this).attr('value', $(this).children('div.selectOptions').children('span.selectOption:first').attr('value'));
			$(this).children('span.selected,span.selectArrow').click(function() {
				if ($(this).parent().children('div.selectOptions').css('display') == 'none') {
					$(this).parent().children('div.selectOptions').css('display', 'block');
				} else {
					$(this).parent().children('div.selectOptions').css('display', 'none');
				}
			});
			$(this).find('span.selectOption').click(function() {
				$(this).parent().css('display', 'none');
				$(this).closest('div.selectBox').attr('value', $(this).attr('value'));
				$(this).parent().siblings('span.selected').html($(this).html());
			});
		});
	}
	
	// footer menu toggle
	$('div[class*="twc-col6_6-c"]').each(function() {
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

$(document).ready(function () {
	// Dialog popup box modal
	var id = '#dialog';

    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Set heigth and width to mask to fill up the whole screen
    $('#mask').css({ 'width': maskWidth, 'height': maskHeight });

    //transition effect
    $('#mask').fadeIn(500);
    $('#mask').fadeTo("slow", 0.8);

    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();

    //Set the popup window to center
    $(id).css('top', winH / 2 - $(id).height() / 2);
    $(id).css('left', winW / 2 - $(id).width() / 2);

    //transition effect
    $(id).delay(1000).fadeIn(1000);

    //if close button is clicked
    $('.window .popup-close').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();

        $('#mask').hide();
        $('.window').hide();
    });

    //if mask is clicked
    $('#mask').click(function () {
        $(this).hide();
        $('.window').hide();
    });
});