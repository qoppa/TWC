
// initialize CQ.cloudservices package
CQ.cloudservices = {};

/**
 * Creates a dialog for creating new configurations.
 * 
 * @param rootPath {String} Path to the service root
 * @param parentPath {String} Path to be set by default on the parent path field (optional)
 * @param showParent {String} Setting to true shows the parent selection popup (optional)
 * @param dialogTitle {String} Setting it alters the configuration dialog title (optional)
 */
CQ.cloudservices.createConfiguration = function(rootPath, parentPath, showParent, dialogTitle) {
    dialogTitle = dialogTitle || CQ.I18n.getMessage("Create Configuration");
    var templatesStore = new CQ.Ext.data.Store({
        "proxy": new CQ.Ext.data.HttpProxy({ "url":"/bin/wcm/templates", "method":"GET" }),
        "reader": new CQ.Ext.data.JsonReader(
            { "totalProperty":"results", "root":"templates", "id":"path" },
            [ "path", "title", "description", "thumbnailPath", "iconPath", "ranking" ]
        ),
        "baseParams": { "_charset_":"utf-8", "path":rootPath },
        "listeners": {
            "load": function() {
                this.sort("ranking");
            }
        }

    });

    var dataView = new CQ.Ext.DataView({
        "multiSelect": false,
        "singleSelect": true,
        "emptyText": CQ.I18n.getMessage("No template available"),
        "store": templatesStore,
        "overClass": "x-view-over",
        "itemSelector" :"div.template-item",
        "tpl":new CQ.Ext.XTemplate(
            '<tpl for=".">',
            '<div class="template-item">',
            '<tpl if="thumbnailPath">',
                '<img class="template-thumbnail" src="{[CQ.shared.HTTP.getXhrHookedURL(CQ.shared.HTTP.externalize(CQ.shared.HTTP.encodePath(values.thumbnailPath)))]}">',
                '<div class="template-title">{title}</div>',
                '<div class="template-description">{description}</div>',
            '</tpl>',
            '<tpl if="thumbnailPath == \'\'">',
                '<div class="template-title template-no-thumbnail">{title}</div>',
                '<div class="template-description template-no-thumbnail">{description}</div>',
            '</tpl>',
            '<div style="clear:both"></div>',
            '</div>',
            '</tpl>',
            '<div style="height:5px;overflow:hidden"></div>'),
        "prepareData": function(data) {
            // 900000000: move to the end of the list
            data.ranking = data.ranking != null ? data.ranking : 900000000;
            data.thumbnailPath = data.thumbnailPath ? CQ.HTTP.externalize(data.thumbnailPath) : '';
            data.title = CQ.I18n.getVarMessage(data.title);
            data.description = data.description ? CQ.I18n.getVarMessage(data.description) : "";
            return data;
        }
    });

    var hiddenTemplate =  new CQ.Ext.form.Hidden({"name": "template"});

    //workaround to select a default value. select() must be called at the end of refresh method
    dataView.refresh = function(){
        this.clearSelections(false, true);
        this.el.update("");
        var html = [];
        var records = this.store.getRange();
        if(records.length < 1){
            if(!this.deferEmptyText || this.hasSkippedEmptyText){
                this.el.update(this.emptyText);
            }
            this.hasSkippedEmptyText = true;
            this.all.clear();
            return;
        }
        this.tpl.overwrite(this.el, this.collectData(records, 0));
        this.all.fill(CQ.Ext.query(this.itemSelector, this.el.dom));
        this.updateIndexes(0);

        this.select(0);
    };

   var createDialog = {
        "jcr:primaryType": "cq:Dialog",
        "id": CQ.Util.createId("cq-createdialog"),
        "title": dialogTitle,
        "formUrl": CQ.shared.HTTP.externalize("/bin/wcmcommand"),
        "params": {
            "cmd":"createPage",
            "_charset_":"utf-8"
        },
        "height": 520,
        "items": {
            "jcr:primaryType": "cq:Panel",
            "items": {
                "jcr:primaryType": "cq:WidgetCollection",
                "parent": {
                    "xtype": "pathfield",
                    "fieldLabel": CQ.I18n.getMessage("Parent Configuration"),
                    "allowBlank": false,
                    "name":"parentPath",
                    "rootPath": rootPath,
                    "value": parentPath || undefined,
                    "hidden": !showParent,
                    "listeners": {
                        "dialogselect": function(comp,path,anchor) {
                            /* reload templates for new path */
                            templatesStore.setBaseParam("path", path);
                            templatesStore.removeAll();                    
                            templatesStore.reload();
                        }
                    }
                },
                "title": {
                    "fieldLabel":CQ.I18n.getMessage("Title"),
                    "allowBlank":false,
                    "name":"title"
                },
                "label": {
                    "fieldLabel":CQ.I18n.getMessage("Name"),
                    "vtype":"itemname",
                    "name":"label"
                },
                "template": {
                    "xtype": "panel",
                    "border": false,
                    "cls": "cq-template-view",
                    "autoScroll":true,
                    "width": "100%",
                    "autoHeight":false,
                    "height": 350,
                    "items": [
                        hiddenTemplate,
                        dataView
                    ]
                    ,"listeners": {
                        "render" : {
                            fn: function() {
                                templatesStore.load();
                            }
                        }
                    }
                }
            }
        },
        "okText":CQ.I18n.getMessage("Create")
    };

    var dialog = CQ.WCM.getDialog(createDialog);

    dialog.on("beforesubmit", function() {
        if(dataView.getSelectedRecords()[0] && dataView.getSelectedRecords()[0].data)
            hiddenTemplate.setRawValue(dataView.getSelectedRecords()[0].data.path);
    });

    dialog.success = function(form, action) {
        if( (typeof action.result.Path) == "string") {
            var newPage = action.result.Path;    //CQ.HTTP.internalize(action.result.Location);
            CQ.wcm.SiteAdmin.multiWinMode = false;
            CQ.wcm.SiteAdmin.openPage(newPage, "page", false);
        } else {
            CQ.Ext.Msg.alert(
                    CQ.I18n.getMessage("Error"),
                    CQ.I18n.getMessage("Did not get path of new configuration in response"));
        }
    };
    
    dialog.failure = function(){
        CQ.Ext.Msg.alert(
            CQ.I18n.getMessage("Error"),
            CQ.I18n.getMessage("Could not create configuration.")
        );
    };

    return dialog;
};

/**
 * Creates and pops up a dialog for creating new configurations.
 * 
 * @param rootPath {String} Path to the service root
 * @param parentPath {String} Path to be set by default on the parent path field (optional)
 * @param showParent {String} Setting to true shows the parent selection popup (optional)
 * @param dialogTitle {String} Setting it alters the configuration dialog title (optional)
 */
CQ.cloudservices.editNewConfiguration = function(rootPath, parentPath, showParent, dialogTitle) {
    CQ.cloudservices.createConfiguration(rootPath, parentPath, showParent, dialogTitle).show();
}

/**
 * Creates a panel for displaying a service summary.
 *
 * @param path {String} Path to the dialog 
 */
CQ.cloudservices.createSummaryPanel = function(path) {
    //load path from service
    var url = CQ.HTTP.externalize(path + CQ.Sling.SELECTOR_INFINITY + CQ.HTTP.EXTENSION_JSON, true);
    var response = CQ.HTTP.get(url);
    var data = CQ.HTTP.eval(response);
    if (data) {
        var url = data["jcr:content"]["summaryPanelPath"];
        var createDialog = CQ.WCM.getDialogConfig(url);
        if (createDialog) {
            createDialog.path = path;
            var dialog = CQ.Util.build(createDialog);
            return dialog;
        }
    } else {
        CQ.Log.warn("CQ.cloudservices#createSummaryDialog: retrieval of dialog unsuccessful");
    }
};

/**
 * @class CQ.cloudservices.ConfigurationCombo
 * @extends CQ.Ext.form.ComboBox
 * The ConfigurationCombo is a customized {@link CQ.Ext.form.ComboBox}
 * that shows a list of available configurations for a specific service.
 *
 * @constructor
 * Creates a new ConfigurationCombo.
 * @param {Object} config The config object
 */
CQ.cloudservices.CloudConfigurationCombo = CQ.Ext.extend(CQ.form.ClearableComboBox, {

	/**
	 * @cfg {String} rootPath
	 * Path of configurations root (i.e. /etc/cloudservices/sitecatalyst)
	 */
    rootPath: null,
    
    /**
     * @cfg {Boolean} createNewEnabled
     * Enables creating of new configuration by adding an additional
     * entry in the dropdown (Defaults to false)
     */
    createNewEnabled: false,

    constructor: function(config) {
    	var self = this;
        config = (!config ? {} : config);
        
        this.rootPath = config.rootPath || null;
        
        var rootPathParam = config.rootPath ? "?rootPath=" + config.rootPath : "";
        
        this.store = new CQ.Ext.data.Store({
            "autoLoad": {},
            "proxy":new CQ.Ext.data.HttpProxy({
                "url":CQ.shared.HTTP.externalize("/libs/cq/cloudservices/configurations.json" + rootPathParam),
                "method":"GET"
            }),
            "reader": new CQ.Ext.data.JsonReader({
                "root": "configurations",
                "id" : "path",
                "fields": [ "title", "description", "name", "path", "templatePath" ]
            }),
            "listeners": {
                "load": function(store) {
                	if (self.createNewEnabled) {
	                    store.add(new store.recordType({
	                        "path": "",
	                        "title": CQ.I18n.getMessage("Create new configuration..."),
	                        "description": ""
	                    }, CQ.Ext.id()));
                    }
                }
            }
        });

        // If setValue is called before our store's data is loaded, we need
        // to set the value again so that labels are correctly displayed
        var thisCombo = this;
        this.initialValue = null;
        this.store.on("load", function() {
            if(thisCombo.initialValue) {
                thisCombo.setValue(thisCombo.initialValue);
            }
            thisCombo.fireEvent("load", this);
        });

        config = CQ.Util.applyDefaults(config, {
            "name": config.name || "cloudserviceconfigs",
            "hiddenName": "./" + config.name || "./cloudserviceconfigs",
            "fieldLabel": "Configuration",
            "displayField":"title",
            "valueField":"path",
            "valueNotFoundText": CQ.I18n.getMessage("Configuration reference missing"),
            "title":CQ.I18n.getMessage("Available configurations"),
            "selectOnFocus":true,
            "triggerAction":"all",
            "allowBlank":true,
            "editable":false,
            "lazyInit":false,
            "store":this.store,
            "mode": "local",
            "tpl":new CQ.Ext.XTemplate(
                '<tpl for=".">',
                '<div class="workflow-model-item x-combo-list-item">',
                    '<div class="workflow-model-title workflow-model-no-thumbnail">{title:this.formatStr}</div>',
                    '<div class="workflow-model-description workflow-model-no-thumbnail">{description:this.formatStr}</div>',
                    '<div style="clear:both"></div>',
                '</div>',
                '</tpl>',
                '<div style="height:5px;overflow:hidden"></div>',
                {
                	formatStr:function(v) {
                		return (v!== null) ? v : "";
                	}
                }
            )
        });

        CQ.cloudservices.CloudConfigurationCombo.superclass.constructor.call(this, config);
    },

    initComponent : function() {
        CQ.cloudservices.CloudConfigurationCombo.superclass.initComponent.call(this);
        
        this.on("select", function(combo, record, index) {
            if(record.get("path") == "") {
                this.createNewConfiguration();
            }
        }, this);
    },

    setValue : function(value) {
        this.initialValue = value;
        CQ.cloudservices.CloudConfigurationCombo.superclass.setValue.call(this, value);
    },

    reload : function(options) {
        this.store.reload(options);
    },

    getSelectedRecord : function() {
        var result = {};
        var id = this.getValue();
        result = this.store.getById(id);
        return result;
    },

    createNewConfiguration : function() {      
        var myThis = this;
        var newDialogConfig = CQ.cloudservices.createConfiguration(this.rootPath);
        var newDialog = CQ.WCM.getDialog(newDialogConfig);

        newDialog.success = function(form, action) {
        	if( (typeof action.result.Path) == "string") {
                myThis.reload();
                myThis.setValue(action.result.Path);
                var newPage = CQ.HTTP.internalize(action.result.Location);
                CQ.wcm.SiteAdmin.openPage(newPage, "page", true);
            } else {
                CQ.Ext.Msg.alert(
                        CQ.I18n.getMessage("Error"),
                        CQ.I18n.getMessage("Did not get path of new configuration in response"));
            }
        };
        newDialog.failure = function(){
            CQ.Ext.Msg.alert(
                CQ.I18n.getMessage("Error"),
                CQ.I18n.getMessage("Could not create configuration.")
            );
        };
        
        newDialog.show();
    }
});

CQ.Ext.reg("cloudservicescombo", CQ.cloudservices.CloudConfigurationCombo);
CQ.cloudservices.CloudServiceDialog = CQ.Ext.extend(CQ.Dialog, {
    
    servicesStore: null,
    
    dataView: null,
    
    constructor: function(config) {
        var dlg = this;
        
        this.servicesStore = new CQ.Ext.data.Store({
            "proxy": new CQ.Ext.data.HttpProxy({ "url": CQ.HTTP.noCaching("/libs/cq/cloudservices/services.json"), "method":"GET" }),
            "reader": new CQ.Ext.data.JsonReader({
                    "root":"services",
                    "id":"path"
                }, [
                    "path",
                    "title",
                    "description",
                    "visible",
                    "name",
                    "serviceUrl",
                    "serviceUrlLabel",
                    "templatePath",
                    "thumbnailPath",
                    "iconPath",
                    "ranking"
                ]),
                "listeners": {
                    "load": function() {
                        this.sort("ranking"); 
                        this.filterBy(function(rec){
                            var cfg = config.data['cq:cloudserviceconfigs'];
                            if(cfg) {
                                if(CQ.Ext.isArray(cfg)) {
                                    for(var i=0; i<cfg.length; i++) {
                                        if(cfg[i].indexOf(rec.get('path')) > -1) {
                                            return false;
                                        }
                                    }
                                } else {
                                    if(cfg.indexOf(rec.get('path')) > -1) {
                                        return false;
                                    }
                                }
                                return (rec.get('visible'));
                            }
                            return (rec.get('visible'));
                        });
                    }
                }
            }
        );      
        
        var defThumb = CQ.HTTP.externalize("/libs/cq/cloudserviceconfigs/widgets/themes/default/widgets/CloudServiceDialog/thumbnail.png");
        this.dataView = new CQ.Ext.DataView({
            "multiSelect": false,
            "singleSelect": true,
            "emptyText": CQ.I18n.getMessage("No (unreferenced) cloud services available"),
            "store": dlg.servicesStore,
            "autoHeight": true,
            "overClass": "x-view-over",
            "itemSelector" :"div.template-item",
            "tpl": new CQ.Ext.XTemplate(
                '<tpl for=".">',
                    '<div class="template-item">',
                        '<tpl if="thumbnailPath">',
                            '<img class="template-thumbnail" src="{thumbnailPath}">',
                        '</tpl>',
                        '<tpl if="!thumbnailPath">',
                            '<img class="template-thumbnail" src="{this.defThumb}">',
                        '</tpl>',
                        '<div class="template-title">{title:this.formatStr}</div>',
                        '<div class="template-description">{description:this.formatStr}</div>',
                        '<div style="clear:both"></div>',
                    '</div>',
                '</tpl>',
                '<div style="height:5px;overflow:hidden"></div>', 
                {
                    formatStr: function(v) {
                        return (v!== null) ? v : "";
                    },
                    defThumb: defThumb
                }
            ),
            "prepareData": function(data) {
                data.ranking = data.ranking != null ? data.ranking : 900000000;
                data.thumbnailPath = CQ.HTTP.externalize(data.thumbnailPath);
                return data;
            }
        });
        
        var mainPanel = new CQ.Ext.Panel({
            id: "cq-card-first",
            layout: "form",
            autoScroll: true,
            title: CQ.I18n.getMessage("Select Cloud Service"),
            header: false,
            bodyStyle: CQ.themes.Dialog.TAB_BODY_STYLE,
            labelWidth: CQ.themes.Dialog.LABEL_WIDTH,
            defaultType: "textfield",
            "stateful": false,
            defaults: {
                msgTarget: CQ.themes.Dialog.MSG_TARGET,
                anchor: CQ.themes.Dialog.ANCHOR,
                "stateful": false
            },
            "items": [{
                    "xtype": "panel",
                    "border": false,
                    "cls": "cq-template-view",
                    "autoHeight": true,
                    "layout": "fit",
                    "items": dlg.dataView,
                    "listeners": {
                        "render" : {
                            fn: function() {
                                dlg.servicesStore.load();
                            }
                        }
                    }
                }
            ]           
        });
        
        CQ.Util.applyDefaults(config, {
            id:"cq-cloudservicesdialog",
            title:CQ.I18n.getMessage("Cloud Services"),
            items: [mainPanel],
            buttons: [
                CQ.Dialog.OK,
                CQ.Dialog.CANCEL
            ]
        });

        CQ.cloudservices.CloudServiceDialog.superclass.constructor.call(this, config);
    },
    
    getSelectedService: function() {
        var r = this.dataView.getSelectedRecords()[0];
        if(r && r.data) {
            return r.data;
        }
        return null;
    }
    
});
CQ.Ext.reg("cloudservicedialog", CQ.cloudservices.CloudServiceDialog);
CQ.cloudservices.CloudServicePanel = CQ.Ext.extend(CQ.Ext.Panel, {
    
    inheritField: null,
    
    serviceFieldSet: null,
    
    addServiceButton: null,
    
    dataView: null,
    
    data: null,
    
    constructor: function(config) {
        var dlg = this;
        
        this.inheritField = new CQ.Static({
            "fieldLabel": CQ.I18n.getMessage("Inherited from"),
            "html": ""
        });
                
        this.serviceFieldSet = new CQ.form.DialogFieldSet({
            title: CQ.I18n.getMessage("Cloud Service Configurations"),
            collapsed: false,
            autoHeight: true,
            autoScroll: true,
            items: [
                {
                    xtype: "hidden",
                    name: "./cq:cloudserviceconfigs" + CQ.Sling.DELETE_SUFFIX,
                    value: true
                }
            ]
        });
        
        this.addServiceButton = new CQ.Ext.Button({
            "text": CQ.I18n.getMessage("Add Service"),
            "style": "float:right",
            "handler": function() {
                var parentDlg = this.findParentByType("dialog");
                var serviceDlg = new CQ.cloudservices.CloudServiceDialog({
                    path: parentDlg.path,
                    data: dlg.data,
                    buttons: [
                        {
                            text: CQ.I18n.getMessage("OK"),
                            handler: function() {
                                dlg.addService(serviceDlg.getSelectedService());
                                var configs = dlg.data['cq:cloudserviceconfigs'];
                                if(!configs) {
                                    configs = [];
                                }
                                if(typeof(configs) == "string") {
                                    configs = [configs];
                                }
                                dlg.data["cq:cloudserviceconfigs"] = configs;
                                configs.push(serviceDlg.getSelectedService().path);
                                serviceDlg.close();                                                         
                            }
                        },
                        {
                            text: CQ.I18n.getMessage("Cancel"),
                            handler: function() {
                                serviceDlg.close();
                            }
                        }
                    ]
                });
                serviceDlg.show();
            }
        });
        
        CQ.Util.applyDefaults(config, {
            "items": [
                dlg.inheritField,
                dlg.serviceFieldSet,
                {
                    "xtype": "panel",
                    "border": false,
                    "items": [
                        dlg.addServiceButton,
                        {
                            xtype: "static",
                            style: "float:right;margin:3px 10px 0px 0px;text-decoration:underline;",
                            html: '<a href="' + CQ.HTTP.externalize('/miscadmin#/etc/cloudservices') + '" target="_blank">' + CQ.I18n.getMessage("Manage configurations") + '</a>'
                        }
                    ]
                }
            ],
            "listeners": {
                "beforeshow": function(comp) {
                    comp.doLayout();
                }
            }
        });
        
        CQ.cloudservices.CloudServicePanel.superclass.constructor.call(this, config);
    },
    
    initComponent: function() {
        CQ.cloudservices.CloudServicePanel.superclass.initComponent.call(this);
        var parentDialog = this.findParentByType("dialog");
        parentDialog.on("loadcontent", this.postProcessRecords, this);
    },
    
    postProcessRecords: function(dialog, records, opts, sucess) {
        //#38153: already initialized
        if (this.data) {        
            return;
        }
        //check for inheritance
        var dlg = this.findParentByType('dialog');
        var dlgPath = dlg.path.replace("/jcr:content","");
        var showParent = !records[0].data["cq:cloudserviceconfigs"] ? "" : "?showparent=true"; 
        var url = CQ.HTTP.noCaching(dlgPath + ".cloudservices.json" + showParent)
        var response = CQ.HTTP.get(url);
        var inheritData = CQ.HTTP.eval(response);    
        var recordData = records[0].data;
        var isInherited = inheritData["jcr:path"] != undefined; 
        var isOverridden = (isInherited && recordData["cq:cloudserviceconfigs"] != undefined);
        
        this.data = recordData;
        if(isInherited && !isOverridden) {
            this.data = inheritData;
        }
        
        //fill store with configured services
        if(this.data["cq:cloudserviceconfigs"]) {       
            var url = CQ.HTTP.noCaching("/libs/cq/cloudservices/services.json")
            var response = CQ.HTTP.get(url);
            var data = CQ.HTTP.eval(response);
            
            var configs = this.data["cq:cloudserviceconfigs"];
            if(typeof(configs) == "string") {
                configs = [configs];
            }
            for(var i=0; i<configs.length; i++) {
                var service = this.getServiceForConfigPath(data.services, configs[i]);
                if(service) {
                    this.addService(service, configs[i]);
                }
            }
        }
        
        if( (this.data["jcr:path"] || dlgPath) ) {
            if(isInherited) {
                var inheritPath = inheritData["jcr:path"].replace("/jcr:content","");
                var tpl = new CQ.Ext.Template('{path}');
                this.inheritField.updateHtml(tpl.apply({path: inheritPath}));
            }
            
            this.inheritField.setVisible((isOverridden || isInherited));
            this.setConfigurationsEnabled((isOverridden || !isInherited));
            
            var editLock = isOverridden ? false : true;
            this.handleLock(this.inheritField, editLock);
        }
    },
    
    setConfigurationsEnabled: function(enable) {
        var tab = this.findParentByType('tabpanel');
        var fields = tab.findByType('compositefield');
        for(var i = 0; i < fields.length; i++) {
            enable ? fields[i].enable() : fields[i].disable();
        }
        enable ? this.addServiceButton.enable() :  this.addServiceButton.disable();
    },
    
    getServiceForConfigPath: function(services, path) {
        for(var i=0; i<services.length; i++) {
            if(path.indexOf(services[i].path) > -1) {
                return services[i];
            }
        }
    },
    
    handleLock: function(field, editLock) {
        try {
            var dlg = this;
            var iconCls = (editLock ? "cq-dialog-locked" : "cq-dialog-unlocked");
            field.editLock = editLock;
            
            field.fieldEditLockBtn = new CQ.TextButton({
                "tooltip": editLock ? CQ.Dialog.CANCEL_INHERITANCE : CQ.Dialog.REVERT_INHERITANCE,
                "cls": "cq-dialog-editlock",
                "iconCls": iconCls,
                "handleMouseEvents": false,
                "handler": function() {                     
                    dlg.switchInheritance(field, function(field, iconCls, editLock) {
                            field.fieldEditLockBtn.setIconClass(iconCls);
                            field.fieldEditLockBtn.setTooltip(iconCls == "cq-dialog-unlocked" ?
                                    CQ.Dialog.REVERT_INHERITANCE : CQ.Dialog.CANCEL_INHERITANCE);
                            field.setDisabled(editLock);
                            field.editLock = editLock;
                            },
                            dlg);
                }
            });
            var formEl = CQ.Ext.get('x-form-el-' + field.id);
            var label = formEl.parent().first();
            // narrow the field label
            formEl.parent().first().dom.style.width =
                    (parseInt(label.dom.style.width) - CQ.themes.Dialog.LOCK_WIDTH) + "px";
            if (field.rendered) {
                field.fieldEditLockBtn.render(formEl.parent(), label.next());
            } else {
                this.on("render", function(comp) {
                    field.fieldEditLockBtn.render(formEl.parent(), label.next());
                });
            }
        }
        catch (e) {
            // skip (formEl is null)
        }       
    },
    
    switchInheritance: function(field, callback, scope) {
        CQ.Ext.Msg.confirm(
            field.editLock ? CQ.I18n.getMessage("Cancel inheritance") : CQ.I18n.getMessage("Revert inheritance"),
            field.editLock ? CQ.I18n.getMessage("Do you really want to cancel the inheritance?") : CQ.I18n.getMessage("Do you really want to revert the inheritance?"),
            function(btnId) {
                if (btnId == "yes") {
                    var editLock = (field.editLock ? false : true);
                    var iconCls = (field.editLock ? "cq-dialog-unlocked" : "cq-dialog-locked");
                    if (callback) {
                        callback.call(this, field, iconCls, editLock);
                    }
                    this.setConfigurationsEnabled(!editLock);
                }
            },
            scope || this
        );
    },
    
    addService: function(service, value) {
        if(service && service.title && service.path) {
            var fld = {
                "xtype": "compositefield",
                "items": [
                    {
                        "xtype": "cloudservicescombo",
                        "fieldLabel": service.title,
                        "name": "./cq:cloudserviceconfigs",
                        "rootPath": service.path,
                        "templatePath": service.templatePath,
                        "value": value ? value : "",
                        "flex": 1
                    }
                ]
            };
            
            var linkHtml;
            if(service.serviceUrl) {
                linkHtml = '<a href="' + service.serviceUrl + '" target="_blank"><img ext:qtip="' + (service.serviceUrlLabel || "Link to Service")
                           + '" src="' + CQ.HTTP.externalize(service.iconPath || '/libs/cq/ui/widgets/themes/default/icons/16x16/siteadmin.png') + '" /></a>';
            } else {
                linkHtml = '<img src="' + CQ.HTTP.externalize('/etc/designs/default/0.gif') + '" />';
            }
            
            fld.items.push({
                xtype: 'static',
                html: linkHtml,
                width: '16px'
            });
            
            this.serviceFieldSet.add(fld);
            this.serviceFieldSet.doLayout();
        }
    }
    
});
CQ.Ext.reg("cloudservicepanel", CQ.cloudservices.CloudServicePanel);
CQ.cloudservices.CloudServiceSummaryPanel = CQ.Ext.extend(CQ.Ext.Panel, {

    /**
     * @cfg {String} path
     * The path to load the content from.
     */
    path: null,
    
    /**
     * @private
     */  
    serviceDescription: null,
    
    /**
     * @private
     */
    serviceInfo: null,
    
    constructor: function(config) {
        var self = this;

        this.path = config.ownerCt.path;
        if (!config.items) {
            config.items = [];
        }
            
        /* add service description */ 
        this.serviceDescription = new CQ.Static(); 
        config.items.unshift({
            "xtype":"panel",
            "cls": "cq-cloudservice-summary-info",
            "header": false,
            "border": false,
            "items": [
                this.serviceDescription
            ]
        });
        
        /* add service info */
        this.serviceInfo = new CQ.Static({
            "fieldLabel": CQ.I18n.getMessage("Service is")
        });
        config.items.splice(1,0,this.serviceInfo);
        
        CQ.Util.applyDefaults(config, {
            "cls": "cq-cloudservice-summary",
            "title": CQ.I18n.getMessage("Service summary"),
            "header": false,
            "border": false,
            "width": "100%",
            "labelWidth": 200,
            "padding": 10,
            "layout": "form",
            "listeners": {
                "loadcontent": self.updateContent
            }
        });
        
        // add events
        this.addEvents(
            /**
             * @event loadcontent
             * Fires after the dialog's content has been loaded.
             * @param {CQ.Dialog} this
             * @param {CQ.Ext.data.Record[]} recs The records
             * @param {Object} opts The options, such as the scope
             * @param {Boolean} success True if retrieval of records was
             *        successful
             */
            "loadcontent"        
        );
        
        CQ.cloudservices.CloudServiceSummaryPanel.superclass.constructor.call(this, config);
    },
    
    initComponent: function() {
        CQ.cloudservices.CloudServiceSummaryPanel.superclass.initComponent.call(this);
        this.loadContent();
    },
    
    updateContent: function(cmp) {
        this.updateServiceDescription();
        this.updateServiceInfo();
    },
    
    updateServiceDescription: function() {
        if (this.content) {
            var img = (this.content["thumbnailPath"] || CQ.WCM.THUMBNAIL_DEFAULT_PATH);
            var title = (this.content["jcr:title"] || "") ;
            var desc = (this.content["description"] || "");

            this.serviceDescription.updateHtml('<h1>' + title + this.getThumbnailHtml(img) + '</h1><p>' + desc + '</p>');
        }
    },
    
    updateServiceInfo: function() {
        if (this.data) {
            var isActive = this.isServiceActive();
            this.serviceInfo.updateHtml( (isActive ? "enabled" : "disabled") );
        }
    },
    
    isServiceActive: function() {
        /* check for child pages */
        for (prop in this.data) {
            var node = this.data[prop];
            if (node && node["jcr:primaryType"]) {
                if (node["jcr:primaryType"] == "cq:Page") {
                    return true;
                }
            }
        }
        return false;
    },
 
    getThumbnailHtml: function(path) {
        var url = CQ.HTTP.externalize(path, true);
        return '<img src="' + CQ.shared.XSS.getXSSValue(url) + '">';
    },
       

    /**
     * Loads the content from the specified path or Store (similar to
     * {@link CQ.Dialog#loadContent}).
     */
    loadContent: function() {
        var store = null;

        if (!this.content) {
            var extension = CQ.Sling.SELECTOR_INFINITY + CQ.HTTP.EXTENSION_JSON;
            var url = CQ.HTTP.externalize(this.path + extension);
            store = new CQ.data.SlingStore({"url": url});
        } else if (this.content instanceof CQ.Ext.data.Store) {
            store = this.content;
        }

        store.load({
            callback: this.processRecords,
            scope: this
        });
    },

    /**
     * Processes the given records. This method should only be used as
     * a callback by the component's store when loading content.
     * @param {CQ.Ext.data.Record[]} recs The records
     * @param {Object} opts The options such as the scope (optional)
     * @param {Boolean} success True if retrieval of records was successful
     * @see CQ.Dialog#processRecords
     * @private
     */
    processRecords: function(recs, opts, success) {
        var rec;
        if (success) {
            rec = recs[0];
            this.data = rec;
            this.content = rec.get("jcr:content");
        } else {
            CQ.Log.warn("CQ.cloudservices.CloudServiceSummaryPanel#processRecords: retrieval of records unsuccessful");
            rec = new CQ.data.SlingRecord();
            rec.data = {};
        }
        CQ.Log.debug("CQ.cloudservices.CloudServiceSummaryPanel#processRecords: processing records for fields");
        var fields = this.findByType('static');

        for (var i = 0; i < fields.length; i++) {
            try {
                if (!fields[i].initialConfig.ignoreData) {
                    CQ.Log.debug("CQ.cloudservices.CloudServiceSummaryPanel#processRecords: calling updateHTML of field '{0}'", fields[i]);
                    var valName = fields[i].name;
                    var val = rec.get(valName);
                    if (val !== undefined && fields[i].updateHtml) {
                        fields[i].updateHtml(val);
                    }
                }
            }
            catch (e) {
                CQ.Log.debug("CQ.cloudservices.CloudServiceSummaryPanel#processRecords: {0}", e.message);
            }
        }

        this.fireEvent("loadcontent", this);
    }

});

CQ.Ext.reg("cloudservicesummarypanel", CQ.cloudservices.CloudServiceSummaryPanel);

CQ.cloudservices.CloudServiceSummaryPanel.THUMBNAIL_DEFAULT_PATH = "/libs/cq/cloudserviceconfigs/widgets/extjs/themes/default/widgets/CloudServiceDialog/thumbnail.png";
