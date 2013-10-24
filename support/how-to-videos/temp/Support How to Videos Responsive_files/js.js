
(function ($elc, window, document) { //ignore jslint

	$elc.classes.ControllerUI = $elc.classes.ControllerUI.extend({
		handleInputFocus: function (e) {
			var _ = this;
			_._super(e);
			if (_.app.config.get("id") === "support") {
				_.scrollInputToTopOfScreen();
			}
		},
		scrollInputToTopOfScreen: function () {
			var _ = this, top, searchBoxOffset, searchBoxHeight;
			searchBoxOffset = _.$(_.app.config.get("searchFormSelector")).offset().top - 20;
			searchBoxHeight = _.$(_.app.config.get("searchFormSelector")).height() + 20;
			//offset = searchBoxHeight + 600; // max height of results
			top = searchBoxOffset;// - (_.$(window).height() - offset);

			if (top > searchBoxOffset) {
				top = searchBoxOffset;
			}
			//$elc.log("top:" + top + " offset:" + offset + " winheight:" + _.$(window).height() + " searchBoxOffset:" + searchBoxOffset + " searchBoxHeight:" + searchBoxHeight);
			_.$('body,html').animate({
				scrollTop: top
			}, 300);
		}
	});

	$elc.classes.ViewResultWide = $elc.classes.ViewResultWide.extend({
		applyMatchPostRender: function ($match, cat, d) {
			var _ = this;
			_._super($match, cat, d);
			if ($match.hasClass("elc-resultItem-footer")) {
				$match.find(".elc-matchDesc")
					//.append($match.find(".elc-matchDesc").text()) // for testing long desc
					.append("<div class='elc-matchDesc-arrow'></div>");
			}
		}
	});

	//
	// TRACKING WITH OMNITURE
	// filter in http proxy tool using "goodyeartires." as a filter
	//
	var isTrackingEnabled = true, isTrackingLoggingEnabled = true, //ignore jslint
		trackingLastEvent, s_elc_omniture, s_local = {}, isDuplicate = false;

	
	if (isTrackingEnabled) {

		//
		// ELICIT API
		//
		window.$ela = window.$ela || [];

		//
		// RESULT CLICKED EVENT
		//
		window.$ela.push(['_addEventListener', 'click.result.elc', function (e) {
			isDuplicate = false;
			var term;
			window.$ela.push(['_log', 'client ELICIT CLICK keyword: "' + e.keyword + '", input: "' + e.input + '", category: "' +
				e.category + '", title: "' + e.title + '" titleSub:"' + e.titleSub + "' url: " + e.url + ' totalResults: ' + e.totalResults + ' indexOfResult: ' + e.indexOfResult + ", appId:" + e.appId]);

			//suppress muliptle tracking events
			if (trackingLastEvent !== undefined &&
				e.url === trackingLastEvent.url &&
				e.title === trackingLastEvent.title &&
				e.term === trackingLastEvent.term &&
				e.appId === trackingLastEvent.appId
				) {
				isDuplicate = true;
				return; //exit - this causes too much spamming
			}
			trackingLastEvent = e;
			term = e.keyword;
			
			assignTrackingValues();
			assignOmnitureValues(s_local, term, e.totalResults, isDuplicate);
			executeTracking();

		}]);


		//
		// NO SEARCH RESULTS EVENT
		//		
		window.$ela.push(['_addEventListener', 'noresults.result.elc.result.elc', function (e) {
			window.$ela.push(['_log', 'client ELICIT HAS NO RESULTS: "' + e.input + '", number of results: ' + e.totalResults]);
			//suppress muliptle tracking events'
			isDuplicate = false;
			if (trackingLastEvent !== undefined &&
				e.input === trackingLastEvent.input &&
				e.appId === trackingLastEvent.appId
				) {
				isDuplicate = true;
				return; //exit - this causes too much spamming
			}
			trackingLastEvent = e;

			assignTrackingValues();
			assignOmnitureValues(s_local, e.input, 'zero', isDuplicate);
			executeTracking();
		}]);


	}
	//
	// TRACKING UTILS
	//
	function assignOmnitureValues(
		s,				// ominiture S tracking object
		term,			// search term (raw input)
		numResults,		// number of results
		isDuplicate		// duplicate request
	) {
		if (typeof isDuplicate === "undefined") {
			isDuplicate = false;
		}
		if (!isDuplicate) {
			s.linkTrackVars = 'prop18,eVar18,prop55,eVar60,events';
			s.linkTrackEvents = 'event50';
		}
		s.events = 'event50';
		s.prop18 = s.eVar18 = 'suggested search:' + term;
		s.prop55 = s.eVar60 = numResults;
		return s;
	}
	function assignTrackingValues() {
		s_local = {};
		/*if ($elc.util.getQS()["elc-staging"] == "true") {
			s_account_id = "test";
		}*/
		
		if (window.s !== undefined) {
			s_local = window.s;

		} else {
			// local debugging version
			s_local = {};
			s_local.tl = function () {
				try {
					//window.console.dir(s_local);
				} catch (e) {
					//nothing
				}
			};
		}
	}
	function executeTracking() {
		//merge s_local into global
		s_elc_omniture = window.$ela.$.extend(s_elc_omniture, s_local);

		// output S to console for debugging
		try {
			window.console.log("ELICIT TRACKING LOCAL OBJECT");
			if (isTrackingLoggingEnabled) {
				window.console.dir(s_local);
				//window.console.log("ELICIT TRACKING GLOBAL OBJECT");
				//window.console.dir(s_elicit_gdyr);
			}
		} catch (e) {
			//nothing
		}

		// send
		try {
			s_elc_omniture.tl(window, 'o', 'elicit search');
			s_elc_omniture.linkTrackVars = 'None';
			s_elc_omniture.linkTrackEvents = 'None';

		} catch (err) {
			processErr(err);
		}


	}
	function processErr(err) {
		if (window.console !== undefined && window.console.log !== undefined) {
			window.console.log("elicit analytics parsing error: " + err.message);
		}
	}
	/*
	function trimArr(arr) {
		var arr2 = [], i = 0;
		for (i; i < arr.length; i += 1) {
			if (arr[i] === undefined) {
				break;
			}
			arr2.push(arr[i]);
		}
		return arr2;
	}
	function deleteUndefinedSValues(s, arr) {
		var i = 0;
		for (i; i < arr.length; i += 1) {
			if (s[arr[i]] === undefined) {
				delete s[arr[i]];
			}
		}
	}
	*/
})($elc, window, document);
	
;var elc_options_dynamic={clientJsTagAbsoluteURI:"http://twc.elicitapp.com/js.ashx?v=5.1&f=elicit.client.web.js&b=09232013142627"};