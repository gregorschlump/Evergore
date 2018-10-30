// ==UserScript==
// @name         EG_message_one_page
// @namespace    http://tampermonkey.net/
// @version      0.0.5
// @description  Läd alle Nachrichten
// @author       Nojheim
// @include      http://zyrthania.evergore.de/evergore.html?page=msg*
// @include      https://zyrthania.evergore.de/evergore.html?page=msg*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var map = new Object();
    var mapSizeChanged = new Event('sizeChanged');
    var table;

    
	if(window.location.href.search("&pos=")==-1 && window.location.href.search("&msg_id")==-1){
		table = document.getElementById('CONT_BODY').getElementsByTagName("form")[0].getElementsByTagName("table")[0];
		if( table.getElementsByTagName("th")[1].innerHTML.match("Gesamt: ([\\d]*)")[1]>20 ){
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
        table.getElementsByTagName("th")[1].innerHTML +=" ";
        table.getElementsByTagName("th")[1].appendChild(a);
    }
    function loadPages(){
        console.log("loadPages");
        var elementCount = table.getElementsByTagName("th")[1].innerHTML.match("Gesamt: ([\\d]*)")[1];
        table.getElementsByTagName("th")[1].innerHTML = "(Gesamt: "+elementCount+" )";
        var lastPageNumber = Math.ceil(elementCount/20);
        document.addEventListener('sizeChanged', function (e) {
            var mapSize=Object.keys(map).length;
            if(mapSize==lastPageNumber-1){
                var marketTable = table.getElementsByTagName("tbody")[0];
                for(var j =2 ; j <= lastPageNumber;j++ ){
                    var rowsToAppend = map[j];
                    for(var i =1 ; i < rowsToAppend.length-1;i++ ){
                        marketTable.appendChild(rowsToAppend[i].cloneNode(true));
                    }
                }
                var gesammtanzahl = table.getElementsByTagName("tr").length-1;
                table.getElementsByTagName("th")[1].innerHTML = "(Gesamt "+gesammtanzahl+")";
                //loeschen für mehr als eine Nachricht noch nicht möglich also ausblenden
                table.getElementsByTagName("tr")[21].outerHTML ="";
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
