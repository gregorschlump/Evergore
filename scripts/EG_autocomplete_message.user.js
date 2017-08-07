// ==UserScript==
// @name         EG_autocomplete_message
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Autovervollständigung
// @author       Tenzo & Nojheim
// @include      https://zyrthania.evergore.de/evergore.html?page=msg_new*
// @include      https://zyrthania.evergore.de/evergore.html?page=retail_new*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle('* input::-webkit-calendar-picker-indicator { display: none;}');

    var map = [];
    var mapSizeChanged = new Event('sizeChanged');

    addAutocompleteBehavior();

    function addAutocompleteBehavior() {
        var inputfield;

        if (document.getElementsByName('recipient')[0] == null) {
            inputfield = "target";
        } else {
            inputfield = "recipient";
        }

        var list = document.createElement("DATALIST");
        list.setAttribute("id", "nameList");
        document.getElementsByName(inputfield)[0].appendChild(list);

        var z1 = document.createElement("OPTION");
        z1.setAttribute("value", "Chrome");
        document.getElementById("nameList").appendChild(z1);

        document.getElementsByName(inputfield)[0].setAttribute("list", "nameList");
        loadPages();
    }

    function loadPages(){
        var elementCount = 1000;
        var lastPageNumber = Math.ceil(elementCount/20);

        document.addEventListener('sizeChanged', function (e) {
            var mapSize = Object.keys(map).length;
            if (mapSize == lastPageNumber - 1) {
                var nameList = document.getElementById("nameList");
                for (var j = 0; j < lastPageNumber-1; j++) {
                    var rowsToAppend = map[j];
                    for (var i = 1; i < rowsToAppend.length; i++) {
                        var optionElement = document.createElement("OPTION");
                        optionElement.setAttribute("value", rowsToAppend[i].getElementsByTagName('a')[0].innerHTML);
                        nameList.appendChild(optionElement);
                    }
                }
            }
        }, false);

        for (var i = 11; i < elementCount; i+=20) {
            loadXMLDoc('https://zyrthania.evergore.de/evergore.html?page=ranking_hero&pos='+i);
        }
    }

    function loadXMLDoc(theURL) {
        var xmlhttp;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
            xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onload = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
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
