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
