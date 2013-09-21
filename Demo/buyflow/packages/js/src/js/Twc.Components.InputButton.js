/**
  * Handles green/blue elements that have a checkbox or radio button within
  * @namespace
  * @author McGowan
  */
Twc.Components.InputButton = (function() {
	/** 
	  * marker to indicate container was initalized
	  * @author McGowan
	  */
	var initializedClass = 'js-inputButton-initialized';

	// group of radio buttons to operate on
	var radioWrapperGroups = {};

	function set($o, checked) {
		if (checked) {
			$o.addClass('checked');
		} else {
			$o.removeClass('checked');
		}

		// mcgowan - uncomment below for proposed future implementation. REQUIRES CSS changes
		// var textNode = $o.contents()[0];
		// var label = checked? "Selected " : "Select ";
		// if (textNode && textNode.nodeValue) textNode.nodeValue = label;
	}

	return {
		/** initializes a group of objects for showing blue/green checkboxes/radios.  Prevents double initalization.
		  * @param $objects {Object} jQuery object to iterate over, instantiating each within it.
		  * @author McGowan
		  */
		init : function($objects) {
			try {
				if (typeof $objects === 'undefined' || !($objects instanceof jQuery)) {
					error('$objects is not a jQuery object');
					return;
				}

				$objects.each(function(i) {
					var $this = $(this);

					if ($this.hasClass(initializedClass)) {
						error('Object already initialized: '+initializedClass);
						return true; // continue to next
					}

					var $checkbox = $this.find('input[type=checkbox],input[type=radio]');
					if ($checkbox.length != 1) {
						return true; // continue to next because we need a checkbox
					}

					// group all radio buttons for deselection when one is selected
					if ('radio' === $checkbox[0].type) {
						var radioName = $checkbox[0].name;

						var $group = radioWrapperGroups[radioName];
						if ('undefined' === typeof ($group)) {
							radioWrapperGroups[radioName] = $this;
						} else {
							radioWrapperGroups[radioName] = $group.add(this);
						}
					}

					$checkbox.on('change', function() {
						// deselect radios with same name
						if ('radio' === this.type) {
							var $radioGroup = radioWrapperGroups[this.name];
							if ('undefined' !== typeof $radioGroup) {
								$radioGroup.removeClass('checked');
							}
						}

						if (this.checked) {
							set($this,true);
						} else {
							set($this,false);
						}
					});

					// set initial color
					if($checkbox[0].checked) {
						set($this,true);
					} else {
						set($this,false);
					}
					$this.addClass(initializedClass);
				});
			} catch (e) {
				Twc.Util.catchError(e);
			}

		}
	}
})();


/**
  * @namespace
  * @author McGowan
  * @deprecated Use Twc.Components.InputButton
  */
Twc.Components.Checkbox = (function() {
	return {
		/** 
		  * @author McGowan
		  * @deprecated Please use Twc.Components.InputButton.init();
		  */
		init : function($objects) {
			Twc.Components.InputButton.init($objects);
		}
	}
})();
