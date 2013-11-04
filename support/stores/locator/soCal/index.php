<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>

    <p class="subHead h6">Enter the ZIP Code or location of your service address below.</p><!-- TEST SECTION -->

    <div class="locate-stores">
        <form action="searchPage">
            <div class="form-inputs">
                <p class="light">Not your service address ZIP Code? Enter it now.</p>

                <div class="50-25-25 section columnControl">
                    <div class="parsys_column twc-col3_502525">
                        <div class="parsys parsys0 twc-col3_502525-c0 parsys_column">
                            <div class="parbase section">
                                <input id="" type="search" placeholder="90064" name=""> <small>Enter ZIP Code, or Street Address, City, State</small>
                            </div>

                            <div class="new section"></div>
                        </div>

                        <div class="parsys parsys1 twc-col3_502525-c1 parsys_column">
                            <div class="parbase section">
                                <div class="stores_details_map_info_distance">
                                    <span>WITHIN:</span> <select name="distance">
                                        <option>
                                            40 Miles
                                        </option>

                                        <option>
                                            25 Miles
                                        </option>

                                        <option>
                                            10 Miles
                                        </option>

                                        <option>
                                            5 Miles
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="new section"></div>
                        </div>
                        
                        <div id="before-filters" class="parsys parsys1 twc-col3_502525-c2 parsys_column">
                            <div class="parbase section">
                                <div class="cta omega twc-icon-after icon-angle-right mobile-full">
                                    <a href="#"><span>Find Stores</span></a>
                                </div>
                            </div>

                            <div class="new section"></div>
                        </div>
                    </div>

                    <div class="columnClear"></div>
                </div>
            </div>

            <div class="expandable">
                <div class="refineList">
                    <a href="#"><span class="cta twc-left twc-icon-after icon-angle-down">Refine Your Store List</span></a>
                </div>

                <div class="form-filters">
                    <div class="100 section columnControl">
                        <div class="parsys_column twc-col1_100">
                            <div class="parsys parsys0 twc-col1_100-c0 parsys_column">
                                <div class="parbase section">
                                    <!-- locate stores filters -->

                                    <div class="locate-stores-filters">
                                        <fieldset>
                                            <div class="100 section columnControl">
                                                <div class="parsys_column twc-col1_100-c0">
                                                    <div class="parsys parsys0 twc-col100_1-c0 parsys_column">
                                                        <div class="parbase section">
                                                            <span class="light">Uncheck items to remove from list</span>
                                                        </div>

                                                        <div class="new section"></div>
                                                    </div>
                                                </div>

                                                <div class="columnClear"></div>
                                            </div>

                                            <div class="25-50-25 section columnControl">
                                                <div class="parsys_column twc-col3_255025">
                                                    <div class="parsys parsys0 twc-col3_255025-c0 marginless parsys_column">
                                                        <div class="parbase section filter-section-payment">
                                                            <label for="payment">Payment Types</label>

                                                            <div class="vertical">
                                                                <ul class="filter-checkbox">
                                                                    <li><input type="checkbox" checked name="" id=""><label>Cash</label></li>

                                                                    <li><input type="checkbox" checked name="" id=""><label>Check</label></li>

                                                                    <li><input type="checkbox" checked name="" id=""><label>Credit Card</label></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="parsys parsys1 twc-col3_255025-c1 marginless parsys_column">
                                                        <div class="parbase section filter-section-services">
                                                            <label for="services">Services Available</label>

                                                            <div class="50-50 section columnControl">
                                                                <div class="parsys_column twc-col2_5050">
                                                                    <div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                                                                        <div class="parbase section">
                                                                            <div class="vertical">
                                                                                <ul>
                                                                                    <li><input type="checkbox" checked name="" id=""><label>Demo Center</label></li>

                                                                                    <li><input type="checkbox" checked name="" id=""><label>Self Install</label></li>

                                                                                    <li><input type="checkbox" checked name="" id=""><label>Payment Centers</label></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>

                                                                        <div class="new section"></div>
                                                                    </div>

                                                                    <div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                                                                        <div class="parbase section">
                                                                            <div class="vertical">
                                                                                <ul>
                                                                                    <li><input type="checkbox" checked name="" id=""><label>24-Hour Payment</label></li>

                                                                                    <li><input type="checkbox" checked name="" id=""><label>Return Equipment</label></li>

                                                                                    <li><input id="icon-exchange" type="checkbox" checked name=""><label>Exchange Equipment</label></li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>

                                                                        <div class="new section"></div>
                                                                    </div>
                                                                </div>

                                                                <div class="columnClear"></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="parsys parsys0 twc-col3_255025-c3 parsys_column">
                                                        <div class="parbase section filter-section-office">
                                                            <label for="office">Office</label>

                                                            <div class="vertical">
                                                                <ul>
                                                                    <li><input type="checkbox" checked name="" id=""><label>TWC Office Only</label></li>

                                                                    <li><input type="checkbox" checked name="" id=""><label>Retail Stores</label></li>
                                                                </ul>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div id="after-filters" class="after-filters">
                                                <div class="100 section columnControl">
                                                	<div class="parsys_column twc-col1_100">
                                                		<div class="parsys parsys0 twc-col1_100-c0 parsys_column">
                                                			<div class="parbase section">
                                                								
                                                				<div class="cta omega twc-icon-after icon-angle-right mobile-full right">
                                                                    <a href="#"><span>Find Stores</span></a>
                                                                </div>				
                                                                
                                                			</div>
                                                		<div class="new section"></div>
                                                		</div>
                                                	</div>
                                                	<div class="columnClear"></div>
                                                </div>
                                            </div>
                                            
                                        </fieldset>
                                    </div>
                                </div><!-- .locate stores filters -->
                            </div>

                            <div class="new section"></div>
                        </div>
                    </div>

                    <div class="columnClear"></div>
                </div>
            </div>
        </form>
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

        <div class="cap tablet-hidden"></div>

        <div class="stores_details_map_container">
            <div class="stores_details_map_info">
                <span class="h5">Currently showing (4) locations near Birmingham, AL</span>

                <div class="right">
                    <?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/share.php'); ?>
                </div>
            </div>

            <div class="parsys_column twc-col2_3367-c0 stores_location_details tab-content" id="stores_map_details">
                <div class="stores_locations_details_legend">
                    <div class="legend_icons">
                        <div class="50-50 section columnControl">
                            <div class="parsys_column twc-col2_5050">
                                <div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                                    <div class="parbase section">
                                        <ul>
                                            <li><span class="icon-money"></span>Cash</li>
                                            <li><span class="icon-list-alt"></span>Check</li>
                                            <li><span class="icon-credit-card"></span>Credit Card</li>
                                            <li><span class="icon-eye-open"></span>Demo Center</li>
                                            <li><span class="icon-wrench"></span>Self Install</li>
                                            <li><span class="icon-dollar"></span>Payment Center</li>
                                        </ul>
                                    </div>

                                    <div class="new section"></div>
                                </div>

                                <div class="parsys parsys1 twc-col2_5050-c1 parsys_column">
                                    <div class="parbase section">
                                        <ul>
                                            <li><span class="icon-time"></span>24-Hour Payment</li>
                                            <li><span class="icon-download"></span>Return Equipment</li>
                                            <li><span class="icon-exchange"></span>Exchange Equipment</li>
                                            <li><span class="icon-building"></span>TWC Office Only</li>
                                            <li><span class="icon-shopping-cart"></span>Retail Store</li>
                                            <li><span class="icon-flag red-icon"></span>New Store</li>
                                        </ul>
                                    </div>

                                    <div class="new section"></div>
                                </div>
                            </div>

                            <div class="columnClear"></div>
                        </div>
                    </div>

                    <div class="legend_note">
                        <p><b>NOTE:</b> Not all stores will exchange equipment; please check the details of each location.</p>
                    </div>
                </div>

                <div class="location_listing vertical lined alt">
                    <ul id="paymentcenterresults">
                        <li id="outputDiv0" class="outputdiv 2666">
                            <div class="50-50 section columnControl">
                                <div class="parsys_column twc-col2_5050">
                                    <div class="parsys parsys0 twc-col2_5050-c0 parsys_column">
                                        <div class="parbase section">
                                            <a href="#">S. Manhattan</a>

                                            <address>
                                                46A East 23rd Street<br>
                                                New York, NY 10010
                                            </address><br>
                                            <br>
                                            <b>Hours</b><br>
                                            Mon-Fri 8am - 7pm<br>
                                            Sat 8am - 5pm<br>
                                            <br>
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

                                            <div class="pType icon-flag red-icon"></div><br>
                                            <b>Location Options</b>

                                            <div class="bulleted">
                                                <ul>
                                                    <li class="service_selfinstall">Self Install</li>

                                                    <li class="service_alldaypayment">24-Hour Payment</li>

                                                    <li class="service_democenter">Demo Center</li>

                                                    <li class="service_newequipment">New Equipment</li>

                                                    <li class="service_boxswap">Box Swap</li>

                                                    <li class="service_setup">Setup</li>

                                                    <li class="service_setup">Equipment Exchanges</li>
                                                </ul>
                                            </div>
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
                                                46A East 23rd Street<br>
                                                New York, NY 10010
                                            </address><br>
                                            <br>
                                            <b>Hours</b><br>
                                            Mon-Fri 8am - 7pm<br>
                                            Sat 8am - 5pm<br>
                                            <br>
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

                                            <div class="pType icon-flag red-icon"></div><br>
                                            <b>Location Options</b>

                                            <div class="bulleted">
                                                <ul>
                                                    <li class="service_selfinstall">Self Install</li>

                                                    <li class="service_alldaypayment">24-Hour Payment</li>

                                                    <li class="service_democenter">Demo Center</li>

                                                    <li class="service_newequipment">New Equipment</li>

                                                    <li class="service_boxswap">Box Swap</li>

                                                    <li class="service_setup">Setup</li>

                                                    <li class="service_setup">Equipment Exchanges</li>
                                                </ul>
                                            </div>
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
                                                46A East 23rd Street<br>
                                                New York, NY 10010
                                            </address><br>
                                            <br>
                                            <b>Hours</b><br>
                                            Mon-Fri 8am - 7pm<br>
                                            Sat 8am - 5pm<br>
                                            <br>
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

                                            <div class="pType icon-flag red-icon"></div><br>
                                            <b>Location Options</b>

                                            <div class="bulleted">
                                                <ul>
                                                    <li class="service_selfinstall">Self Install</li>

                                                    <li class="service_alldaypayment">24-Hour Payment</li>

                                                    <li class="service_democenter">Demo Center</li>

                                                    <li class="service_newequipment">New Equipment</li>

                                                    <li class="service_boxswap">Box Swap</li>

                                                    <li class="service_setup">Setup</li>

                                                    <li class="service_setup">Equipment Exchanges</li>
                                                </ul>
                                            </div>
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
                                                46A East 23rd Street<br>
                                                New York, NY 10010
                                            </address><br>
                                            <br>
                                            <b>Hours</b><br>
                                            Mon-Fri 8am - 7pm<br>
                                            Sat 8am - 5pm<br>
                                            <br>
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

                                            <div class="pType icon-flag red-icon"></div><br>
                                            <b>Location Options</b>

                                            <div class="bulleted">
                                                <ul>
                                                    <li class="service_selfinstall">Self Install</li>

                                                    <li class="service_alldaypayment">24-Hour Payment</li>

                                                    <li class="service_democenter">Demo Center</li>

                                                    <li class="service_newequipment">New Equipment</li>

                                                    <li class="service_boxswap">Box Swap</li>

                                                    <li class="service_setup">Setup</li>

                                                    <li class="service_setup">Equipment Exchanges</li>
                                                </ul>
                                            </div>
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
                                                46A East 23rd Street<br>
                                                New York, NY 10010
                                            </address><br>
                                            <br>
                                            <b>Hours</b><br>
                                            Mon-Fri 8am - 7pm<br>
                                            Sat 8am - 5pm<br>
                                            <br>
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

                                            <div class="pType icon-flag red-icon"></div><br>
                                            <b>Location Options</b>

                                            <div class="bulleted">
                                                <ul>
                                                    <li class="service_selfinstall">Self Install</li>

                                                    <li class="service_alldaypayment">24-Hour Payment</li>

                                                    <li class="service_democenter">Demo Center</li>

                                                    <li class="service_newequipment">New Equipment</li>

                                                    <li class="service_boxswap">Box Swap</li>

                                                    <li class="service_setup">Setup</li>

                                                    <li class="service_setup">Equipment Exchanges</li>
                                                </ul>
                                            </div>
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

            <div class="twc-col2_3367-c1 stores_map tab-content" id="stores_map_map">
                <div id="map-canvas"></div>
            </div>
        </div>
    </div>
    
<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>
