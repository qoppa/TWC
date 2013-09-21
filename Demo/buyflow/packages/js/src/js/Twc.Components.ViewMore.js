/**
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