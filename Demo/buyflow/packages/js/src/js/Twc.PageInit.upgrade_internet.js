/**
  * Initializes upgrade Internet service page
  * @author McGowan
  *
  */
Twc.PageInit.upgrade_internet= function() {
	log('PageInit.upgrade_internet()');
	Twc.Components.RowExpander.initRows($('.plans .collapsible, .internet-customize-accordion .collapsible'));
	Twc.Components.RowExpander.initRows($('.cart-module .collapsible')); // init right-rail cart
}
