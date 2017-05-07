// ==UserScript==
// @name         Evergore Markt all Articles
// @namespace    http://tampermonkey.net/
// @version      0.0.7
// @description  kann alle Seiten am Markt laden
// @author       Nojheim &Tenzo
// @match        http://zyrthania.evergore.de/evergore.html?page=market_all_articles*
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
