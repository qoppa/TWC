// Accordion Menu
  	$('.expandable ul li').each(function(index){
		if($(this).has('ul').length){
			$(this).addClass('expandable');
		} else {
			$(this).addClass('notexpandable');
		}
				
		//check for expand cookie and slideDown() active 
		if($.cookie('expand') && $(this).find('h6').text() == $.cookie('expand')){
			$(this).find('ul').slideDown();
		}
	});
	
	//open first nav item if no cookie exists
	if(!$.cookie('expand')){
		$('.expandable ul .expandable').first().addClass('active').find('ul').slideDown();
	}
	
	$('h6').click(function(){
		categoryText = $(this).text();
		$(this).parent().addClass('active').find('ul').slideToggle(function(){
			$.cookie('expand',categoryText);
			if($(this).is(':hidden')){
				$(this).parent().removeClass('active');
				$.cookie('expand',null);
			}
		});
	});