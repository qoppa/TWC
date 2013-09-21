/**
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
}());