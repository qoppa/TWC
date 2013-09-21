/**
  * Initializes select service pages
  * @author McGowan
  *
  */
Twc.PageInit.select_service= function() {
	log('PageInit.select_service()');
	Twc.Components.RowExpander.initRows($('.plans > .collapsible'));
	Twc.Components.RowExpander.initRows($('.cart-module .collapsible')); // init right-rail cart

	$('.plans > .collapsible li.last a').click(function(){
	    var productName = $(this).parents("ul").attr("data-name");
	    Twc.Analytics.dispatch('cartAdd', productName);
	});
}
