<?php

// Include all needed template pieces
	
	// Load Header -- includes TopHat
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/head.php');
	
	// Load Browser Alerts
	if ($browserAlerts) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/browserAlerts.php');
	}
	
	// Load TopHat
	if ($tophat) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/tophat.php');
	} 
	
	// Load Logo-only Header
	if ($logoHeader) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/logoHeader.php');
	} 

	// Load Main Nav -- Mega-Menu
	if ($nav == true) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/nav.php');
	} 

	// Load SubNav if present
	if ($subnav == true) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/subnav.php');
	}
	
	// Load SubNav if present
	if ($simpleNav == true) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/simpleNav.php');
	}

	// Conditionally Load Alert if required
	if ($alert == true) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/alert.php');
	}
	
	// Conditionally Load Banner if required
	if ($banner == true) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/banner.php');
	} 

	// Load Supprt Pages Search 
	if ($supportSearch == true) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/supportSearch.php');
	}
	
	// Conditionally Load Carousel if required
	if ($carousel == true) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/carousel.php');
	} 

	// Load Content opening tags
	if ($content == true) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/content.php');
	}
	
    // Conditionally Load Slider if required
	if ($slider == true) {
		include_once($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/slider.php');
	} 

?>
