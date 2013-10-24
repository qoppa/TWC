	<!-- Page & Module Specific JS -->
	<script src="js/jquery.easing.1.3.js" type="text/javascript"></script>

	<script type="text/javascript">
		jQuery(document).ready(function() {
			jQuery(".content").hide();
				//toggle the componenet with class msg_body
				jQuery(".pusher").click(function()
			{
				jQuery(this).next(".mover").slideToggle(500);
			});
		});
	</script>
