/**
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
})();