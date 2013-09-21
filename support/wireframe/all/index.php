<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>

				<div id="<?php if ($page_ID !='') { echo($page_ID);}?>">
				
				<h2>How Column Control Works</h2>
	
<pre>
	<code>
&lt;section class="twc-row twc-box-column"&gt;
    &lt;div class="parsys_column twc-col1_1"&gt;
        &lt;article class="parsys_column twc-col1_1-c0"&gt;
            &lt;p&gt;Columns live inside of a 'twc-row'&lt;/p&gt;
            &lt;p&gt;Inside each row is an element with 'parsys_column' and the column designator&lt;/p&gt;
        &lt;/article&gt;
    &lt;/div&gt;
&lt;/section&gt;

Peep the code below - it'll update as you hit each breakpoint
	</code>
</pre>
<br><br>			
					<h2>100 - twc-col1_1</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col1_1-c0 internal">
							100
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
   [class*='twc-col1_1-c'] { width: 100%; }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
   [class*='twc-col1_1-c'] { width: 100%; }
    </code>
</pre>
</div>		

<div class="mobile">
<pre>
    <code>  
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>				

					</section>					

					<h2>76/24 - twc-col2_7624</h2>			
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col2_7624-c0 internal">
							76
						</article>	
						<article class="parsys_column twc-col2_7624-c1 internal">
							24
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col2_7624-c'] { width: 23.25%; }
	
		[class*='twc-col2_7624-c0'] { width: 75.25%; }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col2'] {
		width: 100%;
		margin-left: 0;
	}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>
					</section>
										
					<h2>75/25 - twc-col2_7525</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col2_7525-c0 internal">
							75
						</article>	
						<article class="parsys_column twc-col2_7525-c1 internal">
							25
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
[class*='twc-col2_7525-c']:first-child {
	width: 74.625%;
}

	[class*='twc-col2_7525-c'] {
		width: 23.875%;
	}   
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col2'] {
		width: 100%;
		margin-left: 0;
	}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>

					</section>
										
					<h2>67/33 - twc-col2_6733</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col2_6733-c0 internal">
							67
						</article>	
						<article class="parsys_column twc-col2_6733-c1 internal">
							33
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col2_6733-c'] { width: 32.25%; }
	
		[class*='twc-col2_6733-c0'] { width: 66.25%; }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col2'] {
		width: 100%;
		margin-left: 0;
	}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>

					</section>
										
					<h2>60/40 - twc-col2_6040</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col2_6040-c0 internal">
							60
						</article>	
						<article class="parsys_column twc-col2_6040-c1 internal">
							40
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col2_6040-c'] { width: 39.25%; }
		
		[class*='twc-col2_6040-c0'] { width: 59.25%; }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col2'] {
		width: 100%;
		margin-left: 0;
	}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>

					</section>
										
					<h2>55/45 - twc-col2_5545</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col2_5545-c0 internal">
							55
						</article>	
						<article class="parsys_column twc-col2_5545-c1 internal">
							45
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col2_5545-c'] { width: 44.25%; }
		
		[class*='twc-col2_5545-c0'] { width: 54.25%; }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col2'] {
		width: 100%;
		margin-left: 0;
	}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>

					</section>
										
					<h2>50/50 - twc-col2_5050</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col2_5050-c0 internal">
							50
						</article>	
						<article class="parsys_column twc-col2_5050-c1 internal">
							50
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col2_5050-c'] { width: 49.25%; }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col2'] {
		width: 100%;
		margin-left: 0;
	}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>

					</section>
										
					<h2>50/25/25 - twc-col3_502525</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col3_502525-c0 internal">
							50
						</article>	
						<article class="parsys_column twc-col3_502525-c1 internal">
							25
						</article>
						<article class="parsys_column twc-col3_502525-c2 internal">
							25
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col3_502525-c'] { width: 23.875%; }

		[class*='twc-col3_502525-c0'] { width: 49.25%; }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col3_502525-c'] { width: 49.25%; }
	
	[class*='twc-col3_502525-c0'] { width: 100%; }
		
	[class*='twc-col3_502525-c1'] { margin-left: 0; }
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>

					</section>
										
					<h2>45/55 - twc-col2_4555</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col2_4555-c0 internal">
							45
						</article>	
						<article class="parsys_column twc-col2_4555-c1 internal">
							55
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col2_4555-c'] { width: 54.25%; }
	
		[class*='twc-col2_4555-c0'] { width: 44.25% }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col2'] {
		width: 100%;
		margin-left: 0;
	}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>

					</section>
					
					<h2>40/60 - twc-col2_4060</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col2_4060-c0 internal">
							40
						</article>	
						<article class="parsys_column twc-col2_4060-c1 internal">
							60
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col2_4060-c'] { width: 59.25%; }
		
		[class*='twc-col2_4060-c0'] { width: 39.25%; }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col2'] {
		width: 100%;
		margin-left: 0;
	}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>

					</section>					

					<h2>33/67 - twc-col2_3367</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col2_3367-c0 internal">
							33
						</article>	
						<article class="parsys_column twc-col2_3367-c1 internal">
							67
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col2_3367-c'] { width: 66.25%; }
	
		[class*='twc-col2_3367-c0'] { width: 32.25%; }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col2'] {
		width: 100%;
		margin-left: 0;
	}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>

					</section>
										
					<h2>33/33/33 - twc-col3_333333</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col3_333333-c0 internal">
							33
						</article>	
						<article class="parsys_column twc-col3_333333-c1 internal">
							33
						</article>
						<article class="parsys_column twc-col3_333333-c2 internal">
							33
						</article>												
 
 <div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col3_333333-c'] { width: 32.3333334%; }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col3_333333-c'] { 
		width: 100%; 
		margin-left: 0;
	}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>

					</section>
										
					<h2>25/25/50 - twc-col3_252550</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col3_252550-c0 internal">
							25
						</article>	
						<article class="parsys_column twc-col3_252550-c1 internal">
							25
						</article>
						<article class="parsys_column twc-col3_252550-c2 internal">
							50
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col3_252550-c'] { width: 23.875%; }
		
		[class*='twc-col3_252550-c2'] { width: 49.25%; }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col3_252550-c'] { width: 49.25%; }
	
	[class*='twc-col3_252550-c1'] { margin-top: 0; }
	
	[class*='twc-col3_252550-c2'] { 
		margin-left: 0; 
		width: 100%;
	}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
   [class*='twc-col3_252550-c1'] {
    	margin-top: 10px;	
    }
    </code>
</pre>
</div>

					</section>
											
					<h2>25/75 - twc-col2_2575</h2>													
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col2_2575-c0 internal">
							25
						</article>	
						<article class="parsys_column twc-col2_2575-c1 internal">
							75
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col2_2575-c'] { width: 74.625%; }
	
		[class*='twc-col2_2575-c0'] { width: 23.875%; }
    </code>
</pre>	
</div>	

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
[class*="twc-col"] {
    margin-left: 0;
    width: 100%;
}
    </code>
</pre>
</div>			
					</section>
										
					<h2>4 columns - twc-col4_4</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col4_4-c0 internal">
							25
						</article>	
						<article class="parsys_column twc-col4_4-c1 internal">
							25
						</article>
						<article class="parsys_column twc-col4_4-c2 internal">
							25
						</article>
						<article class="parsys_column twc-col4_4-c3 internal">
							25
						</article>													

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col4_4-c'] { width: 23.875%; }
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col4_4-c'] { width: 49.25%; }
	
		[class*='twc-col4_4-c']:nth-of-type(2n+1) { margin-left: 0; } 
	
	[class*='twc-col4_4-c1'] { margin-top: 0; }
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
	[class*='twc-col4']:nth-of-type(2) { margin-top: 10px; }
    </code>
</pre>
</div>

					</section>
										
					<h2>5 columns - twc-col5_5</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col5_5-c0 internal">
							20
						</article>
						<article class="parsys_column twc-col5_5-c1 internal">
							20
						</article>
						<article class="parsys_column twc-col5_5-c2 internal">
							20
						</article>
						<article class="parsys_column twc-col5_5-c3 internal">
							20
						</article>
						<article class="parsys_column twc-col5_5-c4 internal">
							20
						</article>												

<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col5_5-c'] { width: 18.8%; }  
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col5_5-c'] { width: 49.25%; }   
	
		[class*='twc-col5_5-c']:nth-of-type(2n+1) { margin-left: 0; }
		
	[class*='twc-col5_5-c1'] { margin-top: 0; }
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
	[class*='twc-col5']:nth-of-type(2) { margin-top: 10px; }
    </code>
</pre>
</div>

					</section>
										
					<h2>6 columns - twc-col6_6</h2>
					<section class="twc-row twc-box-column">
						<article class="parsys_column twc-col6_6-c0 internal">
							15
						</article>
						<article class="parsys_column twc-col6_6-c1 internal">
							15
						</article>
						<article class="parsys_column twc-col6_6-c2 internal">
							15
						</article>
						<article class="parsys_column twc-col6_6-c3 internal">
							15
						</article>
						<article class="parsys_column twc-col6_6-c4 internal">
							15
						</article>
						<article class="parsys_column twc-col6_6-c5 internal">
							15
						</article>																		
<div class="desktop">
<pre>
    <code>
/* ==========================
	Desktop
   ========================== */
   
	[class*='twc-col6_6-c'] { width: 15.4166667%; }  
    </code>
</pre>
</div>

<div class="tablet">
<pre>
    <code>
/* ==========================
	Tablet
   ========================== */
   
	[class*='twc-col6_6-c'] { width: 32.3333334%; }   
	
		[class*='twc-col6_6-c']:nth-of-type(4) { margin-left: 0; }
	
	[class*='twc-col6_6-c1'],
	[class*='twc-col6_6-c2'] { 
		margin-top: 0; 
	}
    </code>
</pre>
</div>

<div class="mobile">
<pre>
    <code>
/* ==========================
	Mobile
   ========================== */
   
   	[class*='twc-col6_6-c']:nth-of-type(1n+2) { margin-top: 10px; }
	
	[class*='twc-col6_6-c']:nth-of-type(4) { margin-left: 0; } 
    </code>
</pre>
</div>

					</section>				
									
				</div><!-- wrapper div id -->

<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>