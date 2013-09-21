$(function() {
	$('#chatgirl').click(function() {
		$('#confirmCust').toggle();
	});
	
	$("#confirmCust").click(function() {
        if ($("#chatwindow").css("display") == "none") {
            var pos = $("#chatinvite").offset();
            $("#chatwindow").css({
                "left": (pos.left - 40) + "px",
                "top": (pos.top + 65) + "px"
            });
            $("#chatwindow").fadeIn('fast');
            if (!window.ChatInitialized === true) {
                ClearPreSurvey();
                ClearChatForm();
                window.ChatInitialized = true;
            }
        }
    });
});


// Place any jQuery/helper plugins in here.
$(document).ready(function() {
	enableSelectBoxes();
});

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

// Close the dropdown when the user clicks anywhere else on the screen
$(document).click(function(e) {
	if (e.target.className != "selectArrow") {
		$('div.selectOptions').css('display', 'none');
	}
});