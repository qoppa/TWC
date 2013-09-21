var chatPanel;
var chatSpinner;
var Disconnected = false;
window.ChatInitialized = false;
$(function() {
    $("#chatwindow").draggable({
        handle: "#dragbar"
    });
    $("#dragbar").disableSelection();
    $("#header").disableSelection();
    $("#chatgirl").click(function() {
    	$('#confirmCust').toggle();
    }
    $("#confirmCust").click(function() {
        if ($("#chatwindow").css("display") == "none") {
            var pos = $("#chatinvite").offset();
            $("#chatwindow").css({
                "left": (pos.left - 40) + "px",
                "top": (pos.top + 65) + "px"
            });
            $("#chatwindow").fadeIn('fast');
            if (!window.ChatInitialized === true) {
                ClearPreSurvey();
                ClearChatForm();
                window.ChatInitialized = true;
            }
        }
    });
    $("#ccExitChat").click(function() {
        $("#container").unblock();
        ccPlugin.CloseSession();
    });
    $("#ccCancelExit").click(function() {
        $("#container").unblock();
    });
    $("#ccRCDisable").click(function() {
        $("#ccRCDisable").hide();
        $("#ccRCEnable").show();
        raPlugin.RAStateControl.RemoteControlEnable(1);
    });
    $("#ccRCEnable").click(function() {
        if ($.cookie("acceptedEULA") != "true") {
            $.blockUI({
                css: {
                    "z-index": "50000",
                    cursor: "default",
                    left: "100px",
                    top: "5px",
                    width: "620px",
                    height: "420px"
                },
                message: $("#ccEULA")
            });
        } else {
            $("#ccRCEnable").hide();
            $("#ccRCDisable").show();
            raPlugin.RAStateControl.RemoteControlEnable(2);
        }
    });
    $("#ccAcceptEULA").click(function() {
        $.unblockUI();
        $.cookie("acceptedEULA", "true", {
            "path": "/"
        });
        $("#ccRCEnable").hide();
        $("#ccRCDisable").show();
        raPlugin.RAStateControl.RemoteControlEnable(2);
    });
    $("#ccDeclineEULA").click(function() {
        $.unblockUI();
    });
    $("#hidewindow").click(function() {
        switch ($.ConsonaChat.sessionData.sessionstate) {
        case ccChatState.working:
        case ccChatState.waiting:
        case ccChatState.escalate:
            $("#container").block({
                message: $("#ccCloseConfirm"),
                css: {
                    width: "70%",
                    padding: "10px"
                }
            });
            break;
        default:
            $("#chatwindow").fadeOut("fast");
        }
    });
}); /* Add MAXLENGTH property support for TEXTAREA form elements */
$(function($) {
    var ignore = [8, 9, 13, 33, 34, 35, 36, 37, 38, 39, 40, 46];
    var eventName = 'keypress';
    $('textarea[maxlength]').live(eventName, function(event) {
        var self = $(this),
            maxlength = self.attr('maxlength'),
            code = $.data(this, 'keycode');
        if (maxlength && maxlength > 0) {
            return (self.val().length < maxlength || $.inArray(code, ignore) !== -1);
        }
    }).live('keydown', function(event) {
        $.data(this, 'keycode', event.keyCode || event.which);
    });
});
$(function($) {
    if (!window.chatLoaded) {
        window.chatLoaded = true;
        window.ccPlugin = $.ConsonaChat;
        window.csPlugin = $.ConsonaSurvey;
        window.raPlugin = $.ConsonaRemote;
        window.ccOptions = $.ConsonaChat.options;
        window.ccChatState = $.ConsonaChat.enumSessionState;
        window.ccMsgType = $.ConsonaChat.enumMessageType;
        if (ccPlugin.GetSessionState() == "waiting" || ccPlugin.GetSessionState() == "working" || ccPlugin.GetSessionState() == "escalate") {
            restartChat();
        } else {
            ccPlugin.ResetSession();
        }
    }
});

function EnableInputs() {
    $("#ccChatInput").removeAttr("disabled");
}

function DisableInputs() {
    $("#ccChatInput").attr("disabled", true);
}

function setChatEnvironment() {
    $('a').live('click', function() {
        if (String(this.href).indexOf("#") < 0) {
            ccOptions.inFormOrLink = true;
        }
    });
    ccOptions.hookUnload = true;
    $.preLoadImages("https://supportcenterqa.timewarnercable.com/sdccommon/lachat/images/scic_chat_connecting_flash.gif", "https://supportcenterqa.timewarnercable.com/sdccommon/lachat/images/scic_chat_unavailable.gif", "https://supportcenterqa.timewarnercable.com/sdccommon/lachat/images/aic_close_24.gif");
    ccOptions.displayNode = "#ccChatOutput";
    ccOptions.inputNode = "#ccChatInput";
    ccOptions.sendButton = "#ccSendButton";
    ccPlugin.events.onError = function(Msg) {
        if (Msg.toLowerCase().indexOf("queue not available") > -1) {
            $("#ccWait").hide();
            chatSpinner.stop();
            $("#ccChatStatusImg").attr("src", "https://supportcenterqa.timewarnercable.com/sdccommon/lachat/images/scic_chat_unavailable.gif");
            $("#ccChatStatusMsg").text("Queue not available.");
            $("#ccChatStatusBar").fadeIn(500);
            Disconnected = true;
            DisableInputs();
        }
    };
    ccPlugin.events.onPoll = function() {
        if (Disconnected) {
            if ($.ConsonaChat.GetSessionState() == "waiting") {
                $("#ccChatStatusImg").attr("src", "https://supportcenterqa.timewarnercable.com/sdccommon/lachat/images/scic_chat_connecting_flash.gif");
                $("#ccChatStatusMsg").text("Waiting for an analyst.");
                DisableInputs();
            } else {
                $("#ccChatStatusBar").fadeOut(500);
                EnableInputs();
            }
        }
        Disconnected = false;
    };
    ccPlugin.events.onStateChange = function(Status) {
        switch (Status) {
        case ccChatState.ready:
            break;
        case ccChatState.working:
            $("#ccChatStatusBar").fadeOut(500);
            EnableInputs();
            break;
        case ccChatState.closed:
            $("#ccWaitMessage").html("Closing your chat session")
            $("#ccWait").show();
            chatSpinner = new Spinner({
                lines: 8,
                length: 7,
                width: 5,
                radius: 10,
                color: '#606060',
                speed: 1,
                trail: 50,
                shadow: false
            }).spin(document.getElementById('ccSpinner'));
            break;
        case ccChatState.waiting:
        case ccChatState.escalate:
            $("#ccChatStatusBar").fadeIn(500);
            DisableInputs();
            break;
        case ccChatState.error:
            break;
        default:
        }
    };
    ccPlugin.events.onSessionComplete = function() {
        chatSpinner.stop();
        $("#chatwindow").fadeOut('fast');
        $("#ccContainer").hide();
        $("#ccRCDisable").hide();
        $("#ccRCEnable").hide();
        $("#ccRemoteControl").hide();
        $("#controlsdiv").html("");
        showSurvey();
    };
    ccPlugin.events.onTypingChange = function(User) {
        if (User.user_type == "analyst" && User.typing == "true") $("#ccTypingStatus").fadeIn(250);
        if (User.user_type == "analyst" && User.typing == "false") $("#ccTypingStatus").fadeOut(250);
    };
}

function RestartRemote() {
    $("#ccRCEnable").hide();
    $("#ccRCDisable").show();
    raPlugin.RAStateControl.RemoteControlEnable(0);
    setTimeout("raPlugin.RAStateControl.RemoteControlEnable(2)", 500);
}

function restartChat() {
    $("#ccPreSurvey").hide();
    $("#ccWait").hide();
    setChatEnvironment();
    $("#ccContainer").show();
    $.ConsonaChat.RestartSession();
    try {
        if (window.raPlugin.ActiveXControl.MeetsControlsRequirements()) {
            window.raPlugin.Start(ccPlugin.sessionData.username, ccPlugin.sessionData.room, ccPlugin.sessionData.queue, true);
            if ($.cookie("RemoteStatus") == "2") {
                setTimeout("RestartRemote()", 1000);
            } else {
                $("#ccRCDisable").hide();
                $("#ccRCEnable").show();
            }
        }
    } catch (e) {}
    if ($.ConsonaChat.events.onStateChange) $.ConsonaChat.events.onStateChange($.ConsonaChat.sessionData.sessionstate);
    var pos = $("#chatinvite").offset();
    $("#chatwindow").css({
        "left": (pos.left - 40) + "px",
        "top": (pos.top + 65) + "px"
    });
    $("#chatwindow").fadeIn('fast');
    setTimeout("SendURL()", 1000);
}

function SendURL() {
    ccPlugin.SendMessage({
        msgType: ccMsgType.internal,
        msgText: 'User has navigated to ' + window.location
    });
}

function ccStartChat() {
    if (ValidatePreSurvey()) {
        $("#ccPreSurvey").hide();
        $("#ccContainer").show();
        chatSpinner = new Spinner({
            lines: 8,
            length: 7,
            width: 5,
            radius: 10,
            color: '#606060',
            speed: 1,
            trail: 50,
            shadow: false
        }).spin(document.getElementById('ccSpinner'));
        ccPlugin.ResetSession();
        setChatEnvironment();
        ccPlugin.sessionData.username = $("#ccChatFirstName").val();
        ccPlugin.sessionData.firstname = $("#ccChatFirstName").val();
        //ccPlugin.sessionData.lastname = $("#ccChatLastName").val();
        //ccPlugin.sessionData.emailaddress = $("#ccChatEmail").val();
        ccPlugin.sessionData.street = "";
        ccPlugin.sessionData.aptnum = "";
        ccPlugin.sessionData.city = "";
        ccPlugin.sessionData.state = "";
        ccPlugin.sessionData.zipcode = "";
        //ccPlugin.sessionData.phone = $("#ccChatTelephone").val();
        ccPlugin.sessionData.accountnumber = "";
        ccPlugin.sessionData.pin = "";
        ccPlugin.sessionData.securitynumber = "";
        ccPlugin.sessionData.division = "TW-Carolinas";
        ccPlugin.sessionData.chatreasons = "Cable/Video Issues";
        ccPlugin.sessionData.queue = "NHD_Residential_Tier2";
        ccPlugin.sessionData.statementofproblem = $("#ccChatProblem").val();
        ccPlugin.sessionData.language = $("input[name=ccLanguageOption]:checked").val();
        ccPlugin.sessionData.device = $("input[name=ccDeviceOption]:checked").val();
        var MobileDevices = ["Netbook", "Tablet", "Mobile"]
        ccPlugin.sessionData.mobile = (jQuery.inArray(ccPlugin.sessionData.device, MobileDevices) >= 0) ? "True" : "False";
        ccPlugin.sessionData.sendtranscript = "yes";
        DisableInputs();
        ccPlugin.CreateSession(function() {
            $("#ccWait").hide();
            chatSpinner.stop();
            try {
                if (window.raPlugin.ActiveXControl.MeetsControlsRequirements()) {
                    window.raPlugin.Start(ccPlugin.sessionData.username, ccPlugin.sessionData.room, ccPlugin.sessionData.queue, false);
                    $("#ccRCDisable").hide();
                    $("#ccRCEnable").show();
                }
            } catch (e) {}
        });
    }
}

function ClearPreSurvey() {
    $("#ccChatFirstName").val("");
    //$("#ccChatLastName").val("");
    //$("#ccChatTelephone").val("");
    //$("#ccChatEmail").val("");
    $("#ccChatProblem").val("");
    $("#ccPreSurvey").show();
}

function ClearChatForm() {
    $("#ccChatInput").val("");
    $("#ccChatOutput").html("");
    $("#ccWaitMessage").html("Waiting for an Analyst");
}

function ValidatePreSurvey() {
    var WarningMessages = $("<ul></ul>");
    var WarningNumber = 0;
    var MissingReq = false;
    $("#ccPreSurveyWarningMsg").html("");
    if ($("#ccChatFirstName").val() == "") {
        $("#ccChatFirstNameLabel").css("color", "firebrick");
        $("#ccChatFirstNameLabel").css("font-weight", "bold");
        if (!MissingReq) {
            MissingReq = true;
            WarningNumber++;
            WarningMessages.append("<li>" + (WarningNumber) + ") Missing required field</li>");
        }
    } else {
        $("#ccChatFirstNameLabel").css("color", "");
        $("#ccChatFirstNameLabel").css("font-weight", "");
    }
    if ($("#ccChatLastName").val() == "") {
        $("#ccChatLastNameLabel").css("color", "firebrick");
        $("#ccChatLastNameLabel").css("font-weight", "bold");
        if (!MissingReq) {
            MissingReq = true;
            WarningNumber++;
            WarningMessages.append("<li>" + (WarningNumber) + ") Missing required field</li>");
        }
    } else {
        $("#ccChatLastNameLabel").css("color", "");
        $("#ccChatLastNameLabel").css("font-weight", "");
    }
    if ($("#ccChatProblem").val() == "") {
        $("#ccChatProblemLabel").css("color", "firebrick");
        $("#ccChatProblemLabel").css("font-weight", "bold");
        if (!MissingReq) {
            MissingReq = true;
            WarningNumber++;
            WarningMessages.append("<li>" + (WarningNumber) + ") Missing required field</li>");
        }
    } else {
        $("#ccChatProblemLabel").css("color", "");
        $("#ccChatProblemLabel").css("font-weight", "");
    }
    /*
if (($("#ccChatEmail").val() != "") && (!isValidEmailAddress($("#ccChatEmail").val()))) {
        $("#ccChatEmailLabel").css("color", "firebrick");
        $("#ccChatEmailLabel").css("font-weight", "bold");
        WarningNumber++;
        WarningMessages.append("<li>" + (WarningNumber) + ") Invalid email address</li>");
    } else {
        $("#ccChatEmailLabel").css("color", "");
        $("#ccChatEmailLabel").css("font-weight", "");
    }
    if (($("#ccChatTelephone").val() != "") && (!isValidPhoneNumber($("#ccChatTelephone").val()))) {
        $("#ccChatTelephoneLabel").css("color", "firebrick");
        $("#ccChatTelephoneLabel").css("font-weight", "bold");
        WarningNumber++;
        WarningMessages.append("<li>" + (WarningNumber) + ") Invalid phone number</li>");
    } else {
        $("#ccChatTelephoneLabel").css("color", "");
        $("#ccChatTelephoneLabel").css("font-weight", "");
    }
*/
    $("#ccPreSurveyWarningMsg").append(WarningMessages);
    if (WarningNumber > 0) {
        $("#ccPreSurveyWarning").show();
        return false;
    } else {
        $("#ccPreSurveyWarning").hide();
    }
    return true;
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

function isValidPhoneNumber(phoneNumber) {
    var pattern = new RegExp(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/);
    return pattern.test(phoneNumber);
}

function showSurvey() {
    var pos = $("#chatinvite").offset();
    $("#ccSurveyQuestions").html("");
    csPlugin.events.onDisabled = function() {};
    csPlugin.events.onEnabled = function() {
        $.each($.ConsonaSurvey.questions, function() {
            if (this.title) {
                $("#ccSurveyQuestions").append($.ConsonaSurvey.renderQuestion(this));
            }
        });
        $.blockUI({
            css: {
                cursor: "default",
                width: "280px",
                height: "400px",
                overflow: "auto",
                left: (pos.left - 40) + "px",
                top: "65px"
            },
            message: $("#ccPostSurvey")
        });
    };
    csPlugin.getSurveyData(ccPlugin.sessionData.queue, ccPlugin.sessionData.room, ccPlugin.sessionData.language);
    window.ChatInitialized = false;
    ccPlugin.ResetSession();
}

function cancelSurvey() {
    $.unblockUI();
}

function submitSurvey() {
    $.unblockUI();
    $.ConsonaSurvey.events.onSubmit = function() {}
    $.ConsonaSurvey.submitSurvey();
}