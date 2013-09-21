/**
  * Initializes customize internet pages
  * @author McGowan
  */
Twc.PageInit.customize_internet = function() {
	log('PageInit.customize_internet()');

	Twc.Components.InputButton.init($('.blue-button'));

 	// init right-rail shopping cart
	Twc.Components.RowExpander.initRows($('.cart-module .collapsible'));

	// Init the expand/collapse sections
	Twc.Components.RowExpander.initRows($('.internet-customize-accordion .collapsible'));


	var $nextButton = $('.js-next-button');
	var $form = $('#js-main-form');
	var $radios = $form.find('header input[type=radio]'); // ensure 3 main header radios are only validated

	if ($nextButton.size() !== 1 || $form.size() !== 1 || $radios.size() === 0) {
		error('PageInit.customize_internet(): required elements not found');
	}

	$radios.change(function() {
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
		$radios.each(function() {
			if (this.checked) {
				enableNextButton(true);
				return false;
			}
		});
	}

	// run initial validation
	validatePage();

}