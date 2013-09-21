<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>
		
		<div class="new">
			<div class="gateway-container" id="new">
				<h1>Check Availability</h1>
				
				<header class="page-header">
					<div class="tabs">
						<ul>
							<li class="h5 active"><span>New Customer</span></li>
							<li class="h5"><span>Existing Customer</span></li>
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
						<form id="EBFGateway-new" name="EBFGatgeway-new" method="GET">
							
							<div class="input-section">
								<div class="formrow">
									<div class="formitem">
										<input type="text" id="address" name="address" required tabindex="1" placeholder="Street Address">
									</div>
								</div>
								
								<div class="formrow">
									<div class="formitem left">
										<select name="unit" id="unit" value="">
										    <option value="">Unit Type</option>
										    <option value="1">House</option>
										    <option value="2">Duplex</option>
										    <option value="3">Apartment</option>
										    <option value="4">shanty</option>
										</select>
									</div>
									
									<div class="formitem right">
										<input type="text" id="unit-number" name="unit-number" required tabindex="3" placeholder="Unit Number">
									</div>
								</div>
								
								<div class="formrow">
									<div class="formitem left">
										<input type="text" id="zip" name="zip" required tabindex="1" placeholder="ZIP Code">
									</div>
								</div>
								
								<div class="formrow">
									<div class="formitem">
										<p class="twc-left">Not your ZIP? Select field to change manually</p>
									</div>
								</div>
								
							</div>
							
							<div class="formrow gateway-submit">
								<div class="formitem">
									<a class="twc-blue-button toggle" href="">
										<span class="arrow">Continue</span>
									</a>
								</div>
							</div>
							
						</form>
					</div>
				</div>
			</div>
		</div>
<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>

