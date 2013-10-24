	<!-- Share Component -->
	<div class="share">
		<!-- Print / Email Component -->
		<div class="share-emailPrint">
		    <?php 
					if(($printButton) || !isset($printButton))
					 echo '<div class="btn blue share twc-icon-before icon-print">
						<a id="print" onClick="window.print()">
							<span class="text">PRINT</span>
						</a>    
		    	</div>' 
			 ?>
              
			<?php if(($emailButton) || !isset($emailButton))
            echo '<div id="email" class="btn blue share twc-icon-before icon-envelope-alt">
                	<a href="">
                  		<span class="text">EMAIL</span>    
                	</a>
                </div>
            '
        	?>
			</div>

			<!-- // .Print / Email Component-->
			
			<!-- // Email Module -->

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
    	<?php if(($twitterButton) || !isset($twitterButton))
					echo '<div class="btn blue share icon-twitter">
				<a id="twitter">
				    <span></span>
				</a>
		    </div>'
		  ?>
      <?php if(($facebookButton) || !isset($facebookButton))
					echo '<div class="btn blue share icon-facebook">
				<a id="facebook">
				    <span></span>
				</a>
		    </div>'
			?>
		  
      <?php if(($linkedInButton) || !isset($linkedInButton))
					echo ' <div class="btn blue share icon-linkedin">		
						<a id="linkedin">
				    	<span></span>
					</a>
		    </div>'
			?>
		</div>
		<!-- .Social Media Component -->
	</div>
	<!-- .Share Component -->
		