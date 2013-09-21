/**
  *  Contains code to return templates used with JSON for rendering HTML.  Current implementation is dust.js
	* @author McGowan
	* @namespace
	*/
Twc.Templates = (function() {
	// stores the template ID if compiled
	var compiledTemplates = {};

	/** Compiles a template and loads it into dust's cache
	  * @author McGowan
	  * @param{String} id of template
	  * @returns compiled template
	  */
	function loadTemplate(id) {
		var templateUrl = Twc.Settings.templateUrls[id];
		var template = Twc.Util.getUrl(templateUrl, 'text');
		var templateCompiled = dust.compile(template, id);
		dust.loadSource(templateCompiled);
		compiledTemplates[id] = 1;
	}

	return {
		/**
		  * @author McGowan
		  * @returns rendered content string
		  */
		getRenderedOutput : function(templateId, jsonData) {
			try {
				if (!compiledTemplates[templateId]) {
					loadTemplate(templateId);
				}
				var rendered;
				dust.render(templateId, jsonData, function(err, out) {
					rendered = out;						
				});
				return rendered;
			} catch (e) {Twc.Util.catchError(e)}
		}
	}
})();