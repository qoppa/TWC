<?
if($_SERVER['REQUEST_URI'] !== '/TWC/styleguide/') {
	include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php');
} 
?>

            <h3>Non-Chronological Content</h3>

			<div class="pagination">
				<ol>
					<li>
					    <div class="btn blue disabled page_first">
    					    <a type="button">
    					        <span class="icon-double-angle-left"></span>
                            </a>
					    </div>
					</li>
					<li>
					    <div class="btn blue page_prev disabled">
    					    <a type="button" rel="prev">
    					        <span class="twc-icon-before icon-angle-left"></span>
    					        <span class="text">Previous</span>
                            </a>
                        </div>
					</li>
					<li>
    					<div class="btn blue number disabled">
        					<a type="button">1</a>
    					</div>
					</li>
					<li>
					    <div class="btn blue number">
    					    <a type="button">2</a>
					    </div>
					</li>
					<li>
						<div class="btn blue number">
    					    <a type="button">3</a>
					    </div>
					</li>
					<li>
					    <div class="btn blue page_next">
    					    <a type="button" rel="next">
    					        <span class="text">Next</span>
    					        <span class="twc-icon-after icon-angle-right"></span>
                            </a>
					    </div>
					</li>
					<li>
					<div class="btn blue page_last">
    					<a type="button">
    					    <span class="icon-double-angle-right"></span>
                        </a>
					</div>
					</li>
				</ol>
	        </div>
	        
	        <hr>
	        
	        <h3>Chronological Content</h3>
	        
	        <div class="pagination">
				<ol>
					<li>
					    <div class="btn blue disabled page_first">
    					    <a type="button">
    					        <span class="icon-double-angle-left"></span>
                            </a>
					    </div>
					</li>
					<li>
					    <div class="btn blue page_prev disabled">
    					    <a type="button" rel="prev">
    					        <span class="twc-icon-before icon-angle-left"></span>
    					        <span class="text">Older</span>
                            </a>
                        </div>
					</li>
					<li>
    					<div class="btn blue number disabled">
        					<a type="button">1</a>
    					</div>
					</li>
					<li>
					    <div class="btn blue number">
    					    <a type="button">2</a>
					    </div>
					</li>
					<li>
						<div class="btn blue number">
    					    <a type="button">3</a>
					    </div>
					</li>
					<li>
					    <div class="btn blue page_next">
    					    <a type="button" rel="next">
    					        <span class="text">Newer</span>
    					        <span class="twc-icon-after icon-angle-right"></span>
                            </a>
					    </div>
					</li>
					<li>
					<div class="btn blue page_last">
    					<a type="button">
    					    <span class="icon-double-angle-right"></span>
                        </a>
					</div>
					</li>
				</ol>
	        </div>

<?
if($_SERVER['REQUEST_URI'] !== '/TWC/styleguide/') {
	include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php');
} 
?>
	