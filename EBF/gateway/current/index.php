<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>
		
		<div class="wrap">
			<div class="gateway-container" id="current">
				<h1>Check Availability</h1>
				
				<header class="page-header">
					<div class="tabs">
						<ul>
							<li class="h5">New Customer</li>
							<li class="h5 active">Current Customer</li>
						</ul>
					</div>
				</header>
				
				<div class="gateway">
					<div class="gateway-headline">
						<h5>Find out what services are available</h5>
						<p>Your information will only be used to determine services availability, it will be kept private and secure.
					</div>
					
					<div class="gateway-form">
						<!-- form module -->
						<form id="EBFGateway-current" name="EBFGatgeway-current" method="GET">
							<div class="input-section">
								<div class="formrow">
									<label class="h5" for="username">Login with your TWC ID</label>
									<input type="text" id="username" name="username" required tabindex="1" placeholder="Username">
								</div>
								
								<div class="formrow">
									<input type="text" id="password" name="password" required tabindex="2" placeholder="Password">
								</div>	
								
								<div class="formrow">
									<a class="twc-blue-button toggle" href="">
										<span class="arrow">Login</span>
									</a>
									<input type="checkbox"><label>Keep me logged in</label>
								</div>
							</div>
							
							<div class="skip-section">
								<div class="formrow">
									<label class="h5" for="username">Don't have a TWC ID?</label>
									<a class="twc-blue-button active" href="">
										<span class="arrow">Order without logging in</span>
									</a>
								</div>
								
								<div class="formrow">
									<label class="h5" for="not-registered">Not registered?</label>
									<a class="twc-blue-button active" href="">
										<span class="arrow">Register now</span>
									</a>
								</div>	
								
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>

