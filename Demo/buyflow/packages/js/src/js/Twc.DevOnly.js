/**
  * Contains development-only code and routines that would not run during formal integration and production.  Such
  * code would be used to clean up or prep ingested Siteworx deliverables, or run custom tests during development.
  * Ultimately, we need to separate out non-production code from dev and tests
  * @author McGowan
  * @namespace
  *
  */
Twc.DevOnly = (function() {

	var urlParams = null;

	if (Twc.Settings.runDevOnlyCode) {
		// get query string parameters
		urlParams = Twc.Util.getUrlParams();

		// change Settings.js based on URL params

		if ('undefined' !== typeof urlParams['qa_force_timeout']){
		   Twc.Settings.sessionTimeout = 0;
		   Twc.Settings.sessionTimeoutWarning = -1;
		} else if ('undefined' !== typeof urlParams['qa_force_timeout_warning']){
		   Twc.Settings.sessionTimeout = 15*60*1000;
		   Twc.Settings.sessionTimeoutWarning = 0;
		}

		if ('undefined' !== typeof urlParams['qa_force_unknown_error']){
			$(document).ready(function() {
				Twc.Util.showErrorMessage(new Error("This is an explicit error thrown for testing"));
			});
		}

		//Set Javascript Disabled Error appropriately
		if ('undefined' !== typeof urlParams['qa_force_js_disabled']){
		   $('body').addClass('no-js'); 
		}

		// show outdated browser message
		if ('undefined' !== typeof urlParams['qa_force_outdated_browser']){
		   $('body').addClass('ie6'); 
		}

	}




	return {
		/** Prepares a Siteworx Delivery page for us to work with. Should only be called once and is very
		  * specific, so modify the source as you see fit.
		  * @author McGowan
		  */
		prepPage: function() {
			if (!Twc.Settings.runDevOnlyCode)
				return;

			log('DevOnly.prepPage()');


			// set appropriate progress bar steps
			var stepParam = urlParams['qa_checkout_step'];
			if (stepParam) {
				var $stepsWrapper = $('.checkout-steps');
				var $steps = $stepsWrapper.find('.step-list > li').removeClass('active');  // remove SWX active states
				var $step = $steps.eq(stepParam-1);
				$step.addClass('active');

				var subStepParam = urlParams['qa_checkout_substep'];
				if (subStepParam) {
					$stepsWrapper.addClass('show-sub-steps');
					$subSteps = $step.find('.sub-steps ul > li').removeClass('active'); // remove SWX active states
					$subSteps.eq(subStepParam-1).addClass('active');
				}

			}
			

			// collapse disclaimers (before they are initialized)
			$('.disclaimer').removeClass('active');




			// initialize any additions or removal of coupons
			$('.promo-code .applied-codes li').each(function() {
				var $this = $(this);
				$this.find('.remove').click(function() {
					$this.fadeOut();
				});
			});



			// disable some things for UI testing
			var $buttons = $('.collapsible .button').click(function(e) {
				e.stopPropagation();
				alert('(modal popup to display)');
			});
			var $buttons = $('.collapsible a.toggle').click(function(e) {
				e.preventDefault();
			});


			// hide Siteworx' collapsible items
			var $collapsible = $('.plans .collapsible, .internet-customize-accordion .collapsible').removeClass('active'); // select plans pages
			var $contentSections = $collapsible.find('section').hide();



			// customize phone requires special treatment
			if ('undefined' != typeof urlParams['qa_customize_phone_step']) {
				var step = parseInt(urlParams['qa_customize_phone_step'],10)-1;
				if (step >= 0 && step < 4) {
					$('.phone-customize-accordion .collapsible').removeClass('active');
					var $collapsibleTop = $('.phone-customize-accordion > .collapsible'); // top-level
					$collapsibleTop.filter(':not(:eq('+step+'))').addClass('disabled'); // disable all but first
					$collapsibleTop.eq(step).addClass('active'); // open current step
					$collapsibleTop.filter(':lt('+step+')').addClass('complete').removeClass('disabled'); // show previous steps completed

					//select second radio
					$('.select-or-transfer-option input[type=radio]').eq(1).click(); // name them and select first one

					// remove error classes
					$('.transfer-number fieldset, .customer-authorization label').removeClass('error');

					// remove and hide errors until validation shows them
					$('.transfer-number .error-module, .customer-authorization .error-module').hide().find('li').remove();

					// provide values for all select lists
					$('.phone-customize-accordion select').each(function(s) {
						var label = this.id || this.name;
						$(this).find('option').each(function(o) {
							$(this).attr('value', label+'_'+o);
						});
					}).slice(0,3).prepend('<option value="" selected="selected">Please select</option>');

					function setBirthdateFieldValues($select) {
						$select.find('option').each(function(i) {
							var val = (i === 0)? '' : i;
							$(this).attr('value', val);
						});						
					}
					setBirthdateFieldValues($('#birth-month'));
					setBirthdateFieldValues($('#birth-day'));
					setBirthdateFieldValues($('#birth-year'));

					if ('undefined' != typeof urlParams['qa_customize_tv_autocomplete']) {
						$('#current-provider option').eq(1).prop('selected',true);
						$('#current-provider-state option').eq(1).prop('selected',true);
						$('#current-provider-state-billing option').eq(1).prop('selected',true);
						$('#phone-number, #account-number, #account-name, #address, #city, #zip-code, #full-name1, #full-name2').attr('value', 'AUTO-COMPLETED');
						$('#choose-TWC').prop('checked', true);

						$('#birth-month option').eq(1).prop('selected',true);
						$('#birth-day option').eq(1).prop('selected',true);
						$('#birth-year option').eq(1).prop('selected',true);
					}

				}
			}

			// customize phone requires special treatment
			if ('undefined' != typeof urlParams['qa_customize_tv_step']) {
				var step = parseInt(urlParams['qa_customize_tv_step'],10)-1;
				if (step >= 0 && step < 2) {
					$('.tv-customize-accordion .collapsible:not(.tabs .collapsible)').removeClass('active');
					var $collapsibleTop = $('.tv-customize-accordion > .collapsible'); // top-level
					$collapsibleTop.eq(step).addClass('active'); // open current step
				}
			}


			// collapsse installation options but keep first open
			$('#order_review .installation-options .collapsible').each(function(i) {
				if (i === 0) return true;  // skip first
				$(this).removeClass('active');
			}).eq(0).find('.col a').click(function() { // show message on the "see map" links
				alert("A map should display, but we don't have a comp yet");
				return false;
			})

			// hide Installation Options and only show 1
			if ('undefined' != typeof urlParams['qa_one_installation']) {
				$('#order_review .num-visits, #order_review .option-details .date:eq(1)').remove();
			}


			$('.installation-options header input[type=radio] :eq(0)').attr('value',Twc.Settings.cq.STORE_PICKUP_ID);
			$('.installation-options header input[type=radio] :eq(1)').attr('value',Twc.Settings.cq.MAIL_TO_HOME_ID);
			$('.installation-options header input[type=radio] :eq(2)').attr('value',Twc.Settings.cq.TECHNICIAN_VISIT_ID);


			// make the calendar show during development
			if ('undefined' != typeof urlParams['dev_calendar_position']) {
				$(document).ready(function() {
					var $div = $('.installation-options > .collapsible:eq(2)');
					$div.find('header').click();
					window.setTimeout(function() {
						$div.find('.datepicker-link:eq(0)').click();
					}, 500);
				});
			}

			// select packages page
			// remove descoped item not yet removed by siteworx
			if ($('body').attr('id') === 'select_packages') {
				$('.packages-slider').slice(1).remove();
				$('.whats-included-wrap').hide();
				$('.whats-included').slice(1,3).remove();
				$('.packages-list, .wrap .error-module').remove();

			}
		}
	}
}());
