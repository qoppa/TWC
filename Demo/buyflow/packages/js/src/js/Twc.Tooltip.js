/**
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
}());