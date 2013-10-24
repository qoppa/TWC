<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>

			<!-- Page Template: TWC Buyflow Gateway -->
			<div class="gateway-container">
				<h1>Check Availability</h1>

				<!-- Tabs -->
                <header class="page-header">
                    <div class="tabs">
                        <ul>
                            <li class="active"><a class="h5" href="#buyflow-new">New Customer</a></li>
                            <li><a class="h5" href="#buyflow-current">Current Customer</a></li>
                        </ul>
                    </div>
                </header>
				<!-- .Tabs -->
				
				<!-- Gateway Body Container -->
				<div class="gateway">
						
					<!-- New Customer -->
					<div id="buyflow-new" class="tab-content active">
						<div class="gateway-headline">
							<h5>Enter Your Address</h5>
							<p>We need your address so we can show all the Time Warner Cable service options in your area.</p>
							<p>Need Help? Check out our <a href="">Address tips</a></p>
						</div>
						
						<div class="gateway-form">
					
							<!-- Error Module -->
							<div class="error-module">
								<div class="error-wrap">
									<p class="h5 error">This line of business is not available in your location.</p>
									<span class="error">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, quis odio ad. Corporis, libero, alias, ipsum dolorem placeat odio amet culpa blanditiis totam consequuntur incidunt cum tempora? Vitae, numquam soluta.</span>
								</div>
							</div>
							<!-- .Error Module -->
							
							<form id="" name="">
								
								<div class="input-section">
									<div class="formrow">
										<div class="formitem">
											<input type="text" id="address" name="address" placeholder="123 Main St." required="" tabindex="1">
										</div>
									</div>
									
									<div class="formrow">
										<div class="formitem left">
											<select name="unit" id="unit" value="" tabindex="2">
											    <option value="">Unit Type</option>
											    <option value="1">Apartment</option>
											    <option value="2">Suite</option>
											    <option value="3">Floor</option>
											</select>
										</div>
										
										<div class="formitem right">
											<input type="text" id="" name="" placeholder="Unit Number" tabindex="3">
										</div>
									</div>
									
									<div class="formrow">
										<div class="formitem left">
											<input type="text" id="" name="" required placeholder="11111" tabindex="4">
											<p class="twc-left">Not your ZIP? Select field to change manually</p>
										</div>
									</div>
								</div> 
								
								<div class="gateway-submit">
									<div class="formrow">
										<div class="formitem">
											<a class="btn blue twc-right mobile-full" href="">
												Get Started<span class="twc-icon-after icon-angle-right"></span>
											</a>
										</div>
									</div>
								</div>
							</form>
						</div>

						<!-- System Status Spinner -->	
						<div class="gateway-processing">
							<h5>Our system is processing your request.</h5>
							<p>Please wait a moment.</p>
                            
							<img src="/TWC/core/images/spinner.gif" alt="waiting spinner">
						</div>
						<!-- .System Status Spinner -->	
						
						<!-- New Customer Select Address -->
						<div id="buyflow-new-select-address">
							<div class="gateway-headline">
								<h5>Select Your Address</h5>
								<p>The address you entered returned mutliple matches.</p>
								<p>Need Help? Check out our <a href="">Address tips</a></p>
							</div>
							
							<div class="gateway-form">
								<form id="" name="">
								
									<div class="input-section">
										
										<span class="info">
											<h5>We found 169 matches for your address.</h5> 
											<span>Please pick the correct address from the drop-down menu or edit your address.</span>
										</span>
										
										<div class="formrow">
											<div class="formitem">
												<span>
													<label><input type="radio" name="select-address" checked tabindex="1">Select an address:</label>
												</span>
												<select name="unit" id="unit" value="" tabindex="2">
												    <option value="">11111 Northeast Kentucky Industrial Parkway, apt 152 Denver, CO 80123</option>
												    <option value="1">address variable</option>
												    <option value="2">address variable</option>
												    <option value="3">address variable</option>
												</select>
												<div class="select-arrow"></div>
											</div>
										</div>
										
										<div class="formrow">
											<div class="formitem">
												<span>
													<label><input type="radio" name="select-address" tabindex="3">Edit address:</label>
												</span>
												<input type="text" id="" name="" placeholder="123 Main St." required tabindex="4">
											</div>
										</div>
										
										<div class="formrow">
											<div class="formitem left">
												<select name="" id="" value="" tabindex="5">
												    <option value="">Unit Type</option>
												    <option value="1">Apartment</option>
												    <option value="2">Suite</option>
												    <option value="3">Floor</option>
												</select>
											</div>
											
											<div class="formitem right">
												<input type="text" id="" name="" placeholder="Unit Number" tabindex="6">
											</div>
										</div>
										
										<div class="formrow">
											<div class="formitem left">
												<input type="text" id="" name="" required placeholder="11111" tabindex="7">
												<p class="twc-left">Not your ZIP? Select field to change manually</p>
											</div>
										</div>
										
										<div class="formrow">
											<div class="formitem">
												<p class="twc-left">If you don't see your exact address, call <a type="tel">XXX-XXX-XXXX</a> for assistance.</p>
											</div>
										</div>
										
									</div>
									
									<div class="gateway-submit">
										<div class="formrow">
											<div class="formitem">
												<a class="btn blue twc-right mobile-full" href="">
													Continue<span class="twc-icon-after icon-angle-right"></span>
												</a>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<!-- .New Customer Select Address -->
					</div>
					<!-- New Customer -->					
							
                    <!-- Current Customer -->
                    <div id="buyflow-current" class="tab-content">
                        <div class="gateway-headline">
                            <h5>Find out what services are available</h5>
                            <p>Your information will only be used to determine service avaialbility. It will be kept private and secure.</p>
                        </div>
                        
                        <div class="gateway-form">
                        
                            <form id="" name="">
                                <div class="input-skip-container">
                                    
                                    <div class="50-50 section columnControl">
                                        <div class="parsys_column twc-col2_5050">
                                            <div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                                                <div class="parbase section">
                                                    <div class="input-section">
                                                        <label class="h5" for="username">Login with your TWC ID</label>

                                                        <div class="formrow">
                                                            <div class="formitem">
                                                                <input type="text" id="" name="" placeholder="Username" tabindex="1">
                                                                <p>I forgot my <a href="">username</a></p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="formrow">
                                                            <div class="formitem">
                                                                <input type="password" id="" name="" placeholder="Password" tabindex="2">
                                                                <p>I forgot my <a href="">password</a></p>
                                                            </div>
                                                        </div>	
                                                        
                                                        <div class="formrow">
                                                            <div class="formitem">
                                                                <a class="btn blue mobile-full" href="">
                                                                    Log In<span class="twc-icon-after icon-angle-right"></span>
                                                                </a>
                                                                <p><input type="checkbox" name="" value="" /><label>Keep me logged in</label></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="new section"></div>
                                            </div>
                                            <div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                                                <div class="parbase section">
                                                    <div class="skip-section">
                                                        <label class="h5" for="not-registered">Not registered?</label>
                                                        <div class="formrow">
                                                            <div class="formitem">
                                                                <a class="btn black block" href="">
                                                                    Register Now<span class="twc-icon-after icon-angle-right"></span>
                                                                </a>
                                                            </div>
                                                        </div>	
                                                    </div>
                                                </div>
                                                <div class="new section"></div>
                                            </div>
                                        </div>
                                        <div class="columnClear"></div>
                                    </div>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- .Current Customer -->
						
					</div>
					<!-- .Gateway Body Container -->
				</div>
				<!-- .Page Template: TWC Buyflow Gateway -->

<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>
