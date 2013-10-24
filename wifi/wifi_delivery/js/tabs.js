	$('.tabs li').click(function() {
		var selected_tab = $(this).find('a').attr('href');

		$('.tabs li').removeClass('active');
		$('.tab-content').hide();
		$(this).addClass('active');
		$(selected_tab).show();
		return false;
	});