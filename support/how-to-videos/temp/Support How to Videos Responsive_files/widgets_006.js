/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

// initialize CQ.personalization package
CQ.personalization = {};


CQ.Ext.StoreMgr.register(new CQ.Ext.data.SimpleStore({
    storeId: "clickstreamstore",
    data: [],
    fields: ["key", "value"],
    id: 0
}));


CQ_Analytics.ClickstreamcloudMgr.addListener("storesloaded", function(e) {
    var data = new Array();
    var dataMgrs = {
        profile: CQ_Analytics.ProfileDataMgr,
        pagedata: CQ_Analytics.PageDataMgr,
        surferinfo: CQ_Analytics.SurferInfoMgr,
        eventdata: CQ_Analytics.EventDataMgr
    };
    for(var mgr in dataMgrs) {
        var profileNames = dataMgrs[mgr].getPropertyNames();
        var title = CQ_Analytics.ClickstreamcloudMgr.getUIConfig(mgr).title;
        for(var i=0; i < profileNames.length; i++) {
        	if (!CQ.shared.XSS.KEY_REGEXP.test(profileNames[i])) {
        		data.push([mgr + "." + profileNames[i], mgr + "." + profileNames[i] ]);
        	}
        }
    }
    CQ.Ext.StoreMgr.lookup("clickstreamstore").loadData(data);
});

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * @class CQ.personalization.EditableClickstreamcloud
 * @extends CQ.Dialog
 * EditableClickstreamcloud is a dialog allowing to edit the Clickstreamcloud by providing access to the properties
 * of the Clickstreamcloud session stores.
 * It mainly contains {@link CQ.personalization.EditableClickstreamcloud.FormSection}.
 * @constructor
 * Creates a new EditableClickstreamcloud.
 * @param {Object} config The config object
 */
CQ.personalization.EditableClickstreamcloud = CQ.Ext.extend(CQ.Dialog, {
    constructor: function(config) {
        config = (!config ? {} : config);
        this.fieldsContainer = new CQ.Ext.TabPanel({});
        var currentObj = this;
        var defaults = {
            "id": "cq-editable-clickstreamcloud",
            "title": CQ.I18n.getMessage("Edit the current Clickstream Cloud"),
            "width": 400,
            "height": 400,
            "warnIfModified": false,
            "animCollapse": false,
            "collapsible": true,
            "stateful": true,
            "items": this.fieldsContainer,
            "buttons": [{
                "text": CQ.I18n.getMessage("Add"),
                "tooltip": CQ.I18n.getMessage("Add a new property"),
                "handler": function() {
                    var section = currentObj.getActiveSection();
                    if (section) {
                        section.addFieldHandler();
                    }
                }
            },{
                "text": CQ.I18n.getMessage("Remove"),
                "tooltip": CQ.I18n.getMessage("Remove the selected property"),
                "handler": function() {
                    var section = currentObj.getActiveSection();
                    if (section) {
                        section.removeFieldHandler();
                    }
                },
                "listeners": {
                    "mouseover": function() {
                        var section = currentObj.getActiveSection();
                        if (section) {
                            if (section.lastSelectedItem) {
                                section.lastSelectedItemToDelete = section.lastSelectedItem;
                            } else {
                                section.lastSelectedItemToDelete = null;
                            }
                        }
                    },
                    "mouseout": function() {
                        var section = currentObj.getActiveSection();
                        if (section) {
                            section.lastSelectedItemToDelete = null;
                        }
                    }
                }
            },{
                "text": CQ.I18n.getMessage("Reset"),
                "tooltip": CQ.I18n.getMessage("Revert the current properties to the intial values"),
                "handler": function() {
                    var section = currentObj.getActiveSection();
                    if (section) {
                        section.reset();
                    }
                }
            },{
                "text": CQ.I18n.getMessage("Done"),
                "tooltip": CQ.I18n.getMessage("Close the current dialog"),
                "handler": function() {
                    currentObj.hide();
                }
            }],
            "listeners": {
            	"beforeshow": function(cmp) {
                    if(CQ_Analytics.Sitecatalyst) {
                    	currentObj.reload();
                    }
            	}
            }
        };

        CQ.Util.applyDefaults(config, defaults);

        // init component by calling super constructor
        CQ.personalization.EditableClickstreamcloud.superclass.constructor.call(this, config);
    },

    /**
     * Returns the active displayed section.
     * @return {CQ.personalization.EditableClickstreamcloud.FormSection} The active section.
     * @private
     */
    getActiveSection: function() {
        return this.fieldsContainer.layout.activeItem;
    },

    /**
     * Adds the given section to the main tab.
     * @param {CQ.personalization.EditableClickstreamcloud.FormSection} section Section to add.
     * @private
     */
    addSection: function(section) {
        if (section) {
            this.fieldsContainer.add(section);
            this.fieldsContainer.doLayout();
            var ai = this.getActiveSection();
            if( !ai ) {
                this.fieldsContainer.setActiveTab(0);
            }
        }
    },

    /**
     * Registers a session store to the current EditableClickstreamcloud.
     * @param {Object} config Config object. Expected configs are: <ul>
     * <li>sessionStore: session store to be editable.</li>
     * <li>mode: one of the following UI mode: CQ.personalization.EditableClickstreamcloud.MODE_TEXTFIELD,
     * CQ.personalization.EditableClickstreamcloud.MODE_LINK
     * or CQ.personalization.EditableClickstreamcloud.MODE_STATIC (default).</li>
     * <li>title: section title.</li>
     * <li>sectionConfig: initial section config.</li>
     * </ul>
     */
    register: function(config /*sessionStore, mode, title, sectionConfig*/) {
        var section = new CQ.personalization.EditableClickstreamcloud.FormSection(config);
        this.addSection(section);
    },

    /**
     * Reloads each of the contained sections.
     * @private
     */
    reload: function() {
        this.fieldsContainer.items.each(function(item,index,length) {
            if(item.reload) {
                item.reload();
            }
            return true;
        });
    }
});

/**
 * @class CQ.personalization.EditableClickstreamcloud.FormSection
 * @extends CQ.Ext.Panel
 * FormSection is a panel providing UI to access and edit the properties of a Clickstreamcloud session store.
 * @constructor
 * Creates a new FormSection.
 * @param {Object} config The config object
 */
CQ.personalization.EditableClickstreamcloud.FormSection = CQ.Ext.extend(CQ.Ext.Panel, {
    /**
     * @cfg {CQ.form.Field} newPropertyNameField
     * The field config to specify the name of a new property (Defaults to textfield).
     */
    newPropertyNameField: null,

    /**
     * @cfg {CQ.form.Field} newPropertyValueField
     * The field config to specify the value of a new property (Defaults to textfield).
     */
    newPropertyValueField: null,

    /**
     * @cfg {String} Display mode
     * Session store properties will be displayed depending on this property with:<ul>
     * <li>{@link CQ.personalization.EditableClickstreamcloud.MODE_TEXTFIELD}: a textfield</li>
     * <li>{@link CQ.personalization.EditableClickstreamcloud.MODE_LINK}: a link (not editable)</li>
     * <li>{@link CQ.personalization.EditableClickstreamcloud.MODE_STATIC} (default): a static text(not editable).</li>
     * </ul>
     */
    mode: null,

    /**
     * @cfg {CQ_Analytics.SessionStore} sessionStore
     * The session store to display and edit.
     */
    sessionStore: null,

    /**
     * @cfg {String} title
     * The section title.
     */
    title: null,

    constructor: function(config) {
        config = (!config ? {} : config);

        config.newPropertyNameField = config.newPropertyNameField || {};
        config.newPropertyValueField = config.newPropertyValueField || {};

        var currentObj = this;
        var defaults = {
            "layout": "form",
            "autoScroll": true,
            "bodyStyle": CQ.themes.Dialog.TAB_BODY_STYLE,
            "labelWidth": CQ.themes.Dialog.LABEL_WIDTH,
            "defaultType": "textfield",
            "stateful": false,
            "border": false,
            "defaults": {
                "anchor": CQ.themes.Dialog.ANCHOR,
                "stateful": false
            }
        };

        CQ.Util.applyDefaults(config, defaults);

        // init component by calling super constructor
        CQ.personalization.EditableClickstreamcloud.FormSection.superclass.constructor.call(this, config);
    },

    initComponent: function() {
        CQ.personalization.EditableClickstreamcloud.FormSection.superclass.initComponent.call(this);
        this.loadFields();
    },

    /**
     * Resets the session store and reloads the fields.
     */
    reset: function() {
        this.sessionStore.reset();
        for (var i = this.items.items.length - 1; i >= 0; i--) {
            this.remove(this.items.items[i]);
        }

        this.reload();
    },

    /**
     * Reloads the fields.
     */
    reload: function() {
        this.removeAllFields();
        this.loadFields();
        this.doLayout();
    },

    /**
     * Shows a dialog used to add a property/value pair in the store.
     * New property name field is defined set by {@link newPropertyNameField} config.
     * New property value field is defined set by {@link newPropertyNameField} config.
     * @private
     */
    addFieldHandler: function() {
        var currentObj = this;

        var newPropertyNameConfig = CQ.Util.applyDefaults(this.newPropertyNameField, {
            "xtype": "textfield",
            "name": "newPropertyName",
            "fieldLabel": CQ.I18n.getMessage("Name"),
            "allowBlank": false
        });

        var newPropertyName = CQ.Util.build(newPropertyNameConfig);

        var newPropertyValueConfig = CQ.Util.applyDefaults(this.newPropertyValueField, {
            "xtype": "textfield",
            "name": "newPropertyValue",
            "fieldLabel": CQ.I18n.getMessage("Value")
        });

        var newPropertyValue = CQ.Util.build(newPropertyValueConfig);

        var dialog = new CQ.Dialog({
            "height": 250,
            "width": 400,
            "title": CQ.I18n.getMessage("Add new property to {0}", this.title),
            "items": {
                "xtype": "panel",
                items: [newPropertyName, newPropertyValue]
            },
            "buttons": [
                {
                    "text": CQ.I18n.getMessage("OK"),
                    "handler":function() {
                        if (newPropertyName.isValid()) {
                            var names = newPropertyName.getValue();
                            if (!(names instanceof Array)) {
                                names = [names];
                            }
                            var labels = null;
                            if (newPropertyName.getLabel) {
                                labels = newPropertyName.getLabel();
                                if (!labels instanceof Array) {
                                    labels = [labels];
                                }
                            }
                            for (var i = 0; i < names.length; i++) {
                                var name = names[i];
                                var label = (labels != null && i < labels.length) ? labels[i] : names[i];
                                var value = newPropertyValue.getValue();
                                currentObj.sessionStore.setProperty(name, value);
                                currentObj.addField(label, value, name);
                            }
                            currentObj.doLayout();
                            dialog.hide();
                        }
                    }
                },
                CQ.Dialog.CANCEL
            ]});
        dialog.show();
    },

    /**
     * Removes the selected field.
     * @private
     */
    removeFieldHandler: function() {
        if (this.lastSelectedItemToDelete) {
            this.sessionStore.removeProperty(this.lastSelectedItemToDelete.getName());
            this.remove(this.lastSelectedItemToDelete);
            this.lastSelectedItemToDelete = null;
        }
    },

    /**
     * Removes all the fields.
     * @private
     */
    removeAllFields: function() {
        if( this.items ) {
            this.items.each(function(item,index,length) {
                this.remove(item);
                return true;
            },this);
        }
    },

    /**
     * Loads a field for each non invisible session store property.
     * @private
     */
    loadFields: function() {
        var storeConfig = CQ_Analytics.CCM.getStoreConfig(this.sessionStore.getName());
        var names = this.sessionStore.getPropertyNames(storeConfig["invisible"]);
        for (var i = 0; i < names.length; i++) {
            var name = names[i];

            //exclude xss properties
            if( !CQ.shared.XSS.KEY_REGEXP.test(name)) {
                this.addField(this.sessionStore.getLabel(name), this.sessionStore.getProperty(name, true), name, this.sessionStore.getLink(name));
            }
        }
    },

    /**
     * Adds a field to the section.
     * @param {String} label Label.
     * @param {String} value Value.
     * @param {String} name Name.
     * @param {String} link (Optional) Link (only if section mode is CQ.personalization.EditableClickstreamcloud.MODE_LNK).
     */
    addField: function(label, value, name, link) {
        if (this.mode == CQ.personalization.EditableClickstreamcloud.MODE_TEXTFIELD) {
        	 if(!CQ_Analytics.Sitecatalyst) {
        		 this.addTextField(label, value, name);
        	 } else {
        		 this.addTriggerField(label, value, name);
        	 }
        } else {
            if (this.mode == CQ.personalization.EditableClickstreamcloud.MODE_LINK && link) {
                this.addLink(label, link);
            } else {
                this.addStaticText(label);
            }
        }
    },

    /**
     * Handles a property change: updates the session store.
     * @param {String} name Property name.
     * @param {String} newValue The new value.
     * @param {String} oldValue The old value.
     * @private
     */
    onPropertyChange: function(name, newValue, oldValue) {
        //copy property value to xss property for display
        if( this.sessionStore.getPropertyNames().indexOf(name + CQ.shared.XSS.KEY_SUFFIX) != -1) {
            this.sessionStore.setProperty(name + CQ.shared.XSS.KEY_SUFFIX, newValue);
        }
        this.sessionStore.setProperty(name, newValue);
    },
    
    /**
     * Add a triggerfield to the section.
     * @param {String} label Label.
     * @param {String} value Default value.
     * @param {String} name Field name.
     */
    addTriggerField: function(label, value, name) {
    	var currentObj = this;

        var tf = new CQ.Ext.form.TriggerField({
            "fieldLabel": label,
            "value": value,
            "name": name,
            "listeners": {
                "change": function(field, newValue, oldValue) {
                    currentObj.onPropertyChange(name, newValue, oldValue);
                },
                "destroy": function() {
                    if( this.container ) {
                        this.container.parent().remove();
                    }
                },
                "focus": function() {
                    currentObj.lastSelectedItem = tf;
                },
                "blur": function() {
                    if (currentObj.lastSelectedItem === tf) {
                        currentObj.lastSelectedItem = null;
                    }
                }
            }
        });

        tf.onTriggerClick = function(e) {
            var dialog = new CQ.personalization.SitecatalystDialog({
                profileLabel: currentObj.sessionStore.STORENAME + "." + label
            });
            dialog.show();
            dialog.alignToViewport("c");
        };
        
        this.add(tf);
    },

    /**
     * Adds a textfield to the section.
     * @param {String} label Label.
     * @param {String} value Default value.
     * @param {String} name Field name.
     */
    addTextField: function(label, value, name) {
        var currentObj = this;
        
        var tf = new CQ.Ext.form.TriggerField({
            "fieldLabel": label,
            "value": value,
            "name": name,
            "listeners": {
                "change": function(field, newValue, oldValue) {
                    currentObj.onPropertyChange(name, newValue, oldValue);
                },
                "destroy": function() {
                    if( this.container ) {
                        this.container.parent().remove();
                    }
                },
                "focus": function() {
                    currentObj.lastSelectedItem = tf;
                },
                "blur": function() {
                    if (currentObj.lastSelectedItem === tf) {
                        currentObj.lastSelectedItem = null;
                    }
                }
            }
        });
        
        this.add(tf);
    },

    /**
     * Adds a link to the section.
     * @param {String} text Link text.
     * @param {String} href Link href.
     */
    addLink: function(text, href) {
        if (href) {
            this.add(new CQ.Static({
                "html": "<a href=" + href + ">" + text + "</a>"
            }));
        } else {
            this.addStaticText(text);
        }
    },

    /**
     * Adds a static text to the section.
     * @param {String} text Text to add.
     */
    addStaticText: function(text) {
        if (text) {
            this.add(new CQ.Static({
                "html": text
            }));
        }
    }
});

/**
 * Textfield display mode: property is displayed with a textfield.
 * @static
 * @final
 * @type String
 */
CQ.personalization.EditableClickstreamcloud.MODE_TEXTFIELD = "textfield";

/**
 * Link display mode: property is displayed with a link.
 * @static
 * @final
 * @type String
 */
CQ.personalization.EditableClickstreamcloud.MODE_LINK = "link";

/**
 * Static display mode: property is displayed with a static text.
 * @static
 * @final
 * @type String
 */
CQ.personalization.EditableClickstreamcloud.MODE_STATIC = "static";
/*
 * ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ***********************************************************************
 */

if( CQ_Analytics.ClientContextUI ) {
    $CQ(function() {
        CQ_Analytics.ClientContextUI.addListener("render", function() {
            CQ_Analytics.ClientContextUI.ipe = new CQ.ipe.PlainTextEditor({
                "enterKeyMode": "save",
                "tabKeyMode": "save"
            });
        });

        CQ_Analytics.CCM.addListener('storeregister', function(e, sessionstore) {
            var initIPE = function(event) {
                var ipe = CQ_Analytics.ClientContextUI.ipe;
                var $t = $CQ(this);
                var $parent = $t.parent();

                var store = $t.attr("data-store");
                var property = $t.attr("data-property");
                var propertyPath = "/" + store + "/" + property;

                var stop = function() {
                    if( ipe.running ) {
                        if( !ipe.isCancelled ) {
                            ipe.finish();
                        } else {
                            CQ_Analytics.ClientContext.set(
                                ipe.editComponent.propertyPath,
                                ipe.editComponent.initialValue
                            );
                            ipe.cancel();
                        }
                        $CQ(document).unbind("click",handleDocumentClick);
                        ipe.editComponent.parent.removeClass("cq-clientcontext-editing");
                        ipe.running = false;
                        ipe.isCancelled = false;
                    }
                    delete ipe.clicked;
                };

                if( ! ipe.running ) {
                    var initialValue = CQ_Analytics.ClientContext.get(propertyPath);
                    if( typeof(initialValue) == "string" && initialValue.toLowerCase().indexOf("http") == 0) {
                        initialValue= initialValue.replace(new RegExp("&amp;","g"),"&");
                    }

                    var handleDocumentClick = function() {
                        if( !ipe.clicked || ipe.clicked != ipe.editComponent.propertyPath ) {
                            stop();
                        }
                        ipe.clicked = null;
                    };

                    var editMockup = {
                        store: store,
                        property: property,
                        propertyPath: propertyPath,
                        initialValue: initialValue,
                        parent: $parent,
                        updateParagraph: function(textPropertyName, editedContent) {
                            if( editedContent && typeof(editedContent) == "string") {
                                editedContent = editedContent.replace(new RegExp("&amp;","g"),"&");
                            }
                            CQ_Analytics.ClientContext.set(this.propertyPath, editedContent);
                        },
                        cancelInplaceEditing: function() {
                            ipe.isCancelled = true;
                            stop();
                        },
                        finishInplaceEditing: function() {
                            stop();
                        },
                        refreshSelf: function() {
                            ipe.editComponent.parent.removeClass("cq-clientcontext-editing");
                        }
                    };
                    $parent.addClass("cq-clientcontext-editing");
                    ipe.start(
                        editMockup,
                        CQ.Ext.get($t[0]),
                        editMockup.initialValue
                    );

                    $CQ(document).bind("click",handleDocumentClick);
                    //$CQ(document).bind("keyup",stop);

                    ipe.running = true;
                    ipe.clicked = null;

                    event.stopPropagation();
                } else {
                    if( ipe.editComponent.propertyPath != propertyPath ) {
                        stop();
                    } else {
                        ipe.clicked = propertyPath;
                    }
                }
            };

            sessionstore.addListener("initialpropertyrender",function(event, store, divId){
                if( $CQ("#" + divId).parents(".cq-cc-content").length > 0) {
                    $CQ("[data-store][data-property]", $CQ("#" + divId).parent()).bind("click",initIPE);
                }
            });

            sessionstore.addListener("beforerender",function(event, store, divId){
                $CQ("[data-store][data-property]", $CQ("#" + divId).parent()).unbind("click",initIPE);
            });

            sessionstore.addListener("render",function(event, store, divId){
                $CQ("[data-store][data-property]", $CQ("#" + divId).parent()).bind("click",initIPE);
            });
        });
    });
}


/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * @class CQ.personalization.ProfileLoader
 * @extends CQ.Dialog
 * ProfileLoader is a dialog providing functionalities to select, load a profile and update the
 * CQ_Analytics.ProfileDataMgr.
 * @constructor
 * Creates a new ProfileLoader.
 * @param {Object} config The config object
 */
CQ.personalization.ProfileLoader = CQ.Ext.extend(CQ.Dialog, {
    constructor: function(config) {
        config = (!config ? {} : config);

        var profileCombo = new CQ.Ext.form.ComboBox({
            "fieldLabel": CQ.I18n.getMessage("Select profile"),
            "name": "profile",
            "cls": "cq-eclickstreamcloud",
            "stateful": false,
            "typeAhead":true,
            "triggerAction":"all",
            "inputType":"text",
            "displayField":"name",
            "valueField": "id",
            "emptyText": "",
            "minChars":0,
            "editable":true,
            "lazyInit": false,
            "queryParam": "filter",
            "fieldDescription": CQ.I18n.getMessage("Select the profile you want to load."),
            "tpl" :new CQ.Ext.XTemplate(
                    '<tpl for=".">',
                    '<div class="cq-eclickstreamcloud-list">',
                    '<div class="cq-eclickstreamcloud-list-entry">{[values.name==""? values.id: CQ.shared.XSS.getXSSTablePropertyValue(values, "name")]}</div>',                    
                    '</div>',
                    '</tpl>'),
            "itemSelector" :"div.cq-eclickstreamcloud-list",
            "store": new CQ.Ext.data.Store({
                "autoLoad":false,
                "proxy": new CQ.Ext.data.HttpProxy({
                    "url": "/bin/security/authorizables.json?limit=25&hideGroups=true",
                    "method":"GET"
                }),
                "reader": new CQ.Ext.data.JsonReader({
                    "root":"authorizables",
                    "totalProperty":"results",
                    "id":"id",
                    "fields":["name", "name" + CQ.shared.XSS.KEY_SUFFIX,"id", "home"]})
            }),
            "defaultValue": ""
        });

        var currentObj = this;
        var defaults = {
            "height": 170,
            "width": 400,
            "title": CQ.I18n.getMessage("Profile Loader"),
            "items": {
                "xtype": "panel",
                items: [profileCombo]
            },
            "buttons": [
                {
                    "text": CQ.I18n.getMessage("OK"),
                    "handler":function() {
                        CQ_Analytics.ProfileDataMgr.loadProfile(profileCombo.getValue());
                        currentObj.hide();
                    }
                },
                CQ.Dialog.CANCEL
            ]
        };

        CQ.Util.applyDefaults(config, defaults);

        // init component by calling super constructor
        CQ.personalization.ProfileLoader.superclass.constructor.call(this, config);
    }
});

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
/**
 * @class CQ.personalization.OperatorSelection
 * @extends CQ.form.Selection
 * OperatorSelection is a specialized selection allowing to choose one of the CQ_Analytics.Operator.
 * @constructor
 * Creates a new OperatorSelection.
 * @param {Object} config The config object
 */
CQ.personalization.OperatorSelection = CQ.Ext.extend(CQ.form.Selection, {
    constructor: function(config) {
        config = (!config ? {} : config);

        var defaults = {};

        if (CQ_Analytics.Operator && config.operators) {
            //transform operators config to options.
            config.options = config.options ? config.options : new Array();
            config.operators = config.operators instanceof Array ? config.operators : [config.operators];
            for (var i = 0; i < config.operators.length; i++) {
                if (config.operators[i].indexOf("CQ_Analytics.Operator." == 0)) {
                    try {
                        config.operators[i] = eval("config.operators[i] = " + config.operators[i] + ";");
                    } catch(e) {
                    }
                }
                var value = config.operators[i];
                if ( value ) {
                    var text = CQ_Analytics.OperatorActions.getText(config.operators[i]);
                    text = text ? text : value;
                    config.options.push({
                        "text": CQ.I18n.getVarMessage(text),
                        "value": value
                    });
                }
            }
        }

        CQ.Util.applyDefaults(config, defaults);

        // init component by calling super constructor
        CQ.personalization.OperatorSelection.superclass.constructor.call(this, config);
    }
});

CQ.Ext.reg("operatorselection", CQ.personalization.OperatorSelection);
/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
//initialization of all the analytics objects available in edit mode
CQ.Ext.onReady(function() {
    //link clickstreamcloud editor to clickstreamcloud ui box
    if (CQ_Analytics.ClickstreamcloudUI) {
        CQ_Analytics.ClickstreamcloudUI.addListener("editclick", function() {

            if( !CQ_Analytics.ClickstreamcloudEditor ) {
                //clickstreamcloud editor itself
                CQ_Analytics.ClickstreamcloudEditor = new CQ.personalization.EditableClickstreamcloud();

                //registers the session stores
                var reg = function(mgr) {
                    if (mgr) {
                        var config = CQ_Analytics.ClickstreamcloudMgr.getEditConfig(mgr.getSessionStore().getName());
                        config["sessionStore"] = mgr.getSessionStore();
                        CQ_Analytics.ClickstreamcloudEditor.register(config);
                    }
                };

                //profile data
                reg.call(this, CQ_Analytics.ProfileDataMgr);

                //page data
                reg.call(this, CQ_Analytics.PageDataMgr);

                //tagcloud data
                reg.call(this, CQ_Analytics.TagCloudMgr);

                //surfer info data
                reg.call(this, CQ_Analytics.SurferInfoMgr);
                
                //eventinfodata
                reg.call(this, CQ_Analytics.EventDataMgr);
            }
            CQ_Analytics.ClickstreamcloudEditor.show();
        });

        CQ_Analytics.ClickstreamcloudUI.addListener("loadclick", function() {
            var dlg = new CQ.personalization.ProfileLoader({});
            dlg.show();
        });
    }
});
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

// initialize CQ.personalization package
CQ.personalization.variables = {};

/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

CQ.personalization.variables.Variables = {};

CQ.personalization.variables.Variables.SCANNED_TAGS = ["*"];

CQ.personalization.variables.Variables.applyToEditComponent = function(path) {
    CQ.Ext.onReady(function() {
        //TODO configurable prefix and suffix


        CQ.WCM.onEditableBeforeRender(path, function(config) {
            var element = config.element;
            if( element ) {
                CQ.personalization.variables.Variables.injectSpans(element, CQ.personalization.variables.Variables.SCANNED_TAGS, "cq-variable-code");
                if (CQ_Analytics && CQ_Analytics.ProfileDataMgr) {
                    CQ.personalization.variables.Variables.updateVariables(element, CQ_Analytics.ProfileDataMgr.getData());
                    CQ_Analytics.ProfileDataMgr.addListener("update", function() {
                        CQ.personalization.variables.Variables.updateVariables(element, CQ_Analytics.ProfileDataMgr.getData());
                    });
                }
            }
        });

        CQ.WCM.onEditableReady(path, function() {
            this.on(CQ.wcm.EditBase.EVENT_AFTER_EDIT,function() {
                CQ.personalization.variables.Variables.injectSpans(this.element, CQ.personalization.variables.Variables.SCANNED_TAGS, "cq-variable-code");
                CQ.personalization.variables.Variables.updateVariables(this.element, CQ_Analytics.ProfileDataMgr.getData());
            });
        });
    });
};

CQ.personalization.variables.Variables.injectSpans = function(element, tags, className) {
    element = CQ.Ext.get(element);
    if( element ) {
        className = className || "";
        for (var t = 0; t < tags.length; t++) {
            var reg = new RegExp("\\\$\\{[\\w]*\\}", "ig");
            var pars = CQ.Ext.DomQuery.jsSelect(tags[t] + ":contains(\${)", element.dom);
            for( var i=0;i<pars.length;i++) {
                var p = pars[i];
                //check if matches ...\${}...
                var text = p.innerHTML;
                if (text) {
                    var variables = text.match(reg);
                    var performedVariables = [];
                    for(var j = 0; j < variables.length; j++) {
                        var v = variables[j];
                        if( performedVariables.indexOf(v) == -1) {
                            //vName is variable name (no "\${" and "}")
                            var vName = v.replace(new RegExp("\\\$\\{([\\w]*)\\}", "ig"),"$1");
                            var repl = "<span class=\"cq-variable " + className + " cq-variable-vars-"+vName+"\" title=\""+v+"\">"+v+"</span>";
                            text = text.replace(new RegExp("\\\$\\{"+vName+"\\}", "ig"),repl);
                            performedVariables.push(v);
                        }
                    }
                    p.innerHTML = text;
                }
            }
        }
    }
};

CQ.personalization.variables.Variables.updateVariables = function(element, data) {
    element = CQ.Ext.get(element);
    if( element ) {
        var pars = CQ.Ext.DomQuery.jsSelect("span.cq-variable", element.dom);
        data = data || {};

        for( var i=0;i<pars.length;i++) {
            var p = pars[i];
            var className = p ? p.className : "";
            var reg = new RegExp(".+cq-variable-vars-(\\w+)\\s*(\\w*)", "ig");
            var variable = className.replace(reg, "$1");
            if(variable) {
                var text = p.innerHTML;
                if( text && text != "" && text != " ") {
                    var value = data[variable];
                    value = value && value != "" ? value : "\${"+variable+"}";
                    p.innerHTML = value;
                }
            } else {
                p.innerHTML = "";
            }
        }
    }
};

/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * @class CQ.form.rte.plugins.InsertVariablePlugin
 * @extends CQ.form.rte.plugins.Plugin
 * <p>This class implements styling text fragments with a CSS class (using "span" tags) as a
 * plugin.</p>
 * <p>The plugin ID is "<b>variables</b>".</p>
 * <p><b>Features</b></p>
 * <ul>
 *   <li><b>variables</b> - adds a style selector (variables will be applied on selection scope)
 *     </li>
 * </ul>
 * <p><b>Additional config requirements</b></p>
 * <p>The following plugin-specific settings must be configured through the corresponding
 * {@link CQ.form.rte.EditorKernel} instance:</p>
 * <ul>
 *   <li>The variablesheets to be used must be provided through
 *     {@link CQ.form.RichText#externalStyleSheets}.</li>
 * </ul>
 */
CQ.form.rte.plugins.InsertVariablePlugin = CQ.Ext.extend(CQ.form.rte.plugins.Plugin, {

    /**
     * @cfg {Object/Object[]} variables
     * <p>Defines CSS classes that are available to the user for formatting text fragments
     * (defaults to { }). There are two ways of specifying the CSS classes:</p>
     * <ol>
     *   <li>Providing variables as an Object: Use the CSS class name as property name.
     *   Specify the text that should appear in the style selector as property value
     *   (String).</li>
     *   <li>Providing variables as an Object[]: Each element has to provide "cssName" (the
     *   CSS class name) and "text" (the text that appears in the style selector)
     *   properties.</li>
     * </ol>
     * <p>Styling is applied by adding "span" elements with corresponding "class"
     * attributes appropriately.</p>
     * @since 5.3
     */

    /**
     * @private
     */
    cachedVariables: null,

    /**
     * @private
     */
    variablesUI: null,

    constructor: function(editorKernel) {
        CQ.form.rte.plugins.InsertVariablePlugin.superclass.constructor.call(this, editorKernel);
    },

    getFeatures: function() {
        return [ "variables" ];
    },

    getVariables: function() {
        var com = CQ.form.rte.Common;
        if (!this.cachedVariables) {
            this.cachedVariables = this.config.variables || { };
            com.removeJcrData(this.cachedVariables);
        }
        return this.cachedVariables;
    },

    initializeUI: function(tbGenerator) {
        var plg = CQ.form.rte.plugins;
        var ui = CQ.form.rte.ui;
        if (this.isFeatureEnabled("insertvariable")) {
            this.variablesUI = new ui.TbVariableSelector("insertvariable", this, null, this.getVariables());
            tbGenerator.addElement("insertvariable", plg.Plugin.SORT_STYLES, this.variablesUI, 10);
        }
    },

    notifyPluginConfig: function(pluginConfig) {
        pluginConfig = pluginConfig || { };
        CQ.Util.applyDefaults(pluginConfig, {
            "variables": {
                // empty default value
            }
        });
        this.config = pluginConfig;
    },

    execute: function(cmdId) {
        if (!this.variablesUI) {
            return;
        }
        var cmd = null;
        var value = null;
        switch (cmdId.toLowerCase()) {
            case "insertvariable_insert":
                cmd = "inserthtml";
                value = this.variablesUI.getSelectedVariable();
                break;
        }
        if (cmd && value) {
            var vt = "${"+value+"}";
            //var html = "<span class=\"cq-variable cq-variable-code cq-variable-vars-"+value+"\" title=\""+vt+"\">"+vt+"</span>&nbsp;";
            this.editorKernel.relayCmd(cmd, vt);
        }
    }
});

// register plugin
CQ.form.rte.plugins.PluginRegistry.register("insertvariable", CQ.form.rte.plugins.InsertVariablePlugin);
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * @class CQ.form.rte.ui.TbVariableSelector
 * @extends CQ.form.rte.ui.TbElement
 * @private
 * This class represents a variable selecting element for use in
 * {@link CQ.form.rte.ui.ToolbarBuilder}.
 */
CQ.form.rte.ui.TbVariableSelector = CQ.Ext.extend(CQ.form.rte.ui.TbElement, {

    variableSelector: null,

    variables: null,

    toolbar: null,

    constructor: function(id, plugin, tooltip, variables) {
        CQ.form.rte.ui.TbVariableSelector.superclass.constructor.call(this, id, plugin, false,
                tooltip);
        this.variables = variables;
    },

    /**
     * Creates HTML code for rendering the options of the variable selector.
     * @return {String} HTML code containing the options of the variable selector
     * @private
     */
    createStyleOptions: function() {
        var htmlCode = "";
        if (this.variables) {
            for (var v in this.variables) {
                var variableToAdd = this.variables[v];
                htmlCode += "<option value=\"" + variableToAdd.value + "\">" + CQ.I18n.getVarMessage(variableToAdd.text) + "</option>";
            }
        }
        return htmlCode;
    },

    getToolbar: function() {
        return CQ.form.rte.ui.ToolbarBuilder.STYLE_TOOLBAR;
    },

    addToToolbar: function(toolbar) {
        this.toolbar = toolbar;
        if (CQ.Ext.isIE) {
            // the regular way doesn't work for IE anymore with Ext 3.1.1, hence working
            // around
            var helperDom = document.createElement("span");
            helperDom.innerHTML = "<select class=\"x-font-select\">"
                    + this.createStyleOptions() + "</span>";
            this.variableSelector = CQ.Ext.get(helperDom.childNodes[0]);
        } else {
            this.variableSelector = CQ.Ext.get(CQ.Ext.DomHelper.createDom({
                tag: "select",
                cls: "x-font-select",
                html: this.createStyleOptions()
            }));
        }
        this.variableSelector.on('focus', function() {
            this.plugin.editorKernel.isTemporaryBlur = true;
        }, this);
        // fix for a Firefox problem that adjusts the combobox' height to the height
        // of the largest entry
        this.variableSelector.setHeight(19);
        var addButton = {
            "itemId": this.id + "_insert",
            "iconCls": "x-edit-insertvariable",
            "text": CQ.I18n.getMessage("Insert"),
            "enableToggle": (this.toggle !== false),
            "scope": this,
            "handler": function() {
                this.plugin.execute(this.id + "_insert");
            },
            "clickEvent": "mousedown",
            "tabIndex": -1
        };
        toolbar.add(
            CQ.I18n.getMessage("Variable"),
            " ",
            this.variableSelector.dom,
            addButton
        );
    },

    createToolbarDef: function() {
        // todo support usage in global toolbar
        return null;
    },

    getSelectedVariable: function() {
        var variable = this.variableSelector.dom.value;
        if (variable.length > 0) {
            return variable;
        }
        return null;
    },

    getExtUI: function() {
        return this.variableSelector;
    },

    getInsertButtonUI: function() {
        return this.toolbar.items.map[this.id + "_insert"];
    }

});
