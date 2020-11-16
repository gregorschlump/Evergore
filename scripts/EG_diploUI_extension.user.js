// ==UserScript==
// @name         EG_diploUI_extension
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  UI verbesserung fuer das Diplo-Menu
// @author       Tenzo & Nojheim
// @include      https://evergore.de/dunladan?page=diplomacy
// @include      https://evergore.de/endurias?page=diplomacy
// @include      https://evergore.de/zyrthania?page=diplomacy
// @include      https://evergore.de/ikandur?page=diplomacy
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==


(function() {
    'use strict';

    var map = new Object();
    var table;

    //Get Table
    table = document.getElementById('CONT_BODY');
    var len = table.getElementsByTagName("table").length;
    console.log("Anzahl Tabellen: " + len);

    var test =  table.getElementsByTagName("table")[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[0].innerHTML;
    console.log("Inhalt: " + test);

})();
