// ==UserScript==
// @name         EG_autocomplete_message_LS
// @namespace    http://tampermonkey.net/
// @version      0.0.7
// @description  Autovervollstaendigung
// @author       Tenzo & Nojheim
// @require      http://www.versi.info/EG/awesomecomplete/awesomplete.min.js
// @resource     awesomeCSS http://www.versi.info/EG/awesomecomplete/awesomplete.css
// @include      https://zyrthania.evergore.de/evergore.html?page=msg_new*
// @include      https://zyrthania.evergore.de/evergore.html?page=retail_new*
// @include      https://zyrthania.evergore.de/evergore.html?page=settings_account
// @include      https://endurias.evergore.de/evergore.html?page=msg_new*
// @include      https://endurias.evergore.de/evergore.html?page=retail_new*
// @include      https://endurias.evergore.de/evergore.html?page=settings_account
// @include      https://dunladan.evergore.de/evergore.html?page=msg_new*
// @include      https://dunladan.evergore.de/evergore.html?page=retail_new*
// @include      https://dunladan.evergore.de/evergore.html?page=settings_account
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function () {
    'use strict';

    var newCSS = GM_getResourceText("awesomeCSS");
    GM_addStyle(newCSS);
    GM_addStyle('* input::-webkit-calendar-picker-indicator { display: none;}');

    var input;

    //Setup globals
    var map = [];
    var mapSizeChanged = new Event('sizeChanged');
    var lsName;
    var lsNameDate;
    var sitelink;

    //current location
    var localSite = window.location.host;
    if (localSite.includes("zyrthania"))
    {
        lsName = "EGNamesZyr";
        lsNameDate = "EGNamesUpdateDateZyr";
        sitelink = "https://zyrthania.evergore.de/evergore.html?page=ranking_hero&pos=";
    } else  if (localSite.includes("endurias"))
    {
        lsName = "EGNamesEndu";
        lsNameDate = "EGNamesUpdateDateEndu";
        sitelink = "https://endurias.evergore.de/evergore.html?page=ranking_hero&pos=";
    } else  if (localSite.includes("dunladan"))
    {
        lsName = "EGNamesDun";
        lsNameDate = "EGNamesUpdateDateDun";
        sitelink = "https://dunladan.evergore.de/evergore.html?page=ranking_hero&pos=";
    }

    //Datalist structure
    var list = document.createElement("DATALIST");
    list.setAttribute("id", "nameList");

    //Check for cached Data and update if necessary
    if (localStorage.getItem(lsName) === null || localStorage.getItem(lsNameDate) === null) {
        populateLocalstorage();
    } else {
        updateNameList();
        addAutocompleteBehavior();
    }

    //Checks if Data is older than 1 week and updates.
    function updateNameList() {
        var today = new Date();
        var changeDate = new Date(JSON.parse(localStorage.getItem(lsNameDate)));
        changeDate.setDate(changeDate.getDate() + 7);
        if (today.getMonth() !== changeDate.getMonth() || today.getDate() > changeDate.getDate()) {
            populateLocalstorage();
            console.log("Daten veraltet. Neu Laden");
        }
    }

    //Adds behavior to textboxes
    function addAutocompleteBehavior() {
        console.log("addAutocompleteBehavior");
        var inputfield;

        //Add to input field on "new message"
        if (document.getElementsByName('recipient')[0] != null) {
            inputfield = "recipient";
        }
        //Add to input field on "transaction"
        else if(document.getElementsByName('target')[0] != null){
            inputfield = "target";
        }
        //Add on "option page"
        else {
            inputfield = "name";
        }

        document.getElementsByName(inputfield)[0].setAttribute("id", "awesomplete");
        document.getElementsByName(inputfield)[0].setAttribute("class", "awesomplete");
        input = document.getElementById("awesomplete");

        var storedNames = JSON.parse(localStorage.getItem(lsName));
        for(var z =0; z<storedNames.length; z++)
        {
            var optionElement = document.createElement("OPTION");
            optionElement.innerHTML = storedNames[z];
            list.appendChild(optionElement);
        }
        addDatalistToPage();

    }

    function addDatalistToPage() {
        console.log("addDatalistToPage");
        document.getElementById("awesomplete").append(list);

        new Awesomplete(input, {list: document.querySelector("#nameList"),
            minChars: 3,
            maxItems: 15 });
        //focus on input field
        document.getElementById("awesomplete").focus();


    }

    function populateLocalstorage() {
        console.log("populateLocalstorage");
        localStorage.removeItem(lsName);
        var elementCount = 1000;
        var lastPageNumber = Math.ceil(elementCount / 20);

        //event is fired as soon 'loadXMLDoc()' finishes loading a website
        document.addEventListener('sizeChanged', function () {
            var mapSize = Object.keys(map).length;
            var storageMap = [];
            if (mapSize === (lastPageNumber - 1)) {
                for (var j = 0; j < lastPageNumber - 1; j++) {
                    var rowsToAppend = map[j];
                    for (var i = 1; i < rowsToAppend.length; i++) {
                        storageMap.push(rowsToAppend[i].getElementsByTagName('a')[0].innerHTML);
                    }
                }
            }
            var unique = Array.from(new Set(storageMap));

            if(unique !== undefined && unique !== null && unique.length > 0)
            {
                console.log("wlenght: "+unique.length);
                console.log("SMlenght: "+storageMap.length);
                // var now = new Date().getTime().toString();
                localStorage.setItem(lsName, JSON.stringify(unique));
                localStorage.setItem(lsNameDate, JSON.stringify(new Date()));
                addAutocompleteBehavior();
            }
        } , false);

        for (var i = 11; i < elementCount; i += 20) {
            loadXMLDoc(sitelink + i);
        }
    }

    function loadXMLDoc(theURL) {
        console.log("loadXMLDoc");
        var xmlhttp;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
            xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onload = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                var doc = document.implementation.createDocument('', 'html', null);
                var body = document.createElementNS('', 'body');
                body.innerHTML = xmlhttp.responseText;
                doc.documentElement.appendChild(body);
                var rowsToAppend = doc.getElementById('CONT_BODY').getElementsByTagName("table")[2].getElementsByTagName("tr");
                map.push(rowsToAppend);
                document.dispatchEvent(mapSizeChanged);
            }
        };
        xmlhttp.open("GET", theURL, true);
        xmlhttp.overrideMimeType('text/xml; charset=iso-8859-1');
        xmlhttp.send();
    }
})();
