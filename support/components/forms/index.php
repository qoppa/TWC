<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>

				<form action="" novalidate>
    				<fieldset>
						<div class="50-50 section columnControl">
							<div class="parsys_column twc-col2_5050">
								<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
									<div class="parbase section">
										
										<div class="formrow">
                    				        <div class="form-item">
                    				            <!--<label for="fname">First Name</label>-->
                        				        <input id="fname" name="fname" type="text" title="Let's start with your first name" placeholder="First Name" required pattern="[^0-9][A-Za-z]{2,20}" >
                                                <span title="Please enter your first name"></span>
                    				        </div>
                    				    </div>
                    				    
                    				    <div class="formrow">
                    				        <div class="form-item">
                    				            <!--<label for="lname">Last Name</label>-->
                        				        <input id="lname" name="lname" type="text" title="and, We're gonna need your last name" placeholder="Last Name" required pattern="[^0-9][A-Za-z]{2,20}" >
                                                <span title="Please enter your last name"></span>
                    				        </div>
                    				    </div>
                    				    
                    				    <div class="formrow">
                    				        <div class="form-item">
                    				            <!--<label for="email">Email Address</label>-->
                        				        <input id="email" name="email" type="email" title="Now an electronic way to reach you"required placeholder="Email Address" pattern="[^ @]*@[^ @]*" />
                                                <span title="Please enter your email address"></span>
                    				        </div>
                    				    </div>
										
										<div class="formrow">
                    				        <div class="form-item">
                    				            <!--<label for="password">Password</label>-->
                        				        <input id="password" name="password" type="password" title="Ya p@$$w0rd can't be a dictionary word!" placeholder="Password" required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" />
                                                <span title="At least one upper case, lower case, and a number"></span>
                    				        </div>
                    				    </div>
                    				    <div class="formrow">
                    				        <div class="form-item">
                                            	<div class="btn blue">
                        				        	<input type="submit" value="Submit">
                                                </div>
                    				        </div>
                    				    </div>
										
									</div>
									<div class="new section"></div>
								</div>
								<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
									<div class="parbase section">
										
									</div>
									<div class="new section"></div>
								</div>
							</div>
							<div class="columnClear"></div>
						</div>
        				
    				</fieldset>
				</form>

<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>
