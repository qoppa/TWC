<?
if($_SERVER['REQUEST_URI'] !== '/TWC/styleguide/') {
	include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php');
} 
?>

			<!-- Best Practices Component -->
            <div class="100 section columnControl">
            	<div class="parsys_column twc-col1_100">
            		<div class="parsys parsys0 twc-col1_100-c0 parsys_column">
            			<div class="parbase section">
            					
            				<h1>Best Practices</h1>
            				
            				<hr>
				
	                        <h3>Formatting</h3>
	
	                        <ul>
	                            <li>Space between selector and opening curly brace.</li>
	
	                            <li>Space after opening curly brace and declaration (single line) or line-break after opening curly brace (multi-line).</li>
	
	                            <li>Multiple selectors are separated by a comma and line-break.</li>
	
	                            <li>One selector/one attribute/one line - everything else is multiline (one exception: I break this rule for the reset just to keep it under control).</li>
	                        </ul>
<pre>
<code>.someDiv { color: #222; }  

.someOtherDiv,
.someAdditional Div {  
    margin: 0 auto;
    color: #222;  
} </code>
</pre>
	                        <hr>
	
							<h3>CSS Naming Guidelines</h3>
							
							
							<hr>
	
	                        <h3>General Formatting</h3>
	
	                        <p>Use a new line for every block, list or table element, and indent every such child element to show heirarchy and improve understanding</p>
<pre class="correct">
<code>.print {
    display: block;
    margin: 0;
    padding: 0 7px;
    height: 30px;
    background: #4f799f;
    line-height: 30px;
}

.print:hover { background: #265a83; }</code>
</pre>
	
	                        <p>Avoid Qualifying ID and class names with type selectors</p>
<pre class="error">
<code>// this is bad
ul#example { color: #ff0; }
div.error { color: red; }</code>
</pre>
<pre class="correct">
<code>// this is good
#example { color: #0f0; }
.error { color: green; }</code>
</pre>
	
	                        <p>p.s. ID's are bad for CSS, only use ID's for javascript hooks when necessary</p>
	                        <hr>
	
	                        <h3>Hexadecimal Notation</h3>
	
	                        <p>For color values that permit, 3 character hexadecimal is preferred</p>
<pre class="error">
<code>/* not recommended */
color: #00ff00;</code>
</pre>
<pre class="correct">
<code>/* not recommended */
color: #0f0;</code>
</pre>
	                        <hr>
	
	                        <h3>Declaration Organization</h3>
	
	                        <ol>
	                            <li>Box (Display, Float, Position, Left, Top, Width, Margin, Padding, etc.)</li>
	
	                            <li>Border</li>
	
	                            <li>Background</li>
	
	                            <li>Text</li>
	
	                            <li>Other</li>
	                        </ol>
<pre class="correct">
<code>.palette parsys_column {
    display: inline-block;
    margin: .5em .1em;
    padding: .5em 1em;
    width: 6em;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-size: 1.2rem;
}</code>
</pre>
	                        <hr>
	
	                        <h3 class="error">!important</h3>
	
	                        <h5>Just don't do it.</h5>
	                        <p>Use greater specificity to workaround using !important;</p>
	
	                        <hr>
	
	                        <h5>Use the SMACSS Approach</h5>
<pre class="corect">
/* ==========================================================================

Styles for 

Author: 
Version: 1.0 - Updated:

========================================================================== */





/* ==========================================================================
Base
========================================================================== */





/* ==========================================================================
Layout
========================================================================== */





/* ==========================================================================
Module
========================================================================== */





/* ==========================================================================
State
========================================================================== */

/* ==========================
Browser Specific
========================== */

/* Safari/Chrome/Webkit */
@media screen and (-webkit-min-device-pixel-ratio:0) {
/* selectors goes here */
}

/* Firefox */

/* Ah, Internet Explorer */
/* ie (.ie) */

/* ie7 (.ie7) */

/* ie8 (.ie8) */  

/* ie9 (.ie9) */



/* ==========================================================================
Theme
========================================================================== */







</pre>
	
	                        <h3>Commenting</h3>
<pre>
<code><br class="code-comment">// Section comments are styled thusly:<br><br>
/* ==========================================================================
Section
========================================================================== */
</code>
</pre>
<pre>
<code><br class="code-comment">// Section chunks get styled as such:<br><br>
/* ==========================
Chunk
========================== */</code>
</pre>
<pre>
<code><br class="code-comment">// Hints get styled like this:<br><br>/* Hint */</code>
</pre>
	                    </article>
					</div>
	                
	                <h3>ARIA &amp; Accessibility</h3>
	
                    <h5>Making it possible to provide an enhanced user experience for people with disabilities when using internet applications with assistive technologies.</h5>
                    <hr>

                    <h5>Landmark Roles</h5>

                    <p>banner - typically the "header" of the page</p>
<pre>
<code>&lt;header role="banner" class="header"&gt;&lt;/header&gt;</code>
</pre>

                    <p>navigation - any navigation list, typically the nav element</p>
<pre>
<code>&lt;nav role="navigation" class="nav"&gt;&lt;/nav&gt;</code>
</pre>

                    <p>main - the main content area</p>
<pre>
<code>&lt;section role="main" class="main"&gt;&lt;/main&gt;</code>
</pre>

                    <p>complimentary - information that is tangentially related to the main content</p>
<pre>
<code>&lt;aside role="complimentary" class="aside"&gt;&lt;/aside&gt;</code>
</pre>

                    <p>contentinfo - contains information about the parent document such as copyrights and privacy statements</p>
<pre>
<code>&lt;footer role="contentinfo" class="footer"&gt;&lt;/footer&gt;</code>
</pre>

					<hr>

					<h5>Using alt Text Properly</h5>
					<p>A few tips on how and when to use the alt attribute:</p>
					
					<ul>
						<li>Use the alt attribute for any image that is used as content.</li>
						<li>Use an empty alt atribute for any image that is decorative or not necessary for understanding the content of the page (alt=”“).</li>
						<li>Make sure the description of the image is useful. For example, if the image is your logo your alt should be your company name and not “logo”</li>
					</ul>
					
					<p>The alt attribute is meant to help users using assitive techonology not miss any content, so make sure your text is helpful to anyone not seeing the image.</p>
	                </div>
                </div>
            </div>

			</div>
			<!-- .Best Practices Component -->

<?
if($_SERVER['REQUEST_URI'] !== '/TWC/styleguide/') {
	include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php');
} 
?>

	