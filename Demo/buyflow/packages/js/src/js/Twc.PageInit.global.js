/**
  * Runs on all pages.
  *	@author McGowan
  * @function
  */
Twc.PageInit.global = function() {
	// close any pop-up content if document is clicked.  pop-up content should call e.stopPropogation to prevent this from executing
	$(document).click(Twc.Util.closeOpenInteractives);

	Twc.Modal.initLinks($('a.modal'));
	Twc.Tooltip.init($('a.tooltip'));
	Twc.Components.TopQuestions.init();

	Twc.ShoppingCart.init();

	Twc.DevOnly.prepPage();

	// view more/less disclaimers
	Twc.Components.ViewMore.initObjects($('.disclaimer'));
}
