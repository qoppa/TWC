
CQ.Ext.namespace("CQ.analytics");
CQ.Ext.namespace("CQ.analytics.SiteCatalyst");

CQ.analytics.registerServiceWidget = function(name, widget) {
    if(!name || (!name instanceof String) || name == "")
        return;
    
    CQ.analytics.services[name] = widget;
    
    // check for pending actions and execute it
    if(CQ.analytics.waitingForWidget[name].state == "action") {
        // must change state before calling the functions
        CQ.analytics.waitingForWidget[name].state = "loaded";
        if(CQ.analytics.waitingForWidget[name].action == "activate") {
           CQ.analytics.waitingForWidget[name].context.activateService(name); 
        }else if(CQ.analytics.waitingForWidget[name].action == "merge") {
           CQ.analytics.waitingForWidget[name].context.mergeServiceConfig(name, CQ.analytics.waitingForWidget[name].data); 
        }
    }
    
    CQ.analytics.waitingForWidget[name].state = "loaded";
};
CQ.analytics.waitingForWidget = {};

CQ.analytics.AnalyticsPanel = CQ.Ext.extend(CQ.Ext.Panel, {
    
    sortProperty: null,
    
    resourceType: null,
    
    fieldSet: null,
    
    inheritField: null,
    
    unlockCheckbox: null,
    
    hint: null,
    
    constructor: function(config) {
        
        var ref = this;
        
        //override default if configured
        this.sortProperty = (config.sortProperty) ? config.sortProperty : "title";
        
        this.resourceType = new CQ.Ext.form.Hidden({
            "name": "./analytics/sling:resourceType",
            "value": "cq/analytics/components/analytics",
            "defaultValue": "cq/analytics/components/analytics",
            "disabled": true
        });
        
        this.fieldSet = new CQ.form.DialogFieldSet({
            "collapsible": false,
            "collapsed": false,
            "style": "border:none"
        });
        
        this.inheritField = new CQ.Ext.form.TextField({
            "fieldLabel": CQ.I18n.getMessage("Inherited from"),
            "ignoreData": true,
            "readOnly": true
        });
        
        this.unlockCheckbox = new CQ.form.Selection({
            "fieldLabel": CQ.I18n.getMessage("Unlock"),
            "ignoreData": true,
            "type": "checkbox",
            "listeners": {
                "selectionchanged": function() {
                    var isChecked=(this.getValue().length>0);
                    var dlg=this.findParentByType('dialog');
                    var sets=dlg.findByType('checkablefieldset');
                    for(var i=0; i<sets.length;i++) {
                        sets[i].setDisabled(!isChecked);
                    }
                    ref.handleResourceType();
                }
            }
        });
        
        this.hint = new CQ.Static({
            "fieldLabel": CQ.I18n.getMessage("Note"),
            "text": CQ.I18n.getMessage("Unlocking and editing the configuration is irreversible and will override inherited configuration settings permanentely.")
        });
        
        this.fieldSet.add(this.inheritField);
        this.fieldSet.add(this.unlockCheckbox);
        this.fieldSet.add(this.hint);
        
        //sort items by sortProperty (ASC)
        config.items.sort(function(o1, o2) {
            if(o1[ref.sortProperty] === o2[ref.sortProperty]) {
                return 0; //equal
            } else 
            if(o1[ref.sortProperty] > o2[ref.sortProperty]) {
                return 1; //larger
            }else{
                return -1; //smaller
            }
        });
        
        config.items.unshift(this.resourceType);
        config.items.unshift(this.fieldSet);
        
        CQ.analytics.AnalyticsPanel.superclass.constructor.call(this, config);
        
        //load plugins
        var services = this.findByType('checkablefieldset');
        for(var i=0; i<services.length; i++) {
            if(services[i]["script"] && !CQ.analytics.services[services[i].inputValue]) {
                var scriptEl = document.createElement("script");
                scriptEl.setAttribute("src", CQ.HTTP.externalize(services[i]["script"]));
                scriptEl.setAttribute("type", "text/javascript");
                CQ.analytics.waitingForWidget[services[i].inputValue] = {
                    state: "requested"
                };
                document.body.appendChild(scriptEl);
            }
        }
        
    },

    initComponent: function() {
        CQ.analytics.AnalyticsPanel.superclass.initComponent.call(this);
        
        var ref = this;

        var parentDialog = this.findParentByType("dialog");
        this.on("render", function(){
            if(parentDialog) {
                parentDialog.on("loadcontent", function() {
                    ref.initFieldSets();
                })
            }
        })
        
        parentDialog.on("loadcontent", this.postProcessRecords, this);
    },
    
    handleResourceType: function() {
        var hasService = false;
        var services = this.findByType('checkablefieldset');
        for(var i=0; i<services.length; i++) {
            if(services[i].isChecked() &&
                    !services[i].isDisabled()) {
                hasService = true;
            }
        }
        this.resourceType.setDisabled(!hasService);
    },
    
    postProcessRecords: function(dialog, records, opts, sucess){
        var that = this;
        var dlg = this.findParentByType('dialog');
        if(records[0].data.analytics == undefined) {
            var url = CQ.HTTP.noCaching(dlg.path + ".sitecatalystdata.json")
            var response = CQ.HTTP.get(url);
            var parentData = CQ.HTTP.eval(response);
            if(parentData["cq:services"] != undefined) {
                //inherited
                var parentPath = parentData['jcr:path'].replace('jcr:content/analytics','');
                this.inheritField.setValue(parentPath);
                
                this.mergeData(parentData, dlg.path);
    
                var sets = dlg.findByType('checkablefieldset');
                for(var i=0; i<sets.length; i++) {
                    sets[i].setDisabled(true);
                }
                this.handleResourceType();
            }else{
                this.fieldSet.hide();
            }      
        } else {
            //configured
            this.fieldSet.hide();
        }
    },
    
    mergeData: function(parentData, path) {
        var tab = this.findParentByType('tabpanel');
        var services = tab.findByType('checkablefieldset');
        for(var i=0; i<services.length; i++) {
            //use process record would be easier
            //var rec = CQ.Ext.data.Record.create(parentData);
            var serviceKey = services[i].inputValue;
            var fields = services[i].fieldSet.findByType(CQ.Ext.form.Field);            
            try {
                //try to call a "plugin" for merging
                if(CQ.analytics.services[serviceKey] && (typeof CQ.analytics.services[serviceKey].mergeData == "function")) {
                    CQ.analytics.services[serviceKey].mergeData(tab, parentData);
                }else{
                    //default merge
                    for(var j=0; j<fields.length; j++) {
                        if(fields[j].name) {
                            var property = fields[j].name.replace("./analytics/", "");
                            fields[j].setValue(parentData[property]);
                        }
                    }
                }
                this.checkFieldSet(services[i], parentData["cq:services"]); 
            }catch(e){
                console.log(e);
            }
        }
    },
    
    checkFieldSet: function(fieldset, configs) {
        if(configs instanceof Array) {
            for(var i=0; i<configs.length; i++) {
                if(fieldset.titleCheckbox.inputValue == configs[i]) {
                    fieldset.setChecked(true);
                } 
            }          
        }else if( (typeof(configs) == "string") && (configs != "") ) {
            if(fieldset.titleCheckbox.inputValue == configs) {
                fieldset.setChecked(true);
            }                
        }
    },
    
    initFieldSets: function() {
        var services = this.findByType('checkablefieldset');
        for(var i=0; i<services.length; i++) {
            var serviceKey = services[i].inputValue;
            try {
                //try to call a "plugin"
                if(CQ.analytics.services[serviceKey] && (typeof CQ.analytics.services[serviceKey].init == "function")) {
                    CQ.analytics.services[serviceKey].init(this);
                }
            }catch(e){
                console.log(e);
            }
        }
    }    

});
CQ.Ext.reg('analyticspanel', CQ.analytics.AnalyticsPanel);

CQ.analytics.CheckableFieldSet = CQ.Ext.extend(CQ.form.CompositeField,  {
    
	/**
	 * @private
	 */
	disabled: false,
	
	/**
     *@private
     */
    hiddenField: null,
    
    /**
     *@private
     */
    titleCheckbox: null,
    
    /**
     *@private
     */
    fieldSet: null,

    constructor: function(config) {
    	CQ.Util.applyDefaults(config, {
            "header": false,
            "border": false,
            "hideLabel": true,
            "cls": "cq-analytics-chkfieldset"
        });
        CQ.analytics.CheckableFieldSet.superclass.constructor.call(this, config);
        
        var ref = this;
        
        var fieldItems = CQ.Util.copyObject(config.items);
        
        this.fieldSet = new CQ.form.DialogFieldSet({
            "title": ref.title,
            "collapsible": true,
            "collapsed": true,
            "items": fieldItems,
            "layoutConfig": {
            	"hideLabels": false
            },
            "listeners": {
                "render": function() {
                    var fs = this;
                    ref.titleCheckbox = new CQ.Ext.form.Checkbox({
                        "renderTo": fs.header,
                        "name": ref.name,
                        "inputValue": ref.inputValue,
                        "boxLabel": ref.title,
                        "listeners": {
                            "check": function(checkbox, checked) {
                                ref.setFieldsDisabled(!checked);
                                //additional
                                (checked) ? fs.expand() : fs.collapse();
                                var pnl = ref.findParentByType('analyticspanel');
                                if(pnl) {
                                	pnl.handleResourceType();
                                }
                            }
                        }
                    });
                    this.setTitle(""); // clear original title (now box label)
                }
            }
        });

        this.items.clear();
        this.add(this.fieldSet);        
		
        //field for select deletion
        this.hiddenField = new CQ.Ext.form.Hidden({
            "name": config.name + CQ.Sling.DELETE_SUFFIX,
            "value": "true"
        });
        this.add(this.hiddenField);

    },
    
    /**
     * Check title checkbox and expand field if it checked.
     * 
     * @param record
     * @param path
     */
    processRecord: function(record, path){
        if (this.fireEvent('beforeloadcontent', this, record, path) !== false) {
            var v = record.get(this.getName());
            if (v != undefined) {
                if(typeof(v) == 'string'){
                    // single value -> convert to array
                    v = [v];
                }
                var H = {};
                for(var x in v){
                    H[v[x]] = true;
                }

                var gcv = this.titleCheckbox.inputValue;
                if(typeof(gcv) != 'undefined' && typeof(H[gcv]) != 'undefined'){
                    this.titleCheckbox.setValue(true);
                    this.expand();
                }else{
                	this.setFieldsDisabled(true);
                }
            } else {
            	this.setFieldsDisabled(true);
            }
            
            //process fieldset items
            for(var i=0; i<this.fieldSet.items.items.length; i++) {
                var comp = this.fieldSet.items.items[i];
                if(comp && comp.processRecord && !comp.initialConfig.ignoreData) {
                	comp.processRecord(record, path);
                }
            }
            
            this.fireEvent('loadcontent', this, record, path);
        }
    },
    
    processPath: function(path, ignoreData) {   	
    	//process fieldset items
        for(var i=0; i<this.fieldSet.items.items.length; i++) {
            var comp = this.fieldSet.items.items[i];
            if(comp && comp.processPath) {
            	comp.processPath(path, ignoreData);
            }
        }
    },
    
    setChecked: function(isChecked) {
    	this.titleCheckbox.setValue(isChecked);
    },
    
    isChecked: function() {
    	return (this.titleCheckbox.getValue() != undefined &&
    			this.titleCheckbox.getValue() != "");
    },
    
    setDisabled: function(isDisabled) {
    	this.disabled = isDisabled;
    	this.titleCheckbox.setDisabled(isDisabled);
    	//only enable if checked
    	if(this.isChecked()) {
    		this.setFieldsDisabled(isDisabled);
    	}
    	this.fieldSet.setDisabled(isDisabled);
	},
	
	isDisabled: function() {
		return (this.disabled);
	},
	
	/**
	 * @private
	 */
    setFieldsDisabled: function(isDisabled) {
    	this.disabled = isDisabled;
    	for (var i = 0; i < this.fieldSet.items.length; i++) {
            var item = this.fieldSet.items.items[i];
            if(item.name != this.name && item instanceof CQ.Ext.form.Field) {
               item.setDisabled(isDisabled);
            }
        }
    }   

});

CQ.Ext.reg('checkablefieldset', CQ.analytics.CheckableFieldSet);


CQ.analytics.ReportSuiteField = CQ.Ext.extend(CQ.form.MultiField, {
    constructor: function(config) {
        config.fieldConfig.parent = this;
        CQ.Util.applyDefaults(config, {
            "cls": "cq-analytics-rsid"
        });
        CQ.analytics.ReportSuiteField.superclass.constructor.call(this, config);
    }
});

CQ.Ext.reg('reportsuitefield', CQ.analytics.ReportSuiteField);

CQ.analytics.ReportSuiteFieldItem = CQ.Ext.extend(CQ.form.CompositeField, {

    constructor: function(config) {
        var fieldItem = this;
        var items = new Array();
        var displayField = "rsid";
        items.push({
            mode: 'local',
            triggerAction: 'all',
            store: config.store,
            xtype: 'combo',
            emptyText: "Report Suite",
            displayField: displayField,
            tpl: '<tpl for="."><div class="x-combo-list-item" ext:qtip={' +
                displayField + '}>{' + displayField + '}</div></tpl>',
            valueField: "rsid",
            columnWidth: 0.7,
            listeners: {
                select: function(combo, record, index) { // propagate the select event since this triggers loading the tracking server data
                    fieldItem.hiddenField.setValue(record.get('rsid') + ";" +
                        fieldItem.runModeField.getValue());
                    fieldItem.parent.fireEvent("select", combo, record, index);
                }
            }
        });
        items.push({
            xtype: 'combo',
            emptyText: "Run Mode",
            store: [["", "all"], ["author", "author"], ["publish", "publish"]],
            mode: "local",
            triggerAction: 'all',
            columnWidth: 0.3,
            listeners: {
                select: function(combo, record, index) { // propagate the select event since this triggers loading the tracking server data
                    fieldItem.hiddenField.setValue(fieldItem.reportSuiteField.getValue() +
                        ";" + record.get("field1"));
                    fieldItem.parent.fireEvent("select", combo, record, index);
                }
            }
        });
        items.push({
            xtype: 'hidden',
            name: "./analytics/cq:s_account"
        });

        config = CQ.Util.applyDefaults(config, {
            "border": false,
            "items":[
                {
                    "xtype":"panel",
                    "border":false,
                    "layout": "column",
                    "items":items
                }
            ]
        });
        CQ.analytics.ReportSuiteFieldItem.superclass.constructor.call(this,config);
    },

    initComponent: function() {
        CQ.analytics.ReportSuiteFieldItem.superclass.initComponent.call(this);
        
        this.reportSuiteField = this.items.items[0].items.items[0];
        this.runModeField = this.items.items[0].items.items[1];
        this.hiddenField = this.items.items[0].items.items[2];
        
        this.on("disable", function() {
            for(var i=0; i<this.items.items[0].items.length; i++) {
                var item = this.items.items[0].items.items[i];
                if(item instanceof CQ.Ext.form.Field) {
                    item.disable();
                }
            }
        });

        this.on("enable", function() {
            for(var i=0; i<this.items.items[0].items.length; i++) {
                var item = this.items.items[0].items.items[i];
                if(item instanceof CQ.Ext.form.Field) {
                    item.enable();
                }
            }
        });
    },

    // overriding CQ.form.CompositeField#getValue
    getValue: function() {
        return this.reportSuiteField.getValue() + ";" + this.runModeField.getValue();
    },

    // overriding CQ.form.CompositeField#setValue
    setValue: function(value) {
        if(value.indexOf(";") != -1) {
            var reportSuite = value.substring(0, value.indexOf(";"));
            var runMode = value.substring(value.indexOf(";") + 1);
        }else {
            var reportSuite = value;
            var runMode = "";
        }
        this.reportSuiteField.setValue(reportSuite);
        this.runModeField.setValue(runMode);
        this.hiddenField.setValue(value);
    }
    
});

CQ.Ext.reg('reportsuitefielditem', CQ.analytics.ReportSuiteFieldItem);
CQ.analytics.CCMVariableField = CQ.Ext.extend(CQ.form.MultiField, {
    
    record: null,
    
    constructor: function(config) {
        CQ.analytics.CCMVariableField.superclass.constructor.call(this, config);
    },
    
    addItem: function(value) {
        var item = this.insert(this.items.getCount() - 1, {});
        var form = this.findParentByType("form");
        if (form)
            form.getForm().add(item.field);
        this.doLayout();

        if (item.field.processPath) item.field.processPath(this.path);
        if (item.field.processRecord) item.field.processRecord(this.record, this.path);
        if (value) {
            item.setValue(value);
        }

        if (this.fieldWidth < 0) {
            // fieldWidth is < 0 when e.g. the MultiField is on a hidden tab page;
            // do not set width but wait for resize event triggered when the tab page is shown
            return;
        }
        if (!this.fieldWidth) {
            this.calculateFieldWidth(item);
        }
        try {
            item.field.setWidth(this.fieldWidth);
        }
        catch (e) {
            CQ.Log.debug("CQ.form.MultiField#addItem: " + e.message);
        }
    },
    
    processRecord: function(record, path) {
        this.record = record;
        CQ.analytics.CCMVariableField.superclass.processRecord.call(this,record,path);
    }
    
});

CQ.Ext.reg('ccmvariablefield', CQ.analytics.CCMVariableField);


CQ.analytics.CCMVariableFieldItem = CQ.Ext.extend(CQ.form.CompositeField, {

    isProfileField: null,
    
    ccmVariableField: null,
    
    isProfileData: null,

    constructor: function(config) {
        var fieldItem = this;
        var items = new Array();
        
        this.isProfileField = new CQ.Ext.form.Checkbox({
            "name": "./cq:isprofile",
            "boxLabel": CQ.I18n.getMessage("Test&Target profile"),
            "columnWidth": 0.5,
            "height": 22,
            "listeners": {
                "check": function(cmp,checked) {
                    if (checked) {
                        cmp.setRawValue(fieldItem.ccmVariableField.getValue());
                    } else {
                        cmp.setRawValue('');
                    }
                }
            }
        });
        
        this.ccmVariableField = new CQ.form.Selection({
            "type": "select",
            "name": "./cq:mappings",
            "optionsProvider": CQ_Analytics.TestTarget.storesPropertiesOptionsProvider,
            "columnWidth": 0.5,
            "listeners": {
                "selectionChanged": function() {
                    if (fieldItem.isProfileKey(this.getValue())) {
                        fieldItem.isProfileField.setValue(true);
                        fieldItem.isProfileField.setReadOnly(true);
                    } else {
                        fieldItem.isProfileField.setValue(false);
                        fieldItem.isProfileField.setReadOnly(false);
                    }
                }
            }     
        });
        
        items.push(this.isProfileField);
        items.push({"xtype": "hidden","name": this.isProfileField.getName() + CQ.Sling.DELETE_SUFFIX});
        items.push(this.ccmVariableField);
        items.push({"xtype":"hidden","name": this.ccmVariableField.getName() + CQ.Sling.DELETE_SUFFIX});
        
        config = CQ.Util.applyDefaults(config, {
            "border": false,
            "layout": "column",
            "items": items
        });
        CQ.analytics.CCMVariableFieldItem.superclass.constructor.call(this,config);
    },

    initComponent: function() {
        CQ.analytics.CCMVariableFieldItem.superclass.initComponent.call(this);
    },
    
    processRecord: function(record, path) {
        if (this.fireEvent('beforeloadcontent', this, record, path) !== false) {
            var c = record.get("cq:isprofile");
            if (c != undefined) {
                if (!this.isProfileData) {
                    this.isProfileData = c;
                }
            }
            this.fireEvent('loadcontent', this, record, path);
        }
    },
    
    processPath: function(path) {
        this.ccmVariableField.processPath(path);
    },
    
    getValue : function() {
        return this.ccmVariableField.getValue();
    },
    
    isProfileKey: function(v) {
        return v.match(/^profile\..*$/);
    },
    
    setValue: function(v) {
        this.ccmVariableField.setValue(v);
        if(this.isProfileData &&
           this.isProfileData.indexOf(v) > -1) {
            this.isProfileField.setValue(true);
            if (this.isProfileKey(v)) {
                this.isProfileField.setReadOnly(true);
            }
        }
    },
    
    disable: function() {
        this.isProfileField.disable();
        this.ccmVariableField.disable();
    },

    enable: function() {
        this.isProfileField.enable();
        this.ccmVariableField.enable();
    }
    
});

CQ.Ext.reg('ccmvariablefielditem', CQ.analytics.CCMVariableFieldItem);

CQ.analytics.VariableField = CQ.Ext.extend(CQ.form.MultiField, {
    
    constructor: function(config) {
        CQ.Util.applyDefaults(config, {
            "cls": "cq-analytics-configvalue",
            "orderable": false
        });
        CQ.analytics.VariableField.superclass.constructor.call(this, config);
    }
    
});

CQ.Ext.reg('variablefield', CQ.analytics.VariableField);

CQ.analytics.VariableFieldItem = CQ.Ext.extend(CQ.form.CompositeField, {

    constructor: function(config) {
        var fieldItem = this;
        var items = new Array();
        items.push({
            xtype: 'textfield',
            emptyText: "Variable",
            submitValue: false,
            columnWidth: 0.5,
            listeners: {
                change: function(field, newValue, oldValue) {
                    var val = [newValue, fieldItem.valueField.getValue()];
                    fieldItem.hiddenField.setValue(CQ.Ext.util.JSON.encode(val))
                }
            }
        });
        items.push({
            xtype: 'textfield',
            emptyText: "Value",
            columnWidth: 0.5,
            submitValue: false,
            listeners: {
                change: function(field, newValue, oldValue) {
                    var val = [fieldItem.keyField.getValue(), newValue];
                    fieldItem.hiddenField.setValue(CQ.Ext.util.JSON.encode(val));
                }
            }
        });
        items.push({
            xtype: 'hidden',
            name: config.name
        });
        
        config = CQ.Util.applyDefaults(config, {
            "border": false,
            "items":[
                {
                    "xtype":"panel",
                    "border":false,
                    "layout": "column",
                    "items":items
                }
            ]
        });
        CQ.analytics.VariableFieldItem.superclass.constructor.call(this,config);
    },

    initComponent: function() {
        CQ.analytics.VariableFieldItem.superclass.initComponent.call(this);
        
        this.keyField = this.items.items[0].items.items[0];
        this.valueField = this.items.items[0].items.items[1];
        this.hiddenField = this.items.items[0].items.items[2];
        
        this.on("disable", function() {
            for(var i=0; i<this.items.items[0].items.length; i++) {
                var item = this.items.items[0].items.items[i];
                if(item instanceof CQ.Ext.form.Field) {
                    item.disable();
                }
            }
        });

        this.on("enable", function() {
            for(var i=0; i<this.items.items[0].items.length; i++) {
                var item = this.items.items[0].items.items[i];
                if(item instanceof CQ.Ext.form.Field) {
                    item.enable();
                }
            }
        });
    },

    // overriding CQ.form.CompositeField#getValue   
    getValue: function() {
        var val = [this.keyField.getValue(),this.valueField.getValue()];
        return CQ.Ext.util.JSON.encode(val);
    },

    // overriding CQ.form.CompositeField#setValue
    setValue: function(value) {
        var decvalue = CQ.Ext.util.JSON.decode(value);
        if(decvalue.length > 1) {
            this.keyField.setValue( decvalue[0] );
            this.valueField.setValue( decvalue[1] );
        }
        this.hiddenField.setValue(value);
    }
    
});

CQ.Ext.reg('variablefielditem', CQ.analytics.VariableFieldItem);

CQ.analytics.InstantSaveVariableField = CQ.Ext.extend(CQ.analytics.VariableField, {
    
    constructor: function(config) {
        var value = null;
        try {
            value = CQ.Ext.util.JSON.decode(config.value);
        } catch (e) { }
        config.value = value;
        CQ.analytics.InstantSaveVariableField.superclass.constructor.call(this, config);
    },

    initComponent: function() {
        CQ.analytics.InstantSaveVariableField.superclass.initComponent.call(this);
        this.setValue(this.value);
        this.on("removeditem", this.updateVariablesField);
    },

    updateVariablesField: function() {
        var jsonValue = this.getJsonValue();
        if (jsonValue == null)
            return;
        var delta = { };
        delta[this.name] = jsonValue;
        CQ.HTTP.post(this.nodeUrl, function(options, success, response) {
            if (!success) {
                CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),
                    CQ.I18n.getMessage("Could not save cq variables"));
            }
        }, delta);
    },

    getJsonValue: function() {
        var items = this.findByType('variablefielditem');
        var pairs = [];
        for (var i = 0; i < items.length; i++) {
            var elem = items[i];
            var fields = [ elem.keyField, elem.valueField ];
            var isValid = true;
            CQ.Ext.each(fields, function(field) {
                if (!field.validate()) {
                    isValid = false;
                    return false;
                }
            });
            if (!isValid)
                return null;
            var pair = [elem.keyField.getValue(), elem.valueField.getValue()];
            pairs.push(pair);
        }
        return CQ.Ext.util.JSON.encode(pairs);
    }

});

CQ.Ext.reg('instantvariablefield', CQ.analytics.InstantSaveVariableField);

CQ.analytics.InstantSaveVariableFieldItem = CQ.Ext.extend(CQ.analytics.VariableFieldItem, {

    initComponent: function() {
        CQ.analytics.InstantSaveVariableFieldItem.superclass.initComponent.call(this);

        CQ.Ext.each([ this.keyField, this.valueField ], function(item) {
            var mainField = this.ownerCt;
            if (!mainField)
                return;
            item.on('change', function(field, newValue, oldValue) {
                if (this.updateVariablesField)
                    this.updateVariablesField();
            }, mainField);
        }, this);
    },

    setValue: function(value) {
        if (value.length >= 2) {
            this.keyField.setValue(value[0]);
            this.valueField.setValue(value[1]);
        }
    }
    
});

CQ.Ext.reg('instantvariablefielditem', CQ.analytics.InstantSaveVariableFieldItem);
CQ.analytics.StaticVariablesDialog = CQ.Ext.extend(CQ.Dialog, {

	variableField: null,
	
	constructor: function(config) {
		config = (!config ? {} : config);
		
		this.variableField = new CQ.analytics.VariableField({
			hideLabel: true,
			name: './analytics/cq:variables',
			fieldConfig: {
				xtype: 'variablefielditem'
			}	
		});
		
		config = CQ.Util.applyDefaults(config, {
    		title:CQ.I18n.getMessage("Static variables"),
    		width: 350,
    		height: 350,
    		items:[{
    			xtype: 'panel',
    			autoScroll: true,
    			items: [{
    				xtype: 'dialogfieldset',
    				border: false,
		    		items: [{
		    			xtype: 'static',
		    			bottommargin: true,
		    			text: CQ.I18n.getMessage('Static variable mappings allow you to set site-wide properties for your s_code')
		    		},
		    		this.variableField
		    		]
    			}]
    		}],
    		buttons: CQ.Dialog.OKCANCEL
	    });
		CQ.analytics.StaticVariablesDialog.superclass.constructor.call(this, config);
		
		this.loadContent(config.path);
	}

});

CQ.Ext.reg("staticvariablesdialog", CQ.analytics.StaticVariablesDialog);
// The InstantSaveForm saves fields on change, there's no save button
CQ.analytics.InstantSaveForm = CQ.Ext.extend(CQ.form.DialogFieldSet, {

    constructor: function(config) {        
        for (var i=0; i < config.items.length; i++) {
            config.items[i].addListener('change', this.saveField, this);
            config.items[i].addListener('check', this.saveField, this);    // the checkbox eats change
        };
        
        if (config.collapsible == undefined) config.collapsible = true;
        if (config.collapsed == undefined) config.collapsed = true;

        CQ.analytics.InstantSaveForm.superclass.constructor.call(this, config);
        
        this.loadFields.call(this);
    },
    
    loadFields: function() {
        try {
            var formData = CQ.HTTP.eval(this.nodeUrl + '.json');
            for (var i=0; i < this.items.items.length; i++) {
                var field = this.items.items[i];
                field.setValue(formData[field.fieldName]);
            }
        } catch(e) {
            CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),
                    CQ.I18n.getMessage("Could not retrieve {0}", [this.title]));
        }
    },    

    postField: function(field) {
        var delta = { };
        delta[field.fieldName] = field.getValue();
        CQ.HTTP.post(this.nodeUrl,
            function(options, success, response) {
                if (!success) {
                    CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"), CQ.I18n.getMessage("Could not save {0}", [field.fieldLabel]));
                }
            },
            delta
        );
    },

    saveField: function(field) {
        if (field.validate() === true) {
            this.postField(field);
        } else {
            var sureMsg = CQ.I18n.getMessage("Are you sure you want to save this value?");
            CQ.Ext.MessageBox.confirm(field.sureTitleMsg || "",
                field.activeError + "<br>" + sureMsg,
                function(choice) {
                    if (choice == "yes")
                        this.postField(field);
                }, this
            );
        }
    }

});
CQ.analytics.ConflictManager = CQ.Ext.extend(CQ.Ext.util.Observable, {

    variables: null,

    provider: null,

    constructor: function(config) {
        config = config || { };

        CQ.Util.applyDefaults(config, {
            variables: { }
        });

        CQ.Ext.apply(this, config);
        CQ.analytics.ConflictManager.superclass.constructor.call(this, config);
    },

    addNewVariable: function(scVar, data) {
        if (!this.variables[scVar]) {
            this.variables[scVar] = {
                data: data,
                cqVars: new CQ.Ext.util.MixedCollection()
            };
        }
    },

    addVariable: function(scVar, cqVar, component, data) {
        this.addNewVariable(scVar, data);
        var scVarRef = this.variables[scVar].cqVars;
        if (!scVarRef.containsKey(cqVar)) {
            scVarRef.add(cqVar, new CQ.Ext.util.MixedCollection());
        }
        var cqVarRef = scVarRef.item(cqVar);
        cqVarRef.add(component);
    },

    removeVariable: function(scVar, cqVar, component) {
        var entry = this.variables[scVar];
        if (entry) {
            var scVarRef = entry.cqVars;
            var cqVarRef = scVarRef.item(cqVar);
            if (cqVarRef) {
                if (cqVarRef.remove(component)) {
                    if (cqVarRef.getCount() == 0)
                        scVarRef.removeKey(cqVar);
                }
            }
        }
    },

    isVariableMapped: function(scVar) {
        var entry = this.variables[scVar];
        if (entry) {
            var scVarRef = entry.cqVars;
            return scVarRef.getCount() > 0;
        }
        return false;
    },

    loadAllConflicts: function() {
        var provider = this.provider;
        if (provider) {
            provider.onAvailable("suites", function(suites) {
                var values = suites.getValues();
                this.getAllConflicts(values, {
                    callback: function(conflicts) {
                        for (var scVar in conflicts)
                            provider.setValue("mappingConflict." + scVar, conflicts[scVar]);
                    }
                });
            }, this, { single: true });
            return true;
        } else {
            return false;
        }
    },

    loadConflicts: function(scVarArray) {
        var provider = this.provider;
        if (provider) {
            provider.onAvailable("suites", function(suites) {
                var values = suites.getValues();
                this.getConflicts(scVarArray, values, {
                    callback: function(conflicts) {
                        CQ.Ext.each(scVarArray, function(scVar) {
                            provider.setValue("mappingConflict." + scVar, conflicts[scVar]);
                        });
                    }
                });
            }, this, { single: true });
            return true;
        } else {
            return false;
        }
    },

    getAllConflicts: function(suiteValues, options) {
        options = options || { };
        var scVarArray = [], newScVarArray = [];
        for (var scVar in this.variables) {
            var varValue = this.variables[scVar];
            if (varValue.cqVars.getCount() > 0)
                scVarArray.push(scVar);
            else
                newScVarArray.push(scVar);
        }
        var conflictMap = { };
        var superOptions = { };
        if (scVarArray.length > 0) {
            if (options.callback) {
                superOptions.callback = function(conflictMap) {
                    this.augmentConflictMap(conflictMap, newScVarArray);
                    options.callback.call(this, conflictMap);
                };
            }
            conflictMap = this.getConflicts(scVarArray, suiteValues, superOptions);
        }
        if (superOptions.callback)
            return true;
        else
            return this.augmentConflictMap(conflictMap, newScVarArray);
    },

    getConflicts: function(scVarArray, suiteValues, options) {
        if (!CQ.Ext.isArray(scVarArray))
            scVarArray = [ scVarArray ];
        options = options || { };
        var conflictsUrl = '/libs/cq/analytics/sitecatalyst/mappingconflicts.json';
        conflictsUrl = CQ.HTTP.addParameter(conflictsUrl, "scVar", scVarArray);
        if (suiteValues) {
            suiteValues = suiteValues.split(',');
        } else {
            suiteValues = [];
        }
        conflictsUrl = CQ.HTTP.addParameter(conflictsUrl, "rsid", suiteValues);
        conflictsUrl = CQ.HTTP.externalize(conflictsUrl);
        if (options.callback) {
            CQ.HTTP.get(conflictsUrl,
                function(requestOptions, success, response) {
                    if (success) {
                        var conflictMap = this.buildConflictMap(response, scVarArray);
                        options.callback.call(this, conflictMap);
                    } else {
                        CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),
                            CQ.I18n.getMessage("Unable to load conflicts"));
                    }
                }, this);
            return true;
        } else {
            return this.buildConflictMap(conflictsUrl, scVarArray);
        }
    },

    buildConflictMap: function(conflictsSource, scVarArray) {
        var conflicts;
        try {
            conflicts = CQ.HTTP.eval(conflictsSource);
        } catch (e) {
            CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),
                CQ.I18n.getMessage("Unable to load conflicts"));
        }
        conflicts = conflicts || { };
        var conflictMap = { };
        CQ.Ext.each(scVarArray, function(scVar) {
            var varValue = this.variables[scVar];
            var scConflicts = conflicts[scVar];
            var conflictMessages = this.getEveryConflict(varValue, scConflicts);
            if (conflictMessages)
                conflictMap[scVar] = conflictMessages;
        }, this);
        return conflictMap;
    },

    augmentConflictMap: function(conflictMap, scVarArray) {
        CQ.Ext.each(scVarArray, function(scVar) {
            var varValue = this.variables[scVar];
            var conflictMessages = this.getEveryConflict(varValue);
            if (conflictMessages)
                conflictMap[scVar] = conflictMessages;
        }, this);
        return conflictMap;
    },

    getEveryConflict: function(varValue, scConflicts) {
        var addIfTrue = function(arr, elem) {
            if (elem)
                arr.push(elem);
        };
        var arr = [];
        addIfTrue(arr, this.getNameConflict(varValue));
        addIfTrue(arr, this.getSeriousConflict(scConflicts));
        var conflictMessages = [];
        CQ.Ext.each(arr, function(item) {
            conflictMessages = conflictMessages.concat(item);
        });
        if (conflictMessages.length > 0)
            return conflictMessages;
        else
            return null;
    },

    getNameConflict: function(varValue) {
        if (varValue) {
            var names = varValue.data.names;
            if (names && names.length > 1) {
                var conflictMsg = ["<b>The selected report suites define different names for this variable:</b>"];
                CQ.Ext.each(names, function(item) {
                    conflictMsg.push(item.name + " (" + item.rsid + ")");
                });
                return conflictMsg;
            }
        }
        return null;
    },

    getSeriousConflict: function(scConflicts) {
        if (scConflicts) {
            var conflictMsg = ["<b>Mapped to different CQ values:</b>"];
            for (var cqVar in scConflicts) {
                var fwConflicts = scConflicts[cqVar];
                for (var i = 0; i < fwConflicts.length; i++) {
                    try {
                        var item = CQ.Ext.util.JSON.decode(fwConflicts[i]);
                        var frameworkUrl = item.frameworkPath + ".html";
                        frameworkUrl = CQ.HTTP.externalize(frameworkUrl);
                        item = "<a href='" + frameworkUrl + "' style='color: blue;'>" +
                            item.frameworkName + "</a>/" + item.componentName;
                        fwConflicts[i] = item;
                    } catch (e) {
                        console.log(e);
                    }
                }
                conflictMsg.push(cqVar + ": " + fwConflicts.join(', '));
            }
            return conflictMsg;
        }
        return null;
    }

});
// Revision 90901 escapes cell content to guard against XSS; reverting to original tpl to render tags
CQ.Ext.override(CQ.Ext.grid.GridView, {
    cellTpl: new CQ.Ext.XTemplate(
           '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>',
           '<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on" {attr}>{value}</div>',
           '</td>'
        )
    }
);
CQ.analytics.SiteCatalystPanel = CQ.Ext.extend(CQ.Ext.grid.EditorGridPanel, {

    viewConfig: null,

    cls: 'variablegrid',

    height: 170,

    autoscroll: true,

    store: null,

    loadMask: null,

    cm: null,

    constructor: function(config) {
        config = config || { };

        var grid = this;
        CQ.Util.applyDefaults(config, {
            collapsible: true,

            viewConfig: {
                forceFit: true
            },

            loadMask: {
                msg: CQ.I18n.getMessage("Loading configuration...")
            },

            store: new CQ.Ext.data.JsonStore({
                "fields": [{
                    name: "scVar",
                    type: "string"
                }, {
                    name: "componentName",
                    type: "string"
                }, {
                    name: "componentIcon",
                    type: "string"
                }, {
                    name: "componentFrameworkPath",
                    type: "string"
                }, {
                    name: "conflict",
                    type: "string"
                }, {
                    name: "cqVar",
                    type: "string"
                }, {
                    name: "title",
                    type: "string"
                }],
                mode: "local"
            }),

            cm: new CQ.Ext.grid.ColumnModel([
                {
                    dataIndex: 'title',
                    header: CQ.I18n.getMessage('SiteCatalyst variable'),
                    sortable: true,
                    resizeable: true,
                    width: '260',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                        var conflict = record.get('conflict');
                        var title = value;
                        var id = CQ.Ext.id();
                        var iconPath = CQ.HTTP.externalize('/libs/cq/ui/widgets/themes/default/icons/16x16/warning.png');
                        var imgStyle = "visibility: hidden;";
                        var imgTag = "<img src='" + iconPath + "' align='right' style='" + imgStyle + "'/>";
                        var title = "<div style='float: left; padding-right: 5px;'>" + title + imgTag + "</div>";
                        (function() {
                            if (CQ.Ext.get(id) == null)
                              return;
                            var tagLabel = new CQ.tagging.TagLabel({
                                renderTo: id,
                                text: title,
                                cls: '',
                                readOnly: true,
                                embedTextAsHTML: true,
                                recordRef: record,
                                highlight: function() { }
                            });
                            tagLabel.conflictIcon = tagLabel.getEl().child(".taglabel-mc").child("img");
                            if (tagLabel.tip)
                                tagLabel.tip.destroy();
                            if (conflict) {
                                tagLabel.tip = new CQ.Ext.ToolTip({
                                    target: tagLabel.getEl().child(".taglabel-body"),
                                    dismissDelay: 0,
                                    width: 410,
                                    closable: true,
                                    listeners: {
                                        show: function() {
                                            this.autoHide = true;
                                            var close = this.tools.close;
                                            if (close) {
                                                close.hide();
                                            }
                                        }
                                    },
                                    title: conflict[0],
                                    html: conflict.slice(1).join("<br>")
                                });
                                tagLabel.conflictIcon.on('click', function() {
                                    var tip = tagLabel.tip;
                                    if (tip) {
                                        tip.show();
                                        tip.autoHide = false;
                                        var close = tip.tools.close;
                                        if (close) {
                                            close.show();
                                        }
                                    }
                                });
                                tagLabel.conflictIcon.show();
                            }
                        }).defer(25);
                        return String.format('<div id="{0}"></div>', id);
                    }
                }, {
                    dataIndex: 'componentName',
                    header: CQ.I18n.getMessage('Component'),
                    sortable: true,
                    resizeable: true,
                    width: '190',
                    lockIconPath: CQ.HTTP.externalize('/libs/cq/ui/widgets/themes/default/icons/16x16/lock.png'),
                    renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                        var title = value;
                        var componentIcon = record.get('componentIcon');
                        if (componentIcon) {
                            var imgStyle = "margin: 0px 5px; float: left;";
                            imgStyle = "style='" + imgStyle + "'";
                            var imgTag = "<img src='" + componentIcon + "' " + imgStyle + "/>";
                            title = imgTag + title;
                        }
                        var compFwPath = record.get('componentFrameworkPath');
                        if (grid.isInherited(compFwPath)) {
                            var contentPath = grid.contentPath;
                            var attr = [];
                            attr.push(String.format("src='{0}'", this.lockIconPath));
                            var imgStyle = "margin: 0px 5px 0px 0px; float: right;";
                            attr.push(String.format("style='{0}'", imgStyle));
                            var imgDblClick = "CQ.analytics.SiteCatalystPanel.statics.unlockComponent";
                            imgDblClick += String.format('("{0}", "{1}", true)', contentPath, compFwPath);
                            attr.push(String.format("ondblclick='{0}'", imgDblClick));
                            var imgTag = "<img " + attr.join(' ') + "/>";
                            title = imgTag + title;
                        }
                        return title;
                    }
                }, {
                    dataIndex: 'cqVar',
                    header: CQ.I18n.getMessage('CQ variable'),
                    sortable: true,
                    resizeable: true,
                    width: '460',
                    editor: new CQ.Ext.form.TextField(),
                    renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                        if (value) {
                            var styles = [];
                            var handlers = [];
                            styles.push("margin: 0px 10px; float: right;");
                            styles.push("position: absolute; clip: rect(0 15px 15px 0);");
                            styles.push("visibility: hidden;");
                            handlers.push(String.format("onclick='{0}'",
                                'CQ.analytics.SiteCatalystPanel.statics.removeScRecord(this)'));
                            handlers = handlers.join(' ');
                            var imgStyle = "style='" + styles.join(' ') + "'";
                            var imgPath = CQ.HTTP.externalize('/libs/cq/tagging/widgets/themes/default/images/label/tool-sprites.gif');
                            var imgTag = "<img src='" + imgPath + "' " + imgStyle + " " + handlers + "/>";
                            if (!grid.isInherited(record)) {
                                handlers = [];
                                handlers.push(String.format("onmouseover='{0}'",
                                    'CQ.analytics.SiteCatalystPanel.statics.actOnImg(this, "show")'));
                                handlers.push(String.format("onmouseout='{0}'",
                                    'CQ.analytics.SiteCatalystPanel.statics.actOnImg(this, "hide")'));
                                metaData.attr = handlers.join(' ' );
                            }
                            return "<div>" + CQ.shared.XSS.getXSSValue(value) + imgTag + "</div>";
                        } else {
                            return value;
                        }
                    }
                }
            ])
        });

        CQ.analytics.SiteCatalystPanel.superclass.constructor.call(this, config);

        this.on('beforeedit', function(e) {
            var record = this.getStore().getAt(e.row);
            if (this.isInherited(record))
                e.cancel = true;
        }, this);
        this.on('afteredit', function(e) {
            var record = e.record;
            var delta = { };
            // by popular demand, we hardcode the Page component as mother of all orphan mappings
            var compPath = record.get('componentFrameworkPath');
            if (compPath == undefined || compPath == '') {
                compPath =  e.grid.contentPath + '/mappings/foundation_components_page';

                record.data.componentFrameworkPath = compPath;
                record.data.componentIcon = '/libs/foundation/components/page/icon.png';
                record.data.componentName = 'Page';

                delta['jcr:primaryType'] = 'cq:Component';
                delta['sling:resourceType'] = 'cq/analytics/components/mappings/cqmappings';
                delta['cq:componentPath'] = 'foundation/components/page';
                delta['cq:componentName'] = 'Page';
                delta['cq:componentIcon'] = '/libs/foundation/components/page/icon.png';
            }
            delta[record.get('scVar')] = record.get('cqVar');
            CQ.HTTP.post(compPath,
                function(options, success, response) {
                    if (success) {
                        this.commitRecord(record);
                        conflictManager.loadConflicts(record.get('scVar'));
                    } else {
                        CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),
                            CQ.I18n.getMessage("Could not save CQ variable"));
                    }
                }, delta, this);
        });
        if (this.provider) {
            this.store.on('load', function(store, records, options) {
                CQ.Ext.each(records, function(item) {
                    var scVar = item.get('scVar');
                    if (scVar) {
                        item.conflictHandler = function(conflict) {
                            item.set('conflict', conflict);
                            item.commit();
                        };
                        this.provider.onAvailable("mappingConflict." + scVar,
                            item.conflictHandler, item);
                    }
                }, this);
            }, this, { single: true });
        } else {
            console.log(CQ.I18n.getMessage("Provider not loaded"));
        }
        CQ.WCM.registerDropTargetComponent(this);
    },

    getDropTargets: function() {
        var col = this.getColumnModel().findColumnIndex("cqVar");
        var dt = [];
        var grid = this;
        var gridStore = this.getStore();
        var gridView = this.getView();

        for (var row = 0; row < gridStore.getTotalCount(); row++) {
            if (this.isInherited(gridStore.getAt(row)))
                continue;
            var dd = new CQ.Ext.dd.DropTarget(gridView.getCell(row, col), {
                ddGroup: "clientcontextvars",
                store: gridStore,
                view: gridView,
                normalize: function() { },
                flash: function() { },
                notifyDrop: function(dd, e, data) {
                    var rowIndex = this.view.findRowIndex(this.el.dom);
                    var columnIndex = this.view.findCellIndex(this.el.dom);
                    if (rowIndex !== false && columnIndex !== false) {
                        var rec = this.store.getAt(rowIndex);
                        if (rec) {
                            var scVar = rec.get('scVar');
                            var dropData = data.records[0];
                            var values = {
                                cqVar: dropData.get('name'),
                                componentFrameworkPath: dropData.get('componentFrameworkPath')[0],
                                componentIcon: dropData.get('componentIcon'),
                                componentName: dropData.get('componentName')
                            };
                            var compFwPath = values.componentFrameworkPath;
                            if (scVar && values.cqVar && compFwPath) {
                                var oldCompFwPath = rec.get('componentFrameworkPath');
                                var saveOptions = {
                                    success: function() {
                                        conflictManager.loadConflicts(scVar);
                                    }
                                };
                                if (oldCompFwPath && oldCompFwPath != compFwPath) {
                                    var delta = { };
                                    delta[scVar] = ' ';
                                    CQ.HTTP.post(oldCompFwPath,
                                        function(options, success, response) {
                                            if (success) {
                                                grid.saveMapping(scVar, rec, values, saveOptions);
                                            } else {
                                                CQ.Notification.notify(null,
                                                    CQ.I18n.getMessage("Could not save mapping"));
                                            }
                                        }, delta);
                                } else {
                                    grid.saveMapping(scVar, rec, values, saveOptions);
                                }
                            }
                        }
                    }
                }
            });
            dt.push(dd);
        }
        return dt;
    },

    isInherited: function(compFwPath) {
        if (compFwPath) {
            if (!CQ.Ext.isString(compFwPath))
                compFwPath = compFwPath.get('componentFrameworkPath');
        }
        if (compFwPath) {
            var contentPath = this.contentPath;
            if (contentPath && compFwPath.indexOf(contentPath) != 0)
                return true;
        }
        return false;
    },

    saveMapping: function(scVar, record, values, mappingOptions) {
        mappingOptions = mappingOptions || { };
        var delta = { };
        delta[scVar] = values.cqVar;
        CQ.HTTP.post(values.componentFrameworkPath,
            function(options, success, response) {
                if (success) {
                    if (mappingOptions.commit !== false)
                        this.commitRecord(record, values);
                    if (mappingOptions.success)
                        mappingOptions.success.call(this);
                } else {
                    CQ.Notification.notify(null,
                        CQ.I18n.getMessage("Could not save mapping"));
                }
            }, delta, this);
    },

    removeMapping: function(record) {
        var scVar = record.get("scVar");
        var cqVar = record.get("cqVar");
        var compName = record.get("componentName");
        var compFwPath = record.get("componentFrameworkPath");
        if (scVar) {
            this.saveMapping(scVar, record, {
                cqVar: " ",
                componentFrameworkPath: compFwPath
            }, {
                commit: false,
                success: function() {
                    var conflictManager = this.conflictManager;
                    if (conflictManager) {
                        if (record.conflictHandler) {
                            this.provider.unAvailable("mappingConflict." + scVar,
                                record.conflictHandler, record);
                        }
                        conflictManager.removeVariable(scVar, cqVar, compName);
                        if (conflictManager.isVariableMapped(scVar)) {
                            this.getStore().remove(record);
                        } else {
                            this.commitRecord(record, {
                                componentFrameworkPath: null,
                                componentName: null,
                                componentIcon: null,
                                cqVar: null
                            });
                        }
                        conflictManager.loadConflicts(scVar);
                    }
                }
            });
        }
    },

    commitRecord: function(record, values) {
        values = values || { };
        for (var idx in values)
            record.set(idx, values[idx]);
        record.commit();
    }

});

CQ.analytics.SiteCatalystPanel.statics = {
    getVariableGrid: function(htmlElement) {
        var grid = null;
        var el = CQ.Ext.fly(htmlElement);
        if (el) {
            var gridEl = el.findParent(".variablegrid", null, true);
            if (gridEl)
                grid = CQ.Ext.getCmp(gridEl.id);
        }
        return grid;
    },

    actOnImg: function(htmlElement, action) {
        var el = CQ.Ext.fly(htmlElement);
        if (el) {
            var imgEl = el.child("img");
            if (imgEl)
                imgEl[action]();
        }
    },

    getRecordByElement: function(grid, htmlElement) {
        var store = grid.getStore();
        var view = grid.getView();
        if (store && view) {
            var row = view.findRowIndex(htmlElement);
            if (row !== false)
                return store.getAt(row);
        }
        return null;
    },

    removeScRecord: function(htmlElement) {
        var grid = this.getVariableGrid(htmlElement);
        if (grid) {
            var record = this.getRecordByElement(grid, htmlElement);
            if (record) {
                grid.removeMapping(record);
            }
        }
    },

    unlockComponent: function(pagePath, fwCompPath, isContentPath) {
        if (isContentPath) {
            var idx = pagePath.lastIndexOf('/');
            pagePath = pagePath.substr(0, idx);
        }
        var fwCompUrl = CQ.HTTP.externalize(fwCompPath);
        var pieces = fwCompPath.split('/');
        if (pieces.length >= 3) {
            pieces = pieces.slice(pieces.length - 3, pieces.length);
            pagePath += '/' + pieces.join('/');
            var pageUrl = CQ.HTTP.externalize(pagePath);
            CQ.HTTP.post(fwCompUrl, function(options, success, response) {
                if (success) {
                    window.location.reload();
                }
            }, {
                ":operation": "copy",
                ":dest": pageUrl,
                ":replace": "true"
            });
        }
    }
};
CQ.Ext.namespace("CQ_Analytics.TestTarget");
CQ_Analytics.TestTarget.publishTestTarget = function(operation) {
    var dialog = new CQ_Analytics.TestTarget.PublishDialog({operation: operation});
    dialog.show();
    dialog.alignToViewport("c");
}

CQ_Analytics.TestTarget.toggleButton = function() {
    var button = document.getElementById("testandtarget-publish");
    var label = button.getAttribute("value");
    button.setAttribute("value", "Re-publish to Test&Target");
    
    if(label.toLowerCase().indexOf("unpublish") == -1) {
        button.setAttribute("value", "Unpublish on Test&Target");
        button.setAttribute("onclick", "CQ_Analytics.TestTarget.publishTestTarget('deleteWidgetOffer')");
    }else {
        button.setAttribute("value", "Publish to Test&Target");
        button.setAttribute("onclick", "CQ_Analytics.TestTarget.publishTestTarget('saveWidgetOffer')");
    }
}

CQ_Analytics.TestTarget.disableButton = function() {
    var button = document.getElementById("testandtarget-publish");
    button.setAttribute("disabled","disabled");
}

CQ_Analytics.TestTarget.showButtonIndicator = function(dialog, isShown) {
    if (!isShown) {
        CQ.Ext.Msg.wait(CQ.I18n.getMessage("Connection successful")).hide();
    } else {
        CQ.Ext.Msg.wait(CQ.I18n.getMessage("Connecting to Test&Target..."));
    }
}

CQ_Analytics.TestTarget.doConnect = function(dialog) {
    var clientcode = dialog.find("name","./clientcode")[0];
    var email = dialog.find("name","./email")[0];
    var password = dialog.find("name","./password")[0];

    var data = {
            clientcode: clientcode.getValue(),
            email: email.getValue(),
            password: password.getValue(),
            operation: "connect"
    };
    
    this.showButtonIndicator(dialog, true);
    
    function fieldEmpty(field, msg) {
        if (!field || field.getValue() == "") {
            that.showButtonIndicator(dialog, false);
            CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"), msg);
            return true;
        }
        return false;
    }
    
    if (fieldEmpty(clientcode, CQ.I18n.getMessage("Please enter the client code.")) ||
        fieldEmpty(email, CQ.I18n.getMessage("Please enter the email.")) ||
        fieldEmpty(password, CQ.I18n.getMessage("Please enter the password."))) {
        return;
    }

    CQ.HTTP.post(CQ.WCM.getPagePath() + "/_jcr_content.testandtarget.json",
        function(options, success, response) {
            this.showButtonIndicator(dialog, false);
            if(success) {
                var answer = CQ.HTTP.eval(response);
                if(answer.error != undefined) {
                    CQ.Ext.Msg.show({
                        "title": CQ.I18n.getMessage("Error"),
                        "msg": answer.error,
                        "buttons": CQ.Ext.Msg.OK,
                        "icon": CQ.Ext.Msg.ERROR
                    }); 
                } else if (answer.success) {
                    CQ.Ext.Msg.show({
                        "title": CQ.I18n.getMessage("Success"),
                        "msg": CQ.I18n.getMessage("Connection successful"),
                        "buttons": CQ.Ext.Msg.OK,
                        "icon": CQ.Ext.Msg.INFO
                    }); 
                    CQ.cloudservices.getEditOk().enable();
                }
            }else {
                CQ.Ext.Msg.show({
                        "title": CQ.I18n.getMessage("Error"),
                        "msg": CQ.I18n.getMessage("Connection failed for unknown reason."),
                        "buttons": CQ.Ext.Msg.OK,
                        "icon": CQ.Ext.Msg.ERROR
            }); 
        }
    }, data, this, true); // suppress error messages
}

CQ_Analytics.TestTarget.PublishDialog = CQ.Ext.extend(CQ.Dialog, {
    constructor: function(config) {
        var dialog = this;
        var defaults = {
                "title": CQ.I18n.getMessage("Credentials for Test&amp;Target"),
                "width": 450,
                "height": 150,
                "closeAction": "destroy",
                "items": [{
                    "xtype": "panel",
                    "header": false,
                    "layout": "form",
                    "items": [{
                        "xtype": "dialogfieldset",
                        "border": false,
                        "labelWidth": 150,
                        "items": [{                           
                            "fieldLabel": CQ.I18n.getMessage("Test&amp;Target configuration"),
                            "id": "cq:cloudserviceconfig",
                            "name": "cq:cloudserviceconfig",
                            "rootPath": "/etc/cloudservices/testandtarget",
                            "xtype": "cloudservicescombo",
                            "value": CQ_Analytics.TestTarget.CONFIG_PATH || undefined,
                            "flex": "{Long}1"
                        },{
                            "xtype": "static",
                            "style": "text-align:right;margin:3px 0px 0px 0px; text-decoration:underline;",
                            "html": '<a href="' + CQ.HTTP.externalize('/miscadmin#/etc/cloudservices') + '" target="_blank">' + CQ.I18n.getMessage("Manage configurations") + '</a>'
                        }]
                    }]
                }],
                "buttons": [
                    {
                        "text": CQ.I18n.getMessage("OK"),
                        "tooltip": CQ.I18n.getMessage("Publish this teaser to Test&amp;Target"),
                        "handler": function() {
                            var data = {
                                cfgpath: this.form.findField("cq:cloudserviceconfig").getValue(),
                                operation: "saveWidgetOffer"
                            };
                            CQ.HTTP.post(CQ.WCM.getPagePath() + "/_jcr_content.testandtarget.json",
                                function(options, success, response) {
                                    if(success) {
                                        var answer = CQ.HTTP.eval(response);
                                        if(answer.error != undefined) {
                                            CQ.Ext.Msg.show({
                                                "title": CQ.I18n.getMessage("An error occured"),
                                                "msg": answer.error,
                                                "buttons": CQ.Ext.Msg.OK,
                                                "icon": CQ.Ext.Msg.ERROR
                                            }); 
                                        }else {
                                            CQ.Ext.Msg.show({
                                                "title": CQ.I18n.getMessage("Success"),
                                                "msg": CQ.I18n.getMessage("Offer published successfully"),
                                                "buttons": CQ.Ext.Msg.OK,
                                                "icon": CQ.Ext.Msg.INFO
                                            }); 
                                            CQ_Analytics.TestTarget.disableButton();
                                            dialog.close();
                                        }
                                    }else {
                                        CQ.Ext.Msg.show({
                                            "title": CQ.I18n.getMessage("An error occured"),
                                            "msg": CQ.I18n.getMessage("Publishing failed. If this issue persists, please get in touch with an administrator."),
                                            "buttons": CQ.Ext.Msg.OK,
                                            "icon": CQ.Ext.Msg.ERROR
                                        }); 
                                    }
                                }, data, this, true); // suppress error messages
                        }
                    },
                    CQ.Dialog.CANCEL
                ]
        };
        CQ.Util.applyDefaults(config, defaults);
        
        // init component by calling super constructor
        CQ_Analytics.TestTarget.PublishDialog.superclass.constructor.call(this, config);
    }
});
CQ.analytics.SiteCatalyst = {
        
    mappingComponents: [],
    
    registerMapping: function(component) {
        this.mappingComponents.push(component);
    },

    getMappings: function() {
        return this.mappingComponents;
    },
    
    getField: function(panel, key) {
        var items = panel.find("name", key);
        if ( (CQ.Ext.isArray(items)) && (items.length > 0) ) {
            return items[0];
        }
    },
    
    showButtonIndicator: function(dialog, isShown) {
        if (!isShown) {
            CQ.Ext.Msg.wait(CQ.I18n.getMessage("Connection successful")).hide();
        } else {
            CQ.Ext.Msg.wait(CQ.I18n.getMessage("Connecting to SiteCatalyst..."));
        }
    },  

    connect: function(dialog) {
        var that = this;
        
        var company = this.getField(dialog, './company');
        var username = this.getField(dialog, './username');
        var password = this.getField(dialog, './password');

        this.showButtonIndicator(dialog, true);
        
        function fieldEmpty(field, msg) {
            if (!field || field.getValue() == "") {
                that.showButtonIndicator(dialog, false);
                CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"), msg);
                return true;
            }
            return false;
        }
        
        if (fieldEmpty(company, CQ.I18n.getMessage("Please enter the company.")) ||
            fieldEmpty(username, CQ.I18n.getMessage("Please enter the username.")) ||
            fieldEmpty(password, CQ.I18n.getMessage("Please enter the password."))) {
            return;
        }
        
        var url = CQ.HTTP.externalize("/libs/cq/analytics/sitecatalyst/service.json");
        CQ.HTTP.post(url,
            function(options, success, response) {
        		this.showButtonIndicator(dialog, false); 
                if(success) {
                    var reportSuites = CQ.HTTP.eval(response);
                    if (reportSuites && reportSuites.secret) {  
                        var secret = this.getField(dialog, './secret');
                        secret.setValue(reportSuites.secret);
                        dialog.find("localName", "connectButton")[0].setText(CQ.I18n.getMessage('Re-Connect to SiteCatalyst'));

                        CQ.Ext.Msg.show({ 
                                title: CQ.I18n.getMessage("Success"), 
                                msg: CQ.I18n.getMessage("Connection successful"), 
                                buttons: CQ.Ext.Msg.OK, 
                                icon: CQ.Ext.Msg.INFO}); 
                        CQ.cloudservices.getEditOk().enable();
                    } else if (reportSuites && (reportSuites.error == "not authenticated" || reportSuites.error == "Unable to validate authentication.")) {
                        CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"), CQ.I18n.getMessage("We were not able to login to SiteCatalyst.<br /><br />Please check your credentials and try again."));
                    } else if (reportSuites && reportSuites.error == "not authorized"){
                        CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),CQ.I18n.getMessage("Web Service access is not enabled.<br /><br />Please see a SiteCatalyst administrator to enable access."));
                    } else if (reportSuites && reportSuites.error == "not online"){
                        CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),CQ.I18n.getMessage("Connection to SiteCatalyst could not be established.<br /><br />Please check your Internet connection."));
                    } else {
                        CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),CQ.I18n.getMessage("Connection to SiteCatalyst could not be established.<br /><br />Please see a SiteCatalyst administrator for more details."));
                    }
                } else {
                    CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"), CQ.I18n.getMessage("Error while connecting."));
                } 
            },
            {
                "method": "Connect",
                "company": company.getValue(),
                "username": username.getValue(),
                "password": password != "" ? password.getValue() : ""
            }, this, true
        );
        
    }
        
};        
