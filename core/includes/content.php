	
	<!-- Begin Content Wrapper -->
	<div class="twc-content">

<?	
	// Load Checkout Progress Bar if called
	if ($checkout_customize) { 
		include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/checkout_customize.php'); 
	}
	
	if ($checkout_review) { 
		include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/checkout_review.php');
	}
	
	if ($checkout_checkout) { 
		include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/checkout_checkout.php');
	}
	
	if ($checkout_confirm) { 
		include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/checkout_confirm.php');
	}
?>
		
		<div class="twc-container">
			<?php if ($subHead !='') { echo "<span class='twc-subHead'>$subHead</span>"; } ?>
			
			<div class="section columnControl">
			
			