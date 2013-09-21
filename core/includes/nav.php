
	<!-- Begin Main Navigation Component -->
    <nav role="navigation" class="twc-mobile-navigation twc-backgroundGradient-3">
        <ul>
            <li>
                <nav class="twc-menu-dropdown">
                <input class="navradio" type="radio" id="menu" name="navradio">
                    <label for="menu">MENU</label>
                    <ul>
                    	<li>
                            <div class="smartLink">
                                <?=$nav_1?>
                            </div>
                        </li>
                    
                        <li>
                            <div class="smartLink">
                                <?=$nav_2?>
                            </div>
                        </li>

                        <li>
                            <div class="smartLink">
                                <?=$nav_3?>
                            </div>
                        </li>

                        <li>
                            <div class="smartLink">
                                <?=$nav_4?>
                            </div>
                        </li>

                        <li>
                            <div class="smartLink">
                                <?=$nav_5?>
                            </div>
                        </li>

                        <li>
                            <div class="smartLink">
                                <?=$nav_6?>
                            </div>
                        </li>

                        <li>
                            <div class="smartLink">
                                <?=$nav_7?>
                            </div>
                        </li>

                        <li>
                            <div class="smartLink">
                                <?=$nav_8?>
                            </div>
                        </li>
                    </ul>

                    <ul>
                        <li>
                            <div class="smartLink">
                                <?=$tophat_1?>
                            </div>
                        </li>

                        <li>
                            <div class="smartLink">
                                <?=$tophat_2?>
                            </div>
                        </li>

                        <li>
                            <div class="smartLink">
                                <?=$tophat_3?>
                            </div>
                        </li>

                        <li>
                            <div class="smartLink">
                                <?=$tophat_4?>
                            </div>
                        </li>

                        <li>
                            <div class="smartLink">
                                <?=$tophat_5?>
                            </div>
                        </li>
                        
                        <li>
                            <div class="smartLink">
                                <?=$tophat_6?>
                            </div>
                        </li>
                        
                    </ul>
                    
                    <ul>
                    	<li>
                            <div class="smartLink">
                                <?=$tophat_7?>
                            </div>
                        </li>
                    </ul>
                </nav>
            </li>

            <li class="twc-custLoc">
                <nav class="twc-custLoc-dropdown">
                <input class="navradio" type="radio" id="custLoc" name="navradio">
                	<label for="custLoc">
                		<span class="twc-mobile-city"><?=$geoLoc?></span><span class="twc-icon-after icon-screenshot"></span>
                	</label>

                    <ul>
                        <li class="twc-backgroundGradient-4 twc-last">
                        	<div class="twc-module">
	                        	<form action="<%= geoLoc %>">
				                    <fieldset class="twc-search">
				                        <div class="twc-search-input-wrap">
											<input type="text" name="" id="" placeholder="Placeholder Text">
											<div class="btn blue geoloc-btn">
											    <button class="" type="submit">GO</button>
											</div>
										</div>
				                    </fieldset>
				                </form>
                        	</div>
                        </li>
                        <li>
                            <div id="geo-error" class="message twc-hidden">
			                    <p class="twc-alert-text">We could not determine your location</p>
			                    <p>Our services may not be available in your area.<br>Please enter the ZIP Code for your location. If you entered your ZIP Code correctly, visit <a href="http://cablemover.com/Home?c=9093" target="_blank">cablemover.com</a> to contact the cable company serving your area.</p>
			
			                </div>
                        </li>
                    </ul>
                </nav>
            </li>

            <li class="twc-last">
    			<nav class="twc-search-dropdown">
    			<input class="navradio" type="radio" id="search" name="navradio">
				    <label for="search">
				    	<span class="twc-icon icon-search"></span>
				    </label>
				    <ul>
				        <li class="twc-backgroundGradient-4 twc-last">
				        	<div class="twc-module  twc-mobile-search">
	                        	<form action="<%= searchPage %>">
				                    <fieldset class="twc-search">
				                        <div class="twc-search-input-wrap">
											<input type="search" name="" id="" placeholder="Placeholder Text">
											<div class="btn blue search-btn">
											    <button type="submit"></button>
											</div>
										</div>
				                    </fieldset>
				                </form>
				        	</div>
                        </li>
				    </ul>
    			</nav>
    		</li>
        </ul>
    </nav>

    <nav role="navigation" class="twc-navigation twc-backgroundGradient-3">
        <div class="twc-container twc-mega-menu">
            <ul class="twc-main-nav">
                <li <?php if ($current_page == 'nav_1') { ?>class='active'<?php } ?>>
                    <?=$nav_1?>

                    <ul>
                        <li>
							<div class="parbase teaser twc-submenu twc-mega-section">
								<div class="campaign">
									<div class="megamenu">
										<div class="17-56-17 section columnControl">
											<div class="parsys_column twc-col3_175617">
											
												<div class="parsys parsys0 twc-col3_175617-c0 parsys_column">
													<div class="parsys">
														<div class="labelList">
															<h5>Learn About</h5>

															<ul>
																<li class="twc-last">
																	<div class="smartLink">
																		<a href="http://www.timewarnercable.com/en/residential-home/packages/packages.html">Packages</a>
																	</div>
																</li>
															</ul>
														</div>
													</div>
												</div>

												<div class="parsys parsys1 twc-col3_175617-c1 parsys_column">
				                                    <div class="parsys">
					                                    <h2>heading</h2>
					
					                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor commodo risus, et ultrices sapien vestibulum non. Maecenas scelerisque quam a nulla mattis tincidunt.</p>
				                                    </div>
				                                </div>

												<div class="parsys parsys2 twc-col3_175617-c0 parsys_column">
													<div class="parsys">
														<div class="labelList">
															<h5>For Current Customers</h5>

															<ul>
																<li>
																	<div class="smartLink">
																		<a href="http://www.timewarnercable.com/en/residential-home/support/overview.html">Get Help</a>
																	</div>
																</li>

																<li class="twc-last">
																	<div class="smartLink">
																		<a href="http://www.timewarnercable.com/content/modals/residential/order/ready-to-order.html">Add New Services</a>
																	</div>
																</li>
															</ul>
														</div>
													</div>
												</div>											
											
											</div>
										</div>
									</div>
								</div>
                            </div>
                        </li>
                    </ul>
                </li>

                <li <?php if ($current_page == 'nav_2') { ?>class='active'<?php } ?>>
                    <?=$nav_2?>

                    <ul>
                        <li>
							<div class="parbase teaser twc-submenu twc-mega-section">
								<div class="campaign">
									<div class="megamenu">
										<div class="17-56-17 section columnControl">
											<div class="parsys_column twc-col3_175617">
											
												<div class="parsys parsys0 twc-col3_175617-c0 parsys_column">
													<div class="parsys">
														<div class="labelList">
															<h5>Learn About</h5>

															<ul>
																<li class="twc-last">
																	<div class="smartLink">
																		<a href="http://www.timewarnercable.com/en/residential-home/packages/packages.html">Packages</a>
																	</div>
																</li>
															</ul>
														</div>
													</div>
												</div>

												<!--
<div class="parsys parsys1 twc-col3_175617-c1 parsys_column">

													<div class="megamenu-promo-slider">
														<div id="my_carousel" class="carousel groupr">
															<div class="arrow left btnprev" style="z-index:100;"></div>

															<div class="arrow right btnnext" style="z-index:100;"></div>

															<ul class="carousel-apps group">
																<li>
																	<figure>
																		<div class="sliderContent">
																			<figcaption>1 TV & Basic Internet</figcaption><img src="http://maxquattromani.com/TWC/core/images/1358184457450.png" alt="TV & Basic Internet graphic">

																			<div class="deal">
																				<h4><sup class="dollar">$</sup>79<sup class="cents">99</sup>/</h4><span class="term">Mo<br>
																				for 12 mo</span> <a href="http://www.timewarnercable.com/content/modals/residential/order/abf-ebf-modal/_jcr_content.content.html?wcmmode=disabled">Check Availability</a>
																			</div>
																		</div>
																	</figure>
																</li>

																<li>
																	<figure>
																		<div class="sliderContent">
																			<figcaption>2 TV & Basic Internet</figcaption><img src="http://maxquattromani.com/TWC/core/images/1358184457450.png" alt="TV & Basic Internet graphic">

																			<div class="deal">
																				<h4><sup class="dollar">$</sup>79<sup class="cents">99</sup>/</h4><span class="term">Mo<br>
																				for 12 mo</span> <a href="http://www.timewarnercable.com/content/modals/residential/order/abf-ebf-modal/_jcr_content.content.html?wcmmode=disabled">Check Availability</a>
																			</div>
																		</div>
																	</figure>
																</li>

																<li>
																	<figure>
																		<div class="sliderContent">
																			<figcaption>3 TV & Basic Internet</figcaption><img src="http://maxquattromani.com/TWC/core/images/1358184457450.png" alt="TV & Basic Internet graphic">

																			<div class="deal">
																				<h4><sup class="dollar">$</sup>79<sup class="cents">99</sup>/</h4><span class="term">Mo<br>
																				for 12 mo</span> <a href="http://www.timewarnercable.com/content/modals/residential/order/abf-ebf-modal/_jcr_content.content.html?wcmmode=disabled">Check Availability</a>
																			</div>
																		</div>
																	</figure>
																</li>

																<li>
																	<figure>
																		<div class="sliderContent">
																			<figcaption>4 TV & Basic Internet</figcaption><img src="http://maxquattromani.com/TWC/core/images/1358184457450.png" alt="TV & Basic Internet graphic">

																			<div class="deal">
																				<h4><sup class="dollar">$</sup>79<sup class="cents">99</sup>/</h4><span class="term">Mo<br>
																				for 12 mo</span> <a href="http://www.timewarnercable.com/content/modals/residential/order/abf-ebf-modal/_jcr_content.content.html?wcmmode=disabled">Check Availability</a>
																			</div>
																		</div>
																	</figure>
																</li>

																<li>
																	<figure>
																		<div class="sliderContent">
																			<figcaption>5 TV & Basic Internet</figcaption><img src="http://maxquattromani.com/TWC/core/images/1358184457450.png" alt="TV & Basic Internet graphic">

																			<div class="deal">
																				<h4><sup class="dollar">$</sup>79<sup class="cents">99</sup>/</h4><span class="term">Mo<br>
																				for 12 mo</span> <a href="http://www.timewarnercable.com/content/modals/residential/order/abf-ebf-modal/_jcr_content.content.html?wcmmode=disabled">Check Availability</a>
																			</div>
																		</div>
																	</figure>
																</li>

																<li>
																	<figure>
																		<div class="sliderContent">
																			<figcaption>6 TV & Basic Internet</figcaption><img src="http://maxquattromani.com/TWC/core/images/1358184457450.png" alt="TV & Basic Internet graphic">

																			<div class="deal">
																				<h4><sup class="dollar">$</sup>79<sup class="cents">99</sup>/</h4><span class="term">Mo<br>
																				for 12 mo</span> <a href="http://www.timewarnercable.com/content/modals/residential/order/abf-ebf-modal/_jcr_content.content.html?wcmmode=disabled">Check Availability</a>
																			</div>
																		</div>
																	</figure>
																</li>
															</ul>
														</div>
													</div>

												</div>
-->

                                                
                                                <div class="parsys parsys1 twc-col3_175617-c1 parsys_column">
                                                    <div class="xRef section">
                                                        <div class="megamenu_carousel megamenu-carousel">
                                                            <div class="carousel groupr">
                                                                <div class="arrow left btnprev" style="z-index:100;"></div>
                                            
                                                                <div class="arrow right btnnext" style="z-index:100;"></div>
                                            
                                                                <ul class="carousel-apps group">
                                                                    <li class="twc-first">
                                                                        <figure>
                                                                            <div class="sliderContent slidercontent_0">
                                                                                <figcaption>Digital TV & Basic</figcaption><img class="best-offer" src="/content/admin/ResponsiveMegamenu/megamenu-carousel-1/_jcr_content/parsys/megamenu_carousel/slides/slidercontent_0/image.img.png/1376511418568.png" alt="Packages Double with Whole House DVR Carousel Image" title="Packages Double with Whole House DVR Carousel Image">
                                            
                                                                                <div class="deal">
                                                                                    <h4><sup class="dollars">$</sup> 79 <sup class="cents">99</sup> /</h4><span class="term">Mo<br>
                                                                                    for 12 Mo</span>
                                            
                                                                                    <div class="smartLink parbase">
                                                                                        <a class="modalGeneric" analyticsname="a:1:1:check availability" href="/content/modals/residential/order/ready-to-order/_jcr_content.content.html?wcmmode=disabled">Check Availability</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </figure>
                                                                    </li>
                                            
                                                                    <li>
                                                                        <figure>
                                                                            <div class="slidercontent sliderContent">
                                                                                <figcaption>Triple w/ Standard</figcaption><img class="best-offer" src="/content/admin/ResponsiveMegamenu/megamenu-carousel-1/_jcr_content/parsys/megamenu_carousel/slides/slidercontent/image.img.png/1376511457272.png" alt="Packages Triple Pack Ultra Carousel Image" title="Packages Triple Pack Ultra Carousel Image">
                                            
                                                                                <div class="deal">
                                                                                    <h4><sup class="dollars">$</sup> 99 <sup class="cents">99</sup> /</h4><span class="term">Mo<br>
                                                                                    for 12 Mo</span>
                                            
                                                                                    <div class="smartLink parbase">
                                                                                        <a class="modalGeneric" analyticsname="a:1:2:check availability" href="/content/modals/residential/order/ready-to-order/_jcr_content.content.html?wcmmode=disabled">Check Availability</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </figure>
                                                                    </li>
                                            
                                                                    <li>
                                                                        <figure>
                                                                            <div class="sliderContent slidercontent_1">
                                                                                <figcaption>Basic TV & Extreme</figcaption><img class="best-offer" src="/content/admin/ResponsiveMegamenu/megamenu-carousel-1/_jcr_content/parsys/megamenu_carousel/slides/slidercontent_1/image.img.png/1376511545848.png" alt="Packages Double Pack Ultra Carousel Image" title="Packages Double Pack Ultra Carousel Image">
                                            
                                                                                <div class="deal">
                                                                                    <h4><sup class="dollars">$</sup> 79 <sup class="cents">99</sup> /</h4><span class="term">Mo<br>
                                                                                    for 12 Mo</span>
                                            
                                                                                    <div class="smartLink parbase">
                                                                                        <a class="modalGeneric" analyticsname="a:1:3:check availability" href="/content/modals/residential/order/ready-to-order/_jcr_content.content.html?wcmmode=disabled">Check Availability</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </figure>
                                                                    </li>
                                            
                                                                    <li>
                                                                        <figure>
                                                                            <div class="slidercontent_2 sliderContent">
                                                                                <figcaption>Basic TV & Turbo</figcaption><img class="best-offer" src="/content/admin/ResponsiveMegamenu/megamenu-carousel-1/_jcr_content/parsys/megamenu_carousel/slides/slidercontent_2/image.img.png/1376511619092.png" alt="Packages Double with Whole House DVR Carousel Image" title="Packages Double with Whole House DVR Carousel Image">
                                            
                                                                                <div class="deal">
                                                                                    <h4><sup class="dollars">$</sup> 64 <sup class="cents">99</sup> /</h4><span class="term">Mo<br>
                                                                                    for 12 Mo</span>
                                            
                                                                                    <div class="smartLink parbase">
                                                                                        <a analyticsname="a:1:4:check availability" href="/content/modals/residential/order/ready-to-order.html">Check Availability</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </figure>
                                                                    </li>
                                            
                                                                    <li>
                                                                        <figure>
                                                                            <div class="sliderContent slidercontent_3">
                                                                                <figcaption>Triple Play</figcaption><img class="best-offer" src="/content/admin/ResponsiveMegamenu/megamenu-carousel-1/_jcr_content/parsys/megamenu_carousel/slides/slidercontent_3/image.img.png/1376511741021.png" alt="Packages Triple Play Carousel Image" title="Packages Triple Play Carousel Image">
                                            
                                                                                <div class="deal">
                                                                                    <h4><sup class="dollars">$</sup> 89 <sup class="cents">99</sup> /</h4><span class="term">Mo<br>
                                                                                    for 12 Mo</span>
                                            
                                                                                    <div class="smartLink parbase">
                                                                                        <a class="modalGeneric" analyticsname="a:1:5:check availability" href="/content/modals/residential/order/ready-to-order/_jcr_content.content.html?wcmmode=disabled">Check Availability</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </figure>
                                                                    </li>
                                            
                                                                    <li class="twc-last">
                                                                        <figure>
                                                                            <div class="sliderContent slidercontent_4">
                                                                                <figcaption>Triple w/Turbo</figcaption><img class="best-offer" src="/content/admin/ResponsiveMegamenu/megamenu-carousel-1/_jcr_content/parsys/megamenu_carousel/slides/slidercontent_4/image.img.png/1376511776348.png" alt="Packages Triple Plus Carousel Image" title="Packages Triple Plus Carousel Image">
                                            
                                                                                <div class="deal">
                                                                                    <h4><sup class="dollars">$</sup> 129 <sup class="cents">99</sup> /</h4><span class="term">Mo<br>
                                                                                    for 12 Mo</span>
                                            
                                                                                    <div class="smartLink parbase">
                                                                                        <a class="modalGeneric" analyticsname="a:1:6:check availability" href="/content/modals/residential/order/ready-to-order/_jcr_content.content.html?wcmmode=disabled">Check Availability</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </figure>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


												<div class="parsys parsys2 twc-col3_175617-c2 parsys_column">
													<div class="parsys">
														<div class="labelList">
															<h5>For Current Customers</h5>

															<ul>
																<li>
																	<div class="smartLink">
																		<a href="http://www.timewarnercable.com/en/residential-home/support/overview.html">Get Help</a>
																	</div>
																</li>

																<li class="twc-last">
																	<div class="smartLink">
																		<a href="http://www.timewarnercable.com/content/modals/residential/order/ready-to-order.html">Add New Services</a>
																	</div>
																</li>
															</ul>
														</div>
													</div>
												</div>											
											
											</div>
										</div>
									</div>
								</div>
                            </div>
                        </li>
                    </ul>
                </li>

                <li <?php if ($current_page == 'nav_3') { ?>class='active'<?php } ?>>
                    <?=$nav_3?>

					<ul>
                        <li>
							<div class="parbase teaser twc-submenu twc-mega-section">
								<div class="campaign">
									<div class="megamenu">
										<div class="17-56-17 section columnControl">
											<div class="parsys_column twc-col3_175617">
											
												<div class="parsys parsys0 twc-col3_175617-c0 parsys_column">
													<div class="parsys">
														<div class="labelList">
															<h5>Learn About</h5>

															<ul>
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Overview</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Channels</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Features</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Equipment</a>
				                                                    </div>
				                                                </li>
				
				                                                <li class="twc-last">
				                                                    <div class="smartLink">
				                                                        <a href="#">Premiums & More</a>
				                                                    </div>
				                                                </li>
				                                            </ul>
														</div>
													</div>
												</div>

												<div class="parsys parsys1 twc-col3_175617-c1 parsys_column">
				                                    <div class="parsys">
					                                    <h2>heading</h2>
					
					                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor commodo risus, et ultrices sapien vestibulum non. Maecenas scelerisque quam a nulla mattis tincidunt.</p>
				                                    </div>
				                                </div>

												<div class="parsys parsys2 twc-col3_175617-c2 parsys_column">
													<div class="parsys">
														<div class="labelList">
															<h5>For Current Customers</h5>

															<ul>
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">TV Listings</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Watch TV Online</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">TWC Apps</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">On Demand Library</a>
				                                                    </div>
				                                                </li>
				
				                                                <li class="twc-last">
				                                                    <div class="smartLink">
				                                                        <a href="#">Add New Services</a>
				                                                    </div>
				                                                </li>
				                                            </ul>
														</div>
													</div>
												</div>											
											
											</div>
										</div>
									</div>
								</div>
                            </div>
                        </li>
                    </ul>

                </li>

                <li <?php if ($current_page == 'nav_4') { ?>class='active'<?php } ?>>
                    <?=$nav_4?>

                    <ul>
                        <li>
							<div class="parbase teaser twc-submenu twc-mega-section">
								<div class="campaign">
									<div class="megamenu">
										<div class="17-56-17 section columnControl">
											<div class="parsys_column twc-col3_175617">
											
												<div class="parsys_column twc-col3_175617-c0">
													<div class="parsys">
														<div class="labelList">
															<h5>Learn About</h5>

															<ul>
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Overview</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Channels</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Features</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Equipment</a>
				                                                    </div>
				                                                </li>
				
				                                                <li class="twc-last">
				                                                    <div class="smartLink">
				                                                        <a href="#">Premiums & More</a>
				                                                    </div>
				                                                </li>
				                                            </ul>
														</div>
													</div>
												</div>

												<div class="parsys parsys1 twc-col3_175617-c1 parsys_column">
				                                    <div class="parsys">
					                                    <h2>heading</h2>
					
					                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor commodo risus, et ultrices sapien vestibulum non. Maecenas scelerisque quam a nulla mattis tincidunt.</p>
				                                    </div>
				                                </div>

												<div class="parsys parsys2 twc-col3_175617-c2 parsys_column">
													<div class="parsys">
														<div class="labelList">
															<h5>For Current Customers</h5>

															<ul>
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">TV Listings</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Watch TV Online</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">TWC Apps</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">On Demand Library</a>
				                                                    </div>
				                                                </li>
				
				                                                <li class="twc-last">
				                                                    <div class="smartLink">
				                                                        <a href="#">Add New Services</a>
				                                                    </div>
				                                                </li>
				                                            </ul>
														</div>
													</div>
												</div>											
											
											</div>
										</div>
									</div>
								</div>
                            </div>
                        </li>
                    </ul>
                </li>

                <li <?php if ($current_page == 'nav_5') { ?>class='active'<?php } ?>>
                    <?=$nav_5?>

                    <ul>
                        <li>
							<div class="parbase teaser twc-submenu twc-mega-section">
								<div class="campaign">
									<div class="megamenu">
										<div class="17-56-17 section columnControl">
											<div class="parsys_column twc-col3_175617">
											
												<div class="parsys_column twc-col3_175617-c0">
													<div class="parsys">
														<div class="labelList">
															<h5>Learn About</h5>

															<ul>
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Overview</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Channels</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Features</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Equipment</a>
				                                                    </div>
				                                                </li>
				
				                                                <li class="twc-last">
				                                                    <div class="smartLink">
				                                                        <a href="#">Premiums & More</a>
				                                                    </div>
				                                                </li>
				                                            </ul>
														</div>
													</div>
												</div>

												<div class="parsys parsys1 twc-col3_175617-c1 parsys_column">
				                                    <div class="parsys">
					                                    <h2>heading</h2>
					
					                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor commodo risus, et ultrices sapien vestibulum non. Maecenas scelerisque quam a nulla mattis tincidunt.</p>
				                                    </div>
				                                </div>

												<div class="parsys parsys2 twc-col3_175617-c2 parsys_column">
													<div class="parsys">
														<div class="labelList">
															<h5>For Current Customers</h5>

															<ul>
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">TV Listings</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Watch TV Online</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">TWC Apps</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">On Demand Library</a>
				                                                    </div>
				                                                </li>
				
				                                                <li class="twc-last">
				                                                    <div class="smartLink">
				                                                        <a href="#">Add New Services</a>
				                                                    </div>
				                                                </li>
				                                            </ul>
														</div>
													</div>
												</div>											
											
											</div>
										</div>
									</div>
								</div>
                            </div>
                        </li>
                    </ul>
                </li>

                <li <?php if ($current_page == 'nav_6') { ?>class='active'<?php } ?>>
                    <?=$nav_6?>

					<ul>
                        <li>
							<div class="parbase teaser twc-submenu twc-mega-section">
								<div class="campaign">
									<div class="megamenu">
										<div class="17-56-17 section columnControl">
											<div class="parsys_column twc-col3_175617">
											
												<div class="parsys_column twc-col3_175617-c0">
													<div class="parsys">
														<div class="labelList">
															<h5>Learn About</h5>

															<ul>
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Overview</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Channels</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Features</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Equipment</a>
				                                                    </div>
				                                                </li>
				
				                                                <li class="twc-last">
				                                                    <div class="smartLink">
				                                                        <a href="#">Premiums & More</a>
				                                                    </div>
				                                                </li>
				                                            </ul>
														</div>
													</div>
												</div>

												<div class="parsys parsys1 twc-col3_175617-c1 parsys_column">
				                                    <div class="parsys">
					                                    <img src="/TWC/core/images/IH-mega-menu.png" alt="IntelligentHome full fouse preview image">
				                                    </div>
				                                </div>

												<div class="parsys parsys2 twc-col3_175617-c2 parsys_column">
													<div class="parsys">
														<div class="labelList">
															<h5>For Current Customers</h5>

															<ul>
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">TV Listings</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Watch TV Online</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">TWC Apps</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">On Demand Library</a>
				                                                    </div>
				                                                </li>
				
				                                                <li class="twc-last">
				                                                    <div class="smartLink">
				                                                        <a href="#">Add New Services</a>
				                                                    </div>
				                                                </li>
				                                            </ul>
														</div>
													</div>
												</div>											
											
											</div>
										</div>
									</div>
								</div>
                            </div>
                        </li>
                    </ul>

                </li>

                <li <?php if ($current_page == 'nav_7') { ?>class='active'<?php } ?>>
                    <?=$nav_7?>

                    <ul>
                        <li>
                            <div class="twc-submenu twc-mega-section">
                            	<div class="17-56-17 section columnControl">
									<div class="parsys_column twc-col4_25252525">
		                                <div class="parsys_column twc-col4_25252525-c0">
		                                	<div class="parsys">
												<h5>About MyServices</h5><img src="/TWC/core/images/kitten_o.jpg" alt="kitten">
		                                	</div>
		                                </div>
		
		                                <div class="parsys_column twc-col4_25252525-c1">
		                                	<div class="parsys">
		                                    	<h2>heading</h2>
		                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor commodo risus, et ultrices sapien vestibulum non. Maecenas scelerisque quam a nulla mattis tincidunt.</p>
		                                	</div>
		                                </div>
		
		                                <div class="parsys_column twc-col4_25252525-c2">
		                                	<div class="parsys">
			                                    <h2>heading</h2>
			
			                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor commodo risus, et ultrices sapien vestibulum non. Maecenas scelerisque quam a nulla mattis tincidunt.</p>
		                                	</div>
		                                </div>
		
		                                <div class="parsys_column twc-col4_25252525-c3">
		                                	<div class="parsys">
		                                    	<form id="login-form" method="post" action="https://myservices.timewarnercable.com/login/">
											    <fieldset class="login">
											        <h5>Log In to MyServices</h5>
											        <div class="rounded-input-wrap">
											        <input type="text" class="rounded" name="username" id="username" placeholder="username" />
											        </div>
											        <div class="rounded-input-wrap">
											        <input type="password" class="rounded" name="password" placeholder="password" id="password"/>
											        </div>
											        <div class="btn blue">
    											        <button type="submit">
    														Login<span class="twc-icon-after icon-angle-right"></span>
    													</button>
											        </div>
											        <p>Forgot my <a href='https://registration.timewarnercable.com/forgotUsername/'>username</a> and <a href='https://registration.timewarnercable.com/forgotPassword/'>password</a>?</p>
											    </fieldset>
											</form>
		                                	</div>
		                                </div>
									</div>
                            	</div>
                            </div>
                        </li>
                    </ul>
                </li>

                <li <?php if ($current_page == 'nav_8') { ?>class="active"<?php } ?>>
                    <?=$nav_8?>

					<ul>
                        <li>
							<div class="parbase teaser twc-submenu twc-mega-section">
								<div class="campaign">
									<div class="megamenu">
										<div class="17-56-17 section columnControl">
											<div class="parsys_column twc-col3_175617">
											
												<div class="parsys_column twc-col3_175617-c0">
													<div class="parsys">
														<div class="labelList">
															<h5>Learn About</h5>

															<ul>
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Overview</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Channels</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Features</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Equipment</a>
				                                                    </div>
				                                                </li>
				
				                                                <li class="twc-last">
				                                                    <div class="smartLink">
				                                                        <a href="#">Premiums & More</a>
				                                                    </div>
				                                                </li>
				                                            </ul>
														</div>
													</div>
												</div>

												<div class="parsys parsys1 twc-col3_175617-c1 parsys_column">
				                                    <div class="parsys">
				                                        <div class="labelList">
				                                            <h5>Top Support Questions</h5>
				
				                                            <ul>
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Can I view my bill online?</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">How do I reboot my cable set-top box?</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">How do I program my remote control?</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">How can I check the status of my appointment online?</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">How do I setup a TWC ID (username and password)?</a>
				                                                    </div>
				                                                </li>
				
				                                                <li class="twc-last">
				                                                    <div class="smartLink">
				                                                        <a href="#">I am a TWC Internet customer and would like to purchase my own Internet modem. What do I need to do?</a>
				                                                    </div>
				                                                </li>
				                                            </ul>
				                                        </div>
				                                    </div>
				                                </div>

												<div class="parsys parsys2 twc-col3_175617-c2 parsys_column">
													<div class="parsys">
														<div class="labelList">
															<h5>For Current Customers</h5>

															<ul>
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">TV Listings</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">Watch TV Online</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">TWC Apps</a>
				                                                    </div>
				                                                </li>
				
				                                                <li>
				                                                    <div class="smartLink">
				                                                        <a href="#">On Demand Library</a>
				                                                    </div>
				                                                </li>
				
				                                                <li class="twc-last">
				                                                    <div class="smartLink">
				                                                        <a href="#">Add New Services</a>
				                                                    </div>
				                                                </li>
				                                            </ul>
														</div>
													</div>
												</div>											
											
											</div>
										</div>
									</div>
								</div>
                            </div>
                        </li>
                    </ul>
                    
                </li>
            </ul>
        </div>
    </nav>
    <!-- End Main Navigation Component -->
    