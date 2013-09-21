/**
	* @author McGowan
	* @namespace
	*/
var Twc = Twc || {}

/** @author McGowan
  * Logs a message to on-screen console for ipad and stuff
  * @param o {Object} object to show
  * @param isError {Boolean} indicates error message
  */
function logOsd(o, isError) {
	var $osdConsole = $('#twcLog');
	var color = isError? 'red' : 'lime';
	if ($osdConsole.length === 0)
	{
		logEl = $('<div id="twcLog"  style="z-index:5000;font-size: 11px;border-color: #dddddd; border-style: solid; border-width: 1px 1px 0 0; padding: 2px; position: fixed; bottom: 0; right: 0px;background: black !important; color: lime; font-size: 11px; font-family: arial;">\
		           <div style="color: #aaaaaa !important; text-align: right;"><a style="font-size; 9px !important; color: #aaaaaa !important; " href="javascript:void(0)" onclick="$(\'#twcLog\').hide().find(\'.log-entry\').remove();return false;">clear</a></div>\
		           <div id="twcLogContent" style="font-size: 11px; padding: 5px;"></div>\
		         </div>');
		$('body').append(logEl);
		$osdConsole = $('#twcLog');
	}
	$osdConsole.find('#twcLogContent').append('<div style="color: '+color+';" class="log-entry">'+o+'</div>');
	$osdConsole.show();
}

/** Try/Catch convenince of console.log(o)
	* @author McGowan
	* @param {Object} o Object to log
	* @param {Boolean} osd use on-screen display (for mobile devices)
	*/
function log(o, osd) {
	var onScreen = osd || Twc.Settings.forceLogOsd;
	try {console.log(o)} catch(e) {}
	if (onScreen) {
		logOsd(o,0);
	}
}
/** Try/Catch convenince of console.error(o)
	* @author McGowan
	* @param {Object} o Object to log
	* @param {Boolean} osd use on-screen display (for mobile devices)
	*/
function error(o, osd) {
	var onScreen = osd || Twc.Settings.forceErrorOsd;
	try {console.error(o)} catch(e) {}
	if (onScreen) {
		logOsd(o,1);
	}
}
/** Try/Catch convenince of console.warn(o)
	* @author McGowan
	* @param {Object} o Object to log
	* @param {Boolean} osd use on-screen display (for mobile devices)
	*/
function warn(o, osd) {
	var onScreen = osd || Twc.Settings.forceErrorOsd;
	try {console.warn(o)} catch(e) {}
	if (onScreen) {
		logOsd(o,1);
	}
}
/** Try/Catch convenince of console.dir(o)
	* @author McGowan
	* @param {Object} o Object to log
	*/
function dir(o) {
	try {console.dir(o)} catch (e) {}
}

// Ensure IE CSS selector (ie6,ie7,etc...) is set
if (Modernizr && Modernizr.addTest) {
	// from http://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
    rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        rv = document.documentMode;
        if (rv == undefined || rv == 0) {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
    }
    if (rv != -1) {
    	Modernizr.addTest('ie'+rv, function() {
        	return true;
    	});
    }
}
/**
  * Contains all settings used within application
  * @namespace
  * @author McGowan
  *
  */
Twc.Settings = (function() {

	var sessionId = $.trim($('meta[name=sessionid]').attr('content')) || '';

	return {
		/** URLs for AJAX REST calls.
		  * @author McGowan
		  */
		ajaxUrls : {
			'GetCartSummary' : '/residential/buyflow/mergedprofile/session/'+sessionId+'/',
			'GetInstallationDates' : '/residential/buyflow/installation/dates/session/'+sessionId+'/',
			'GetPackages' : '/residential/buyflow/packages/session/'+sessionId+'/'
		},

		/** Adobe CQ constants from https://github.webapps.rr.com/webcms/omega/blob/master/webcms/src/main/groovy/com/twc/webcms/buyflow/CheckoutConstants.groovy
		  * @author McGowan
		  */
		cq : {
			'STORE_PICKUP_ID' : '1-VZV5',
			'MAIL_TO_HOME_ID' : '1-VZUS',
			'TECHNICIAN_VISIT_ID' : '1-VZVI'
		},

		/** Session ID is set from page's <meta name="sessionid"> tag
		  * @author McGowan
		  */
		sessionId : sessionId,

		/** Urls for Dust.js templates to be compiled and cached for rendering
		  * @author McGowan
		  */
		templateUrls : {
			shoppingCart : '/residential/buyflow/templates/shoppingCart.template'
		},

		/**
		  * Force on-screen display of log messages.  Otherwise use default parameter passed by code
		  */
		forceLogOsd : 0,

		/**
		  * Force on-screen display of error messages.  Otherwise use default parameter passed by code
		  */
		forceErrorOsd : 0,

		/**
		  * Should we run DevOnly code? Limit to http://twccheckout.* and otherwise don't run
		  */
		runDevOnlyCode : /^twccheckout\./.test(window.location.hostname) || 0,

		breakpoint : {
			tablet: 501,
			desktop: 1100
		},

		/**
		  * MS delay for hiding calendar after date selection.  Delay provides user visual of accurate date selection
		  */
		dateSelectionHideDelay : 200,

		/**
		  * Ajax timeout value for loading modal content
		  */
		ModalAjaxTimeout : 8000,

		/** MS to delay showing modal loading message
		  */
		modalLoadingMessageDelay: 2000,

		/**
		  *
		  */
		modalFadeInDuration: 400,

		/**
		  *
		  */
		modalFadeOutDuration: 400,

		/** MS for ajax timeout of non-modal functions
		  * @author McGowan
		  */
		ajaxTimeout : 3000,


		/**
		  * MS for Top Questions answer slide in/out
		  */
		topQuestionsSlideDuration : 200,

		/**
		  * MS for sliding down accordian section
		  */
		accordianSlideDuration: 200,

		/**
		  * Animation easing value 
		  */
		accordianSlideEasing: 'linear',

		/**
		  * MS for fading in/out accordian content
		  */
		accordianFadeDuration: 200,

		/**
		  * MS for fading in/out accordian content
		  */
		accordianFadeEasing: 'swing',

		/**
		  * MS for fading in/out accordian content
		  */
		tabFadeInDuration: 400,

		/**
		  * MS for fading in/out accordian content
		  */
		tabFadeInEasing: 'swing',

		/**
		  * MS for shrinking the tab if the previous selected tab had heigher height.
		  * Prevents page jumping when screen shrinks
		  * @author McGowan
		  */
		tabShrinkDuration: 800,

		/** MS for fading the shoping cart on data updates
		  * @author McGowan
		  */
		shoppingCartUpdateFadeDuration: 300,

		/** Tooltip Settings
		  * McGowan
		  */
		tooltips : {
			fadeInDuration: 200,
			fadeOutDuration: 200,
			closeDelay: 500 // wait to close the tooltip
		},

		viewMore : {
			moreHtml : "View More",
			lessHtml : "View Less"
		},

		/** Disable this if you wish to supress session timeouts and timeout warning features.
		  * We're currently disabling in CQ Author mode via @link Twc.Util.invokeEditMode;
		  */
		sessionTimeoutEnabled: 1,

		/** MS of when session times out.
		  */
		sessionTimeout : 15*60*1000,

		/** MS at when we warn users that session will time out
		  */
		sessionTimeoutWarning : 13*60*1000,

		/** Applies to desktop breakpoint only
		  */
		sessionModalWidth : '450px',

		/** Applies to desktop breakpoint only
		  */
		sessionModalHeight: '250px',

		/** Applies to desktop breakpoint only
		  */
		errorModalWidth : '600px',

		/** Applies to desktop breakpoint only
		  */
		errorModalHeight: '280px',

		/** MS to delay showing error message when users check/uncheck boxes
		  */
		packageFilterCheckboxErrorDelay: 2000,

		packageFilterErrorSlideDuration: 400,

		packageFilterErrorSlideEasing: 'swing',

		packageLoadFadeDuration: 400,

		packageNavButtonFadeDuration: 400,

		packageSlideDuration: 400,

		packageDetailsFadeInDuration: 800,

		packageDetailsMoreHtml : "View More",

		packageDetailsLessHtml : "View less",


		/** page scrolls to error screen if errors are not shown
		  * @author McGowan
		  */
		errorListScrollTopPadding: 10,

		/**
		  * Not used.  prevents trailing comma accidents while coding
		  * @author McGowan
		  */
		_END : null
	}
})();
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
/**
  * Manages breakpoint changes and functions. Binds to window.onResize(), so don't initialize all the time unless needed
  * @namespace
  * @author McGowan
  */
Twc.Breakpoint = (function() {

	var isInitialized = false;
	var $window;
	var currentBreakpoint;
	var onChange = [];
	var onChangeToDesktop = [];
	var onChangeFromDesktop = [];


	function getCurrentBreakpoint() {
		var w = $window.width();
		if (w < Twc.Settings.breakpoint.tablet)
			return "mobile"

		if (w < Twc.Settings.breakpoint.desktop)
			return "tablet";

		return 'desktop';
	}

	function runFunctions(fArray) {
		for (var i=0;i<fArray.length; i++) {
			var f = fArray[i];
			if ('function' === typeof f) {
				f(getCurrentBreakpoint());
			}
		}
	}

	function breakpointChanged(bpoint) {
		runFunctions(onChange);
		if (currentBreakpoint === 'desktop' && bpoint === 'tablet') {
			runFunctions(onChangeFromDesktop)
		} else if (currentBreakpoint === 'tablet' && bpoint === 'desktop') {
			runFunctions(onChangeToDesktop)
		}
		currentBreakpoint = bpoint;
	}

	return {
		init : function() {
			if (isInitialized) {
				warn('Twc.Breakpoint.init(): Already initialized.');
				return;
			}

			$window = $(window);
			currentBreakpoint = getCurrentBreakpoint();

			$window.on('resize', function() {
				var breakpoint = getCurrentBreakpoint();
				if (breakpoint !== currentBreakpoint) {
					breakpointChanged(breakpoint);
				}

			});

			isInitialized = true;			
		},

		which : getCurrentBreakpoint,

		onChange : function(f) {
			onChange.push(f);
		},

		onChangeToDesktop : function(f) {
			onChangeToDesktop.push(f);
		},

		onChangeFromDesktop : function(f) {
			onChangeFromDesktop.push(f);
		}		
	}

})();
/**
  * Manages analytics event calls s
  * @namespace
  * @author McGowan
  */
Twc.Analytics = (function() {
    /**
      * Buyflow type: ebf, abf, gbf
      */
    /* TODO: Updated serviceLocation and buyflowType to pull info from metadata or whatever method we decide to use to make the info visible to JS */
    var buyflowType = "ebf";
    var serviceLocation = "nyc"

    /**
      * Holds event functions
      */
    var events = {

        /**********************************************************
         * MULTI-PAGE FUNCTIONS
         **********************************************************/

        /** Checkout Page loads
        * @author athomas
        */
        checkoutPageLoad : function(eventList, pageType, lob, breadcrumb) {
            s.pageName = buyflowType + " > " + pageType;
            if(typeof lob != "undefined"){
                s.pageName += " > " + lob;
            }
            s.events = eventList;
            s.prop3 = s.eVar6 = serviceLocation; // where trying to get service
            s.eVar19 = buyflowType;
            if(typeof breadcrumb != undefined)
                s.prop60 = buyflowType + ":" + breadcrumb; // "ebf:select & customize"
            s.t();
        },

        /** Select Service Page analytics
          * @author athomas
          */
        selectServiceAnalytics : function(eventList, pageType, lob) {
            //page load analytics
            events["checkoutPageLoad"](eventList, pageType, lob, "select & customize");

            //analytics for errors
            $(".checkout-plans .error-module p").each(function(){
                events["checkoutError"]($(this).text());
            });
            //impressions for each compare table product
            $(".fiveColumnCompareTable header ul").each(function(){
                var productName = $(this).attr("data-name");
                var productID = $(this).attr("data-id");
                var enrichedName = $(this).attr("data-enrichedName");
                events["productImpression"](productName, productID, enrichedName);
            });
        },

        /** Checkout Page Error Message Displayed
          * @author athomas
          * @param productName {String} product name of the selected object
          */
        cartAdd : function(productName) {
            s.linkTrackVars="events,products,eVar57,eVar59,eVar6,eVar19";
            s.linkTrackEvents="scAdd";
            s.events="scAdd";
            s.products=";" + productName;  // Seibel product name
            s.eVar57=productName;  // Seibel product name
            s.eVar59 = s.pageName;
            s.tl(true,'o','cart add');
            s.eVar57=s.eVar59=s.events=s.products="";
            s.linkTrackVars="None";
            s.linkTrackEvents="None";
        },

        /** Checkout Page Error Message Displayed
          * @author athomas
          * @param errorMessage {String} error message that is displayed
          */
        checkoutError : function(errorMessage) {
            s.linkTrackVars="eVar57,eVar59,eVar6";
            s.eVar57 = "warning/alert:1:1:" + errorMessage;  // should be brief description.  Perhaps first sentence if it is descriptive.
            s.eVar59 = s.pageName;  // Or, before page load can assign eVar57 same value that will be set into s.pageName
            s.tl(true,'o','checkout warning/alert');
            s.prop57=s.eVar59="";
        },

        /** Expandable/Collapsible Row opened
          * @author athomas
          * @param index {Integer} index of row in its container
		  * @param $row {Object} jQuery object representing the row
          */
        rowExpanderOpened : function(index, $row) {
            //jquery object that actually contains the data for product info
            var $rowData = $row.find("> header ul");
            var productName = $rowData.attr("data-name");
            var productID = $rowData.attr("data-id");
            var enrichedName = $rowData.attr("data-enrichedName");

            s.linkTrackVars="events,products,eVar57,eVar59,contextData." + buyflowType + "_prodid,contextData." + buyflowType + "_enrichedprodname,eVar6,eVar19";
            s.linkTrackEvents="prodView,event86";
            s.events="prodView,event86";
            s.eVar59 = s.pageName; // Or, if it fires before page load can assign eVar59 same value that will be set into s.pageName
            s.products=";" + productName;  // Seibel product name
            s.eVar57=productName;  // Seibel product name
            s.contextData[buyflowType + '_prodid']=productID; // Seibel product ID
            s.contextData[buyflowType + '_enrichedprodname']=enrichedName; // enriched product name
            s.tl(true,'o','view offer');
            s.eVar57=s.eVar59=s.events=s.products=s.contextData[buyflowType + '_enrichedprodname']=s.contextData[buyflowType + '_prodid']="";
            s.linkTrackVars="None";
            s.linkTrackEvents="None";
        },

        /** analytics impression for products
          * @author athomas
          * @param productName {String} product name displayed on compare table
          * @param productID {String} product id displayed on compare table
          * @param enrichedName {String} enriched product name displayed on compare table
          */
        productImpression : function(productName, productID, enrichedName) {
            s.lightTrackVars = "eVar57,eVar59,eVar6,contextData."+buyflowType+"_prodid,contextData."+buyflowType+"_enrichedprodname,eVar19";
            s.eVar57 = productName;  // Seibel product name
            s.eVar59 = s.pageName; // Or, before page load can assign eVar59 same value that will be set into s.pageName
            s.contextData[buyflowType+'_prodid']=productID; // Seibel product ID
            s.contextData[buyflowType+'_enrichedprodname']=enrichedName; // enriched product name
            s.trackLight("imprsn");
            s.prop57=s.eVar59=s.contextData[buyflowType+'_enrichedprodname']=s.contextData[buyflowType+'_prodid']="";
        },

        /** User clicks a top question to open
          * @author athomas
          * @param indexPos {Integer} position in question list
          * @param $a {Object} jQuery object user clicked
          */
        topQuestionsClick : function(indexPos, $a) {
            s.linkTrackVars="events,eVar59,eVar57,eVar6";
            s.linkTrackEvents="event84";
            s.events="event84";
            s.eVar57 = "checkout top questions:1:" + indexPos + ":" + $a.text(); //  append FAQ title text
            s.eVar59 = s.pageName;
            s.tl(true,'o','checkout top questions');
            s.eVar57=s.events=s.eVar59="";
            s.linkTrackVars="None";
            s.linkTrackEvents="None";
        },

        /**********************************************************
         * PAGE-SPECIFIC FUNCTIONS
         **********************************************************/

        /**********************************************************
         * ORDER REVIEW PAGE
         **********************************************************/
        /** Review Order Page loads
          * @author athomas
          * @param twoOptions {bool} true if user has two installation options
          */
        reviewOrderPageLoad : function(twoOptions) {
            var pageType = twoOptions ? "review order with options" : "review order";
            var eventList="event55:" + getAnalyticsSessionID() + buyflowType;
            if(twoOptions)
                eventList+=",event43:" + getAnalyticsSessionID() + buyflowType;

            events["checkoutPageLoad"](eventList, pageType);
        },

        /** Installation option is shown on Review Order Page
          * @author athomas
          * @param installationOption {String} the installation option shown
          *        options are: "installation by technician only", "self-installation pick-up",
          *        "self installation", "no install" (no installation needed or presented)
          */
        installationOptionImpression : function(installationOption) {
            s.linkTrackVars="events,eVar38,eVar6,eVar19";
            s.linkTrackEvents="event84";
            s.events="event84";
            s.eVar38 = installationOption;
            s.tl(true,'o',s.eVar38);
            s.events=s.eVar38="";
            s.linkTrackVars="None";
            s.linkTrackEvents="None";
        },

        /** User moves to the next page
        * @author athomas
        * @param installationOption {String} the installation option selected
        *        options are: "installation by technician only", "self-installation pick-up",
        *        "self installation", "no install" (no installation needed or presented)
        */
        reviewOrderComplete : function(installationOption) {
            s.linkTrackVars="events,eVar38,eVar6,eVar19";
            s.linkTrackEvents="event86";
            s.events="event86";
            s.eVar38 = installationOption;
            s.tl(true,'o',s.eVar38);
            s.events=s.eVar38="";
            s.linkTrackVars="None";
            s.linkTrackEvents="None";
        },

        /** Call analytics for order review page load
        * @author athomas
        */
        order_review : function(){
            log('Analytics.order_review()');
            var twoOptions = $(".installation-options input[value='" + Twc.Settings.splitTechnicianVisitId + "']").length > 0;

            //page load analytics
            events["reviewOrderPageLoad"](twoOptions);
            //no install if no options available
            if($(".installation-options input.radio.installation").length < 1)
                events["installationOptionImpression"]("no install");
            else //call impression for each installation option
                $(".installation-options input.radio.installation").each(function(){
                    events["installationOptionImpression"]($(this).attr("data-name"));
                });
        },

        /**********************************************************
         * SELECT INTERNET PAGE
         **********************************************************/
        /** Call analytics for select internet page load
        * @author athomas
        */
        select_internet : function(){
            log('Analytics.select_internet()');
            events["selectServiceAnalytics"]("event28", "select services", "internet");
        },

        /**********************************************************
        * SELECT PHONE PAGE
        **********************************************************/

        /** Call analytics for select phone page load
        * @author athomas
        */
        select_phone : function(){
            log('Analytics.select_phone()');
            events["selectServiceAnalytics"]("event29", "select service", "digital phone");
        },

        /**********************************************************
        * SELECT TV PAGE
        **********************************************************/

        /** Call analytics for select TV page load
        * @author athomas
        */
        select_tv : function(){
            log('Analytics.select_service()');
            events["selectServiceAnalytics"]("event27", "select services", "digital cable");
        },

        /**********************************************************
        * UPGRADE TV PAGE
        **********************************************************/

        /** Call analytics for upgrade TV page load
        * @author athomas
        */
        select_service : function(){
            log('Analytics.select_service()');
            events["selectServiceAnalytics"]("event27", "upgrade services", "digital cable");
        },

        /**********************************************************
        * UPGRADE TV PAGE
        **********************************************************/

        /** Call analytics for Customize Phone page load
        * @author athomas
        */
        customize_phone : function(){
            log('Analytics.customize_phone()');

            //default page type is configure services
            var pageType = "configure services";
            var lob = "digital phone";
            var $activeAccordion = $(".phone-customize-accordion .collapsible.active");

            //full view if more than one accordion is open
            if($activeAccordion.size() > 1){
                lob += " > full view";
            }

            //if sections 2, 3, or 4 are the first open one, change pageType
            switch($activeAccordion.index())
            {
                case 1:
                    pageType = "select or transfer number";
                    break;
                case 2:
                    pageType = "installation details";
                    break;
                case 3:
                    pageType = "agreements";
                    break;
                default:
                    pageType = "configure services";
            }

            events["selectServiceAnalytics"]("event29", pageType, lob);
        }
    }

    return {
        /**********************************************************
         * GENERIC/UTIL FUNCTIONS
         **********************************************************/

        // retrieve the id representing the user session for analytics
        getAnalyticsSessionID : function() {
            var sessionCookieVal = $.cookie('twc-analytics-session')
            if (sessionCookieVal) {
                return sessionCookieVal;
            }
            /* Given that we don't know exactly where this is being called from, make it synchronous to avoid timing issues.
            * the time the servlet takes to respond should also be minimal enough to not have the user notice it. */
            $.ajax({
                type: 'GET',
                async: false,
                url: '/bin/services/generate/id',
                cache: false,
                timeout: 3000,
                data: 'maxIDLength=16&baseEncoding=32'
            })
            .done(function(data, textStatus, jqXHR) {
                $.cookie('twc-analytics-session', data, { expires: null, path: '/'}); // create the cookie to expire at browser close
            })
            .fail(function(jqXHR, errorType, exception) {
                // don't show errors on QA servers
                if ((/^twccheckout\./.test(window.location.hostname))) {
                    Twc.Util.catchError(exception)
                }
            });
            return $.cookie('twc-analytics-session');
        },

        /** Dispatches an event.  Accepts indefinite amount of arguments, but first argument MUST be string of event name with corresponding
          * function.  e.g. dispatch('elementClick', param1, param2, etc...);
          * @author McGowan
          */
        dispatch : function() {
            try {
                if (!typeof arguments[0] === 'string') {
                    error('Analytics.dispatch(): first argument must be event name');
                    return;
                }
                var args = Array.prototype.slice.call(arguments); // convert arguments to Array
                var eventName = args.shift(); // we don't need event name anymore. don't pass it on
                var f = events[eventName];
                if ('function' === typeof f) {
                    f.apply(f,args);
                } else {
                    warn('Analytics.dispatch(): no function defined for: '+eventName);
                    return;
                }
            } catch (e) {
                // don't show errors on QA servers
                if (!(/^twccheckout\./.test(window.location.hostname))) {
                    Twc.Util.catchError(e)
                }
            }
        }
    }

})();
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
/**
  * Manages interactive for packages, package filter, etc.
  * @namespace
  * @author McGowan
  */
Twc.ServicePackages = (function() {

	var isInitialized = false;
	var showErrorDelay = Twc.Settings.packageFilterCheckboxErrorDelay;
	var packagesAjaxRequest = null; // toggles between null and jquery object while in progress
	var queuedAjaxPackagesDataLoaded = null; // this is returned by ajax requests
	var inErrorState = false;
	var loadedAjaxPackagesUrl = null;
	var currentPackagesParamsShown;
	var showErrorTimeoutId = null;
	var $navPrev = null;
	var $navNext = null;
	var $filterBoxes;
	var $filterError;
	var $carouselWrap;
	var $packagesList;
	var $packages;
	var $carousel;
	var filterBoxes = {};
	var currentPage = 0;

	// ajax responses dynamicaly inserted here
	var $packagesContentContainer;
	var $detailsContentContainer;

	var $packagesWrap;
	var $detailsWrap;
	var $detailsArrow;
	var $detailsToggles;
	var detailsToggleLabels;
	var $detailsContents; // array 1:1 size with packages
	var detailsArrowPos = ['15.8%', '50%', '84.2%']; // [left, right, center]
	var detailsToggleOn;
	var detailsToggleOff;

	// based on checkbox combination, determines if filter error should be shown
	function isFilterErrorNeeded() {
		if (filterBoxes.all.checked)
			return false;

		var unchecked = 0;
		if (!filterBoxes.tv.checked) unchecked++;
		if (!filterBoxes.internet.checked) unchecked++;
		if (!filterBoxes.phone.checked) unchecked++;

		return (unchecked >=2);
	}

	// dynamically fix heights based on largest height on each page group. should be called when moving in/out desktop breakpoint
	function setPackageHeights() {
		// each package should have these rows, which we must set to equal heights based on those shown within a carousel "page"
		var rows = [
			$carouselWrap.find('.package-header'),
			$carouselWrap.find('.package-services li:nth-child(1)'),
			$carouselWrap.find('.package-services li:nth-child(2)'),
			$carouselWrap.find('.package-services li:nth-child(3)'),
			$carouselWrap.find('.more-details ul')
		];

		var totalPages = getTotalPages();
		var totalPerSlide = getTotalPerSlide();
		if (totalPerSlide === 1) {
			for (var row=0; row<rows.length; row++) {
				rows[row].css({'height' : 'auto'});
			}
		} else {
			for (var page=0; page < totalPages; page++) {
				for (var row=0; row<rows.length; row++) {
					var $rowCells = rows[row].slice(page*totalPerSlide, (totalPerSlide*(page+1)));
					// dir($rowCells);
					var maxH = 0;
					$rowCells.each(function() {
						var $me = $(this);
						var h = $me.outerHeight(true);
						if (h > maxH)
							maxH = h;
					});
					$rowCells.css({'height' : maxH+'px'});
				}
			}
		}
	}

	function getTotalPerSlide() {
		return (Twc.Breakpoint.which() === 'desktop')? 3 : 1;
	}
	function getTotalPages() {
		return Math.ceil($packages.size() / getTotalPerSlide());;
	}
	function getPageOffsetPosition() {
		return (Twc.Breakpoint.which() === 'desktop')? (-($packages.eq(currentPage*getTotalPerSlide()).position().left)) + 'px' : (-currentPage*100)+'%';
	}

	function evalPagingButtons(disableFade) {
		if (!$packagesList.is(':animated')) {
			if (currentPage == getTotalPages() -1) {
				$navNext.clearQueue().fadeOut(disableFade? 0 : Twc.Settings.packageNavButtonFadeDuration);
			} else {
				$navNext.clearQueue().fadeIn(disableFade? 0 : Twc.Settings.packageNavButtonFadeDuration);
			}
			
			if (currentPage == 0) {
				$navPrev.clearQueue().fadeOut(disableFade? 0 : Twc.Settings.packageNavButtonFadeDuration);
			} else {
				$navPrev.clearQueue().fadeIn(disableFade? 0 : Twc.Settings.packageNavButtonFadeDuration);			
			}
		}
	}

	// sets the height of the packages based on the next page to be shown.
	function setPackageContainerHeight() {
		var perSlide = getTotalPerSlide();
		var $packagesShown = $packages.slice(currentPage*perSlide, currentPage*perSlide+perSlide);

		var maxH = 0;
		$packagesShown.each(function(i) {
			var $me = $(this);
			var h = $me.outerHeight(true);
			if (h > maxH)
				maxH = h;
		});
		// note - animation of height causes flash on ul.packages-list during paging, so don't animate for now
		$packagesList.css({'height' : maxH+'px'});
	}

	// only called when switching between desktop and tablet
	function onLayoutChange(breakpoint) {
		// ensure that package shown in mobile shows in correct page in desktop
		var totalPages = getTotalPages();
		var perDesktopPage = 3;
		if (breakpoint === 'desktop') { // moving from 1 slide to perDesktopPage. determing the page that shows this among three
			currentPage = Math.floor(currentPage/perDesktopPage);
		} else { // moving from 3 per slide to 1.  Show the first on the page of perDesktopPage
			currentPage = currentPage * perDesktopPage;
		}

		if ($packagesList.size() > 0) {
			$packagesList.stop(true,false).clearQueue().css({'margin-left' : getPageOffsetPosition()});
		}
		setPackageHeights();
		setPackageContainerHeight();
		evalPagingButtons(true);
		setPackageDetailsHeight();
	}

	function page(next) {
		var next = next || false;

		var totalPages = getTotalPages();

		var noAnimationNeeded;
		if (next) {
			currentPage++;
			if (currentPage >= totalPages) {
				currentPage = totalPages -1;
				noAnimationNeeded = true;
			}
		} else {
			currentPage--;
			if (currentPage < 0) {
				currentPage = 0;
				noAnimationNeeded = true;
			}			
		}

		evalPagingButtons();

		if (noAnimationNeeded)
			return;

		closePackageDetails();
		
		// left position is in pixels for desktop, percentage for non-desktop
		var left = getPageOffsetPosition();
		setPackageContainerHeight();
		$packagesList.clearQueue().animate({'margin-left' : left}, {
			'queue' : false,
			'duration' : Twc.Settings.packageSlideDuration,
			'complete' : function() {
				evalPagingButtons();
			}
		});
	}

	// evaluates the User Interface status and decides which action to take
	function evalUIStatus() {

		// determine if the UI should show an error
		if (isFilterErrorNeeded()) {
			if (!inErrorState) {
				startErrorState();
			}
		} else {
			stopErrorState();

			// show content loaded or fetch new content
			if (queuedAjaxPackagesDataLoaded != null) {
				showLoadedContent();
			} else if (packagesAjaxRequest == null) {
				var packagesAjaxUrl = Twc.Settings.ajaxUrls.GetPackages
					+'?show_tv='+filterBoxes.tv.checked
					+'&show_internet='+filterBoxes.internet.checked
					+'&show_phone='+filterBoxes.phone.checked
					+'&show_all='+filterBoxes.all.checked;

				if (packagesAjaxUrl !== loadedAjaxPackagesUrl) {
					cancelAjaxRequests();
					fadeOutPackages();
					fetchPackages(packagesAjaxUrl);
				}
			}
		}
	}

	function closePackageDetails() {
		$detailsWrap.stop(true,true).slideUp(function() {
			$detailsWrap.removeClass('active');
		});
		resetPackageDetailsToggles();
	}

	// set all columns equal for visible details
	function setPackageDetailsHeight() {
		var $thisDetails = $detailsContents.filter(':visible');
		var $thisDetailsCols = $thisDetails.find('.col');

		var h = 'auto';
		if (Twc.Breakpoint.which() === 'desktop') { // moving from 1 slide to perDesktopPage. determing the page that shows this among three
			var maxH = 0;
			$thisDetailsCols.each(function(i) {
				var $me = $(this);
				var h = $me.height();
				if (h > maxH)
					maxH = h;
			});
			h = maxH + 'px';
		}
		$thisDetailsCols.height(h);
	}

	function resetPackageDetailsToggles() {
		$detailsToggles.removeClass('active').each(function(i) {
			var $me = $(this);
			$me.html(detailsToggleLabels[i].viewMore);		
		});		
	}

	function togglePackageDetails(packageNum) {
		// get position of that clicked within slide page
		var $thisToggle = $detailsToggles.eq(packageNum);
		var $thisPackage = $packages.eq(packageNum);
		var $notThisToggle = $detailsToggles.not(':eq('+packageNum+')');
		var $thisDetails = $detailsContents.eq(packageNum);


		if ($thisToggle.is('.active')) { // close details
			closePackageDetails();
		} else { // open details
			resetPackageDetailsToggles();
			$thisToggle.addClass('active').html(detailsToggleLabels[packageNum].viewLess);
			var arrowPos = detailsArrowPos[packageNum % getTotalPerSlide()];

			$detailsArrow.stop().clearQueue();

			$detailsContents.hide().stop(true,true);
			if ($detailsWrap.hasClass('active')) { // already open. transition content
				$thisDetails.fadeIn(Twc.Settings.packageDetailsFadeInDuration,'swing');
				$detailsArrow.animate({'left' : arrowPos}, Twc.Settings.packageDetailsFadeInDuration/2, 'swing');
			} else { // not yet open
				$thisDetails.show();
				$detailsWrap.stop(true,true).slideDown(function() {
					$detailsWrap.addClass('active');
				});
				$detailsArrow.css({'left' : arrowPos});
			}
	
			setPackageDetailsHeight();
		}
	}

	function fadeOutPackages() {
		$carousel.stop().animate({'opacity' : '0'},{
			complete: evalUIStatus,
			duration: Twc.Settings.packageLoadFadeDuration
		});
	}

	function showLoadedContent() {
		if(!$carousel.is(':animated')) {
			currentPage = 0;

			var $newContent = $('<div>').html(queuedAjaxPackagesDataLoaded);
			var $newPackages = $newContent.find('.packages-list');
			var $newDetails = $newContent.find('.js-details');

			$packagesContentContainer.empty().html($newPackages);
			$detailsContentContainer.empty().html($newDetails);

			
			$packagesList = $carouselWrap.find('.packages-list');
			$packages = $carouselWrap.find('.package');

			if ($packagesList.size() === 0)
				error('Twc.ServicePackages.showLoadedContent(): $packagesList is empty');
			if ($packages.size() === 0)
				error('Twc.ServicePackages.showLoadedContent(): $packages is empty');
			
			setPackageHeights();
			setPackageContainerHeight(true);

			// Init view more/less labels if specified for individual packages or use global
			detailsToggleLabels = new Array($packages.size());
			$packages.each(function(i) {
				var $package = $packages.eq(i);
				var options = Twc.Util.safeParseJson($package.attr('data-options'));
				detailsToggleLabels[i] = {
					'viewMore' : options.viewMore || detailsToggleOff,
					'viewLess' : options.viewLess || detailsToggleOn
				};
				$package.find('.js-package-details-toggle').html(detailsToggleLabels[i].viewMore);
			});

			// init content
			Twc.Modal.initLinks($carouselWrap.find('a.modal'));
			Twc.Tooltip.init($carouselWrap.find('a.tooltip'));

			$detailsContents = $newDetails.hide();

			// show/hide details links
			$detailsToggles = $packages.find('.js-package-details-toggle').each(function(i) {
				var $me = $(this);
				$me.click(function() {
					togglePackageDetails(i);
					return false;
				});
			});

			var totalPackages = $packages.size();
			if (totalPackages < 1) {
				$carousel.removeClass('js-page-desktop');				
				$carousel.removeClass('js-page'); // tablet/mobile
			}

			if ($packages.size() > 1) {
				$carousel.addClass('js-page');
			}
			if ($packages.size() > 3) {
				$carousel.addClass('js-page-desktop');
			}


			queuedAjaxPackagesDataLoaded = null;
			evalPagingButtons(true);
			$carousel.stop().animate({'opacity' : '1'}, {
				complete: evalUIStatus,
				duration: Twc.Settings.packageLoadFadeDuration
			});
		}
	}

	function fetchPackages(url) {
		packagesAjaxRequest = $.ajax({
			'url': url,
			'cache' : false,
			success : function(data) {
				queuedAjaxPackagesDataLoaded = data;
				loadedAjaxPackagesUrl = url;
				evalUIStatus();
			},
			complete : function() {
				packagesAjaxRequest = null;						
			}
		});
	}

	function cancelAjaxRequests() {
		if (packagesAjaxRequest != null) {
			packagesAjaxRequest.abort();
		}
	}

	function startErrorState() {
		if($filterError.is(':not(:animated) :not(:visible)')) {
			inErrorState = true;
			cancelAjaxRequests();
			fadeOutPackages();
			loadedAjaxPackagesUrl = null;
			queuedAjaxPackagesDataLoaded = null;
			window.clearTimeout(showErrorTimeoutId);
			showErrorTimeoutId = window.setTimeout(function() {
				$filterError.slideDown(
					Twc.Settings.packageFilterErrorSlideDuration,
					Twc.Settings.packageFilterErrorSlideEasing,
					evalUIStatus
				);
			},showErrorDelay);
		}
	}

	function stopErrorState() {
		window.clearTimeout(showErrorTimeoutId);
		inErrorState = false;

		// close the error message
		if($filterError.is(':not(:animated) :visible')) {
			$filterError.slideUp(
				Twc.Settings.packageFilterErrorSlideDuration,
				Twc.Settings.packageFilterErrorSlideEasing,
				evalUIStatus
			);
		}
	}






	return {
		init : function() {
			if (isInitialized) {
				error('Twc.ServicePackages.init(): Already initialized.');
				return;
			}
			$carousel = $('.packages-slider').css({'opacity' : 0}).removeClass('hidden invisible');
			$carouselWrap = $('.packages-slider-wrap');
			$detailsWrap = $carousel.find('.whats-included-wrap').removeClass('active hidden').hide();
			$packagesContentContainer = $carousel.find('.js-packages-wrap');
			$detailsContentContainer = $carousel.find('.js-details-wrap');
			$detailsArrow = $carousel.find('.arrow-indicator');

			$filterError = $('.packages-error').hide().removeClass('hidden invisible');
			$filterBoxes = $('.filter-options input[type=checkbox]');
			$navPrev = $carousel.find('a.prev').hide().removeClass('hidden invisible').click(function() {page(false); return false;});
			$navNext = $carousel.find('a.next').hide().removeClass('hidden invisible').click(function() {page(true); return false;});

			if (	$carousel.size() !== 1 ||
					$carouselWrap.size() !== 1 ||
					$detailsWrap.size() !== 1 ||
					$packagesContentContainer.size() !== 1 ||
					$detailsContentContainer.size() !== 1 ||
					$detailsArrow.size() !== 1 ||
					$filterError.size() !== 1 ||
					$filterBoxes.size() !== 4 ||
					$navPrev.size() !== 1 ||
					$navNext.size() !== 1
				) {
				error('Twc.ServicePackages.init(): could not instantiate. Required DOM elements not found.');
			}

			// set global view more/less labels
			var options = Twc.Util.safeParseJson($carousel.attr('data-options'));
			detailsToggleOn = options.viewLess || Twc.Settings.packageDetailsLessHtml;
			detailsToggleOff = options.viewMore || Twc.Settings.packageDetailsMoreHtml;


			$carouselWrap.find('.close').click(function() {
				closePackageDetails();
				return false;
			});

			// manually set the values to ensure behavior we need
			filterBoxes.tv = $filterBoxes.filter('[name=tv-filter]').attr('value','tv')[0];
			filterBoxes.internet = $filterBoxes.filter('[name=internet-filter]').attr('value','internet')[0];
			filterBoxes.phone = $filterBoxes.filter('[name=phone-filter]').attr('value','phone')[0];
			filterBoxes.all = $filterBoxes.filter('[name=show-all-filter]').attr('value','all')[0];

			if (	'undefined' === typeof(filterBoxes.tv) ||
					'undefined' === typeof(filterBoxes.internet) ||
					'undefined' === typeof(filterBoxes.phone) ||
					'undefined' === typeof(filterBoxes.all) ||
					$navPrev.size() == 0 || $navNext.size() == 0
				) {
				error('Twc.ServicePackages.init(): could not instantiate. all checkboxes required.');
			}


			// deselect all other boxes if all is clicked
			$filterBoxes.filter('[name=show-all-filter]').click(function() {
				if (this.checked) {
					filterBoxes.tv.checked = false;
					filterBoxes.internet.checked = false;
					filterBoxes.phone.checked = false;
				}
				evalUIStatus();
			});

			// unselect all if one of these clicked
			$filterBoxes.filter(':not([name=show-all-filter])').click(function() {
				if (this.checked) {
					filterBoxes.all.checked = false;
				}
				evalUIStatus();
			});

			// bind left/right keys for carousel slider
			$(document).keyup(function(e) {
				var key = e.which;
				if (37 == key) { // left
					page(false);
				} else if (39 == key) { // right
					page(true);
				}
			});

			isInitialized = true;			
			Twc.Breakpoint.init();

			Twc.Breakpoint.onChange(setPackageContainerHeight);
			Twc.Breakpoint.onChangeFromDesktop(onLayoutChange);
			Twc.Breakpoint.onChangeToDesktop(onLayoutChange);

			evalUIStatus();
		}
	}

})();
/**
  *  Contains code to return templates used with JSON for rendering HTML.  Current implementation is dust.js
	* @author McGowan
	* @namespace
	*/
Twc.Templates = (function() {
	// stores the template ID if compiled
	var compiledTemplates = {};

	/** Compiles a template and loads it into dust's cache
	  * @author McGowan
	  * @param{String} id of template
	  * @returns compiled template
	  */
	function loadTemplate(id) {
		var templateUrl = Twc.Settings.templateUrls[id];
		var template = Twc.Util.getUrl(templateUrl, 'text');
		var templateCompiled = dust.compile(template, id);
		dust.loadSource(templateCompiled);
		compiledTemplates[id] = 1;
	}

	return {
		/**
		  * @author McGowan
		  * @returns rendered content string
		  */
		getRenderedOutput : function(templateId, jsonData) {
			try {
				if (!compiledTemplates[templateId]) {
					loadTemplate(templateId);
				}
				var rendered;
				dust.render(templateId, jsonData, function(err, out) {
					rendered = out;						
				});
				return rendered;
			} catch (e) {Twc.Util.catchError(e)}
		}
	}
})();/**
  * @author McGowan
  * @namespace
  * Holds all page initialization routines
  */
Twc.PageInit = {};

/**
  * Runs on all pages.
  *	@author McGowan
  * @function
  */
Twc.PageInit.global = function() {
	// close any pop-up content if document is clicked.  pop-up content should call e.stopPropogation to prevent this from executing
	$(document).click(Twc.Util.closeOpenInteractives);

	Twc.Modal.initLinks($('a.modal'));
	Twc.Tooltip.init($('a.tooltip'));
	Twc.Components.TopQuestions.init();

	Twc.ShoppingCart.init();

	Twc.DevOnly.prepPage();

	// view more/less disclaimers
	Twc.Components.ViewMore.initObjects($('.disclaimer'));
}
/**
  * Initializes Billing page
  * @author McGowan
  *
  */
Twc.PageInit.billing= function() {
	log('PageInit.billing()');

	$(window).on('message', function(e) {
		var data = Twc.Util.safeParseJson(e.originalEvent.data);

		if ('undefined' !== typeof data.iFrameHeight) {
			$('.billing-iframe').height(data.iFrameHeight);
		}

		// passthru iframe clicks as document clicks (to close open menus, etc);
		if (data.event === 'iFrameDocumentClick') {
			$(document).click();
		}
	});
};

Twc.PageInit.billing_pci = function() {
	log('PageInit.billing_pci()');
	Twc.PageInit.billing();
};

Twc.PageInit.billing_iframe = function() {
	log('PageInit.billing_iframe()');

	function ilog(s) {
		log('IFRAME: '+s);
	}

	$(window).on('resize', function() {
		setParentHeight();
		ilog('width: '+$('#iframe-content').outerWidth(true));
	}).click(function() { // propogate iframe document clicks to parent
		var message = {
		    "event" : "iFrameDocumentClick"
		};
		window.parent.postMessage(JSON.stringify(message),'*');		
	});


	function setParentHeight() {
		var h = $('#iframe-content').outerHeight(true);
		// ilog('setting parent iFrame height: '+h);
		// window.top.setIframeHeight(h);
		var message = {
		    "iFrameHeight" : h
		};
		window.parent.postMessage(JSON.stringify(message),'*');
	}
	$(document).ready(function() {
		ilog('document.ready()');
		setParentHeight();
	});
	$(window).on('load',function() {
		ilog('window.load()');
		setParentHeight();
	});

};
/**
  * Initializes select service pages
  * @author McGowan
  *
  */
Twc.PageInit.select_service= function() {
	log('PageInit.select_service()');
	Twc.Components.RowExpander.initRows($('.plans > .collapsible'));
	Twc.Components.RowExpander.initRows($('.cart-module .collapsible')); // init right-rail cart

	$('.plans > .collapsible li.last a').click(function(){
	    var productName = $(this).parents("ul").attr("data-name");
	    Twc.Analytics.dispatch('cartAdd', productName);
	});
}
/**
  * Initializes select TV service page
  * @author McGowan
  *
  */
Twc.PageInit.select_tv= function() {
	log('PageInit.select_tv()');
	Twc.PageInit.select_service();
}
/**
  * Initializes select Phone service page
  * @author McGowan
  *
  */
Twc.PageInit.select_phone= function() {
	log('PageInit.select_phone()');
	Twc.PageInit.select_service();
}
/**
  * Initializes select Internet service page
  * @author McGowan
  *
  */
Twc.PageInit.select_internet= function() {
	log('PageInit.select_internet()');
	Twc.PageInit.select_service();
}
/**
  * Initializes select Packages page
  * @author McGowan
  *
  */
Twc.PageInit.select_packages = function() {
	log('PageInit.select_packages()');

	Twc.ServicePackages.init();
}
/**
  * Initializes upgrade Internet service page
  * @author McGowan
  *
  */
Twc.PageInit.upgrade_internet= function() {
	log('PageInit.upgrade_internet()');
	Twc.Components.RowExpander.initRows($('.plans .collapsible, .internet-customize-accordion .collapsible'));
	Twc.Components.RowExpander.initRows($('.cart-module .collapsible')); // init right-rail cart
}
/**
  * Initializes customize tv pages
  * @author McGowan
  */
Twc.PageInit.customize_tv = function() {
	log('PageInit.customize_tv()');

	Twc.Components.RowExpander.initRows($('.cart-module .collapsible')); // init right-rail cart

	// only mark first-level .collapsible for initilization.  Child .collapsible require special treatement
	var $rows = $('.tv-customize-accordion > .collapsible');
	Twc.Components.RowExpander.initRows($rows);

	// Select TV Equip has inner collapsibles
	Twc.Components.RowExpander.initRows($rows.eq(0).find('.collapsible'));

	// initialize the tabs
	Twc.Components.Tabs.init($('.tv-customize-accordion .tabs'));

	// initialize the tables that have detail rows that expand
	Twc.Components.TableRowExpander.initTable($('table.premiums, table.sports, table.sports-pass'));

	// view more/less sections
	Twc.Components.ViewMore.initObjects($('.js-view-more'));



	// Select boxes that show updates
	$('.quantity select').each(function(i) {
		var $this = $(this);
		var $wrapper = $this.parent('.quantity');
		var $msg = $wrapper.find('.confirm');
		$this.on('change', function(e) {
			var val = $this[0].value;
			if (isNaN(val)) {
				$msg.animate({'opacity':0});
				return;
			}

			if ($msg.length == 0) { // message doesn't exist, slide to show
				$msg = $('<div class="confirm"><span>Cart Updated</span></div>').hide();
				$wrapper.append($msg);
				$msg.fadeIn();
			} else { // message aleady exists, use fade indication
				$msg.fadeOut(function() {
					$msg.css({'opacity': 1});
					$msg.html('<span>Cart Updated</span>');
					$msg.fadeIn();
				});
			}
		})
	});
}
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

}/**
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
/**
  * Initializes Order Summary page
  * @author McGowan
  *
  */
Twc.PageInit.order_summary= function() {
	log('PageInit.order_summary()');
}
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
/**
  *  Manages functionality for loading modal pop-ups
	* @author McGowan
	* @namespace
	*/
Twc.Modal = (function() {

	/** 
	  * marker to indicate link was initalized
	  * @author McGowan
	  */
	var initializedClass = 'js-modal-initialized';
	var modalContentSelector = '.modal-content';

	// original markup used for cloning to new modals
	var $overlay_orig = $('<div class="modal-overlay-bkg" onclick="Twc.Modal.close()"></div>');
	var $window_orig =  $('<div class="modal-window"><div class="modal-title-wrapper"><div class="modal-title"></div><div class="modal-button-close" onclick="Twc.Modal.close();"></div></div><div class="modal-content-wrapper"><div class="modal-content-outer"><div class="modal-content"></div></div></div></div>');
	var $loadingMessage = $('<div class="modal-loading">Loading...<a href="#" class="modal-loading-close">cancel</a></div>');
	var showLoadingMessageTimeoutId;
	$loadingMessage.find(".modal-loading-close").click(function() {
		Twc.Modal.close();
		return false;
	});

	// these are set later after DOM insert
	var $overlay = null;
	var $window = null;
	var $title = null;
	var $content = null;
	var $contentWrapper = null;

	var overlayActive = false;
	var escKeyBound = false;
	var currentAjaxRequestId = null;

	/** 
	  * callback for escape key pressed.  Does nothing unless modal is active.
	  * @author McGowan
	  */
	function escKey() {
		if (overlayActive) {
			Twc.Modal.close();
		}
	}

	function showLoadingMessage() {
		hideLoadingMessage();
		if ($overlay) {
			showLoadingMessageTimeoutId = window.setTimeout(function() {
				$overlay.append($loadingMessage);
				var w = -($loadingMessage.outerWidth(true))/2;
				$loadingMessage.css({"margin-left" : w});
			},Twc.Settings.modalLoadingMessageDelay); // don't show immediately
		}
	}
	function hideLoadingMessage() {
		window.clearTimeout(showLoadingMessageTimeoutId);
		$('.modal-loading').remove();
	}


	/** Resizes the modal based on the options shown.
	  * @author McGowan
	  */
	function resizeModal(options) {
		// custom widths/heights should only be set for desktop. tablet and mobile should always show full width/heights. Ensure CSS uses !important
		if (options.width) {
			// get unit (px or %) and number
			var numUnit = Twc.Util.getNumberUnit(options.width)

			var width = numUnit[0]+numUnit[1];
			var marginLeft = -(numUnit[0]/2)+numUnit[1];

			$window.css({
				'left' : '50%',
				'right' : 'auto',
				'width' : width,
				'marginLeft' : marginLeft
			});
		}

		if (options.height) {
			// get unit (px or %) and number
			var numUnit = Twc.Util.getNumberUnit(options.height)

			var height = numUnit[0]+numUnit[1];
			var top = '50%';
			var marginTop = -numUnit[0]/2 + 'px';

			// percentages handle height differently
			if (numUnit[1] === '%') {
				top = (100-numUnit[0])/2 + '%';
				marginTop = 0;
			}
			$window.css({
				'bottom' : 'auto',
				'height' : height,
				'top' : top,
				'marginTop' : marginTop
			});
		}
	}

	/** @author McGowan
	  * Starts a modal display
	  * @returns {integer} Timestamp ID of request
	  */
	function startModal(title, options) {
		var options = options || {};
		requestId = new Date().getTime(); // create an id to prevent latency display overlapping
		currentAjaxRequestId = requestId;
		// bind esc if not yet bound to close modal
		if (!escKeyBound) {
			$(document).keyup(function(e){
			    if(e.keyCode === 27) // escape
			        escKey();
			});
			escKeyBound = true;
		}

		Twc.Modal.close();
		overlayActive = true;
		var title = title || '';

		// clone and create new modal elements.  Set local vars after DOM insert
		$('body').append($overlay_orig.clone().hide()).append($window_orig.clone().hide());

		$overlay = $('.modal-overlay-bkg').fadeIn(Twc.Settings.modalFadeInDuration);
		// $window = $('.modal-window').fadeIn(Twc.Settings.modalFadeInDuration);
		$window = $('.modal-window');

		resizeModal(options);

		$title = $window.find('.modal-title');
		$content = $(modalContentSelector);
		$contentWrapper = $('.modal-content-outer');

		$title.html(title);
		return requestId;
	}

	/**
	  * @author McGowan
	  * @returns {boolean} Tests to see if a modal request is still valid
	  */
	function requestStillValid(requestId) {
		var valid=  (overlayActive && requestId === currentAjaxRequestId);
		if (!valid) {
			log(requestId+ " Current AJAX Request Expired.");
		}
		return valid;
	}

	return {
		/** Initializes group of links to handle modal functionality
		  * @author McGowan
		  * @param {Object} $o The jQuery object to iterate over.  should be a tags
		  */
		initLinks : function($o) {
			try {
				if (typeof $o === 'undefined' || !($o instanceof jQuery)) {
					error('$o is not a jQuery object');
					return;
				}
				$o.each(function(i) {
					var $this = $(this);
					if ($this.hasClass(initializedClass)) {
						error('Already initialized: '+initializedClass);
						return true; // continue to next
					}

					$this.click(function(e) {
						var href = $.trim($this.attr('href'));
						var title = $this.attr('title') || $this.text();
						Twc.Modal.openUrl(href, title);
						return false;
					});

					$this.addClass(initializedClass);
				});
			} catch (e) {
				Twc.Util.catchError(e);
			}
		},


		/**
			* @author McGowan
			* Opens a modal and closes all other modals to prevent duplicates. Appropriately handles late-arriving responses
			* @param {String} url URL (absolute/relative) of content to open. 
			* @param {String} title Title to display in modal;
			*/
		openUrl: function(url, title) {
			try {
				var requestId = startModal(title);
				if (url !== '#') {
					showLoadingMessage();

					$.ajax({
						'url' : url,
						'timeout' : Twc.Settings.ModalAjaxTimeout,
						'cache' : false, // ensure every request is new. Directly affects IE8
						'success' : function(data, textStatus, jqXHR) {
							try {
								if (requestStillValid(requestId)) {
									hideLoadingMessage();
									// data must have an outer-most wrapper of modalContentSelector
									var $newContent = $('<div>').html(data).find(modalContentSelector);
									if ($newContent.length === 0) {
										Twc.Util.showErrorMessage(new Error('test'));
									} else {
										var options = Twc.Util.safeParseJson($newContent.attr('data-options'));
										resizeModal(options);
										$contentWrapper.html($newContent);
										$content = $contentWrapper.find(modalContentSelector);
										if ('undefined' !== typeof options.title) {
											$window.find('.modal-title').html(unescape(options.title));
										}
										if (options.id && 'function' === typeof Twc.Modal.LoadInit[options.id]) {
											Twc.Modal.LoadInit[options.id]($content);
										}											
										$window.fadeIn(Twc.Settings.modalFadeInDuration);
									}
								}
							} catch(e) {
								Twc.Util.catchError(e);
							}
						},
						'error' : function(jqXHR, textStatus, errorThrown) {
							if (requestStillValid(requestId)) {
								hideLoadingMessage();
								Twc.Util.showErrorMessage(new Error('Content could not be loaded: '+textStatus));
							}
						}
					});
				}
			} catch(e) {
				Twc.Util.catchError(e);
			}
		},

		showContent : function(title, content, options) {
			options = options || {};
			var requestId = startModal(title, options);
			$content.html(content);
			$window.fadeIn(Twc.Settings.modalFadeInDuration);
		},

		close : function() {
			// Close previous modal if exists
			if ($window) {
				$window.remove();
			}
			if ($overlay) {
				$overlay.remove();
			}
			overlayActive = false;
		}
	}
}());/**
  * Manages functionality for tooltip display. Tooltips require html attribute data-tooltip on the target tooltip instantiation element.
  * Required data-tooltip JSON is {"heading", "body"}
  * @author McGowan
  * @namespace
  */
Twc.Tooltip = (function() {

	/** 
	  * marker to indicate link was initalized
	  * @author McGowan
	  */
	var initializedClass = 'js-tooltip-initialized';

	var tooltipWrapperClass = 'tooltip-popup';

	// using pseudo elements for arrow, so we must override with style tag
	var $arrowStyle = $('<style type="text/css" title="js-tooltips"></style>');

	// we must override CSS, so ensure selectors match CSS declaration
	var arrowCSSSelectors = '.tooltip-popup.top .tooltip-content:before, .tooltip-popup.top .tooltip-wrap:before, .tooltip-popup.top .tooltip-wrap:after, ' +
	                        '.tooltip-popup.bottom .tooltip-content:before, .tooltip-popup.bottom .tooltip-wrap:before, .tooltip-popup.bottom .tooltip-wrap:after';
	                        
	function cancelTooltipClose(id) {
		window.clearTimeout(id);						
	}

	return {
		/** initializes a group of elements Prevents double initalization.
		  * @author McGowan
		  * @param $objects {Object} jQuery object to iterate over, instantiating on each()
		  */
		init : function($objects) {
			try {
				if (typeof $objects === 'undefined' || !($objects instanceof jQuery)) {
					error('$rows is not a jQuery object');
					return;
				}

				var $window = $(window);

				$('head').append($arrowStyle); // JQuery should only be adding this once, but it's ok to call on init()

				$objects.each(function(i) {
					var $me = $(this);
					if ($me.hasClass(initializedClass)) {
						erorr('tooltip already initialized');
						return true; // continue to next
					}

					var data = Twc.Util.safeParseJson($me.attr('data-tooltip'));
					if(typeof data.body === 'undefined') {
						error("Cound not instantiate tooltip");
						return true; // continue to next
					}

					var tooltipOpen = false;
					var tooltipHeading = data.heading? '<header>'+unescape(data.heading)+'</header>' : '';
					var tooltipBody = unescape(data.body) || '';
					var mouseoutTimeoutId; // used to keep tooltip open for a little bit
					var appendedToDom = false;

					// set to .top for accurate height calculation when determining whether to switch to bottom
					var $tooltip = $('<div class="'+tooltipWrapperClass+' top"><div class="tooltip-content"><div class="tooltip-wrap"><a href="" class="close">Close</a>'+tooltipHeading+tooltipBody+'</div></div></div>')
					  .on('mouseover', function(e) {
						// e.stopPropagation();
						cancelTooltipClose(mouseoutTimeoutId);
					}).on('mouseout', function() {
						startTooltipClose();
					}).click(function(e) {
						e.stopPropagation(); // prevent this from being closed by $(document).click()
					});

					$tooltip.find('.close').click(function(e) {
						e.preventDefault();
						closeTooltip();
					});

					function startTooltipClose() {
						mouseoutTimeoutId = window.setTimeout(function() {						
							$tooltip.stop(true,true).fadeOut(Twc.Settings.tooltips.fadeOutDuration, function() {
								closeTooltip();
							});
						}, Twc.Settings.tooltips.closeDelay);
					}

					function closeTooltip() {
						$tooltip.hide();
						tooltipOpen = false;
					}

					function showTooltip() {
						$tooltip.stop(true,true);
						Twc.Tooltip.closeAll(); // hide any other open tooltips
						$tooltip.css('opacity',1);
						var screen = {
							height: $window.height(),
							width: $window.width(),
							scrollTop: $(window).scrollTop(),
							yBottom : $window.height+$('html').scrollTop()
						}

						var link = {}; // the link that triggers the tooltip
						link.h = $me.outerHeight(true);
						link.w = $me.outerWidth(true);
						link.top = $me.offset().top;
						link.left = $me.offset().left;

						var tooltip = {}
						tooltip.h = $tooltip.outerHeight(true);
						tooltip.w = $tooltip.outerWidth(true);

						// determine top position.  place above the source if tooltip would be off page.
						var screenBottom = $window.height()+$window.scrollTop();
						var tooltipBottom = (link.top+link.h)+tooltip.h;
						tooltip.top = (tooltipBottom >= screenBottom)? link.top-tooltip.h : link.top + link.h;
						$tooltip.removeClass('top bottom').addClass((tooltipBottom >= screenBottom)? 'bottom' : 'top' );

						// determine initial left position and right
						var leftPos = link.left-(tooltip.w/2-link.w/2);
						var rightPos = leftPos + tooltip.w;

						// log('leftPos: '+leftPos,1);
						// log('rightPos: '+rightPos,1);
						// log('screen.width: '+screen.width,1);





						// adjust left/right tooltip position if current is off screen
						if (tooltip.w > screen.width || leftPos < 0) { // flush left
							// log('flush left');
							var arrowLeft = link.left + link.w/2;
							$arrowStyle.html(arrowCSSSelectors+' {left: '+arrowLeft+'px;}');
							leftPos = 0;
						} else if (rightPos > screen.width) { // flush right
							// log('flush right');
							leftPos = (screen.width - tooltip.w); // keep as integer
							var arrowLeft = link.left + link.w/2 - leftPos;
							// log('arrowLeft: '+arrowLeft);
							$arrowStyle.html(arrowCSSSelectors+' {left: '+arrowLeft+'px;}');
							leftPos += 'px'; // add px
						} else { // default, centered behavior
							// log('default');
							$arrowStyle.empty();
						}

						// position tooltip
						$tooltip.css({
							position: 'absolute',
							'top' : tooltip.top,
							'left' : leftPos
						});

						$tooltip.fadeIn(Twc.Settings.tooltips.fadeInDuration, function() {
							$(this).hover();
						});
						tooltipOpen = true;
					}
					
					$me.click(function(e) {
						e.stopPropagation();
						return false;
					}).on('click mouseover', function() {
						cancelTooltipClose(mouseoutTimeoutId);
						if (tooltipOpen) {
							return;							
						}
						if (!appendedToDom) {
							// ie8 requires show() on dom insert and setTimeout. Otherwise, tooltip arrows don't show until DIV is moused over
							// opacity:0 prevents flash on screen before it's positioned where it should be.
							$('body').append($tooltip.css('opacity',0).show());
							appendedToDom = true;
							window.setTimeout(function() {
								showTooltip();
							},0);
						} else {
							showTooltip();
						}
					}).on('mouseout', function() {
						startTooltipClose();
					});
					$me.addClass(initializedClass);
				});
			} catch (e) {
				Twc.Util.catchError(e);
			}

		},

		closeAll : function() {
			$('.'+tooltipWrapperClass).hide();
		}
	}
}());/**
  *  Manages functionality the shopping cart
	* @author McGowan
	* @namespace
	*/
Twc.ShoppingCart = (function() {

	// instantiate all variables used in evalPosition function to optimize performance on resiging events (multiple function calls)

	var $window = $(window);

	var isInitialized = false;
	var isActive = false;

	/* The object we're floating.  Statically on top or absolute on bottom of it's boundary container
	 */
	var $floating;

	/** The floating object should never go outside of this
	  */
	var $floatingBoundaryContainer;

	/** the content section left of the floating object
	  */
	var $floatingBoundaryLeft;

	/** The section containing the floating object.  
	  */
	var $floatingBoundaryRight;

	/** Wraps the floating object for positioning assistance
      */
	var $floatingWrapper;

	var $cart;

	var $cartOpenButton;

	var activeClass = 'active';

	var floatTopClass = 'cart-float-top';
	var fixBottomClass = 'cart-fixed-bottom'; // this must trump floatTopClass in CSS
	var floatingTop;
	var floatingWrapperTop;
	var floatingBoundaryTop;
	var floatingBoundaryBottom;
	var scrollTop;
	var floatingHeight;
	var floatingBoundaryHeight;

	/** Resets the positioning to default
	  */
	function reset() {
		if (isInitialized && isActive) {
			Twc.Util.removeClass($floatingBoundaryContainer, floatTopClass);
			Twc.Util.removeClass($floatingBoundaryContainer, fixBottomClass);

			floatingHeight = null;
			floatingBoundaryHeight = null;

			isActive = false;
		}
	}

	return {
		init : function() {
			try {
				$floatingBoundaryContainer = $('.cart-boundary-wrapper');
				$floatingBoundaryLeft = $('.cart-boundary-left');
				$floatingBoundaryRight = $('.cart-boundary-right');
				$floatingWrapper = $('.cart-module-wrapper');
				$floating = $floatingWrapper.find('.new-services-cart-module');			
				$cart = $('.cart-module');
				$cartOpenButton = $('.user-options .cart');

				if ($floatingBoundaryContainer.length > 0 && $floatingWrapper.length > 0 && $floating.length > 0
					&& $cart.length > 0 && $cartOpenButton.length > 0
					) {

					// initialize header cart button
					var $cartButtonTrigger = $cartOpenButton.find('a');

					$cartButtonTrigger.click(function(e) {
						e.stopPropagation();
						if ($cart.length > 0) {
							if ($cartOpenButton.hasClass(activeClass)) { // hide
								Twc.ShoppingCart.close();
							} else { // show
								$cartOpenButton.addClass(activeClass);
								$cart.addClass(activeClass);
							}			
						}
						return false;
					});
					$cart.click(function(e) {
						e.stopPropagation();
					});



					floatingTop = $floating.offset().top;
					floatingWrapperTop = $floatingWrapper.offset().top;
					floatingBoundaryTop = $floatingBoundaryContainer.offset().top;
									
					if (!isInitialized) { // prevent multiple bindings
						$window.scroll(function(e) {
							Twc.ShoppingCart.evalPosition(true);
						});
					}

					isInitialized = true;
				}
			} catch (e) {
				Twc.Util.catchError(e);
			}
		},

		/** Evaluates the cart position and displays it appropriately.  This method should be called by any methods 
		  * affecting page height.  Currently called by slide up/down methods from other features
		  * @param isScrollEvent {Boolean} Signifies this is only a scroll event and we should not re-calculate heights.
		  */
		evalPosition : function(isScrollEvent) {
			if (!isInitialized) {
				return;
			}			

			if($floatingBoundaryContainer.css('position') === 'relative') { // we're in desktop breakpoint. tricky, but it works
				scrollTop = $window.scrollTop();
	
				// exit if content section is not higher than floating section
				if ($floatingBoundaryRight.height() > $floatingBoundaryLeft.height() ||
					$floatingWrapper.height() > $floatingBoundaryLeft.height()) {
					reset();
					return;
				}

				if (floatingTop <= scrollTop) { // fix the floating object at top
					Twc.Util.addClass($floatingBoundaryContainer, floatTopClass); // this drops processor from 85% to 25%.  Increases performance significantly
					isActive = true;

					// avoid height calls to improve performance
					if (floatingHeight == null || !isScrollEvent) {
						floatingHeight = $floating.outerHeight(true);
						floatingBoundaryHeight = $floatingBoundaryContainer.height();
					}

					// determine if user scrolled too far past boundary and affix float to bottom
					floatingBoundaryBottom = floatingWrapperTop+floatingBoundaryHeight-scrollTop;
					if (floatingBoundaryBottom <= floatingHeight) {
						Twc.Util.addClass($floatingBoundaryContainer, fixBottomClass);
					} else {
						Twc.Util.removeClass($floatingBoundaryContainer, fixBottomClass);
					}
				} else {
					reset();
				}
			} else {
				// reset if breakpoints are changing
				reset();
			}
		},

		updateData : function() {
			if (!isInitialized) {
				return;
			}
		},

		close : function() {
			if (isInitialized) {
				$cartOpenButton.removeClass(activeClass);
				$cart.removeClass(activeClass);
			}
		}
	}
}());/**
  *  Initialization routines for modal content that requires javascript to run when loaded.
  * @author McGowan
  * @namespace
  */
Twc.Modal.LoadInit = (function() {
	return {

		/**
		  * Test function for running when modal runs
		  * @author McGowan
		  * @param $content {Object} Modal content wrapper.  Work within this.
		  */
		_exampleModalTest : function($content) {

			var $msg = $('<div>JavaScript Initialized for this modal content</div>').hide().css({'border' : '2px dashed green', padding: '20px', 'color' : 'green' , 'font-size' : '1.5em', 'font-weight' : 'bold', 'text-align' : 'center', 'opacity' : '0'});
			$content.prepend($msg);
			$msg.slideDown(500, function() {
				$msg.animate({'opacity' : 1});
			});
		},

		/**
		  * Test function for running when modal runs
		  * @author McGowan
		  * @param $content {Object} Modal content wrapper.  Work within this.
		  * @returns nothing
		  */
		compareInternetEquipment : function($content) {
			// remove a tags
			$content.find('a').filter(':not(#mcg-message a)').contents().unwrap();

			// mark odd table rows to accomodate IE8
			$content.find('tr:nth-child(odd)').addClass('odd-row');
		}

	}
}());/** Date Picker Calendar to show users a month and choose a date
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
}());/** These options should not be set here and should be overridden with "new Twc.Calendar.Options()"
  * @class
  * @author McGowan
  */
Twc.Calendar.Options = function() {
	return {

		/** Force Calendar to use date provided as the current date.  This overrides users' computer clock
		  * @type String "YYYYMMDD"
		  */
		dateToday : Twc.Util.getDateInt(new Date()),

		/** Don't allow navigation previous months relative to dateToday
		  * @type Boolean
		  */
		excludePreviousMonthNav : 0,

		/** Restrict date selections to those available. 
		  * @type Boolean
		  */
		restrictToDatesAvailable : 0,

		/** should have keys like YYYYMMDD and a boolean value at a minimum.  value is not used.
		  */
		datesAvailable : {},

		/** All users to navigate past the last available date?
		  * @type Boolean
		  */
		restrictToLastDateAvailable : 0,

		/** Provide YYYYMMDD to restrict navigation.  Pre-pouplated for performance and iteration prevention
		  */
		lastDateAvailable : null,


		/** callback for when users select date. see {@link Twc.Calendar} for what is passed
		  */
		onDateSelect : null,

		/** top padding between top of calendar and bottom of text box
		  * @type Number
		  */
		topPadding: 2,

		/**
		  * jQuery selector to which we'll append the calendar elements.  Increase specificity to position
		  * within a div that maintains position on page height/width changes.
		  */
		appendToSelector: 'body'
	}
}/**
	* @author McGowan
	* @namespace Components Contains all of the component/module initialization routines, similar to Plug-Ins
	*/
Twc.Components = {};/**
  * Handles green/blue elements that have a checkbox or radio button within
  * @namespace
  * @author McGowan
  */
Twc.Components.InputButton = (function() {
	/** 
	  * marker to indicate container was initalized
	  * @author McGowan
	  */
	var initializedClass = 'js-inputButton-initialized';

	// group of radio buttons to operate on
	var radioWrapperGroups = {};

	function set($o, checked) {
		if (checked) {
			$o.addClass('checked');
		} else {
			$o.removeClass('checked');
		}

		// mcgowan - uncomment below for proposed future implementation. REQUIRES CSS changes
		// var textNode = $o.contents()[0];
		// var label = checked? "Selected " : "Select ";
		// if (textNode && textNode.nodeValue) textNode.nodeValue = label;
	}

	return {
		/** initializes a group of objects for showing blue/green checkboxes/radios.  Prevents double initalization.
		  * @param $objects {Object} jQuery object to iterate over, instantiating each within it.
		  * @author McGowan
		  */
		init : function($objects) {
			try {
				if (typeof $objects === 'undefined' || !($objects instanceof jQuery)) {
					error('$objects is not a jQuery object');
					return;
				}

				$objects.each(function(i) {
					var $this = $(this);

					if ($this.hasClass(initializedClass)) {
						error('Object already initialized: '+initializedClass);
						return true; // continue to next
					}

					var $checkbox = $this.find('input[type=checkbox],input[type=radio]');
					if ($checkbox.length != 1) {
						return true; // continue to next because we need a checkbox
					}

					// group all radio buttons for deselection when one is selected
					if ('radio' === $checkbox[0].type) {
						var radioName = $checkbox[0].name;

						var $group = radioWrapperGroups[radioName];
						if ('undefined' === typeof ($group)) {
							radioWrapperGroups[radioName] = $this;
						} else {
							radioWrapperGroups[radioName] = $group.add(this);
						}
					}

					$checkbox.on('change', function() {
						// deselect radios with same name
						if ('radio' === this.type) {
							var $radioGroup = radioWrapperGroups[this.name];
							if ('undefined' !== typeof $radioGroup) {
								$radioGroup.removeClass('checked');
							}
						}

						if (this.checked) {
							set($this,true);
						} else {
							set($this,false);
						}
					});

					// set initial color
					if($checkbox[0].checked) {
						set($this,true);
					} else {
						set($this,false);
					}
					$this.addClass(initializedClass);
				});
			} catch (e) {
				Twc.Util.catchError(e);
			}

		}
	}
})();


/**
  * @namespace
  * @author McGowan
  * @deprecated Use Twc.Components.InputButton
  */
Twc.Components.Checkbox = (function() {
	return {
		/** 
		  * @author McGowan
		  * @deprecated Please use Twc.Components.InputButton.init();
		  */
		init : function($objects) {
			Twc.Components.InputButton.init($objects);
		}
	}
})();
/**
	* Manages functionality for expandable/collapsable row sections
	* @author McGowan
	* @namespace RowExpander 
	*/
Twc.Components.RowExpander = (function() {
	/** 
	  * marker to indicate container was initalized
	  * @author McGowan
	  */
	var initializedClass = 'js-expander-initialized';


	/** Iterates through $rows and closes them all.
	  * @author McGowan
	  * @param $rows {Object} jQuery rows to close
	  */
	function closeRows($rows) {
		$rows.each(function(i) {
			var $row = $(this);
			var $section = $row.find('> section').stop(true,true);
			var $content = $section.find('> div').stop(true,true);
			$content.animate({'opacity' : 0}, 0, function() {
				// sliding up/down changes page and container height, so re-evaluate the floating cart
				clearTextSelection();				
				$section.slideUp({
					'duration' : Twc.Settings.accordianSlideDuration,
					'easing' : Twc.Settings.accordianSlideEasing,
					'step' : Twc.ShoppingCart.evalPosition,
					'complete' : function() {
						$row.removeClass('active');
						Twc.Analytics.dispatch('rowExpanderClosed', i, $row);
					}									
				});
			});

		});
	}

	function closeOpenRows($rows) {
		closeRows($rows.filter('.active'));
	}

	// removes text selected during double-click of expand/collapse
	function clearTextSelection() {
		var sel = window.getSelection ? window.getSelection() : document.selection;
		if (sel) {
		    if (sel.removeAllRanges) {
		        sel.removeAllRanges();
		    } else if (sel.empty) {
		        sel.empty();
		    }
		}
	}

	return {
		/** initializes a group of rows for expand/collapse.  Prevents double initalization.
		  * @author McGowan
		  * @param $rows {Object} jQuery object to iterate over, instantiating each row to show/hide the content within it
		  * @param [restrictOneRowOpen] {Boolean} only allow 1 row in $rows to be open at the same time.  Don't allow it to be closed
		  */
		initRows : function($rows, restrictOneRowOpen) {
			try {
				if (typeof $rows === 'undefined' || !($rows instanceof jQuery)) {
					error('$rows is not a jQuery object');
					return;
				}

				$rows.each(function(i) {
					var $row = $(this);
					if ($row.hasClass(initializedClass)) {
						error('Row already initialized: '+initializedClass);
						return true; // continue to next
					}

					// buttons with .aditional-form wrapper should allow click through to expand section.
					// clicking buttons should not expand/collapse row
					var $buttons = $row.find('.blue-button').click(function(e) {
						$me = $(this);
						if(!$row.hasClass('additional-form')) {
							e.stopPropagation();
						}
					});

					// open/close sections on click.  stop previous animations
					$row.find('> header').each(function(i) {
						var $header = $(this);
						var $section = $row.find('> section').stop(true,true);
						var $content = $section.find('> div').stop(true,true);
						var $radio = $header.find('input[type=radio]');


						// don't allow header links to go anywhere
						$header.find('a:not(.blue-button)').click(function(e) {
							e.preventDefault();
						});

						$header.on('click',function(e) {
							// double events occur of a label is clicked and an input is within.  Disallow this
							if(e.target.tagName !== 'INPUT' && (e.target.tagName === 'LABEL' || $(e.target).parents('label').size() > 0)) {
								return;
							}

							// don't allow interactivity if disabled
							if ($row.hasClass('disabled')) {
								return;
							}


							if ($row.hasClass('active')) { // close it
								// only close this if it doesn't have a radio that isn't a button
								if ($radio.size() === 0 || $radio.parents('label').hasClass('js-inputButton-initialized')) {
									closeRows($row);
								}
							} else {  // open it
								if (restrictOneRowOpen) {
									closeOpenRows($rows);
								}

								$content.css({opacity:0});
								$section.hide();
								$row.addClass("active");

								// sliding up/down changes page and container height, so re-evaluate the floating cart
								clearTextSelection();
								$section.slideDown({
									'duration' : Twc.Settings.accordianSlideDuration,
									'easing' : Twc.Settings.accordianSlideEasing,
									'step' : Twc.ShoppingCart.evalPosition,
									'complete' : function() {
										$content.animate({opacity: 1}, Twc.Settings.accordianFadeDuration, Twc.Settings.accordianFadeEasing);
										Twc.Analytics.dispatch('rowExpanderOpened', i, $row);
									}									
								});
							}
						});
					})
					$row.addClass(initializedClass);
				});
			} catch (e) {
				Twc.Util.catchError(e);
			}

		}
	}
})();/**
	* Manages functionality for expandable/collapsable table row within a table
	* @author McGowan
	* @namespace
	*/
Twc.Components.TableRowExpander = (function() {
	/** 
	  * marker to indicate container was initalized
	  * @author McGowan
	  */
	var initializedClass = 'js-table-expander-initialized'; 

	return {
		/** initializes a table.  Prevents double initalization.
		  * @author McGowan
		  * @param $tables {Object} jQuery object to iterate over, instantiating each table to show/hide the content within it
		  */
		initTable : function($tables) {
			try {
				if (typeof $tables === 'undefined' || !($tables instanceof jQuery)) {
					error('$tables is not a jQuery object');
					return;
				}
				$tables.each(function(t) {
					var $table = $(this);
					if ($table.hasClass(initializedClass)) {
						error('table already initialized: '+initializedClass);
						return true; // continue to next
					}


					var $rows = $table.find('tbody > tr');
					$rows.each(function(i) {
						var $row = $(this);
						if (i > 0 && $row.hasClass('details')) {
							var $prevRow = $rows.eq(i-1);
							var $rowToggle = $prevRow.find('.toggle');
							if ($rowToggle.length > 0) {
								$rowToggle.click(function(e) {
									var $rowContent = $row.find('p');
									if ($prevRow.hasClass('active')) { // close it

										// if the cart is floating, we must eavaluate it's position since the height is changing
										$rowContent.slideUp({
											'duration' : Twc.Settings.accordianSlideDuration,
											'step' : Twc.ShoppingCart.evalPosition,
											'complete' : function() {
												$prevRow.removeClass('active');
											}
										});
									} else { // open it
										$rowContent.hide(); // hide first to prep slide animation
										$prevRow.addClass('active');
										$rowContent.slideDown({
											'duration' : Twc.Settings.accordianSlideDuration,
											'step' : Twc.ShoppingCart.evalPosition
										});
									}
									return false; // prevent anchor change <a>
								});
							}
						}
					});

					$table.addClass(initializedClass);
				});
			} catch (e) {
				Twc.Util.catchError(e);
			}
		}
	}
})();/**
	* Top Questions that appear in the page header
	* @author McGowan
	* @namespace
	*/
Twc.Components.TopQuestions = (function() {
	/** 
	  * marker to indicate container was initalized
	  * @author McGowan
	  */
	var initializedClass = 'js-top-questions-initialized'; 

	var activeClass='active';

	var $questionsWrapper = null;


	return {
		/** initializes a container that contains tab rows and tabbed contentPrevents double initalization.  Assumes
		  * this is a responsive design that also handles expand/collapse sections within.
		  * @author McGowan
		  */
		init : function() {
			try {

				// initialize top Questions clicking. return false for all clickable items to prevent URL anchor
				$questionsWrapper = $('.questions');

				if($questionsWrapper.length === 0) {
					return;
				}
				if ($questionsWrapper.hasClass(initializedClass)) {
					error('Already initialized: '+initializedClass);
					return;
				}

				var $questionsList = $questionsWrapper.find('.question-list');
				var $questions = $questionsList.find('.addflyout');
				var $answers = $questionsList.find('.flyout');
				var $answerCloseButtons = $questionsList.find('.flyout a.close');

				$questionsWrapper.click(function(e) {
					var $me = $(this);
					$me.toggleClass(activeClass);
					$answers.removeClass(activeClass).css({left: 'auto'});
					e.stopPropagation(); // prevent document.click() callback
				});
				$questions.each(function(i) {
					var $q = $(this);
					$q.click(function(e) {
						$answers.stop(true,true);
						var $answer = $(this).parent().children('.flyout').css({left: '100%'});
						$answer.addClass(activeClass);
						$answer.animate({left: '0'}, Twc.Settings.topQuestionsSlideDuration);
						e.stopPropagation(); // prevent questions wrapper callback
						Twc.Analytics.dispatch('topQuestionsClick', i, $q);
						return false;
					});
				});
				$answers.click(function(e) {
					e.stopPropagation(); // prevent click through callbacks					
				});
				$answerCloseButtons.click(function(e) {
					$answers.filter('.active').animate({left:'100%'}, Twc.Settings.topQuestionsSlideDuration, function() {
						$(this).removeClass(activeClass);
					});
					e.stopPropagation(); // prevent click through callbacks					
					return false;			
				});


				$questionsWrapper.addClass(initializedClass);
			} catch (e) {
				Twc.Util.catchError(e);
			}
		},

		/** Closes top questions.
		  * @author McGowan
		  */
		close : function() {
			try {
				if($questionsWrapper.length > 0) {
					$questionsWrapper.removeClass(activeClass);
				}
			} catch (e) {
				Twc.Util.catchError(e);
			}

		}
	}
})();/**
	* Manages functionality content with tabs
	* @author McGowan
	* @namespace
	*/
Twc.Components.Tabs = (function() {
	/** 
	  * marker to indicate container was initalized
	  * @author McGowan
	  */
	var initializedClass = 'js-tabs-initialized'; 

	// the tabs users click
	var $tabs;

	// the content panels/sections for each tab
	var $tabSections;

	// Activate a specific tab, but not content
	function activateTab(i) {
		$tabs.removeClass('active').eq(i).addClass('active');
	}

	// Activate specific tab content, but not the tab itself
	function activateTabSection(i, disableTabHeightAnimation) {
		// don't animate container height changes if not in desktop
		if (disableTabHeightAnimation || Twc.Breakpoint.which() !== 'desktop') {
			$tabSections.removeClass('active').eq(i).addClass('active');
			Twc.ShoppingCart.evalPosition();
		} else { // animate
			// get height of active tab content. set tab we're showing to be that min-hight, and animate closed.  prevents page jumping.
			var $activeTabContent = $tabSections.filter('.active').find('section');
			var activeTabContentH = $activeTabContent.outerHeight();

			var $tabPanel = $tabSections.removeClass('active').eq(i);
			var $tabContent = $tabPanel.find('section').stop(true,false).css({'min-height' : activeTabContentH+'px', opacity: 0});
			$tabPanel.addClass('active');
			$tabContent.animate({'min-height' : 0}, {
				'queue' : false,
				'duration' : Twc.Settings.tabShrinkDuration,
				'easing' : 'swing',
				'step' : Twc.ShoppingCart.evalPosition
			});
			$tabContent.animate({opacity : 1}, Twc.Settings.tabFadeInDuration, Twc.Settings.tabFadeInEasing);
		}
	}

	// this runs when layout switches to desktop.
	function changeToDesktop() {
		var activeSection = 0;

		// find the first active tab section and mark that tab active, closing all others
		$tabSections.each(function(i) {
			if ($tabSections.eq(i).hasClass('active')) {
				activeSection = i;
				return false;
			}
		});
		activateTab(activeSection);
		activateTabSection(activeSection, true);
	}

	return {
		/** initializes a container that contains tab rows and tabbed contentPrevents double initalization.  Assumes
		  * this is a responsive design that also handles expand/collapse sections within.
		  * @author McGowan
		  * @param $o {Object} jQuery containing tabs and tabbed content within
		  */
		init : function($o) {
			try {
				if (typeof $o === 'undefined' || !($o instanceof jQuery)) {
					error('$o is not a jQuery object');
					return;
				}
				if ($o.hasClass(initializedClass)) {
					error('Already initialized: '+initializedClass);
					return;
				}

				$tabs = $o.find('.tab-nav li');
				$tabSections = $o.find('.collapsible');

				if ($tabs.size() !== $tabSections.size() || $tabs.size() === 0) {
					error('Tabs and tab sections must be equal and greater than zero');
					return;
				}


				// responsive design shows tabs as expand/collapse.  Make them behave properly
				Twc.Components.RowExpander.initRows($tabSections);

				$tabs.each(function(i) {
					var $link = $tabs.eq(i).find('a');

					$link.click(function(e) {
						activateTab(i);
						activateTabSection(i, false);
						return false;  // prevent anchor change
					});
				});

				Twc.Breakpoint.init();
				Twc.Breakpoint.onChangeToDesktop(changeToDesktop);

				$o.addClass(initializedClass);
			} catch (e) {
				Twc.Util.catchError(e);
			}
		}
	}
})();/**
  * Shows a view more/less link with a preview-text and remaining-text section that expands/collapses
  * @namespace
  * @author McGowan
  */
Twc.Components.ViewMore = (function() {
	/** 
	  * marker to indicate container was initalized
	  * @author McGowan
	  */
	var initializedClass = 'js-viewMore-initialized';

	return {
		/** initializes a group of objects for view more/less.  Prevents double initalization.
		  * @param $objects {Object} jQuery object to iterate over, instantiating each within it.  Each object must either have .preview-text and .remaining-text or a <ul>
		  * @author McGowan
		  */
		initObjects : function($objects) {
			try {
				if (typeof $objects === 'undefined' || !($objects instanceof jQuery)) {
					error('$objects is not a jQuery object');
					return;
				}

				$objects.each(function(i) {
					var $this = $(this);

					if ($this.hasClass(initializedClass)) {
						error('Twc.Components.ViewMore.initObjects(): Object already initialized: '+initializedClass);
						return true; // continue to next
					}

					// we're either targeting a section with .remaining-text or a <ul>
					var $content = $this.find('.remaining-text, .js-view-more-content');
					if ($content.size() === 0) {
						$content = $this.find('ul');
					}

					// control button is either <a> or a <div> wrapping <a>
					var $controlLink = $this.find('.view-toggle, .js-view-more-toggle');
					var $controlWrapper = $controlLink;
					if (!$controlLink.is('a')) { // link and wrapper are identical
						$controlLink = $controlWrapper.find('a');
					}


					if ($content.size() !== 1 || $controlLink.size() !== 1) {
						error("Twc.Components.ViewMore.initObjects(): Required elements not found");
						return true; // continue to next and don't instantiate
					}

					// set more/less text for the control button. default to Settings.js file
					var options = Twc.Util.safeParseJson($this.attr('data-view-more'));

					var viewMore = options.viewMore || Twc.Settings.viewMore.moreHtml;
					var viewLess = options.viewLess || Twc.Settings.viewMore.lessHtml;


					// set initial button text
					if ($this.hasClass('active')) {
						$controlLink.html(viewLess);
					} else {
						$controlLink.html(viewMore);
					}

					$controlWrapper.click(function() {
						$content.stop(true,true);
						if ($this.hasClass('active')) { // close it
							$content.slideUp({
								'duration' : Twc.Settings.accordianSlideDuration,
								'easing' : Twc.Settings.accordianSlideEasing,
								'step' : Twc.ShoppingCart.evalPosition,
								'complete' : function() {
									$this.removeClass('active');
									$controlLink.html(viewMore);
								}																	
							});
						} else { // open it
							$content.slideDown({
								'duration' : Twc.Settings.accordianSlideDuration,
								'easing' : Twc.Settings.accordianSlideEasing,
								'step' : Twc.ShoppingCart.evalPosition,
								'complete' : function() {
									$this.addClass('active');
									$controlLink.html(viewLess);
								}																	
							});
						}

						return false; // prevent anchor if href="#"
					});

					$this.addClass(initializedClass);
				});
			} catch (e) {
				Twc.Util.catchError(e);
			}

		}
	}
})();