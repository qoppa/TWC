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
