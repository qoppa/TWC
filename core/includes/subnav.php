
	<!-- Begin SubNav Component -->
	<nav role="navigation" class="twc-sub-navigation twc-full twc-backgroundGradient-4">
	    <div class="twc-container">
	    	
	    	<?php if ($simpleSubnav) { ?>
			<?=$simpleSubnav?>
			<?php } else { ?>
			
	    	<h1><?=$breadcrumb_B?></h1>
			
			<div class="subnav navList">
				
		        <ul>
		            <li<? if ($subNavSection =='1') {?> class="twc-active"<? } ?>><div class="smartLink packages parbase"><?=$subnav_1?></div></li>
		
		            <li<? if ($subNavSection =='2') {?> class="twc-active"<? } ?>><div class="smartLink parbase tv"><?=$subnav_2?></div></li>
		
		            <li<? if ($subNavSection =='3') {?> class="twc-active"<? } ?>><div class="smartLink parbase internet"><?=$subnav_3?></div></li>
		
		            <li<? if ($subNavSection =='4') {?> class="twc-active"<? } ?>><div class="phone smartLink parbase"><?=$subnav_4?></div></li>
		
		            <li<? if ($subNavSection =='5') {?> class="twc-active"<? } ?>><div class="smartLink parbase events"><?=$subnav_5?></div></li>
		
		            <li<? if ($subNavSection =='6') {?> class="twc-active"<? } ?>><div class="smartLink intelligenthome parbase"><?=$subnav_6?></div></li>
		            
		            <li<? if ($subNavSection =='7') {?> class="twc-active"<? } ?>><div class="smartLink parbase myservices"><?=$subnav_7?></div></li>
		            
		            <li<? if ($subNavSection =='8') {?> class="twc-active"<? } ?>><div class="twc_tv smartLink parbase"><?=$subnav_8?></div></li>
		            
		            <li<? if ($subNavSection =='9') {?> class="twc-active"<? } ?>><div class="smartLink support parbase"><?=$subnav_9?></div></li>
		            
		            <li<? if ($subNavSection =='10') {?> class="twc-active"<? } ?>><div class="smartLink parbase apps"><?=$subnav_10?></div></li>
		        </ul>
		        
			</div>
			<?php } ?>
	    	
	    </div>
	</nav>
	<!-- End SubNav Component -->
