// ==UserScript==
// @name         Evergore market all articles
// @namespace    http://tampermonkey.net/
// @version      0.0.10
// @description  kann alle Seiten am Markt laden
// @author       Nojheim &Tenzo
// @match        http://zyrthania.evergore.de/evergore.html?page=market_all_articles*
// @match        https://zyrthania.evergore.de/evergore.html?page=market_all_articles*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function ready(f){
        /in/.test(document.readyState) ? setTimeout('ready('+f+')',9) : f();
    }

    var map = new Object();
    var mapSizeChanged = new Event('sizeChanged');
    var table;

    ready(function(){
        if(window.location.href.search("&pos=")==-1){
            table = document.getElementById('CONT_BODY').getElementsByTagName("table")[2];
            changeWholeTable();
            addExpandLink();
        }
    });

    function addExpandLink(){
        var a = document.createElement('a');
        var linkText = document.createTextNode("alle Seiten laden");
        a.appendChild(linkText);
        a.title = "alle Seiten laden";
        a.href = "#";
        a.addEventListener("click", loadPages);
        table.getElementsByTagName("th")[0].innerHTML +=" ";
        table.getElementsByTagName("th")[0].appendChild(a);
    }

    function loadPages(){
        console.log("loadPages");
        var elementCount = table.getElementsByTagName("th")[0].innerHTML.match("Gesamt: ([\\d]*)")[1];
        var lastPageNumber = Math.ceil(elementCount/20);
        table.getElementsByTagName("th")[0].innerHTML = "(Gesamt: "+elementCount+" )";

        document.addEventListener('sizeChanged', function (e) {
            var mapSize=Object.keys(map).length;
            if(mapSize==lastPageNumber-1){
                var marketTable = table.getElementsByTagName("tbody")[0];
                for(var j =2 ; j < lastPageNumber+1;j++ ){
                    var rowsToAppend = map[j];
                    for(var i =1 ; i < rowsToAppend.length;i++ ){
                        marketTable.appendChild(rowsToAppend[i].cloneNode(true));
                    }
                }
                changeWholeTable();
            }
        }, false);

        for(var i =2;i<lastPageNumber+1;i++){
            loadXMLDoc(window.location.href + "&pos="+i,i);
        }
    }

    function changeWholeTable(){
        table.getElementsByTagName("th")[0].colSpan=5;
        var allRows = table.getElementsByTagName("tr");
        for(var k =1 ; k < allRows.length;k++ ){
            if(allRows[k].getElementsByTagName("td").length<=4){
                var values = allRows[k].getElementsByTagName("td")[3].innerHTML.match(/([0-9]*[.]?[0-9]+)/g);
                var newTd = document.createElement('td');
                newTd.className = "Factor";
                var fac = Math.round(10000.0*(values[0]/values[1]))/100;
                newTd.innerHTML = fac;
                if( fac < 50) {
                    newTd.style.backgroundColor = "red";
                }else if( fac < 54) {
                    newTd.style.backgroundColor = "yellow";
                }
                allRows[k].getElementsByTagName("td")[0].getElementsByTagName("input")[0].onclick = function(){
                    changeLinksToOpenInNewTab(this.getAttribute('onclick').match(/(\?[^']*)/gi));
                };
                allRows[k].appendChild(newTd);
            }
        }
    }

    function changeLinksToOpenInNewTab(link){
        var win = window.open("evergore.html"+link, '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            return true;
        }
        return false; // <-- to suppress the default link behaviour
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
                var rowsToAppend = doc.getElementById('CONT_BODY').getElementsByTagName("table")[2].getElementsByTagName("tr");
                map[number]= rowsToAppend;
                document.dispatchEvent(mapSizeChanged);
            }
        };
        xmlhttp.open("GET", theURL, true);
        xmlhttp.send();
    }
})();
