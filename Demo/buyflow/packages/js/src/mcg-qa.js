/* requires JQUERY */
var TWC = TWC || {};
TWC.qa = TWC.qa || {};
TWC.qa = {
	osdEnabled : 1,
	osd : null,
	timers : {},
	log: function(o, osd) {
		try {console.log(o)} catch(e) {}
		if (this.osdEnabled && osd !== undefined) {
			if (this.osd == null)
			{
				logEl = $('<div id="twcLog"  style="z-index:5000;font-size: 11px;border-color: #dddddd; border-style: solid; border-width: 1px 1px 0 0; padding: 2px; position: fixed; bottom: 0; right: 0px;background: black !important; color: lime; font-size: 11px; font-family: arial;">\
				           <div style="color: #aaaaaa !important; text-align: right;"><a style="font-size; 9px !important; color: #aaaaaa !important; " href="javascript:void(0)" onclick="$(\'#twcLog\').hide().find(\'.log-entry\').remove();return false;">clear</a></div>\
				           <div id="twcLogContent" style="color: lime;font-size: 11px; padding: 5px;"></div>\
				         </div>');
				$('body').append(logEl);
				this.osd = $('#twcLogContent');
			}
			this.osd.append('<div class="log-entry">'+o+'</div>');
			$('#twcLog').show();
		}
	},
	info: function(o) {try {console.info(o)} catch(e) {}},
	logLapsed : function(label, osd) {
		var label = (label !== undefined)? label+" at " : "";
		var started = McG_PAGE_START_TIME || 10000000000000;
		var lapsed = (new Date().getTime()) - started;
		TWC.qa.log(label+(lapsed/1000)+'s', osd);
	},
	logStart: function(key) {
		this.timers[key] = new Date().getTime();
	},
	logStop: function(key, osd) {
		if (this.timers[key] === undefined) {
			TWC.qa.log(key+" timer not found", osd);
		} else {
			var lapsed = (new Date().getTime()) - this.timers[key];
			TWC.qa.log(key+' '+(lapsed/1000)+'s completed', osd);
		}
	}
}
$(document).ready(function() {
	TWC.qa.logLapsed('DOM Markup Loaded',1)
});
$(window).on('load',function() {
	TWC.qa.logLapsed('Page Completed',1)
});

