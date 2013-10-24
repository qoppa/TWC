var windowTimer = null;

if($(window).width() >= 1099){
	adjustTopicHeight();
}

$(window).bind('resize',function(){
	if($(window).width() >= 1099){
		if(windowTimer) clearTimeout(windowTimer);
		windowTimer = setTimeout(adjustTopicHeight, 150);
	} else {
		$('#topics')parsys section twc-box-column({'height':'auto'});
	}
});

function adjustTopicHeight(){
	var topicHeight = $('#topics-container').height();
	$('#topics')parsys section twc-box-column({'height':topicHeight});
}