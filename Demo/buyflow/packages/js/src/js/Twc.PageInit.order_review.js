/**
  * Initializes Order Review page
  * @author McGowan
  *
  */
Twc.PageInit.order_review= function() {
	log('PageInit.order_review()');
	
	// change positioning to ensure that calendar positions absolutely within this.
	$('.solid-column').css({'position': 'relative'});

	var $rows = $('.installation-options > .collapsible');
	Twc.Components.RowExpander.initRows($rows, true); // restrict to one open 

	// configure installation dates and scheduling radio buttons
	var $scheduleRadios = $('.num-visits input');
	var $serviceCalendars = $('.option-details .date');
	var $secondServiceCalendar = $serviceCalendars.eq(1);

	// hide the second serivce calendar section if the first radio is checked
	$scheduleRadios.each(function(i) {
		var $radio = $(this);
		if (i === 0 && this.checked) {
			$secondServiceCalendar.hide();
		}

		$radio.click(function() {
			$secondServiceCalendar.stop(true,true);
			if (i === 0) {
				$secondServiceCalendar.slideUp(Twc.Settings.accordianSlideDuration, Twc.Settings.accordianSlideEasing);
			} else {
				$secondServiceCalendar.slideDown(Twc.Settings.accordianSlideDuration, Twc.Settings.accordianSlideEasing);
			}
		});
	});

	/** Date selection callback. Update the adjacent times
	  * @param i {Integer} index position of the group
	  * @param val {String} value of the date selection
	  */
	function cbDateSelect(i, val) {
		var dateInt = Twc.Util.getDateInt(new Date(val));
		var timeSlots = data.installationDates.timesAvailable[dateInt];
		$timeSelects.eq(i).fadeOut(function() {
			var $me = $(this);
			$me.empty();
			// build the time slots
			for (var i=0;i<timeSlots.length; i++) {
				var timeSlot = timeSlots[i];
				var option = '<option value="TBD">'+Twc.Util.getTimeRangeString(timeSlot[0], timeSlot[1])+'</option>';
				$me.append(option);
			}

			$me.fadeIn();
		});
	}


	// get the data needed for this page
	var data = Twc.Util.getUrl(Twc.Settings.ajaxUrls.GetInstallationDates);

	if ('undefined' !== typeof data.installationDates) {
		// translate the JSON into the format for the calendar
		var calendarOptions = new Twc.Calendar.Options();
		calendarOptions.dateToday = data.installationDates.dateToday; // use server-side date
		calendarOptions.appendToSelector = '.solid-column'; // position within here to protect position from window changes
		calendarOptions.excludePreviousMonthNav = 1;
		calendarOptions.restrictToDatesAvailable = 1;
		calendarOptions.restrictToLastDateAvailable = 1,
		calendarOptions.datesAvailable = {};

		// when setting, don't duplicate the entire object, only the keys. ensure each date has times within it
		var sortedDates = [];
		for (var key in data.installationDates.timesAvailable) {
			var timeSlots = data.installationDates.timesAvailable[key];
			if (timeSlots.length > 0) {
				calendarOptions.datesAvailable[key] = 1;
				sortedDates.push(key);
			}
		}
		sortedDates.sort();

		if (sortedDates.length > 0) {
			calendarOptions.lastDateAvailable = sortedDates[sortedDates.length-1];
		}

		// time slots for each Date Picker calendar
		var $timeSelects = $serviceCalendars.find('select');



		// the Date Picker calendars
		var $dateBoxes = $serviceCalendars.find('input[type=text]');
		$dateBoxes.each(function(i) {
			var $dateBox = $(this);
			
			$dateBox.focus(function() {
				calendarOptions['onDateSelect'] = function(val) { // ['dateSelect'] prevents error in JSDoc
					cbDateSelect(i, val);
				}
				Twc.Calendar.show($(this), calendarOptions);
			}).click(function(e) {
				$dateBox.focus();
				e.preventDefault();
			});
		})

		// datepicker buttons should trigger text boxes assuming 1:1 cardinality
		var $dateBoxButtons = $serviceCalendars.find('.datepicker-link');
		$dateBoxButtons.each(function(i) {
			$(this).click(function(e) {
				$dateBoxes.eq(i).focus();
				return false;
			});
		});

		// pre-populate dates
		if (sortedDates.length > 0) {
			var dateString = Twc.Util.getDateString(Twc.Util.getDate(sortedDates[0]));
			$dateBoxes.each(function(i) {
				this.value = dateString;
				cbDateSelect(i,dateString);
			});
		}

	} else {
		warn('PageInit.order_review(): data.installationDates not found');
	}


	var $nextButton = $('.js-next-button');
	var $form = $('#js-main-form');
	var $installationRadios = $form.find('input[type=radio][name=installation]');
	var $installRadio1 = $('#pick-up');
	var $installRadio2 = $('#mail');
	var $installRadio3 = $('#technician');

	if ($nextButton.size() !== 1 || $form.size() !== 1 || $installRadio1.size() !== 1 || $installRadio2.size() !== 1 || $installRadio3.size() !== 1) {
		error('PageInit.order_review(): required elements not found');
	}

	$installationRadios.change(function() {
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
		if ($installRadio1[0].checked || $installRadio2[0].checked) {
			enableNextButton(true);			
		}

		// TODO validate dates and such for $installRadio3
	}

	// run initial validation
	validatePage();
}
