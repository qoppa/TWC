
	<!-- Banner Component -->
	<header role="banner" class="twc-banner">
    	<?php 
			if ($breadcrumbs) {
	    echo '<div class="twc-breadcrumbs-gradient twc-full">
	        <div class="twc-container"></div>
	    </div>';
	    	}
	    ?>
        <div class="twc-container">
            <div class="parsys breadcrumbs">
                <div class="twc-breadcrumbs section">
		            <ul class="horizontal slashes">
		        <?php 
		        	if ($breadcrumbs) {
		            	if ($breadcrumb_A !='') { 
		        			echo "<li><a href=''>$breadcrumb_A</a></li>";
		        			
		        		} else {
		        		
		            		echo "<li><a href=''>Your Home</a></li>";
		            	}
		
		            	if ($breadcrumb_B !='') { 
		            		echo "<li><a href=''>$breadcrumb_B</a></li>";
		            	}
		
		            	if ($banner_title !='') { 
		            		echo "<li><a href=''>$breadcrumb_C</a></li>";
		            	}					
		            }
		        ?>
		            </ul>
                </div>

                <div class="new section"></div>
            </div>

            <h1><?=$banner_title?></h1>
        </div>
    </header>
	<!-- .Banner Component -->
