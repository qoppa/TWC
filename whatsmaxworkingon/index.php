<?php 

// Set Page variable values
	
	// header.php variables
		// Page Title
		$title = 'What is Max Working On? | Time Warner Cable';
	
		// Page Description
		$description = 'If, at times, you find yourself wondering "what in the heck is Max working on?" than this is the site for you!';
	
		// Page Specific Keywords
		$keywords = 'Max Quattromani, work, development, html, js, css';
		
		// Body ID tag
		$body_ID = '';
	
	// alert.php variables
		// Alert, if needed for demo
		$alert = '';

	// primary breadcrumb
		$breadcrumb_A = '';
		
	// secondary breadcrumb
		$breadcrumb_B = '';
			
	// banner.php variables
		// Banner Title - H1 tag
		$banner_title = 'What is Max Working on?';
		
	// content.php variables
		// SubHead text
		$subHead = '';

// Setup the page
		
		$header = true;
		
		$tophat = false;
		
		$nav = false;
		
		$subnav = false;
		
		$alert = false;
		
		$banner = true;
		
		$breadcrumbs = false;
		
		$supportSearch = false;
			
		$content = true;
		
		$footer = true;

// Include all needed template pieces
	
	// Load Header -- includes TopHat
	if ($header) {
		include('../core/includes/header.php');
	} 

	// Load Main Nav -- Mega-Menu
	if ($nav) {
		include('../core/includes/nav.php');
	} 

	// Load SubNav if present
	if ($subnav) {
		include('../core/includes/subnav.php');
	}

	// Conditionally Load Alert if required
	if ($alert) {
		include('../core/includes/alert.php');
	}
	
	// Conditionally Load Banner if required
	if ($banner) {
		include('../core/includes/banner.php');
	} 

	// Load Support Pages Search 
	if ($supportSearch) {
		include('../core/includes/supportSearch.php');
	}

	// Load Content opening tags
	if ($content) {
		include('../core/includes/content.php');
	}

?>

<div id="wf">
	<div class="twc-full">
		<div class="container">

			<section class="row">
				
				<article class="col span_9">
					<h1>Lorem Ipsum Bork Bork</h1>
					<img class="large" src="http://placekitten.com/g/700/340" alt="">
					<h2>Placeholder kitteh!</h2>
					<p>
					
					</p>

					<div class="row equalize">
						<div class="col span_4 internal">
							<h5>Headline</h5>
							<p>Equal height, what? what?</p>
						</div>
						
						<div class="col span_4 internal">
							<h5>Headline</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.</p>
						</div>
						
						<div class="col span_4 internal">
							<h5>Headline</h5>
						</div>
					</div>

				</article>
											
				<aside class="col span_3">
					<h3>Upcoming</h3>
					<p></p>
					
					<ul>
						<li>Lorem</li>
						<li>Ipsum</li>
						<li>Bork</li>
						<li>Bork</li>
					</ul>
				</aside>
							
				<aside class="col span_3">
					<h3>Waiting on Feedback</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					<a class="twc-blue-button">submit</a>
				</aside>
				
			</section>
			
			<section class="row">
				<article class="col span_9">
				
					<figure>
						<img class="snippet twc-left" src="http://placekitten.com/g/250/250" alt="">
					</figure>

					<h5>Here's an article about this picture</h5>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident...</p>
					
					<a class="twc-blue-button readMore">Read More</a>
				</article>
			</section>
			
		</div><!-- container -->
	</div><!-- full -->
</div><!-- wrapper div id -->

<?php 
	
	// Load Footer
	include('includes/footer.php') 
	
?>
