CQ.Ext.namespace("CQ.searchpromote");

CQ.searchpromote.FacetList = CQ.Ext.extend(CQ.Ext.form.ComboBox, {
    constructor: function(config) {
        CQ.Util.applyDefaults(config, {
            triggerAction: "all",
            mode: "local",
            autoLoad: false,
            displayField: "label",
            valueField: "name",
            store: new CQ.Ext.data.JsonStore({
                fields: ["name", "label"],
                root: "facets",
                id: "name",
                //just some dummy to have the http proxy constructed. the url will be replaced on loadcontent
                url: "localhost" 
            }),
            listeners: {
                "loadcontent": function(field, record, path) {
                    field.store.proxy.setUrl( path + ".facetlist.json");
                    field.store.load();
                }
            }
        });
        CQ.searchpromote.FacetList.superclass.constructor.call(this, config);
    }
});

CQ.Ext.reg("searchpromote-facetlist", CQ.searchpromote.FacetList);
CQ.Ext.namespace("CQ.searchpromote");

CQ.searchpromote.SearchPromote = {
    
    /**
     * Shows a progress bar dialog.
     * 
     * @param dialog Parent dialog to attach the progress bar to.
     * @param isShown Indicator if progress dialog is shown or not.
     */
    showButtonIndicator: function(dialog, isShown) {
        var btn = dialog.find("localName", "connectButton")[0];
        if(this.labelBtn == null) {
            this.labelBtn = btn.getText();
        }
        if(!isShown) {
            CQ.Ext.Msg.wait(CQ.I18n.getMessage("Connection successful")).hide();
        }else{
            CQ.Ext.Msg.wait(CQ.I18n.getMessage("Connecting to Search&Promote..."));
        }
    },
    
    /**
     * Gets a field with the provided key from a panel.
     * 
     * @param panel Panel which holds the field.
     * @param key Field name
     */
    getField: function(panel, key) {
        var items = panel.find("name", "./" + key);
        if( (CQ.Ext.isArray(items)) && (items.length > 0) )
            return items[0];
    },
    
    /**
     * Fetches search form XML from a remote location and stores it in a hidden
     * text area for later persisting.
     * 
     * @param dialog
     */
    connect: function(dialog) {
        var memberid = this.getField(dialog, 'memberid');
        var accountno = this.getField(dialog, 'accountno');
        var that = this;
        
        this.showButtonIndicator(dialog, true);
        
        function fieldEmpty(field, msg) {
            if (!field || field.getValue() == "") {
                that.showButtonIndicator(dialog, false);
                CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"), msg);
                return true;
            }
            return false;
        }
        
        if (fieldEmpty(memberid, CQ.I18n.getMessage("Please enter the member id.")) ||
            fieldEmpty(accountno, CQ.I18n.getMessage("Please enter the account no."))) {
            return;
        }
    
        CQ.HTTP.post(CQ.HTTP.externalize("/libs/cq/searchpromote/searchform"),
            function(options, success, response) {
        		that.showButtonIndicator(dialog, false);
        		if(success) {
                    var formxml = CQ.HTTP.eval(response);
                    if(formxml && formxml.xml) {
                        var formxmlField = that.getField(dialog, "searchformxml");
                        formxmlField.setValue(formxml.xml);
                        dialog.find("localName", "connectButton")[0].setText(CQ.I18n.getMessage('Re-Connect to Search&Promote'));
                        CQ.Ext.Msg.show({ 
                                title: CQ.I18n.getMessage("Success"), 
                                msg: CQ.I18n.getMessage("Connection successful"), 
                                buttons: CQ.Ext.Msg.OK, 
                                icon: CQ.Ext.Msg.INFO});
                        CQ.cloudservices.getEditOk().enable();
                    }else if(formxml && formxml.error){
                        var cause = formxml.error;
                        if (formxml.error.indexOf("Credentials") > -1) {
                            cause = "Login to Search&Promote failed";
                        }
                        CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"), CQ.I18n.getVarMessage(cause));
                    }
                }else {
                    CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"),CQ.I18n.getMessage("Connection to Search&Promote could not be established."));
                }               
            },
            {
                "memberid": memberid.getValue(),
                "accountno": accountno.getValue()
            }, this, true
        );
    }

};
