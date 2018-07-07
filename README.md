# Evergore

Skriptsammlung für das Browsergame Evergore welche mit Tampermonkey oder Greasemonkey genutzt werden können.

## Wie Installieren?
* Installiere das Plugin Tampermonkey oder Greasemonkey in deinem Browser 
* Klicke im Github repository auf das Skript welches du gerne nutzen möchtest. (Auf die Datei z.B. EG_protocol_one_page.user.js)
* Klicke, auf der sich nun geöffneten Seite, den Button "Raw", nun öffnet sich euer Plugin mit einem Installationsscreen. Ihr werdet gefragt ob ihr dieses Skript wirklich benutzen wollt. Bestätigt durch ein Klick auf Installieren.
* Nun ist das installierte Skript aktiv. 

## Wie Update ich ein Skript
* Hast du das Skript wie oben beschrieben Installiert kannst du die automatische Update-Funktion nutzen. 
* Klickt auf euer Pluginsymol und in dem sich dort öffnenden Fenster auf "Skripte auf Updates prüfen".
* Ihr könnt die Installation wie oben beschrieben auch wiederholen, dabei werdet ihr gefragt ob ihr Updaten möchtet.

## Skripe deaktivieren oder löschen
* Wenn ein Skript auf der aktuellen Webseite aktiv ist seht ihr bei eurem Tampermonkey Plugin Symbol eine Rote Zahl. Diese Zahl steht für die Anzahl der aktiven Skripte.
* Klickt auf das Pluginsymbol werden alle Skripe Aufgelistet welche ihr durch linksklicken aktivieren und deaktivieren könnt.

## Skripe löschen
* Klickt auf euer Pluginsymbol, und dort auf Übersicht (Dashbord)
* In der sich öffnenden Übersicht könnt ihr unter "Installierte Skripte" eure Skripte verwalten und löschen.


## Skripte mit Funktionsbeschreibung

### "EG_market_one_page.user.js"
Skript ist aktiv auf:
* https://zyrthania.evergore.de/evergore.html?page=market_all_articles*

Funktionalität Markt:
- Anzeigen aller Einträge der Marktübersicht auf einer Seite. Filter sind weiterhin nutzbar.
- Berechnung des Prozentualen Verkaufpreises, gemessen am Marktwert
- Farbliche Kennzeichnung von Angeboten unter 50% (rot) und unter 53% (gelb)
- Aus der Marktübersicht werden die Marktstände in einem neuen Tab geöffenet, anstatt im gleichen Fenster

### "EG_protocol_one_page.user.js"
Skript ist aktiv auf:
* https://zyrthania.evergore.de/evergore.html?page=guild_protocol*
* https://zyrthania.evergore.de/evergore.html?page=town_protocol*
* https://zyrthania.evergore.de/evergore.html?page=market_protocol*

Funktionen Gildenprotokoll und Stadtprotokoll:
- Anzeigen aller Einträge des Protokolls auf einer Seite. Filter sind weiterhin nutzbar.
- Berechnung der Gesamteinträge

### "EG_message_one_page.user.js"
Skript ist aktiv auf:
* https://zyrthania.evergore.de/evergore.html?page=msg*

Funktionen bei Nachrichten
- Anzeigen aller Nachrichten bei Eingang, Ausgang und Papierkorp
- Berechnung der Gesamteinträge
- Nachrichten können in dieser Ansicht nicht gelöscht werden.

### "EG_warehouse_one_page.user.js"
Skript ist aktiv auf:
* https://zyrthania.evergore.de/evergore.html?page=stock_out*

Funktionen im Lager 
- Anzeigen aller Einträge des Lagers, Filter sind weiterhin aktiv
- Berechnung der Gesamteinträge
- Waren können in dieser Ansicht nicht aus dem Lager entnommen werden.

### "EG_autocomplete_names.user.js"
Skript ist aktiv auf:
* https://zyrthania.evergore.de/evergore.html?page=msg_new*
* https://zyrthania.evergore.de/evergore.html?page=retail_new*

Funktionen bei Nachrichten und Tauschhandel
- Das Namensfeld hat eine Vorschlagsliste mit Spielernamen welche nach 3 Buchstaben erscheint

### "EG_battle_report_enchanced.user.js"
Skript ist aktiv auf:
* https://zyrthania.evergore.de/evergore.html?page=battle_report*

Funktionen bei Kampfberichte
- Vergrößert den Kampfkarte um 50%
- Highlights werden auch fett hervorgehoben, an denen der Markierte keine Aktion selbst ausführt
