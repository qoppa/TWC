$(function (){
	$('.login').click(function(){
	$('.signin-popup').removeClass('openModule');
	$('.openModule').hide();

		if($('.signin-popup').is(':hidden')){
			$('.signin-popup').addClass('openModule').show();
			$('.login').removeClass('icon-angle-down').addClass('icon-angle-up');

		} else {
			$('.signin-popup').addClass('openModule').hide();
			$('.login').removeClass('icon-angle-up').addClass('icon-angle-down');
		}

	});

	$('.mobile-signIn').click(function(){
	$('.mobile-signin-popup').removeClass('openModule');
	$('.openModule').hide();

		if($('.mobile-signin-popup').is(':hidden')){
			$('.mobile-signin-popup').addClass('openModule').show();

		} else {
			$('.mobile-signin-popup').addClass('openModule').hide();
		}

	});

	$('.register').click(function(){
		$('.register-popup').removeClass('openModule');
		$('.openModule').hide();

		if($('.register-popup').is(':hidden')){
			$('.register-popup').addClass('openModule').show();
			$('.register-pop').removeClass('icon-angle-down').addClass('icon-angle-up');

		} else {
			$('.register-popup').hide();
			$('.register-pop').removeClass('icon-angle-up').addClass('icon-angle-down');
		}

	});

	$('.billpay').click(function(){
		$('.billpay-popup').removeClass('openModule');
		$('.openModule').hide();

		if($('.billpay-popup').is(':hidden')){
			$('.billpay-popup').addClass('openModule').show();
			$('.billpay-pop').removeClass('icon-angle-down').addClass('icon-angle-up');

		} else {
			$('.billpay-popup').hide();
			$('.billpay-pop').removeClass('icon-angle-up').addClass('icon-angle-down');
		}

	});

	$('.location').click(function(){
		$('.location-popup').removeClass('openModule');
		$('.openModule').hide();

		if($('.location-popup').is(':hidden')){
			$('.location-popup').addClass('openModule').show();
			$('.location').removeClass('icon-chevron-down').addClass('icon-chevron-up');

		} else {
			$('.location-popup').hide();
			$('.location').removeClass('icon-chevron-up').addClass('icon-chevron-down');
		}

	});

});