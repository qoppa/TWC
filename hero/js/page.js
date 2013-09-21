// Place page specific jQuery here

			$(function(){
				$('#carouSell').carouFredSel({
					width: '100%',
					items: {
						visible: 3,
						start: -1
					},
					scroll: {
						items: 1,
						duration: 1000,
						timeoutDuration: 5000
					},
					prev: '#carouSell-prev',
					next: '#carouSellnext',
					pagination: {
						container: '#carouSell-pager',
						deviation: 1
					}
				});
				
				$(document).ready(function() {
					$('#lowSlider').jcarousel({
						scroll: 1,
						wrap: 'circular'
					});
				});

			});