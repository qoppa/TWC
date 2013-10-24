/* ==========================================================================
   jQuery code for Chat Component
   
   Author: Max Quattromani
   Version: 1.5.5 - Updated: 10/15/13
   ========================================================================== */
   
$(function() {
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
		$("#hidewindow").show();
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
			window.self.close();
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
		$.cookie('chatEnabled', 'true');
	});
	
	$('.chat').click(function(){
		popitup('/TWC/core/includes/popUp');
	});
});

function popitup(url) {
	newwindow=window.open(url,'name','height=700,width=350,scrollbars=yes,resizable=yes');
	if (window.focus) {newwindow.focus()}
	return false;
}

function submitSurvey(){
	window.self.close();	
}

function cancelSurvey(){
	window.self.close();	
}