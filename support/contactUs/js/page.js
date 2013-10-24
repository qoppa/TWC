/* ==========================================================================
   jQuery code for Contact Us
   
   Author: Max Quattromani
   Version: 1.5.4 - Updated: 9/3/13
   ========================================================================== */
   
$(function() {
	$('dt:last').addClass('twc-last');
	// Scroll Section to top when selected/clicked
	$('h6').click(function() {
		$('html, body').animate({
			scrollTop: $(this).offset().top
		}, 300);
	});
	// Step 1
	// Show section li content, hide other sections, and reveal back to link
	$('li.heading h5').click(function() {
		$(this).toggleClass('expanded');
		$('.backTo').toggle();
		$('.twc-step1 .stepButton').toggleClass('inline-block');
		$(this).parent().children('ul').toggle();
		$(this).parent().siblings().toggle();
		// Get value of selected section and amend button
		var selected = $(this).text();
		$('.twc-step1 .stepButton').text(selected + ' FAQs');
	});
	// Hide back to link, hide li content and return all sections
	$('.backTo').click(function() {
		$('h5').removeClass('expanded');
		$('.backTo').hide();
		$('.twc-step1 .stepButton').toggle();
		$('.twc-step1 .stepButton').toggleClass('inline-block');
		$('.twc-step3 .step-container').hide();
		$('ul.content').hide();
		$('li.heading').show();
		$('ul.content li').addClass('active').siblings().removeClass('active');
		$('h6.active').removeClass('step-completed');
		return false;
	});
	// highlight selected sub-section and place checkbox next to step 1
	$('ul.content li').click(function() {
		$(this).addClass('active').siblings().removeClass('active');
		$('div.twc-backgroundGradient-4').eq(0).addClass('active');
		$('h6').eq(0).addClass('step-completed');
		$('h6').eq(1).addClass('active');
		$('span.end-arrow').eq(1).addClass('active');
		$('.twc-step2 dl').show().find('.twc-step1 .stepButton').show();
		$('.twc-step2 .stepButton').toggleClass('inline-block');		
		// Mobile
		$('.twc-step2 .step-container:hidden').addClass('active').toggle();
		$('html, body').animate({
			scrollTop: $('.twc-step2 h6').offset().top
		}, 300);
		return false;
	});
	// Step 2
	// Show sub-section answer content, and reveal change questions link
	$('dt').click(function() {
		$('h6').eq(1).addClass('step-completed'); // good
		$('a').parent().toggleClass('displayQuestion'); // good
		$('.changeQuestions').toggle(); // good
		$(this).siblings('dt').toggle();
		$(this).next('dd').toggle();inli
		$('.twc-step2 .stepButton').hide();
		$('.twc-step3 .step-container').show();
		$('div.twc-backgroundGradient-4').eq(1).addClass('active');
		$('h6').eq(2).addClass('active')
		// Mobile
		$('.questionsContinue').toggle().addClass('active');
		return false;
	});
	// Hide chage questions link, hide answer, and return all questions
	$('.changeQuestions').click(function() {
		$('.changeQuestions').hide();
		$('.questionsContinue').hide();
		$('dd').hide();
		$('dt').show();
		$('dt').removeClass('displayQuestion');
		$('.twc-step3 .step-container').hide();
		return false;
	});
	// Open Step 3 
	$('#openStep3,.questionsContinue').click(function() {
		$('.twc-step3 .step-container').show();
		// Mobile
		$('.twc-step1 .step-container.active').toggle();
		$('.twc-step2 .step-container.active').toggle();
		$('html, body').animate({
			scrollTop: $('.twc-step3 h6').offset().top
		}, 300);
		return false;
	});
	// Step 3
	// Show section li content, hide other sections, or reveal chat ui
	$('.callMeMaybe h5').click(function() {
		$('h6').eq(2).addClass('step-completed');
		if ($(this).parent().attr("id") == 'callUs') {
			$(this).toggleClass('expanded');
			$(this).siblings('.content').slideToggle();
			$('.helpfulLinks').toggle();
		} else {
			$('.chatUI').show();
		}
	});
	// Mobile
	$('h6.active').click(function() {
		$('.twc-step1 .step-container:hidden').addClass('active').toggle();
	});
	// Chat UI
	// Uncheck radio buttons
	$("input:radio").attr("checked", false);
	// Listen for which radio button is selected, then do a thing
	$('#ccPreCheck form#newExisting input[type=radio]').on('change', function() {
		// Show Start Chat button
		$('#ccStartChatButton').show();
		// Hide language link & show transcipt link
		$('.chatUI-.bottom .language').hide();
		$('.chatUI-.bottom .show_transcript').show();
		if ($('#new').is(':checked')) {
			$('#ccPreCheck').hide();
			$('#ccPreSurvey').show();
		} else {
			$('#ccPreCheck').hide();
			$('#ccPreSurvey').show();
			$('.telephoneInput').show();
			$('.chatUI-.footnote').show();
		}
	});
	$('#ccStartChatButton').click(function() {
		$('#ccPreSurvey').hide();
		$('.chatUI-.bottom').hide();
		$('.chatUI-.footnote').hide();
		$("#ChatDisplay").show();
		$('#ccContainer').show();
		$('.chatUI-.conversation').show();
		$.cookie('chatEnabled', 'true');
	});
	
	$('#ccRemoteControl button').click(function() {
		$('#ccRCEnable').toggle();
		$('#ccRCDisable').toggle();
	});
	
	$('#transcript').click(function() {
		$('.chatUI-.bottom').addClass('active');
		$('.chatUI-.transcript').show();
		$('.chatUI-.footnote').show();
		return false;
	});
	
	$('#hide_transcript').click(function() {
		$('.chatUI-.transcript').hide();
		$('.chatUI-.bottom').removeClass('active');
		return false;
	});
	
		$('#hidewindow').click(function() {
			if($.cookie('chatEnabled')) {
				$('.darkOverlay').show();
				$('#ccCloseConfirm').show();
				$.removeCookie('chatEnabled');
			} else {
				$('.chatUI').hide();
			}
		});
	
	$('#ccExitChat').click(function() {
		$('#ccCloseConfirm').hide();
		$('#ccChatOutput').hide();
		$('.darkOverlay').hide();
		$('.chatUI-.conversation').hide();
		$('.chatUI-.surveyEnd').show();
		$('#ccPostSurvey').show();
	});
	
	$('#ccCancelExit').click(function() {
		$('#ccCloseConfirm').hide();
		$('.darkOverlay').hide();
		$.cookie('chatEnabled', 'true')
	});
});