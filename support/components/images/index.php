<?
if($_SERVER['REQUEST_URI'] !== '/TWC/styleguide/') {
	include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php');
} 
?>

	<style>
		.monkey {
			height: 250px;
			background: url(images/monkey.png);
			background-size: auto;
			background-position: 85% 15%; }
	</style>
				<div class="monkey image-bordered"></div>
    
<?
if($_SERVER['REQUEST_URI'] !== '/TWC/styleguide/') {
	include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php');
} 
?>