<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>

		<div class="locate-stores">
			<form action="searchPage">		

				<div class="33-67 section columnControl">
					<div class="parsys_column twc-col2_3367">
						
						<div class="parsys parsys0 twc-col2_3367-c0 parsys_column">
							<div class="parbase section">		
								
								<!-- locate-stores input -->
								<div class="stores-find-me">
									<div class="twc-module">
										<fieldset class="twc-search">
											<div class="twc-search-input-wrap">
												<h5>Locate a Store</h5>
												<input id="" type="search" placeholder="Placeholder Text" name="">
												<div class="btn blue search-btn icon-search">
    												<button type="submit"></button>
												</div>												
												<small>Enter ZIP Codes, or Street Address, City, State</small>
											</div>
										</fieldset>
									</div>
								</div>
								<!-- .locate-stores input -->
							</div>
						</div>
					
						<div class="parsys parsys1 twc-col2_3367-c1 parsys_column">
							<div class="parbase section">
								
								<!-- locate stores filters -->
								<div class="locate-stores-filters">
									<fieldset>
										<legend>Filter</legend>
										<div class="filter-section">
											<div class="mobile-filters-options">
											    <div class="btn blue twc-left">
    											    <button type="submit">Apply Filters</button>
											    </div>
												<div class="btn blue twc-right">
    												<button type="clear">Reset Filters</button>
												</div>
											</div>
											
											<div class="25-50-25 section columnControl">
												<div class="parsys_column twc-col3_255025">
													<div class="parsys parsys0 twc-col3_255025-c0 parsys_column">
														<div class="parbase section filter-section-payment">
															<label for="payment">Accepted Payment</label>
															<ul class="filter-checkbox">
																<li><input id="icon-money" type="checkbox" checked name="" id=""><label>Cash<label></li>
																<li><input id="icon-list-alt" type="checkbox" checked name="" id=""><label>Check</label></li>
																<li><input id="icon-credit-card" type="checkbox" checked name="" id=""><label>Credit Card</label></li>
															</ul>
														</div>	
													</div>
													
													<div class="parsys parsys1 twc-col3_255025-c1 parsys_column">
														<div class="parbase section filter-section-services">
															<label for="services">Services Available</label>
                                                    			<div class="50-50 section columnControl">
                                                    				<div class="parsys_column twc-col2_5050">
                                                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                                                    						<div class="parbase section">
                                                                                <ul>
                                                                                    <li><input id="icon-eye-open" type="checkbox" checked name="" id=""><label>Demo Center</label></li>
                                                    								<li><input id="icon-wrench" type="checkbox" checked name="" id=""><label>Self Install</label></li>
                                                    								<li><input id="icon-dollar" type="checkbox" checked name="" id=""><label>Payment Centers</label></li>
                                                                                </ul>
                                                    						</div>
                                                    						<div class="new section"></div>
                                                    					</div>
                                                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                                                    						<div class="parbase section">
                                                                                <ul>
                                                                                    <li><input id="icon-time" type="checkbox" checked name="" id=""><label>24-Hour Payment</label></li>
                                                    								<li><input id="icon-download" type="checkbox" checked name="" id=""><label>Return Equipment</label></li>
                                                    								<li><input id="icon-exchange" type="checkbox" name=""><label>Exchange Equipment</label></li>
                                                                                </ul>
                                                    						</div>
                                                    						<div class="new section"></div>
                                                    					</div>
                                                    				</div>
                                                    				<div class="columnClear"></div>
                                                    			</div>
														</div>
													</div>	
													
													<div class="parsys parsys0 twc-col3_255025-c0 parsys_column">
														<div class="parbase section filter-section-office">
															<label for="office">Office</label>
															<ul>
																<li><input id="icon-building" type="checkbox" checked name="" id=""><label>TWC Office Only</label></li>
																<li><input id="icon-shopping-cart" type="checkbox" checked name="" id=""><label>Retail Stores</label></li>
															</ul>
														</div>
													</div>	
												</div>
											</div>
										</div>
									</fieldset>
									<div class="btn blue twc-right submit">
    								    <button type="submit">
                                        Submit
                                        </button>
									</div>
								</div>
								<!-- .locate stores filters -->
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
				
		<div class="pickup-exchange">

			<div class="33-67 section columnControl">
				<div class="parsys_column twc-col2_3367">
					<div class="parsys parsys0 twc-col2_3367-c0 parsys_column">
						<div class="parbase section">
							<div class="banner">
								<h4>Find Stores that will Pick up or Exchange Equipment</h4>
							</div>
						</div>
					</div>
                    
					<div class="parsys parsys1 twc-col2_3367-c1 parsys_column">
						<div class="parbase section">
							<div class="find-location">
								<ul>
									<li><label class="p">Enter account or phone number to find locations:</label></li>
									<li><input id="" type="search" placeholder="Account or Phone Number" name="">
										<div class="btn blue mobile-full">
    										<button type="submit">FIND LOCATION</button></li>
										</div>
								</ul>
								
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
				
		<div class="map-stores twc-box-column">
			
			<header class="page-header">
				<div class="tabs">
					<ul>
						<li class="h5 stores_list_tab"><a href="#stores_map_details">List</a></li>
						<li class="h5 stores_map_tab"><a href="#stores_map_map">Map</a></li>
					</ul>
				</div>
			</header>
			
			<div class="flag">Store locations listed below do not exchange equipment. Please use the "Locator Tool" above to find stores with this service.</div>
			
			<div class="stores_details_map_container">
				<div class="stores_details_map_info">
					<h5>Currently showing (4) locations near Birmingham, AL</h5>
					
					<div class="stores_details_map_info_distance twc-left">
						<span> WITHIN:</span>
						<select name="distance">
							<option>5 Miles
							<option>10 Miles
							<option>25 Miles
						</select>
					</div>
					
					<!-- SHARE Module -->
        			<div class="share twc-right">
        				<!-- Print / Email Component -->
        				<div class="share-emailPrint">
        				    <div class="btn blue share">
            				    <button id="print" onClick="window.print()">
        							<span class="twc-icon-before icon-print"></span><span class="text">PRINT</span>
                                </button>    
        				    </div>
        
        					<div class="btn blue share">
        					    <button id="email">
        							<span class="twc-icon-before icon-envelope-alt"></span><span class="text">EMAIL</span>
                                </button>
        					</div>
        				</div>
        				<!-- .Print / Email Component -->
        				
        				<!-- Email Module -->			
        				<div class="email-module">
        					<div class="close"></div>
        					<b>Enter Your Email Address</b>
        					<form>
        						<div class="formrow">
        							<div class="form-item">
        								<label for="email">Your Email Address:</label>
        								<input id="email_addr" type="email" autocomplete="email" name="email">
        							</div>
        						</div>
        						
        						<div class="formrow">
        							<div class="form-item">
        								<label for="send">Send To:</label>
        								<input id="to_email_addr" type="text" name="to_email">
        							</div>
        						</div>
        						
        						<div class="formrow">
        							<div class="form-item">
        								<label for="text">Add Note:</label>
        								<textarea>
        								</textarea>
        							</div>
        						</div>
        						
        						<div class="formrow">
        							<div class="form-item">
        							    <div class="btn blue">
        								    <button type="submit">Send</button>
        							    </div>
        							</div>
        						</div>
        					</form>
        				</div>
        				<!-- .Email Module -->
        			</div>
        			<!-- .SHARE Module -->
        							
				</div>
				
				<div class="parsys_column twc-col2_3367-c0 stores_location_details" id="stores_map_details">
					
					<div class="stores_locations_details_legend">
						<div class="legend_icons">
                            <div class="50-50 section columnControl">
                				<div class="parsys_column twc-col2_5050">
                					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                						<div class="parbase section">
                							<ul>
                    							<li><span class="twc-icon-before icon-money"></span>Cash</li>
                    							<li><span class="twc-icon-before icon-list-alt"></span>Check</li>
                    							<li><span class="twc-icon-before icon-credit-card"></span>Credit Card</li>
                    							<li><span class="twc-icon-before icon-eye-open"></span>Demo Center</li>
                    							<li><span class="twc-icon-before icon-wrench"></span>Self Install</li>
                    							<li><span class="twc-icon-before icon-dollar"></span>Payment Center</li>
                							</ul>
                						</div>
                						<div class="new section"></div>
                					</div>
                					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                						<div class="parbase section">
                							<ul>
                    							<li><span class="twc-icon-before icon-time"></span>24-Hour Payment</li>
                    							<li><span class="twc-icon-before icon-download"></span>Return Equipment</li>
                    							<li class="muted"><span class="twc-icon-before icon-exchange"></span>Exchange Equipment</li>
                    							<li><span class="twc-icon-before icon-building"></span>TWC Office Only</li>
                    							<li><span class="twc-icon-before icon-shopping-cart"></span>Retail Stores</li>
                							</ul>
                						</div>
                						<div class="new section"></div>
                					</div>
                				</div>
                				<div class="columnClear"></div>
                			</div>
                        </div>
						<div class="legend_note">
							<span><b>NOTE:</b> Not all stores locations will exchange equipment. Please check "Location Options" for this feature.</span>
						</div>
					</div>
					
					<div class="location_listing">
						<ul id="paymentcenterresults">
							<li id="outputDiv0" class="outputdiv 2666">
								
								<div class="50-50 section columnControl">
                    				<div class="parsys_column twc-col2_5050">
                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                    						<div class="parbase section">
                    							<a href="#">S. Manhattan</a>
                    								<address>
                    								46A East 23rd Street
                    								<br>
                    								New York, NY 10010
                    								</address>
                    								<br>
                    								<div class="btn flag">New Store</div>
                    								<br><br>
                    								<b>Hours</b>
                    								<br>
                    								Mon-Fri 8am - 7pm<br>Sat 8am - 5pm
                    								<br><br>
                    								<a target="_blank" href="http://maps.google.com/maps?z=12&t=m&q=46A%20East%2023rd%20Street%20New%20York,%20NY%2010010">Directions</a> | <b>Distance:</b> 1.2 mi
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                    						<div class="parbase section">
                    							<div class="pType icon-money"></div>
                                                <div class="pType icon-list-alt"></div>
                                                <div class="pType icon-credit-card"></div>
                                                <div class="pType icon-wrench"></div>
                                                <div class="pType icon-time"></div>
                                                <div class="pType icon-eye-open"></div>
                                                <div class="pType icon-exchange"></div>
                                                <br>
                    							<b>Location Options</b>
                                                <div class="service_selfinstall">Self Install</div>
                                                <div class="service_alldaypayment">24-Hour Payment</div>
                                                <div class="service_democenter">Demo Center</div>
                                                <div class="service_newequipment">New Equipment</div>
                                                <div class="service_boxswap">Box Swap</div>
                                                <div class="service_setup">Setup</div>
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    				</div>
                    				<div class="columnClear"></div>
                    			</div>
								
							</li>
							<li id="outputDiv2" class="outputdiv 6277">
								<div class="50-50 section columnControl">
                    				<div class="parsys_column twc-col2_5050">
                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                    						<div class="parbase section">
                    							<a href="#">S. Manhattan</a>
                    								<address>
                    								46A East 23rd Street
                    								<br>
                    								New York, NY 10010
                    								</address>
                    								<br>
                    								<div class="btn flag">New Store</div>
                    								<br><br>
                    								<b>Hours</b>
                    								<br>
                    								Mon-Fri 8am - 7pm<br>Sat 8am - 5pm
                    								<br><br>
                    								<a target="_blank" href="http://maps.google.com/maps?z=12&t=m&q=46A%20East%2023rd%20Street%20New%20York,%20NY%2010010">Directions</a> | <b>Distance:</b> 1.2 mi
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                    						<div class="parbase section">
                    							<div class="pType icon-money"></div>
                                                <div class="pType icon-list-alt"></div>
                                                <div class="pType icon-credit-card"></div>
                                                <br>
                    							<b>Location Options</b>
                                                <div class="service_selfinstall">Self Install</div>
                                                <div class="service_alldaypayment">24-Hour Payment</div>
                                                <div class="service_democenter">Demo Center</div>
                                                <div class="service_newequipment">New Equipment</div>
                                                <div class="service_boxswap">Box Swap</div>
                                                <div class="service_setup">Setup</div>
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    				</div>
                    				<div class="columnClear"></div>
                    			</div>
							</li>
							<li id="outputDiv1" class="outputdiv 12068">
								<div class="50-50 section columnControl">
                    				<div class="parsys_column twc-col2_5050">
                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                    						<div class="parbase section">
                    							<a href="#">S. Manhattan</a>
                    								<address>
                    								46A East 23rd Street
                    								<br>
                    								New York, NY 10010
                    								</address>
                    								<br>
                    								<div class="btn flag">New Store</div>
                    								<br><br>
                    								<b>Hours</b>
                    								<br>
                    								Mon-Fri 8am - 7pm<br>Sat 8am - 5pm
                    								<br><br>
                    								<a target="_blank" href="http://maps.google.com/maps?z=12&t=m&q=46A%20East%2023rd%20Street%20New%20York,%20NY%2010010">Directions</a> | <b>Distance:</b> 1.2 mi
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                    						<div class="parbase section">
                    							<div class="pType icon-money"></div>
                                                <div class="pType icon-list-alt"></div>
                                                <div class="pType icon-credit-card"></div>
                                                <br>
                    							<b>Location Options</b>
                                                <div class="service_selfinstall">Self Install</div>
                                                <div class="service_alldaypayment">24-Hour Payment</div>
                                                <div class="service_democenter">Demo Center</div>
                                                <div class="service_newequipment">New Equipment</div>
                                                <div class="service_boxswap">Box Swap</div>
                                                <div class="service_setup">Setup</div>
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    				</div>
                    				<div class="columnClear"></div>
                    			</div>
							</li>
							<li id="outputDiv0" class="outputdiv 2666">
								<div class="50-50 section columnControl">
                    				<div class="parsys_column twc-col2_5050">
                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                    						<div class="parbase section">
                    							<a href="#">S. Manhattan</a>
                    								<address>
                    								46A East 23rd Street
                    								<br>
                    								New York, NY 10010
                    								</address>
                    								<br>
                    								<div class="btn flag">New Store</div>
                    								<br><br>
                    								<b>Hours</b>
                    								<br>
                    								Mon-Fri 8am - 7pm<br>Sat 8am - 5pm
                    								<br><br>
                    								<a target="_blank" href="http://maps.google.com/maps?z=12&t=m&q=46A%20East%2023rd%20Street%20New%20York,%20NY%2010010">Directions</a> | <b>Distance:</b> 1.2 mi
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                    						<div class="parbase section">
                    							<div class="pType icon-money"></div>
                                                <div class="pType icon-list-alt"></div>
                                                <div class="pType icon-credit-card"></div>
                                                <br>
                    							<b>Location Options</b>
                                                <div class="service_selfinstall">Self Install</div>
                                                <div class="service_alldaypayment">24-Hour Payment</div>
                                                <div class="service_democenter">Demo Center</div>
                                                <div class="service_newequipment">New Equipment</div>
                                                <div class="service_boxswap">Box Swap</div>
                                                <div class="service_setup">Setup</div>
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    				</div>
                    				<div class="columnClear"></div>
                    			</div>
							</li>
							<li id="outputDiv2" class="outputdiv 6277">
								<div class="50-50 section columnControl">
                    				<div class="parsys_column twc-col2_5050">
                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                    						<div class="parbase section">
                    							<a href="#">S. Manhattan</a>
                    								<address>
                    								46A East 23rd Street
                    								<br>
                    								New York, NY 10010
                    								</address>
                    								<br>
                    								<div class="btn flag">New Store</div>
                    								<br><br>
                    								<b>Hours</b>
                    								<br>
                    								Mon-Fri 8am - 7pm<br>Sat 8am - 5pm
                    								<br><br>
                    								<a target="_blank" href="http://maps.google.com/maps?z=12&t=m&q=46A%20East%2023rd%20Street%20New%20York,%20NY%2010010">Directions</a> | <b>Distance:</b> 1.2 mi
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                    						<div class="parbase section">
                    							<div class="pType icon-money"></div>
                                                <div class="pType icon-list-alt"></div>
                                                <div class="pType icon-credit-card"></div>
                                                <br>
                    							<b>Location Options</b>
                                                <div class="service_selfinstall">Self Install</div>
                                                <div class="service_alldaypayment">24-Hour Payment</div>
                                                <div class="service_democenter">Demo Center</div>
                                                <div class="service_newequipment">New Equipment</div>
                                                <div class="service_boxswap">Box Swap</div>
                                                <div class="service_setup">Setup</div>
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    				</div>
                    				<div class="columnClear"></div>
                    			</div>
							</li>
							<li id="outputDiv1" class="outputdiv 12068">
								<div class="50-50 section columnControl">
                    				<div class="parsys_column twc-col2_5050">
                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                    						<div class="parbase section">
                    							<a href="#">S. Manhattan</a>
                    								<address>
                    								46A East 23rd Street
                    								<br>
                    								New York, NY 10010
                    								</address>
                    								<br>
                    								<div class="btn flag">New Store</div>
                    								<br><br>
                    								<b>Hours</b>
                    								<br>
                    								Mon-Fri 8am - 7pm<br>Sat 8am - 5pm
                    								<br><br>
                    								<a target="_blank" href="http://maps.google.com/maps?z=12&t=m&q=46A%20East%2023rd%20Street%20New%20York,%20NY%2010010">Directions</a> | <b>Distance:</b> 1.2 mi
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                    						<div class="parbase section">
                    							<div class="pType icon-money"></div>
                                                <div class="pType icon-list-alt"></div>
                                                <div class="pType icon-credit-card"></div>
                                                <br>
                    							<b>Location Options</b>
                                                <div class="service_selfinstall">Self Install</div>
                                                <div class="service_alldaypayment">24-Hour Payment</div>
                                                <div class="service_democenter">Demo Center</div>
                                                <div class="service_newequipment">New Equipment</div>
                                                <div class="service_boxswap">Box Swap</div>
                                                <div class="service_setup">Setup</div>
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    				</div>
                    				<div class="columnClear"></div>
                    			</div>
							</li>
							<li id="outputDiv0" class="outputdiv 2666">
								<div class="50-50 section columnControl">
                    				<div class="parsys_column twc-col2_5050">
                    					<div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                    						<div class="parbase section">
                    							<a href="#">S. Manhattan</a>
                    								<address>
                    								46A East 23rd Street
                    								<br>
                    								New York, NY 10010
                    								</address>
                    								<br>
                    								<div class="btn flag">New Store</div>
                    								<br><br>
                    								<b>Hours</b>
                    								<br>
                    								Mon-Fri 8am - 7pm<br>Sat 8am - 5pm
                    								<br><br>
                    								<a target="_blank" href="http://maps.google.com/maps?z=12&t=m&q=46A%20East%2023rd%20Street%20New%20York,%20NY%2010010">Directions</a> | <b>Distance:</b> 1.2 mi
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    					<div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                    						<div class="parbase section">
                    							<div class="pType icon-money"></div>
                                                <div class="pType icon-list-alt"></div>
                                                <div class="pType icon-credit-card"></div>
                                                <br>
                    							<b>Location Options</b>
                                                <div class="service_selfinstall">Self Install</div>
                                                <div class="service_alldaypayment">24-Hour Payment</div>
                                                <div class="service_democenter">Demo Center</div>
                                                <div class="service_newequipment">New Equipment</div>
                                                <div class="service_boxswap">Box Swap</div>
                                                <div class="service_setup">Setup</div>
                    						</div>
                    						<div class="new section"></div>
                    					</div>
                    				</div>
                    				<div class="columnClear"></div>
                    			</div>
							</li>
						</ul>
					</div>

				</div>
	
				<div class="twc-col2_3367-c1 stores_map" id="stores_map_map">
					<div id="map-canvas"></div>
				</div>
			</div>
			
		</div>
		
<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>