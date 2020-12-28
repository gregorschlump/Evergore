// ==UserScript==
// @name         EG_protocol_one_page
// @namespace    http://tampermonkey.net/
// @version      0.0.7
// @description  Läd alle Einträge der Protokolle
// @author       Nojheim
// @include        https://evergore.de/ikandur?page=guild_protocol*
// @include        https://evergore.de/ikandur?page=town_protocol*
// @include        https://evergore.de/ikandur?page=market_protocol*
// @include        https://evergore.de/zyrthania?page=guild_protocol*
// @include        https://evergore.de/zyrthania?page=town_protocol*
// @include        https://evergore.de/zyrthania?page=market_protocol*
// @include        https://evergore.de/endurias?page=guild_protocol*
// @include        https://evergore.de/endurias?page=town_protocol*
// @include        https://evergore.de/endurias?page=market_protocol*
// @include        https://evergore.de/dunladan?page=guild_protocol*
// @include        https://evergore.de/dunladan?page=town_protocol*
// @include        https://evergore.de/dunladan?page=market_protocol*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var map = new Object();
    var mapSizeChanged = new Event('sizeChanged');

    if(window.location.href.search("&pos=")==-1){
		if(document.getElementById('CONT_BODY').getElementsByTagName("table")[1].getElementsByTagName("th")[0].innerHTML.match("von ([\\d]*)")[1]>1){
			addExpandLink();
		}
	}
    

    function addExpandLink(){
        var a = document.createElement('a');
        var linkText = document.createTextNode("alle Seiten laden");
        a.appendChild(linkText);
        a.title = "alle Seiten laden";
        a.href = "#";
        a.addEventListener("click", loadPages);
        document.getElementById('CONT_BODY').getElementsByTagName("table")[1].getElementsByTagName("th")[0].innerHTML +=" ";
        document.getElementById('CONT_BODY').getElementsByTagName("table")[1].getElementsByTagName("th")[0].appendChild(a);
    }
    function loadPages(){
        console.log("loadPages");
        var lastPageNumber = document.getElementById('CONT_BODY').getElementsByTagName("table")[1].getElementsByTagName("th")[0].innerHTML.match("von ([\\d]*)")[1];
        document.addEventListener('sizeChanged', function (e) {
            var mapSize=Object.keys(map).length;
            if(mapSize==lastPageNumber-1){
                var marketTable = document.getElementById('CONT_BODY').getElementsByTagName("table")[1].getElementsByTagName("tbody")[0];
                for(var j =2 ; j <= lastPageNumber;j++ ){
                    var rowsToAppend = map[j];
                    for(var i =1 ; i < rowsToAppend.length;i++ ){
                        marketTable.appendChild(rowsToAppend[i].cloneNode(true));
                    }
                }
                var gesammtanzahl = document.getElementById('CONT_BODY').getElementsByTagName("table")[1].getElementsByTagName("tr").length-1;
                document.getElementById('CONT_BODY').getElementsByTagName("table")[1].getElementsByTagName("th")[0].innerHTML = "(Gesamt "+gesammtanzahl+")";
            }
        }, false);

        for(var i =2;i<=lastPageNumber;i++){
            loadXMLDoc(window.location.href + "&pos="+i,i);
        }
    }
    function loadXMLDoc(theURL,number)
    {
        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onload=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                var doc = document.implementation.createDocument ('', 'html', null);
                var body = document.createElementNS('', 'body');
                body.innerHTML = xmlhttp.responseText;
                doc.documentElement.appendChild(body);
                var rowsToAppend = doc.getElementById('CONT_BODY').getElementsByTagName("table")[1].getElementsByTagName("tr");
                map[number]= rowsToAppend;
                document.dispatchEvent(mapSizeChanged);
            }
        };
        xmlhttp.open("GET", theURL, true);
	xmlhttp.overrideMimeType('text/xml; charset=utf-8');
        xmlhttp.send();
    }
})();
