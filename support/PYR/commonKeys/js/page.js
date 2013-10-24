var totalModals = $('.modal-container').length - 1;

$('.modal-container').each(function(index, element){
	if(index == 0){
		$(this).find('.modal-prev').hide();
	} else if(index == totalModals){
		$(this).find('.modal-next').hide();
	}
});