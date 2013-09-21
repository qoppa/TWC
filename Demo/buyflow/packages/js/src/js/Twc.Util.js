/**
	* Utility class for sitewide functions
	* @author McGowan
	* @namespace
	*/
Twc.Util = (function() {

	// these are set by application
	var inAuthorMode = 0;
	var inIframeMode = 0;

	return {
		/** performs a synchronous URL fetch
		  * @author McGowan
		  * @param {String} url url to fetch from
		  * @param {String} [dataType] xml,json,script,html (values in compliance with jQuery $.ajax())
		  * @returns contens of URL with data type inferred by MIME type response
		  */
		getUrl : function(url, dataType) {
			try {
				var returnData = null;
				$.ajax({
					async : false, // should be required to return data
					timeout : Twc.Settings.ajaxTimeout,
					url : url,
					dataType : dataType, // use undefined if not provided in funciton

					success : function(data, textStatus, jqXHR) {
						returnData = data;
					},
					error : function(jqXHR, textStatus, e) {
						Twc.Util.catchError(e);
					}
				});
				return returnData;
			} catch (e) {Twc.Util.catchError(e)}
		},

		safeParseJson : function(s) {
			try {
				return ('undefined' !== typeof (s))?  $.parseJSON(s) : {};
			} catch (e) {
				error('Twc.Util.safeParseJson() - Could not parse: '+s);
				return {};
			}
		},

		/** Closes all open interactive elements (tooltips, top questions, etc.). Should be bound on $(document).click()
		  * @author McGowan
		  */
		closeOpenInteractives : function() {
			Twc.Tooltip.closeAll();
			Twc.Components.TopQuestions.close();
			Twc.ShoppingCart.close();
		},

		initPage : function() {
			log('Util.initPage()');

			Twc.PageInit['global']();

			var pageSpecificInit = Twc.PageInit[$('body').attr('id')];
			if ('function' === typeof(pageSpecificInit)) {
				pageSpecificInit();
			}

			Twc.Analytics.dispatch($('body').attr('id'));
		},

		/** Returns parsed urlParams.  Does not currently support multiple params with same name and different values :(
		  * @author McGowan
		  * @returns {Object} Case-Sensitive object map with parameter value strings.  Only currently supports one value per parameter name.  Empty string returned
		  * for parameters that have no value.
		  */
		getUrlParams : function() {
			var params = {};
			var queryString = location.search.substring(1);
			var regEx = /([^&=]+)(=([^&]*))*/g; // also match empty values
			var paramCombo = null;

			while (paramCombo = regEx.exec(queryString)) {
				var value = ('undefined' !== typeof paramCombo[3]) ? decodeURIComponent(paramCombo[3]) : ''; // use empty string if no value
				var key = decodeURIComponent(paramCombo[1]);
				params[key] = value;
			}
			return params;
		},

		/** Doest not work on multiple class names! adds classname to the jQuery object if it doesn't already exist.  This method shows huge performance improverments.
		  * @author McGowan
		  * @param $o {Object} jQuery object to add class to
		  * @param $className {String} class name to add.  Should only contain one class
		  */
		addClass : function($o,className) {
			if (!$o.hasClass(className)) {$o.addClass(className);}
		},

		/** Doest not work on multiple class names! removes classname to the jQuery object if it doesn't already exist.  This method shows huge performance improverments.
		  * @author McGowan
		  * @param $o {Object} jQuery object to remove class from
		  * @param $className {String} class name to remove.  Should only contain one class
		  */
		removeClass : function($o,className) {
			if ($o.hasClass(className)) {$o.removeClass(className);}
		},


		/** Used to catch errors and debug some useful info.  All try/catch blocks should utilize this feature
		  * @author McGowan
		  * @param {Error} e 
		  */
		catchError : function(e) {
			if (console) { // IE doesn't have console
				console.group(e.name+': '+e.message);
			}
			error(e);
			error(e.stack);
			if (console) {
				console.groupEnd();
			}
		},

		/**
		  * @author McGowan
		  * @param dateInt {Object} YYYYMMDD to create date from
		  * @returns new Date or undefined
		  */
		getDate : function(dateInt) {
			try {
				var s = new String(dateInt); // convert from integer to String just in case
				// convert "YYYYMMDD" to "MM/DD/YYYY"
				var dateString = s.substring(4,6) +'/'+ s.substring(6,8) +'/'+s.substring(0,4);
				var date = new Date(dateString);
				if ('undefined' === typeof(date) || isNaN(date.getTime()))
					throw "Invalid Date from "+dateString;
				else {
					return date;
				}
			} catch (e) {
				Twc.Util.catchError(e);
				return undefined;
			}
		},

		/**
		  * @author McGowan
		  * @param {Date} date to convert into string
		  * @returns -1 on error or integer of date as YYYYMMDD
		  */
		getDateInt : function(date) {
			if (typeof date === 'undefined' || !(date instanceof Date))
				return -1;

			return date.getFullYear() * 10000 + (date.getMonth()+1)*100 + date.getDate();

		},

		/** @param {String} time "HH:MM"
		  * @returns time formatted like 9am or 9:30am with minutes or 1pm. Returns empty string on error
		  */
		getTimeString : function(time) {
			try {
				var ary = time.split(':');
				var hr = parseInt(ary[0],10);
				var min = parseInt(ary[1],10);

				if (isNaN(hr))
					hr = '??';
				if (isNaN(min))
					min = '??';
				
				var am = hr >= 12? 'pm' : 'am';
				hr = hr > 12? hr-12 : hr;
				min = min === 0? '' : ':'+min; // don't show minutes if zero

				return hr+min+am;
			} catch (e) {return ''}
		},

		/**
		  * @param {String} startTime 24-hour time like 08:00
		  * @param {String} endTime 24-hour time like 08:00
		  * @returns String formatted like "8pm to 9pm" or "8:30am to 9pm". doesn't show minutes if zero
		  * @author McGowan
		  */
		getTimeRangeString : function(startTime, endTime) {
			var start = Twc.Util.getTimeString(startTime);
			var end = Twc.Util.getTimeString(endTime);
			if (start === '' || end === '')
				return start+end; // one will show alone
			else
				return start +' to '+end;
		},

		/**
		  * @author McGowan
		  * @param {Object} date
		  * returns M/D/YYYY or empty dtring
		  */
		getDateString : function(date) {
			try {
				return date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear();
			} catch (e) {
				Twc.Util.catchError(e);
				return '';
			}
		},

		showErrorMessage : function(e) {
			var modalOptions = {
				'width' : Twc.Settings.errorModalWidth,
				'height' : Twc.Settings.errorModalHeight
			}
			Twc.Modal.close();
			var $warningMessage = $('<div class="error-module" style="margin: 0 0 20px 0; line-height: 1.5em"><div class="error-wrap">ERROR: '+e.message+'. <br />Please try your request agin.</div></div><div><div class="modal-action-wrapper"><a href="#" class="blue-button">OK</a></div></div>');
			$warningMessage.find('.modal-action-wrapper').css({'text-align' : 'center'}).find('a').css({'margin' : '0 auto', 'width' : 'auto', 'display' : 'inline-block', 'clear' : 'left'}).click(function() {
				Twc.Modal.close();
				return false;
			});
			Twc.Modal.showContent("System Error",$warningMessage, modalOptions);
		},

		/**
		  * @author McGowan
		  * @param value {String} 40px or 100% string with a numerical value and a non-numerical unit
		  * @returns Array [numberValue, unit] i.e. 40px returns [40, 'px']. returns [-1, ''] on error
		  */
		getNumberUnit : function(value) {
			var s = $.trim(value);
			var val = parseInt(s, 10);
			var unit = s.match(/[^0-9^ ]+/g).join(''); // get all non numbers and non spaces and combine
			return [val,unit];
		},

		/** Call this while in CQ Author mode to disable certain features that should be supressed while in Author mode
		  * @author McGowan
		  */
		invokeAuthorMode : function() {
			log('Twc.Util.invokeAuthorMode()');
			inAuthorMode = true;
			Twc.Settings.sessionTimeoutEnabled = 0;
			Twc.Session.disableTimeoutFeatures();
		},

		/** iFrames should call this to disable certain features on iFrame pages
		  * @author McGowan
		  */
		invokeIframeMode : function() {
			log('Twc.Util.invokeIframeMode()');
			inIframeMode = true;
			Twc.Settings.sessionTimeoutEnabled = 0;
			Twc.Session.disableTimeoutFeatures();
		},

		authorModeInvoked : function () {
			return inAuthorMode;
		},

		iframeModeInvoked : function () {
			return inIframeMode;
		},

		/**
		  * @returns meeta value of session or empty string
		  * @deprecated Use Twc.Settings.sessionId
		  */
		getSessionId : function() {
			return Twc.Settings.sessionId;
		}
	}	
}());
