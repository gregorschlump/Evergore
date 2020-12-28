// ==UserScript==
// @name         EG_battle_report_enchanced
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Verbessertes Kampfbericht
// @author       Bergi
// @include      https://evergore.de/ikandur?page=battle_report*
// @include      https://evergore.de/zyrthania?page=battle_report*
// @include      https://evergore.de/endurias?page=battle_report*
// @include      https://evergore.de/dunladan?page=battle_report*
// @grant        none
// ==/UserScript==

// überschreibt den Highlight-Funktion für besseres Ansicht (Verteidiger auch fett markiert)
if(typeof getName === 'function'){
    getName = function( p_id )
    {
        return '<a href="javascript:setHighlight(\'' + Participants[p_id].id + '\');" ' +
                  'class="CFaction' + Participants[p_id].faction + '">' +
                (Highlight == Participants[p_id].id ? '<b class="CR">' + Participants[p_id].name + '</b>' : Participants[p_id].name) +
                '</a>';
    };
}

(function() {
    'use strict';
    
    // Vergrößert die Kampfkarte
    var styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    var stylesheet = styleEl.sheet;
    stylesheet.insertRule('.bmap { transform: scale(1.5); margin: 30px 64px; }');
})();
