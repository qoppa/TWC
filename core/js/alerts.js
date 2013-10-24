$('.twc-alert .twc-alert-text:first').prepend('<a class="twc-icon twc-alert-close twc-show_hide" href="" style=""></a>');

$('.twc-show_hide').click(function(e) {
	$(this).parent().slideToggle();
	e.preventDefault();
});