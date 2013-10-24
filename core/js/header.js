$('li.twc-drop-nav').mouseenter(function() {
	$(this).addClass('persist');
});

$('a.twc-change').click(function () {
	$('li.twc-drop-nav').toggleClass('persist');
});