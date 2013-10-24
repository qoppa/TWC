// Page Specific JS Functions

$(function() {   
	if(isIE(8)){
		$(window).bind("load", function() {
    		$('.AtoZ_container ul').columnize({ columns: 4 }); 
			$('.AtoZ_container').show();
		});
	}
});


function isIE( version, comparison ){
    var $div = $('<div style="display:none;"/>').appendTo($('body'));
    $div.html('<!--[if '+(comparison||'')+' IE '+(version||'')+']><a>&nbsp;</a><![endif]-->');
    var ieTest = $div.find('a').length;
    $div.remove();
    return ieTest;
}