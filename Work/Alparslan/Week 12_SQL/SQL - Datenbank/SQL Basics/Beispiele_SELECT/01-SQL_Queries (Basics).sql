/* FRAGE 1: */
SELECT now();

/* FRAGE 2: */
SELECT 'Hello World' AS message;

/* FRAGE 3: */
SELECT *
FROM country;

/* FRAGE 4: */
SELECT *
FROM country
LIMIT 5;

/* FRAGE 5: */
SELECT Name, Capital
FROM country
LIMIT 5;

/* FRAGE 6: */
SELECT Name AS 'Land', Capital AS 'Hauptstadt'
FROM country
LIMIT 5;

/* FRAGE 7: */
SELECT Name, Capital
FROM country
WHERE Name = 'Austria';

/* FRAGE 8: */
SELECT Name, Capital
FROM country
WHERE Population < 1000000;

/* FRAGE 9: */
SELECT Name, Capital
FROM country
WHERE Population BETWEEN 1000000 AND 2000000;

/* FRAGE 10: */
SELECT Name, Capital
FROM country
WHERE Name LIKE 'A%';

/* FRAGE 11: */
SELECT Name, Capital
FROM country
WHERE Name LIKE '%A';

/* FRAGE 12: */
SELECT Name, Capital
FROM country
WHERE Name NOT LIKE 'A%';

/* FRAGE 13: */
SELECT Name, Capital
FROM country
WHERE Name LIKE 'A%' OR Population < 1000000;

/* FRAGE 14: */
SELECT Name, Capital
FROM country
WHERE Name LIKE 'A%' AND Population < 1000000;