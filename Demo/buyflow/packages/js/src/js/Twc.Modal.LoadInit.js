/**
  *  Initialization routines for modal content that requires javascript to run when loaded.
  * @author McGowan
  * @namespace
  */
Twc.Modal.LoadInit = (function() {
	return {

		/**
		  * Test function for running when modal runs
		  * @author McGowan
		  * @param $content {Object} Modal content wrapper.  Work within this.
		  */
		_exampleModalTest : function($content) {

			var $msg = $('<div>JavaScript Initialized for this modal content</div>').hide().css({'border' : '2px dashed green', padding: '20px', 'color' : 'green' , 'font-size' : '1.5em', 'font-weight' : 'bold', 'text-align' : 'center', 'opacity' : '0'});
			$content.prepend($msg);
			$msg.slideDown(500, function() {
				$msg.animate({'opacity' : 1});
			});
		},

		/**
		  * Test function for running when modal runs
		  * @author McGowan
		  * @param $content {Object} Modal content wrapper.  Work within this.
		  * @returns nothing
		  */
		compareInternetEquipment : function($content) {
			// remove a tags
			$content.find('a').filter(':not(#mcg-message a)').contents().unwrap();

			// mark odd table rows to accomodate IE8
			$content.find('tr:nth-child(odd)').addClass('odd-row');
		}

	}
}());