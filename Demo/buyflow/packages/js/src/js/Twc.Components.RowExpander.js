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
})();