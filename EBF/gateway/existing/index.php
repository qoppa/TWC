<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>
		
		<div class="gateway">
			<div class="gateway-container" id="existing">
				<h1>Check Availability</h1>
				
				<header class="page-header">
					<div class="tabs">
						<ul>
							<li class="h5">New Customer</li>
							<li class="h5 active">Existing Customer</li>
						</ul>
					</div>
				</header>
				
				<div class="gateway">				
					<div class="gateway-form">
						<!-- form module -->
						<form id="EBFGateway-existing" name="EBFGatgeway-existing" method="GET">
							<div class="input-section">
								<div class="gateway-headline">
									<h5>Continue your order without logging in</h5>
									<p>Please enter the following information as it appears on your bill.
								</div>
								<div class="formrow">
									<div class="formitem left">
										<input type="text" id="firstname" name="firstname" required tabindex="1" placeholder="First Name">
									</div>
									<div class="formitem right">
										<input type="text" id="lastname" name="lastname" required tabindex="2" placeholder="Last Name">
									</div>
								</div>
								
								<div class="formrow">
									<div class="formitem left">
										<input type="text" id="phone" name="phone" required tabindex="3" placeholder="Phone Number">
									</div>
									<div class="formitem right">
										<input type="text" id="zip" name="zip" required tabindex="4" placeholder="ZIP Code">
									</div>
								</div>
								
								<hr>
							
								<div class="formrow">
									<a class="twc-blue-button" href="">
										<span class="arrow">Continue</span>
									</a>
									<a class="twc-blank-button" href="">
										<span>Back</span>
									</a>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>

