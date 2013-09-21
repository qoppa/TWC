/**
  * Manages user session within browser.  Implicitly starts a countdown timer
  * @namespace
  * @author McGowan
  */
Twc.Session = (function() {

	// this should be set true when
	var isExpired = 0;

	var sessionTimeout = Twc.Settings.sessionTimeout;

	var sessionTimeoutWarning = Twc.Settings.sessionTimeoutWarning;

	// ID for current window.setTimeout()
	var sessionTimeoutId = null;
	var sessionTimeoutWarningId = null;


	var modalOptions = {
		'width' : Twc.Settings.sessionModalWidth,
		'height' : Twc.Settings.sessionModalHeight
	}

	/** @returns "x minutes" or "x seconds" or x.xx if x has decimal
	  * @author McGowan
	  */
	function getMSFormatted(ms) {
		if (isNaN(ms))
			return '';

		var time, label;
		// determine mins or seconds.  Show two decimal places if decimal
		if (ms/1000/60 < 1) { // show seconds
			time = ms/1000;
			label = time != 1? ' seconds' : ' second';
		} else { // show minutes
			time = ms/1000/60;
			label = time != 1? ' minutes' : ' minute';
		}
		time = time %1 == 0? time : time.toFixed(2);
		return (time) + ' ' + label;
	}

	function showTimeoutMessage() {
		var expiredMessage = 'Your session has expired because of '+getMSFormatted(sessionTimeout)+' of inactivity. Please close this window and refresh the page.';
		log(expiredMessage);
		Twc.Modal.showContent("Session Timeout", expiredMessage, modalOptions);
	}

	function startWarningTimer() {
		if(!Twc.Settings.sessionTimeoutEnabled)
			return; 

		// start timeout timer
		if (sessionTimeout >= 0) {
			sessionTimeoutId = window.setTimeout(function() {
				Twc.Session.expireSession();
			}, sessionTimeout);
		}

		// start the session timeout timer. QA sets zero value so don't run this if so
		if (sessionTimeoutWarning >= 0) {
			sessionTimeoutWarningId = window.setTimeout(function() {
				var $warningMessage = $('<div>Your session will expire in '+getMSFormatted(sessionTimeout-sessionTimeoutWarning)+'. Please click below if you wish to continue.<div class="modal-action-wrapper"><a href="#" class="blue-button">Continue My Session</a></div></div>');
				$warningMessage.find('.modal-action-wrapper').css({'margin' : '20px 0 0 0','text-align' : 'center'}).find('a').css({'margin' : '0 auto', 'width' : 'auto', 'display' : 'inline-block', 'clear' : 'left'}).click(function() {
					Twc.Modal.close();
					Twc.Session.resetTimeoutWarning();
					return false;
				});
				Twc.Modal.showContent("Session Timeout Warning",$warningMessage, modalOptions);
			}, sessionTimeoutWarning);
		}
	}

	function clearTimers() {
		if (sessionTimeoutId != null) {
			window.clearTimeout(sessionTimeoutId);
			sessionTimeoutId = null;
		}
		if (sessionTimeoutWarningId != null) {
			window.clearTimeout(sessionTimeoutWarningId);
			sessionTimeoutWarningId = null;
		}
	}

	startWarningTimer();

	return {
		
		/** Explicitly expire the session and show users a message
		  * @author McGowan
		  */
		expireSession : function() {
			if(!Twc.Settings.sessionTimeoutEnabled)
				return; 

			clearTimers();
			isExpired = true;
			showTimeoutMessage();
		},
		
		/** Resets the session timeout warning and starts the timer again. Only resets if session has not yet expired
		  * @author McGowan
		  */
		resetTimeoutWarning : function() {
			if(!Twc.Settings.sessionTimeoutEnabled)
				return; 

			if (isExpired) {
				log('Session.resetTimeoutWarning(): already expired. Not resetting.');
				showTimeoutMessage();
				return;
			}

			log('Session.resetTimeoutWarning()');
			clearTimers();

			startWarningTimer();
		},

		/** Explicitly disables the session timers and warning maessages.  Currently used while in CQ Author Mode
		  * @author McGowan
		  */
		disableTimeoutFeatures : function() {
			log("Twc.Session.disableTimeoutFeatures()");
			Twc.Settings.sessionTimeoutEnabled = 0;
			clearTimers();
		}
	}

}());
