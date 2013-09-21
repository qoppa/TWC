/**
  * Initializes customize tv pages
  * @author McGowan
  */
Twc.PageInit.customize_tv = function() {
	log('PageInit.customize_tv()');

	Twc.Components.RowExpander.initRows($('.cart-module .collapsible')); // init right-rail cart

	// only mark first-level .collapsible for initilization.  Child .collapsible require special treatement
	var $rows = $('.tv-customize-accordion > .collapsible');
	Twc.Components.RowExpander.initRows($rows);

	// Select TV Equip has inner collapsibles
	Twc.Components.RowExpander.initRows($rows.eq(0).find('.collapsible'));

	// initialize the tabs
	Twc.Components.Tabs.init($('.tv-customize-accordion .tabs'));

	// initialize the tables that have detail rows that expand
	Twc.Components.TableRowExpander.initTable($('table.premiums, table.sports, table.sports-pass'));

	// view more/less sections
	Twc.Components.ViewMore.initObjects($('.js-view-more'));



	// Select boxes that show updates
	$('.quantity select').each(function(i) {
		var $this = $(this);
		var $wrapper = $this.parent('.quantity');
		var $msg = $wrapper.find('.confirm');
		$this.on('change', function(e) {
			var val = $this[0].value;
			if (isNaN(val)) {
				$msg.animate({'opacity':0});
				return;
			}

			if ($msg.length == 0) { // message doesn't exist, slide to show
				$msg = $('<div class="confirm"><span>Cart Updated</span></div>').hide();
				$wrapper.append($msg);
				$msg.fadeIn();
			} else { // message aleady exists, use fade indication
				$msg.fadeOut(function() {
					$msg.css({'opacity': 1});
					$msg.html('<span>Cart Updated</span>');
					$msg.fadeIn();
				});
			}
		})
	});
}
