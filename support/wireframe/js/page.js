// Set all divs in a row to tallest div height when row has class of 'equalize'

/*
function equalHeight(group) {
	tallest = 0;
	group.each(function() {
		thisHeight = $(this).height();
		if (thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	group.height(tallest);
}

$('.equalize').each(function() {
	equalHeight($(this).children('.parsys_column'));
});
*/

$('#equalize').equalize({children: '.parsys_column'});