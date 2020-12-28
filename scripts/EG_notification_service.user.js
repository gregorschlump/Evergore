// ==UserScript==
// @name        EG_notification_service_LS
// @namespace   http://tampermonkey.net/
// @version     0.0.1
// @description Autovervollstaendigung
// @author      Tenzo
// @match       https://evergore.de/ikandur*
// @match       https://evergore.de/zyrthania*
// @match       https://evergore.de/endurias*
// @match       https://evergore.de/dunladan*
// @grant       GM_notification
// @grant       window.focus
// @grant       GM_xmlhttpRequest
// ==/UserScript==

console.log ('Test script start.');

var notificationDetails = {
    text:       'Test notification body.',
    title:      'Test notice title',
    timeout:    6000,
    onclick:    function () {
        console.log ("Notice clicked.");
        window.focus ();
    }
};


//GM_notification (notificationDetails);
(function () {
    //     setInterval(shim_GM_notification(), 1000);
    var url
    var ssName;

    //current location
    var localSite = window.location.hostname;
    if (localSite.includes("ikandur"))
        
    } else if (localSite.includes("ikandur"))
                ssName = "EGNotificationIka";
        url = "https://evergore.de/ikandur?page=ranking_hero&pos=";
    {
        ssName = "EGNotificationZyr";
        url = "https://evergore.de/zyrthania?page=ranking_hero&pos=";
    } else  if (localSite.includes("endurias"))
    {
        ssName = "EGNotificationEndu";
        url = "https://evergore.de/endurias?page=ranking_hero&pos=";
    } else  if (localSite.includes("dunladan"))
    {
        ssName = "EGNotificationDun";
        url = "https://evergore.de/dunladan?page=ranking_hero&pos=*";
    }

    interval(function(){
        console.log("Hallo")
        parseJSON()
    }, 1000, 10);




    function parseJSON(){
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var myArr = JSON.parse(this.responseText);
                myFunction(myArr);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        function myFunction(arr) {
            console.log(arr);
            console.log("RC " + arr.rc);
        }
    }
    function interval(func, wait, times){
        var interv = function(w, t){
            return function(){
                if(typeof t === "undefined" || t-- > 0){
                    setTimeout(interv, w);
                    try{
                        func.call(null);
                    }
                    catch(e){
                        t = 0;
                        throw e.toString();
                    }
                }
            };
        }(wait, times);
        setTimeout(interv, wait);
    };
    /*--- Cross-browser Shim code follows:
*/
    function shim_GM_notification () {
        if (typeof GM_notification === "function") {
            return;
        }
        window.GM_notification = function (ntcOptions) {
            checkPermission ();

            function checkPermission () {
                if (Notification.permission === "granted") {
                    fireNotice ();
                }
                else if (Notification.permission === "denied") {
                    alert ("User has denied notifications for this page/site!");
                }
                else {
                    Notification.requestPermission ( function (permission) {
                        console.log ("New permission: ", permission);
                        checkPermission ();
                    } );
                }
            }

            function fireNotice () {
                if ( ! ntcOptions.title) {
                    console.log ("Title is required for notification");
                    return;
                }
                if (ntcOptions.text  &&  ! ntcOptions.body) {
                    ntcOptions.body = ntcOptions.text;
                }
                var ntfctn  = new Notification (ntcOptions.title, ntcOptions);

                if (ntcOptions.onclick) {
                    ntfctn.onclick = ntcOptions.onclick;
                }
                if (ntcOptions.timeout) {
                    setTimeout ( function() {
                        ntfctn.close ();
                    }, ntcOptions.timeout);
                }
            }
        }
    }
})();
