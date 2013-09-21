/**
  * Initializes Your Services page
  * @author McGowan
  *
  */
Twc.PageInit.your_services= function() {
	log('PageInit.your_services()');
	Twc.Components.InputButton.init($('.blue-button'));
	Twc.Components.ViewMore.initObjects($('.details'));

	var $nextButton = $('.js-next-button');
	var $form = $('#js-main-form');
	var $checkboxes = $form.find('input[type=checkbox]');

	if ($form.size() !== 1 || $checkboxes.size() === 0) {
		error('PageInit.your_services(): required elements not found');
	}

	// set form to <a> value
	$form.attr('action', $nextButton.attr('href'));

	$checkboxes.change(function() {
		validatePage();
	});

	$nextButton.click(function() {
		if (!$nextButton.hasClass('disabled')) {
			$form[0].submit();
		}
		return false;
	})

	function enableNextButton(enabled) {
		$nextButton.toggleClass('disabled', !enabled);
	}

	// disable nextButton unless a checkbox is checked
	function validatePage() {
		enableNextButton(false);
		$checkboxes.each(function() {
			if (this.checked) {
				enableNextButton(true);
				return false;
			}
		});
	}

	// run initial validation
	validatePage();
}
