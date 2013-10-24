<?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/header.php'); ?>

    <div class="chatUI">
    <div class="darkOverlay"></div>

    <div class="chatUI- top">
        <img src="/TWC/core/images/need_help.png" alt="need_help">
        <h5>Need Help? Let's Chat</h5>
        <span id="hidewindow">Close</span>
    </div>

    <div class="chatUI- middle">
        
        <!-- Check if Existing Customer -->
        <div id="ccPreCheck">
            <h5>Are you a new or existing customer?</h5>
            <form name="" id="newExisting" action="" method="POST">
                <input type="radio" id="new" name="group" value="New">New
                <input type="radio" id="existing" name="group" value="Existing">Existing
            </form>
        </div>
        
        <!-- Gather User Information -->
        <form name="" method="POST" action="/bin/support/chat">
            <div id="ccPreSurvey">

                <span class="language"><a href="">Español</a></span>

                <input id="ccChatFirstName" class="ccPreSurveyTextInput ccShortField ccFormInput" maxlength="100" type="text" name="ccChatFirstName" placeholder="Full Name" required data-errormessage-value-missing="Something's missing" />
                
                <div class="telephoneInput">
                    <input id="ccChatTelephone" class="ccPreSurveyTextInput ccShortField ccFormInput" maxlength="100" type="text" name="ccChatTelephone" placeholder="Phone no. associated with account" required data-errormessage-value-missing="Add some text" /> 
                    <a class="telephone-tip">
                        <p>Entering the phone number on your account will expedite the verification process</p>
                    </a>
                </div>
                
                <div id="dd" class="selectBox">
                    <select name="ccChatTopic" placeholder="Topic" id="ccChatTopic" required data-errormessage="A Topic is required">
                        <option value="Select Topic">Select Topic</option>
                        <option value="Topic 1">Topic 1</option>
                        <option value="Topic 2">Topic 2</option>
                        <option value="Topic 3">Topic 3</option>
                    </select>
                </div>

                <textarea id="ccChatProblem" class="ccPreSurveyTextAreaInput ccFormInput" type="text" maxlength="500" name="ccChatProblem" placeholder="Enter your question"></textarea>
                
            </div>
            
            <div id="ccContainer">
                <div id="ccChatOutput">
                    <div id="ccChatStatusBar">
                        <p class="ccMessage cc_msgtype_advlog_none cc_usertype_undefined">analyst Keith Reyes has entered room</p>
                    </div>
                    
                    <p class="ccMessage cc_msgtype_msg cc_usertype_analyst">
                        <span class="ccMessagFrom">Keith Reyes: </span>
                        Hello! Thank you for contacting Road Runner Technical Chat support team. My name is Keith Reyes. I will help you.
                    </p>
                    
                    <p class="ccMessage cc_msgtype_msg cc_usertype_user">
                        <span class="ccMessagFrom">Max: </span>
                        Hi Keith
                    </p>
                
                    <p class="ccMessage cc_msgtype_msg cc_usertype_analyst">
                        <span class="ccMessagFrom">Keith Reyes: </span>
                        How are you doing today?
                    </p>
                    
                    <p class="ccMessage cc_msgtype_msg cc_usertype_analyst">
                        <span class="ccMessagFrom">Keith Reyes: </span>
                        Do you have any other questions for me ?
                    </p>
                
                    <p class="ccMessage cc_msgtype_msg cc_usertype_user">
                        <span class="ccMessagFrom">Max: </span>
                        I'm well thanks! No sir, just need to keep this window open for a few
                    </p>
                </div>
                
                <div id="ccPostSurvey">
                    <h1>Chat User Survey</h1><span>Please help us improve our service.</span><br>
                    <br>

                    <div id="ccSurveyQuestions">
                        <div id="Panel_a0463a54-9faf-4f04-a956-02afb5e40c9e" class="ConsonaFormField">
                            <fieldset class="ConsonaFieldSet">
                                <span class="ConsonaLegendText">Using a scale of 1 to 10 where 10 is the highest and 1 is the lowest, how would you rate your satisfaction with the Time Warner Cable representative you chatted with today?</span>
        
                                <div class="clear"></div>
        
                                <div id="Line_a0463a54-9faf-4f04-a956-02afb5e40c9e" class="ConsonaFormRadioLine">
                                    <input id="bf639313-3402-492b-a00c-084d418d3e02" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="1" name="Resp_a0463a54-9faf-4f04-a956-02afb5e40c9e" question="a0463a54-9faf-4f04-a956-02afb5e40c9e"> <label class="ConsonaFormRadioLabel" for="bf639313-3402-492b-a00c-084d418d3e02">1</label>
                                </div>
        
                                <div id="Line_a0463a54-9faf-4f04-a956-02afb5e40c9e" class="ConsonaFormRadioLine">
                                    <input id="76b30595-2a71-4aa9-89dc-7024c961d73e" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="2" name="Resp_a0463a54-9faf-4f04-a956-02afb5e40c9e" question="a0463a54-9faf-4f04-a956-02afb5e40c9e"> <label class="ConsonaFormRadioLabel" for="76b30595-2a71-4aa9-89dc-7024c961d73e">2</label>
                                </div>
        
                                <div id="Line_a0463a54-9faf-4f04-a956-02afb5e40c9e" class="ConsonaFormRadioLine">
                                    <input id="ff338af9-0d4e-466a-a495-33c466e366d8" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="3" name="Resp_a0463a54-9faf-4f04-a956-02afb5e40c9e" question="a0463a54-9faf-4f04-a956-02afb5e40c9e"> <label class="ConsonaFormRadioLabel" for="ff338af9-0d4e-466a-a495-33c466e366d8">3</label>
                                </div>
        
                                <div id="Line_a0463a54-9faf-4f04-a956-02afb5e40c9e" class="ConsonaFormRadioLine">
                                    <input id="75af387c-3426-4d7b-ab39-aec5485fc099" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="4" name="Resp_a0463a54-9faf-4f04-a956-02afb5e40c9e" question="a0463a54-9faf-4f04-a956-02afb5e40c9e"> <label class="ConsonaFormRadioLabel" for="75af387c-3426-4d7b-ab39-aec5485fc099">4</label>
                                </div>
        
                                <div id="Line_a0463a54-9faf-4f04-a956-02afb5e40c9e" class="ConsonaFormRadioLine">
                                    <input id="ece1c504-f05b-438d-987d-83e74e526ab6" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="5" name="Resp_a0463a54-9faf-4f04-a956-02afb5e40c9e" question="a0463a54-9faf-4f04-a956-02afb5e40c9e"> <label class="ConsonaFormRadioLabel" for="ece1c504-f05b-438d-987d-83e74e526ab6">5</label>
                                </div>
        
                                <div id="Line_a0463a54-9faf-4f04-a956-02afb5e40c9e" class="ConsonaFormRadioLine">
                                    <input id="a1de99d3-d426-4204-b972-d116edbb2b4d" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="6" name="Resp_a0463a54-9faf-4f04-a956-02afb5e40c9e" question="a0463a54-9faf-4f04-a956-02afb5e40c9e"> <label class="ConsonaFormRadioLabel" for="a1de99d3-d426-4204-b972-d116edbb2b4d">6</label>
                                </div>
        
                                <div id="Line_a0463a54-9faf-4f04-a956-02afb5e40c9e" class="ConsonaFormRadioLine">
                                    <input id="ac28a3b7-1350-4546-bf3a-ab463ad55439" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="7" name="Resp_a0463a54-9faf-4f04-a956-02afb5e40c9e" question="a0463a54-9faf-4f04-a956-02afb5e40c9e"> <label class="ConsonaFormRadioLabel" for="ac28a3b7-1350-4546-bf3a-ab463ad55439">7</label>
                                </div>
        
                                <div id="Line_a0463a54-9faf-4f04-a956-02afb5e40c9e" class="ConsonaFormRadioLine">
                                    <input id="36d9d45d-af9d-4a4f-8183-a057a70aed84" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="8" name="Resp_a0463a54-9faf-4f04-a956-02afb5e40c9e" question="a0463a54-9faf-4f04-a956-02afb5e40c9e"> <label class="ConsonaFormRadioLabel" for="36d9d45d-af9d-4a4f-8183-a057a70aed84">8</label>
                                </div>
        
                                <div id="Line_a0463a54-9faf-4f04-a956-02afb5e40c9e" class="ConsonaFormRadioLine">
                                    <input id="1284548a-6ec9-4fa4-b153-9c0a0c3dd078" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="9" name="Resp_a0463a54-9faf-4f04-a956-02afb5e40c9e" question="a0463a54-9faf-4f04-a956-02afb5e40c9e"> <label class="ConsonaFormRadioLabel" for="1284548a-6ec9-4fa4-b153-9c0a0c3dd078">9</label>
                                </div>
        
                                <div id="Line_a0463a54-9faf-4f04-a956-02afb5e40c9e" class="ConsonaFormRadioLine">
                                    <input id="925e978b-f6a5-47d9-9b9f-73183fb22db5" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="10" name="Resp_a0463a54-9faf-4f04-a956-02afb5e40c9e" question="a0463a54-9faf-4f04-a956-02afb5e40c9e"> <label class="ConsonaFormRadioLabel" for="925e978b-f6a5-47d9-9b9f-73183fb22db5">10</label>
                                </div>
                            </fieldset>
                        </div>
        
                        <div id="Panel_a52bd101-be6b-4cca-8ed5-d985f224030d" class="ConsonaFormField">
                            <fieldset class="ConsonaFieldSet">
                                <span class="ConsonaLegendText">Using the same 10 point scale please rate your satisfaction with the representative's knowledge and ability to explain our products and services.</span>
        
                                <div class="clear"></div>
        
                                <div id="Line_a52bd101-be6b-4cca-8ed5-d985f224030d" class="ConsonaFormRadioLine">
                                    <input id="2bc33770-5267-458f-835c-2deceeb8e0cb" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="1" name="Resp_a52bd101-be6b-4cca-8ed5-d985f224030d" question="a52bd101-be6b-4cca-8ed5-d985f224030d"> <label class="ConsonaFormRadioLabel" for="2bc33770-5267-458f-835c-2deceeb8e0cb">1</label>
                                </div>
        
                                <div id="Line_a52bd101-be6b-4cca-8ed5-d985f224030d" class="ConsonaFormRadioLine">
                                    <input id="b08db37c-5dfd-4f0a-877b-44ffb441f414" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="2" name="Resp_a52bd101-be6b-4cca-8ed5-d985f224030d" question="a52bd101-be6b-4cca-8ed5-d985f224030d"> <label class="ConsonaFormRadioLabel" for="b08db37c-5dfd-4f0a-877b-44ffb441f414">2</label>
                                </div>
        
                                <div id="Line_a52bd101-be6b-4cca-8ed5-d985f224030d" class="ConsonaFormRadioLine">
                                    <input id="79680634-c3ef-424a-908f-66402dedcef3" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="3" name="Resp_a52bd101-be6b-4cca-8ed5-d985f224030d" question="a52bd101-be6b-4cca-8ed5-d985f224030d"> <label class="ConsonaFormRadioLabel" for="79680634-c3ef-424a-908f-66402dedcef3">3</label>
                                </div>
        
                                <div id="Line_a52bd101-be6b-4cca-8ed5-d985f224030d" class="ConsonaFormRadioLine">
                                    <input id="663d8581-4bc2-4eed-9d2f-f20815373642" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="4" name="Resp_a52bd101-be6b-4cca-8ed5-d985f224030d" question="a52bd101-be6b-4cca-8ed5-d985f224030d"> <label class="ConsonaFormRadioLabel" for="663d8581-4bc2-4eed-9d2f-f20815373642">4</label>
                                </div>
        
                                <div id="Line_a52bd101-be6b-4cca-8ed5-d985f224030d" class="ConsonaFormRadioLine">
                                    <input id="c276eaaf-1ac9-4dc5-98f9-a392840fca20" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="5" name="Resp_a52bd101-be6b-4cca-8ed5-d985f224030d" question="a52bd101-be6b-4cca-8ed5-d985f224030d"> <label class="ConsonaFormRadioLabel" for="c276eaaf-1ac9-4dc5-98f9-a392840fca20">5</label>
                                </div>
        
                                <div id="Line_a52bd101-be6b-4cca-8ed5-d985f224030d" class="ConsonaFormRadioLine">
                                    <input id="2c5613f5-5179-4ae3-9e56-0e2c68ef655e" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="6" name="Resp_a52bd101-be6b-4cca-8ed5-d985f224030d" question="a52bd101-be6b-4cca-8ed5-d985f224030d"> <label class="ConsonaFormRadioLabel" for="2c5613f5-5179-4ae3-9e56-0e2c68ef655e">6</label>
                                </div>
        
                                <div id="Line_a52bd101-be6b-4cca-8ed5-d985f224030d" class="ConsonaFormRadioLine">
                                    <input id="e4fa936f-a9c5-42bd-ac33-3d3f29712efd" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="7" name="Resp_a52bd101-be6b-4cca-8ed5-d985f224030d" question="a52bd101-be6b-4cca-8ed5-d985f224030d"> <label class="ConsonaFormRadioLabel" for="e4fa936f-a9c5-42bd-ac33-3d3f29712efd">7</label>
                                </div>
        
                                <div id="Line_a52bd101-be6b-4cca-8ed5-d985f224030d" class="ConsonaFormRadioLine">
                                    <input id="3d3e1aa9-5125-4c7e-9d22-7a4813f2fb5f" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="8" name="Resp_a52bd101-be6b-4cca-8ed5-d985f224030d" question="a52bd101-be6b-4cca-8ed5-d985f224030d"> <label class="ConsonaFormRadioLabel" for="3d3e1aa9-5125-4c7e-9d22-7a4813f2fb5f">8</label>
                                </div>
        
                                <div id="Line_a52bd101-be6b-4cca-8ed5-d985f224030d" class="ConsonaFormRadioLine">
                                    <input id="bc1ce683-29a3-442f-b808-91867832c78e" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="9" name="Resp_a52bd101-be6b-4cca-8ed5-d985f224030d" question="a52bd101-be6b-4cca-8ed5-d985f224030d"> <label class="ConsonaFormRadioLabel" for="bc1ce683-29a3-442f-b808-91867832c78e">9</label>
                                </div>
        
                                <div id="Line_a52bd101-be6b-4cca-8ed5-d985f224030d" class="ConsonaFormRadioLine">
                                    <input id="8658961f-d7b1-4370-aaea-db028173cb8b" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="10" name="Resp_a52bd101-be6b-4cca-8ed5-d985f224030d" question="a52bd101-be6b-4cca-8ed5-d985f224030d"> <label class="ConsonaFormRadioLabel" for="8658961f-d7b1-4370-aaea-db028173cb8b">10</label>
                                </div>
                            </fieldset>
                        </div>
        
                        <div id="Panel_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" class="ConsonaFormField">
                            <fieldset class="ConsonaFieldSet">
                                <span class="ConsonaLegendText">How satisfied were you with the representative's helpfulness and responsiveness to your questions?</span>
        
                                <div class="clear"></div>
        
                                <div id="Line_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" class="ConsonaFormRadioLine">
                                    <input id="698823c3-8b20-4861-955d-62bcd2335f7e" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="1" name="Resp_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" question="1a97a3a6-8b63-4f3b-84a8-aebb1165eb94"> <label class="ConsonaFormRadioLabel" for="698823c3-8b20-4861-955d-62bcd2335f7e">1</label>
                                </div>
        
                                <div id="Line_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" class="ConsonaFormRadioLine">
                                    <input id="d84daf47-599f-4cdb-aff6-9d58e6e704f9" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="2" name="Resp_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" question="1a97a3a6-8b63-4f3b-84a8-aebb1165eb94"> <label class="ConsonaFormRadioLabel" for="d84daf47-599f-4cdb-aff6-9d58e6e704f9">2</label>
                                </div>
        
                                <div id="Line_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" class="ConsonaFormRadioLine">
                                    <input id="0ce736f2-6dfd-44b0-807a-62e902266aef" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="3" name="Resp_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" question="1a97a3a6-8b63-4f3b-84a8-aebb1165eb94"> <label class="ConsonaFormRadioLabel" for="0ce736f2-6dfd-44b0-807a-62e902266aef">3</label>
                                </div>
        
                                <div id="Line_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" class="ConsonaFormRadioLine">
                                    <input id="34315310-e0b2-4a89-856a-875f6ffdf4ea" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="4" name="Resp_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" question="1a97a3a6-8b63-4f3b-84a8-aebb1165eb94"> <label class="ConsonaFormRadioLabel" for="34315310-e0b2-4a89-856a-875f6ffdf4ea">4</label>
                                </div>
        
                                <div id="Line_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" class="ConsonaFormRadioLine">
                                    <input id="c2221995-433f-41f2-a99e-61bca3e394be" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="5" name="Resp_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" question="1a97a3a6-8b63-4f3b-84a8-aebb1165eb94"> <label class="ConsonaFormRadioLabel" for="c2221995-433f-41f2-a99e-61bca3e394be">5</label>
                                </div>
        
                                <div id="Line_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" class="ConsonaFormRadioLine">
                                    <input id="f8fb9ea6-d50a-4cfa-8b1d-48612219de28" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="6" name="Resp_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" question="1a97a3a6-8b63-4f3b-84a8-aebb1165eb94"> <label class="ConsonaFormRadioLabel" for="f8fb9ea6-d50a-4cfa-8b1d-48612219de28">6</label>
                                </div>
        
                                <div id="Line_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" class="ConsonaFormRadioLine">
                                    <input id="4e425b37-6242-4d93-863c-b78b5ef767f5" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="7" name="Resp_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" question="1a97a3a6-8b63-4f3b-84a8-aebb1165eb94"> <label class="ConsonaFormRadioLabel" for="4e425b37-6242-4d93-863c-b78b5ef767f5">7</label>
                                </div>
        
                                <div id="Line_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" class="ConsonaFormRadioLine">
                                    <input id="95287235-de45-4f0f-b7f9-f751619803b2" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="8" name="Resp_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" question="1a97a3a6-8b63-4f3b-84a8-aebb1165eb94"> <label class="ConsonaFormRadioLabel" for="95287235-de45-4f0f-b7f9-f751619803b2">8</label>
                                </div>
        
                                <div id="Line_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" class="ConsonaFormRadioLine">
                                    <input id="88bdf370-fd75-41e3-ba24-3ac2544bd23b" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="9" name="Resp_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" question="1a97a3a6-8b63-4f3b-84a8-aebb1165eb94"> <label class="ConsonaFormRadioLabel" for="88bdf370-fd75-41e3-ba24-3ac2544bd23b">9</label>
                                </div>
        
                                <div id="Line_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" class="ConsonaFormRadioLine">
                                    <input id="8963556c-fc61-4b9f-b849-c2721e3ae715" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="10" name="Resp_1a97a3a6-8b63-4f3b-84a8-aebb1165eb94" question="1a97a3a6-8b63-4f3b-84a8-aebb1165eb94"> <label class="ConsonaFormRadioLabel" for="8963556c-fc61-4b9f-b849-c2721e3ae715">10</label>
                                </div>
                            </fieldset>
                        </div>
        
                        <div id="Panel_dc1b92dc-44b1-4f2a-823f-cc682faf487d" class="ConsonaFormField">
                            <fieldset class="ConsonaFieldSet">
                                <span class="ConsonaLegendText">Overall, how would you rate your experience with Chat?</span>
        
                                <div class="clear"></div>
        
                                <div id="Line_dc1b92dc-44b1-4f2a-823f-cc682faf487d" class="ConsonaFormRadioLine">
                                    <input id="d64ff989-c058-40e8-bbe4-0de9ea580372" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="1" name="Resp_dc1b92dc-44b1-4f2a-823f-cc682faf487d" question="dc1b92dc-44b1-4f2a-823f-cc682faf487d"> <label class="ConsonaFormRadioLabel" for="d64ff989-c058-40e8-bbe4-0de9ea580372">1</label>
                                </div>
        
                                <div id="Line_dc1b92dc-44b1-4f2a-823f-cc682faf487d" class="ConsonaFormRadioLine">
                                    <input id="99704172-795a-4715-805c-1645b393445b" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="2" name="Resp_dc1b92dc-44b1-4f2a-823f-cc682faf487d" question="dc1b92dc-44b1-4f2a-823f-cc682faf487d"> <label class="ConsonaFormRadioLabel" for="99704172-795a-4715-805c-1645b393445b">2</label>
                                </div>
        
                                <div id="Line_dc1b92dc-44b1-4f2a-823f-cc682faf487d" class="ConsonaFormRadioLine">
                                    <input id="301280bc-2131-4a49-b752-f989c12b3507" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="3" name="Resp_dc1b92dc-44b1-4f2a-823f-cc682faf487d" question="dc1b92dc-44b1-4f2a-823f-cc682faf487d"> <label class="ConsonaFormRadioLabel" for="301280bc-2131-4a49-b752-f989c12b3507">3</label>
                                </div>
        
                                <div id="Line_dc1b92dc-44b1-4f2a-823f-cc682faf487d" class="ConsonaFormRadioLine">
                                    <input id="f6483f8f-1e7d-4b1d-b998-9a5b94268be7" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="4" name="Resp_dc1b92dc-44b1-4f2a-823f-cc682faf487d" question="dc1b92dc-44b1-4f2a-823f-cc682faf487d"> <label class="ConsonaFormRadioLabel" for="f6483f8f-1e7d-4b1d-b998-9a5b94268be7">4</label>
                                </div>
        
                                <div id="Line_dc1b92dc-44b1-4f2a-823f-cc682faf487d" class="ConsonaFormRadioLine">
                                    <input id="f1da1239-e2c7-49c3-be0c-9b46e620da1b" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="5" name="Resp_dc1b92dc-44b1-4f2a-823f-cc682faf487d" question="dc1b92dc-44b1-4f2a-823f-cc682faf487d"> <label class="ConsonaFormRadioLabel" for="f1da1239-e2c7-49c3-be0c-9b46e620da1b">5</label>
                                </div>
        
                                <div id="Line_dc1b92dc-44b1-4f2a-823f-cc682faf487d" class="ConsonaFormRadioLine">
                                    <input id="527123f2-f64e-427b-b6fb-6e8e1a99a7b4" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="6" name="Resp_dc1b92dc-44b1-4f2a-823f-cc682faf487d" question="dc1b92dc-44b1-4f2a-823f-cc682faf487d"> <label class="ConsonaFormRadioLabel" for="527123f2-f64e-427b-b6fb-6e8e1a99a7b4">6</label>
                                </div>
        
                                <div id="Line_dc1b92dc-44b1-4f2a-823f-cc682faf487d" class="ConsonaFormRadioLine">
                                    <input id="854d0a09-ccab-405f-86f4-689955390931" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="7" name="Resp_dc1b92dc-44b1-4f2a-823f-cc682faf487d" question="dc1b92dc-44b1-4f2a-823f-cc682faf487d"> <label class="ConsonaFormRadioLabel" for="854d0a09-ccab-405f-86f4-689955390931">7</label>
                                </div>
        
                                <div id="Line_dc1b92dc-44b1-4f2a-823f-cc682faf487d" class="ConsonaFormRadioLine">
                                    <input id="739be58e-250c-41cd-9c9e-29a54b9cd58c" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="8" name="Resp_dc1b92dc-44b1-4f2a-823f-cc682faf487d" question="dc1b92dc-44b1-4f2a-823f-cc682faf487d"> <label class="ConsonaFormRadioLabel" for="739be58e-250c-41cd-9c9e-29a54b9cd58c">8</label>
                                </div>
        
                                <div id="Line_dc1b92dc-44b1-4f2a-823f-cc682faf487d" class="ConsonaFormRadioLine">
                                    <input id="b6e7d1a6-01f2-41af-9b4f-d4e887be4c0f" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="9" name="Resp_dc1b92dc-44b1-4f2a-823f-cc682faf487d" question="dc1b92dc-44b1-4f2a-823f-cc682faf487d"> <label class="ConsonaFormRadioLabel" for="b6e7d1a6-01f2-41af-9b4f-d4e887be4c0f">9</label>
                                </div>
        
                                <div id="Line_dc1b92dc-44b1-4f2a-823f-cc682faf487d" class="ConsonaFormRadioLine">
                                    <input id="d1952aa2-76fc-48ce-9805-74e4b7466c4f" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="10" name="Resp_dc1b92dc-44b1-4f2a-823f-cc682faf487d" question="dc1b92dc-44b1-4f2a-823f-cc682faf487d"> <label class="ConsonaFormRadioLabel" for="d1952aa2-76fc-48ce-9805-74e4b7466c4f">10</label>
                                </div>
                            </fieldset>
                        </div>
        
                        <div id="Panel_1b885a63-bd3b-4be9-9327-d43536793c08" class="ConsonaFormField">
                            <fieldset class="ConsonaFieldSet">
                                <span class="ConsonaLegendText">Where 10 is most likely, and 1 is least likely, overall, how likely is it that you would recommend Time Warner Cable to a friend or colleague?</span>
        
                                <div class="clear"></div>
        
                                <div id="Line_1b885a63-bd3b-4be9-9327-d43536793c08" class="ConsonaFormRadioLine">
                                    <input id="588834f5-8931-49e3-b936-05602e045244" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="1" name="Resp_1b885a63-bd3b-4be9-9327-d43536793c08" question="1b885a63-bd3b-4be9-9327-d43536793c08"> <label class="ConsonaFormRadioLabel" for="588834f5-8931-49e3-b936-05602e045244">1</label>
                                </div>
        
                                <div id="Line_1b885a63-bd3b-4be9-9327-d43536793c08" class="ConsonaFormRadioLine">
                                    <input id="93e2a378-783d-457e-9be8-ee247dd6161b" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="2" name="Resp_1b885a63-bd3b-4be9-9327-d43536793c08" question="1b885a63-bd3b-4be9-9327-d43536793c08"> <label class="ConsonaFormRadioLabel" for="93e2a378-783d-457e-9be8-ee247dd6161b">2</label>
                                </div>
        
                                <div id="Line_1b885a63-bd3b-4be9-9327-d43536793c08" class="ConsonaFormRadioLine">
                                    <input id="40957d77-96ce-4748-bdfb-2d8d989182b0" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="3" name="Resp_1b885a63-bd3b-4be9-9327-d43536793c08" question="1b885a63-bd3b-4be9-9327-d43536793c08"> <label class="ConsonaFormRadioLabel" for="40957d77-96ce-4748-bdfb-2d8d989182b0">3</label>
                                </div>
        
                                <div id="Line_1b885a63-bd3b-4be9-9327-d43536793c08" class="ConsonaFormRadioLine">
                                    <input id="7ad6f725-99c9-4d75-ac90-48038da56b3b" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="4" name="Resp_1b885a63-bd3b-4be9-9327-d43536793c08" question="1b885a63-bd3b-4be9-9327-d43536793c08"> <label class="ConsonaFormRadioLabel" for="7ad6f725-99c9-4d75-ac90-48038da56b3b">4</label>
                                </div>
        
                                <div id="Line_1b885a63-bd3b-4be9-9327-d43536793c08" class="ConsonaFormRadioLine">
                                    <input id="43e1bd4c-00fc-4604-b006-2aecefa26769" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="5" name="Resp_1b885a63-bd3b-4be9-9327-d43536793c08" question="1b885a63-bd3b-4be9-9327-d43536793c08"> <label class="ConsonaFormRadioLabel" for="43e1bd4c-00fc-4604-b006-2aecefa26769">5</label>
                                </div>
        
                                <div id="Line_1b885a63-bd3b-4be9-9327-d43536793c08" class="ConsonaFormRadioLine">
                                    <input id="f8480078-0049-4e4b-a5f1-df02becb7010" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="6" name="Resp_1b885a63-bd3b-4be9-9327-d43536793c08" question="1b885a63-bd3b-4be9-9327-d43536793c08"> <label class="ConsonaFormRadioLabel" for="f8480078-0049-4e4b-a5f1-df02becb7010">6</label>
                                </div>
        
                                <div id="Line_1b885a63-bd3b-4be9-9327-d43536793c08" class="ConsonaFormRadioLine">
                                    <input id="08a79fe3-4204-41ba-bc46-9e03c30d163f" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="7" name="Resp_1b885a63-bd3b-4be9-9327-d43536793c08" question="1b885a63-bd3b-4be9-9327-d43536793c08"> <label class="ConsonaFormRadioLabel" for="08a79fe3-4204-41ba-bc46-9e03c30d163f">7</label>
                                </div>
        
                                <div id="Line_1b885a63-bd3b-4be9-9327-d43536793c08" class="ConsonaFormRadioLine">
                                    <input id="673f1aaf-824d-4955-8d69-639610cd5301" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="8" name="Resp_1b885a63-bd3b-4be9-9327-d43536793c08" question="1b885a63-bd3b-4be9-9327-d43536793c08"> <label class="ConsonaFormRadioLabel" for="673f1aaf-824d-4955-8d69-639610cd5301">8</label>
                                </div>
        
                                <div id="Line_1b885a63-bd3b-4be9-9327-d43536793c08" class="ConsonaFormRadioLine">
                                    <input id="d806684a-0335-4b84-bb5a-8a7c7c2d1a35" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="9" name="Resp_1b885a63-bd3b-4be9-9327-d43536793c08" question="1b885a63-bd3b-4be9-9327-d43536793c08"> <label class="ConsonaFormRadioLabel" for="d806684a-0335-4b84-bb5a-8a7c7c2d1a35">9</label>
                                </div>
        
                                <div id="Line_1b885a63-bd3b-4be9-9327-d43536793c08" class="ConsonaFormRadioLine">
                                    <input id="1d1b4b75-6083-4981-bbc8-3e1d4875bc9c" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="10" name="Resp_1b885a63-bd3b-4be9-9327-d43536793c08" question="1b885a63-bd3b-4be9-9327-d43536793c08"> <label class="ConsonaFormRadioLabel" for="1d1b4b75-6083-4981-bbc8-3e1d4875bc9c">10</label>
                                </div>
                            </fieldset>
                        </div>
        
                        <div id="Panel_2de77976-1fd2-49d6-9863-c39dc8c71e9e" class="ConsonaFormField">
                            <fieldset class="ConsonaFieldSet">
                                <span class="ConsonaLegendText">Did the representative offer a satisfactory solution to resolve your issue today?</span>
        
                                <div class="clear"></div>
        
                                <div id="Line_2de77976-1fd2-49d6-9863-c39dc8c71e9e" class="ConsonaFormRadioLine">
                                    <input id="e16014f8-824f-4de2-8426-fe5c0fa9945f" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" value="Yes, my issue was resolved." name="Resp_2de77976-1fd2-49d6-9863-c39dc8c71e9e" question="2de77976-1fd2-49d6-9863-c39dc8c71e9e"> <label class="ConsonaFormRadioLabel" for="e16014f8-824f-4de2-8426-fe5c0fa9945f">Yes, my issue was resolved.</label>
                                </div>
        
                                <div id="Line_2de77976-1fd2-49d6-9863-c39dc8c71e9e" class="ConsonaFormRadioLine">
                                    <input id="2c3bbc2a-0e83-4fda-82e1-73b673869ade" class="ConsonaFormInput ConsonaFormRadioOption" type="radio" t="" value="No, my issue wasn" name="Resp_2de77976-1fd2-49d6-9863-c39dc8c71e9e" question="2de77976-1fd2-49d6-9863-c39dc8c71e9e"> <label class="ConsonaFormRadioLabel" for="2c3bbc2a-0e83-4fda-82e1-73b673869ade">No, my issue wasn't resolved.</label>
                                </div>
                            </fieldset>
                        </div>
                        
                        <div id="Panel_e6398408-2586-4c97-b367-3a3c55a39e1a" class="ConsonaFormField">
                            <fieldset class="ConsonaFieldSet">
                                <span class="ConsonaLegendText">Comments: What can we do better?</span> 
                                <textarea id="4d6b4871-4d4c-41ef-86a8-66abed6f8d20" class="ConsonaFormInput ConsonaFormTextArea" value="" question="e6398408-2586-4c97-b367-3a3c55a39e1a" name="Resp_e6398408-2586-4c97-b367-3a3c55a39e1a" maxlength="999">
                                </textarea>
                            </fieldset>
                        </div>
                        
                    </div><br>

                </div>
                <!--.ccPostSurvey-->
                
            </div>
            <!--.ccContainer -->

            <div id="ccWait">
                <div id="ccSpinner"></div>
                <div id="ccWaitMessage">
                    Waiting for an analyst
                </div>
                <div id="ccWaitMessage" class="second">
                    Just a moment please...
                </div>
            </div>
            
            <div id="ccCloseConfirm" style="display:none; cursor: default">         
                <h3>End Your Chat Session?</h3>
                <div id="ccExitChat" class="cta omega">
                    <a href="#"><span>Yes</span></a>
                </div>
                <div id="ccCancelExit" class="cta omega">
                    <a href="#"><span>No</span></a>
                </div>
            </div> 
            
        </form>
    </div>
    <!--.chatUI-middle -->
    <div class="chatUI- bottom">
        <div id="ccStartChatButton" class="cta omega">
            <a href="#" onClick="ccStartChat()"><span>Start Chat</span></a>
        </div>
        <span class="language"><a href="">Español</a></span>
        <span class="show_transcript"><a id="transcript" href="">Chat Transcript</a></span>
    </div>
                                            
    <div class="chatUI- conversation">
        <textarea id="ccChatInput" class="ccInputBox"></textarea>
        <div id="ccRemoteControl" class="cta omega">          
            <a id="ccRCDisable" href="#"><span>Disable Remote Control</span></a>           
            <a id="ccRCEnable" href="#"><span>Enable Remote Control</span></a>    
        </div>  
        <div class="cta omega right">
            <a href="#"><span>Send</span></a>
        </div>
    </div>

    <div class="chatUI- surveyEnd">
        <div id="ccSubmitSurveyButton" class="cta omega">
            <a onclick="submitSurvey()"><span>Submit Survey</span></a> 
        </div>
        <div id="ccCancelSurveyButton" class="cta">
            <a onclick="cancelSurvey()"><span>Cancel</span></a>
        </div>
    </div>

    <div class="chatUI- transcript">
        <span class="hide_transcript"><a id="hide_transcript" href="">Close X</a></span>
        <p class="h5">Email Transcript To:</p>
        <input id="email_addr" type="email" name="email" placeholder="Enter email" autocomplete="email">
        <div class="cta omega">
            <a href="#"><span>Send</span></a>
        </div>
    </div>

    <div class="chatUI- footnote">
        <p>Please note that you will not be able to downgrade or disconnect a line of service via chat. Please call Customer Care for assistance.</p>
    </div>

    <div id="ccCloseConfirm" style="display:none; cursor: default">
        <h5>End Your Chat Session?</h5><input type="button" id="ccExitChat" value="Yes" /> <input type="button" id="ccCancelExit" value="No" />
    </div>
    </div>
    <!--.ChatUI -->

    <?php include($_SERVER['DOCUMENT_ROOT']. '/TWC/core/includes/footer.php'); ?>
