
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
    
    $("a.blue-button").click(function(event){
        event.preventDefault();
    });	    

// Page scrolling
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
            || location.hostname == this.hostname) {
        
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
               if (target.length) {
                 $('html,body').animate({
                     scrollTop: target.offset().top
                }, 1600);
                return false;
            }
        }
    });

});