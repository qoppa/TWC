<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Buttons</title>
    <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
    
    <style>

        /* Basic CTA setup */
        .cta {
            display: inline-block;
            border-radius: 3px; }
    
        /* CTA a holds most of the styling */
        .cta a {
            display: inline-block;
            padding: .675em 1em;
            font-family: sans-serif;
            line-height: .5;
            text-decoration: none; }
        
        /* Thematic styling */
        .omega { background: #3376B2; }
        
            .omega a { color: #fff; }
    
        .black { background: #333; }
        
            .black a { color: #fff; }
    
        /* Deal with the icons and CQ5 component styling in out div */
        div[class*='icon-']:before { display: none; }    
        
        /* Set the text font style */
        [class*='icon-'] { font-family: sans-serif; }
        
        /* Set the font for the actual icon by targeting the :psuedo element */
        [class*=" icon-"]:before {
            font-family: FontAwesome;
            font-style: normal;
            font-weight: normal;
            text-decoration: inherit; }  
         
        /* Style the icon to appear before the cta text */        
        span.twc-icon-before[class*='icon-']:before { 
            float: left;
            margin-right: .5em; }
            
            /* Remove properties from outer div using component styles */
            div.span.twc-icon-before[class*='icon-']:before { 
                float: none;
                margin: 0; }
        
        /* Style the icon to appear after the cta text */  
        span.twc-icon-after[class*='icon-']:before { 
            float: right;
            margin-left: .5em; }
            
            /* Remove properties from outer div using component styles */
            div.span.twc-icon-after[class*='icon-']:before { 
                float: none;
                margin: 0; }
        
        
        /* CTA :hover properties */
        .cta.omega:hover { background: black; }
        
        /* CTA :active properties */
        .cta.omega:active { background: green; }
        
        /* CTA disabled properties */
        .cta.omega.disabled,
        .cta.omega[disabled] {
            background: grey;
        }
        
            .cta.omega.disabled a,
            .cta.omega[disabled] a {
                pointer-events: none;
                cursor: default;
            }
          
    </style>
  </head>
  
  <body>
                
    <div class="cta omega twc-icon-before icon-angle-left">
	    <a href="http://google.com">
	        <span class="twc-icon-before icon-angle-left">Button</span>
        </a>
    </div>
    
    <div class="cta omega twc-icon-after icon-angle-right">
	    <a href="http://google.com">
	        <span class="twc-icon-after icon-repeat">Button</span>
        </a>
    </div>
    
    <div class="cta omega twc-icon-after icon-angle-right disabled">
	    <a href="http://google.com">
	        <span class="twc-icon-after icon-angle-right">Button</span>
        </a>
    </div>

  </body>
</html>