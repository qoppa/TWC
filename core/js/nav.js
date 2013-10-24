// deselect mobile nav menu dropdowns when other is selected 
$('input[name=navradio]').click(function(e) {  
	var radChecked = $(this).data('checked') || false;
	$('input[name=navradio]').data('checked', false);
	if (radChecked) {
			this.checked = false;
			$(this).data('checked', false);
	} else {
		 this.checked = true;
		 $(this).data('checked', true);
	}
});