
// Checkbox button action
$(function() {
	
	// Determine if input is already 'checked' on page load/reload
	$('label').filter(function() {
    	return $(this).find('input').is(':checked');
    }).addClass('checked');
	
	$('input').click(function () {
        $('input:not(:checked)').parent('label').removeClass("checked");
        $('input:checked').parent('label').addClass("checked");
    });
    
    $("a.btn").click(function(event){
        event.preventDefault();
    });	    

});