/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2011 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

if( CQ_Analytics.ClientContextUI ) {
    $CQ(function() {
        CQ_Analytics.ClientContextUtils.onStoreRegistered("tagcloud", function(sessionstore) {
            sessionstore.addListener("render",function(event, store, divId){
                $CQ("#" + divId).bind("dblclick",function(event) {
                    if( !store.editDialog) {
                        store.editDialog = CQ.WCM.getDialog(
                            "/libs/cq/personalization/components/contextstores/" +
                            store.getName()+
                            "/edit_dialog.xml");
                    }

                    if( store.editDialog ) {
                        store.editDialog.show();
                    }

                    event.preventDefault();
                });
            });
        });
    });
}


