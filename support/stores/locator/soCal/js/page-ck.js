// Place page specific jQuery here
$(function(){$(".tabs li:last").addClass("active");$("input").change(function(){var e=$(this).attr("id");$(this).is(":checked")?$(".legend_icons").find("."+e).parent().removeClass("muted"):$(".legend_icons").find("."+e).parent().addClass("muted")});document.documentElement.clientWidth<=1099&&$(".locate-stores-filters legend").click(function(){$(".filter-section").slideToggle("slow",function(){});$(this).toggleClass("rotate_chevron")})});var selected_tab=$(this).find("a").attr("href");$(selected_tab).show();