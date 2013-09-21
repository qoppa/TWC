<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>
		
				<!--[if IE 8]>
					<center>
						<h2 style="color: red;">This feature is not fully supported in IE8 or older</h2>
					</center
				<![endif]-->
		
				<div class="speedtestBox">
					<section role="main" id="speedtest" class="twc-box-column">
						<div class="speedtestHeader">
					    	<h2>Optimize your internet -<br>How to get the most of your devices</h2>
					    </div>
					    
					    <div class="devices">
					        <h3>Select the number of devices in your home</h3>
					         <div class="selects">  
					         	<form id="IST" action="" method="post" onsubmit="return calcTotal(this)">
					            <div class="device-section">
					                <div class="horizantalOption selectHeader">
					                 	<div class="checkcircle"></div>
					                	<div class="device-image-1"></div>
					                	<label>Computer(s)</label>
					                	<div class="styled-select">
					                    	<select id="select-device1" name="select-device">
								                <option value="0">0</option>
								                <option value="1">1</option>
								                <option value="2">2</option>
								                <option value="3">3</option>
								            </select>
					                	</div>
					                </div>
					
					                <div class="horizantalOption selectHeader">
					                 	<div class="checkcircle"></div>
					                	<div class="device-image-2"></div>
					                	<label>Tablet(s) </label>
					                	<div class="styled-select">
					                    	<select id="select-device2" name="select-device">
								                <option value="0">0</option>
								                <option value="1">1</option>
								                <option value="2">2</option>
								                <option value="3">3</option>
								            </select>
					                	</div>
					                </div>
					
					                <div class="horizantalOption selectHeader">
					                 	<div class="checkcircle"></div>
					                	<div class="device-image-3"></div>
					                	<label>Smart Phone(s)</label>
					                	<div class="styled-select">
					                    	<select id="select-device3" name="select-device">
								                <option value="0">0</option>
								                <option value="1">1</option>
								                <option value="2">2</option>
								                <option value="3">3</option>
								            </select>
					                	</div>
					                </div>
					
					                <div class="horizantalOption selectHeader">
					                 	<div class="checkcircle"></div>
					                	<div class="device-image-4"></div>
					                	<label>Game System(s)</label>
					                	<div class="styled-select">
					                    	<select id="select-device4" name="select-device">
								                <option value="0">0</option>
								                <option value="1">1</option>
								                <option value="2">2</option>
								                <option value="3">3</option>
								            </select>
					                	</div>
					                </div>
					
					                <div class="horizantalOption selectHeader">
					                 	<div class="checkcircle"></div>
					                	<div class="device-image-5"></div>
					                	<label>Streaming Devices(s)</label>
					                	<div class="styled-select">
					                    	<select id="select-device5" name="select-device">
								                <option value="0">0</option>
								                <option value="1">1</option>
								                <option value="2">2</option>
								                <option value="3">3</option>
								            </select>
					                	</div>
					                </div>
					                			
					                <div class="horizantalOption selectHeader">
					                 	<div class="checkcircle"></div>
					                	<div class="device-image-6"></div>
					                	<label>Smart TV(s)</label>
					                	<div class="styled-select">
					                    	<select id="select-device6" name="select-device">
								                <option value="0">0</option>
								                <option value="1">1</option>
								                <option value="2">2</option>
								                <option value="3">3</option>
								            </select>
					                	</div>
					                </div>
					
					                <div class="horizantalOption selectHeader">
					                 	<div class="checkcircle"></div>
					                	<div class="device-image-7"></div>
					                	<label>Smart Fitness Devices(s)</label>
					                	<div class="styled-select">
					                    	<select id="select-device7" name="select-device">
								                <option value="0">0</option>
								                <option value="1">1</option>
								                <option value="2">2</option>
								                <option value="3">3</option>
								            </select>
					                	</div>
					                </div>
					
					                <div class="horizantalOption selectHeader">
					                 	<div class="checkcircle"></div>
					                	<div class="device-image-8"></div>
					                	<label>Smart Appliance(s)</label>
					                	<div class="styled-select">
					                    	<select id="select-device8" name="select-device">
								                <option value="0">0</option>
								                <option value="1">1</option>
								                <option value="2">2</option>
								                <option value="3">3</option>
								            </select>
					                	</div>
					                </div>
					            </div> 
					            
					        </div>
					    </div>
					    
					    <div class="test">
					    	<h3>Connection Speed Results</h3>
					    	<div class="button-row">
					        	<button class="reset" id="reset" type="submit" name="btn" value="reset"><span id="">Reset</span></button>
					        	<button class="toggle" type="submit" name="btn" value="Test"><span id="button-text">Test</span></button>
					    	</div>
					            <input type="hidden" id="numDevices" />
					            <input type="hidden" id="speedMbps" />
					            </form>
					        <div class="speedtest-meters">
					        	<article class="gauges-container">   
							    	<div id="guage1"></div>
							    	<div id="guage2"><span id="devices-result" style="display:none;"></span></div>
							    	<div id="guage3"></div>
							    </article>
					        </div>
					        
					    </div>
					</section>
			          
					<div class="shop-speeds">   
						<h5>Recommended Speed:</h5>
						<h2>
							<span class="important speed-recommendation">Ultimate Internet<br>50Mbps<br>for xx/mo. more.</span>
						</h2>
						<span id="devices-result"></span>
							<button class="blue-button shop-speeds-button" type="submit" name="btn" value="shop-speeds">Shop Speeds</button>
					</div>
		</div>
		
<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>

