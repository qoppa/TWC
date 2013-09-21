<?
if($_SERVER['REQUEST_URI'] !== '/TWC/styleguide/') {
	include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php');
} 
?>

            <h1>Inline Text Elements</h1>
			<hr>

			<div class="columnControl">
                <article class="parsys_column twc-box-column twc-col1_1-c0">
			
    			<!-- Text Emphasis Component -->
            	<span><a href="#">This is a text link</a></span>
                <br><br>
				<span><strong>Strong is used to indicate strong importance</strong></span>
				<br><br>
				<span><em>This text has added emphasis</em></span>
				<br><br>
				<span>The <b>b element</b> is stylistically different text from normal text, without any special importance</span>
				<br><br>
				<span>The <i>i element</i> is text that is set off from the normal text</span>
				<br><br>
				<span>The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual annotation</span>
				<br><br>
				<span>This text is deleted</del> and <ins>This text is inserted</ins></span>
				<br><br>
				<span><s>This text has a strikethrough</s></span>
				<br><br>
				<span>Superscript<sup>&reg;</sup></span>
				<br><br>
				<span>Subscript for things like H<sub>2</sub>O</span>
				<br><br>				
				<span>Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr></span>
				<br><br>
				<span>Keybord input: <kbd>Cmd</kbd></span>
				<br><br>
				<span><q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This text is a short inline quotation</q></span>
				<br><br>
				<span><cite>This is a citation</cite></span>
				<br><br>
				<span>The <dfn>dfn element</dfn> indicates a definition.</span>
				<br><br>
				<span>The <mark>mark element</mark> indicates a highlight</span>
				
				<hr>
				
				<h3>Address</h3>
				
				<address>Address Name<br />1234 Main St.<br />Anywhere, US 101010</address>
				
				<hr>
				
				<h3>Telephone Number</h3>
				
				<a class="tel" href="tel:+18008519530">1-800-851-9530</a>
				
				<hr>
				
				<h3>Time & Date</h3>
				
				<time class="post-date" datetime="2013-05-22" pubdate=""><? $now = new DateTime(null, new DateTimeZone('America/Denver'));
echo $now->format('Y-m-d H:i:s'); ?></time>

				<hr>
				
				<h3>Blockquote</h3>
				
				<blockquote>
				    One small step for man, one giant leap for mankind.
				</blockquote>
    	
    			<!-- .Inline Text Component -->
    			
                </article>
			</div>

<?
if($_SERVER['REQUEST_URI'] !== '/TWC/styleguide/') {
	include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php');
} 
?>
	