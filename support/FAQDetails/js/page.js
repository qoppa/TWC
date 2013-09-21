// Place page specific jQuery here

$(function() {	
	
	// Uncheck radio buttons
	$("input:radio").attr("checked", false);



	$("#faq-survey-feedback").click(function() {
	
	   	if ($('#yes').is(':checked')) {
	   			$('.faq-survey:first').hide();
				$('div.faq-survey-yes-response').show();
			} else {
				$('div.faq-survey-no').show();
				$(this).addClass('twc-left');
				$('button#faq-survey-feedback:first').hide();
				$('button#faq-survey-feedback-response').show();
			}
			return false;
	});
	
	$('#faq-survey-feedback-response').click(function () {
		
		/* Honeypot validation */
		if($('#fillit input').val() == '') {
    		$('.faq-survey:first').hide();
			$('.faq-survey-no').hide();
			$('.faq-survey-no-response').show();
		} else {
		    alert('you are the droid we\'ve been looking for');
		}
		return false;
	});
	
});