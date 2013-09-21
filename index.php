<?
$dir_name = '../TWC/';

$dir = opendir($dir_name);

$file_list = '<ul>';

	while ($file_name = readdir($dir)) {
		if (($file_name != ".") && ($file_name != "..")) {
			$file_list .= "<li>$file_name";
		}
	}
$file_list .= '</ul>';

closedir($dir);
?>	

<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>
	
	<? 
		echo "$file_list";	
	?>		
		
<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>

