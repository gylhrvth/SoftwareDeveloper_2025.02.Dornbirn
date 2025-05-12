/*-- 1. Erstelle 2 Berufe */

INSERT INTO beruf (beruf_name, beruf_beschreibung)
VALUES ('Softwareentwicklung', 'Entwickelt und wartet Softwarelösungen'), ('Webdesigner', 'Gestaltet Benutzeroberflächen und Webseiten.');

/*-- 1.1 Überprüfe die erstellten Berufe */

SELECT *
FROM beruf;

/*-- 2. Hinzufügen der ersten Person */

INSERT INTO person (person_vorname, person_nachname, person_beruf_id)
VALUES ('Max', 'Mustermann', 1);

/*-- 2.1 Überprüfe die erstellte Personen */

SELECT *
FROM person;

SELECT person_vorname, person_nachname, beruf_name, beruf_beschreibung
FROM person
JOIN beruf ON person_beruf_id = beruf_id;