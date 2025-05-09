use mondial;

/* FRAGE 1: */
SELECT Name, Population
FROM country
WHERE Name = 'Austria';

/* FRAGE 2: */
SELECT
SUM(country.Population) AS Total_population
FROM country
JOIN encompasses ON country.code = encompasses.Country
WHERE encompasses.Continent = 'Europe';

/* FRAGE 3: */
SELECT
DISTINCT geo_river.River AS River
FROM geo_river
JOIN country ON geo_river.Country = country.Code 
WHERE country.Name = 'Austria';

/* FRAGE 4: */
SELECT
DISTINCT geo_river.River AS River
FROM geo_river
JOIN country ON geo_river.Country = country.Code
JOIN encompasses ON country.Code = encompasses.Country
WHERE encompasses.Continent = 'Europe';

/* FRAGE 5: */
SELECT
(europe.Population / world.TotalPopulation) * 100 AS PercentageInEurope
FROM (SELECT SUM(country.Population) AS Population
FROM country
JOIN encompasses ON country.Code = encompasses.Country
WHERE encompasses.Continent = 'Europe') AS europe,
(SELECT SUM(Population) AS TotalPopulation FROM country) AS world;

/* FRAGE 6: */
SELECT Name
FROM country
WHERE Name LIKE 'A%';

/* FRAGE 7: */
SELECT country.Name AS Land, province.Name AS Bundesland, province.Population
FROM country
JOIN province ON country.Code = province.Country
WHERE country.Name LIKE 'A%'
ORDER BY province.Population DESC;

/* FRAGE 8: */
SELECT DISTINCT River.Name, River.Length
FROM river
JOIN geo_river ON River.name = geo_river.River
JOIN encompasses ON geo_river.country = encompasses.Country
WHERE encompasses.continent = 'Europe'
ORDER BY River.LENGTH DESC;

-- /* FRAGE 9: */
SELECT ii.Island
FROM islandIn ii
JOIN geo_island gi ON ii.Island = gi.Island
JOIN religion r ON gi.Country = r.Country
WHERE ii.Sea = 'Pacific Ocean' AND r.Name = 'Muslim' AND r.Percentage > 50;

SELECT islandIn.Island
FROM islandIn
JOIN geo_island ON islandIn.island = geo_island.Island
JOIN religion ON geo_island.Country = religion.Country
WHERE islandIn.Sea = 'Pacific Ocean'
	AND religion.Name = 'Muslim'
	AND religion.Percentage > 50;
--

/* FRAGE 10: */
SELECT 
    country.Name AS Country,
    COUNT(DISTINCT mountain.Name) AS NumberOfMountains
FROM mountain
JOIN geo_mountain ON mountain.Name = geo_mountain.Mountain 
JOIN country ON geo_mountain.Country = country.Code
JOIN religion ON country.Code = religion.Country
WHERE
    mountain.Height > 3000
    AND religion.Name = 'Roman Catholic'
    AND religion.Percentage > 60
GROUP BY country.Name
ORDER BY NumberOfMountains DESC;

/* FRAGE 11: */
SELECT 
    country.Name AS Country,
    COUNT(DISTINCT lake.Name) AS NumberOfLakes,
    COUNT(DISTINCT mountain.Name) AS NumberOfMountains
FROM country
JOIN geo_lake ON country.Code = geo_lake.Country
JOIN lake ON geo_lake.Lake = lake.Name
JOIN geo_mountain ON country.Code = geo_mountain.Country
JOIN mountain ON geo_mountain.Mountain = mountain.Name
WHERE lake.Depth > 100
  AND mountain.Height > 1500
GROUP BY country.Name
HAVING NumberOfLakes > 0 
  AND NumberOfMountains > 0
ORDER BY Country;

/* FRAGE 12: */
SELECT 
  religion.name AS religion,
  SUM(ROUND((religion.percentage / 100.0) * country.population)) AS einwohner
FROM religion
JOIN country ON religion.country = country.code
GROUP BY religion.name
ORDER BY einwohner DESC;

/* FRAGE 13: */
SELECT
	DISTINCT country.Name AS Land,
	GROUP_CONCAT(DISTINCT geo_sea.Sea SEPARATOR ', '), 'Land' AS Seen
FROM country
JOIN geo_sea ON country.Code = geo_sea.Country
WHERE country.Name IS NOT NULL
	AND geo_sea.Sea IS NOT NULL
GROUP BY country.Name
ORDER BY country.Name ASC;

/* FRAGE 14: */
SELECT 
    DISTINCT country.Name AS Country,
    GROUP_CONCAT(DISTINCT geo_sea.Sea SEPARATOR ', ') AS Seas
FROM country
JOIN geo_sea ON country.Code = geo_sea.Country
GROUP BY country.Name 
ORDER BY country.Name ASC;

/* FRAGE 15: */
SELECT DISTINCT 
    country.Name AS Land,
    politics.Independence AS Independence,
    geo_desert.Desert,
    EthnicGroup.Name AS Ethnic
FROM politics
JOIN geo_desert ON politics.country = geo_desert.country
JOIN EthnicGroup ON politics.country = EthnicGroup.country
JOIN country ON politics.country = country.code
WHERE politics.Independence IS NOT NULL
    AND geo_desert.Desert IS NOT NULL
    AND EthnicGroup.Name = 'African'
ORDER BY country.Name ASC;

/* FRAGE 16: */
SELECT
	country.Name AS Country,
	GROUP_CONCAT(city.Name SEPARATOR ', ') AS Cities,
	COUNT(city.Name) AS NumberofCities
FROM city
JOIN country ON city.Country = country.Code
GROUP BY country.Name 
HAVING NumberOfCities = 3;

/* FRAGE 17: */
SELECT
	city.Name AS City,
	city.Population AS Population,
	encompasses.Continent AS Continent
FROM city
JOIN encompasses ON city.Country = encompasses.Country
WHERE encompasses.Continent = 'America'
ORDER BY city.Population DESC
LIMIT 3;
	
/* FRAGE 18: */
SELECT 
	mountain.Name AS Mountain,
	mountain.Height AS Height
FROM Mountain
JOIN geo_mountain ON mountain.Name = geo_mountain.Mountain
JOIN country ON geo_mountain.country = country.code
WHERE geo_mountain.Country = 'A'
ORDER BY Height DESC 
LIMIT 1;

/* FRAGE 19: */
SELECT 
    mountain.Name AS Mountain,
    mountain.Height AS Height
FROM mountain
JOIN geo_mountain ON mountain.Name = geo_mountain.Mountain
JOIN encompasses ON geo_mountain.Country = encompasses.Country
WHERE encompasses.Continent = 'Europe'
ORDER BY mountain.Height DESC
LIMIT 1;

/* FRAGE 20: */
SELECT
    encompasses.Continent,
    MAX(mountain.Height) AS Height
FROM mountain
JOIN geo_mountain ON mountain.Name = geo_mountain.Mountain
JOIN encompasses ON geo_mountain.Country = encompasses.Country
GROUP BY encompasses.Continent


SELECT DISTINCT encompasses.Continent, Mountain.name, Mountain.height
FROM mountain
JOIN geo_mountain ON mountain.Name = geo_mountain.Mountain
JOIN encompasses ON geo_mountain.Country = encompasses.Country
JOIN (
	SELECT
	    encompasses.Continent,
	    MAX(mountain.Height) AS Height
	FROM mountain
	JOIN geo_mountain ON mountain.Name = geo_mountain.Mountain
	JOIN encompasses ON geo_mountain.Country = encompasses.Country
	WHERE Percentage > 50
	GROUP BY encompasses.Continent
) AS bigMountain ON encompasses.Continent = bigMountain.continent AND mountain.Height = bigMountain.height
ORDER BY encompasses.Continent, Mountain.name

/* FRAGE 21: */
SELECT
    country.Name AS Country,
    GROUP_CONCAT(religion.Name SEPARATOR ', ') AS Religions,
    COUNT(religion.Name) AS NumberOfReligions
FROM
    religion
JOIN
    country ON religion.country = country.code
GROUP BY
    country.Name
HAVING
    COUNT(religion.Name) = (
        SELECT
            MAX(NumberOfReligions)
        FROM (
            SELECT
                COUNT(religion.Name) AS NumberOfReligions
            FROM
                religion
            JOIN
                country ON religion.country = country.code
            GROUP BY
                country.Name
        ) AS SubQuery
    );

/* FRAGE 22: */
SELECT 
    organization.Name AS Organization,
    COUNT(*) AS Members
FROM organization
JOIN country ON organization.Country = country.Code
JOIN isMember ON organization.Abbreviation = isMember.Organization
WHERE country.Name = 'Austria' AND isMember.Type = 'Member'
GROUP BY organization.Name
ORDER BY Members DESC;

/* FRAGE 23: */

/* Welche sind die Top 10 asiatischen Länder mit der höchsten durchschnittlichen Bevölkerungsdichte pro Quadratkilometer? */
SELECT 
    country.name AS Land,
    ROUND(country.population / country.area, 2) AS Bevoelkerungsdichte_km2
FROM country
JOIN encompasses ON country.code = encompasses.country
WHERE encompasses.continent = 'Asia'
  -- AND country.population IS NOT NULL
  -- AND country.area > 0
ORDER BY Bevoelkerungsdichte_km2 DESC
LIMIT 10;

