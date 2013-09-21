
				<div id="<?php if ($page_ID !='') { echo($page_ID);}?>">
				
				<?php
				
			if ($rows == 1) {
				
			}
			
			if ($columns == 1 || $columns == '') {
			echo '<section class="twc-row">
						
						<article class="parsys_column twc-col' .$columnLayout. '-c0">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col' .$columnLayout. '-c1">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
					</section>';
	    	}
			
			if ($columns == 2) {
			echo '<section class="twc-row">
						
						<article class="parsys_column twc-col' .$columnLayout. '-c0">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col' .$columnLayout. '-c1">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
					</section>';
	    	}
			
			if ($columns == 3) {
			echo '<section class="twc-row">
						
						<article class="parsys_column twc-col' .$columnLayout. '-c0">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col' .$columnLayout. '-c1">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col' .$columnLayout. '-c2">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>'.$columns.'</h2>
						</article>
						
					</section>';
	    	}
			
			if ($columns == 4) {
			echo '<section class="twc-row">
						
						<article class="parsys_column twc-col4_4-c0">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col4_4-c1">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col4_4-c2">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>'.$columns.'</h2>
						</article>
						
						<article class="parsys_column twc-col4_4-c3">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
					</section>';
	    	} 
				
			if ($columns == 5) {
			echo '<section class="twc-row">
						
						<article class="parsys_column twc-col5_5-c0">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col5_5-c1">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col5_5-c2">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>6!</h2>
						</article>
						
						<article class="parsys_column twc-col5_5-c3">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col5_5-c4">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>'.$columns.'</h2>
						</article>
						
					</section>';
	    	}
				
			if ($columns == 6) {
			echo '<section class="twc-row">
						
						<article class="parsys_column twc-col6_6-c0">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col6_6-c1">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col6_6-c2">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col6_6-c3">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col6_6-c4">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>kitteh!</h2>
						</article>
						
						<article class="parsys_column twc-col6_6-c5">
							<img class="large" src="http://placekitten.com/g/700/340" alt="">
							<h2>'.$columns.'!</h2>
						</article>
						
					</section>';
	    	}
	    ?>
				
				</div><!-- wrapper div id -->
