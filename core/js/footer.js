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