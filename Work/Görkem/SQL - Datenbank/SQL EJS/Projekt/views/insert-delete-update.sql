/*-- 1. Abrufen der Städte aus der city-Tabelle (GET-Anfrage)*/

SELECT *
FROM city
WHERE country = 'A';

/*-- 2. Erstellen einer neuen Stadt in der city-Tabelle (POST-Anfrage)*/

INSERT INTO city (name, Province, Country, Population) VALUES ('Bludenz', 'Vorarlberg', 'A', 15000);

/*-- 3.  Löschen einer Stadt aus der city-Tabelle (POST-Anfrage)*/

DELETE FROM city
WHERE name = 'zzzz'
	AND country = 'A';