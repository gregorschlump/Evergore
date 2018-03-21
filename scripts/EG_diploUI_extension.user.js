// ==UserScript==
// @name         EG_diploUI_extension
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  UI verbesserung fuer das Diplo-Menu
// @author       Tenzo & Nojheim
// @include      https://zyrthania.evergore.de/evergore.html?page=diplomacy
// @include      http://zyrthania.evergore.de/evergore.html?page=diplomacy
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
    console("Anzahl Tabellen: " + len);


})();