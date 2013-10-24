// View moreLess
$('.viewDetail').click(function(){
	var obj = $(this);
	
	$(this).next().slideToggle(function(){
		obj.toggleClass('active');		
	});
	
	return false;
});