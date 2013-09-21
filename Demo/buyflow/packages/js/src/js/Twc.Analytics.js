/**
  * Manages analytics event calls s
  * @namespace
  * @author McGowan
  */
Twc.Analytics = (function() {
    /**
      * Buyflow type: ebf, abf, gbf
      */
    /* TODO: Updated serviceLocation and buyflowType to pull info from metadata or whatever method we decide to use to make the info visible to JS */
    var buyflowType = "ebf";
    var serviceLocation = "nyc"

    /**
      * Holds event functions
      */
    var events = {

        /**********************************************************
         * MULTI-PAGE FUNCTIONS
         **********************************************************/

        /** Checkout Page loads
        * @author athomas
        */
        checkoutPageLoad : function(eventList, pageType, lob, breadcrumb) {
            s.pageName = buyflowType + " > " + pageType;
            if(typeof lob != "undefined"){
                s.pageName += " > " + lob;
            }
            s.events = eventList;
            s.prop3 = s.eVar6 = serviceLocation; // where trying to get service
            s.eVar19 = buyflowType;
            if(typeof breadcrumb != undefined)
                s.prop60 = buyflowType + ":" + breadcrumb; // "ebf:select & customize"
            s.t();
        },

        /** Select Service Page analytics
          * @author athomas
          */
        selectServiceAnalytics : function(eventList, pageType, lob) {
            //page load analytics
            events["checkoutPageLoad"](eventList, pageType, lob, "select & customize");

            //analytics for errors
            $(".checkout-plans .error-module p").each(function(){
                events["checkoutError"]($(this).text());
            });
            //impressions for each compare table product
            $(".fiveColumnCompareTable header ul").each(function(){
                var productName = $(this).attr("data-name");
                var productID = $(this).attr("data-id");
                var enrichedName = $(this).attr("data-enrichedName");
                events["productImpression"](productName, productID, enrichedName);
            });
        },

        /** Checkout Page Error Message Displayed
          * @author athomas
          * @param productName {String} product name of the selected object
          */
        cartAdd : function(productName) {
            s.linkTrackVars="events,products,eVar57,eVar59,eVar6,eVar19";
            s.linkTrackEvents="scAdd";
            s.events="scAdd";
            s.products=";" + productName;  // Seibel product name
            s.eVar57=productName;  // Seibel product name
            s.eVar59 = s.pageName;
            s.tl(true,'o','cart add');
            s.eVar57=s.eVar59=s.events=s.products="";
            s.linkTrackVars="None";
            s.linkTrackEvents="None";
        },

        /** Checkout Page Error Message Displayed
          * @author athomas
          * @param errorMessage {String} error message that is displayed
          */
        checkoutError : function(errorMessage) {
            s.linkTrackVars="eVar57,eVar59,eVar6";
            s.eVar57 = "warning/alert:1:1:" + errorMessage;  // should be brief description.  Perhaps first sentence if it is descriptive.
            s.eVar59 = s.pageName;  // Or, before page load can assign eVar57 same value that will be set into s.pageName
            s.tl(true,'o','checkout warning/alert');
            s.prop57=s.eVar59="";
        },

        /** Expandable/Collapsible Row opened
          * @author athomas
          * @param index {Integer} index of row in its container
		  * @param $row {Object} jQuery object representing the row
          */
        rowExpanderOpened : function(index, $row) {
            //jquery object that actually contains the data for product info
            var $rowData = $row.find("> header ul");
            var productName = $rowData.attr("data-name");
            var productID = $rowData.attr("data-id");
            var enrichedName = $rowData.attr("data-enrichedName");

            s.linkTrackVars="events,products,eVar57,eVar59,contextData." + buyflowType + "_prodid,contextData." + buyflowType + "_enrichedprodname,eVar6,eVar19";
            s.linkTrackEvents="prodView,event86";
            s.events="prodView,event86";
            s.eVar59 = s.pageName; // Or, if it fires before page load can assign eVar59 same value that will be set into s.pageName
            s.products=";" + productName;  // Seibel product name
            s.eVar57=productName;  // Seibel product name
            s.contextData[buyflowType + '_prodid']=productID; // Seibel product ID
            s.contextData[buyflowType + '_enrichedprodname']=enrichedName; // enriched product name
            s.tl(true,'o','view offer');
            s.eVar57=s.eVar59=s.events=s.products=s.contextData[buyflowType + '_enrichedprodname']=s.contextData[buyflowType + '_prodid']="";
            s.linkTrackVars="None";
            s.linkTrackEvents="None";
        },

        /** analytics impression for products
          * @author athomas
          * @param productName {String} product name displayed on compare table
          * @param productID {String} product id displayed on compare table
          * @param enrichedName {String} enriched product name displayed on compare table
          */
        productImpression : function(productName, productID, enrichedName) {
            s.lightTrackVars = "eVar57,eVar59,eVar6,contextData."+buyflowType+"_prodid,contextData."+buyflowType+"_enrichedprodname,eVar19";
            s.eVar57 = productName;  // Seibel product name
            s.eVar59 = s.pageName; // Or, before page load can assign eVar59 same value that will be set into s.pageName
            s.contextData[buyflowType+'_prodid']=productID; // Seibel product ID
            s.contextData[buyflowType+'_enrichedprodname']=enrichedName; // enriched product name
            s.trackLight("imprsn");
            s.prop57=s.eVar59=s.contextData[buyflowType+'_enrichedprodname']=s.contextData[buyflowType+'_prodid']="";
        },

        /** User clicks a top question to open
          * @author athomas
          * @param indexPos {Integer} position in question list
          * @param $a {Object} jQuery object user clicked
          */
        topQuestionsClick : function(indexPos, $a) {
            s.linkTrackVars="events,eVar59,eVar57,eVar6";
            s.linkTrackEvents="event84";
            s.events="event84";
            s.eVar57 = "checkout top questions:1:" + indexPos + ":" + $a.text(); //  append FAQ title text
            s.eVar59 = s.pageName;
            s.tl(true,'o','checkout top questions');
            s.eVar57=s.events=s.eVar59="";
            s.linkTrackVars="None";
            s.linkTrackEvents="None";
        },

        /**********************************************************
         * PAGE-SPECIFIC FUNCTIONS
         **********************************************************/

        /**********************************************************
         * ORDER REVIEW PAGE
         **********************************************************/
        /** Review Order Page loads
          * @author athomas
          * @param twoOptions {bool} true if user has two installation options
          */
        reviewOrderPageLoad : function(twoOptions) {
            var pageType = twoOptions ? "review order with options" : "review order";
            var eventList="event55:" + getAnalyticsSessionID() + buyflowType;
            if(twoOptions)
                eventList+=",event43:" + getAnalyticsSessionID() + buyflowType;

            events["checkoutPageLoad"](eventList, pageType);
        },

        /** Installation option is shown on Review Order Page
          * @author athomas
          * @param installationOption {String} the installation option shown
          *        options are: "installation by technician only", "self-installation pick-up",
          *        "self installation", "no install" (no installation needed or presented)
          */
        installationOptionImpression : function(installationOption) {
            s.linkTrackVars="events,eVar38,eVar6,eVar19";
            s.linkTrackEvents="event84";
            s.events="event84";
            s.eVar38 = installationOption;
            s.tl(true,'o',s.eVar38);
            s.events=s.eVar38="";
            s.linkTrackVars="None";
            s.linkTrackEvents="None";
        },

        /** User moves to the next page
        * @author athomas
        * @param installationOption {String} the installation option selected
        *        options are: "installation by technician only", "self-installation pick-up",
        *        "self installation", "no install" (no installation needed or presented)
        */
        reviewOrderComplete : function(installationOption) {
            s.linkTrackVars="events,eVar38,eVar6,eVar19";
            s.linkTrackEvents="event86";
            s.events="event86";
            s.eVar38 = installationOption;
            s.tl(true,'o',s.eVar38);
            s.events=s.eVar38="";
            s.linkTrackVars="None";
            s.linkTrackEvents="None";
        },

        /** Call analytics for order review page load
        * @author athomas
        */
        order_review : function(){
            log('Analytics.order_review()');
            var twoOptions = $(".installation-options input[value='" + Twc.Settings.splitTechnicianVisitId + "']").length > 0;

            //page load analytics
            events["reviewOrderPageLoad"](twoOptions);
            //no install if no options available
            if($(".installation-options input.radio.installation").length < 1)
                events["installationOptionImpression"]("no install");
            else //call impression for each installation option
                $(".installation-options input.radio.installation").each(function(){
                    events["installationOptionImpression"]($(this).attr("data-name"));
                });
        },

        /**********************************************************
         * SELECT INTERNET PAGE
         **********************************************************/
        /** Call analytics for select internet page load
        * @author athomas
        */
        select_internet : function(){
            log('Analytics.select_internet()');
            events["selectServiceAnalytics"]("event28", "select services", "internet");
        },

        /**********************************************************
        * SELECT PHONE PAGE
        **********************************************************/

        /** Call analytics for select phone page load
        * @author athomas
        */
        select_phone : function(){
            log('Analytics.select_phone()');
            events["selectServiceAnalytics"]("event29", "select service", "digital phone");
        },

        /**********************************************************
        * SELECT TV PAGE
        **********************************************************/

        /** Call analytics for select TV page load
        * @author athomas
        */
        select_tv : function(){
            log('Analytics.select_service()');
            events["selectServiceAnalytics"]("event27", "select services", "digital cable");
        },

        /**********************************************************
        * UPGRADE TV PAGE
        **********************************************************/

        /** Call analytics for upgrade TV page load
        * @author athomas
        */
        select_service : function(){
            log('Analytics.select_service()');
            events["selectServiceAnalytics"]("event27", "upgrade services", "digital cable");
        },

        /**********************************************************
        * UPGRADE TV PAGE
        **********************************************************/

        /** Call analytics for Customize Phone page load
        * @author athomas
        */
        customize_phone : function(){
            log('Analytics.customize_phone()');

            //default page type is configure services
            var pageType = "configure services";
            var lob = "digital phone";
            var $activeAccordion = $(".phone-customize-accordion .collapsible.active");

            //full view if more than one accordion is open
            if($activeAccordion.size() > 1){
                lob += " > full view";
            }

            //if sections 2, 3, or 4 are the first open one, change pageType
            switch($activeAccordion.index())
            {
                case 1:
                    pageType = "select or transfer number";
                    break;
                case 2:
                    pageType = "installation details";
                    break;
                case 3:
                    pageType = "agreements";
                    break;
                default:
                    pageType = "configure services";
            }

            events["selectServiceAnalytics"]("event29", pageType, lob);
        }
    }

    return {
        /**********************************************************
         * GENERIC/UTIL FUNCTIONS
         **********************************************************/

        // retrieve the id representing the user session for analytics
        getAnalyticsSessionID : function() {
            var sessionCookieVal = $.cookie('twc-analytics-session')
            if (sessionCookieVal) {
                return sessionCookieVal;
            }
            /* Given that we don't know exactly where this is being called from, make it synchronous to avoid timing issues.
            * the time the servlet takes to respond should also be minimal enough to not have the user notice it. */
            $.ajax({
                type: 'GET',
                async: false,
                url: '/bin/services/generate/id',
                cache: false,
                timeout: 3000,
                data: 'maxIDLength=16&baseEncoding=32'
            })
            .done(function(data, textStatus, jqXHR) {
                $.cookie('twc-analytics-session', data, { expires: null, path: '/'}); // create the cookie to expire at browser close
            })
            .fail(function(jqXHR, errorType, exception) {
                // don't show errors on QA servers
                if ((/^twccheckout\./.test(window.location.hostname))) {
                    Twc.Util.catchError(exception)
                }
            });
            return $.cookie('twc-analytics-session');
        },

        /** Dispatches an event.  Accepts indefinite amount of arguments, but first argument MUST be string of event name with corresponding
          * function.  e.g. dispatch('elementClick', param1, param2, etc...);
          * @author McGowan
          */
        dispatch : function() {
            try {
                if (!typeof arguments[0] === 'string') {
                    error('Analytics.dispatch(): first argument must be event name');
                    return;
                }
                var args = Array.prototype.slice.call(arguments); // convert arguments to Array
                var eventName = args.shift(); // we don't need event name anymore. don't pass it on
                var f = events[eventName];
                if ('function' === typeof f) {
                    f.apply(f,args);
                } else {
                    warn('Analytics.dispatch(): no function defined for: '+eventName);
                    return;
                }
            } catch (e) {
                // don't show errors on QA servers
                if (!(/^twccheckout\./.test(window.location.hostname))) {
                    Twc.Util.catchError(e)
                }
            }
        }
    }

})();
