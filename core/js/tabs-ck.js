$(".tabs li").click(function(){var e=$(this).find("a").attr("href");$(".tabs li").removeClass("active");$(".tab-content").hide();$(this).addClass("active");$(e).show();return!1});