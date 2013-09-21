<?php 

// Set Page variable values
	
	// header.php variables
		// Page Title
		$title = 'Online Styleguide';
	
		// Page Description
		$description = 'Guidance for developing web content for Time Warner Cable';
	
		// Page Specific Keywords
		$keywords = 'style guide, css, typography';
		
		// Body ID tag
		$body_ID = 'styleguide';
	
	// alert.php variables
		// Alert, if needed for demo
		$alert = '';

	// subnav active variable
		$subNavSection = 'Support';

	// primary breadcrumb
		$breadcrumb_A = '';
		
	// secondary breadcrumb
		$breadcrumb_B = '';
		
	// secondary breadcrumb
		$breadcrumb_C = '';
			
	// banner.php variables
		// Banner Title - H1 tag
		$banner_title = 'Online Style Guide';
		
	// content.php variables
		// SubHead text
		$subHead = '';

// Setup the page
				
		$tophat = false;
		
		$logoHeader = true;
		
		$nav = false;
		
		$subnav = false;
		
		$simpleNav = true;
		
		$alert = false;
		
		$breadcrumbs = false;
		
		$banner = true;
		
		$supportSearch = false;
			
		$content = true;
		
		$footer = true;
	
// Simple Nav options
	if($simpleNav) {
		
		// Main Navigation
		$simpleNav_1 = '<a href="#Colors"><em>C</em>olors</a>';
		
		$simpleNav_2 = '<a href="#Typography"><em>T</em>ypography</a>';
		
		$simpleNav_3 = '<a href="#ColumnControl"><em>C</em>olumn <em>C</em>ontrol</a>';
		
		$simpleNav_4 = '<a href="#Buttons"><em>B</em>uttons</a>';
		
		$simpleNav_5 = '<a href="#Modules"><em>M</em>odules</a>';
		
		$simpleNav_6 = '<a href="#BestPractices"><em>B</em>est <em>P</em>ractices</a>';
		
	}	
		
?>