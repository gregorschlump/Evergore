// ==UserScript==
// @name         EG_autocomplete_message_LS
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  Autovervollstaendigung
// @author       Tenzo & Nojheim
// @require      http://www.versi.info/EG/awesomecomplete/awesomplete.min.js
// @resource     awesomeCSS http://www.versi.info/EG/awesomecomplete/awesomplete.css
// @include      https://zyrthania.evergore.de/evergore.html?page=msg_new*
// @include      https://zyrthania.evergore.de/evergore.html?page=retail_new*
// @grant        GM_addStyle
// @grant       GM_getResourceText
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
    var awesomeplete;
    //Datalist structure
    var list = document.createElement("DATALIST");
    list.setAttribute("id", "nameList");

    //Check for cached Data
    if (localStorage.getItem("EGNames") === null) {
        populateLocalstorage();
    } else {
        addAutocompleteBehavior();
    }

    function addAutocompleteBehavior() {
        console.log("addAutocompleteBehavior");
        var inputfield;

        if (document.getElementsByName('recipient')[0] == null) {
            inputfield = "target";
        } else {
            inputfield = "recipient";
        }

        document.getElementsByName(inputfield)[0].setAttribute("id", "awesomplete");
        document.getElementsByName(inputfield)[0].setAttribute("class", "awesomplete");
        input = document.getElementById("awesomplete");

        var storedNames = JSON.parse(localStorage.getItem("EGNames"));
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
        document.getElementsByClassName("awesomplete")[0].append(list);
        //focus on input field
        document.getElementsByClassName("awesomplete")[0].focus();

        new Awesomplete(input, {list: document.querySelector("#nameList"),
                                minChars: 3,
                                maxItems: 15, });
        console.log("new Awesomplete");


    }

    function populateLocalstorage() {
        console.log("populateLocalstorage");
        localStorage.removeItem("EGNames");
        var elementCount = 1000;
        var lastPageNumber = Math.ceil(elementCount / 20);

        //event is fired as soon 'loadXMLDoc()' finishes loading a website
        document.addEventListener('sizeChanged', function (e) {
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
                localStorage.setItem("EGNames", JSON.stringify(storageMap));
                addAutocompleteBehavior();
            }
        } , false);

        for (var i = 11; i < elementCount; i += 20) {
            loadXMLDoc('https://zyrthania.evergore.de/evergore.html?page=ranking_hero&pos=' + i);
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
        xmlhttp.send();
    }
})();
