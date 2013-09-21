/**
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
})();