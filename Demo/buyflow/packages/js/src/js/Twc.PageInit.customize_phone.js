/**
  * Initializes customize phone pages
  * @author McGowan
  */
Twc.PageInit.customize_phone = function() {
	log('PageInit.customize_phone()');


	Twc.Components.InputButton.init($('.blue-button'));

 	// init right-rail shopping cart
	Twc.Components.RowExpander.initRows($('.cart-module .collapsible'));

	// Init the expand/collapse sections top-level
	var $sections = $('.phone-customize-accordion .collapsible:not(.inner-collapse)');
	var $sectionHeaders = $sections.find('> header');
	var $innerCollapsible = $sections.find('.collapsible');
	var $nextStepButtons = $sections.find('.continue a');
	var $finalStepButton = $('.button-nav .blue-button');
	var totalSteps = $sections.size();

	function enableFinalStepButton(enabled) {
		if (enabled) {
			$finalStepButton.removeClass('disabled');
		} else {
			$finalStepButton.addClass('disabled');			
		}
	}
	enableFinalStepButton(false);

	var sectionFormData = [
		{ // 0

		},
		{ // 1
			$newTransferNumber : $('.select-or-transfer-option input[type=radio]'),
			$errorLabels : $sections.eq(1).find('.transfer-number fieldset'),
			$errorDiv : $sections.eq(1).find('.transfer-number .error-module'),
			$errorList : $sections.eq(1).find('.transfer-number .error-module ul'),

			$currentProvider : $('#current-provider'),
			$currentProviderState : $('#current-provider-state'),
			$phoneNumber : $('#phone-number'),
			$accountNumber : $('#account-number'),
			$accountName : $('#account-name'),
			$securityCode : $('#security-code'),
			$address1 : $('#address'),
			$aptType : $('#apt-type'),
			$city : $('#city'),
			$billingState : $('#current-provider-state-billing'),
			$billingZip : $('#zip-code')
		},
		{ // 2

		},
		{ // 3
			$errorLabels : $sections.eq(3).find('.checkbox fieldset, .js-full-name1, .birthdate, .js-full-name2'),
			$errorDiv : $sections.eq(3).find('.error-module'),
			$errorList : $sections.eq(3).find('.error-module ul'),
			$consentCheckbox : $('#choose-TWC'),
			$fullName1 : $('#full-name1'),
			$fullName2 : $('#full-name2'),
			$birthDateFieldset : $sections.eq(3).find('.birthdate'),
			$birthMonth : $('#birth-month'),
			$birthDay : $('#birth-day'),
			$birthYear : $('#birth-year')
		}
	];

	$nextStepButtons.each(function(i) {
		var $me = $(this);
		$me.click(function() {
			nextSection(i);
			return false;
		})
	});

	$finalStepButton.click(function() {
		if (!$finalStepButton.hasClass('disabled')) {
			nextSection(totalSteps-1);
		}
		return false;
	})

	$sectionHeaders.each(function(i) {
		var $me = $(this);
		var $section = $sections.eq(i);

		// enable the final button if the last step is open
		if (i === totalSteps-1 && $section.is('.active')) {
			enableFinalStepButton(true);
		}

		$me.click(function(e) {
			if ($section.is('.complete')) {
				$sections.slice(i).removeClass('complete').addClass('disabled');
				$section.removeClass('disabled complete');
				if (i !== totalSteps-1) {
					enableFinalStepButton(false);
				}
			}
		});		
	});

	function showFieldError(formData, $field, errorMessageOverride) {
		var $fieldset = $field.parent('fieldset').addClass('error');
		var errorMsg = errorMessageOverride || $fieldset.find('label').text();
		if (errorMessageOverride === '')
			errorMsg = errorMessageOverride;
		if (errorMsg !== '')
			formData.$errorList.append('<li>'+errorMsg+'</li>');
	}

	// if error list is not visible within page, scroll to it
	function scrollPageToErrorList($errorDiv) {
		var errorsTop = $errorDiv.offset().top;
		var scrollTop = $(window).scrollTop();

		if (scrollTop > errorsTop) {
			scrollTop = errorsTop - Twc.Settings.errorListScrollTopPadding;
			$('html, body').animate({'scrollTop' : scrollTop}, Twc.Settings.errorListScrollToDuration, 'linear');
		}
	}

	function showHideErrors(formData) {
		var totalErrors = formData.$errorList.find('li').size();
		if (totalErrors) { // show
			var $wrap = formData.$errorDiv.find('.error-wrap');
			var wrapH = $wrap.outerHeight(true);
			if (formData.$errorDiv.is(':visible')) {
				scrollPageToErrorList(formData.$errorDiv);
				formData.$errorList.removeClass('invisible').hide().fadeIn();
				formData.$errorDiv.stop().animate({'height' : wrapH+'px'}, {
					complete: function() {
						formData.$errorList.removeClass('invisible');
					}
				});
			} else {
				formData.$errorList.removeClass('invisible').show();
				formData.$errorDiv.slideDown(function() {
					wrapH = $wrap.outerHeight(true);
					$(this).css({'height' : wrapH +'px'});
				});
				scrollPageToErrorList(formData.$errorDiv);
			}
		} else { // hide
			formData.$errorDiv.slideUp();			
		}
	}

	function clearSectionErrors(index, alsoHideErrors) {
		sectionFormData[index].$errorLabels.removeClass('error');
		sectionFormData[index].$errorList.empty().addClass('invisible');
		if(alsoHideErrors === true) {
			sectionFormData[index].$errorDiv.hide();
		}
	}

	function validateSection1() {
		var o = sectionFormData[1];
		var newTransferNumberVal = o.$newTransferNumber.filter(':checked').val();

		if (newTransferNumberVal === 'new-number') {
			return true;
		} else {
			clearSectionErrors(1);

			if (o.$currentProvider.val().trim() === '') {
				showFieldError(o, o.$currentProvider);
			}
			if (o.$currentProviderState.val().trim() === '') {
				showFieldError(o, o.$currentProviderState);
			}
			if (o.$phoneNumber.val().trim() === '') {
				showFieldError(o, o.$phoneNumber);
			}
			if (o.$accountNumber.val().trim() === '') {
				showFieldError(o, o.$accountNumber);
			}
			if (o.$accountName.val().trim() === '') {
				showFieldError(o, o.$accountName);
			}
			// if (o.$securityCode.val().trim() === '') { // optional field
			// 	showFieldError(o, o.$securityCode);
			// }
			if (o.$address1.val().trim() === '') {
				showFieldError(o, o.$address1);
			}
			// if (o.$aptType.val().trim() === '') { // optional field
			// 	showFieldError(o, o.$aptType);
			// }
			if (o.$city.val().trim() === '') {
				showFieldError(o, o.$city);
			}
			if (o.$billingState.val().trim() === '') {
				showFieldError(o, o.$billingState);
			}
			if (o.$billingZip.val().trim() === '') {
				showFieldError(o, o.$billingZip);
			}

			return (o.$errorList.find('li').size() === 0);
		}
	}

	function validateSection3() {
		var o = sectionFormData[3];

		clearSectionErrors(3);

		var fullName1 = o.$fullName1.val().trim();
		var fullName2 = o.$fullName2.val().trim();

		if (!o.$consentCheckbox.is(':checked')) {
			showFieldError(o, o.$consentCheckbox, 'Authorization checkbox');
		}
		if (fullName1 === '') {
			showFieldError(o, o.$fullName1,'Full Name 1');
		}
		if (isNaN(parseInt(o.$birthMonth.val(),10)) || isNaN(parseInt(o.$birthDay.val(),10)) || isNaN(parseInt(o.$birthYear.val(),10))) {
			showFieldError(o, o.$birthMonth,'Birth Date (Month, Day, Year)');			
		}
		if (fullName2 === '') {
			showFieldError(o, o.$fullName2,'Full Name 2');
		}

		return (o.$errorList.find('li').size() === 0);
	}

	function isSectionValid(section) {
		try {
			var isValid = false;
			switch(section) {
				case 0: return true; break;
				case 1:
					isValid = validateSection1();
					showHideErrors(sectionFormData[1]);
					return isValid;
					break;
				case 2: return true; break;
				case 3:
					isValid = validateSection3();
					showHideErrors(sectionFormData[3]);
					return isValid;
					break;				
				default: return false; break;
			}
		} catch (e) {
			Twc.Util.catchError(e);
			return false;
		}
	}

	/** user clicks to go to next step/section
	  */
	function nextSection(currentSection) {
		if (isSectionValid(currentSection)) {
			if(currentSection <= totalSteps-2) {
				var nextSection= currentSection+1;
				$sections.slice(0,nextSection).addClass('complete'); // mark this and all previous complete
				$sections.eq(nextSection).removeClass('disabled'); // allow for opening
				$sectionHeaders.eq(nextSection).click(); // open
				if (currentSection === totalSteps-2) {
					enableFinalStepButton(true);
				}
			} else { // we're in the last section and it passed validation
				alert('[Page Validation Success. Would navigate to next page]');
			}
		} else {
		}
	}

	Twc.Components.RowExpander.initRows($sections, true);
	Twc.Components.RowExpander.initRows($innerCollapsible, false);



	// if no in author mode, init the show/hide of the transfer number section
	if (!Twc.Util.authorModeInvoked()) {
		var $selectNumberRadios = $('.select-or-transfer-option input[type=radio]');
		if ($selectNumberRadios.length === 2) {
			var $transferNumberForm = $('.transfer-number').hide();
			if ($selectNumberRadios[1].checked) {
				$transferNumberForm.show();
			}
			$selectNumberRadios.on('change',function() {
				$transferNumberForm.stop(true,true);
				if(this.value === 'transfer-number') {
					clearSectionErrors(1,true);
					showHideErrors(sectionFormData[1]);
					$transferNumberForm.slideDown({
						'duration' : Twc.Settings.accordianSlideDuration,
						'easing' : Twc.Settings.accordianSlideEasing,
						'step' : Twc.ShoppingCart.evalPosition,
						'complete' : function() {
							showHideErrors(sectionFormData[1]);
						}
					});
				} else {
					$transferNumberForm.slideUp({
						'duration' : Twc.Settings.accordianSlideDuration,
						'easing' : Twc.Settings.accordianSlideEasing,
						'step' : Twc.ShoppingCart.evalPosition					
					})
				}
			});
		}
	}
}
