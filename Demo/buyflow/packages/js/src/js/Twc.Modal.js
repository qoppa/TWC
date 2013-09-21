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
}());