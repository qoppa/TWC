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

// initialize CQ.security package
CQ.security = {};

CQ.security.utils = {};  // currently only 5.3 stuff in widgets/security/utils
CQ.security.data = {};   // currently only 5.3 stuff in widgets/security/data
CQ.security.search = {};

// initialize CQ.security.themes package
CQ.security.themes = {};

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
 * A helper class providing a basic set of utilities.
 * @class CQ.security.search.Query
 * @extends CQ.Ext.util.Observable
 * @since 5.4
 */
CQ.security.search.Query = CQ.Ext.extend(CQ.Ext.util.Observable, {


    /**
     * @cfg {String} selector
     * The selector determines which type of authorizables should be returned.
     * Possible values are "user", "group" and "authorizable". If null all
     * user and groups are returned (same as "authorizalbe"). Defaults to null.
     */
    selector: null,

    /**
     * @cfg {String} category
     * The category determines which category of authorizables should be returned.
     * Possible values are "mcm" for marketing campaign leads and lists and "" for
     * all users and groups. If null all user and groups are returned. Defaults to null.
     */
    category: null,

    /**
     * @cfg {Number} offset
     * The offset for the results (defaults to 0).
     */
    offset: 0,

    /**
     * @cfg {Number} max
     * The number of resutls to return (defaults to 10).
     */
    max: 10,

    /**
     * @cfg {Number} totalMax
     * The maximum total of results to return (defaults to 2000).
     */
    totalMax: 2000,

    /**
     * @cfg {String} sortDir
     * The sorting direction, either "asc" or "desc". If null the direction is
     * ascending (defaults to null).
     */
    sortDir: null,

    /**
     * @cfg {String} sort
     * The name of the property to sort by (defaults to "@rep:principalName").
     */
    sortBy: "@rep:principalName",

    /**
     * @cfg {String} term
     * A search term. Multiple words will be combined by "AND". Defaults to "".
     */
    term: "",

    /**
     * @cfg {String[]} propertiesToSearch
     * The name of the properties where {@link #term} will be applied to. Samples:
     * "profile" (search in all profile properties), "profile/@givenName" (search
     * in a specific profile property), "named" (search in user id's).
     * Defaults to ["profile", "named"].
     */
    propertiesToSearch: [
        "profile",
        "named"
    ],

    constructor : function(config){
        config = config || {};
        for (var c in config) {
            this[c] = config[c];           
        }
        CQ.security.search.Query.superclass.constructor.call(this);
    },

    /**
     * Builds and returns the query object with the currently set parameters.
     * @type Object
     */
    getObject: function() {
        var q = {};

        if (this.scope) q.scope = this.scope;
        else if (this.group) {
            // tmp workaround / remove totalMax when fixed
            this.totalMax = 6000;
            q.scope = {
                "groupName": this.group
            };
        }

        if (this.selector) q.selector = this.selector;

        if (this.sort) {
            q.sort = this.sort;
        }
        else {
            if (this.sortBy) {
                q.sort = {
                    "property": this.sortBy
                };
            }
            if (this.sortDir) {
                q.sort = q.sort || {};
                q.sort.direction = this.sortDir;
            }
        }

        var condition = [];
        if (this.category) {
            condition.push([{
                "eq": {
                    "property": "cq:authorizableCategory",
                    "value": "mcm"
                }
            }]);
        }

        if (this.term) {
            // "AND" terms: "ivan francisco" >> ivan AND francisco
            var f = this.term.split(" ");
            for (var i = 0; i < f.length; i++) {
                var c = [];
                for (var j = 0; j < this.propertiesToSearch.length; j++) {
                    if (this.propertiesToSearch[j] == "named") {
                        c.push({
                            "named": "%"+f[i]+"%"
                        });
                    }
                    else {
                        c.push({
                            "contains": {
                                "property": this.propertiesToSearch[j],
                                "expression": "*"+f[i]+"*"
                                }
                        });
                    }
                }
                condition.push(c);
            }
        }

        if (condition.length > 0) {
            q.condition = condition;
        }

        q.limit = {
            "offset": 0,
            "max": this.totalMax
        };

        return q;
    },

    /**
     * Builds and returns the query string with the currently set parameters.
     * @type String
     */
    getString: function() {
        var q = this.getObject();
        var qStr = CQ.Ext.util.JSON.encode(q);
        return qStr;
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

/**
 * @class CQ.security.SecurityAdmin
 * @extends CQ.Ext.Viewport
 * @since 5.4
 * The Security Admin is a console providing capabilities to administrate users and groups.
 * @constructor
 * Creates a new Security Admin.
 * @param {Object} config The config object
 */
CQ.security.SecurityAdmin = CQ.Ext.extend(CQ.Ext.Viewport, {

    /**
     * @cfg {String} createUserDialogPasswordLength
     * The length of the auto created, random password (defaults to 12).
     */
    createUserDialogPasswordLength: 12,

    /**
     * @cfg {String} createUserDialogPath
     * The path of the create user dialog (defaults to '/libs/cq/security/content/tools/createuserdialog').
     */
    createUserDialogPath: "/libs/cq/security/content/tools/createuserdialog",

    /**
     * @cfg {String} createGroupDialogPath
     * The path of the create group dialog (defaults to '/libs/cq/security/content/tools/creategroupdialog').
     */
    createGroupDialogPath: "/libs/cq/security/content/tools/creategroupdialog",

    /**
     * @cfg {String} editUserDialogPath
     * The path of the edit user dialog (defaults to '/libs/cq/security/content/tools/edituserdialog').
     */
    editUserDialogPath: "/libs/cq/security/content/tools/edituserdialog",

    /**
     * @cfg {String} editGroupDialogPath
     * The path of the edit group dialog (defaults to '/libs/cq/security/content/tools/editgroupdialog').
     */
    editGroupDialogPath: "/libs/cq/security/content/tools/editgroupdialog",

    /**
     * @cfg {String} importCSVDialogPath
     * The path of the dialog to import a CSV (defaults to '/libs/cq/security/content/tools/importcsvdialog').
     */
    importCSVDialogPath: "/libs/cq/security/content/tools/importcsvdialog",

    /**
     * @cfg {String} membersDialogPath
     * The path of the dialog to display the members of a group (defaults to '/libs/cq/security/content/tools/membersdialog').
     */
    membersDialogPath: "/libs/cq/security/content/tools/membersdialog",

    /**
     * @cfg {CQ.Ext.Panel} deck
     */
    deck: null,

    /**
     * //todo: docu (property, not cfg)
     * @cfg {CQ.security.SecurityGridPanel} usersGrid
     */
    usersGrid: null,

    /**
     * @cfg {CQ.security.SecurityGridPanel} groupsGrid
     */
    groupsGrid: null,

    // @private
    navButtons: [],

    /**
     * Reloads the users grid.
     */
    reloadUsersGrid: function() {
        try {
            this.usersGrid.getStore().reload();
        }
        catch (e) {
            // probably usersGridId is undefined
            CQ.Log.debug("CQ.security.SecurityAdmin#reloadUsersGrid: " + e.message);
        }
    },

    /**
     * Reloads the groups grid.
     */
    reloadGroupsGrid: function() {
        try {
            this.groupsGrid.getStore().reload();
        }
        catch (e) {
            // probably groupsGridId is undefined
            CQ.Log.debug("CQ.security.SecurityAdmin#reloadGroupsGrid: " + e.message);
        }
    },

    // private
    getMsg: function(msg, snippets) {
        switch(msg) {
            // add to group
            case this.ADD_TO_GROUP_TITLE:            return CQ.I18n.getMessage("Add to Group");
            case this.ADD_THE_FOLLOWING_USER:        return CQ.I18n.getMessage("Add the following user ...");
            case this.ADD_THE_FOLLOWING_X_USERS:     return CQ.I18n.getMessage("Add the following {0} users ...", snippets);
            case this.ADD_THE_FOLLOWING_GROUP:       return CQ.I18n.getMessage("Add the following group ...");
            case this.ADD_THE_FOLLOWING_X_GROUPS:    return CQ.I18n.getMessage("Add the following {0} groups ...", snippets);
            case this.TO_THE_FOLLOWING_GROUP:        return CQ.I18n.getMessage("... to the following group:", [], "Add user X to the following groups");
            case this.MERGE_THE_FOLLOWING_GROUP:     return CQ.I18n.getMessage("Merge the following group ...", [], "marketing terminology");
            case this.WITH_GROUP:                    return CQ.I18n.getMessage("... with group {0}", snippets, "Merge group X with group Y");

            // quick views
            case this.X_NOT_MEMBER_OF_ANY:           return CQ.I18n.getMessage("{0} is not member of any group.", snippets);
            case this.X_IS_MEMBER_OF:                return CQ.I18n.getMessage("{0} is member of the following group:", snippets);
            case this.X_IS_MEMBER_OF_Y_GROUPS:       return CQ.I18n.getMessage("{0} is member of the following {1} groups:", snippets);

            case this.GROUP_X_NOT_MEMBER_OF_ANY:     return CQ.I18n.getMessage("The group {0} is not member of any other group.", snippets);
            case this.GROUP_X_IS_MEMBER_OF:          return CQ.I18n.getMessage("The group {0} is member of the following group:", snippets);
            case this.GROUP_X_IS_MEMBER_OF_Y_GROUPS: return CQ.I18n.getMessage("The group {0} is member of the following {1} groups:", snippets);

            case this.REMOVE_MEMBERSHIP_TITLE:       return CQ.I18n.getMessage("Remove Group Membership");
            case this.REMOVE_USER_FROM_GROUP:        return CQ.I18n.getMessage("Are you sure to remove user {0} from group {1}?", snippets);
            case this.REMOVE_GROUP_FROM_GROUP:       return CQ.I18n.getMessage("Are you sure to remove group {0} from group {1}?", snippets);

            // actions
            case this.DELETE_USERS_TITLE:            return CQ.I18n.getMessage("Delete Users");
            case this.DELETE_USER:                   return CQ.I18n.getMessage("You are going to delete the following user:");
            case this.DELETE_USERS:                  return CQ.I18n.getMessage("You are going to delete the following users:");

            case this.DELETE_GROUPS_TITLE:           return CQ.I18n.getMessage("Delete Groups");
            case this.DELETE_GROUP:                  return CQ.I18n.getMessage("You are going to delete the following group:");
            case this.DELETE_GROUPS:                 return CQ.I18n.getMessage("You are going to delete the following groups:");

            case this.ACTIVATE_USERS_TITLE:          return CQ.I18n.getMessage("Activate Users");
            case this.ACTIVATE_USER:                 return CQ.I18n.getMessage("You are going to activate the following user:");
            case this.ACTIVATE_USERS:                return CQ.I18n.getMessage("You are going to activate the following users:");

            case this.ACTIVATE_GROUPS_TITLE:         return CQ.I18n.getMessage("Activate Groups");
            case this.ACTIVATE_GROUP:                return CQ.I18n.getMessage("You are going to activate the following group:");
            case this.ACTIVATE_GROUPS:               return CQ.I18n.getMessage("You are going to activate the following groups:");

            case this.DEACTIVATE_USERS_TITLE:        return CQ.I18n.getMessage("Deactivate Users");
            case this.DEACTIVATE_USER:               return CQ.I18n.getMessage("You are going to deactivate the following user:");
            case this.DEACTIVATE_USERS:              return CQ.I18n.getMessage("You are going to deactivate the following users:");

            case this.DEACTIVATE_GROUPS_TITLE:       return CQ.I18n.getMessage("Deactivate Groups");
            case this.DEACTIVATE_GROUP:              return CQ.I18n.getMessage("You are going to deactivate the following group:");
            case this.DEACTIVATE_GROUPS:             return CQ.I18n.getMessage("You are going to deactivate the following groups:");

            case this.MEMBERS_TITLE:                 return CQ.I18n.getMessage("Members of Group {0}", snippets);
            case this.REMOVE_MEMBER:                 return CQ.I18n.getMessage("You are going to remove the following member from {0}", snippets);
            case this.REMOVE_MEMBERS:                return CQ.I18n.getMessage("You are going to remove the following members from {0}", snippets);

            case this.FAILED_TO_CREATE_USER:         return CQ.I18n.getMessage("Failed to create user");
            case this.FAILED_TO_CREATE_GROUP:        return CQ.I18n.getMessage("Failed to create group");
            case this.EMAIL_OR_ID_MISSING:			 return CQ.I18n.getMessage("Either Mail or ID should be specified while creation.");

            default: return "";
        }
    },

    constructor: function(config) {
        var body = CQ.Ext.getBody();
        body.setStyle("margin", "0");
        if (CQ.Ext.isIE) {
            body.dom.scroll = "no";
        }
        else {
            body.setStyle("overflow", "hidden");
        }

        var admin = this;

        config = CQ.Util.applyDefaults(config, {
            "id": "cq-security"
        });

        this.id = config.id;
        window.CQ_SecurityAdmin = this;

        var items = [];
        var navItems = [];
        var counter = 0;
        var activeItem = config.deck.activeItem ? config.deck.activeItem : 0;
        for (var i = 0; i < config.items.length; i++) {
            if (config.items[i].xtype == "static") {
                // statics go to navigation
                if (config.items[i].text == "-") {
                    // static with text "-" will render a separation line
                    navItems.push(new CQ.Static({
                        "cls": "cq-security-nav-line",
                        "html": "&nbsp;"
                    }));
                }
                else {
                    // todo: default cls for static
                    navItems.push(config.items[i]);
                }
                continue;
            }
            else if (config.items[i].xtype == "textbutton") {
                // text buttons go to the navigation, e.g. links to other pages
                navItems.push(config.items[i]);
                continue;
            }
            try {
                // else a panel is put to the deck panel and a nav link is created using
                // the title of the item
                var title = config.items[i].title ? config.items[i].title : "";
                delete config.items[i].title;
                var widget = CQ.Util.build(config.items[i]);
                items.push(widget);
                var item = new CQ.TextButton({
                    "text": title,
                    "pressed": counter == activeItem,
                    "toggleGroup": "cq-security-nav",
                    "scope": widget,
                    "handler": function() {
                        admin.deck.layout.setActiveItem(this);
                    }
                });
                if (config.items[i].id) {
                    this.navButtons[config.items[i].id] = item;
                }
                navItems.push(item);
                counter++;
            }
            catch (e) {}
        }
        delete config.items;

        this.deck =  CQ.Util.build(CQ.Util.applyDefaults(config.deck, {
            "xtype": "panel",
            "layout": "card",
            "layoutConfig": {
                "layoutOnCardChange": true
            },
            "id": this.id + "-deck",
            "activeItem": 0,
            "region": "center",
            "border": false,
            "items": items
        }));
        delete config.deck;

        config = CQ.Util.applyDefaults(config, {
            "id": this.id,
            "layout": "border",
            "renderTo": CQ.Util.ROOT_ID,
            "items": [
                {
                    "id": "cq-header",
                    "xtype": "container",
                    "cls": this.id + "-header",
                    "autoEl": "div",
                    "region": "north",
                    "items": {
                        "xtype": "panel",
                        "border": false,
                        "layout": "column",
                        "cls": "cq-header-toolbar",
                        "items": [
                            new CQ.Switcher({}),
                            new CQ.UserInfo({}),
                            new CQ.HomeLink({})
                        ]
                    }
                },
                // todo: read from config (security/mcm)
                {
                    "id": this.id + "-nav",
                    "cls": "cq-security-nav",
                    "xtype": "panel",
                    "region": "west",
                    "width": CQ.security.themes.SecurityAdmin.NAV_WIDTH,
                    "layout": "border",
                    "border": false,
                    "items": {
                        "xtype": "panel",
                        "region": "center",
                        "margins": CQ.security.themes.SecurityAdmin.NAV_MARGINS,
                        "items": navItems
                    }
                },
                this.deck
            ]
        });

        // init component by calling super constructor
        CQ.security.SecurityAdmin.superclass.constructor.call(this, config);
    },

    initComponent: function() {
        this.usersGrid = CQ.Ext.getCmp("usersGrid");
        this.usersPanel = CQ.Ext.getCmp("usersPanel");
        this.groupsGrid =  CQ.Ext.getCmp("groupsGrid");
        this.groupsPanel = CQ.Ext.getCmp("groupsPanel");
        this.dashboard = CQ.Ext.getCmp("dashboard");
        CQ.security.SecurityAdmin.superclass.initComponent.call(this);
    },


    /**
     * Masks the main panel for loading.
     */
    mask: function() {
        if (!this.loadMask) {
            this.loadMask = new CQ.Ext.LoadMask(this.id + "-deck", {
                "msg": CQ.I18n.getMessage("Loading...")
            });
        }
        this.loadMask.show();
    },

    /**
     * Unmasks the main panel after loading.
     */
    unmask: function() {
        if (!this.loadMask) return;
        this.loadMask.hide();
    },


    // show details of a user
    showUserQuickView: function() {
        try {
            this.usersPanel.showQuickView();
        }
        catch (e) {
            // probably no usersPanel existing
        }
    },

    // refresh details of a user
    refreshUserQuickView: function() {
        try {
            this.usersPanel.refreshQuickView();
        }
        catch (e) {
            // probably no usersPanel existing
        }
    },

    // show details of a group
    showGroupQuickView: function() {
        try {
            this.groupsPanel.showQuickView();
        }
        catch (e) {
            // probably no groupsPanel existing
        }
    },

    // refresh details of a group
    refreshGroupQuickView: function() {
        try {
            this.groupsPanel.refreshQuickView();
        }
        catch (e) {
            // probably no groupsPanel existing
        }
    },

    // add to group / merge groups
    ADD_TO_GROUP_TITLE: 200,
    ADD_THE_FOLLOWING_USER: 201,
    ADD_THE_FOLLOWING_X_USERS: 202,
    ADD_THE_FOLLOWING_GROUP: 203,
    ADD_THE_FOLLOWING_X_GROUPS: 204,
    TO_THE_FOLLOWING_GROUP: 205,
    MERGE_THE_FOLLOWING_GROUP: 206,
    WITH_GROUP: 207,

    // quick views
    X_NOT_MEMBER_OF_ANY: 300,
    X_IS_MEMBER_OF: 301,
    X_IS_MEMBER_OF_Y_GROUPS: 302,

    GROUP_X_NOT_MEMBER_OF_ANY: 320,
    GROUP_X_IS_MEMBER_OF: 321,
    GROUP_X_IS_MEMBER_OF_Y_GROUPS: 322,

    REMOVE_MEMBERSHIP_TITLE: 330,
    REMOVE_USER_FROM_GROUP: 331,
    REMOVE_GROUP_FROM_GROUP: 332,

    // actions
    DELETE_USERS_TITLE: 1000,
    DELETE_USER: 1001,
    DELETE_USERS: 1002,

    DELETE_GROUPS_TITLE: 1100,
    DELETE_GROUP: 1101,
    DELETE_GROUPS: 1102,

    ACTIVATE_USERS_TITLE: 1200,
    ACTIVATE_USER: 1201,
    ACTIVATE_USERS: 1202,

    ACTIVATE_GROUPS_TITLE: 1300,
    ACTIVATE_GROUP: 1301,
    ACTIVATE_GROUPS: 1302,

    DEACTIVATE_USERS_TITLE: 1400,
    DEACTIVATE_USER: 1401,
    DEACTIVATE_USERS: 1402,

    DEACTIVATE_GROUPS_TITLE: 1500,
    DEACTIVATE_GROUP: 1501,
    DEACTIVATE_GROUPS: 1502,

    // show members
    MEMBERS_TITLE: 1600,
    REMOVE_MEMBER: 1601,
    REMOVE_MEMBERS: 1602,

    FAILED_TO_CREATE_USER: 1700,
    FAILED_TO_CREATE_GROUP: 1701,
    EMAIL_OR_ID_MISSING: 1702
    

});

CQ.Ext.reg("securityadmin", CQ.security.SecurityAdmin);



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
 * Returns if the users grid has any selection.
 * @return {Boolean} true if at least one item is selected, false otherwise
 */
CQ.security.SecurityAdmin.hasUsersSelection = function() {
    try {
        return window.CQ_SecurityAdmin.usersGrid.getSelectionModel().getSelections().length > 0;
    }
    catch (e) {
        // usersGrid not yet defined
        return false;
    }
};

/**
 * Returns if the groups grid has any selection.
 * @return {Boolean} true if at least one item is selected, false otherwise
 */
CQ.security.SecurityAdmin.hasGroupsSelection = function() {
    try {
        return window.CQ_SecurityAdmin.groupsGrid.getSelectionModel().getSelections().length > 0;
    }
    catch (e) {
        // groupsGrid not yet defined
        return false;
    }
};

/**
 * Returns if the users grid has a single selection.
 * @return {Boolean} true if exactly one item is selected, false otherwise
 */
CQ.security.SecurityAdmin.hasSingleUserSelection = function() {
    try {
        return window.CQ_SecurityAdmin.usersGrid.getSelectionModel().getSelections().length == 1;
    }
    catch (e) {
        // usersGrid not yet defined
        return false;
    }
};

/**
 * Returns if the groups grid has a single selection.
 * @return {Boolean} true if exactly one item is selected, false otherwise
 */
CQ.security.SecurityAdmin.hasSingleGroupSelection = function() {
    try {
        return window.CQ_SecurityAdmin.groupsGrid.getSelectionModel().getSelections().length == 1;
    }
    catch (e) {
        // groupsGrid not yet defined
        return false;
    }
};

/**
 * Returns if the members grid has any selection (Members Dialog).
 * @return {Boolean} true if at least one item is selected, false otherwise
 */
CQ.security.SecurityAdmin.hasMembersSelection = function() {
    try {
        return window.CQ_SecurityAdmin.membersGrid.getSelectionModel().getSelections().length > 0;
    }
    catch (e) {
        // membersGrid not yet defined
        return false;
    }
};

/**
 * Returns the path of the action target of the users grid.
 * @return {String} The path or null
 */
CQ.security.SecurityAdmin.getUsersTarget = function() {
    try {
        var sel = window.CQ_SecurityAdmin.usersGrid.getSelectionModel().getSelections();
        if (sel.length == 0) return null;
        return sel[0].id;
    }
    catch (e) {
        // usersGrid not yet defined
        return null;
    }
};

/**
 * Returns the path of the action target of the groups grid.
 * @return {String} The path or null
 */
CQ.security.SecurityAdmin.getGroupsTarget = function() {
    try {
        var sel = window.CQ_SecurityAdmin.groupsGrid.getSelectionModel().getSelections();
        if (sel.length == 0) return null;
        return sel[0].id;
    }
    catch (e) {
        // groupsGrid not yet defined
        return null;
    }
};

/**
 * Saves the create user dialog.
 * @param {CQ.Dialog} dialog
 * @param {CQ.Ext.Button} button
 * @param {Function} success (optional) The function to call after the user
 *                           has been created successfully.
 */
CQ.security.SecurityAdmin.saveUser = function(dialog, button, success) {
    var admin = window.CQ_SecurityAdmin;
    try {
        // if id is empty create from email
        var idField = dialog.getField("rep:userId");
        var emailField = dialog.getField("email");

        if(emailField.getValue().trim() == "" && (!idField || idField.getValue().trim() == "")) {
            CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"), admin.getMsg(admin.EMAIL_OR_ID_MISSING));
            admin.unmask();
            return;
        }
        
        
        var id = CQ.Ext.form.VTypes.makeAuthorizableId(emailField.getValue().trim());
        if (!idField) {
            dialog.addHidden({"rep:userId": id}, false);
        }
        else if (idField.getValue().trim() == "") {
            idField.setValue(id);
        }
    }
    catch(e) {}

    dialog.ok(button, function() {
            admin.reloadUsersGrid();
            admin.showUserQuickView();
            admin.unmask();
            if (success) success();
        }, function(dlg, xhr) {
            var txt = admin.getMsg(admin.FAILED_TO_CREATE_USER);
            try {
                txt += ":<br><br>" + CQ.HTTP.buildPostResponseFromHTML(xhr.response.responseText).headers[CQ.HTTP.HEADER_MESSAGE];
            }
            catch(e){}
            CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"), txt);
            admin.unmask();
        }
    );
};

/**
 * Saves the create user dialog and re-opens the dialog.
 * @param {CQ.Dialog} dialog
 * @param {CQ.Ext.Button} button
 */
CQ.security.SecurityAdmin.saveAndCreateUser = function(dialog, button) {
    CQ.security.SecurityAdmin.saveUser(dialog, button, CQ.security.SecurityAdmin.createUser);
};

/**
 * Saves the create user dialog and opens the details of the created user.
 * @param {CQ.Dialog} dialog
 * @param {CQ.Ext.Button} button
 */
CQ.security.SecurityAdmin.saveAndOpenUser = function(dialog, button) {
    CQ.security.SecurityAdmin.saveUser(dialog, button);
};

/**
 * Opens the user's page.
 */
CQ.security.SecurityAdmin.openUser = function(path) {
    //todo: edit is tmp solution
    CQ.security.SecurityAdmin.editUser(path);
};

/**
 * Opens the create user dialog.
 * @param {String} dialogPath (optional) The path of the dialog
 */
CQ.security.SecurityAdmin.createUser = function(dialogPath) {
    var admin = window.CQ_SecurityAdmin;
    if (admin) {
        if (!dialogPath) dialogPath = admin.createUserDialogPath;
    }

    var path = "/home/users/*"; // fake path
    var dialog = CQ.security.SecurityAdmin.getDialog(dialogPath, path);
    var store = CQ.security.SecurityAdmin.getDialogContentStore(path);
    dialog.processRecords([store.getAt(0)], {"scope": dialog}, true);

    try {
        // try to set random password
        var pwdField = dialog.getField("rep:password");
        pwdField.setValue(CQ.security.SecurityAdmin.buildPassword());
    }
    catch (e) {}

    dialog.show();
};

CQ.security.SecurityAdmin.buildPassword = function(length) {
    var admin = window.CQ_SecurityAdmin;
    if (!length) length = admin ? admin.createUserDialogPasswordLength : 12;
    // do not use "O" and "0" because of danger of confusion
    var pwdChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    var pwd = "";
    for (var i = 0; i < length; i++) {
        pwd += pwdChars.charAt(Math.round(Math.random() * pwdChars.length));
    }
    return pwd;
};

/**
 * Opens the edit user dialog.
 * @param {String} path (optional) The user's path
 * @param {String} dialogPath (optional) The path of the dialog
 */
CQ.security.SecurityAdmin.editUser = function(path, dialogPath) {
    CQ.security.SecurityAdmin.editAuthorizable(true, path, dialogPath);
};

/**
 * Opens the edit dialogs.
 * @param {String} path (optional) The user's path
 * @param {String} dialogPath (optional) The path of the dialog
 * @private
 */
CQ.security.SecurityAdmin.editAuthorizable = function(isUser, path, dialogPath) {
    var admin = window.CQ_SecurityAdmin;
    var idName = isUser ? "rep:userId" : "groupName";
    if (admin) {
        var grid = isUser ? admin.usersGrid : admin.groupsGrid;
        if (!path) path = grid.getSelectionModel().getSelections()[0].id;
        if (!dialogPath) dialogPath = isUser ? admin.editUserDialogPath : admin.editGroupDialogPath;
    }
    var dialog = CQ.security.SecurityAdmin.getDialog(dialogPath, path);
    var store = CQ.security.SecurityAdmin.getDialogContentStore(path, idName);
    try {
        // id field must be disabled in order to successfully submit the dialog
        dialog.find("name", idName)[0].disable();
    }
    catch (e) {
        // no id field found
    }
    dialog.processRecords([store.getAt(0)], {"scope": dialog}, true);
    dialog.show();
};


// private
CQ.security.SecurityAdmin.getDialogContentStore = function(path, idFieldName) {
    // content must be loaded manually because of different structure of content and dialog
    var fields = [];
    var data = [[]];
    if (path && path.indexOf("/*") == -1) {
        try {
            var resp = CQ.HTTP.eval(CQ.HTTP.noCaching(path + ".preferences" + CQ.HTTP.EXTENSION_JSON));
            for (var prop in resp.user) {
                fields.push(prop == "userID" ? idFieldName : prop);
                data[0].push(resp.user[prop]);
            }
        }
        catch (e) {}
    }
    return new CQ.Ext.data.SimpleStore({
        fields: fields,
        data : data
    });
};


/**
 * Saves the create group dialog.
 * @param {CQ.Dialog} dialog
 * @param {CQ.Ext.Button} button
 * @param {Function} success (optional) The function to call after the group
 *                           has been created successfully.
 */
CQ.security.SecurityAdmin.saveGroup = function(dialog, button, success) {
    var admin = window.CQ_SecurityAdmin;
    try {
        // if id is empty create it from name
        var idField = dialog.getField("groupName");
        var nameField = dialog.getField("givenName");
        var id = CQ.Ext.form.VTypes.makeAuthorizableId(nameField.getValue());
        if (!idField) {
            dialog.addHidden({"groupName": id}, false);
        }
        else if (idField.getValue() == "") {
            idField.setValue(id);
        }
    }
    catch(e) {}

    dialog.ok(button, function() {
            admin.reloadGroupsGrid();
            admin.showGroupQuickView();
            admin.unmask();
            //todo: demo script hack
            if (admin.dashboard && admin.dashboard.listsDataView) {
                admin.dashboard.listsDataView.getStore().reload();
            }
            if (success) success();
        }, function(dlg, xhr) {
            var txt = admin.getMsg(admin.FAILED_TO_CREATE_GROUP);
            try {
                txt += ":<br><br>" + CQ.HTTP.buildPostResponseFromHTML(xhr.response.responseText).headers[CQ.HTTP.HEADER_MESSAGE];
            }
            catch(e){}
            CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"), txt);
            admin.unmask();
        }
    );
};

/**
 * Saves the create group dialog and re-opens the dialog.
 * @param {CQ.Dialog} dialog
 * @param {CQ.Ext.Button} button
 */
CQ.security.SecurityAdmin.saveAndCreateGroup = function(dialog, button) {
    CQ.security.SecurityAdmin.saveGroup(dialog, button, CQ.security.SecurityAdmin.createGroup);
};

/**
 * Saves the create group dialog and opens the details of the created group.
 * @param {CQ.Dialog} dialog
 * @param {CQ.Ext.Button} button
 */
CQ.security.SecurityAdmin.saveAndOpenGroup = function(dialog, button) {
    CQ.security.SecurityAdmin.saveGroup(dialog, button);
};

/**
 * Opens the groups's page.
 */
CQ.security.SecurityAdmin.openGroup = function(path) {
    //todo: edit is tmp solution
    CQ.security.SecurityAdmin.editGroup(path);
};

/**
 * Opens the create group dialog.
 * @param {String} dialogPath (optional) The path of the dialog
 */
CQ.security.SecurityAdmin.createGroup = function(dialogPath) {
    var admin = window.CQ_SecurityAdmin;
    if (admin) {
        if (!dialogPath) dialogPath = admin.createGroupDialogPath;
    }
    var path = "/home/groups/*"; // fake path
    var dialog = CQ.security.SecurityAdmin.getDialog(dialogPath, path);
    var store = CQ.security.SecurityAdmin.getDialogContentStore(path);
    dialog.processRecords([store.getAt(0)], {"scope": dialog}, true);

    dialog.show();
};

/**
 * Opens the edit group dialog.
 * @param {String} path (optional) The groups's path
 * @param {String} dialogPath (optional) The path of the dialog
 */
CQ.security.SecurityAdmin.editGroup = function(path, dialogPath) {
    CQ.security.SecurityAdmin.editAuthorizable(false, path, dialogPath);
};

/**
 * Returns the path
 * @param {String} dialogPath
 * @param {String} path The path of the user or group
 * @param {String} formUrl (optional) The formUrl of the dialog
 * @private
 */
CQ.security.SecurityAdmin.getDialog = function(dialogPath, path, formUrl) {
    // try to get cached dialog
    var dialog = CQ.WCM.getDialog(null, dialogPath, true);

    // dialog does not exist > create it
    if (!dialog) {
        var config = CQ.WCM.getDialogConfig(dialogPath);
        if (config.formUrl) {
            config.formUrlFromContent = true;
        }
        else {
            // formUrl not defined in content (normal use case):
            // post edit to authorizable and new to "/libs/cq/security/authorizables/POST"
            config.formUrl = path && path.indexOf("/*") == -1 ? path : formUrl ? formUrl : "/libs/cq/security/authorizables/POST";
        }
        config.path = path;
        
        // cache under dialogPath
        dialog = CQ.WCM.getDialog(config, dialogPath);
        dialog.on("beforesubmit", function(){window.CQ_SecurityAdmin.mask();});
    }
    else {
        // dialog from cache
        if (!dialog.initialConfig.formUrlFromContent) {
            // adjust formUrl if it has not been defined in content (see above)
            dialog.setFormUrl(path && path.indexOf("/*") == -1 ? path : formUrl ? formUrl : "/libs/cq/security/authorizables/POST");
        }
        dialog.path = path;
    }

    return dialog;
};

// private
CQ.security.SecurityAdmin.createConfirmMessage = function(sel, msgSingular, msgPlural) {
    var msg = (sel.length > 1) ? msgPlural : msgSingular;
    msg += "<br/><br/>";
    var list = CQ.security.SecurityAdmin.getSelectionList(sel);
    msg += list.items.join("<br/>") + "<br/>";
    if (list.more) msg += "<br/>" + list.more + "<br/>";
    msg += "<br/>" + CQ.I18n.getMessage("Are you sure?");
    return msg;
};

// private
CQ.security.SecurityAdmin.getSelectionList = function(sel, max) {
    max = max || 10;
    var list = {
        "items": [],
        "more": ""
    };
    max = sel.length > max ? 4 : max;
    for (var i = 0; i < sel.length; i++) {
        if (i == max) {
            list.more = CQ.I18n.getMessage("and {0} more...", [sel.length-i], "e.g. and 20 more users to delete");
            break;
        }
        var auth = CQ.shared.XSS.getXSSRecordPropertyValue(sel[i], "name");
        var id = sel[i].get("id");
        if (id && auth != id) auth = id + " / " + auth + "";
        list.items.push(auth);
    }
    return list;
};

/**
 * Deletes the users selected in the users grid.
 */
CQ.security.SecurityAdmin.deleteUsers = function() {
    var admin = window.CQ_SecurityAdmin;
    CQ.security.SecurityAdmin.deleteAuthorizables(window.CQ_SecurityAdmin.usersGrid,
            admin.getMsg(admin.DELETE_USERS_TITLE),
            admin.getMsg(admin.DELETE_USER),
            admin.getMsg(admin.DELETE_USERS));
};

/**
 * Deletes the groups selected in the groups grid.
 */
CQ.security.SecurityAdmin.deleteGroups = function() {
    var admin = window.CQ_SecurityAdmin;
    CQ.security.SecurityAdmin.deleteAuthorizables(window.CQ_SecurityAdmin.groupsGrid,
            admin.getMsg(admin.DELETE_GROUPS_TITLE),
            admin.getMsg(admin.DELETE_GROUPS),
            admin.getMsg(admin.DELETE_GROUPS));
};

/**
 * Deletes the authorizables selected in the given grid.
 * @param {CQ.Ext.grid.GridPanel} grid The grid.
 * @param {String} title (optional) The (translated) title of the confirm box
 * @param {String} msgSingular (optional) The (translated) message of the confirm box if a single item is selected
 * @param {String} msgPlural (optional) The (translated) message of the confirm box if multiple items are selected
 */
CQ.security.SecurityAdmin.deleteAuthorizables = function(grid, title, msgSingular, msgPlural) {
    title = title ? title : CQ.I18n.getMessage("Delete Authorizables");
    msgSingular = msgSingular ? msgSingular : CQ.I18n.getMessage("You are going to delete the following authorizable:");
    msgPlural = msgPlural ? msgPlural : CQ.I18n.getMessage("You are going to delete the following authorizables:");

    var sel = grid.getSelectionModel().getSelections();
    var msg = CQ.security.SecurityAdmin.createConfirmMessage(sel, msgSingular, msgPlural);

    CQ.Ext.Msg.show({
        "title":title,
        "msg":msg,
        "buttons":CQ.Ext.Msg.YESNO,
        "icon":CQ.Ext.MessageBox.QUESTION,
        "fn":function(btnId) {
            if (btnId == "yes") {
                var admin = window.CQ_SecurityAdmin;
                admin.mask();
                for (var i=0; i<sel.length; i++) {
                    CQ.HTTP.post(sel[i].get("home"), null, {
                        "_charset_":"utf-8",
                        "deleteAuthorizable": 1
                    });
                }
                grid.getStore().reload();
                grid.quickView.collapse();
                admin.unmask();
            }
        },
        "scope":this
    });
};

/**
 * Activates the users selected in the users grid.
 */
CQ.security.SecurityAdmin.activateUsers = function() {
    var admin = window.CQ_SecurityAdmin;
    CQ.security.SecurityAdmin.replicateAuthorizables(window.CQ_SecurityAdmin.usersGrid, true,
            admin.getMsg(admin.ACTIVATE_USERS_TITLE),
            admin.getMsg(admin.ACTIVATE_USER),
            admin.getMsg(admin.ACTIVATE_USERS));
};

/**
 * Activates the groups selected in the users grid.
 */
CQ.security.SecurityAdmin.activateGroups = function() {
    var admin = window.CQ_SecurityAdmin;
    CQ.security.SecurityAdmin.replicateAuthorizables(window.CQ_SecurityAdmin.groupsGrid, true,
            admin.getMsg(admin.ACTIVATE_GROUPS_TITLE),
            admin.getMsg(admin.ACTIVATE_GROUP),
            admin.getMsg(admin.ACTIVATE_GROUPS));
};

/**
 * Activates the users selected in the users grid.
 */
CQ.security.SecurityAdmin.deactivateUsers = function() {
    var admin = window.CQ_SecurityAdmin;
    CQ.security.SecurityAdmin.replicateAuthorizables(window.CQ_SecurityAdmin.usersGrid, false,
    admin.getMsg(admin.DEACTIVATE_USERS_TITLE),
    admin.getMsg(admin.DEACTIVATE_USER),
    admin.getMsg(admin.DEACTIVATE_USERS));
};

/**
 * Activates the groups selected in the users grid.
 */
CQ.security.SecurityAdmin.deactivateGroups = function() {
    var admin = window.CQ_SecurityAdmin;
    CQ.security.SecurityAdmin.replicateAuthorizables(window.CQ_SecurityAdmin.groupsGrid, false,
    admin.getMsg(admin.DEACTIVATE_GROUPS_TITLE),
    admin.getMsg(admin.DEACTIVATE_GROUP),
    admin.getMsg(admin.DEACTIVATE_GROUPS));
};

/**
 * Replicates the authorizables selected in the given grid.
 * @param {CQ.Ext.grid.GridPanel} grid The grid.
 * @param {Boolean} activate True to activate, false to deactivate.
 * @param {String} title (optional) The (translated) title of the confirm box
 * @param {String} msgSingular (optional) The (translated) message of the confirm box if a single item is selected
 * @param {String} msgPlural (optional) The (translated) message of the confirm box if multiple items are selected
 */
CQ.security.SecurityAdmin.replicateAuthorizables = function(grid, activate, title, msgSingular, msgPlural) {
    if (activate) {
        title = title ? title : CQ.I18n.getMessage("Activate Authorizables");
        msgSingular = msgSingular ? msgSingular : CQ.I18n.getMessage("You are going to activate the following authorizable:");
        msgPlural = msgPlural ? msgPlural : CQ.I18n.getMessage("You are going to activate the following authorizables:");
    }
    else {
        title = title ? title : CQ.I18n.getMessage("Deactivate Authorizables");
        msgSingular = msgSingular ? msgSingular : CQ.I18n.getMessage("You are going to deactivate the following authorizable:");
        msgPlural = msgPlural ? msgPlural : CQ.I18n.getMessage("You are going to deactivate the following authorizables:");
    }

    var sel = grid.getSelectionModel().getSelections();
    var msg = CQ.security.SecurityAdmin.createConfirmMessage(sel, msgSingular, msgPlural);

    CQ.Ext.Msg.show({
        "title":title,
        "msg":msg,
        "buttons":CQ.Ext.Msg.YESNO,
        "icon":CQ.Ext.MessageBox.QUESTION,
        "fn":function(btnId) {
            if (btnId == "yes") {
                var admin = window.CQ_SecurityAdmin;
                admin.mask();
                var paths = [];
                for (var i=0; i<sel.length; i++) {
                    paths.push(sel[i].get("home"));
                }
                CQ.HTTP.post("/bin/replicate.json", null, {
                    "_charset_":"utf-8",
                    "cmd": activate ? "Activate" : "Deactivate",
                    "path": paths
                });
                grid.getStore().reload();
                admin.unmask();
            }
        },
        "scope":this
    });
};

CQ.security.SecurityAdmin.addUsers = function() {
    var admin = window.CQ_SecurityAdmin;
    var sel = window.CQ_SecurityAdmin.usersGrid.getSelectionModel().getSelections();
    CQ.security.SecurityAdmin.addMembers(sel,
            admin.getMsg(admin.ADD_THE_FOLLOWING_USER),
            admin.getMsg(admin.ADD_THE_FOLLOWING_X_USERS, sel.length));
};

CQ.security.SecurityAdmin.addGroups = function() {
    var admin = window.CQ_SecurityAdmin;
    var sel = window.CQ_SecurityAdmin.groupsGrid.getSelectionModel().getSelections();
    CQ.security.SecurityAdmin.addMembers(sel,
            admin.getMsg(admin.ADD_THE_FOLLOWING_GROUP),
            admin.getMsg(admin.ADD_THE_FOLLOWING_X_GROUPS, sel.length));
};

CQ.security.SecurityAdmin.addMembers = function(sel, msgSingular, msgPlural) {
    var admin = window.CQ_SecurityAdmin;

    var msg = (sel.length > 1) ? msgPlural : msgSingular;
    msg += "<br/><br/>";
    var list = CQ.security.SecurityAdmin.getSelectionList(sel, 6);
    msg += list.items.join("<br/>") + "<br/>";
    if (list.more) msg += list.more + "<br/>";
    msg += "<br/><br/>";
    msg += admin.getMsg(admin.TO_THE_FOLLOWING_GROUP);
    msg += "<br/><br/>";

    var groupField;
    var cfg = new CQ.Dialog({
        "title": admin.getMsg(admin.ADD_TO_GROUP_TITLE),
        "params": {
            "_charset_":"utf-8",
            "memberAction": "addMembers"
        },
        "items": {
            "xtype": "panel",
            "items": [
                new CQ.Static({
                    "html": msg
                }),
                groupField = new CQ.security.AuthorizableSelection({
                    "hideLabel": true,
                    "filter": "groups",
                    "displayField": "home"
                })
            ]
        },
        "buttons": CQ.Dialog.OKCANCEL,
        "listeners": {
            "beforesubmit": function() {
                admin.mask();
                groupField.disable();
                for (var i = 0; i < sel.length; i++) {
                    dialog.addHidden({"memberEntry": sel[i].data.id});
                }
                dialog.setFormUrl(groupField.getValue() + ".html");
            }
        }
    });

    var dialog = CQ.WCM.getDialog(cfg);
    dialog.success = function() {
        admin.reloadGroupsGrid();
        admin.showUserQuickView();
        admin.showGroupQuickView();
        admin.unmask();
    };
    dialog.failure = function() {
        admin.unmask();
    };
    dialog.show();
};

CQ.security.SecurityAdmin.mergeGroup = function() {
    var admin = window.CQ_SecurityAdmin;
    var sel = window.CQ_SecurityAdmin.groupsGrid.getSelectionModel().getSelections();

    var cfg = new CQ.Dialog({
        "title": admin.getMsg(admin.ADD_TO_GROUP_TITLE),
        "formUrl": sel[0].get("home"),
        "height": 250,
        "params": {
            "_charset_":"utf-8",
            "memberAction": "addMembers"
        },
        "items": {
            "xtype": "panel",
            "items": [
                new CQ.Static({
                    "html": admin.getMsg(admin.MERGE_THE_FOLLOWING_GROUP) + "<br><br>"
                }),
                new CQ.security.AuthorizableSelection({
                    "name": "memberEntry",
                    "hideLabel": true,
                    "filter": "groups",
                    "displayField": "id"
                }),
                new CQ.Static({
                    "html": "<br>" + admin.getMsg(admin.WITH_GROUP, "<b>" + CQ.Ext.util.Format.htmlEncode(sel[0].get("name")) + "</b>") 
                })
            ]
        },
        "buttons": CQ.Dialog.OKCANCEL,
        "listeners": {
            "beforesubmit": function() {
                admin.mask();
            }
        }
    });

    var dialog = CQ.WCM.getDialog(cfg);
    dialog.success = function() {
        admin.reloadGroupsGrid();
        admin.showUserQuickView();
        admin.showGroupQuickView();
        admin.unmask();
    };
    dialog.failure = function() {
        admin.unmask();
    };
    dialog.show();
};

CQ.security.SecurityAdmin.removeMembership = function(groupPath, groupName, memberId, memberName, isUser) {
    var admin = window.CQ_SecurityAdmin;

    var txt = isUser ? admin.REMOVE_USER_FROM_GROUP : admin.REMOVE_GROUP_FROM_GROUP;
    CQ.Ext.Msg.show({
        "title": admin.getMsg(admin.REMOVE_MEMBERSHIP_TITLE),
        "msg": CQ.Ext.util.Format.htmlEncode(admin.getMsg(txt, [memberName, groupName])),
        "buttons":CQ.Ext.Msg.YESNO,
        "icon":CQ.Ext.MessageBox.QUESTION,
        "fn":function(btnId) {
            if (btnId == "yes") {
                var admin = window.CQ_SecurityAdmin;
                admin.mask();
                CQ.HTTP.post(groupPath, null, {
                    "_charset_":"utf-8",
                    "memberAction": "removeMembers",
                    "memberEntry": memberId
                });
                if (isUser) admin.refreshUserQuickView();
                else admin.refreshGroupQuickView();
                admin.unmask();
            }
        },
        "scope":this
    });
};

CQ.security.SecurityAdmin.removeMembers = function() {
    var admin = window.CQ_SecurityAdmin;
    var group = admin.groupsGrid.getSelectionModel().getSelections()[0];
    var sel = admin.membersGrid.getSelectionModel().getSelections();
    var msg = CQ.security.SecurityAdmin.createConfirmMessage(sel,
            admin.getMsg(admin.REMOVE_MEMBER, CQ.shared.XSS.getXSSRecordPropertyValue(group, "name")),
            admin.getMsg(admin.REMOVE_MEMBERS, CQ.shared.XSS.getXSSRecordPropertyValue(group, "name")));
    
    CQ.Ext.Msg.show({
        "msg":msg,
        "buttons":CQ.Ext.Msg.YESNO,
        "icon":CQ.Ext.MessageBox.QUESTION,
        "fn":function(btnId) {
            if (btnId == "yes") {
                var admin = window.CQ_SecurityAdmin;
                admin.mask();
                var members = [];
                for (var i=0; i<sel.length; i++) {
                    members.push(sel[i].get("id"));
                }
                CQ.HTTP.post(group.get("home"), null, {
                    "_charset_":"utf-8",
                    "memberAction": "removeMembers",
                    "memberEntry": members
                });
                admin.membersGrid.getStore().reload();
                admin.membersGrid.quickView.collapse();
                admin.groupsGrid.getStore().reload();
                admin.groupsPanel.refreshQuickView();
                admin.usersPanel.refreshQuickView();
                admin.unmask();
            }
        },
        "scope":this
    });
};

CQ.security.SecurityAdmin.showMembers = function() {
    try {
        var admin = window.CQ_SecurityAdmin;
        var sel = admin.groupsGrid.getSelectionModel().getSelections();
        var dialogCfg = CQ.WCM.getDialogConfig(admin.membersDialogPath);

        CQ.security.SecurityAdmin.injectGroup(dialogCfg, sel[0].get("id"));

        dialogCfg.buttons = CQ.Dialog.CANCEL;
        dialogCfg = CQ.Util.applyDefaults(dialogCfg, {
            "title": admin.getMsg(admin.MEMBERS_TITLE, [CQ.shared.XSS.getXSSRecordPropertyValue(sel[0], "name")]),
            "width": 850,
            "height": 450,
            "cancelText": CQ.I18n.getMessage("Close"),
            "closeAction": "close"
        });
        //todo: cache dialog?
        var dialog = CQ.WCM.getDialog(dialogCfg);
        dialog.show();
        admin.membersPanel = CQ.Ext.getCmp("membersPanel");
        admin.membersGrid = CQ.Ext.getCmp("membersGrid");
    }
    catch (e) {}
};

/**
 * Find the property object "queryCfg" and inject the property "group".
 * @param home
 * @private
 */
CQ.security.SecurityAdmin.injectGroup = function(cfg, groupId) {
    if (cfg.id == "membersGrid") {
        if (!cfg.queryCfg) cfg.queryCfg = {};
        cfg.queryCfg.group = groupId;
        return true;
    }
    if (typeof cfg == "object" && !(cfg instanceof Array)) {
        for (var elem in cfg) {
            var found = CQ.security.SecurityAdmin.injectGroup(cfg[elem], groupId);
            if (found) return true;
        }
    }
    return false;
},


CQ.security.SecurityAdmin.importCSV = function(dialog) {
    var admin = window.CQ_SecurityAdmin;
    if (!dialog) dialog = new CQ.mcm.ImportCsvWizard();
    dialog.on("beforesubmit", function() {admin.mask();});
    dialog.success = function() {
        admin.reloadUsersGrid();
        admin.reloadGroupsGrid();
        //todo: demo script hack
        if (admin.dashboard && admin.dashboard.listsDataView) {
            admin.dashboard.listsDataView.getStore().reload();
        }
        admin.unmask();
    };
    dialog.failure = function() {
        admin.unmask();
    };
    dialog.show();
};

CQ.security.SecurityAdmin.showGroupInGrid = function(home) {
    try {
        var admin = window.CQ_SecurityAdmin;
        admin.deck.layout.setActiveItem(admin.groupsPanel);
        var m = admin.groupsGrid.getStore();
        m.each(function(rec) {
            if (rec.id == home) {
                admin.groupsGrid.getSelectionModel().selectRecords([rec]);
                admin.showGroupQuickView();
                return false; // "break"
            }
        });
        admin.navButtons["groupsPanel"].toggle();
    }
    catch(e) {}
};

CQ.security.SecurityAdmin.THOUSANDS = CQ.I18n.getMessage("Thousands");
CQ.security.SecurityAdmin.HUNDREDS = CQ.I18n.getMessage("Hundreds");
CQ.security.SecurityAdmin.formatMax = function(max) {
    if (max >= 2000) return CQ.security.SecurityAdmin.THOUSANDS;
    else if (max >= 200) return CQ.security.SecurityAdmin.HUNDREDS;
    else return CQ.I18n.getMessage("More than {0}", max);
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
 * @class CQ.security.SecurityGridPanel
 * @extends CQ.Ext.grid.GridPanel
 * @since 5.4
 * The Security Grid Panel provides a grid panel used in {@link CQ.security.SecurityAdmin SecurityAdmin}.
 * @constructor
 * Creates a new Security Grid Panel.
 * @param {Object} config The config object
 */
CQ.security.SecurityGridPanel = CQ.Ext.extend(CQ.Ext.grid.GridPanel, {

    /**
     * @cfg {Object} actions
     * Object containing the config options for actions and menu items.
     * Must be valid {@link CQ.Ext.Action} configurations.
     */

    /**
     * @cfg {Object} pagingToolbarCfg
     * {@link CQ.Ext.PagingToolbar PagingToolbar} configuration
     */

    /**
     * @cfg {Object} queryCfg
     * {@link CQ.security.search.Query} configuration
     */
    queryCfg: {},

    constructor: function(config) {

        config = config || {};
        var grid = this;
        this.id = config.id;

        this.query = new CQ.security.search.Query(CQ.Util.applyDefaults(config.queryCfg, {
            "max": CQ.security.themes.SecurityGridPanel.PAGE_SIZE
        }));

        // ---------------------------------------------------------------------
        // actions (for top toolbar)
        // ---------------------------------------------------------------------
        this.actions = [];
        this.checkedActions = [];
        var gridContextActions = [];



        // add global actions
        this.actions.push({
            "id": this.id + "-refresh",
            "iconCls": "cq-siteadmin-refresh",
            "handler": function() {grid.store.reload();},
            "tooltip": {
                "text": "Refresh",
                "autoHide": true
            }
        });

        // add custom actions
        this.actions.push("-");
        this.actions = this.actions.concat(
                this.formatActions(config.actions, gridContextActions));

        this.actions.push("->");

        if (config.searchField) {
            var searchCfg = CQ.Util.applyDefaults(config.searchField, {
                "xtype": "trigger",
                "triggerClass": "x-form-search-trigger " + this.id + "-search-trigger",
                "enableKeyEvents": true,
                "width": 140,
                "search": function(grid) {
                    grid.query.term = this.getValue();
                    grid.getStore().load();
                },
                "onTriggerClick": function() {
                    this.search(grid);
                },
                "listeners": {
                    "specialkey": function(f,e) {
                        if (e.getKey() == e.ENTER) this.search(grid);
                    }
                }
            });
            this.searchField = new CQ.Util.build(searchCfg);
            // wrapping panel required for layout reasons
            this.actions.push(new CQ.Ext.Panel({
                "border": false,
                "width": searchCfg.width,
                "items": this.searchField
            }));
        }

        if (config.helpButton) {
            var helpConfig = CQ.wcm.HelpBrowser.createHelpButton();
            helpConfig.id = this.id + "-help";
            this.actions.push(helpConfig);
        }


        // ---------------------------------------------------------------------
        // paging toolbar (for bottom toolbar)
        // ---------------------------------------------------------------------
        var ptCfg = CQ.Util.applyDefaults(config.pagingToolbarCfg, {
            "xtype": "paging",
            "hidden": true,
            "pageSize": this.query.max,
            "store": null,
            "displayInfo": true,
            "displayMsg": CQ.I18n.getMessage("{2} results", null, "paging display: {2} is the total, e.g. 29 results"),
            "maxMsg": CQ.I18n.getMessage("Thousands of Results"), // additional cfg (when results exceed max)
            "emptyMsg": "",
            "beforePageText": CQ.I18n.getMessage("Page", null, "paging display: sample: Page 2 of 5"),
            "afterPageText": CQ.I18n.getMessage("of {0}", null, "paging display: {0} is the total, e.g. Page 2 of 5"),
            "firstText": CQ.I18n.getMessage("First Page"),
            "prevText": CQ.I18n.getMessage("Previous Page"),
            "nextText": CQ.I18n.getMessage("Next Page"),
            "lastText": CQ.I18n.getMessage("Last Page"),
            "refreshText": CQ.I18n.getMessage("Refresh")
        });
        ptCfg.originalMsg = ptCfg.displayMsg;

        this.pagingToolbar = CQ.Util.build(ptCfg, true);

        if (!config.storeReaderFields) config.storeReaderFields = [];
        config.storeReaderFields.push("home", "id"); // force to request props "home" and "id"

        var sModel = new CQ.Ext.grid.CheckboxSelectionModel();
        config = CQ.Util.applyDefaults(config, {
            "autoScroll": true,
            "flex": 1,
            "border": false,
            "cls": "cq-security-grid",
            "storeProxyUrl": "/libs/cq/security/content/authorizableSearch.json",
            "storeReaderTotalProperty": "results",
            "storeReaderRoot": "authorizables",
            "storeReaderId": "home",
            "storeBaseParams": {
                "props": config.storeReaderFields.join(","),
                "ml": 2000 // membersLimit
            },
            "columns": [],
            "stateful": true,
            "stripeRows": true,
            "viewConfig": new CQ.Ext.grid.GridView({
                "forceFit":true
            }),
            "defaults": {
                "sortable": true
            },
            "tbar": this.actions,
            "bbar": this.pagingToolbar,
            "selModel": sModel,
            "listeners": {
                "rowcontextmenu":function(grid, index, e) {
                    if (e.altKey) return;

                    var xy = e.getXY();
                    e.stopEvent();

                    var sm = grid.getSelectionModel();
                    if (!sm.hasSelection()) {
                        sm.selectRow(index);
                    } else if (!sm.isSelected(index)) {
                        sm.selectRow(index);
                    }

                    if (!grid.contextMenu && (gridContextActions.length > 0)) {
                        grid.contextMenu = new CQ.Ext.menu.Menu({
                            "items":gridContextActions,
                            "listeners": {
                                "beforeshow":function() {
                                    // enable/disable menu items
                                    grid.checkActions.call(grid);
                                    if (!this.hasDefaultAction) {
                                        this.items.find(
                                            function(item) {
                                                if (item.isDefaultAction === true) {
                                                    item.addClass("x-menu-item-default");
                                                    this.hasDefaultAction = true;
                                                    return true;
                                                } else {
                                                    return false;
                                                }
                                            }
                                        );
                                    }
                                }
                            }
                        });
                    }
                    grid.contextMenu.showAt(xy);
                }
            }
        });


        // ---------------------------------------------------------------------
        // columns
        // ---------------------------------------------------------------------
        var cols = [sModel];
        for (var i = 0; i < config.columns.length; i++) {
            var c = config.columns[i];
            var pref = null;
            if (typeof c == "string") {
                pref = c;
            }
            else if (typeof c == "object") {
                if (c.usePredefined) {
                    pref = c.usePredefined;
                }
            }
            if (pref && CQ.security.SecurityGridPanel.COLUMNS[pref]) {
                var prefCfg = CQ.Util.copyObject(CQ.security.SecurityGridPanel.COLUMNS[pref]);
                // overlay config options
                for (var prop in c) {
                    if (prop == "usePredefined") continue;
                    prefCfg[prop] = c[prop];
                }

                // #33176 - MCM console vulnerable to XSS
                CQ.shared.XSS.updatePropertyName(prefCfg, "dataIndex");

                cols.push(prefCfg);
            }
            else {
                cols.push(c);
            }
        }
        config.columns = cols;


        // ---------------------------------------------------------------------
        // store
        // ---------------------------------------------------------------------
        if (!config.store) {
            var storeCfg = {
                "autoLoad": false,
                "proxy": new CQ.Ext.data.HttpProxy({
                    "api": {
                        "read": {
                            "url": config.storeProxyUrl,
                            "method": "GET"
                        }
                    }
                }),
                "baseParams": config.storeBaseParams,
                "reader": new CQ.Ext.data.JsonReader({
                    "totalProperty": config.storeReaderTotalProperty,
                    "root": config.storeReaderRoot,
                    "id": config.storeReaderId,
                    "fields": config.storeReaderFields
                }),
                "listeners": {
                    "beforeload": function() {
                        try {
                            grid.mask();
                        } catch (e) {}
                    },
                    "load": function() {
                        grid.checkPagingToolbar(this.getTotalCount());
                        try {
                            grid.unmask();
                        } catch (e) {}
                    }
                },
                "remoteSort":true,
                "paramNames": {
                    "start": "offset",
                    "limit": "max"
                },
                "load" : function(options) {
                    // overwrite Store#load (sort params are part of the query param)
                    options = options || {};
                    this.storeOptions(options);
                    // start CQ.security
                    if(this.sortInfo && this.remoteSort){
                        var c = grid.getColumnModel().getColumnsBy(function(cfg) {
                            // find the column of the same data index as the sortInfo field
                            return cfg.dataIndex == this.sortInfo.field;
                        }, this);
                        if (c && c[0]) grid.query.sortBy = c[0].sortProp || c[0].dataIndex;
                        grid.query.sortDir = this.sortInfo.direction.toLowerCase();
                    }
                    options.params = options.params || {};
                    options.params.query = grid.query.getString();
                    options.params.max = grid.pagingToolbar.pageSize;

                    // end of CQ
                    try {
                        return this.execute('read', null, options); // <-- null represents rs.  No rs for load actions.
                    } catch(e) {
                        this.handleException(e);
                        return false;
                    }
                }
            };
            config.store = new CQ.Ext.data.Store(storeCfg);
        }

        CQ.security.SecurityGridPanel.superclass.constructor.call(this, config);
    },

    initComponent: function() {
        CQ.security.SecurityGridPanel.superclass.initComponent.call(this);

        var grid = this;
        this.initState();
        this.getSelectionModel().on("selectionchange",
            function(sm) {
                // enable/disable toolbar items
                grid.checkActions();
        });
        this.pagingToolbar.bindStore(this.getStore());
        this.pagingToolbar.moveFirst();
    },

    showPagingToolbar: function() {
        if (this.pagingToolbar.hidden) {
            this.pagingToolbar.show();
            if (this.pagingToolbar.ownerCt) this.pagingToolbar.ownerCt.doLayout();
        }
    },

    hidePagingToolbar: function() {
        if (!this.pagingToolbar.hidden) {
            this.pagingToolbar.hide();
            if (this.pagingToolbar.ownerCt) this.pagingToolbar.ownerCt.doLayout();
        }
    },

    checkPagingToolbar: function(total) {
        if (total == this.query.totalMax) {
            this.pagingToolbar.displayMsg = this.pagingToolbar.maxMsg;
        }
        else {
            this.pagingToolbar.displayMsg = this.pagingToolbar.originalMsg;
        }
        if (total <= this.pagingToolbar.pageSize) {
            this.hidePagingToolbar();
        } else {
            this.showPagingToolbar();
        }
    },

    /**
     * Masks the main panel for loading.
     */
    mask: function() {
        CQ.x = this;
        if (!this.loadMask) {
            this.loadMask = new CQ.Ext.LoadMask(this.body, {
                "msg": CQ.I18n.getMessage("Loading...")
            });
        }
        this.loadMask.show();
    },

    /**
     * Unmasks the main panel after loading.
     */
    unmask: function() {
        if (!this.loadMask) return;
        this.loadMask.hide();
    }

});

CQ.Ext.reg("securitygrid", CQ.security.SecurityGridPanel);

//overrides current CQ.security.SecurityGrid class with methods contained in CQ.wcm.AdminBase.
CQ.Ext.override(CQ.security.SecurityGridPanel, CQ.wcm.AdminBase);


CQ.security.SecurityGridPanel.createColumnLink = function(text, link, cls) {
    if (!cls) cls = "cq-security-grid-link";
    return '<span class="' + cls + '" onclick="' + link + '">' + text + "</span>";
};

CQ.security.SecurityGridPanel.COLUMNS = {
    "id": {
        // with link
        "header": CQ.I18n.getMessage("ID"),
        "id": "id",
        "dataIndex": "id",
        "sortable": true,
        "sortProp": "@rep:principalName",
        "width": 150,
        "renderer": function(v, metaData, record) {
            return CQ.security.SecurityGridPanel.createColumnLink(v, "CQ.security.SecurityAdmin.openUser('" + record.get("home") + "');");
        }
    },
    "plainId": {
        // without link
        "header": CQ.I18n.getMessage("ID"),
        "id": "plainId",
        "dataIndex": "id",
        "sortable": true,
        "sortProp": "@rep:principalName",
        "width": 150
    },
    "groupName": {
        "header": CQ.I18n.getMessage("Name"),
        "id": "name",
        "dataIndex": "name",
        "sortable": true,
        "sortProp": "profile/@givenName",
        "renderer": function(v, metaData, record) {
            return CQ.security.SecurityGridPanel.createColumnLink(v, "CQ.security.SecurityAdmin.openGroup('" + record.get("home") + "');");
        },
        "width": 150
    },
    "name": {
        "header": CQ.I18n.getMessage("Name"),
        "id": "name",
        "dataIndex": "name",
        "sortable": true,
        "sortProp": "profile/@givenName"
    },
    "membersTotal": {
        "header": CQ.I18n.getMessage("Members"),
        "id": "membersTotal",
        "dataIndex": "membersTotal",
        "sortable": false,
        "width": 80,
        "fixed": true,
        "renderer": function(v, metaData, record, rIndex, cIndex, store) {
            if (v == store.baseParams.ml) {
                return CQ.security.SecurityAdmin.formatMax(store.baseParams.ml);
            }
            else return v;
        }
    },
    "membershipsTotal": {
        "header": CQ.I18n.getMessage("Memberships"),
        "id": "memberOfTotal",
        "dataIndex": "memberOfTotal",
        "sortable": false,
        "width": 80,
        "fixed": true,
        "renderer": function(v, metaData, record, rIndex, cIndex, store) {
            if (v == store.baseParams.ml) {
                if (v >= 2000) return CQ.I18n.getMessage("Thousands");
                else return CQ.I18n.getMessage("Hundreds");
            }
            else return v;
        }
    },
    "familyName": {
        "header": CQ.I18n.getMessage("Family Name"),
        "id": "familyName",
        "dataIndex": "familyName",
        "sortable": true,
        "sortProp": "profile/@familyName"
    },
    "givenName": {
        "header": CQ.I18n.getMessage("Given Name"),
        "id": "givenName",
        "dataIndex": "givenName",
        "sortable": true,
        "sortProp": "profile/@givenName"
    },
    "email": {
        "header": CQ.I18n.getMessage("Email"),
        "id": "email",
        "dataIndex": "email",
        "sortable": true,
        "sortProp": "profile/@email"
//        "renderer": function(v, metaData, record) {
//            return '<a class="cq-security-grid-link" href="mailto:' + v + '">' + v + "</a>";
//        }
    },
    "aboutMe": {
        "header": CQ.I18n.getMessage("Description"),
        "id": "aboutMe",
        "dataIndex": "aboutMe",
        "sortable": true,
        "sortProp": "profile/@aboutMe",
        "width": 300
    },
    "picture": {
        // use an undefined dataIndex in order to avoid unexpected behaviour
        "dataIndex": "picturePath",
        // "hidden" to hide the title in the header but have it in the columns menu ("hideable")
        "header": "<span class=\"hidden\">" + CQ.I18n.getMessage("Picture") + "</span>",
        "id": "picture",
        "width": 52,
        "menuDisabled": true,
        "hideable": true,
        "sortable": false,
        // do not use fixed - otherwise "hideable" does no longer work
        //"fixed":true,
        "renderer": function(v, metaData, record) {
            if (v) {
                var ext = record.get("pictureExt");
                var mod = record.get("pictureMod"); // mod date / cache killer
                var url = CQ.HTTP.externalize(v) + "/image.prof.thumbnail.48." + ext + "/" + mod + "." + ext;
                return '<img src="' + url + '" height="48" width="48">';
            }
            else {
                // default picture
                return '<div></div>';
            }
        }
    },
    "published": {
        "header":CQ.I18n.getMessage("Published"),
        "id":"published",
        "dataIndex":"replication.published", //todo: sorting doesn't work with 'deep' dataIndex
        "renderer": function(v, params, record) {
            var clazz = "";
            var text = "";
            var repl = record.data.replication;
            var qtip = "";
            var strOnTime = CQ.I18n.getMessage("N/A");
            var strOffTime = CQ.I18n.getMessage("N/A");

            if (repl && repl.published) {
                text = CQ.wcm.SiteAdmin.formatDate(new Date(repl.published));
                text += " (" + CQ.shared.XSS.getXSSTablePropertyValue(repl, "publishedBy") + ")";
                if (repl.numQueued) {
                    qtip = " ext:qtip=\"<nobr>";
                    if (repl.action == "ACTIVATE") {
                        clazz = "status-pending-activation";
                        qtip += CQ.I18n.getMessage("Activation pending. #{0} in Queue.", repl.numQueued);
                    } else {
                        clazz = "status-pending-deactivation";
                        qtip += CQ.I18n.getMessage("Deactivation pending. #{0} in Queue.", repl.numQueued);
                    }
                    qtip += "</nobr>\"";
                } else if (repl.action == "ACTIVATE") {
                    if (!record.data.timeUntilValid) {
                        if (!record.data.offTime){
                            clazz = 'status-activated';
                        } else {
                            clazz = 'status-offtime';
                        }
                    } else if (record.data.timeUntilValid){
                        if (record.data.offTime) {
                            clazz = "status-onofftime";
                        } else {
                            clazz = 'status-ontime';
                        }
                    }
                    else{
                        clazz = 'status-deactivated';
                    }
                } else {
                    clazz = "status-deactivated";
                }
                if(record.data.timeUntilValid && (record.data.onTime || record.data.offTime)){
                    qtip = "ext:qtip=\"<nobr>";
                    if(record.data.onTime){
                        strOnTime = CQ.wcm.SiteAdmin.formatDate(new Date(record.data.onTime));
                        qtip += "<b>"+CQ.I18n.getMessage("On Time")+":</b> "+strOnTime+"<br/>";
                    }
                    if(record.data.offTime){
                        strOffTime = CQ.wcm.SiteAdmin.formatDate(new Date(record.data.offTime));
                        qtip += "<b>"+CQ.I18n.getMessage("Off Time")+":</b> "+strOffTime+"<br/>";
                    }
                    qtip += "</nobr>\"";
                }
            } else{
                clazz = "status-none";
            }
            return "<div class=\"status double " + clazz + "\" "+qtip+"><span>" + text + "</span></div>";
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
 * @class CQ.security.AuthorizablesPanel
 * @extends CQ.Ext.Panel
 * @since 5.4
 * The Authorizables Panel provides a panel with a grid and an appropriate quick view.
 * @constructor
 * Creates a new Authorizables Panel.
 * @param {Object} config The config object
 */
CQ.security.AuthorizablesPanel = CQ.Ext.extend(CQ.Ext.Panel, {

    constructor: function(config) {
        var panel = this;
        this.rows = [];

        // currently it is impossible to set members limit per QuickView - therefore overwrite
        config.quickViewCfg = config.quickViewCfg || {};
        config.quickViewCfg.membersLimit = CQ.security.AuthorizablesPanel.QUICKVIEW_MEMBERSLIMIT;

        this.quickView = CQ.Util.build(CQ.Util.applyDefaults(config.quickViewCfg,  {
            "xtype": "panel",
            "cls": "cq-security-authorizables-qv",
            "quickViewGrid": this,
            "region": "east",
            "border": true,
            "autoScroll": true,
            "props": "*,members", // props to return, default: all but members
            "servletSelector": "userprops", // ((home)).userprops.json
            "width": CQ.security.themes.AuthorizablesPanel.QUICKVIEW_WIDTH,
            "margins": CQ.security.themes.AuthorizablesPanel.QUICKVIEW_MARGINS,
            "padding": CQ.security.themes.AuthorizablesPanel.QUICKVIEW_PADDING,
            "collapsed": true,
            "collapseMode": "mini",
            "collapsible": true,
            "hideCollapseTool": true,
            "split": true,
            "animate": true,
            // helpers to indicate if the QV has been collapsed by the user or programmatically
            "collapsedByUser": false,
            "collapsingByDeselection": true,
            "listeners": {
                "collapse": function() {
                    // collapsingByDeselction is set when CQ is collapsed programmatically
                    this.collapsedByUser = !this.collapsingByDeselection;
                    this.collapsingByDeselection = false;
                },
                "beforeexpand": function() {
                    if (this.collapsedByUser) {
                        this.collapsedByUser = false;
                        panel.showQuickView();
                    }
                    this.collapsedByUser = false;
                    return true;
                }
            }
        }));
        var rows = CQ.Util.build(this.getQuickViewConfig(config.quickViewRows, this.rows));
        this.quickView.add(rows);

        this.grid = CQ.Util.build(CQ.Util.applyDefaults(config.gridConfig,  {
            "xtype": "securitygrid",
            "region": "center",
            "margins": CQ.security.themes.AuthorizablesPanel.GRID_MARGINS,
            "border": true,
            "quickView": this.quickView,
            "listeners": {
                "rowclick": function(grid, index) {
                    panel.showQuickView();
                }
            }
        }));

        config = CQ.Util.applyDefaults(config,  {
            "layout": "border",
            "border": false,
            "cls": "cq-security-authorizables",
            "items": [
                this.grid,
                this.quickView
            ]
        });

        // init component by calling super constructor
        CQ.security.AuthorizablesPanel.superclass.constructor.call(this, config);

    },

    // generic show for users and groups
    showQuickView: function() {
        var sel = this.grid.getSelectionModel().getSelections();
        if (sel.length == 0) {
            this.quickView.collapsingByDeselection = true;
            this.quickView.collapse();
            this.clearQuickView();
            this.quickView.doLayout();
            return;
        }
        else if (this.quickView.collapsedByUser) {
            return;
        }

        this.quickView.path = sel[sel.length - 1].id;
        this.quickView.expand();
        this.refreshQuickView();
    },

    refreshQuickView: function() {
        if (!this.quickView.path) return;
        var url = this.quickView.path + "." + this.quickView.servletSelector + ".json";
        url = CQ.HTTP.addParameter(url, "props", this.quickView.props);
        url = CQ.HTTP.addParameter(url, "ml", this.quickView.membersLimit);
        url = CQ.HTTP.noCaching(url);
        var resp = CQ.HTTP.eval(url);

        for (var i = 0; i < this.rows.length; i++) {
            var value = resp[this.rows[i].dataIndex];
            if (this.rows[i].renderer) {
                value = this.rows[i].renderer(value, resp);
            }
            value = value || value == 0 ? value : "";
            if (!this.rows[i].labelItem) {
                // hide 2 colspan cols if they have no value
                if (!value) this.rows[i].valueItem.hide();
                else this.rows[i].valueItem.show();
            }
            this.rows[i].valueItem.updateHtml(value);
        }
        this.quickView.doLayout();
    },

    // generic clear for users and groups
    clearQuickView: function() {
        for (var i = 0; i < this.rows.length; i++) {
            if (!this.rows[i].labelItem && i != 0) {
                // hide 2 colspan cols
                // assuming i == 0 is title column > do not hide
                this.rows[i].valueItem.hide();
            }
            this.rows[i].valueItem.updateHtml("&nbsp;");
        }
    },

    // get config for the quick view
    getQuickViewConfig: function(config, rows) {
        var items = [];
        var cfg = config;
        if (!cfg) cfg = [];
        for (var i = 0; i < cfg.length; i++) {
            var c = this.getQuickViewRowConfig(cfg[i], CQ.security.AuthorizablesPanel.QUICKVIEW_ROWS);

            // #33176 - MCM console vulnerable to XSS
            CQ.shared.XSS.updatePropertyName(c, "dataIndex");

            var row = this.createQuickViewRow(c);
            rows.push(row);
            if (row.labelItem) items.push(row.labelItem);
            items.push(row.valueItem);
        }

        return {
            "xtype": "panel",
            "layout": "table",
            "border": false,
            "bodyCfg": {
                "cls": this.id + "-body-padding"
            },
            "layoutConfig": {
                columns: 2
            },
            "items": items
        };

    },

    // get the config for a single quick view row
    getQuickViewRowConfig: function(cfg, prefs) {
        var pref = null;
        if (typeof cfg == "string") {
            pref = cfg;
        }
        else if (typeof cfg == "object") {
            if (cfg.usePredefined) {
                pref = cfg.usePredefined;
            }
        }
        if (pref && prefs[pref]) {
            var prefCfg = CQ.Util.copyObject(prefs[pref]);
            // overlay config options
            for (var prop in cfg) {
                if (prop == "usePredefined") continue;
                prefCfg[prop] = cfg[prop];
            }
            return prefCfg;
        }
        else {
            return cfg;
        }
    },

    createQuickViewRow: function(row) {
        if (!row.id) row.id = row.dataIndex;
        if (!row.dataIndex) row.dataIndex = row.id;

        if (!row.labelItem && row.label) {
            row.labelItem = new CQ.Static({
                "cls": row.labelCls ? row.labelCls : "cq-security-quickview-topline",
                "text": row.label,
                "noWrap": row.noLabelWrap !== false
            });
        }
        if (!row.valueItem) {
            row.valueItem = new CQ.Static({
                "cls": row.valueCls ? row.valueCls : ("cq-security-quickview-" + (row.labelItem ? "topline" : "2cols")),
                "html": "",
                "noWrap": row.noValueWrap !== false && row.labelItem,
                "colspan": row.labelItem ? 1 : 2
            });
        }
        return row;
    }

});


CQ.Ext.reg("securityauthorizablespanel", CQ.security.AuthorizablesPanel);

// the max of members to display in quick view
CQ.security.AuthorizablesPanel.QUICKVIEW_MEMBERSLIMIT = 2000;

/**
 *
 * rowCfg = {
 *      dataIndex: "name",
 *      label: "Label", // leave empty for a 2 columns td
 *      noLabelWrap: false, // false to not wrap the label (defaults to true)
 *      labelCls: "" // to override the default CSS label class
 *      noValueWrap: false, // false to not wrap the value (defaults to true)
 *      valueCls: "", // to override the default CSS value class
 *      renderer: function(v, resp) {}
 * }
 */
CQ.security.AuthorizablesPanel.QUICKVIEW_ROWS = {
    "name": {
        "dataIndex": "name",
        "valueCls": "cq-security-quickview-title"
//        "id": "name",
//        "renderer": function(v, resp) {
        //todo: current userprops servlet already returns a calculated name
//            var name = [];
//            if (resp.givenName) name.push(resp.givenName);
//            if (resp.familyName) name.push(resp.familyName);
//            if (name.length == 0) name.push(resp.id);
//            return name.join(" ");
//        }
    },
    "picture": {
        "dataIndex": "picturePath",
        "valueCls": "cq-security-quickview-picture",
        "renderer": function(v, resp) {
            if (v) {
                var ext = resp["pictureExt"];
                var mod = resp["pictureMod"]; // mod date / cache killer
                var url = CQ.HTTP.externalize(v) + "/image.prof.thumbnail.96." + ext + "/" + mod + "." + ext;
                return '<img src="' + url + '" height="96" width="96">';
            }
            else {
                return '';
            }
        }
    },
    "email": {
        "dataIndex": "email",
        "renderer": function(v) {
            return v ? '<a href="mailto:' + v + '">' + v + '</a>' : v;
        }
    },
    "created": {
        "dataIndex": "jcr:created",
        "label": CQ.I18n.getMessage("Created"),
        "renderer": function(v) {
            try {
                return CQ.wcm.SiteAdmin.formatDate(new Date(v));
            } catch (e) {
                return "";
            }
        }
    },
    "lastModified": {
        "dataIndex": "cq:lastModified",
        "label": CQ.I18n.getMessage("Last modified"),
        "renderer": function(v) {
            try {
                return CQ.wcm.SiteAdmin.formatDate(new Date(v));
            } catch (e) {
                return "";
            }
        }
    },
    "birthday": {
        "dataIndex": "birthday",
        "label": CQ.I18n.getMessage("Date of Birth"),
        "renderer": function(v) {
            try {
                return v ? CQ.wcm.SiteAdmin.formatDate(new Date(v)).replace(/ 00:00$/, "") : "";
            } catch (e) {
                return "";
            }
        }
    },
    "gender": {
        "dataIndex": "gender",
        "label": CQ.I18n.getMessage("Gender")
    },
    "createdBy": {
        "dataIndex": "jcr:createdBy",
        "label": CQ.I18n.getMessage("Created by")
    },
    "lastModifiedBy": {
        "dataIndex": "cq:lastModifiedBy",
        "label": CQ.I18n.getMessage("Last modified by")
    },
    "members": {
        "id": "members",
        "label": CQ.I18n.getMessage("Members"),
        "renderer": function(v, resp) {
            try {
                if (resp.membersTotal == CQ.security.AuthorizablesPanel.QUICKVIEW_MEMBERSLIMIT) {
                    return CQ.security.SecurityAdmin.formatMax(CQ.security.AuthorizablesPanel.QUICKVIEW_MEMBERSLIMIT);
                }
                else return resp.membersTotal;
            } catch (e) {
                return 0;
            }

        }
    },
    "description": {
        "dataIndex": "aboutMe"
    },
    "csv": {
        "id": "csv",
        "label": CQ.I18n.getMessage("Imported CSV")
    },
    "memberships": {
        "dataIndex": "memberOf",
        "renderer": function(v, resp) {
            var str;
            var admin = window.CQ_SecurityAdmin;
            var userName = this.xssProtect ? resp[CQ.shared.XSS.getXSSPropertyName("name")] : resp.name;
            if (v.length == 0) {
                return admin.getMsg(admin.X_NOT_MEMBER_OF_ANY, [userName]);
            } else if (v.length == 1) {
                str = admin.getMsg(admin.X_IS_MEMBER_OF, [userName]);
            } else {
                str = admin.getMsg(admin.X_IS_MEMBER_OF_Y_GROUPS, [userName, v.length]) + "</br>";
            }
            str += '<div class="cq-security-quickview-memberships">';
            for (var i = 0; i < v.length; i++) {
                var groupName = CQ.shared.XSS.getXSSTablePropertyValue(v[i], "name", 70);
                str += '<span class="cq-security-quickview-remove" onclick="CQ.security.SecurityAdmin.removeMembership(\'' + v[i].home + '\',\'' + groupName + '\',\'' + resp.id + '\',\'' + userName + '\',true);"></span>';
                str += '<span class="cq-security-grid-link cq-security-quickview-membership" onclick="CQ.security.SecurityAdmin.showGroupInGrid(\'' + v[i].home + '\');">' + groupName + '</span>';
            }
            str += "</div>";
            return str;
        }
    },
    "plainMemberships": {
        "dataIndex": "memberOf",
        "renderer": function(v, resp) {
            var str;
            var admin = window.CQ_SecurityAdmin;
            var userName = this.xssProtect ? resp[CQ.shared.XSS.getXSSPropertyName("name")] : resp.name;
            if (v.length == 0) {
                return admin.getMsg(admin.X_NOT_MEMBER_OF_ANY, [userName]);
            } else if (v.length == 1) {
                str = admin.getMsg(admin.X_IS_MEMBER_OF, [userName]);
            } else {
                str = admin.getMsg(admin.X_IS_MEMBER_OF_Y_GROUPS, [userName, v.length]) + "</br>";
            }
            str += '<div class="cq-security-quickview-indented">';
            for (var i = 0; i < v.length; i++) {
                var memberName = CQ.shared.XSS.getXSSTablePropertyValue(v[i], "name", 70);
                str += memberName + "<br>";
            }
            str += "</div>";
            return str;

        }
    },
    "membershipsForGroups": {
        "dataIndex": "memberOf",
        "renderer": function(v, resp) {
            var str;
            var admin = window.CQ_SecurityAdmin;
            var listName = this.xssProtect ? resp[CQ.shared.XSS.getXSSPropertyName("name")] : resp.name;
            if (v.length == 0) {
                return admin.getMsg(admin.GROUP_X_NOT_MEMBER_OF_ANY, [listName]);
            } else if (v.length == 1) {
                str = admin.getMsg(admin.GROUP_X_IS_MEMBER_OF, [listName]);
            } else {
                str = admin.getMsg(admin.GROUP_X_IS_MEMBER_OF_Y_GROUPS, [listName, v.length]) + "</br>";
            }
            str += '<div class="cq-security-quickview-memberships">';
            for (var i = 0; i < v.length; i++) {
                var memberName = CQ.shared.XSS.getXSSTablePropertyValue(v[i], "name", 70);
                str += '<span class="cq-security-quickview-remove" onclick="CQ.security.SecurityAdmin.removeMembership(\'' + v[i].home + '\',\'' + memberName + '\',\'' + resp.id + '\',\'' + listName + '\',true);"></span>';
                str += '<span class="cq-security-grid-link cq-security-quickview-membership" onclick="CQ.security.SecurityAdmin.showGroupInGrid(\'' + v[i].home + '\');">' + memberName + '</span>';
            }
            str += "</div>";
            return str;
        }
    },
    //todo: demo script hack
    "address": {
        "dataIndex": "streetAddress",
        "renderer": function(v, resp) {
            var s = "";
            var email = this.xssProtect ? resp[CQ.shared.XSS.getXSSPropertyName("email")] : resp.email;
            s += email ? '<a href="mailto:' + email + '">' + email + '</a><br><br>' : "";
            s += v ? v + "<br>" : "";
            var city = this.xssProtect ? resp[CQ.shared.XSS.getXSSPropertyName("city")] : resp.city;
            var region = this.xssProtect ? resp[CQ.shared.XSS.getXSSPropertyName("region")] : resp.region;
            var postalCode = this.xssProtect ? resp[CQ.shared.XSS.getXSSPropertyName("postalCode")] : resp.postalCode;
            s += city ? city + "<br>" : "";
            s += region ? region + " " : "";
            s += postalCode ? postalCode + "<br>" : "";
            s += resp.country ? resp.country + "<br>" : "";
            s += s ? "<br>" : "";
            return s;
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
 * @class CQ.security.ImportCsvWizard
 * @extends CQ.Dialog
 * @since 5.4
 * The ImportCsvWizard is a step-by-step wizard to import users by comma separated values.
 * @constructor
 * Create a new ImportCsvWizard
 * @param {Object} config The config object
 */
CQ.security.ImportCsvWizard = CQ.Ext.extend(CQ.Dialog, {

    dataView: null,

    progressStore: null,

    progressTemplate: null,

    progressPanel: null,

    firstPanel: null,

    lastPanel: null,

    loadMask: null,

    allData: null,

    constructor: function(config) {
        var dlg = this;

        //----------------------------------------------------------------------
        // Progress Bar
        //----------------------------------------------------------------------

        this.activePage = 0;

        this.progressStore = [{
            idx: 0,
            title: CQ.I18n.getMessage("Enter Data")
        },{
            idx: 1,
            title: this.getMsg(this.PROGRESS_PREVIEW_USERS)
        },{
            idx: 2,
            title: this.getMsg(this.PROGRESS_SELECT_GROUP)
        }];

        this.progressTemplate = new CQ.Ext.XTemplate(
                '<div class="x-toolbar x-small-editor">',
                    '<table cellspacing="0"><tr>',
                    '<tpl for=".">',
                        '<tpl if="values.idx != 0">',
                            '<td><span class="wiz-sep">&rarr;</span></td>',
                        '</tpl>',
                        '<td><span class="wiz-step {[this.isActive(values.idx) ? "wiz-step-active" : ""]}">{#}. {title}</span></td>',
                    '</tpl>',
                    '</table>',
                '</div>',
                {
                    isActive: function(idx) {
                        return idx == dlg.activePage;
                    }
                });

        this.progressPanel = new CQ.Ext.Panel({
            cls: "cq-wizard-progress",
            border: false,
            html: this.progressTemplate.apply(this.progressStore)
        });


        //----------------------------------------------------------------------
        // Hard coded Panels
        //----------------------------------------------------------------------

        this.firstPanel = new CQ.Ext.Panel({
            layout: "form",
            autoScroll: true,
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
                    "xtype": "static",
                    "italic": true,
                    "text": CQ.I18n.getMessage("Enter or paste a comma or tab separated value ...")
                },
                this.textArea = new CQ.Ext.form.TextArea({
                    "xtype": "textarea",
                    "hideLabel": true,
//                    "height": 90, //height in combination with upload field
                    "height": 120,
                    "enableKeyEvents": true,
                    "listeners": {
                        "keyup": function() {
                            dlg.nextButton.enable();
                        }
                    }
                }),{
//                    "xtype": "static",
//                    "italic": true,
//                    "text": CQ.I18n.getMessage("... or upload a CSV file (e.g. .csv, .xls)"),
//                    "topmargin": true
//                },{
//                    "xtype": "fileuploadfield",
//                    "width": 265,
//                    "anchor": 0,
//                    "name": "csv_upload",
//                    "hideLabel": true
//                },{
                    "xtype": "static",
                    "html": "<br>"
                },{
                    "xtype": "panel",
                    "layout": "table",
                    "cls": "cq-importcsv-hints",
                    "border": false,
                    "layoutConfig": {
                        "columns": 2
                    },
                    "items": [{
                        "xtype": "static",
                        "small": true,
                        "html": CQ.I18n.getMessage("Sample data:") + "<br>" +
                                "email,givenName,familyName" + "<br>" +
                                "claude.johnson@pookmail.com,Claude,Johnson" + "<br>" +
                                "barbara.smith@spambob.com,Barbara,Smith" + "<br>" +
                                "henry.jones@dodgit.com,Henry,Jones" + "<br>"
                    },{
                        "xtype": "static",
                        "small": true,
                        "cellCls": "cq-importcsv-hints-padding",
                        "html": "- " + CQ.I18n.getMessage("Values must be separated by comma or tabs") + "<br>" +
                                "- " + CQ.I18n.getMessage("First row must be a header") + "<br>" +
                                "- " + this.getMsg(this.FIRST_COLUMN_IS_HEADER)
                    }]
                },{
                    "name": "delimiter",
                    "xtype": "hidden",
                    "value": "\"",
                    "ignoreData": true
                },{
                    "name": "separator",
                    "xtype": "hidden",
                    "value": ",",
                    "ignoreData": true
                },{
                    "name": "category",
                    "xtype": "hidden",
                    "value": "mcm",
                    "ignoreData": true
                },
                this.valueField = new CQ.Ext.form.Hidden({
                    //todo: re-use textarea?
                    "name": "csv",
                    "ignoreData": true
                })
            ]
        });

        this.secondPanel = new CQ.Ext.Panel({
            layout: "fit",
            autoScroll: true,
            header: false,
            bodyStyle: "padding:0;",
            border: false,
            labelWidth: CQ.themes.Dialog.LABEL_WIDTH,
            "stateful": false,
            defaults: {
                msgTarget: CQ.themes.Dialog.MSG_TARGET,
                anchor: CQ.themes.Dialog.ANCHOR,
                "stateful": false
            }
        });

        this.thirdPanel = new CQ.Ext.Panel({
            isLast: true,
            layout: "form",
            bodyStyle: CQ.themes.Dialog.TAB_BODY_STYLE,
            labelWidth: CQ.themes.Dialog.LABEL_WIDTH,
            defaultType: "textfield",
            "stateful": false,
            defaults: {
                msgTarget: CQ.themes.Dialog.MSG_TARGET,
                "hideLabel": true,
                "stateful": false
            },
            items: [{
                "xtype": "static",
                "bottommargin": true,
                "text": this.getMsg(this.ADD_USERS_TO_FOLLOWING)
            },
            this.groupIdField = new CQ.Ext.form.TextField({
                "name": "groupId",
                "width": 300,
                "value": ""
            }),{
                "xtype": "static",
                "small": true,
                "bottommargin": true,
                "topmargin": true,
                "text": this.getMsg(this.LEAVE_EMPTY)
            }
            ],
            listeners: {
                beforeShow: function() {
                    // todo: group name from file name
                    var groupName = CQ.I18n.getMessage("List", [], "marketing terminology") + " " + CQ.wcm.SiteAdmin.formatDate(new Date());
                    dlg.groupIdField.setValue(groupName);
                }
            }
        });


        var nextStep = function() {
            dlg.navHandler.call(dlg, 1);
        };
        var prevStep = function() {
            dlg.navHandler.call(dlg, -1);
        };

        //----------------------------------------------------------------------
        // Wizard Panel
        //----------------------------------------------------------------------

        this.wizPanel = new CQ.Ext.Panel({
            layout:'card',
            deferredRender: false,
            plain: CQ.themes.Dialog.TABPANEL_PLAIN,
            border: false,
            "stateful": false,
            activeItem: 0, // make sure the active item is set on the container config!
            bbar: this.progressPanel,
            defaults: {
                // applied to each contained panel
                border:false
            },
            items: [this.firstPanel, this.secondPanel, this.thirdPanel]
        });

        //----------------------------------------------------------------------
        // Dialog Panel
        //----------------------------------------------------------------------

        this.prevButton = new CQ.Ext.Button({
            "text": CQ.I18n.getMessage("Prev"),
            "cls": "cq-btn-prev",
            "handler": prevStep,
            "disabled": true,
            "minWidth": CQ.themes.Dialog.MIN_BUTTON_WIDTH
        });

        this.nextButton = new CQ.Ext.Button({
            "text": CQ.I18n.getMessage("Next"),
            "cls": "cq-btn-next",
            "handler": nextStep,
            "disabled": true,
            "minWidth": CQ.themes.Dialog.MIN_BUTTON_WIDTH
        });

        config = CQ.Util.applyDefaults(config, {
            "title":CQ.I18n.getMessage("Import Comma Separated Values"),
            "formUrl":"/bin/security/csvimporter.json",
            "width": 780,
            "height": 376,
            "params": {
                "_charset_":"utf-8"
            },
            "items": [this.wizPanel],
            "buttons": [
                this.prevButton,
                this.nextButton,
                CQ.Dialog.CANCEL
            ]
        });

        CQ.security.ImportCsvWizard.superclass.constructor.call(this, config);
    },

    /**
     * Masks the wizard.
     */
    mask: function() {
        // todo: try to mask entire dialog instead of inner body
         if (!this.loadMask) {
            this.loadMask = new CQ.Ext.LoadMask(this.body, {
                "msg": CQ.I18n.getMessage("Loading...")
            });
        }
        this.loadMask.show();
    },

    /**
     * Unmasks the wizard.
     */
    unmask: function() {
        if (!this.loadMask) return;
        this.loadMask.hide();
    },


    loadData: function(max) {
        if (!max || max < 0) max = 0; // load all

        // todo: error handling
        var v = this.textArea.getValue();
        // use "\t" as separator if at least one tab is present. otherwise use ","
        var sep = v.indexOf("\t") != -1 ? "\t" : ",";
        // split rows
        v = v.split("\n");

        var header = v.splice(0, 1);
        // header: ["email, firstName, ..."]

        header = header[0].split(sep);
        // header: ["email", "firstName", ...]

        for (var i = 0; i < header.length; i++) {
            header[i] = header[i].replace(/\W/g, "");
        }

        if (!this.previewStore) {
            // initial config
            this.previewStore = new CQ.Ext.data.ArrayStore({
                fields: header
            });

            var columns = [];
            for (var i = 0; i < header.length; i++) {
                columns.push({
                    "id": header[i],
                    "header": header[i],
                    "dataIndex": header[i],
                    "editor": new CQ.Ext.form.TextField(),
                    "renderer": CQ.shared.XSS.getXSSValue
                });
            }

            this.previewColumnModel = new CQ.Ext.grid.ColumnModel({
                // specify any defaults for each column
                defaults: {
                    sortable: true // columns are not sortable by default
                },
                columns: columns
            });
        }


        // split cols
        var data = [];
        this.allData = [];
        for (var i = 0; i < v.length; i++) {
            v[i] = v[i].split(sep);
            this.allData.push(v[i]);
            if (i < max) {
                data.push(v[i]);
            }
        }
        if (max == 0) {
            data = this.allData;
        }

        this.previewStore.loadData(data);
        return v.length;
    },


    createGrid: function() {
        this.previewStore = null;
        this.previewColumnModel = null;

        var max = 10;
        var length = this.loadData(max);

        // paging toolbar
        // todo: see bug #31190
//        var ptCfg = CQ.Util.applyDefaults(this.initialConfig.pagingToolbar, {
//            "xtype": "paging",
//            "pageSize": 10,
//            "store": store,
//            "displayInfo": true,
//            "displayMsg": CQ.I18n.getMessage("{2} results"),
//            "emptyMsg": "",
//            "beforePageText": CQ.I18n.getMessage("Page"),
//            "afterPageText": CQ.I18n.getMessage("of {0}"),
//            "firstText": CQ.I18n.getMessage("First Page"),
//            "prevText": CQ.I18n.getMessage("Previous Page"),
//            "nextText": CQ.I18n.getMessage("Next Page"),
//            "lastText": CQ.I18n.getMessage("Last Page"),
//            "refreshText": CQ.I18n.getMessage("Refresh")
//        });
//
//        var pagingToolbar = CQ.Util.build(ptCfg, true);


        var tbar;
        if (length > max) {
            tbar = [
                new CQ.Ext.Button({
                    "text": CQ.I18n.getMessage("Preview All ({0})", [length]),
                    "scope": this,
                    "handler": function() {
                        this.mask();
                        var wiz = this;
                        window.setTimeout(function(){
                            // use timeout in order to mask the wizard
                            wiz.loadData();
                            wiz.resultsMessage.updateText(CQ.I18n.getMessage("{0} of {1}", [length, length]));
                            wiz.unmask();
                        }, 1);
                    }
                }),
                "->",
                this.resultsMessage = new CQ.Static({
                    "text": CQ.I18n.getMessage("{0} of {1}", [max, length])
                }),
                "&nbsp;"
            ]
        }


        this.grid = new CQ.Ext.grid.EditorGridPanel({
            "store": this.previewStore,
            "cm": this.previewColumnModel,
            "stripeRows": true,
            "stateful": false,
            "stateId": "grid",
            "clicksToEdit": 1,
//            "bbar": pagingToolbar,
            "tbar": tbar,
            "viewConfig": new CQ.Ext.grid.GridView({
                "forceFit":true
            })
        });

//        pagingToolbar.bindStore(store);

        this.secondPanel.doLayout();
    },


    ok: function() {
        var cols = this.previewColumnModel.columns;

        // create header
        var value = "";
        for (var i = 0; i < cols.length; i++) {
            value += '"' + cols[i]["id"] + '"';
            value += (i == cols.length - 1) ? '\n' : ',';
        }

        // create values
        this.previewStore.each(function(record) {
            for (var i = 0; i < cols.length; i++) {
                value += '"' + record.get(cols[i]["id"]) + '"';
                value += (i == cols.length - 1) ? '\n' : ',';
            }
        }, this);

        // add invisible users that are not previewed from allData
        for (var i = this.previewStore.getTotalCount(); i < this.allData.length; i++) {
            for (var j = 0; j < cols.length; j++) {
                var v = this.allData[i][j];
                value += '"' + (v ? v : "") + '"';
                value += (j == cols.length - 1) ? '\n' : ',';
            }
        }

        this.valueField.setValue(value);

        this.textArea.disable();

        var groupName = this.groupIdField.getValue();
        var groupId = CQ.Ext.form.VTypes.makeAuthorizableId(groupName);
        if (groupName != groupId) {
            // assumption: free text entry: use value as name and generate compliant id
            this.addParams({
                "groupName": groupName
            });
            this.groupIdField.setValue(groupId);
        }
        // else: id probably selected from list or compoliant id entered

        CQ.security.ImportCsvWizard.superclass.ok.call(this);
    },

    navHandler: function(d) {
        var num = this.wizPanel.items.getCount();
        var idx = this.activePage + d;
        if (idx == num) {
            this.ok();
        } else if (idx >= 0 && idx < num) {
            this.activePage = idx;
            this.wizPanel.layout.setActiveItem(idx);
            this.updateButtons();
            if (idx == 1 && d > 0) {
                this.mask();
                var wiz = this;
                window.setTimeout(function() {
                    // use timeout in order to mask the wizard
                    wiz.secondPanel.removeAll();
                    wiz.createGrid();
                    wiz.secondPanel.add(wiz.grid);
                    wiz.unmask();
                    wiz.doLayout();
                }, 1);
            }
        }
    },

    updateProgressBar: function() {
        // update the bottom steps
        var infos = [];
        var idx = 0;
        this.wizPanel.items.each(function(){
           infos.push({ title: this.title, idx: idx++ });
        });
        this.progressStore = infos;
    },

    updateButtons: function() {
        var num = this.wizPanel.items.getCount();
        if (this.activePage < num) {
            this.nextButton.enable();
            if (this.activePage == num-1) {
                this.nextButton.setText(CQ.I18n.getMessage("Import"));
            } else {
                this.nextButton.setText(CQ.I18n.getMessage("Next"));
            }
        } else {
            this.nextButton.disable();
            this.nextButton.setText(CQ.I18n.getMessage("Next"));
        }
        if (this.activePage > 0) {
            this.prevButton.enable();
        } else {
            this.prevButton.disable();
        }
        // update toolbar buttons
        this.progressTemplate.overwrite(this.progressPanel.body, this.progressStore);
    },

    // private
    getMsg: function(msg, snippets) {
        switch(msg) {
            case this.TITLE:                    return CQ.I18n.getMessage("Import Users");

            case this.PROGRESS_PREVIEW_USERS:   return CQ.I18n.getMessage("Preview Users");
            case this.PROGRESS_SELECT_GROUP:    return CQ.I18n.getMessage("Select Group");

            case this.FIRST_COLUMN_IS_HEADER:   return CQ.I18n.getMessage("First column will be used to create the user IDs");

            case this.ADD_USERS_TO_FOLLOWING:   return CQ.I18n.getMessage("Add the imported users to the following group:");
            case this.LEAVE_EMPTY:              return CQ.I18n.getMessage("If empty the imported users will not be added to any group.");

            default: return "";
        }
    },

    TITLE: 0,

    // progress bar
    PROGRESS_PREVIEW_USERS: 10,
    PROGRESS_SELECT_GROUP: 11,

    // 1st panel
    FIRST_COLUMN_IS_HEADER: 100,

    // 3rd panel ("select group")
    ADD_USERS_TO_FOLLOWING: 300,
    LEAVE_EMPTY: 301
});


CQ.Ext.reg("importcsvwizard", CQ.security.ImportCsvWizard);

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
 * @class CQ.security.PermissionsDetailPanel
 * @extends CQ.Ext.Panel
 * @since 5.4
 * The PermissionsDetailPanel Panel shows, for a given path and authorizableId,
 * a detail view of the permissions and a list of groups that have an effect on the
 * given path.
 * @constructor
 * Creates a new PermissionsDetailPanel Panel.
 * @param {Object} config The config object
 */
CQ.security.PermissionsDetailPanel = CQ.Ext.extend(CQ.Ext.Panel, {

    /**
     * Store of the Group Permission Grid
     * @param config
     */
    groupStore: null,

    /**
     * Store of the AuthRecords
     * @param config
     */
    authStore: null,

    /**
     * Store for the Overview Permission Grid
     * @param config
     */
    overviewStore: null,

    /**
     * @param config
     */
    path: null,

    constructor: function(config) {

        this.path = config.path;

        this.addEvents(
            /**
             * @event memberUpdate
             * Fires after the membership has been saved.
             * param {PermissionsDetailPanel} this
             * param {path} the current path
             * param {record}
             */
            'memberUpdate'
        );


        // summary permissions grid

        this.overviewStore = new CQ.Ext.ux.maximgb.tg.AdjacencyListStore({
            autoLoad : false,
            sortInfo: {field: 'name', direction: 'ASC'},
            proxy: new CQ.Ext.data.HttpProxy({
                url: CQ.HTTP.externalize("/.cqactions.json"),
                method: 'GET'
            }),
            baseParams: {
                "authorizableId": config.authorizableId,
                "predicate": "useradmin",
                "depth": 0
            },
            listeners: {
                "beforeload": function(store, options) {
                    options.params.path = options.params.anode || "/";
                },
                scope: this
            },
            reader: new CQ.Ext.data.PermissionReader({
                id: '_id',
                totalProperty: "total",
                root:"entries"
            }, CQ.security.RightsPanel.RECORD)
        });

        var summaryPermGrid = new CQ.Ext.grid.EditorGridPanel({
            flex:1,
            disableSelection: true,
            master_column_id : 'path',
            stripeRows: true,
            autoExpandColumn: 'path',
            enableHdMenu: false,
            enableColumnMove: false,
            border: false,
            viewConfig : {
                enableRowBody: true,
                forceFit: true,
                sortClasses: [] // remove the sort highlight on first column.
            },
            store: this.overviewStore,
            cm: new CQ.Ext.grid.ColumnModel({
                defaults: {
                    sortable: false,
                    menuDisabled: true,
                    editable: false,
                    fixed: true
                },
                columns: [
                    {id: 'path', header: CQ.I18n.getMessage("Path"), width: 220, dataIndex: 'name', renderer: this.renderPath},
                    {id: 'read', header: CQ.I18n.getMessage("Read"), dataIndex: 'read', renderer: this.renderOverviewStatus},
                    {id: 'modify', header: CQ.I18n.getMessage("Modify"), dataIndex: 'modify', renderer: this.renderOverviewStatus},
                    {id: 'create', header: CQ.I18n.getMessage("Create"), dataIndex: 'create', renderer: this.renderOverviewStatus},
                    {id: 'delete', header: CQ.I18n.getMessage("Delete"), dataIndex: 'delete', renderer: this.renderOverviewStatus},
                    {id: 'acl_read', header: CQ.I18n.getMessage("Read ACL"), dataIndex: 'acl_read', renderer: this.renderOverviewStatus},
                    {id: 'acl_edit', header: CQ.I18n.getMessage("Edit ACL"), dataIndex: 'acl_edit', renderer: this.renderOverviewStatus},
                    {id: 'replicate', header: CQ.I18n.getMessage("Replicate"), dataIndex: 'replicate', renderer: this.renderOverviewStatus}
                ],
                defaults: {
                    width: 65,
                    sortable: false,
                    menuDisabled: true,
                    scope: this
                }
            })
        });
        this.reloadOverView();


        // group permissions grid

        this.groupStore = new CQ.Ext.data.Store({
            autoLoad: true,
            remoteSort: true,
            sortInfo: {field:'authorizableId', direction:'ASC'},
            baseParams: {
                predicate: "useradmin",
                detailView: true
            },
            proxy: new CQ.Ext.data.HttpProxy({
                url: CQ.HTTP.externalize(config.path + ".cqactions.json"),
                method: 'GET'
            }),
            reader: new CQ.Ext.data.JsonReader({
                root: 'entries',
                id: '_id',
                idProperty: '_id',
                totalProperty: 'results'
            }, CQ.security.PermissionsDetailPanel.RECORD),
            listeners: {
                beforeload: function(store, options) {
                    store.baseParams.authorizableId = config.authorizableId;
                },
                update: this.groupStoreChanged,
                scope: this
            }
        });

        var memberCheck = new CQ.security.PermissionsDetailPanel.CheckColumn({
            id: 'isMember',
            header: CQ.I18n.getMessage("Member"),
            dataIndex: 'isMember',
            authorizableId: config.authorizableId
        });

        var groupPermGrid = new CQ.Ext.grid.EditorGridPanel({
            flex:5,
            stripeRows: true,
            autoExpandColumn: 'group',
            enableHdMenu: false,
            enableColumnMove: false,
            border:false,
            viewConfig: new CQ.Ext.grid.GridView({
                enableRowBody:true,
                forceFit: true,
                sortClasses: [] // remove the sort highlight on first column.
            }),
            clicksToEdit: 1,
            store: this.groupStore,
            cm: new CQ.Ext.grid.ColumnModel({
                columns: [
                    {id: 'group', header: CQ.I18n.getMessage("ID"), width: 220, dataIndex: 'authorizableId'},
                    {id: 'read', header: CQ.I18n.getMessage("Read"), dataIndex: 'read', renderer: this.renderGroupStatus},
                    {id: 'modify', header: CQ.I18n.getMessage("Modify"), dataIndex: 'modify', renderer: this.renderGroupStatus},
                    {id: 'create', header: CQ.I18n.getMessage("Create"), dataIndex: 'create', renderer: this.renderGroupStatus},
                    {id: 'delete', header: CQ.I18n.getMessage("Delete"), dataIndex: 'delete', renderer: this.renderGroupStatus},
                    {id: 'acl_read', header: CQ.I18n.getMessage("Read ACL"), dataIndex: 'acl_read', renderer: this.renderGroupStatus},
                    {id: 'acl_edit', header: CQ.I18n.getMessage("Edit ACL"), dataIndex: 'acl_edit', renderer: this.renderGroupStatus},
                    memberCheck
                ],
                defaults: {
                    width: 65,
                    sortable: false,
                    menuDisabled: true,
                    scope: this
                }
            }),
            sm: new CQ.Ext.grid.RowSelectionModel({
                singleSelect:false
            }),
            plugins:memberCheck
        });


        // Authentication store

        var storeConfig = CQ.Util.applyDefaults(config.store, {
            "storeId":"cq-useradmin-permissions-authstore",
            "autoLoad":true,
            "proxy": new CQ.Ext.data.HttpProxy({
                "url":"/bin/security/authorizables.json",
                "method":"GET"
            }),
            "baseParams": {
                "_charset_":"utf-8"
            },
            "reader": new CQ.security.data.AuthReader()
        });
        this.authStore = new CQ.Ext.data.Store(storeConfig);

        CQ.Util.applyDefaults(config, {
            layout: {
                type:'vbox',
                align:'stretch'
            },
            border:true,
            cls:"cq-security-permissionsdetail",
            items: [
                {
                    html: '<span class="cq-static-bold">' + CQ.I18n.getMessage("Permissions for ") + config.authorizableId + '</span>',
                    border: false,
                    margins: "7 7 7 7"
                },
                summaryPermGrid,
                {
                    html: '<span class="cq-static-bold">' + CQ.I18n.getMessage("Permissions for path ") + this.path  + '</span>',
                    border: false,
                    margins: "7 7 7 7"
                },
                groupPermGrid
            ]
        });
        CQ.security.PermissionsDetailPanel.superclass.constructor.call(this, config);
    },

    initComponent: function() {
        CQ.security.PermissionsDetailPanel.superclass.initComponent.call(this);
    },

    /**
     * Handler for saving the changes in the group pnael and update the related components.
     */
    saveHandler: function() {

        var authRecord = this.authStore.getById(this.groupStore.baseParams.authorizableId);
        var url = authRecord.get("home");

        var groups = {};

        var memberOf = authRecord.get("memberOf");
        for(var i = 0 ; i < memberOf.length ; i++){
            var member = encodeURIComponent(memberOf[i].id);
            groups[member] = member;
        }

        // Add / Remove group which have changed
        var modifiedRecords = this.groupStore.getModifiedRecords();
        for(var i = 0 ; i < modifiedRecords.length ; i++){
            var m = modifiedRecords[i];
            var member = encodeURIComponent(m.get("authorizableId"));
            if (m.get('isMember') == true) {
                groups[member] = member;
            }
            else {
                delete groups[member];
            }
        }

        var groupArray = [];
        for (group in groups) {
            groupArray.push(groups[group]);
        }

        var params = {
            "_charset_":"utf-8",
            "memberAction": "memberOf",
            "memberEntry": groupArray
        };

        CQ.HTTP.post(url, function(opt, succ){
            if(succ) {
                var sBut = CQ.Ext.getCmp("cq-useadmin-detailed-permissions-save");
                sBut.disable();
                //
                this.authStore.removeAll();
                this.authStore.reload({
                    params: {
                    },
                    callback: function(records, option, success){
                        if (success) {
                            this.groupStore.reload();
                            this.reloadOverView();
                            //
                            var rec = this.authStore.getById(this.groupStore.baseParams.authorizableId);
                            this.fireEvent('memberUpdate', this, rec, 'memberOf', this.path);
                        }
                    },
                    scope: this
                });
            }
        },
        params, this);
    },

    /**
     * Handler for the group store modifications.
     * Enable the save button.
     * @param store
     * @param rec
     * @param action
     * @private
     */
    groupStoreChanged: function(store, rec, action) {
        var sBut = CQ.Ext.getCmp("cq-useadmin-detailed-permissions-save");
        if (sBut && CQ.Ext.data.Record.COMMIT != action) {
            sBut.enable();
        }
    },

    /**
     * Clear and reload the over view grid.
     */
    reloadOverView: function(){
        this.overviewStore.removeAll();
        this.overviewStore.setActiveNode(null);
        this.overviewStore.load({
            params:{
                anode: this.path,
                depth: 0
            }});
    },

    /**
     * @param items
     * @param renderer
     */
    renderTemplate: function(items, renderer) {
        var out = "";
        for (var i = 0 ; i < items.length ; i++) {
            out += renderer.call(renderer, items[i]);
        }
        return out;
    },

    /**
     * Renders the grid cells for the 'Permissions for <authorizableId>' table.
     * see {@link CQ.Ext.grid.Column#renderer}
     *
     * @param value
     * @param metaData
     * @param record
     * @param rowIndex
     * @param colIndex
     * @param store
     */
    renderOverviewStatus: function(value, metaData, record, rowIndex, colIndex, store){
        var granted = record.get(metaData.id);
        var authorizableId = record.get("authorizableId");

        var declared = record.get("declared")[metaData.id];
        var effective = declared["effective"];
        var nonEffective = declared["non-effective"];

        var qTips = undefined;
        if (effective || nonEffective) {

            var tips = [];

            if (effective) {
                tips.push("<table class='cq-security-qtip-table'>");
                tips.push("<tr>");
                tips.push("<th class='status " + (granted ? '' : 'not-') + "allowed-permission'>&nbsp;</th>");
                tips.push("<th>" + (granted ? CQ.I18n.getMessage("Allowed for") : CQ.I18n.getMessage("Denied for")) + "</th>");
                tips.push("<th>&nbsp;</th>");
                tips.push("</tr>");
                tips.push(CQ.security.RightsPanel.TreeGrid.renderTemplate(effective, function(item){
                    var out = "<tr><td>&nbsp;</td><td>";
                    out += item;
                    out += "</td><td>&nbsp;</td></tr>";
                    return out;
                }));
                tips.push("</table>");
            }

            if (nonEffective) {
                if (effective) {
                    tips.push("<hr class='cq-security-qtip-separator'/>");
                }
                tips.push("<table class='cq-security-qtip-table'>");
                tips.push("<tr>");
                tips.push("<th>" + CQ.I18n.getMessage("Noneffective") + "</th>");
                tips.push("<th>&nbsp;</th>");
                tips.push("</tr>");
                tips.push(this.renderTemplate(nonEffective,function(item){
                    var out = "<tr><td>";
                    out += item;
                    out += "</td></tr>";
                    return out;
                }));
                tips.push("</table>");
            }
            qTips = tips.join('\n');
            qTips = 'ext:qwidth="auto" ext:qtip="' + qTips + '"';

        }

        var className = ['x-grid3'];
        className.push(granted ? 'check' : 'nocheck');
        className.push((effective || nonEffective) ? 'ov' : 'in');
        className.push(nonEffective ? 'res' : 'nores' );

        return'<div ' + (qTips ? qTips : '') + '" class="x-grid3-check-col ' + className.join('-') + '">&nbsp;<div/>';
    },

    /**
     * Renders the grid cells for the 'Permissions for path <path>' table.
     * see {@link CQ.Ext.grid.Column#renderer}
     * 
     * @private
     * @param value
     * @param metaData
     * @param record
     * @param rowIndex
     * @param colIndex
     * @param store
     */
    renderGroupStatus: function(value, metaData, record, rowIndex, colIndex, store){
        var granted = record.get(metaData.id);
        var authorizableId = record.get("authorizableId");
        var restrictions =  record.get("restrictions");

        var qTips = undefined;
        if (restrictions) {

            var tips = [];

            tips.push("<table class='cq-security-qtip-table'>");
            tips.push("<tr>");
            tips.push("<th>" + CQ.I18n.getMessage("Restrictions") + "</th>");
            tips.push("<th>&nbsp;</th>");
            tips.push("</tr>");
            for (var restriction in restrictions) {
                tips.push("<tr><td>");
                tips.push(restriction);
                tips.push("</td><td>");
                tips.push(restrictions[restriction]);
                tips.push("</td></tr>");
            }
            tips.push("</table>");
            qTips = tips.join('\n');
            qTips = 'ext:qwidth="auto" ext:qtip="' + qTips + '"';

        }

        var className = ['x-grid3'];
        if (granted !== "") {
            className.push((granted === true ? '' : 'no') + "check-in");
            className.push((restrictions ? '' : 'no') + "res");
            return '<div ' + (qTips ? qTips : '') + ' class="x-grid3-check-col ' + className.join('-') + '">&nbsp;<div/>';
        }
        else {
            return "";
        }
    },

    /**
     * Renders the full path (eg. /lib/cq/security) for a record
     * and display a folder|file icon if the node has children or not.
     * see {@link CQ.Ext.grid.Column#renderer}
     * 
     * @param value
     * @param metaData
     * @param record
     * @param rowIndex
     * @param colIndex
     * @param store
     */
    renderPath: function(value, metaData, record, rowIndex, colIndex, store){
        var isLeaf = record.get('_is_leaf');
        var out = '<span class="' + (isLeaf ? 'x-tree-node-leaf' : 'x-tree-node-collapsed') + '">';
        out += '<img unselectable="on" class="x-tree-node-icon ' + (isLeaf ? 'file' : 'folder') + '" style="height:16px;" src="/libs/cq/ui/resources/0.gif"/> ';
        out += record.get('_id');
        out += '</span>';
        return out;
    }
});

/**
 * @class CQ.security.PermissionsDetailPanel.RECORD
 * A specific {@link CQ.Ext.data.Record} type that represents a permision entry.
 * @constructor
 * @param {Object} config A data object to build the record.
 */
CQ.security.PermissionsDetailPanel.RECORD = CQ.Ext.data.Record.create(
        [{name: '_id'},
            {name: 'authorizableId'},
            {name: 'read'},
            {name: 'modify'},
            {name: 'create'},
            {name: 'delete'},
            {name: 'acl_read'},
            {name: 'acl_edit'},
            {name: 'isMember', type: 'bool'},
            {name: 'editMembership', type: 'bool'},
            {name: '_id'},
            {name: 'restrictions'}
        ]);

CQ.security.PermissionsDetailPanel.CheckColumn = function(config) {

    authorizableId: null,

    CQ.Ext.apply(this, config);
    if (!this.id) {
        this.id = CQ.Ext.id();
    }
    this.authorizableId = config.authorizableId;
    this.renderer = this.renderer.createDelegate(this);
};

CQ.security.PermissionsDetailPanel.CheckColumn.prototype = {
    init : function(grid) {
        this.grid = grid;
        this.grid.on('render', function() {
            var view = this.grid.getView();
            view.mainBody.on('mousedown', this.onMouseDown, this);
        }, this);
    },

    onMouseDown : function(e, t) {
        if (t.className && t.className.indexOf('x-grid3-cc-' + this.id) != -1) {
            e.stopEvent();
            var rowIndex = this.grid.getView().findRowIndex(t);
            var columnIndex = this.grid.getView().findCellIndex(t);
            var fieldName = this.grid.getColumnModel().getDataIndex(columnIndex);
            var record = this.grid.store.getAt(rowIndex);
            var authorizableId = record.get("authorizableId");
            if (!record.data[this.id].disabled && record.data["editMembership"]) {
                record.set(fieldName, !record.data[fieldName]);
            }
        }
    },

    /**
     * @param value
     * @param metaData
     * @param record
     */
    renderer : function(value, metaData, record) {
        var authorizableId = record.get("authorizableId");
        if (record.data[this.id] !== "" && this.authorizableId != authorizableId) {
            metaData.css += ' x-grid3-check-col-td';
            if (record.data[this.id].disabled || !record.data["editMembership"]) {
                metaData.css += ' x-item-disabled';
            }
            return '<div class="x-grid3-check-col' + (value ? '-on' : '') + ' x-grid3-cc-' + this.id + '">&#160;</div>';
        } else {
            return "";
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
 * @class CQ.security.RightsPanel
 * @extends CQ.Ext.Panel
 * @since 5.4
 * The Rights Panel shows a user's or group's rights per path in a treeGrid.
 * @constructor
 * Creates a new Rights Panel.
 * @param {Object} config The config object
 */
CQ.security.RightsPanel = CQ.Ext.extend(CQ.Ext.Panel, {

    /**
     * The editable treeGrid
     * @private
     */
    tree: null,

    /**
     * The search component
     * @param config
     */
    search: null,

    /**
     * Creates a new <code>CQ.security.RightsPanel</code> instance.
     * @constructor
     * @param {Object} config The config object
     */
    constructor: function(config) {

        var panel = this;

        this.addEvents(
            /**
             * @event memberUpdate
             * Fires after the membership has been saved.
             * param {PermissionsDetailPanel} this
             * param {path} the current path
             * param {record}
             */
            'authSaved'
        );

        this.tree = new CQ.security.RightsPanel.TreeGrid({
            listeners: {
                saveChange: function(component, record, field) {
                    panel.fireEvent('authSaved', panel, record, field);
                }
            }
        });

        this.search = new CQ.security.ClearableSearchField({
            disabled: true,
            id: "cq-useadmin-permissions-search",
            listeners: {
                select: function(search, record, index) {
                    this.tree.emptyStore();
                    this.tree.loadPath(record.id);
                    return true;
                },
                trigger1Click: function() {
                    this.tree.resetRecords();
                },
                scope: this
            }
        });

        CQ.Util.applyDefaults(config, {
            "id": "rights-panel",
            "cls": "cq-security-rights",
            "layout":"fit",
            "border":false,
            "bodyStyle":"padding:0px;",
            "layoutConfig": {
                "autoShow":true
            },
            "title": CQ.I18n.getMessage("Permissions"),
            "tbar":[
                {
                    "id":"cq-useadmin-permissions-save",
                    "text":CQ.I18n.getMessage("Save"),
                    "handler":this.saveHandler,
                    "disabled":true,
                    "title":CQ.I18n.getMessage("Save Changes"),
                    "tooltip":CQ.I18n.getMessage("Save changes to Permissions"),
                    "scope":this
                },
                {
                    xtype: 'tbfill'
                },
                this.search
            ],
            "items": this.tree
        });

        CQ.security.RightsPanel.superclass.constructor.call(this, config);
    },

    // init component by calling super constructor
    initComponent: function() {
        CQ.security.RightsPanel.superclass.initComponent.call(this);

    },

    /**
     * Handler to reset the panel.
     * Initialize the treeGrid
     * @param record
     */
    loadRecord: function(record) {
        this.tree.loadRecord(record);
    },

    /**
     * @param record
     */
    onSelectionModfied: function(record) {
       this.tree.loadRecord(record);
    },

    /**
     * Handler to save the changes.
     */
    saveHandler: function(){
        this.tree.saveHandler();
    }
});


/**
 * @class CQ.security.RightsPanel.TreeGrid
 * @extends CQ.Ext.ux.maximgb.tg.EditorGridPanel
 * @since 5.4
 * A treeGrid for browsing and editing the hierarchical permissions of a user.
 * @constructor
 * Creates a new Rights Panel Tree Grid.
 * @param {Object} config The config object
 */
CQ.security.RightsPanel.TreeGrid = CQ.Ext.extend(CQ.Ext.ux.maximgb.tg.EditorGridPanel, {

    /**
     * Store of the editable treeGrid
     * @private
     */
    store: null,

    /**
     * The reader for the cqactions.
     * @param config
     */
    reader: null,

    constructor: function(config) {

        this.reader = new CQ.Ext.data.PermissionReader({
            id: '_id',
            totalProperty: "total",
            root:"entries"
        }, CQ.security.RightsPanel.RECORD);

        this.store = new CQ.Ext.ux.maximgb.tg.AdjacencyListStore({
            autoLoad : false,
            sortInfo: {field: 'name', direction: 'ASC'},
            proxy: new CQ.Ext.data.HttpProxy({
                url: CQ.HTTP.externalize("/.cqactions.json"),
                method: 'GET'
            }),
            baseParams: {
                "predicate": "useradmin",
                "depth": 1
            },
            listeners: {
                "beforeload": function(store, options) {
                    options.params.path = options.params.anode || "/";
                },
                update: this.storeChanged,
                scope: this
            },
            reader: this.reader
        });

        var pathStr = CQ.I18n.getMessage("Path");
        var readStr = CQ.I18n.getMessage("Read");
        var modifyStr = CQ.I18n.getMessage("Modify");
        var createStr = CQ.I18n.getMessage("Create");
        var deleteStr = CQ.I18n.getMessage("Delete");
        var readAclStr = CQ.I18n.getMessage("Read ACL");
        var editAclStr = CQ.I18n.getMessage("Edit ACL");
        var replicateStr = CQ.I18n.getMessage("Replicate");

        var cm = new CQ.Ext.grid.ColumnModel({
            defaults: {
                sortable: false,
                menuDisabled: true,
                scope: this
            },
            columns: [
                {id: 'path', header: pathStr, width: 160, dataIndex: 'name', renderer: CQ.security.RightsPanel.TreeGrid.renderNodeName, editable: false},
                {id: 'read', header: readStr, tooltip: readStr, width: 47, dataIndex: 'read', renderer: CQ.security.RightsPanel.TreeGrid.renderCheckbox},
                {id: 'modify', header: modifyStr, tooltip: modifyStr, width: 47, dataIndex: 'modify', renderer: CQ.security.RightsPanel.TreeGrid.renderCheckbox},
                {id: 'create', header: createStr, tooltip: createStr, width: 47, dataIndex: 'create', renderer: CQ.security.RightsPanel.TreeGrid.renderCheckbox},
                {id: 'delete', header: deleteStr, tooltip: deleteStr, width: 47, dataIndex: 'delete', renderer: CQ.security.RightsPanel.TreeGrid.renderCheckbox},
                {id: 'acl_read', header: readAclStr, tooltip: readAclStr, width: 55, dataIndex: 'acl_read', renderer: CQ.security.RightsPanel.TreeGrid.renderCheckbox},
                {id: 'acl_edit', header: editAclStr, tooltip: editAclStr, width: 55, dataIndex: 'acl_edit', renderer: CQ.security.RightsPanel.TreeGrid.renderCheckbox},
                {id: 'replicate', header: replicateStr, tooltip: replicateStr, width: 55, dataIndex: 'replicate', renderer: CQ.security.RightsPanel.TreeGrid.renderCheckbox},
                {id: 'details', width: 47, renderer: CQ.security.RightsPanel.TreeGrid.renderDetails}
            ]
        });

        CQ.Util.applyDefaults(config, {
            cls: "cq-useradmin-grid",
            store: this.store,
            master_column_id : 'path',
            clicksToEdit: 'auto',
            cm: cm,
            stripeRows: true,
            autoExpandColumn: 'path',
            enableHdMenu: false,
            enableColumnResize: true,
            border: false,
            viewConfig : {
                enableRowBody: true,
                expanded_icon_class : 'ux-maximgb-tg-nl-minus',
                last_expanded_icon_class : 'ux-maximgb-tg-nl-minus',
                collapsed_icon_class : 'ux-maximgb-tg-nl-plus',
                last_collapsed_icon_class : 'ux-maximgb-tg-nl-plus',
                sortClasses: [] // remove the sort highlight on first column.
            },
            listeners: {
                cellclick: {
                    fn: function(grid, rowIndex, columnIndex, e) {
                        var record = grid.getStore().getAt(rowIndex);
                        if ( ! record.get('canreadac')) {
                            return false;
                        }
                        var columnId = grid.getColumnModel().getColumnId(columnIndex);
                        if (columnId == 'details') { // path column
                            var authorizableId = grid.getStore().baseParams.authorizableId;
                            var p = new CQ.security.PermissionsDetailPanel({
                                id: "permissions-detail-panel",
                                path: record.id,
                                authorizableId: authorizableId,
                                listeners: {
                                    memberUpdate: function(component, record, field, path) {
                                        this.updateNodesSequencially([path]);
                                        this.fireEvent('saveChange', this, record, field);
                                    },
                                    scope: grid
                                }
                            });
                            var dialog = new CQ.Dialog({
                                "height": 500,
                                "width": 800,
                                "modal": true,
                                "resizable": false,
                                "title": CQ.I18n.getMessage("Detailed permissions for ") + authorizableId + CQ.I18n.getMessage(" at path ") + record.id,
                                "items": [p],
                                "buttons": [
                                    {
                                        id: "cq-useadmin-detailed-permissions-save",
                                        text: CQ.I18n.getMessage("OK"),
                                        disabled: true,
                                        handler: function(){
                                            p.saveHandler();
                                        }
                                    },
                                    CQ.Dialog.CANCEL
                                ]});
                            dialog.show();
                        } else if (columnId != 'path') { // skip the path column
                            var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
                            if ( ! record.get('canwriteac')) {
                                return false;
                            }
                            var newValue = ! record.data[fieldName];
                            record.set(fieldName, newValue);
                            grid.getView().refresh();
                        }
                    },
                    scope: this
                }
            }
        });
        CQ.security.RightsPanel.TreeGrid.superclass.constructor.call(this, config);
    },

    initComponent: function() {
        CQ.security.RightsPanel.TreeGrid.superclass.initComponent.call(this);
        this.getSelectionModel().addListener('cellselect', this.onCellSelect, this);
        this.getSelectionModel().addListener('beforecellselect', this.onBeforeCellSelect, this);
    },

    /**
     * Handler for the store modifications.
     * Enable the save button.
     * @param store
     * @param record
     * @param operation
     * @private
     */
    storeChanged: function(store, record, operation) {
        var sBut = CQ.Ext.getCmp("cq-useadmin-permissions-save");
        if (sBut && CQ.Ext.data.Record.COMMIT != operation) {
            sBut.enable();
        }
    },

    /**
     * Handler for the pre cell selection.
     * Remove the selection highlight for all rows.
     * @param sm selection model
     * @param rowIndex
     * @param colIndex
     */
    onBeforeCellSelect: function(sm, rowIndex, colIndex) {
        CQ.Ext.select('.x-grid3-row').removeClass('x-grid3-row-selected');
    },

    /**
     * Handler for the cell selection.
     * Highlight the selected row.
     * @param sm selection model
     * @param rowIndex
     * @param colIndex
     */
    onCellSelect: function(sm, rowIndex, colIndex) {
        var row = this.getView().getRow(rowIndex);
        CQ.Ext.fly(row).addClass('x-grid3-row-selected');
    },

    /**
     * Reset the store and load the intial state for the authorizableId in the record (record.id)
     * @param record
     */
    loadRecord: function(record) {
        if (record && record.id) {
            var search = CQ.Ext.getCmp("cq-useadmin-permissions-search");
            if (search) {
                search.enable();
            }
            this.setAuthorizableId(record.id);
        }
        this.resetRecords();
    },

    /**
     * @param authorizableId
     */
    setAuthorizableId: function(authorizableId) {
        this.store.baseParams.authorizableId = authorizableId;
    },

    /**
     * Empty the store and load the root and the first level of permission in the store.
     */
    resetRecords: function() {
        this.emptyStore();
        this.loadPath("", true);
    },

    /**
     * Load sequentially in the store, each node nodes of the given path.
     * eg. if path="/libs/test/data" then sequentially: loads("/"), loads("/libs"), loads("/libs/test"), loads("/libs/test/data")
     * @param path
     * @param expand if true then the last node  of the path is expanded (extra request).
     */
    loadPath: function(path, expand) {
        // build the list of paths to be loaded sequentially.
        var paths = [];
        var tokens = path.split("/");
        for (var i = 0 ; i < tokens.length ; i++) {
            if (tokens[i] == "") {
                paths.push("/");
            }
            else {
                paths.push(tokens.slice(0,i + 1).join("/"));
            }
        }
        this.updateNodesSequencially(paths);
        var nb = expand ? paths.length : paths.length - 1;
        for (var i = 0; i < nb ; i++) {
            var rec = this.store.getById(paths[i]);
            if (rec) {
                this.store.expandNode(rec);
            }
        }
    },

    emptyStore: function() {
        this.store.removeAll();
        this.store.setActiveNode(null);
    },

    disable: function() {
        this.suspendEvents(false);
    },


    /**
     * @private
     * @param paths An array of paths to be loaded/updated sequentially
     */
    updateNodesSequencially: function(paths) {
        var params = [];
        params.push("authorizableId=" + this.store.baseParams.authorizableId);
        params.push("predicate=useradmin");
        params.push("depth=0");
        for (var i = 0; i < paths.length; i++) {
            params.push("path=" + encodeURIComponent(paths[i]));
        }
        //
        var url = CQ.HTTP.externalize("/.cqactions.json") + "?" + params.join("&");
        url = CQ.HTTP.addParameter(url, "_charset_", "utf-8");
        url = CQ.HTTP.noCaching(url);
        var r = CQ.HTTP.get(url);
        var r1 = this.reader.read(r);
        //
        for (var i = 0; i < paths.length; i++) {
            var path = paths[i];
            var index = -1;
            for (var j = 0 ; j < r1.records.length ; j++) {
                if (r1.records[j].id == path) {
                    index = j;
                    break;
                }
            }
            if (index != -1) {
                var rec = r1.records[index];

                var oldIndex = this.store.indexOfId(path);
                if (oldIndex != -1) {
                    this.store.removeAt(oldIndex);
                }
                this.store.addSorted(rec);
            }
        }
    },

    /**
     * @private
     * @param record
     */
    buildChangeLog: function(record) {
        var data = record.data;
        var changes = [
            "path:" + encodeURIComponent(record.id),
            "read:" + data['read'],
            "modify:" + data['modify'],
            "create:" + data['create'],
            "delete:" + data['delete'],
            "acl_read:" + data['acl_read'],
            "acl_edit:" + data['acl_edit'],
            "replicate:" + data['replicate']
        ];
        return "changelog=" + changes.join(",");
    },

    /**
     * Handler for saving the treeGrid changes to the server and updating
     * the view with the new values.
     */
    saveHandler: function(){
        var modifiedRecords = this.store.getModifiedRecords().sort(function(r1, r2){
            // Sort the modified record according to their depth in the tree
            return r1.store.getNodeDepth(r1) < r2.store.getNodeDepth(r2);
        });

        // Build the parameters
        var changelogsParam = "";
        for(var i = 0 ; i < modifiedRecords.length ; i++){
            modifiedRecord = modifiedRecords[i];
            changelogsParam += this.buildChangeLog(modifiedRecord);
            if (i != modifiedRecords.length - 1) {
                changelogsParam += "&";
            }
        }
        var authorizableIdParam = "authorizableId=" + this.store.baseParams.authorizableId;
        var params = authorizableIdParam + "&" + changelogsParam;

        // Post the changes
        CQ.Ext.getCmp('rights-panel').getEl().mask("Applying changes ...");
        var sBut = CQ.Ext.getCmp("cq-useadmin-permissions-save");
        CQ.HTTP.post("/.cqactions.html",
            function(options, success, xhr, response){
                if(success) {
                    this.store.commitChanges();
                    // Reload the nodes
                    var paths = [];
                    for (var i = 0 ; i < modifiedRecords.length ; i++) {
                        paths.push(modifiedRecords[i].get('_id'));
                    }
                    this.updateNodesSequencially(paths);
                }
                else {
                    //TODO warn the user
                    this.store.rejectChanges();
                }
                CQ.Ext.getCmp('rights-panel').getEl().unmask();
                sBut.disable();
            },
            params,
            this);
    }
});

/**
 * The renderer method for the treeGrid checkbox cells.
 * It renders a checked/unchecked, inherited/overriden state.
 * see {@link CQ.Ext.grid.Column#renderer}
 * 
 * @private
 * @param value
 * @param metaData
 * @param record
 * @param rowIndex
 * @param colIndex
 * @param store
 */
CQ.security.RightsPanel.TreeGrid.renderCheckbox= function(value, metaData, record, rowIndex, colIndex, store) {
    // test if the editing session has permission to read the ac info for this node.
    if ( ! record.get('canreadac')) {
        // cannot read ac-info for caction at data.id -> hide the checkbox.
        return "";
    }
    var granted = record.get(metaData.id);
    var authorizableId = record.get("authorizableId");
    var declared = record.get("declared")[metaData.id];
    var effective = declared["effective"];
    var nonEffective = declared["non-effective"];

    var qTips = undefined;
    if (effective || nonEffective) {

        var tips = [];

        if (effective) {
            tips.push("<table class='cq-security-qtip-table'>");
            tips.push("<tr>");
            tips.push("<th class='status " + (granted ? '' : 'not-') + "allowed-permission'>&nbsp;</th>");
            tips.push("<th>" + (granted ? CQ.I18n.getMessage("Allowed for") : CQ.I18n.getMessage("Denied for")) + "</th>");
            tips.push("<th>&nbsp;</th>");
            tips.push("</tr>");
            tips.push(CQ.security.RightsPanel.TreeGrid.renderTemplate(effective, function(item){
                var out = "<tr><td>&nbsp;</td><td>";
                out += item;
                out += "</td><td>";
                out += "&nbsp;";
                out += "</td></tr>";
                return out;
            }));
            tips.push("</table>");
        }

        if (nonEffective) {
            if (effective) {
                tips.push("<hr class='cq-security-qtip-separator'/>");
            }
            tips.push("<table class='cq-security-qtip-table'>");
            tips.push("<tr>");
            tips.push("<th>" + CQ.I18n.getMessage("Noneffective") + "</th>");
            tips.push("<th>&nbsp;</th>");
            tips.push("</tr>");
            tips.push(CQ.security.RightsPanel.TreeGrid.renderTemplate(nonEffective,function(item){
                var out = "<tr><td>";
                out += item;
                out += "</td></tr>";
                return out;
            }));
            tips.push("</table>");
        }

        qTips = tips.join('\n');
        qTips = 'ext:qwidth="auto" ext:qtip="' + qTips + '"';

    }

    var className = ['x-grid3'];
    className.push(granted ? 'checked' : 'unchecked');
    className.push((effective || nonEffective) ? 'overriden' : 'inherited');
    className.push(nonEffective ? 'restriction' : 'norestriction' );

    return '<div ' + (qTips ? qTips : '') + ' class="x-grid3-check-col ' + className.join('-') + (record.get('canwriteac') ? '' : ' x-item-disabled') + '">&nbsp;<div/>';
};

/**
 * @param items
 * @param renderer
 */
CQ.security.RightsPanel.TreeGrid.renderTemplate= function(items, renderer) {
    var out = "";
    for (var i = 0 ; i < items.length ; i++) {
        out += renderer.call(renderer, items[i]);
    }
    return out;
};

/**
 * Renders the nodeName for the record
 * and display a folder|file icon if the node has children or not.
 * see {@link CQ.Ext.grid.Column#renderer}
 * 
 * @param value
 * @param metaData
 * @param record
 * @param rowIndex
 * @param colIndex
 * @param store
 */
CQ.security.RightsPanel.TreeGrid.renderNodeName= function(value, metaData, record, rowIndex, colIndex, store){
    var isLeaf = record.get('_is_leaf');
    var out = '<span class="' + (isLeaf ? 'x-tree-node-leaf' : 'x-tree-node-collapsed') + '">';
    out += '<img unselectable="on" class="x-tree-node-icon ' + (isLeaf ? 'file' : 'folder') + '" style="height:16px;" src="/libs/cq/ui/resources/0.gif"/> ';
    out += record.get(CQ.shared.XSS.getXSSPropertyName("name"));
    out += '</span>';
    return out;
};

/**
 * Renders the 'detail' button
 * see {@link CQ.Ext.grid.Column#renderer}
 * 
 * @param value
 * @param metaData
 * @param record
 * @param rowIndex
 * @param colIndex
 * @param store
 */
CQ.security.RightsPanel.TreeGrid.renderDetails= function(value, metaData, record, rowIndex, colIndex, store) {
    // test if the editing session has permission to read the ac info for this node.
    if ( ! record.get("canreadac")) {
        // cannot read ac-info for caction at data.id -> hide the detail link.        
        return "";
    }
    return '<a href="#">' + CQ.I18n.getMessage("Details") + '</a>';
};

/**
 * @class CQ.security.RightsPanel.RECORD
 * A specific {@link CQ.Ext.data.Record} type that represents a permision entry.
 * @constructor
 * @param {Object} config A data object to build the record.
 */
CQ.security.RightsPanel.RECORD = CQ.Ext.data.Record.create(
        [
            {name: 'name'},
            {name: CQ.shared.XSS.getXSSPropertyName("name")},
            {name: 'read'},
            {name: 'modify'},
            {name: 'create'},
            {name: 'delete'},
            {name: 'acl_read'},
            {name: 'acl_edit'},
            {name: 'replicate'},
            {name: 'canreadac'},
            {name: 'canwriteac'},
            {name: 'declared'},
            {name: '_id'},
            {name: '_parent'},
            {name: '_is_leaf', type: 'bool'},
            {name: 'authorizableId'},
            {name: 'children'}
        ]);

/**
 * @class Ext.data.PermissionReader
 * @extends Ext.data.JsonReader
 * @constructor
 * Create a new PermissionReader
 * @param {Object} meta Metadata configuration options.
 * @param {Array/Object} recordType
 *
 */
CQ.Ext.data.PermissionReader = function(meta, recordType){
    meta = meta || {};
    CQ.Ext.data.PermissionReader.superclass.constructor.call(this, meta, recordType || meta.fields);
};

CQ.Ext.extend(CQ.Ext.data.PermissionReader, CQ.Ext.data.JsonReader, {

    /**
     * Reads the record at the deepest level available.
     * @param o
     */
    readRecords: function(o) {
        var entries = o[this.meta.root];
        var subEntries = entries[0];
        if (subEntries && subEntries[this.meta.root]) {
             return this.readRecords(subEntries);
        }
        else {
            return CQ.Ext.data.PermissionReader.superclass.readRecords.call(this, o);
        }
    }
});

/**
 * @private
 * Implement the search feature of the RightsPanel.
 * This search component can operate: I. free text search, II. path search.
 * If the query string starts with a slash then a path search is executed,
 * a free text search is executed otherwise.
 */
CQ.security.ClearableSearchField = CQ.Ext.extend(CQ.Ext.form.ComboBox, {

    /**
     * @cfg {Number} minQueryLength
     * The minimal query string length to trigger a search request.
     * Default to 3.
     */
    minQueryLength: 3,

    /**
     * @param config
     */
    isTrigger1Enable: false,

    /**
     * Template to display the results of the path search
     * @param config
     */
    pathTemplate: new CQ.Ext.XTemplate(
            '<tpl for=".">',
            '<div class="search-item" qtip="{path}">',
            '<div class="search-thumb"',
            ' style="background-image:url({[CQ.HTTP.externalize(values.path,true)]}.thumb.48.48.png);"></div>' +
                    '<div class="search-text-wrapper">' +
                    '<div class="search-title">{name}</div>',
            '</div>',
            '<div class="search-separator"></div>',
            '</div>',
            '</tpl>'),

    /**
     * Template to display the results of the free text search
     * @param config
     */
    freeTextTemplate: new CQ.Ext.XTemplate(
            '<tpl for=".">',
            '<div class="search-item" qtip="{path}">',
            '<div class="search-thumb"',
            ' style="background-image:url({[CQ.HTTP.externalize(values.path,true)]}.thumb.48.48.png);"></div>' +
                    '<div class="search-text-wrapper">' +
                    '<div class="search-title">{title}</div>',
            '<div class="search-excerpt">{excerpt}</div>',
            '</div>',
            '<div class="search-separator"></div>',
            '</div>',
            '</tpl>'),

    constructor : function(config) {

        CQ.Util.applyDefaults(config, {
            width: 300,
            enableKeyEvents: true,
            hideTrigger1: true,
            validationEvent: false,
            trigger1Class: "x-form-clear-trigger",
            trigger2Class:"x-form-search-trigger",
            emptyText: CQ.I18n.getMessage("Enter search query"),
            //
            pageSize: 6,
            minChars: 1,
            typeAhead: true,
            typeAheadDelay: 100,
            loadingText: CQ.I18n.getMessage("Searching..."),
            itemSelector: "div.search-item",
            store: new CQ.Ext.data.Store({
                proxy: new CQ.Ext.data.HttpProxy( {
                    "url" :config.url ? config.url : "/bin/querybuilder.json",
                    "method" :"GET"
                }),
                paramNames: {
                    start: "p.offset",
                    limit: "p.limit"
                },
                baseParams: {
                    "_charset_": "utf-8",
                    "p.limit": "6",
                    // IsUserAdminPredicate
                    "0_group.0_type": "nt:hierarchyNode",
                    "0_group.1_type": "nt:unstructured",
                    "0_group.2_type": "cq:Console",
                    "0_group.p.or": "true"
                },
                reader: new CQ.Ext.data.JsonReader({
                    "id":"path",
                    "root":"hits",
                    "totalProperty":"total",
                    "fields" : [
                        "name",
                        "path",
                        "excerpt",
                        "title"
                    ]
                }),
                listeners: {
                    // TODO filter on the server.
                    load: function(store, records, options){
                        // Filter out the jcr:content nodes
                        if (options.params.stype == 'path-search') {
                            store.filterBy(function(record, id){
                                return record.get('name') != 'jcr:content';
                            });
                        }
                        else if (options.params.stype == 'fulltext-search') {
                            store.filterBy(function(record, id){
                                // Leaf nodes jcr:content are not filtered out
                                return ! /\/jcr:content\//.test(record.get('path'));
                            });
                        }
                    },
                    scope: this
                }
            }),
            listeners: {
                keyup : function(textField, e) {
                    var value = textField.getRawValue();
                    var trigger = textField.triggers;
                    if (value.length > 0 || textField.isTrigger1Enable) {
                        textField.triggers[0].show();
                    }
                    else {
                        textField.triggers[0].hide();
                    }

                    //
                    if (e.getKey() == e.RIGHT) {
                        var index = textField.view.getSelectedIndexes()[0];
                        var store = textField.store;
                        var record = store.getAt(index);
                        if (record) {
                            textField.setRawValue(record.id);
                            textField.onTrigger2Click();
                        }
                        textField.focus();
                    }
                },
                beforequery: function(qe){
                    var baseParams = qe.combo.store.baseParams;
                    if (qe.query.charAt(0) == "/") {
                        qe.combo.view.tpl = qe.combo.pathTemplate;
                        // Path search
                        delete baseParams.fulltext;
                        baseParams["path.exact"] = "false";
                        baseParams["path"] = qe.query;
                        baseParams["path.flat"] = true; // search only one level down
                        baseParams["stype"] = 'path-search';
                    }
                    else {
                        qe.combo.view.tpl = qe.combo.freeTextTemplate;
                        // Free text search
                        // limited to /content sub nodes
                        // executed only if length of the search string is bigger than minQueryLength
                        if (qe.query.length >= qe.combo.minQueryLength) {
                            baseParams.fulltext = qe.query + "*";
                            baseParams["path.exact"] = "false";
                            baseParams["path"] = "/content";
                            baseParams["path.flat"] = false;
                            baseParams["stype"] = 'fulltext-search';
                        }
                        else {
                            // Cancel the query
                            qe.cancel = true;
                        }
                    }
                },
                scope: this
            },

            onSelect : function(record, index){
                this.isTrigger1Enable = true;
                if(this.fireEvent('beforeselect', this, record, index) !== false){
                    this.collapse();
                    this.fireEvent('select', this, record, index);
                }
            },

            onTypeAhead : function(){
                // leave this empty to prevent setting field value on search
            }
        });

        CQ.security.ClearableSearchField.superclass.constructor.call(this, config);
    },

    initComponent: function() {
        this.triggerConfig = {
            tag:'span', cls:'x-form-twin-triggers', cn:[
                {tag: "img", src: CQ.Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger1Class},
                {tag: "img", src: CQ.Ext.BLANK_IMAGE_URL, cls: "x-form-trigger " + this.trigger2Class}
            ]};
        this.onTrigger2Click = this.onTrigger2Click.createInterceptor(function() {
            this.collapse();
        });
        this.addEvents("trigger1Click", "trigger2Click");
        CQ.security.ClearableSearchField.superclass.initComponent.call(this);
    },

    getTrigger: CQ.Ext.form.TwinTriggerField.prototype.getTrigger,

    initTrigger: CQ.Ext.form.TwinTriggerField.prototype.initTrigger,

    onTrigger1Click: CQ.Ext.form.ComboBox.prototype.onTriggerClick,

    trigger1Class: CQ.Ext.form.ComboBox.prototype.triggerClass,

    onTrigger2Click: function() {
        this.focus();
        var value = this.getRawValue();
        if (value.length > 0) {
            this.doQuery(value);
            if ( ! this.isExpanded()) {
                this.expand();
            }
        }
        this.fireEvent("trigger2Click", this);
    },

    onTrigger1Click: function() {
        this.isTrigger1Enable = false;
        this.clearValue();
        this.collapse();
        this.triggers[0].hide();
        this.fireEvent("trigger1Click", this);
    }

});

CQ.Ext.reg("rightspanel", CQ.security.RightsPanel);

/*
 * Copyright 1997-2008 Day Management AG
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
 * @class CQ.Ext.security.data.AclStore
 * @extends CQ.Ext.data.Store
 * convenience to Access ACL as AclRecords
 * @constructor
 * Creates a new Store.
 * @param {Object} config A config object containing the objects needed for the Store to access data,
 * and read the data into Records.
 */
CQ.security.data.AclStore = function(config) {
    var def = {
        reader:new CQ.Ext.data.JsonReader({root:"acl",
            id:"principal",
            totalProperty: "aces"},
                CQ.security.data.AclRecord.create())
    };
    if (!config.reader) {
        config.reader = new CQ.Ext.data.JsonReader({root:"acl",
            id: config.recId ? config.recId : "principal",
            totalProperty: "aces"},
                CQ.security.data.AclRecord.create())
    }

    CQ.Ext.applyIf(config, def);
    CQ.security.data.AclStore.superclass.constructor.call(this, config);
};

CQ.Ext.extend(CQ.security.data.AclStore, CQ.Ext.data.Store);
/*
 * Copyright 1997-2008 Day Management AG
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
 * Convenience to create a Record for ACL's.
 * Allows to access the known Fileds for this Record.
 * Thus it can be used in an interface like manner
 * 
 * @class CQ.security.data.AclRecord
 * @extends CQ.Ext.data.Record
 * @constructor
 */
CQ.security.data.AclRecord = function(data, id){
    CQ.security.data.AclRecord.superclass.constructor.call(this, data, id); 
};

CQ.security.data.AclRecord.create = function() {
    var f = CQ.Ext.extend(CQ.security.data.AclRecord, {});
    var p = f.prototype;
    p.fields = new CQ.Ext.util.MixedCollection(false, function(field) {
        return field.name;
    });
    var o = CQ.security.data.AclRecord.FIELDS;
    for (var i = 0, len = o.length; i < len; i++) {
        p.fields.add(new CQ.Ext.data.Field(o[i]));
    }
    f.getField = function(name) {
        return p.fields.get(name);
    };
    return f;
}

CQ.Ext.extend(CQ.security.data.AclRecord, CQ.Ext.data.Record, {

    get:function(key) {
        if (key.indexOf("/")>-1) {
            var privs = this.data.privileges;
            return privs? privs.get(key) : null;
        } else {
            return this.data[key];
        }
    },
    
    /**
     * Serialize the record in following format
     * [name>]:[value],
     * Thus a store can be transpoted with an parameter for each row, containing
     * the Record in this serial format 
     */
    toParam:function() {
        var res = "";
        var fs = CQ.security.data.AclRecord.FIELDS;
        for (var i=0;i<fs.length;i++) {
            var f = fs[i];
            if (f.name == "update") {
                // skip deprecated
                continue;
            }
            var val = this.get(f.name);
            if (val) {
                var name = f.mapping ? f.mapping : f.name;
                res += encodeURIComponent(name) +":" + encodeURIComponent(val)+",";
            }
        }
        return res;
    }
});

/**
 * Field definition for ACLs
 * @static
 * @final
 * @private
 * @type Array
 */
CQ.security.data.AclRecord.FIELDS = [
    {"name":"type"},
    {"name":"authorizable"},
    {"name":"principal"},
    {"name":"read"},
    {"name":"create"},
    {"name":"modify"},
    {"name":"update", "mapping":"modify"}, // backward compat
    {"name":"delete"},
    {"name":"acl_read"},
    {"name":"acl_edit"},
    {"name":"replicate"},
    {"name":"path"},
    {"name":"privileges", "convert": function(v){
        var r = new CQ.Ext.util.MixedCollection(false, function(o){return o.id});
        r.addAll(v);
        return r;
    }
    }
];




/*
 * Copyright 1997-2008 Day Management AG
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
 * Convenience to create a Reader for for Authorizables's.
 * Allows to access the known Fileds for this Record.
 * Thus it can be used in an interface like manner
 *
 * @class CQ.security.data.AuthRecord
 * @extends CQ.Ext.data.Record
 * @constructor
 */
CQ.security.data.AuthReader = CQ.Ext.extend(CQ.Ext.data.JsonReader, {

    constructor: function (config){
        config = CQ.Util.applyDefaults(config, {
            totalProperty:"results",
            root:"authorizables", id:"id"
            });
        CQ.security.data.AuthReader.superclass.constructor.call(this, config,
                CQ.security.data.AuthRecord.create(CQ.security.data.AuthRecord.FIELDS));
    }
});


/**
 * Convenience to create a Record for Authorizables's.
 * Allows to access the known Fileds for this Record.
 * Thus it can be used in an interface like manner
 *
 * @class CQ.security.data.AuthRecord
 * @extends CQ.Ext.data.Record
 * @constructor
 */
CQ.security.data.AuthRecord = function(data, id){
    CQ.security.data.AuthRecord .superclass.constructor.call(this, data, id);
};

CQ.security.data.AuthRecord.create = function() {
    var f = CQ.Ext.extend(CQ.security.data.AuthRecord, {});
    var p = f.prototype;
    p.fields = new CQ.Ext.util.MixedCollection(false, function(field) {
        return field.name;
    });
    var o = CQ.security.data.AuthRecord.FIELDS;
    for (var i = 0, len = o.length; i < len; i++) {
        p.fields.add(new CQ.Ext.data.Field(o[i]));
    }
    f.getField = function(name) {
        return p.fields.get(name);
    };
    return f;
}

CQ.Ext.extend(CQ.security.data.AuthRecord, CQ.Ext.data.Record, {

    /**
     * Serialize the record in following format
     * [name>]:[value],
     * Thus a store can be transpoted with an parameter for each row, containing
     * the Record in this serial format
     */
    toParam:function() {
        var res = "";
        var fs = CQ.security.data.AuthRecord.FIELDS;
        for (var i=0;i<fs.length;i++) {
            var f = fs[i];
            var val = this.get(f.name);
            if (val) {
                var name = f.mapping ? f.mapping : f.name;
                res += encodeURIComponent(name) +":" + encodeURIComponent(val)+",";
            }
        }
        return res;
    }
});

CQ.security.data.AuthRecord.arrayConverter = function(value) {
    if (CQ.Ext.isArray(value)) {
        var res = new Array();
        for (var i=0;i<value.length;i++){
            var rel = value[i]
            if (!rel.id) {
                continue;
            }
            var rec = new CQ.security.data.AuthRecord({}, rel.id);
            for (var j=0;j<CQ.security.data.AuthRecord.FIELDS.length;j++) {
                var f = CQ.security.data.AuthRecord.FIELDS[j];
                var val = rel[f.name];
                if (val) {
                    rec.set(f.name, val);
                }
            }
            res.push(rec);
        }
        return res;
    }
}

/**
 * Field definition for Authorizables
 * @static
 * @final
 * @private
 * @type Array
 */
CQ.security.data.AuthRecord.FIELDS = [
    {"name": "id"},
    {"name": "type"},
    {"name": "name"},
    {"name": "name_xss"},
    {"name": "email"},
    {"name": "home"},
    {"name": "givenName"},
    {"name": "givenName_xss"},
    {"name": "familyName"},
    {"name": "familyName_xss"},
    {"name": "aboutMe"},
    {"name": "rep:userId"},
    {"name": "replication"},
    {"name": "modification"},
    {"name": "memberOf", convert: CQ.security.data.AuthRecord.arrayConverter},                //todo: add converter array to rec-array
    {"name": "members", convert: CQ.security.data.AuthRecord.arrayConverter},                 //todo: add converter
    {"name": "sudoers", convert: CQ.security.data.AuthRecord.arrayConverter},                //todo: add converter array to rec-array
    {"name": "cq:authorizableCategory"}, // used by filteredauthselection of mcm
    {"name": "principal"}
];

/*
 * Copyright 1997-2008 Day Management AG
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
 * Spezialized store the access current Users access reights to given pathes.
 * Store allowes to load Acls on demand. E.g if permissions are checked while browsing
 * through a tree.
  *
 * @class CQ.Ext.security.data.UserAclStore
 * @extends CQ.secuzrity.data.Store
 * convenience to Access ACL as AclRecords
 * @constructor
 * Creates a new Store.
 * @param {Object} config A config object containing the objects needed for the Store to access data,
 * and read the data into Records.
 */
CQ.security.data.UserAclStore = CQ.Ext.extend(CQ.security.data.AclStore,{

    user: null,

    url: null,

    constructor:function(config) {
        if (!config) {
            config = {};
        }
        if (!config.reader) {
            config.reader = new CQ.Ext.data.JsonReader({
                root:"acl",
                id: "path",
                totalProperty: "aces"},
                    CQ.security.data.AclRecord.create())
        }
        this.user = CQ.User.getUserID();
        this.url = config.dataUrl ? config.dataUrl : this.user.getHome() + ".permissions" + CQ.HTTP.EXTENSION_JSON;
        CQ.security.data.AclStore.superclass.constructor.call(this, config);
    },

    /**
     * Overrides the Sotrees implemenation, in order to load acls for pathes
     * by demand.
     *
     * @param path
     * @see CQ.Ext.data.Store#getById()
     */
    getById: function(path) {
        var rec = this.data.key(path);
        if (!rec) {
            //todo: remember misses to avoid mutliple requests for empty reponses
            var data = this.requestData(path);
            if (data) {
                this.loadData(data, true);
                return this.data.key(path);
            }
        }
        return rec;
    },

    /**
     * @private
     */
    requestData:function(contentPath) {
        var idx = contentPath.lastIndexOf("/");
        if (idx<0) {
            return;
        }
        var parent;
        if (idx==0) {
            parent = "/";
        } else {
            parent = contentPath.substring(0,idx);
        }
        var url = CQ.HTTP.addParameter(this.url, "path", parent);
        url = CQ.HTTP.addParameter(url, "_charset_", "utf-8");
        url = CQ.HTTP.noCaching(url);
        var res = CQ.HTTP.get(url);
        if (CQ.HTTP.isOk(res)) {
            return CQ.Util.eval(res);
        }
    }
});
/*
 * Copyright 1997-2008 Day Management AG
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
 * The <code>CQ.UserAdmin</code> class provides the admin console for 
 * user administration.
 * @class
 * @extends CQ.Ext.Viewport
 */
CQ.security.FilterField = CQ.Ext.extend(CQ.Ext.form.TwinTriggerField, {
    width:200,

    hideTrigger1:true,

    validationEvent:false,

    validateOnBlur:false,

    trigger1Class:"x-form-clear-trigger",

    trigger2Class:"x-form-search-trigger",

    emptyText:CQ.I18n.getMessage("Enter filter query"),

    paramName:"filter",

    hasFilter:false,

    loadParams:{},


    constructor: function(config) {
       config = CQ.Util.applyDefaults(config, {"loadParams":{}});
       this.loadParams = config.loadParams;
       CQ.security.FilterField.superclass.constructor.call(this, config); 
    },

    initComponent: function() {
        CQ.security.FilterField.superclass.initComponent.call(this);

        if (!this.store.baseParams) {
            this.store.baseParams = {};
        }
        this.store.baseParams[this.paramName] = "";

        this.on("specialkey", function(f, e) {
            if (e.getKey() == e.ENTER) {
                this.onTrigger2Click();
            }
        }, this);
    },

    onTrigger1Click: function() {
        if (this.hasFilter) {
            this.loadParams[this.paramName] = "";
            this.store.reload({"params":this.loadParams});
            this.el.dom.value = "";
            this.triggers[0].hide();
            this.hasFilter = false;
            this.focus();
        }
    },

    onTrigger2Click: function() {
        var value = this.getRawValue();
        if (value.length < 1) {
            this.onTrigger1Click();
            return;
        }
        this.loadParams[this.paramName] = value;
        this.store.reload({"params":this.loadParams});
        this.hasFilter = true;
        this.triggers[0].show();
        this.focus();
    }
});

/*
 * Copyright 1997-2008 Day Management AG
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
 * The <code>CQ.security.UserAdminPanel</code> defines the Interface to tbe used
 * for communication between the UserAdmin and its dependent Widgets.
 * It is dependent on the Authorizables selected in UserAdmin.
 * While the UserAdmin is dependent on the changes made by this Widget.
 * Changes to this dependencies are communicated via Events:
 * The Admin notifies about changes to the selection on calling the
 * {@link #onSelectionChange} function.<br>
 * This Widgets sends events when a change occurs and when the change has been
 * persisted.<br>
 * The Events communicate via {@link AuthRecords}. Thus providing declaration
 * of known properties.
 *
 * @class
 */

CQ.security.UserAdminPanel = {

    /**
     * @cfg {Store} store containing all Authorizable(s) selected in the UserAdmin
     */
    selectionStore: null,

    /**
     * @cfg {String} either CQ.security.UserAdminPanel.TYPE_GROUP or CQ.security.UserAdminPanel.TYPE_USER.
     * @final 
     */
    authType: null,

    /**
     * Creates a new <code>CQ.security.UserAdminPanel</code> instance.
     *
     * @constructor
     * @param {Object} config The config object
     */
    constructor: function(config) {
        this.authType = config.authType;
        CQ.security.UserAdminPanel.constructor.superclass.constructor.call(this, config);
    },

    /**
     * @return {Store} get the store currently in use, contains AuthRecord
     * @see AuthRecord
     */
    getSelectionStore: function() {
        return this.selectionStore ? this.selectionStore : this.initialConfig.selectionStore;
    },

    /**
     * Initializes the editor.
     * @see CQ.Ext.Component#initComponent
     */
    initComponent: function() {
        CQ.security.UserAdminPanel.constructor.superclass.initComponent.call(this);

        this.addEvents(
            /**
             * @event authChanged
             * Fires to notify listeners that at least one of the
             * Authorizable set as selected, has been edited.
             * @param {UserAdminPanel} this
             * @param {AuthRecord} rec
             */
             "authChanged",

            /**
             * @event authSaved
             * Fires to notify listeners that an Authorizable has been saved.
             * @param {UserAdminPanel} this
             * @param {AuthRecord} rec
             * @param {String} field
             */
              "authSaved"
            );

        this.on({'activate':{fn:this.activationHandler}})
    },

    /**
     * Abstract method to be implemented.
     * Will be called if the UserAdmin's selection changed. 
     * @param {Store} store containing all currently selected Records 
     * @param rec
     */
    onSelectionChanged:function(store,  rec) {
    },

    /**
     * Abstract method to be implemented.
     * Will be called if the UserAdmin's selection changed.
     * @param {Store} store containing all currently selected Records
     * @param {AuthRecord / Array} of the records which have been modified while
     */
    onSelectionModfied:function(rec) {
    },

    /**
     * Abstract method to be implemented.
     * Will be called if this Widget has been activated
     * todo: check if registration to parent could be done in intComponent
     * @param {Store} store containing all currently selected Records
     * @param the containing panel
     */
    onActivate:function(selection, panel){
    },

    activationHandler:function(panel) {
      this.onActivate(this.getSelectionStore(), panel);  
    },

    selectionHandler:function(store, rec) {
        this.selectionStore = store;
        this.onSelectionChanged(store, rec);
    }
};

/**
 * @final
 */
CQ.security.UserAdminPanel.TYPE_GROUP="group";

/**
 * @final
 */
CQ.security.UserAdminPanel.TYPE_USER="user"

/*
 * Copyright 1997-2008 Day Management AG
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
 * The <code>CQ.security.UserAdminGridPanel</code> implements a GridPanel, that
 * that implements the UserAdminPanel.
 *
 * @class CQ.security.UserAdminGridPanel
 * @extends CQ.Ext.grid.GridPanel
 * @extends CQ.security.UserAdminPanel
 */
CQ.security.UserAdminGridPanel = CQ.Ext.extend(CQ.Ext.grid.GridPanel, CQ.security.UserAdminPanel);

/**
 * This Panel is to edit the Authorizables and a Set of Authorizables it has
 * a Relation to.
 * This kind of relations may be Group-Membership, Members, Sudoers.
 * The Grid allows drag&drop from the Autorhizable List.<br>
 * Posts changes to the Authorizables home path.
 *
 * @class CQ.security.AuthRelationPanel
 * @extends CQ.security.UserAdminGridPanel
 * todo: context-menus, add via button, click to open..., multi editing
 */
CQ.security.AuthRelationPanel = CQ.Ext.extend(CQ.security.UserAdminGridPanel , {

    /**
     * Defaults to multiple, changes actions-state according selection
     * @cfg {config}
     * @see SelectionModel
     */
    sm:null,

    /**
     * Defaults to name and id hidden id column
     * @cfg {ColumnModule} cm ColumnModule to use for display defaults
     */
    cm:null,

    /**
     * @cfg {string} field name of the AuthRecord to take for the current grid
     */
    field:null,

    /**
     * defaults to false
     * @cfg {boolean} allowUserAdd if users may be added to the relation,
     */
    allowUserAdd:false,

    /**
     * {boolean} indicates that the panel is in sync with the selection of the UserAdmin
     * @private
     */
    loaded:false,

    /**
     * Sumbmit action for Grid
     * @private
     * @type Action
     */
    saveAction:null,

    /**
     * Action to remove an entry from the list
     * @private
     * @type Action
     */
    removeAction:null,

    dirty:false,

    /**
     * @constructor
     */
    constructor: function(config)  {

        this.saveAction = new CQ.Ext.Action({
                text:CQ.I18n.getMessage("Save"),
                disabled:true,
                handler:this.saveHandler,
                scope:this,
                tooltip: {
                    title:CQ.I18n.getMessage("Save Changes"),
                    text:CQ.I18n.getMessage("Save changes of the profile"),
                    autoHide:true
                }
        });

        this.removeAction = new CQ.Ext.Action({
            text:CQ.I18n.getMessage("Remove"),
            handler:this.removeHandler,
            disabled:true,
            scope:this,
            tooltip: {
                title:CQ.I18n.getMessage("Remove"),
                text:CQ.I18n.getMessage("Removes selected items from the list"),
                autoHide:true
            }
        });

        var selCfg = CQ.Util.applyDefaults(config.sm,{
            singleSelect:false,
            listeners: {
                'rowselect':{
                  fn:function() {this.removeAction.enable()},
                  scope:this
                },
                'rowdeselect': {
                  fn:function() {this.removeAction.disable()},
                  scope:this
                }
            }
        });

        config.cm = new CQ.Ext.grid.ColumnModel((config.cm) ? config.cm :[
            {
                header: CQ.I18n.getMessage("Name"),
                dataIndex: "name",
                renderer: function(val, meta, rec) {
                    return CQ.shared.XSS.xssPropertyRenderer(val, meta, rec, this);
                },
                sortable:true
            },
            {
                header: CQ.I18n.getMessage("ID"),
                dataIndex:"id",
                sortable:true,
                hidden:true
            }
        ]);

        var def = {
            field:"memberOf",
            viewConfig:{ forceFit:true },
            tbar: [this.saveAction, "-", this.removeAction ]
        };
        config = CQ.Util.applyDefaults(config, def);

        var strCfg = CQ.Util.applyDefaults(config.relationStore, {
            reader: new CQ.Ext.data.ArrayReader({id:"id"},
                    CQ.security.data.AuthRecord.create()),
            autoload:false,
            listeners: {
               'add': {fn:this.onStoreChanged, scope:this},
               'remove': {fn:this.onStoreChanged, scope:this},
               'update': {fn:this.onStoreChanged, scope:this}
            }
        });

        config.store = new CQ.Ext.data.Store(strCfg);
        config.sm = new CQ.Ext.grid.RowSelectionModel(selCfg);

        CQ.security.AuthRelationPanel.superclass.constructor.call(this, config);
    },

    initComponent: function() {
        this.on("render", function(grid) {
            new CQ.security.AuthRelationPanel.DropTarget(grid.body, {
                store:this.getStore(),
                allowUser: this.initialConfig.allowUserAdd});
        });
        CQ.security.AuthRelationPanel.superclass.initComponent.call(this);
    },

    onActivate: function(store) {
        if(!this.loaded && store.getCount()>0) {
            this.reloadData(store);
        }
    },

    getField: function() {
        return this.initialConfig.field;
    },

    onSelectionChanged:function(store,  row) {
        this.loaded = false;
        var ownStore = this.getStore();
        ownStore.suspendEvents();
        ownStore.removeAll();
        ownStore.resumeEvents();
        if (!this.selectionStore) {
            this.selectionStore = store;
        }
    },

    onSelectionModfied:function(rec) {
       if (this.body) {
           this.getView().refresh();
       }
    },

    onStoreChanged: function(store, action) {
        if (store.getCount()==0) {
            this.removeAction.disable();
        }
        if (CQ.Ext.data.Record.COMMIT!=action) {
            this.saveAction.enable();
            this.dirty = true;
        } else {
            this.saveAction.disable();
            this.dirty = false;
        }

        //notfiy the selected record changed
        this.fireEvent("authChanged", this, this.getSelectionStore().getAt(0));
    },

    //todo: other panels have to update.
    //todo: adapt on multi-selection
    saveHandler:function() {
        var curRec = this.getSelectionStore().getAt(0);
        var url = curRec.get("home");
        if (!url) {
            var id = curRec.get("id");
            if (!id) {
                CQ.MessageBox.alert(CQ.I18n.getMessage("Error"), CQ.I18n.getMessage("No Authorizable selected"));
                return;
            }
            url = CQ.HTTP.externalize("/bin/security/authorizables/POST");
            url = CQ.HTTP.addParameter(url, "Authorizable", id);
        } else {
            url = CQ.HTTP.externalize(CQ.HTTP.encodePath(url));
        }
        var all = new Array();
        var allRecs = new Array();
        var params = {
            "_charset_":"utf-8",
            "memberAction": this.getField(),
            "memberEntry":all};

        var st = this.getStore();
        var cnt = st.getCount();
        for (var i=0;i<cnt;i++) {
            var rec = st.getAt(i);
            all.push(encodeURIComponent(rec.id));
            allRecs.push(rec);
        }
        var pan = this;
        curRec.beginEdit();
        curRec.data[this.getField()] = allRecs;
        CQ.HTTP.post(url, function(opt, succ){
            curRec.endEdit();
            if (succ) {
                pan.commit(curRec)
            } },
                params, this);
    },

    removeHandler: function() {
        var recs = this.getSelectionModel().getSelections();
        for(var i=0;i<recs.length;i++) {
            this.getStore().remove(recs[i]);
        }
    },

    reloadData: function(store) {
        var ownStore = this.getStore();
        for (var i=0;i<store.getCount();i++) {
            var rec = store.getAt(i);
            var rel = rec.get(this.getField());
            if (rel && CQ.Ext.isArray(rel)) {
                ownStore.suspendEvents();
                ownStore.removeAll();
                ownStore.add(rel);
                ownStore.resumeEvents();
            }
        }
        this.onSelectionModfied();
        this.loaded=true;
    },

    commit: function(rec) {
        this.getStore().commitChanges();
        this.saveAction.disable();
        this.dirty = false;
        var selStore = this.getSelectionStore();
        if (selStore.getCount()>1) {
            selStore.reload();
        }
        this.fireEvent("authSaved", this, rec, this.getField());
    }
});

/**
 * The <code>CQ.security.Membership.DropTarget</code> class represents a drop
 * target for <code>CQ.security.Membership</code>.
 *
 * @class CQ.security.Membership.DropTarget
 * @extends CQ.Ext.dd.DropTarget
 */
CQ.security.AuthRelationPanel.DropTarget = CQ.Ext.extend(CQ.Ext.dd.DropTarget, {
    store: null,
    ddGroup:"AuthorizableDD",
    dropAllowed:"x-dd-drop-ok",
    copy:false,
    allowUser:false,

    constructor: function(el, config) {
        this.store= config.store;
        this.allowUser = config.allowUser;
        CQ.security.AuthRelationPanel.DropTarget.superclass.constructor.call(this, el, config);
    },

    /**
     * Handles when the source is dropped on this drop target.
     *
     * @see CQ.Ext.dd.DropTarget#notifyDrop
     * @public
     */
    notifyDrop: function(dragSource, e, data) {
        if (!this.isAllowed(data)) {
            return false;
        }
        var sel = data.selections;
        if (sel.length) {
            var added = [];
            for(var i=0;i<sel.length;i++) {
                var rec = sel[i];
                added.push(new CQ.security.data.AuthRecord(
                {name_xss:rec.get(CQ.shared.XSS.getXSSPropertyName("name")),id:rec.id},
                        rec.id))
            }
            this.store.add(added);
        }
        return true;
    },

    /**
     * Handles when the source is over this drop target.
     *
     * @see CQ.Ext.dd.DropTarget#notifyOver
     * @public
     */
    notifyOver : function(dragSource, e, data) {
        return this.isAllowed(data) ? this.dropAllowed : this.dropNotAllowed;
    },

    isAllowed:function(data) {
       var allowed = true;
        var recs = data.selections;
        for (var i=0;i<recs.length && allowed;i++) {
            var type= recs[i].get("type");
            allowed = type=="group" || this.allowUser;
        }
        return allowed;
    }
});



/*
 * Copyright 1997-2008 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

//noinspection JSUnusedLocalSymbols
CQ.security.AuthorizableList = CQ.Ext.extend(CQ.Ext.grid.GridPanel, {

    authStore:null,

    constructor: function(config) {

        var storeConfig = CQ.Util.applyDefaults(config.store, {
            "storeId":"cq-useradmin-authstore",
            "autoLoad":true,
            "proxy": new CQ.Ext.data.HttpProxy({
                "url":"/bin/security/authorizables.json",
                "method":"GET"
            }),
            "baseParams": {
                "limit":25,
                "_charset_":"utf-8"
            },
            "reader": new CQ.security.data.AuthReader()
        });
        var authStore = new CQ.Ext.data.Store(storeConfig);
        this.authStore = authStore;
        // actions
        var actions = [];
        var disabledActions = [];
        var ctxActions = [];

        var hideUsers = new CQ.Ext.Action({
            "cls":"cq-useradmin-hideUsers",
            "text":CQ.I18n.getMessage("Hide Users"),
            "enableToggle":true,
            "toggleGroup":"hide",
            "tooltip":{
                "title":CQ.I18n.getMessage("Hide Users"),
                "text":CQ.I18n.getMessage("Press to prevent users from being listed"),
                "autoHide":true
            },
            "toggleHandler": function(button, pressed) {
                authStore.baseParams["hideUsers"] = pressed;
                authStore.load();
            }
        });
        var hideGroups = new CQ.Ext.Action({
            "cls":"cq-useradmin-hideGroups",
            "text":CQ.I18n.getMessage("Hide Groups"),
            "enableToggle":true,
            "toggleGroup":"hide",
            "tooltip":{
                "title":CQ.I18n.getMessage("Hide Groups"),
                "text":CQ.I18n.getMessage("Press to prevent groups from being listed"),
                "autoHide":true
            },
            "toggleHandler": function(button, pressed) {
                authStore.baseParams["hideGroups"] = pressed;
                authStore.load();
            }
        });
        var filter = new CQ.security.FilterField({
            "store":authStore,
            "loadParams":{"start":0}
        });
        actions.push(filter);
        if (!config.hideFilter) {
            actions.push(" ");
            actions.push(hideUsers);
            actions.push(" ");
            actions.push(hideGroups);

            actions.push("->");
            actions = actions.concat(
                    this.formatActions(config.actions, disabledActions, ctxActions));
        }

        // authorizable list (grid) config
        var cm = config.columnModel ? config.columnModel : new CQ.Ext.grid.ColumnModel([{
            "header":CQ.I18n.getMessage("Type"),
            "dataIndex":"type",
            "width":30,
            "fixed":true,
            "resizable":false,
            "hideable":false,
            "renderer":CQ.security.AuthorizableList.renderIcon
        },{
            "header":CQ.I18n.getMessage("ID"),
            "width":150,
            "dataIndex":"id"
        },{
            "header":CQ.I18n.getMessage("Name"),
            "dataIndex": "name",
            "renderer": function(val, meta, rec) {
                if(rec["data"][CQ.shared.XSS.getXSSPropertyName("givenName")]) {
                        return CQ.I18n.getMessage(
                           "{0} {1}",
                           [rec["data"][CQ.shared.XSS.getXSSPropertyName("givenName")], rec["data"][CQ.shared.XSS.getXSSPropertyName("familyName")]],
                           "name display order: {0} is the given (first) name, {1} the family (last) name"
                        );
                }
                return CQ.shared.XSS.xssPropertyRenderer(val, meta, rec, this);
            }
        },{
            "header":CQ.I18n.getMessage("Pub.", null, "Abbreviation of the word published"),
            "width":48,
            "renderer": function(v, params, record) {
                var clazz = "";
                var title = " title=\"";
                var repl = record.get("replication");
                if (repl && repl.published) {
                    if (repl.numQueued > 0) {
                        clazz = "status-pending";
                        if (repl.action == "ACTIVATE") {
                            title += CQ.I18n.getMessage("Activation pending. #{0} in Queue.", repl.numQueued);
                        } else {
                            title += CQ.I18n.getMessage("Deactivation pending. #{0} in Queue.", repl.numQueued);
                        }
                    } else {
                        title += CQ.Ext.util.Format.date(new Date(repl.published));
                        title += " (" + CQ.shared.XSS.getXSSTablePropertyValue(repl, "publishedBy") + ")";
                        if (repl.action == "ACTIVATE") {
                            clazz = "status-activated";
                        } else {
                            clazz = "status-deactivated";
                        }
                    }
                }
                title += "\"";
                return "<div" + title + " class=\"status " + clazz + "\">&nbsp;</div>";
            }
        },{
            "header":CQ.I18n.getMessage("Mod.", null, "Abbreviation of the word modified"),
            "width":48,
            "renderer": function(v, params, record) {
                var repl = record.get("replication");
                var lastMod = record.get("modification");
                var title = " title=\"";
                var clazz = "";
                if (lastMod.lastModified) {
                    title += CQ.Ext.util.Format.date(new Date(lastMod.lastModified));
                    title += " (" + CQ.shared.XSS.getXSSTablePropertyValue(lastMod, "lastModifiedBy") + ")";
                    clazz = "status-localmodified";
                }
                if (repl && repl.published) {
                    if (repl.action == "ACTIVATE") {
                        if (lastMod.lastModified > repl.published) {
                            clazz = "status-modified";
                        }
                    }
                }
                title += "\"";
                return "<div "+ title +" class=\"status " + clazz + "\">&nbsp;</div>";
            }
        }])
        cm.defaultSortable = true;

        var sm = config.selectionModel ? config.selectionModel : new CQ.Ext.grid.RowSelectionModel({
            "singleSelect":false,
            "listeners": {
                "selectionchange": function(sm) {
                    for (var i = 0; i < disabledActions.length; i++) {
                        var disabled = !sm.hasSelection();
                        var act = disabledActions[i];
                        act.setDisabled(disabled);
                        if (!disabled && act instanceof CQ.PrivilegedAction) {
                            var sels = sm.getSelections();
                            for (var j = 0; j < sels.length; j++) {
                                act.setPath(sels[j].get("home"));
                                if (act.isDisabled()) {
                                    break; // starts disabled so at least one check
                                }
                            }
                        }
                    }
                }
            }
        });

        var listeners = CQ.Util.applyDefaults(config.listeners, {
            "rowcontextmenu": function(grid, index, e) {
                if (!this.contextMenu && (ctxActions.length > 0)) {
                    this.contextMenu = new CQ.Ext.menu.Menu({
                        items:ctxActions
                    });
                }
                var xy = e.getXY();
                this.contextMenu.showAt(xy);
                e.stopEvent();
            },
            "keypress": function(e) {
                if (e.getCharCode() == e.DELETE) {
                    if (this.getSelections() && this.getSelections().length > 0) {
                        this.removeHandler()
                        e.stopEvent();
                    }
                }
            }
        });

        config = CQ.Ext.applyIf(config, {
            "autoExpandColumn":"id",
            "region":"west",
            "margins":"5 0 5 5",
            "collapsible":true,
            "collapseMode":"mini",
            "hideCollapseTool":true,
            "width":400,
            "minWidth":380,
            "split":true,
            "loadMask":true,
            "enableDragDrop":true,
            "ddGroup":"AuthorizableDD",
            "ddText":"{0} selected Authorizable(s)",
            "tbar":actions,
            "store":this.authStore,
            "cm":cm,
            "sm":sm,
            "viewConfig": {
                "forceFit":true
            },
            "listeners":listeners,
            "bbar": new CQ.Ext.PagingToolbar({
                "store":authStore,
                "pageSize":25,
                "stateful":false,
                "displayMsg": CQ.I18n.getMessage("Page {0} of {1}")
            })});

        // init component by calling super constructor
        CQ.security.AuthorizableList.superclass.constructor.call(this, config);
    },

    initComponent : function() {
        CQ.security.AuthorizableList.superclass.initComponent.call(this);

        this.addEvents({
            /**
             * @event authremoved
             * Fires to notify listeners that an Authorizable was deleted.
             * @param {CQ.security.AuthorizableList} This List
             * @param {CQ.Ext.data.Record} The deleted Record representing the Authorizable
             * @param {Number} the formar index of the record
             */
            "authremoved":true
        })

        this.authStore.on("remove", this.fireAuthRemoved, this);
    },

    updateRelation: function(rec, field) {
        var newVal = rec.get(field);
        if (newVal && CQ.Ext.isArray(newVal)) {
            var str = this.getStore();
            var rel = (field == "members") ? "memberOf" : "members";
            str.each(function(curRec/*, scope*/) {
                var shouldCont = false;
                for (var i = 0; i < newVal.length; i++) {
                    if (newVal[i].id == curRec.id) {
                        shouldCont = true;
                        break;
                    }
                }
                var val = curRec.get(rel);
                if (val && CQ.Ext.isArray(val)) {
                    for (var j = 0; j < val.length; j++) {
                        if (val[j].id == rec.id) {
                            if (!shouldCont) {
                                val.splice(j, 1);
                            }
                            return;
                        }
                    }
                }
                if (shouldCont) {
                    if (!val) {
                        val = new Array();
                        curRec.set(rel, val);
                    }
                    val.push(rec);
                }
            });
        }
    },

    // private
    formatActions: function(actionCfgs, disabledActions, ctxActions) {
        var actions = [];
        for (var a in actionCfgs) {
            if (typeof(actionCfgs[a]) != "object") {
                continue;
            }
            // check for separators, splits, ...
            if (actionCfgs[a].xtype == "separator") {
                actions.push(actionCfgs[a].value);
                if (actionCfgs[a].ctx) {
                    ctxActions.push(actionCfgs[a].value);
                }
            } else {
                if (actionCfgs[a].menu) {
                    actionCfgs[a].menu = new CQ.Ext.menu.Menu({
                        items:this.formatActions(actionCfgs[a].menu,
                                disabledActions, ctxActions)
                    });
                }
                var actionCfg = this.formatActionConfig(actionCfgs[a]);
                var action;
                if (actionCfg.privileges || actionCfg.conditions) {
                    action = new CQ.PrivilegedAction(actionCfg);
                } else {
                    action = new CQ.Ext.Action(actionCfg);
                }
                actions.push(action);

                if (actionCfg.disabled) {
                    disabledActions.push(action);
                }
                if (actionCfg.ctx) {
                    ctxActions.push(action);
                }
            }
        }
        return actions;
    },

    activationHandler:function() {
        var sm = this.getSelectionModel()
        var recs = sm.getSelections();
        var store = this.getStore();
        var msg = "<ul>";
        for (var i = 0; i < recs.length; i++) {
            msg = msg + "<li>" + recs[i].get(CQ.shared.XSS.getXSSPropertyName("name"));
        }
        msg += "</ul>";
        var actFunc = function(but) {
            if (but == "yes") {
                var path = new Array();
                for (var i = 0; i < recs.length; i++) {
                    var rec = recs[i];
                    var home = rec.get("home");
                    path.push(home);
                }
                var cb = function() {
                    sm.clearSelections();
                    CQ.Notification.notify(CQ.I18n.getMessage("Activated"), msg);
                    store.reload.defer(1000, store);
                };
                this.requestReplication(path, "Activate", cb);
            }
        }
        CQ.Ext.MessageBox.confirm(CQ.I18n.getMessage("Activate"),
                CQ.I18n.getMessage("Do you really want to activate these users/groups? {0}", msg),
                actFunc,
                this)
    },

    deactivationHandler:function() {
        var sm = this.getSelectionModel()
        var recs = sm.getSelections();
        var store = this.getStore();
        var msg = "<ul>";
        for (var i = 0; i < recs.length; i++) {
            msg = msg + "<li>" + recs[i].get(CQ.shared.XSS.getXSSPropertyName("name"));
        }
        msg += "</ul>";
        var actFunc = function(but) {
            if (but == "yes") {
                var path = new Array();
                for (var i = 0; i < recs.length; i++) {
                    var rec = recs[i];
                    var home = rec.get("home");
                    path.push(home);
                }
                var cb = function() {
                    sm.clearSelections();
                    CQ.Notification.notify(CQ.I18n.getMessage("Deactivated"), msg);
                    store.reload.defer(1000, store);
                }
                this.requestReplication(path, "DeActivate", cb);
            }
        }
        CQ.Ext.MessageBox.confirm(CQ.I18n.getMessage("Deactivate"),
                CQ.I18n.getMessage("Do you really want to deactivate these users/groups? {0}", msg),
                actFunc,
                this)
    },

    removeHandler:function() {
        var st = this.getStore();
        var sm = this.getSelectionModel()
        var recs = sm.getSelections();
        var msg = "<p>";
        for (var i = 0; i < recs.length; i++) {
            msg = msg + recs[i].get(CQ.shared.XSS.getXSSPropertyName("name")) + "<br>"
        }
        var delFunc = function(but) {
            if (but == "yes") {
                for (var i = 0; i < recs.length; i++) {
                    var rec = recs[i];
                    var params = {
                        "_charset_":"utf-8",
                        "deleteAuthorizable": rec.id};
                    CQ.HTTP.post(CQ.HTTP.encodePath(rec.get("home")),
                            function(options, success, xhr) {
                                var response = CQ.HTTP.buildPostResponseFromHTML(xhr.responseText);
                                if (CQ.utils.HTTP.isOk(response)) {
                                    st.remove(rec);
                                    st.commitChanges();
                                    CQ.Notification.notify(CQ.I18n.getMessage("Deleted"), rec.get(CQ.shared.XSS.getXSSPropertyName("name")));
                                }
                            },
                            params,
                            rec);
                }
            }
        }
        CQ.Ext.MessageBox.confirm(CQ.I18n.getMessage("Delete"),
                CQ.I18n.getMessage("Do you really want to delete these users/groups? {0}", msg),
                delFunc,
                this)
    },

    requestReplication: function(path, cmd, callback) {
        var params = {
            "_charset_":"utf-8",
            "path": path,
            "cmd":cmd
        };
        CQ.HTTP.post("/bin/replicate.json",
                function(options, success, xhr) {
                    var response = CQ.HTTP.buildPostResponseFromHTML(xhr.responseText);
                    if (CQ.HTTP.isOk(response) && callback) {
                        callback.call(this);
                    }
                },
                params,
                this);
    },

    // private
    formatActionConfig: function(config) {
        if (!config.scope) {
            config.scope = this;
        }
        if (typeof(config.handler) == "string") {
            config.handler = eval(config.handler);
        }
        if (config.text) {
            config.text = CQ.I18n.getVarMessage(config.text);
        }
        if (config.tooltip && config.tooltip.text) {
            config.tooltip.text = CQ.I18n.getVarMessage(config.tooltip.text);
        }
        if (config.tooltip && config.tooltip.title) {
            config.tooltip.title = CQ.I18n.getVarMessage(config.tooltip.title);
        }
        return config;
    },

    fireAuthRemoved: function(store, record, index) {
        this.fireEvent("authremoved", this, record, index)
    }
});

CQ.security.AuthorizableList.renderIcon = function(value) {
    if (value == "user") {
        return '<div class="userIcon">&nbsp;</div>';
    } else if (value == "group") {
        return '<div class="groupIcon">&nbsp;</div>';
    }
}

CQ.Ext.reg("authorizablelist", CQ.security.AuthorizableList);

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
 * @class CQ.security.AuthorizableSelection
 * @extends CQ.Ext.form.ComboBox
 *
 * A specialized {@link CQ.Ext.form.ComboBox ComboBox} to select and search
 * Authorizables.<p>
 * Initalizes with a default set-up of an {@link CQ.Ext.data.Store Store}
 * to access CQ.
 * The Store can be filtered by the type of Authorizables. The filter can be used
 * to let the Store either onyl conain Users or only Groups. The filter can be
 * set up via configuration.
 *
 * @constructor
 * @param {Object} config The configuration object
 *
 * @cfg {Object} storeConfig config for a store {@link CQ.Ext.data.Store} (defaults
 *               to store reading authorizables with an {@link CQ.security.data.AuthReader Authorizable Reader})
 * @cfg {String} filter can have either the value "groups" or "users".
 *               If set to groups only, Groups are searched, "users" only
 *               searches for Users. (defaults to none which means both are searched)
 * @cfg {Boolean} stateful if true the Component can make use of a State managed
 *                by {@link CQ.Ext.state.Manager Ext} (defaults to false)
 * @cfg {Number} minListWidth The minimum width of the dropdown list in pixels
 *              (defaults to 200, will be ignored if listWidth has a higher value)
 * @cfg {String} queryParam Name of the query as it will be passed on the querystring
 *              (defaults to 'filter')
 */
CQ.security.AuthorizableSelection = CQ.Ext.extend(CQ.Ext.form.ComboBox, {

    filterButtons: false,

    storeUrl: "/bin/security/authorizables.json",

    storeLimit: 25,

    filter: null,

    constructor:function(config) {

        CQ.Util.applyDefaults(config,{
            "stateful":false,
            "minChars":0,
            "minListWidth":200,
            "queryParam":"filter",
            "triggerClass": "x-form-search-trigger",
            "tpl" :new CQ.Ext.XTemplate(
                    '<tpl for=".">',
                        '<div class="cq-auth-list">',
                            '<div class="cq-auth-list-entry {[values.type=="group"? "cq-group-icon": "cq-user-icon"]}">',
                                '{[CQ.shared.XSS.getXSSTablePropertyValue(values, \"name\") == "" ? values.id : CQ.shared.XSS.getXSSTablePropertyValue(values, \"name\", 100)]}',
                            '</div>',
                        '</div>',
                    '</tpl>'),
            "itemSelector" :"div.cq-auth-list",
            "storeConfig":{
                "autoLoad":false,
                "proxy": new CQ.Ext.data.HttpProxy({
                    "url":this.storeUrl,
                    "method":"GET"
                }),
                "baseParams": {
                    "limit":this.storeLimit,
                    "_charset_":"utf-8"
                },
                "reader": new CQ.security.data.AuthReader()
            }
        });
        if (config.filter) {
            if ("groups"==config.filter) {
                config.filter = "hideUsers";
            } else if ("users"==config.filter) {
                config.filter = "hideGroups";
            } else if ("manual"==config.filter) {
                this.filterButtons = true;
            }
        }
        this.authStore = new CQ.Ext.data.Store(config.storeConfig);
        config.store = this.authStore;
        CQ.security.AuthorizableSelection.superclass.constructor.call(this, config);
    },

    /**
     * @method initComponent
     */
    initComponent: function() {
        CQ.security.AuthorizableSelection.superclass.initComponent.call(this);
        //todo: private: experimaental: add filter buttons
        if (this.filterButtons) {
            var combo = this;
            var toggle = function(button, pressed) {
                var storeFilter = combo.authStore.baseParams;
                var f = button.initialConfig.filter;
                if (f) {
                    storeFilter[f] = pressed;
                }
                delete combo.lastQuery;
            };
            this.hideUsers = new CQ.Ext.Button({
                "text":CQ.I18n.getMessage("Hide Users"),
                "enableToggle":true,
                "toggleGroup":"authExclude-"+this.getId(),
                "pressed":true,
                "filter":"hideUsers",
                "tooltip":{
                    "title":CQ.I18n.getMessage("Hide Users"),
                    "text":CQ.I18n.getMessage("Press to hide users"),
                    "autoHide":true
                },
                "toggleHandler": toggle
            });
            this.hideGroups = new CQ.Ext.Button({
                "text":CQ.I18n.getMessage("Hide Groups"),
                "enableToggle":true,
                "toggleGroup":"authExclude-"+this.getId(),
                "filter":"hideGroups",
                "tooltip":{
                    "title":CQ.I18n.getMessage("Hide Groups"),
                    "text":CQ.I18n.getMessage("Press to hide groups"),
                    "autoHide":true
                },
                "toggleHandler": toggle
            });
        }
        //todo: end of private: experimaental
        if (this.filter) {
            this.authStore.baseParams[this.filter] = "true";
        }
    },

    /**
     * @private
     */
    onRender: function(ct, pos) {
        CQ.security.AuthorizableSelection.superclass.onRender.call(this, ct, pos);

        //todo: private: experimaental
        if (this.filterButtons) {
            var b = new CQ.Ext.Toolbar({"hidden":true, "hideMode":"visibility"});
            b.render(this.wrap);
            var but = b.addButton([this.hideGroups, this.hideUsers]);
            var w = 0;
            for(var i=0;i<but.length;i++) {
                w+=but[i].getEl().getWidth();
            }
            b.setWidth(w);
            b.getEl().alignTo(b.getEl().prev(), "tr");
            this.wrap.setHeight(this.el.getHeight());
            b.show.defer(200, b);

            this.authStore.baseParams[this.hideUsers.initialConfig.filter] = true;
        }
        //todo: end of private: experimaental
    }
});

CQ.Ext.reg("authselection", CQ.security.AuthorizableSelection);

/*
 * Copyright 1997-2008 Day Management AG
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
 * The <code>CQ.security.AclEditor</code> class is used to modify permissions
 * for the current page (SideKick -> Permissions).
 * @class
 * @extends CQ.Ext.Panel
 */
CQ.security.AclEditor = CQ.Ext.extend(CQ.Ext.Panel, {

    /**
     * Grid of this combined widget
     * @private
     * @type CQ.Ext.grid.EditorGridPanel
     */
    aclList: null,

    /**
     * Store of the editable ACL grid
     * @private
     */
    aclStore: null,

    /**
     * Tree displaying authorizables
     * @private
     * @type CQ.security.AuthorizableList
     */
    authSelection: null,

    constructor: function(config) {
        // config defaults
        config = CQ.Util.applyDefaults(config, {
            "id":"cq-useradmin-wrapper",
            "layout":"border",
            "stateful":false,
            "title":CQ.I18n.getMessage("Permissions / ACL")
        });

        // effective permissions for the authorizables selected
        this.aclStore = new CQ.security.data.AclStore({
            "proxy": new CQ.Ext.data.HttpProxy({
                "url":"fake_replaced_onload",
                "method":"GET"
            })
        });

        this.aclList = new CQ.Ext.grid.EditorGridPanel({
            "autoExpandColumn":"Id",
            "region":"center",
            "store":this.aclStore,
            "viewConfig":{ forceFit:true },
            "cm":new CQ.Ext.grid.ColumnModel(CQ.security.AclEditor.COLUMNS),
            "sm":new CQ.Ext.grid.RowSelectionModel({ singleSelect:true }),
            "frame":false,
            "autoExpand":true,
            "autoShow":true
        });

        var authListCfg = {
            "width":200,
            "enableDragDrop":false,
            "hideFilter":true,
            "selectionModel": new CQ.Ext.grid.RowSelectionModel({ "singleSelect":true }),
            "anchor":"30%",
            "columnModel":new CQ.Ext.grid.ColumnModel([{
                "header":CQ.I18n.getMessage("Type"),
                "dataIndex":"type",
                "width":30,
                "fixed":true,
                "resizable":false,
                "hideable":false,
                "renderer":CQ.security.AuthorizableList.renderIcon
            },{
                "header":CQ.I18n.getMessage("Name"),
                "dataIndex":"name",
                "renderer": function(val, meta, rec) {
                    return CQ.shared.XSS.xssPropertyRenderer(val, meta, rec, this);
                }
            }
            ]),
            "listeners":{
                "rowdblclick": {
                    "fn":this.selectionAction,
                    "scope":this
                }
            }
        }
        this.authSelection = new CQ.security.AuthorizableList(authListCfg);

        config.items = [
            new CQ.Ext.Panel({
                "id":"editor",
                "region":"center",
                "stateful":false,
                "layout":"border",
                "items":[
                    this.aclList,
                    this.authSelection
                ]
            })
        ];
        CQ.security.AclEditor.superclass.constructor.call(this, config);
    },

    /**
     * Initializes the editor.
     * @see CQ.Ext.Component#initComponent
     */
    initComponent: function() {
        CQ.security.AclEditor.superclass.initComponent.call(this);

        this.addEvents(
            /**
             * @event aclchanged
             * Fires to notify listeners that an ACL was edited.
             * @param {CQ.security.AclEditor} this
             */
                "aclchanged",
            /**
             * @event aclsaved
             * Fires to notify listeners that an ACL was saved.
             * @param {CQ.security.AclEditor} this
             * @param {boolean} success
             */
                "aclsaved"
                );
        // register for internal change events
        var editor = this;
        var fireChangeEvent = function() {
            editor.fireEvent("aclchanged", editor);
        }
        this.aclStore.on("add", fireChangeEvent, this);
        this.aclStore.on("update", fireChangeEvent, this);
        this.aclStore.on("remove", fireChangeEvent, this);
    },

    load: function(path) {
        if (typeof(path) == "object") {
            this.aclStore.loadData(path);
        } else {
            this.aclStore.proxy.api.read.url = path + ".cqactions.json";
            this.aclStore.baseParams.path = path;
            this.aclStore.removeAll();
        }
    },

    reload: function() {
        this.aclStore.removeAll();
    },

    save: function() {
        var params = {
            changelog:[]
        };
        var mod = this.aclStore.getModifiedRecords();
        for (var i = 0; i < mod.length; i++) {
            var ser = this.serializeRec(mod[i]);
            params.changelog.push(ser)
        }
        var editor = this;
        CQ.HTTP.post(
                this.aclStore.baseParams.path + ".cqactions.html",
                function(options, success, response) {
                    editor.aclStore.commitChanges();
                    editor.fireEvent("aclsaved", editor, success);
                },
                params, this
                );
    },

    /**
     * Creates a new Record and inserts at the end of the grid.
     *
     * @param {CQ.Ext.grid.GridPanel} Grid selected
     * @param {Number} index
     * @private
     */
    selectionAction: function(grid) {
        var rec = grid.getSelectionModel().getSelected()
        var type = rec.get("type");
        if (type) {
            this.aclStore.load({
                params:{
                    Authorizable:rec.id,  /* TODO fixme: should be authorizableId instead */
                    acldialog:true        /* TODO fixme hint to make cqactions-servlet generate compatible json... */
                },
                add:true
            });
        }
    },

    /**
     * Create a JsonString object of an {CQ.security.AclEditor.RECORD}
     * @private
     * @param record
     */
    serializeRec: function(record) {
        var fields = CQ.security.data.AclRecord.FIELDS;
        var ser = '';
        for (var t = 0; t < fields.length; t++) {
            var field = fields[t];
            var name = field.name;
            if (name == "update") {
                // skip deprecated field
                continue;
            }
            var val = record.get(name);
            if (field.mapping) {
                name = field.mapping;
            }
            ser += name + ':' + encodeURIComponent(val) + ',';
        }
        return ser;
    }
});

/**
 * Config for the Column Editor
 * @static
 * @final
 * @private
 * @type CQ.Ext.data.Record
 */
CQ.security.AclEditor.COLUMN_EDITOR = {
    allowBlank:true,
    mode:"local",
    triggerAction:"all",
    selectOnFocus:true,
    store: [
        [ "allow", CQ.I18n.getMessage("allow")],
        [ "deny", CQ.I18n.getMessage("deny")]
    ]
};

CQ.security.AclEditor.COLUMNS_RENDERER = function(v) {
    var value = CQ.I18n.getVarMessage(v);
    if ("allow" == v) {
        return "<font color=\"green\">" + value + "</font>";
    } else if ("deny" == v) {
        return "<font color=\"red\">" + value + "</font>";
    }
    return v;
};

/**
 * Header of the Grid,
 *
 * TODO: display the Authorizable name such as selected in
 * the authorizable-list on the left side instead of the id. NOTE however, that
 * the ID must be sent back upon saving changes.
 * @static
 * @final
 * @private
 * @type Array
 */
CQ.security.AclEditor.COLUMNS = [
    {
        id:"Id",
        header:CQ.I18n.getMessage("Authorizable"),
        dataIndex:"authorizable",
        width:200,
        sortable:true,
        menuDisabled:true
    },{
    header:CQ.I18n.getMessage("Read"),
    dataIndex:"read",
    width:80,
    editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),
    resizable:false,
    menuDisabled:true,
    renderer:CQ.security.AclEditor.COLUMNS_RENDERER
},{
    header:CQ.I18n.getMessage("Modify"),
    dataIndex:"modify",
    width:80,
    editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),
    resizable:false,
    menuDisabled:true,
    renderer:CQ.security.AclEditor.COLUMNS_RENDERER
},{
    header:CQ.I18n.getMessage("Create"),
    dataIndex:"create",
    width:80,
    editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),
    resizable:false,
    menuDisabled:true,
    renderer:CQ.security.AclEditor.COLUMNS_RENDERER
},{
    header:CQ.I18n.getMessage("Delete"),
    dataIndex:"delete",
    width:80,
    editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),
    resizable:false,
    menuDisabled:true,
    renderer:CQ.security.AclEditor.COLUMNS_RENDERER
},{
    header:CQ.I18n.getMessage("Read ACL"),
    dataIndex:"acl_read",
    width:80,
    editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),
    resizable:false,
    menuDisabled:true,
    renderer:CQ.security.AclEditor.COLUMNS_RENDERER
},{
    header:CQ.I18n.getMessage("Write ACL"),
    dataIndex:"acl_edit",
    width:80,
    editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),
    resizable:false,
    menuDisabled:true,
    renderer:CQ.security.AclEditor.COLUMNS_RENDERER
},{
    header:CQ.I18n.getMessage("Replicate "),
    dataIndex:"replicate",
    width:80,
    editor:new CQ.Ext.form.ComboBox(CQ.security.AclEditor.COLUMN_EDITOR),
    resizable:false,
    menuDisabled:true,
    renderer:CQ.security.AclEditor.COLUMNS_RENDERER
}
];
/*
 * Copyright 1997-2008 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

CQ.security.UserProperties = CQ.Ext.extend(CQ.Ext.Panel, {

    userForm: null,

    groupForm: null,

    currentRecord:  null,

    activeForm: null,

    hiddenForm: null,

    dirty: false,

    dirtyUser: false,

    dirtyGroup: false,

    constructor: function(config) {
        var formListeners =  {
            "show": function() {
                // [Bug 32233] Security GUI: User properties panel stays blank in safari/chrome
                this.el.setVisible(true);

                // needed due to bug #29146 (toolbar not visible)
                this.syncSize();
            }
        };
        this.userForm = new CQ.Ext.form.FormPanel({
            "baseParams": {
                "_charset_":"utf-8"
            },
            "border":false,
            "bodyStyle":"padding:5px;",
            "anchor":"100% 80%",
            "hidden":true,
            "defaults":{
                "enableKeyEvents": true,
                "listeners":{
                    "change": {
                        "fn":this.enableUserSaveButton,
                        "scope":this
                    },
                    "keyup": {
                        "fn":this.enableUserSaveButton,
                        "scope":this
                    }
                }
            },
            "items":[{
                    "xtype":"textfield",
                    "fieldLabel":CQ.I18n.getMessage("Login"),
                    "anchor":"100%",
                    "disabled":true,
                    "allowBlank":false,
                    "name":"rep:userId"
                },{
                    "xtype":"textfield",
                    "fieldLabel":CQ.I18n.getMessage("First Name"),
                    "anchor":"100%",
                    "name":"givenName"
                },{
                    "xtype":"textfield",
                    "fieldLabel":CQ.I18n.getMessage("Last Name"),
                    "anchor":"100%",
                    "name":"familyName",
                    "allowBlank":false
                },{
                    "xtype":"textfield",
                    "fieldLabel":CQ.I18n.getMessage("Mail"),
                    "anchor":"100%",
                    "vtype":"email",
                    "msgTarget":"under",
                    "name":"email"
                },{
                    "xtype":"textarea",
                    "fieldLabel":CQ.I18n.getMessage("About"),
                    "anchor":"100% -155",
                    "name":"aboutMe"
                },{
                    "xtype":"textfield",
                    "fieldLabel":CQ.I18n.getMessage("Path"),
                    "anchor":"100%",
                    "disabled":true,
                    "name":"home"
            }],
            "tbar":[],
            "listeners":formListeners
        });

        this.pwdButtons = new CQ.Ext.util.MixedCollection();
        this.pwdButtons.addAll([new CQ.Ext.Toolbar.Button({
            	"text":CQ.I18n.getMessage("Set Password"),
                "tooltip": CQ.I18n.getMessage("Set Password"),
                "handler":this.setPassword,
                "scope":this.userForm
            }),
            new CQ.Ext.Toolbar.Separator()]);

        var tb = this.userForm.getTopToolbar();
        for (var i=0;i<this.pwdButtons.length;i++) {
        	tb.add(this.pwdButtons.get(i));
        }
        tb.add({
            "id":"cq-useradmin-userproperties-save",
            "disabled":true,
            "text":CQ.I18n.getMessage("Save"),
            "tooltip": {
                "title":CQ.I18n.getMessage("Save Changes"),
                "text":CQ.I18n.getMessage("Save changes of the profile"),
                "autoHide":true
            },
            "handler":this.saveHandler,
            "scope":this.userForm
        });

        this.groupForm = new CQ.Ext.form.FormPanel({
            "baseParams": {
                "_charset_":"utf-8"
            },
            "border":false,
            "bodyStyle":"padding:5px;",
            "anchor":"100% 80%",
            "hidden":true,
            "defaults":{
                "enableKeyEvents": true,
                "listeners":{
                    "change": {
                        "fn":this.enableGroupSaveButton,
                        "scope":this
                    },
                    "keyup": {
                        "fn":this.enableGroupSaveButton,
                        "scope":this
                    }
                }
            },
            "items":[{
                    "xtype":"textfield",
                    "fieldLabel":CQ.I18n.getMessage("ID"),
                    "anchor":"100%",
                    "disabled":true,
                    "allowBlank":false,
                    "name":"id"
                },{
                    "xtype":"textfield",
                    "fieldLabel":CQ.I18n.getMessage("Name"),
                    "anchor":"100%",
                    "name":"givenName"
                },{
                    "xtype":"textfield",
                    "fieldLabel":CQ.I18n.getMessage("Mail"),
                    "anchor":"100%",
                    "vtype":"email",
                    "msgTarget":"under",
                    "name":"email"
                },{
                    "xtype":"textarea",
                    "fieldLabel":CQ.I18n.getMessage("About"),
                    "anchor":"100% -155",
                    "name":"aboutMe"
                },{
                    "xtype":"textfield",
                    "fieldLabel":CQ.I18n.getMessage("Path"),
                    "anchor":"100%",
                    "disabled":true,
                    "name":"home"
            }],
            "tbar":[],
            "listeners":formListeners
        });
        tb = this.groupForm.getTopToolbar();
        tb.add({
            "id":"cq-useradmin-groupproperties-save",
            "disabled":true,
            "text":CQ.I18n.getMessage("Save"),
            "tooltip": {
                "title":CQ.I18n.getMessage("Save Changes"),
                "text":CQ.I18n.getMessage("Save changes of the profile"),
                "autoHide":true
            },
            "handler":this.saveHandler,
            "scope":this.groupForm
        });

        CQ.Util.applyDefaults(config, {
            layout:"form",
            bodyStyle:"padding:0px;",
            labelWidth:75,
            title:CQ.I18n.getMessage("Properties"),
            items: [this.userForm, this.groupForm],
            listeners: {
                show: function(){
                    if (this.activeForm)
                        this.activeForm.show();
                    if (this.hiddenForm)
                        this.hiddenForm.hide();
                }
            }
        });
        CQ.security.UserProperties.superclass.constructor.call(this, config);
    },

    enableUserSaveButton: function(enable) {
        if (enable !== false) enable = true;
        if (this.dirtyUser != enable) {
            this.dirtyUser = this.dirty = enable;
            var sB = CQ.Ext.getCmp("cq-useradmin-userproperties-save");
            if (sB){
                if (enable) {
                    sB.enable();
                } else {
                    sB.disable();
                }
            }
        }
    },

    enableGroupSaveButton: function(enable) {
        if (enable !== false) enable = true;
        if (this.dirtyGroup != enable) {
            this.dirtyGroup = this.dirty = enable;
            var sB = CQ.Ext.getCmp("cq-useradmin-groupproperties-save");
            if (sB){
                if (enable) {
                    sB.enable();
                } else {
                    sB.disable();
                }
            }
        }
    },

    loadRecord: function(rec) {
        this.enableUserSaveButton(false);
        this.enableGroupSaveButton(false);
        var type = rec.get("type");
        if (type=="user") {
            this.activeForm = this.userForm;
            this.hiddenForm = this.groupForm;
    		if (rec.id==CQ.security.UserProperties.ADMIN_ID) {
    			this.pwdButtons.each(function(bt) {bt.hide(); return true;} )
    		} else {
    			this.pwdButtons.each(function(bt) {bt.show(); return true;} )
    		}
        } else {
            this.activeForm = this.groupForm;
            this.hiddenForm = this.userForm;
        }
        this.activeForm.getForm().loadRecord(rec);
        this.activeForm.currentRecord = rec;
    },

    unloadRecord: function(rec) {
        if (!this.groupForm.hidden) {
            this.groupForm.hide();
            this.groupForm.currentRecord = null;
        } else {
            this.userForm.hide();
            this.userForm.currentRecord = null;
        }
    },

    saveHandler: function() {
        var frm = this.getForm();
        var url = CQ.security.UserProperties.getUrl(frm);
        var action = new CQ.form.SlingSubmitAction(frm, {
            clientValidation:false,
            url:url,
            success:function(form) {
                form.updateRecord(this.currentRecord);
                this.ownerCt.enableUserSaveButton(false);
                this.ownerCt.enableGroupSaveButton(false);
                CQ.Notification.notify(CQ.I18n.getMessage("OK"),CQ.I18n.getMessage("changes saved"));
            },
            failure:function(form, action) {
                CQ.Notification.notify(CQ.I18n.getMessage("Failure"),
                        action.response.statusText);
            },
            scope:this
        });
        frm.doAction(action);
    },

    setPassword : function() {
        var dialogCfg = {
            "width":400,
            "height":200,
            "jcr:primaryType": "cq:Dialog",
            "title":CQ.I18n.getMessage("Set Password"),
            "formUrl":CQ.security.UserProperties.getUrl(this.getForm()),
            "params": {
                "_charset_":"utf-8"
            },
            "items": {
                "jcr:primaryType": "cq:Panel",
                "items": {
                    "jcr:primaryType": "cq:WidgetCollection",
                    "password": {
                        "inputType":"password",
                        "fieldLabel":CQ.I18n.getMessage("Password"),
                        "name":"rep:password",
                        "allowBlank":false,
                        "msgTarget":"under"
                    },
                    "password2": {
                        "inputType":"password",
                        "fieldLabel":CQ.I18n.getMessage("Confirm Password"),
                        "name":"rep:password",
                        "allowBlank":false,
                        "msgTarget":"under",
                        "validator":function(value) {
                            var pwd = this.ownerCt.items.get(0).getRawValue();
                            if (pwd == value) {
                                return true;
                            }
                            return CQ.I18n.getMessage("Provided passwords do not match.");
                        }
                    }
                }
            },
            "okText":CQ.I18n.getMessage("Set"),
            "buttons": CQ.Dialog.OKCANCEL
        };
        var rec = this.currentRecord;
        var dialog = CQ.Util.build(dialogCfg);
        dialog.success = function(form) {
            form.updateRecord(rec);
            CQ.Notification.notify(CQ.I18n.getMessage("OK"),CQ.I18n.getMessage("changes saved"));
        };
        dialog.failure = function() {
            CQ.Notification.notify(CQ.I18n.getMessage("Failure"),CQ.I18n.getMessage("Could not set Password"));
        };
        dialog.show();
    }
});

CQ.security.UserProperties.getUrl = function(frm){
        var f = frm.findField("home");
        if (f) {
            var url = f.getValue();
            if (!url) {
                url = CQ.HTTP.externalize("/bin/security/authorizables/POST");
                url = CQ.HTTP.addParameter(url, "Authorizable", frm.findField("id").getValue());
            } else {
                url = CQ.HTTP.externalize(CQ.HTTP.encodePath(url));
            }
            return url;
        }
    };

CQ.security.UserProperties.ADMIN_ID = "admin";
/*
 * Copyright 1997-2008 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

CQ.security.Preferences = CQ.Ext.extend(CQ.Ext.Panel, {

    form: null,

    currentRecord:  null,

    languageStore: null,

    winModeStore: null,

    fieldCfgs: {},

    dirty: false,

    enableSaveButton: function() {
        var sB = CQ.Ext.getCmp("cq-useradmin-preferences-save");
        if (sB){
            sB.enable();
            this.dirty = true;
        }
    },

    constructor: function(config) {

        this.fieldCfgs = [{
            "id":"cq-useradmin-preferences-language",
            "width":"350px",
            "xtype":"selection",
            "type":"select",
            "listeners": {
                "selectionchanged": {fn:this.enableSaveButton, scope:this}
            },
            "options": [
                {"value":"en","text":CQ.I18n.getMessage("English")},
                {"value":"de","text":CQ.I18n.getMessage("German")},
                {"value":"fr","text":CQ.I18n.getMessage("French")},
                {"value":"es","text":CQ.I18n.getMessage("Spanish")},
                {"value":"it","text":CQ.I18n.getMessage("Italian")},
                {"value":"zh-cn","text":CQ.I18n.getMessage("Chinese")},
                {"value":"ja","text":CQ.I18n.getMessage("Japanese")}
            ],
            "name":CQ.security.Preferences.PREFERENCE_LANGUAGE,
            "fieldLabel":CQ.I18n.getMessage("Language")
        },{
            "id":"cq-useradmin-preferences-winmode",
            "width":"350px",
            "xtype":"selection",
            "type":"select",
            "listeners": {
                "selectionchanged": {fn:this.enableSaveButton, scope:this}
            },
            "options": [
                {"value":"single","text":CQ.I18n.getMessage("Single Window")},
                {"value":"multi","text":CQ.I18n.getMessage("Multiple Windows")}
            ],
            "name":CQ.security.Preferences.PREFERENCE_WINMODE,
            "fieldDescription":CQ.I18n.getMessage("Allow links to open in new windows or force reuse of the existing one"),
            "fieldLabel":CQ.I18n.getMessage("Window Management")
        },{
            "id":"cq-useradmin-preferences-toolbar",
            "fieldDescription":CQ.I18n.getMessage("Show or hide the global editing toolbar"),
            "fieldLabel":CQ.I18n.getMessage("Editing Toolbar"),
            "width":"350px",
            "name":CQ.security.Preferences.PREFERENCE_TOOLBAR,
            "type":"select",
            "xtype":"selection",
            "listeners": {
                "selectionchanged": {fn:this.enableSaveButton, scope:this}
            },
            "options": [
                {
                    "text":CQ.I18n.getMessage("Show when needed (Default)", null, "Show the toolbar when needed"),
                    "value":"ondemand"
                },{
                    "text":CQ.I18n.getMessage("Always show", null, "Always show the toolbar"),
                    "value":"always"
                },{
                    "text":CQ.I18n.getMessage("Keep hidden", null, "Keep the toolbar hidden"),
                    "value":"never"
                }
            ]
        },{
            "xtype":"hidden",
            "name":"home"
        }];

        this.form = new CQ.Ext.form.FormPanel({
            "baseParams": {
                "_charset_":"utf-8"
            },
            "border":false,
            "bodyStyle":"padding:5px;",
            "anchor":"100% 80%",
            "items": this.fieldCfgs,
            "listeners": {
                "render":function(){
                    // hack needed to make selections appear
                    var form = this;
                    setTimeout(function(){form.doLayout();}, 1);
                }
            },
            "tbar":[{
                "id":"cq-useradmin-preferences-save",
                "disabled":true,
                "text":CQ.I18n.getMessage("Save"),
                "tooltip": CQ.I18n.getMessage("Save Changes"),
                "handler":this.saveHandler,
                "scope":this
            }]});

        CQ.Util.applyDefaults(config, {
            "layout":"form",
            "bodyStyle":"padding:0px;",
            "labelWidth":75,
            "title":CQ.I18n.getMessage("Preferences"),
            "items": [this.form]
        });
        CQ.security.Preferences.superclass.constructor.call(this, config);
    },

    /**
     * Load the preferences of the user and set the values of the formfields
     * @param rec auf the Authorizable to load from
     */
    loadRecord: function(rec) {
        var path = CQ.HTTP.encodePath(rec.get("home"));
        var url = path + ".preferences" + CQ.HTTP.EXTENSION_JSON;
        url = CQ.HTTP.noCaching(url);
        var res = CQ.HTTP.get(url);
        if (CQ.HTTP.isOk(res)) {
            this.currentRecord = new CQ.data.SlingRecord(CQ.Util.eval(res));
            this.loadForm(this.currentRecord);
        } else {
            this.currentRecord = null;
        }
    },

    /**
     * @param rec of the authorizable to remove from panel
     */
    unloadRecord: function(rec) {
        this.currentRecord = null;
    },

    /**
     * @param rec to set the form-fields from
     */
    loadForm: function(rec) {
        if (!rec) {
            return;
        }
        for (var i = 0; i < this.fieldCfgs.length; i++) {
            var fieldCfg = this.fieldCfgs[i];
            if (!fieldCfg.id) {
                continue;
            }
            var field = CQ.Ext.getCmp(fieldCfg.id);
            var value = rec.get(fieldCfg.name);
            if (!value && field.getName(CQ.security.Preferences.PREFERENCE_LANGUAGE)) {
                value = rec.get(CQ.security.Preferences.PREFERENCE_LANGUAGE_OLD);
            }
            field.setValue(value);
        }
    },

    saveHandler: function() {
        if (this.currentRecord) {
            var uri = this.currentRecord.get("path");
            if (uri) {
                uri = CQ.HTTP.externalize(CQ.HTTP.encodePath(uri));
                var prefs = this;
                var frm = this.form.getForm();
                var action = new CQ.form.SlingSubmitAction(frm, {
                    "clientValidation":false,
                    "url":uri,
                    "success":function(form) {
                        var sB = CQ.Ext.getCmp("cq-useradmin-preferences-save");
                        if (sB){
                            sB.disable();
                        }
                        prefs.dirty = false;
                        CQ.Notification.notify(CQ.I18n.getMessage("OK"),CQ.I18n.getMessage("Preferences saved"));
                    },
                    "failure":function(form, action) {
                        CQ.Notification.notify(CQ.I18n.getMessage("Failure"),
                                action.response.statusText);
                    },
                    "scope":this
                });
                frm.doAction(action);
                return;
            }
        }
        CQ.Notification.notify(CQ.I18n.getMessage("Failure"),CQ.I18n.getMessage("No User selected"));
    }
});

// property path
CQ.security.Preferences.PREFERENCE_LANGUAGE = "./language";
CQ.security.Preferences.PREFERENCE_LANGUAGE_OLD = "./platform/language";
CQ.security.Preferences.PREFERENCE_WINMODE = "./winMode";
CQ.security.Preferences.PREFERENCE_TOOLBAR = "./toolbarDisplay";

/*
 * Copyright 1997-2008 Day Management AG
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
 * The <code>CQ.security.UserAdmin</code> class provides the admin console for
 * user administration.
 * @class UserAdmin
 * @extends CQ.Ext.Viewport
 */
CQ.security.UserAdmin = CQ.Ext.extend(CQ.Ext.Viewport, {

    tabs:[],

    /**
     * Creates a new <code>CQ.security.UserAdmin</code> instance.
     *
     * Example:
     * <pre><code>
     var admin = new CQ.security.UserAdmin({
     });
     </pre></code>
     * todo: paginate users
     * @constructor
     * @param {Object} config The config object
     */
    constructor: function(config) {
        var selectCfg = CQ.Util.applyDefaults(config, {
            "proxy": new CQ.Ext.data.HttpProxy({
                "url":"/bin/security/authorizables.json",
                "method":"GET"
            }),
            "baseParams": {
                "hideGroups":false,
                "hideUsers":false
            }
        });
        this.selectionStore = new CQ.Ext.data.Store(selectCfg);
        this.debug = config.debug;
        this.selectionBar = new CQ.Ext.Toolbar({
            "region":"north",
            "minHeight":21,
            "style":"height:21px",
            "items":[ new CQ.Ext.DataView({
                "store": this.selectionStore,
                "tpl": new CQ.Ext.XTemplate(
                        '<tpl for=".">',
                            '<div class="{[values.type=="user" ? "userIcon" : "groupIcon"]}">',
                            '{[this.renderItem(values)]}',
                            '</div>',
                        '</tpl>',
                        {
                            renderItem: function(values) {
                                if(values[CQ.shared.XSS.getXSSPropertyName("givenName")]) {
                                        return CQ.I18n.getMessage(
                                           "{0} {1}",
                                           [values[CQ.shared.XSS.getXSSPropertyName("givenName")], values[CQ.shared.XSS.getXSSPropertyName("familyName")]],
                                           "name display order: {0} is the given (first) name, {1} the family (last) name"
                                        );
                                }
                                return values[CQ.shared.XSS.getXSSPropertyName("name")] == "" ?
                                        values.id : values[CQ.shared.XSS.getXSSPropertyName("name")];
                            }
                        }
                        ),
                "id":"user-selection",
                "autoHeight":true,
                "multiSelect": true,
                "itemSelector":':first-child'
            }), "->", CQ.wcm.HelpBrowser.createHelpButton()
            ]
        });

        this.userProperties = new CQ.security.UserProperties({"hidden":true});
        this.tabs.push(this.userProperties);

        this.membership = new CQ.security.AuthRelationPanel({
            "listeners":{
                'authSaved':{
                    "fn":this.dispatchAuthSaved,
                    "scope":this
                }
            },
            "disabled":true,
            "field":"memberOf",
            "title":CQ.I18n.getMessage("Groups")
        });
        this.tabs.push(this.membership);
        this.members = new CQ.security.AuthRelationPanel({
            "authType": CQ.security.UserAdminPanel.TYPE_GROUP,
            "listeners":{
                'authSaved':{
                    "fn":this.dispatchAuthSaved,
                    "scope":this
                }
            },
            "disabled":true,
            "field":"members",
            "allowUserAdd":true,
            "title":CQ.I18n.getMessage("Members")
        });
        this.tabs.push(this.members);
        var authlist = CQ.Util.applyDefaults(config.authlist,{
            "anchor":"30%",
            "listeners":{
                "rowdblclick": {
                    "fn":this.selectionHandler,
                    "scope":this
                },
                "authremoved" : {
                    "fn":this.removeHandler,
                    "scope":this
                }
            }
        });
        this.list = new CQ.security.AuthorizableList(authlist);

        // Permission panel
        var rights = new CQ.security.RightsPanel({
            listeners:{
                authSaved: function(panel, record, field){
                    this.loadRecord(record);
                    this.dispatchAuthSaved(panel, record, field);
                },
                scope: this
            }
        });
        this.tabs.push(rights);

        this.tabs.push(new CQ.security.AuthRelationPanel({
            "authType": CQ.security.UserAdminPanel.TYPE_USER,
            "disabled":true,
            "allowUserAdd":true,
            "field":"sudoers",
            "title":CQ.I18n.getMessage("Impersonators")})
        );
        this.tabs.push(new CQ.security.Preferences({}));

        this.tabPanel = new CQ.Ext.TabPanel({
            region:"center",
            border:false,
            enableTabScroll:true,
            defaults:{
                autoScroll:true
            },
            items:this.tabs,
            activeTab:0
        });

        // init component by calling super constructor
        CQ.security.UserAdmin.superclass.constructor.call(this, {
            "id":"cq-useradmin",
            "layout":"border",
            "renderTo":"CQ",
            "items": [{
                    "id":"cq-useradmin-wrapper",
                    "xtype":"panel",
                    "layout":"border",
                    "region":"center",
                    "border":false,
                    "items": [{
                            "id":"cq-header",
                            "xtype":"container",
                            "autoEl":"div",
                            "region":"north",
                            "items": [{
                                    "xtype":"panel",
                                    "border":false,
                                    "layout":"column",
                                    "cls": "cq-header-toolbar",
                                    "items": [
                                        new CQ.Switcher({}),
                                        new CQ.UserInfo({}),
                                        new CQ.HomeLink({})
                                    ]
                                }
                            ]
                        },{
                        "xtype":"panel",
                        "region":"center",
                        "layout":"border",
                        "id":"editor",
                        "items":[
                            this.list,
                            {
                                "xtype":"panel",
                                "layout":"border",
                                "region":"center",
                                "margins":"5 5 5 0",
                                "items":[
                                    this.selectionBar,
                                    this.tabPanel
                                ]
                            }
                        ]
                    }
                    ]
                }
            ]
        });

        window.onbeforeunload = CQ.security.UserAdmin.checkModifications;
        //cleanup event
        CQ.Ext.EventManager.addListener(window,"unload", function() {
            window.onbeforeunload = null;
        });
    },

    loadRecord:function(rec) {
        var store = this.selectionStore;
        if (store) {
            store.removeAll();
            store.add(rec);
            store.baseParams.id=[rec.id]
        }
        for (var i=0;i<this.tabs.length;i++) {
            var tab = this.tabs[i];
            if (!tab.disabled && tab.loadRecord) {
                tab.loadRecord(rec);
            } else if (tab.onSelectionChanged) {
                tab.onSelectionChanged(store, rec);
            }
        }
    },

    unloadRecord:function(rec) {
        var store = this.selectionStore;
        for (var i=0;i<this.tabs.length;i++) {
            var tab = this.tabs[i];
            if (!tab.disabled && tab.unloadRecord) {
                tab.unloadRecord(rec);
            } else if (tab.onSelectionChanged) {
                tab.onSelectionChanged(store, rec);
            }
        }
    },

    switchVisibilty: function(type) {
        for (var i=0;i<this.tabs.length;i++) {
            var tab = this.tabs[i];
            if (!tab.authType || tab.authType==type) {
                tab.enable();
            } else {
                tab.disable();
            }
        }
    },

    selectionHandler: function(grid/*,rowIdx,eventObj*/) {
        var sel = grid.getSelectionModel();
        if (sel.hasSelection()) {
            var modMsg = CQ.security.UserAdmin.checkModifications();
            if (!modMsg || confirm(modMsg)) {
                var rec = sel.getSelected();
                this.tabPanel.activate(this.userProperties);
                this.switchVisibilty(rec.get("type"));
                this.loadRecord(rec);
                this.tabPanel.getActiveTab().show();
                sel.clearSelections();
            }
        }
    },

    removeHandler:function(authGrid, rec/*, index*/) {
        var store = this.selectionStore;
        if (store) {
            var sel = store.query("id", rec.id);
            if (sel.length > 0) {
                for (var j = 0; j < sel.length; j++) {
                    var selected = sel.itemAt(j);
                    this.unloadRecord(selected)
                    store.remove(selected);
                }
            }

            if (store.getCount()==0) {
                this.tabPanel.activate(this.userProperties);
                for (var i=1;i<this.tabs.length;i++) {
                    this.tabs[i].disable();
                }
            }
        }
    },

    dispatchAuthSaved:function(source, rec, field) {
        for(var i=0;i<this.tabs.length;i++) {
            var t = this.tabs[i];
            if (t!=source && t.onSelectionModfied) {
                t.onSelectionModfied(rec, field);
            }
        }
        if (this.list) {
            this.list.updateRelation(rec, field);
        }
    }

});

CQ.security.UserAdmin.checkModifications = function() {
    var admin = CQ.Ext.getCmp("cq-useradmin");
    if (admin) {
        for (var i = 0; i < admin.tabs.length; i++) {
            if (admin.tabs[i].dirty) {
                return CQ.I18n.getMessage("There are unsaved changes for the user or group currently being edited.");
            }
        }
    }
};

CQ.UserAdmin = CQ.security.UserAdmin;
CQ.Ext.reg("useradmin", CQ.security.UserAdmin);

/*
 * Copyright 1997-2008 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

CQ.security.UserAdmin.createUser = function() {
    var createUserDialog = {
        "jcr:primaryType": "cq:Dialog",
        "title":CQ.I18n.getMessage("Create User"),
        "formUrl":"/libs/cq/security/authorizables/POST",
        "params": {
            "_charset_":"utf-8"
        },
        "items": {
            "jcr:primaryType": "cq:Panel",
            "items": {
                "jcr:primaryType": "cq:WidgetCollection",
                "login": {
                    "fieldLabel":CQ.I18n.getMessage("Login ID"),
                    "emptyText":CQ.I18n.getMessage("Enter login for the user"),
                    "allowBlank":false,
                    "name":"rep:userId",
                    "msgTarget":"under",
                    "vtype":"authorizableId"
                },
                "fname": {
                    "fieldLabel":CQ.I18n.getMessage("First Name"),
                    "name":"givenName",
                    "msgTarget":"under"
                },
                "name": {
                    "fieldLabel":CQ.I18n.getMessage("Last Name"),
                    "allowBlank":false,
                    "name":"familyName",
                    "msgTarget":"under"
                },
                "mail": {
                    "fieldLabel":CQ.I18n.getMessage("Mail"),
                    "vtype":"email",
                    "name":"email",
                    "msgTarget":"under"
                },
                "password": {
                    "inputType":"password",
                    "fieldLabel":CQ.I18n.getMessage("Password"),
                    "name":"rep:password",
                    "allowBlank":false,
                    "msgTarget":"under"
                },
                "password2": {
                    "inputType":"password",
                    "fieldLabel":CQ.I18n.getMessage("Confirm Password"),
                    "name":"rep:password",
                    "allowBlank":false,
                    "msgTarget":"under",
                    "validator":function(value) {
                        var pwd = this.ownerCt.items.get(4).getRawValue();
                        if (pwd == value) {
                            return true;
                        }
                        return CQ.I18n.getMessage("Provided passwords do not match.");
                    }
                },
                "intermediatepath": {
                    "fieldLabel":CQ.I18n.getMessage("Path"),
                    "xtype":"pathfield",
                    "rootPath":"/home/users",
                    "predicate":"authorizablefolder",
                    "showTitlesInTree":false,
                    "name":"intermediatePath",
                    "msgTarget":"under"
                }
            }
        },
        "okText":CQ.I18n.getMessage("Create")
    };
    var dialog = CQ.WCM.getDialog(createUserDialog);
    dialog.failure = function(dlg, xhr) {
        var txt;
        try {
            var resp = CQ.HTTP.buildPostResponseFromHTML(xhr.response.responseText);
            txt = resp.headers[CQ.HTTP.HEADER_MESSAGE];
        }
        catch(e){
            txt = CQ.I18n.getMessage("Failed to create user");
        }
        CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"), txt);
    };
    dialog.success = function() {
        var st = CQ.Ext.StoreMgr.lookup("cq-useradmin-authstore");
        st.reload.defer(500, st);
    };
    dialog.show();
};

CQ.security.UserAdmin.createGroup = function() {
    var createGroupDialog = {
        "jcr:primaryType": "cq:Dialog",
        "title":CQ.I18n.getMessage("Create Group"),
        "formUrl":"/libs/cq/security/authorizables/POST",
        "params": {
            "_charset_":"utf-8"
        },
        "items": {
            "jcr:primaryType": "cq:Panel",
            "items": {
                "jcr:primaryType": "cq:WidgetCollection",
                "login": {
                    "fieldLabel":CQ.I18n.getMessage("ID"),
                    "emptyText":CQ.I18n.getMessage("Enter ID for the group"),
                    "allowBlank":false,
                    "name":"groupName",
                    "msgTarget":"under",
                    "vtype": "authorizableId"
                },
                "fname": {
                    "fieldLabel":CQ.I18n.getMessage("Group Name"),
                    "name":"givenName",
                    "msgTarget":"under"
                },
                "description": {
                    "fieldLabel":CQ.I18n.getMessage("Description"),
                    "name":"aboutMe",
                    "msgTarget":"under"
                },
                "intermediatepath": {
                    "fieldLabel":CQ.I18n.getMessage("Path"),
                    "xtype":"pathfield",
                    "rootPath":"/home/groups",
                    "predicate":"authorizablefolder",
                    "showTitlesInTree":false,
                    "name":"intermediatePath",
                    "msgTarget":"under"
                }
            }
        },
        "okText":CQ.I18n.getMessage("Create")
    };
    var dialog = CQ.WCM.getDialog(createGroupDialog);
    dialog.failure = function(dlg, xhr) {
        var txt;
        try {
            var resp = CQ.HTTP.buildPostResponseFromHTML(xhr.response.responseText);
            txt = resp.headers[CQ.HTTP.HEADER_MESSAGE];
        }
        catch(e){
            txt = CQ.I18n.getMessage("Failed to create group");
        }
        CQ.Ext.Msg.alert(CQ.I18n.getMessage("Error"), txt);
    };
    dialog.success = function() {
        var st = CQ.Ext.StoreMgr.lookup("cq-useradmin-authstore");
        st.reload.defer(200, st);
    };
    dialog.show();
};
/*
 * Copyright 1997-2008 Day Management AG
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
 * The <code>CQ.security.AclDialog</code> class represents a dialog for editing
 * permissions.
 *
 * @class
 * @extends CQ.Ext.Dialog
 */
CQ.security.AclDialog = CQ.Ext.extend(CQ.Dialog, {
	/**
	 * The ACL editor panel
	 * @private
	 * @type CQ.security.AclEditor
	 */
	aclEditor: null,
	
	/**
     * Save Button
     * @private
     * @type CQ.Ext.Button
     */
    saveButton: null,

   /**
     * Load the data via the grid-stores.
     * The data Object is used for testing
     * @param {String / Object} the content path to request the ACL for.
     *        Data-Object for testing
     */
    loadContent: function(path) {
        this.aclEditor.load(path);
    },

    /**
     * see cfg options
     * @param config {Object} Extension of dialog-config
     */
    constructor: function(config) {
    	config = CQ.Util.applyDefaults(config, {
    		title:CQ.I18n.getMessage("Edit Permissions"),
    		editor: {
    			title:null,
    			border:false
    		}
	    });
    	config.buttons = [
    	    {
    	        text:CQ.I18n.getMessage("Save"),
    	        handler:this.save,
    	        scope:this
    	    },
    	    CQ.Dialog.CANCEL
        ];
    	this.aclEditor = new CQ.security.AclEditor(config.editor);
    	this.aclEditor.on("aclsaved", this.saveCallback, this);
    	
    	config.items = this.aclEditor;
    	CQ.security.AclDialog.superclass.constructor.call(this, config);
    	
    	this.saveButton = this.buttons[0];
    },
    
    save: function() {
    	this.aclEditor.save.call(this.aclEditor);
        this.hide();
    },

    saveCallback: function(editor, success) {
    	if (!success) {
    		// TODO
    	}
    }
});

CQ.Ext.reg("acldialog", CQ.security.AclDialog);

/*
 * Copyright 1997-2008 Day Management AG
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
 * Provide static util to access Permissions of a request.
 * Will register itself as PermissionProvider with the CQ.User
 *
 */

CQ.security.utils.Permissions = new Object();

CQ.security.utils.Permissions.register = function() {
    var user = CQ.User.getCurrentUser();
    var store = new CQ.security.data.UserAclStore({
        id:CQ.User.PRIVILEGES_STORE_ID,
        recId:"path",
        dataUrl:user.getHome()+".permissions" + CQ.HTTP.EXTENSION_JSON
    });
    user.setPermissionStore(store);
};

CQ.security.utils.Permissions.register();
