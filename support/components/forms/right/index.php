<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>
				
				<div class="twc-row">
					<h2>A Form on the Right</h2>
					<div class="form_container twc-box-column">
						<div class="parsys_column twc-col2_5050-c0">
							<h2>Rules</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
							
							<ul class="bulleted">
								<li>Vestibulum molestie lacus quis massa consectetur fringilla.</li>
								<li>Vestibulum id diam vitae nibh accumsan tincidunt.</li>
								<li>Maecenas at magna dapibus tellus placerat sollicitudin.</li>
								<li>Morbi consectetur nisi id felis rutrum suscipit at sed nisl.</li>
							</ul>
							
							<h5>Enter this sweet contest with this form right here</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						</div>
					
						<div class="parsys_column twc-col2_5050-c1">
							
							<form class="form_right" method="post" autocomplete="on">
								<p>* Required</p>
								<span class="h5">Personal Information</span>
								<div class="formrow">
									<div class="form-item">
										<label class="required" for="text">First Name</label>
										<input id="text" type="text" required name="fname" autocomplete="given-name" tabindex="1">
									</div>
								</div>
								
								<div class="formrow">
									<div class="form-item">
										<label class="required" for="text">Last Name</label>
										<input id="text" type="text" required name="lname" autocomplete="family-name" tabindex="2">
									</div>
								</div>
								
								<div class="formrow">
									<div class="form-item">
										<label for="text">Service Address</label>
										<input id="text" type="text" name="address1" autocomplete="address-line1" tabindex="3">
									</div>
								</div>
								
								<div class="formrow">
									<div class="form-item">
										<label for="text">Service Address 2</label>
										<input id="text" type="text" name="address2" autocomplete="address-line2" tabindex="4">
									</div>
								</div>
								
								<div class="formrow">
									<div class="form-item">
										<label for="text">City</label>
										<input id="text" type="text" name="city" autocomplete="locality" tabindex="5">
									</div>
								</div>
								
								<div class="formrow">
									
									<div class="twc-row">
										<div class="parsys_column twc-col2_5050-c0">
											<div class="form-item">
												<label for="text">State</label>
												<select name="State" name="state" autocomplete="region" tabindex="6"> 
													<option value="" selected="selected"></option> 
													<option value="AL">Alabama</option> 
													<option value="AK">Alaska</option> 
													<option value="AZ">Arizona</option> 
													<option value="AR">Arkansas</option> 
													<option value="CA">California</option> 
													<option value="CO">Colorado</option> 
													<option value="CT">Connecticut</option> 
													<option value="DE">Delaware</option> 
													<option value="DC">District Of Columbia</option> 
													<option value="FL">Florida</option> 
													<option value="GA">Georgia</option> 
													<option value="HI">Hawaii</option> 
													<option value="ID">Idaho</option> 
													<option value="IL">Illinois</option> 
													<option value="IN">Indiana</option> 
													<option value="IA">Iowa</option> 
													<option value="KS">Kansas</option> 
													<option value="KY">Kentucky</option> 
													<option value="LA">Louisiana</option> 
													<option value="ME">Maine</option> 
													<option value="MD">Maryland</option> 
													<option value="MA">Massachusetts</option> 
													<option value="MI">Michigan</option> 
													<option value="MN">Minnesota</option> 
													<option value="MS">Mississippi</option> 
													<option value="MO">Missouri</option> 
													<option value="MT">Montana</option> 
													<option value="NE">Nebraska</option> 
													<option value="NV">Nevada</option> 
													<option value="NH">New Hampshire</option> 
													<option value="NJ">New Jersey</option> 
													<option value="NM">New Mexico</option> 
													<option value="NY">New York</option> 
													<option value="NC">North Carolina</option> 
													<option value="ND">North Dakota</option> 
													<option value="OH">Ohio</option> 
													<option value="OK">Oklahoma</option> 
													<option value="OR">Oregon</option> 
													<option value="PA">Pennsylvania</option> 
													<option value="RI">Rhode Island</option> 
													<option value="SC">South Carolina</option> 
													<option value="SD">South Dakota</option> 
													<option value="TN">Tennessee</option> 
													<option value="TX">Texas</option> 
													<option value="UT">Utah</option> 
													<option value="VT">Vermont</option> 
													<option value="VA">Virginia</option> 
													<option value="WA">Washington</option> 
													<option value="WV">West Virginia</option> 
													<option value="WI">Wisconsin</option> 
													<option value="WY">Wyoming</option>
												</select>
											</div>
										</div>
									
										<div class="parsys_column twc-col2_5050-c1">
											<div class="form-item">
												<label for="text">ZIP Code</label>
												<input id="text" type="text" name="address2" autocomplete="postal-code" pattern="\d*" tabindex="7">
											</div>
										</div>
									</div><!-- .twc-row -->
																				
								</div><!-- .formrow -->
								
								<span class="h5">Contact Information</span>
								<div class="formrow">
									<div class="twc-row">
										<label class="required" for="text">Phone Number</label>
										<div class="parsys_column twc-col3_252550-c0">
											<div class="form-item">
												<input type="tel" id="area_code" class="area_prefix" name="area_code" placeholder="xxx" required pattern="[0-9]{3}" width="10px" name="tel-area-code" autocomplete="tel-area-code"  tabindex="8" onKeyup="autotab(this, document.myMove.prefix)" maxlength=3>
											</div>
										</div>
										<div class="parsys_column twc-col3_252550-c1">
											<div class="form-item">
												<input type="tel" id="prefix" class="area_prefix" name="prefix" placeholder="xxx" required pattern="[0-9]{3}" name="tel-local-prefix" autocomplete="tel-local-prefix" tabindex="8" onKeyup="autotab(this, document.myMove.line_number)" maxlength=3>
											</div>
										</div>
										<div class="parsys_column twc-col3_252550-c2">
											<div class="form-item">
												<input type="tel" id="line_number" class="line_number" name="line_number" placeholder="xxxx" required pattern="[0-9]{4}" name="tel-local-suffix" autocomplete="tel-local-suffix" tabindex="10" maxlength=4>
											</div>
										</div>
									</div>
								</div>
								
								<div class="formrow">
									<div class="twc-row">
										<label class="required" for="text">Alternate Phone Number</label>
										<div class="parsys_column twc-col3_252550-c0">
											<div class="form-item">
												<input type="tel" id="area_code" class="area_prefix" name="area_code" placeholder="xxx" required pattern="[0-9]{3}" width="10px" tabindex="11" onKeyup="autotab(this, document.myMove.prefix)" maxlength=3>
											</div>
										</div>
										<div class="parsys_column twc-col3_252550-c1">
											<div class="form-item">
												<input type="tel" id="prefix" class="area_prefix" name="prefix" placeholder="xxx" required pattern="[0-9]{3}" tabindex="12" onKeyup="autotab(this, document.myMove.line_number)" maxlength=3>
											</div>
										</div>
										<div class="parsys_column twc-col3_252550-c2">
											<div class="form-item">
												<input type="tel" id="line_number" class="line_number" name="line_number" placeholder="xxxx" required pattern="[0-9]{4}" tabindex="13" maxlength=4>
											</div>
										</div>
									</div><!-- .twc-row -->
								</div><!-- .formrow -->
								
								<div class="formrow">
									<div class="form-item">
										<label class="required" for="text">Email Address</label>
										<input id="email_addr" type="email" tabindex="14" required name="email" autocomplete="email">
									</div>
								</div>
								
								<div class="formrow">
									<label class="required" for="">What are your interests?</label>
									<div class="twc-row">
										<div class="parsys_column twc-col2_5050-c0">
											<div class="formrow">
	                                   			<div class="form-item">
		                                   			<input class="" type="checkbox" id="" name="your-interests" value="UFC" tabindex="15"><label for="">UFC</label>
	                                   			</div>
	                                   		</div>
	                                   		<div class="formrow">
	                                   			<div class="form-item">
		                                   			<input class="" type="checkbox" id="" name="your-interests" value="WWE" tabindex="16"><label for="">WWE</label>
	                                   			</div>
	                                   		</div>
	                                   		<div class="formrow">
	                                   			<div class="form-item">
										   			<input class="" type="checkbox" id="" name="your-interests" value="Boxing" tabindex="17"><label for="">Boxing</label>
										   		</div>
	                                   		</div>
										</div>
										
										<div class="parsys_column twc-col2_5050-c1">
	                                   		<div class="formrow">
	                                   			<div class="form-item">
		                                   			<input class="" type="checkbox" id="" name="your-interests" value="UFC" tabindex="18"><label for="">3D Programming</label>
	                                   			</div>
	                                   		</div>
	                                   		<div class="formrow">
	                                   			<div class="form-item">
		                                   			<input class="" type="checkbox" id="" name="your-interests" value="WWE" tabindex="19"><label for="">HD Programming</label>
	                                   			</div>
	                                   		</div>
	                                   		<div class="formrow">
	                                   			<div class="form-item">
		                                   			<input class="" type="checkbox" id="" name="your-interests" value="Boxing" tabindex="20"><label for="">Premium Channels</label>
	                                   			</div>
	                                   		</div>
	                                   </div>
	                                   
									</div>
								</div>
								
								<div class="formrow">
									<div class="formitem left callback">
										<input class="twc-blue-button call-back-form" href="#" type="submit" value="Submit" tabindex="21">
									</div>
								</div>
								
							</form>
						</div>
					</div>
				</div>
							
<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>
