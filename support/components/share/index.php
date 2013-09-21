<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>

			<!-- SHARE Module -->
			<div class="share">
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

				<!-- Social Media Component -->
				<div class="share-social">
				    <div class="btn blue share">
    					<button id="twitter">
    							<span class="icon-twitter"></span>
    					</button>
				    </div>
				    
				    <div class="btn blue share">
    					<button id="facebook">
    							<span class="icon-facebook"></span>
    					</button>
				    </div>
				    
				    <div class="btn blue share">		
    					<button id="linkedin">
    							<span class="icon-linkedin"></span>
    					</button>
				    </div>
				</div>
				<!-- .Social Media Component -->
			</div>
			<!-- .SHARE Module -->

<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>