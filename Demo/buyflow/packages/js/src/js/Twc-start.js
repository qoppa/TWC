/**
	* @author McGowan
	* @namespace
	*/
var Twc = Twc || {}

/** @author McGowan
  * Logs a message to on-screen console for ipad and stuff
  * @param o {Object} object to show
  * @param isError {Boolean} indicates error message
  */
function logOsd(o, isError) {
	var $osdConsole = $('#twcLog');
	var color = isError? 'red' : 'lime';
	if ($osdConsole.length === 0)
	{
		logEl = $('<div id="twcLog"  style="z-index:5000;font-size: 11px;border-color: #dddddd; border-style: solid; border-width: 1px 1px 0 0; padding: 2px; position: fixed; bottom: 0; right: 0px;background: black !important; color: lime; font-size: 11px; font-family: arial;">\
		           <div style="color: #aaaaaa !important; text-align: right;"><a style="font-size; 9px !important; color: #aaaaaa !important; " href="javascript:void(0)" onclick="$(\'#twcLog\').hide().find(\'.log-entry\').remove();return false;">clear</a></div>\
		           <div id="twcLogContent" style="font-size: 11px; padding: 5px;"></div>\
		         </div>');
		$('body').append(logEl);
		$osdConsole = $('#twcLog');
	}
	$osdConsole.find('#twcLogContent').append('<div style="color: '+color+';" class="log-entry">'+o+'</div>');
	$osdConsole.show();
}

/** Try/Catch convenince of console.log(o)
	* @author McGowan
	* @param {Object} o Object to log
	* @param {Boolean} osd use on-screen display (for mobile devices)
	*/
function log(o, osd) {
	var onScreen = osd || Twc.Settings.forceLogOsd;
	try {console.log(o)} catch(e) {}
	if (onScreen) {
		logOsd(o,0);
	}
}
/** Try/Catch convenince of console.error(o)
	* @author McGowan
	* @param {Object} o Object to log
	* @param {Boolean} osd use on-screen display (for mobile devices)
	*/
function error(o, osd) {
	var onScreen = osd || Twc.Settings.forceErrorOsd;
	try {console.error(o)} catch(e) {}
	if (onScreen) {
		logOsd(o,1);
	}
}
/** Try/Catch convenince of console.warn(o)
	* @author McGowan
	* @param {Object} o Object to log
	* @param {Boolean} osd use on-screen display (for mobile devices)
	*/
function warn(o, osd) {
	var onScreen = osd || Twc.Settings.forceErrorOsd;
	try {console.warn(o)} catch(e) {}
	if (onScreen) {
		logOsd(o,1);
	}
}
/** Try/Catch convenince of console.dir(o)
	* @author McGowan
	* @param {Object} o Object to log
	*/
function dir(o) {
	try {console.dir(o)} catch (e) {}
}

// Ensure IE CSS selector (ie6,ie7,etc...) is set
if (Modernizr && Modernizr.addTest) {
	// from http://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
    rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        rv = document.documentMode;
        if (rv == undefined || rv == 0) {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
    }
    if (rv != -1) {
    	Modernizr.addTest('ie'+rv, function() {
        	return true;
    	});
    }
}
