
    <!-- Begin TopHat Component -->
    <header class="tophat twc-header twc-full twc-backgroundGradient-2">
        <div class="twc-top">
            <div class="twc-container">
                <nav role="navigation">
                    <ul class="twc-top-nav">
                        <li>
                            <div class="navList tophat-tabs">
                                <ul>
                                    <li class="twc-active twc-first">
                                        <div class="smartlink smartLink parbase">
                                            <?=$tophat_1?>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="smartlink_0 smartLink parbase">
                                            <?=$tophat_2?>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="smartlink_1 smartLink parbase">
                                            <?=$tophat_3?>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="smartlink_2 smartLink parbase">
                                            <?=$tophat_4?>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="smartLink smartlink_3 parbase">
                                            <?=$tophat_5?>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="smartLink parbase smartlink_4">
                                            <?=$tophat_6?>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="smartlink smartLink parbase">
                                            <?=$tophat_7?>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li class="twc-right">
                            <div class="twc-location">
                                <div class="twc-customerLocation">
                                    <ul>
                                        <li id="twc-custLoc" class="twc-custLoc-change">Location, LO 00000</li>

                                        <li class="twc-drop-nav">
                                            <a href="#" class="twc-icon twc-change" analyticsname="">Change</a>

                                            <ul>
                                                <li>
                                                    <div class="twc-module">
                                                        <div class="user-location">
                                                            <form action="javascript:void(0);">
                                                                <fieldset class="twc-search">
                                                                    <div class="twc-search-input-wrap">
                                                                        <input type="text" name="geolocation" placeholder="Enter Your ZIP">
                                                                        <div class="btn blue geoloc-btn">
                                                                            <button type="submit">GO</button>
                                                                        </div>
                                                                    </div>
                                                                </fieldset>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </li>

                                                <li class="twc-custLoc-errors">
                                                    <div class="user-location-errors">
                                                        <div class="geo-error message hidden">
                                                            <p class="twc-alert-text">We could not determine your location</p>

                                                            <p>Our services may not be available in your area.<br>
                                                            <br>
                                                            Make sure you entered your zip code correctly. If you entered your zip code correctly, visit <a target="_blank" href="http://cablemovers.com">cablemovers.com</a> to contact the cable company serving your area.</p>
                                                        </div>
<!--

                                                        <div class="oof-error message hidden">
                                                            <p class="twc-alert-text">Our services may not be available in your area</p>

                                                            <p>Make sure you entered your zip code correctly. If you entered your zip code correctly, visit <a target="_blank" href="http://cablemovers.com">cablemovers.com</a> to contact the cable company serving your area.</p>
                                                        </div>

                                                        <div class="noc-error message hidden">
                                                            <p class="twc-alert-text">Cookies are not enabled</p>

                                                            <p>You do not have cookies enabled. In order for us to serve you better, please enable cookies</p>
                                                        </div>

                                                        <div id="oof-header-text" class="message hidden">
                                                            <div class="oof-error-text" style="color:#FF0000">
                                                                Please change location
                                                            </div>
                                                        </div>
-->
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>

        <div class="twc-container" id="header">
            <div class="twc-logo">
                <a class="twc-logo-img" href="../" title="TWC Logo"><img src="/TWC/core/images/small_TWC_EB_Horiz_White_RGB_300.png" alt="TWC Logo" title="TWC logo"></a>
            </div>

            <div class="twc-header-search">
                <div class="twc-module">
                	<form action="<%= searchPage %>">
	                    <fieldset class="twc-search">
	                        <div class="twc-search-input-wrap">
	                            <input type="search" class="elc-style-3" placeholder="Search..." name="search-q">
								<div class="btn blue twc-search-btn">
								    <button type="submit"></button>
								</div>
							</div>
	                    </fieldset>
	                </form>
	        	</div>
            </div>
            <!--  ELICIT BEGIN - PLACE CODE BELOW CLOSING DIV CLASS="header-search" -->
            <script type="text/javascript">
            
            	// Load JS asynchronously
            	(function(d){
            		var js, id = 'elicit-js', ref = d.getElementsByTagName('script')[0];
            		if (d.getElementById(id)) {return;}
            		js = d.createElement('script'); js.id = id; js.async = true;
            		js.src = document.location.protocol +
            "//twc.elicitapp.com/js.ashx?f=elicit.tag.web.js";
            		ref.parentNode.insertBefore(js, ref);
            	}(document));
            
            </script>
            <!-- ELICIT END -->

			<?php
			if ($social == 'true' || $social == '') echo '<div class="twc-header-icons twc-user-options twc-contact">
				<ul class="twc-user-options">
					<div class="header-icons list">
						<ul>
							<li class="twc-first">
								<div class="twc-image-link">
									<a analyticsname="a:1:1:image-link" href="http://www.facebook.com">
										<img src="/TWC/core/images/facebook.png" alt="icon_facebook" title="icon_facebook">
									</a>
								</div>
							</li>
							<li>
								<div class="twc-image-link">
									<a analyticsname="a:1:2:image-link" href="http://www.twitter.com">
										<img src="/TWC/core/images/twitter.png" alt="icon_twitter" title="icon_twitter">
									</a>
								</div>
							</li>
							<li>
								<div class="twc-image-link">
									<a analyticsname="a:1:3:image-link" href="http://www.youtube.com">
										<img src="/TWC/core/images/youtube.png" alt="icon_youtube" title="icon_youtube">
									</a>
								</div>
							</li>
							<li class="twc-last">
								<div class="twc-image-link">
									<a analyticsname="a:1:4:image-link" href="http://www.untangled.com">
										<img src="/TWC/core/images/untangled.png" alt="icon_blog" title="icon_blog">
									</a>
								</div>
							</li>
						</ul>
					</div>
				</ul>
				<span class="twc-follow">FOLLOW US</span>
				</div>'
			?>
			
			<?php
				if ($login == 'true') echo '<div class="twc-login-module twc-contact">
                <span class="headline">Log in with your TWC ID</span>
                <button class="btn blue">Sign In</button>
                <span class="small">Forgot your sign in <a href="">information</a>?</span>
            </div>'
			?>
            
        </div>
    </header>
    <!-- End TopHat Component -->
    