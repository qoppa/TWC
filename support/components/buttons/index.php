<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>

				<h1>Buttons</h1>
				<hr>
				<p>Buttons can be made using multiple elements:</p>
					<ul>
						<li>&lt;button&gt;</li>
						<li>&lt;a&gt;</li>
						<li>&lt;input&gt;</li>
					</ul>
				<p>Applying .btn class sets the base styles without any colors. Colors can be added as an additonal class (i.e. class="btn blue").</p>
				
				<h5>A Blank &lt;button&gt;</h5>
				
				<div class="btn">
    				<button type="reset">
						Button
                    </button>
				</div>
<pre>
	<code>
&lt;button class="btn"&gt;
    Button
&lt;/button&gt;
	</code>
</pre>
				<hr>
				
				<h5>&lt;button&gt; with Text Only</h5>
				<div class="btn blue">
    				<button type="reset">
						Button
                    </button>
				</div>
<pre>
	<code>
&lt;div class="btn blue"&gt;
    &lt;button&gt;
    Button
    &lt;/button&gt;  				
&lt;/div&gt;
	</code>
</pre>
				<hr>
				
				<h5>&lt;button&gt; with Icon After Text</h5>
				<div class="btn blue">
    				<button type="reset">
						Button<span class="twc-icon-after icon-angle-right"></span>
                    </button>
				</div>
<pre>
	<code>
&lt;div class="btn blue"&gt;
    &lt;button&gt;
    Button&lt;span class="twc-icon-after icon-angle-right">&lt;/span&gt;
    &lt;/button&gt;  				
&lt;/div&gt;
	</code>
</pre>
					
				<p>Icons can be added on either side of the button by placing a &lt;span&gt; tag before or after the text. Based on the position, the class is either .twc-icon-before or .twc-icon-after; these take care of the appropriate spacing. The icon is added using the proper name (ex: 'icon-angle-right') of the glyph found on the <a href="http://maxquattromani.com/TWC/styleguide/#Symbols">styleguide</a>.</p>
				<hr>
				
				<h5>&lt;button&gt; with Icon Before Text</h5>
				<div class="btn blue">
				    <button>
						<span class="twc-icon-before icon-angle-left"></span>Button
                    </button>
				</div>
<pre>
	<code>
&lt;div class="btn blue"&gt;
    &lt;button&gt;
        &lt;span class="twc-icon-before icon-angle-left">&lt;/span&gt;Button
    &lt;/button&gt;  				
&lt;/div&gt;
	</code>
</pre>
				<hr>
				
				<h5>&lt;button&gt; with Icon After Text and .mobile-full Class Added</h5>
				<div class="btn blue mobile-full">
                    <button>
						<span class="twc-icon-before icon-angle-left"></span>Button
                    </button>  				
				</div>

<pre>
	<code>
&lt;div class="btn blue mobile-full"&gt;
    &lt;button&gt;
        &lt;span class="twc-icon-before icon-angle-left">&lt;/span&gt;Button
    &lt;/button&gt;  				
&lt;/div&gt;
	</code>
</pre>
				<p>The .mobile-full class adds 100% width in mobile breakpoint</p>
				<hr>
				
				<h5>A Blank &lt;a&gt; Button</h5>
				<div class="btn">
    				<a href="">
						Button
                    </a>
				</div>

<pre>
	<code>
&lt;div class="btn"&gt;
    &lt;a href=""&gt;
        Button
    &lt;/a&gt;  				
&lt;/div&gt;
	</code>
</pre>
				<hr>
				
				<h5>&lt;a&gt; with Icon After Text</h5>
				<div class="btn blue">
				    <a href="">
						Button<span class="twc-icon-after icon-angle-right"></span>
                    </a>
				</div>
<pre>
	<code>
&lt;div class="btn blue"&gt;
    &lt;a href=""&gt;
        Button&lt;span class="twc-icon-after icon-angle-right">&lt;/span&gt;
    &lt;/a&gt;  				
&lt;/div&gt;
	</code>
</pre>
				<hr>
				
				<h5>&lt;a&gt; with Icon Before Text</h5>
				<div class="btn blue">
    				<a href="">
    						<span class="twc-icon-before icon-angle-left"></span>Button
    				</a>
				</div>
<pre>
	<code>
&lt;div class="btn blue"&gt;
    &lt;a href=""&gt;
        &lt;span class="twc-icon-before icon-angle-left">&lt;/span&gt;Button
    &lt;/a&gt;  				
&lt;/div&gt;
	</code>
</pre>				
				<hr>
				
				<h5>&lt;a&gt; with Text Only</h5>
				<div class="btn blue">
				    <a href="">
						Button
                    </a>
				</div>
<pre>
	<code>
&lt;div class="btn blue"&gt;
    &lt;a href=""&gt;
        Button
    &lt;/a&gt;  				
&lt;/div&gt;
	</code>
</pre>	
				<hr>
				
				<h5>A Blank&lt;input&gt;</h5>
				<div class="btn">
				    <input type="reset" tabindex="" value="Clear">
				</div>
<pre>
	<code>
&lt;div class="btn"&gt;
    &lt;input class="btn" type="reset" tabindex="" value="Clear"&gt; 				
&lt;/div&gt;
	</code>
</pre>	
				<hr>
				
				<h5>&lt;input&gt;</h5>
				<div class="btn blue">
				    <input type="submit" tabindex="" value="Submit">
				</div>
<pre>
	<code>
&lt;div class="btn blue"&gt;
    &lt;input class="btn" type="reset" tabindex="" value="Clear"&gt; 				
&lt;/div&gt;
	</code>
</pre>	
				<hr>
				<h5>A Label &amp; Checkbox</h5>
				<div class="btn blue">
    				<label for="">Select</label>
					<input type="checkbox">
				</div>
<pre>
	<code>
&lt;div class="btn blue"&gt;
    &lt;label for=""&gt;
    Select
    &lt;input type="checkbox"&gt;
&lt;/label&gt; 				
&lt;/div&gt;

	</code>
</pre>

                <hr>
                
                <h1>CTAs</h1>
                
                <h5>A CTA with Icon After the Text</h5>
                
                <div class="cta blue twc-icon-after icon-angle-right">
    				<a href="#" analyticsname="test">
    					<span>after button test</span>
    				</a>
    			</div>
<pre>
	<code>
&lt;div class="cta blue twc-icon-after icon-angle-right"&gt;
    &lt;a href="#" analyticsname="test"&gt;
        &lt;span&gt;after button test&lt;/span&gt;
    &lt;/a&gt;
&lt;/div&gt;
	</code>
</pre>    			
    			<hr>
    			
    			<h5>A CTA with Icon Before the Text</h5>
    			
    			<div class="cta blue twc-icon-before icon-angle-left">
    				<a href="#" analyticsname="test">
    					<span>before button test</span>
    				</a>
    			</div>
<pre>
	<code>
&lt;div class="cta blue twc-icon-before icon-angle-left"&gt;
    &lt;a href="#" analyticsname="test"&gt;
        &lt;span&gt;before button test&lt;/span&gt;
    &lt;/a&gt;
&lt;/div&gt;
	</code>
</pre>

    			<hr>
    			
    			<h5>A CTA with Icon Only</h5>
    			
    			<div class="cta blue icon-angle-left">
    				<a href="#" analyticsname="test">
    					<span></span>
    				</a>
    			</div>
<pre>
	<code>
&lt;div class="cta blue icon-angle-left"&gt;
    &lt;a href="#" analyticsname="test"&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/a&gt;
&lt;/div&gt;
	</code>
</pre>

    			<hr>
    			
    			<h5>A CTA with Icon Only</h5>
    			
    			<div class="cta black twc-icon-before icon-angle-left mobile-full">
    				<a href="#" analyticsname="test">
    					<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto soluta atque ad! lorem13</span>
    				</a>
    			</div>
<pre>
	<code>
&lt;div class="cta blue icon-angle-left"&gt;
    &lt;a href="#" analyticsname="test"&gt;
        &lt;span&gt;&lt;/span&gt;
    &lt;/a&gt;
&lt;/div&gt;
	</code>
</pre>

<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>