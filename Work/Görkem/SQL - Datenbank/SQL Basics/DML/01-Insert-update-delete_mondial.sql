/* 1. Erstelle eine neue Stadt in der Mondial Datenbank */
INSERT INTO city (name, country, Province, Population, Latitude, Longitude)
VALUES ('Sinop', 'TR', 'Sinop', 58000, 42.0268, 35.1511);

-- this query updates the following values from city Sinop 
UPDATE city 
SET population = 58000,
	longitude = 35.1511,
	latitude = 42.0268
WHERE name = 'Sinop';

-- This query selects all columns from the 'city' table where the city name is 'Sinop' (Update to Esenler)*/
SELECT *
FROM city
WHERE name = 'Esenler';

-- 2. Stadt umbennenen
UPDATE city
SET name = 'Esenler'
WHERE name = 'Sinop';

-- 3. Lösche die von dir erstellte Stadt
DELETE FROM city
WHERE name = 'Esenler'
	AND country = 'TR'
	AND province = 'Sinop';

-- Überprüft dannach ob die Daten aus der Tabelle gelöscht wurde
SELECT * FROM city WHERE name = 'Esenler';

--------------------------------------------

/* 1. Erstelle eine neue Berg */
INSERT INTO mountain (name, mountains, height, latitude, longitude)
VALUES ('Mount Ararat', 'TR', 5137, 39.7020, 44.3117);

-- This query selects all columns from the 'mountain' table where the mountain name is 'Mount Ararat'
SELECT *
FROM mountain
WHERE name = 'Mount Ararat';

-- 2. Berg vergrößern
UPDATE mountain 
SET height = 6000
WHERE name = 'Mount Ararat';

-- 3. Lösche die von dir erstellte Berg
DELETE FROM mountain 
WHERE name = 'Mount Ararat'
	AND mountains = 'TR';

-- Überprüft dannach ob die Daten aus der Tabelle gelöscht wurde
SELECT * FROM mountain
WHERE name = 'Mount Ararat';




--------------------------------------------