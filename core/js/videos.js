// Allow only one video to play at a time
$('video').bind('play', function() {
	activated = this;
	$('video').each(function() {
			if(this != activated) this.pause();
	});
});