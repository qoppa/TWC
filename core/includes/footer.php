<?php 
	
	// Load End Content closing tags
	if ($content == true) {
		include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/endContent.php');
	}
	
	// Load Footer
	if ($footer) {
		include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/foot.php'); 
	}
	
	// Load Footer_v2
	if ($footer_v2 == 'true') {
		include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/foot_v2.php'); 
	}
	
	// Load Footer_v3
	if ($footer_v3 == 'true') {
		include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/foot_v3.php'); 
	}
	
	// Load Custom Footer
	if ($customFooter) {
		include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/customFooter.php'); 
	}
	
	// Conditionally Load Sticky Footer if required
	if ($stickyFooter == true) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/stickyFooter.php');
	}
	
	// Close the page
		include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/close.php'); 
	
?>