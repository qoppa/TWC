/**
  * Initializes Billing page
  * @author McGowan
  *
  */
Twc.PageInit.billing= function() {
	log('PageInit.billing()');

	$(window).on('message', function(e) {
		var data = Twc.Util.safeParseJson(e.originalEvent.data);

		if ('undefined' !== typeof data.iFrameHeight) {
			$('.billing-iframe').height(data.iFrameHeight);
		}

		// passthru iframe clicks as document clicks (to close open menus, etc);
		if (data.event === 'iFrameDocumentClick') {
			$(document).click();
		}
	});
};

Twc.PageInit.billing_pci = function() {
	log('PageInit.billing_pci()');
	Twc.PageInit.billing();
};

Twc.PageInit.billing_iframe = function() {
	log('PageInit.billing_iframe()');

	function ilog(s) {
		log('IFRAME: '+s);
	}

	$(window).on('resize', function() {
		setParentHeight();
		ilog('width: '+$('#iframe-content').outerWidth(true));
	}).click(function() { // propogate iframe document clicks to parent
		var message = {
		    "event" : "iFrameDocumentClick"
		};
		window.parent.postMessage(JSON.stringify(message),'*');		
	});


	function setParentHeight() {
		var h = $('#iframe-content').outerHeight(true);
		// ilog('setting parent iFrame height: '+h);
		// window.top.setIframeHeight(h);
		var message = {
		    "iFrameHeight" : h
		};
		window.parent.postMessage(JSON.stringify(message),'*');
	}
	$(document).ready(function() {
		ilog('document.ready()');
		setParentHeight();
	});
	$(window).on('load',function() {
		ilog('window.load()');
		setParentHeight();
	});

};
