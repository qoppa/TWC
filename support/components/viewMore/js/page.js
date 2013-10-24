$(function(){
	$('.viewDetail').click(function(){
		var obj = $(this);
		
		$(this).next().slideToggle(function(){
			obj.toggleClass('active');		
			if($(this).is(':hidden')){
				obj.text('View More');
			} else {
				obj.text('View Less');
			}
		});
		
		return false;
	});
});