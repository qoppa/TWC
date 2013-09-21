/** Date Picker Calendar to show users a month and choose a date
	* @namespace
	* @author McGowan
	*/
Twc.Calendar = (function() {
	var monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];

	/** Tracks if the esc key handler has already been bound
	  */
	var escKeyBound = false;

	/** Tracks when a calender is active/shown or not.
	  */
	var calendarActive = false;

	/** Input box related to calendar displayed
	  * @author McGowan
	  */
	var $currentInputBox = null;

	/** Current date what we're showing.  Mainly deals with Month
	  * @author McGowan
	  */
	var currentDate = null;

	/** Current date the user selected or previously selected
	  * @author McGowan
	  */
	var currentDateSelected = null;

	/** @author McGowan
	  * Sets the appropriate Unicode arrow keys based on IE or not
	  * @returns{Array} {left, right}
	  */
	var arrowChars = (Modernizr.ie7 || Modernizr.ie8 || Modernizr.ie9)? {'prev' : "&#9668;", 'next' : "&#9658;"} : {'prev' : "&#9664;", 'next' : "&#9654;"};

	/** @author McGowan
	  * Binds escape key to closeAll() to quickly close the calendar.  Prevents duplicate binding and only runs if calendarActive
	  */
	function bindEscapeKey() {
		if (escKeyBound) return;

		$(document).keyup(function(e){
		    if(e.keyCode === 27) // escape
				if (calendarActive) {
					Twc.Calendar.closeAll();
				}
		});
		escKeyBound = true;
	}


	/** updates a calendar with the month and dates for that month.  If options.datesAvailable are provided, calendar restricts display to only show those months
	  * @author McGowan
	  * @param $container{Object} Calender container to write to
	  * @param options {Object} {@link Twc.Calendar.Options}
	  */
	function writeMonth($cal, options) {
		var todayDate = Twc.Util.getDate(options.dateToday);
		if ('undefined' === typeof todayDate || isNaN(todayDate.getTime())) { // revert to computer clock if options date failed
			todayDate = new Date();
		}

		var $calMonth = $cal.find('.calendar-month');

		$calMonth.html(monthNames[currentDate.getMonth()]+' '+currentDate.getFullYear());
		var $calDays = $cal.find('.calendar-month-dates').html('');

		// the date we'll use to output. Set to the first of the month
		var writeDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),1,0,0,0,0);
		var writeDay = writeDate.getDay();

		// hide prev month nav if settings dictate. Always allow users to navigate back to current month
		var $prevMonthButton = $cal.find('.calendar-button-prev');
		if (options.excludePreviousMonthNav && (
				writeDate.getFullYear() < todayDate.getFullYear() || 
				(writeDate.getFullYear() === todayDate.getFullYear() && writeDate.getMonth() <= todayDate.getMonth() ))
			) {
			$prevMonthButton.hide();
		} else {
			$prevMonthButton.show();			
		}

		// hide next month nav if settings dictate.  Always allow users to navigate forward to current month
		var $nextMonthButton = $cal.find('.calendar-button-next');
		if (options.restrictToLastDateAvailable && ( writeDate.getFullYear() >= todayDate.getFullYear() && writeDate.getMonth() >= writeDate.getMonth() ) ) {
			$nextMonthButton.hide();

			var lastDateAvailable = Twc.Util.getDate(options.lastDateAvailable);
			if ('undefined' !== typeof(lastDateAvailable) && writeDate.getFullYear() <= lastDateAvailable.getFullYear() && writeDate.getMonth() < lastDateAvailable.getMonth()) {
				$nextMonthButton.show();			
			}
		} else {
			$nextMonthButton.show();			
		}




		// before iterating, adjust the day so that we're writing starting at Sunday of the current week, or sunday of prev week if we're on a sunday
		writeDate.setDate(writeDay ==0? -6 : (-writeDay+1));


		// write up to 6 weeks of dates and break if writing a new week of the first week of third month
		var dayMarkup = '';
		var firstMonthDaysWritten = 0;
		for (var d=0;d<42;d++) {
			if (firstMonthDaysWritten === 2 && writeDate.getDay() === 0) {
				break;
			}
			if (writeDate.getDate() === 1) {
				firstMonthDaysWritten++;
			}

			var classes = ''; // classes to append to <div>
			if (currentDate.getMonth() !== writeDate.getMonth()) {classes +=' out'}; // flag dates outside of current month
			if (d > 0 && writeDate.getDay() === 0) {classes+=' newline'}; // write a new line for week

			// flag unavailable dates
			if (options && options.restrictToDatesAvailable) {
				if (!options.datesAvailable[Twc.Util.getDateInt(writeDate)]) {
					classes += ' day-unavail';					
				}
			}
			//if (writeDate.getDay() == 0 || writeDate.getDay() == 6) {classes+=' day-unavail';}


			if (currentDateSelected != null && writeDate.getFullYear() === currentDateSelected.getFullYear() // flag current date selected by user
				&& writeDate.getMonth() === currentDateSelected.getMonth()
				&& writeDate.getDate() === currentDateSelected.getDate()
				) {
				classes += ' day-selected';
			}
			if (writeDate.getFullYear() === todayDate.getFullYear() // flag today's date
				&& writeDate.getMonth() === todayDate.getMonth()
				&& writeDate.getDate() === todayDate.getDate()
				) {
				classes += ' day-today';
			}

			// set rel and don't use JQuery.data() for performance reasons
			var dateVal = (writeDate.getMonth()+1)+'/'+writeDate.getDate()+'/'+writeDate.getFullYear();
			dayMarkup += '<div rel="'+dateVal+'" class="day'+classes+'">'+writeDate.getDate()+'</div>';
			writeDate.setHours(24); // increment by one day
		}
		$calDays.append(dayMarkup);
	}

	/** Callback for when users click the date wrapper.  detects which date was clicked and fires function if specified in Options
	  * @author McGowan
	  * @param e{Event} event of click
	  * @param options {Object} {@link Twc.Calendar.Options}
	  */
	function cbDateClick(e, options) {
		var $dateEl = $(e.target);
		if ($dateEl.is('.day-unavail')) {
			return;
		}
		var dateVal = $dateEl.attr('rel');
		$('.calendar-month-dates .day').removeClass('day-selected');
		$dateEl.addClass('day-selected');

		// delay closing so users see date selected
		window.setTimeout(function() {
			$currentInputBox[0].value=dateVal;
			Twc.Calendar.closeAll();

			if ('function' === typeof options.onDateSelect) {
				options.onDateSelect(dateVal);
			}
		},Twc.Settings.dateSelectionHideDelay);
	}

	return {
		
		/** @returns {Boolean} indicates if the calendar is active
		  */
		isActive : function() {
			return calendarActive;
		},

		/** Shows a calendar popup, pre-populates date if one is present in @inputBox.  Upon date selection, sets @inputBox value or the current date provided in options
		  * @author McGowan
		  * @param inputBox {Object} This box will be populated with date value upon selction in mm/dd/yyyy format.  Pre-selects calendar with
		  * this date if one exists
		  * @param [options] provide an object identical to {@link Twc.Calendar.Options} to override default options
		  */
		show : function(inputBox, options) {
			try {
				options = options || new Twc.Calendar.Options();

				var $appendTo = $(options.appendToSelector);
				if ($appendTo.length === 0) {
					error("Empty appendToSelector element: "+options.appendToSelector);
					return;
				}

				// get top/left positions of that we're appending to
				var appendToLeft = $appendTo.offset().left;
				var appendToTop = $appendTo.offset().top;

				Twc.Calendar.closeAll();
				bindEscapeKey();
				calendarActive = true;

				// set global vars
				$currentInputBox = $(inputBox);
				var dateVal = $.trim($currentInputBox[0].value);

				// set to today's date if no date is set
				currentDate = new Date(dateVal);
				if ('undefined' === typeof(currentDate) || isNaN(currentDate.getTime())) { // get date from input box or set to current date in options
					currentDate = Twc.Util.getDate(options.dateToday);
				}
				if ('undefined' === typeof(currentDate) || isNaN(currentDate.getTime())) { // last-resort, set to date of user's computer/browser
					currentDate = new Date();
				}

				currentDateSelected = new Date(currentDate);

				var $calOverlayOrig = $('<div class="calendar-overlay-bkg"></div>');
				var $calOrig = $('<div class="calendar clearfix"><div class="calendar-nav clearfix"><div class="calendar-button-month calendar-button-prev">'+arrowChars.prev+'</div><span class="calendar-month"></span><div class="calendar-button-month calendar-button-next">'+arrowChars.next+'</div><div class="calendar-day-labels clearfix"><div class="day">Sun</div><div class="day">Mon</div><div class="day">Tue</div><div class="day">Wed</div><div class="day">Thu</div><div class="day">Fri</div><div class="day">Sat</div></div></div><div class="calendar-month-dates clearfix"></div></div>');
				

				var $calOverlay = $calOverlayOrig.clone().click(function() {
					Twc.Calendar.closeAll();				
				});
				var $cal = $calOrig.clone();
				/* McGowan - for performance, bind clicks to the container of the days and not the actual days themselves.  Prevents DOM binding on each day,
				 * and month rendering on iPhone4 went from 75ms to 20ms (73% improvement)
				 */
				var $calDays = $cal.find('.calendar-month-dates').click(function(e) {
					e.preventDefault();
					cbDateClick(e, options);
				});

				// position calendar near text box			
				var inputLeft = $currentInputBox.offset().left;
				var inputBottom = $currentInputBox.offset().top + $currentInputBox.outerHeight(true) + options.topPadding;
				$cal.css({position: 'absolute', 'left':inputLeft-appendToLeft+'px', 'top' : inputBottom-appendToTop+'px', 'margin' : 0});

				function nextButton() {
					currentDate.setDate(32); // set to next month
					writeMonth($cal, options);
				}
				function prevButton() {
					currentDate.setDate(0); // set to prev month
					writeMonth($cal, options);
				}

				// bind button actions
				var $buttonPrev = $cal.find('.calendar-button-prev').click(function(e) {
					e.preventDefault();
					e.stopPropagation();
					prevButton();
				});
				var $buttonNext = $cal.find('.calendar-button-next').click(function(e) {
					e.preventDefault();
					e.stopPropagation();
					nextButton();
				});

				$appendTo.eq(0).append($calOverlay).append($cal);


				writeMonth($cal, options);
			} catch (e) {
				Twc.Util.catchError(e);
			}
		},

		/** @author McGowan
		  * Closes any open calendars
		  */
		closeAll : function() {
			$('.calendar').remove();
			$('.calendar-overlay-bkg').remove();
			
			// reset global vars
			calendarActive = false;
			$currentInputBox = null;
			currentDate = null;
			currentDateSelected = null;
		}
	}
}());