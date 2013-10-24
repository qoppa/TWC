// Place page specific jQuery here
$(function() {
    $('.tabs li:first').addClass('active');
    $('.tabs li').click(function() {
        $('.tabs ul li').removeClass('active');
        $(this).addClass('active');
        var currentTab = $(this).children('a').attr('href');
        $('div[id*="-access"]').hide();
				
        $(currentTab).show();
        // Swap out banner text
        var $banner = $('h2.banner');
        if ($banner.text() == "Sign in to Access TWC WiFi") {
            $banner.text("Connect with a TWC Access Pass or try out TWC WiFi with a FREE trial!");
        } else {
            $banner.text("Sign in to Access TWC WiFi");
        }
        return false;
    });
    $('li.expand-box').click(function() {
        $(this).toggleClass('expanded').children('ul').slideToggle();
        return false;
    });

    function sentUserAgent() {
        //determines agent variable based on window resize()
        if ($(window).width() > 1099) {
            agentVar = 'desktop';
        } else if ($(window).width() > 500 && $(window).width() < 1099) {
            agentVar = 'tablet';
        } else if ($(window).width() < 499) {
            agentVar = 'phone';
        }
        //post user agent variable based on last resize()			
        $.ajax({
            type: "post",
            url: 'http://www.url.com',
            data: 'agent=' + agentVar,
            success: function() {
                alert('posted user agent');
            }
        });
    };
    var resizeTimer = null;
    $(window).bind('resize', function() {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(sentUserAgent, 150);
    });
});