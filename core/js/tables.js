var windowTimer = null;

resizeTable();

$(window).bind('resize',function(){		
	if($(window).width() <= 500){
		if(windowTimer) clearTimeout(windowTimer);
		windowTimer = setTimeout(resizeTable, 150);
	}
});

function resizeTable(){
	var tHeaders = new Array();
	$("th").each(function(i){
		i = i + 1;
		tHeaders[i] = $(this).text();
 });

 	$('tr').each(function(a){
	 	$('tr td:nth-of-type('+a+')').attr('data-content',tHeaders[a]);
 	});	
}