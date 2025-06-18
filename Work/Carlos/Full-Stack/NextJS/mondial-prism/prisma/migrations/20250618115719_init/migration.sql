-- CreateTable
CREATE TABLE `borders` (
    `Country1` VARCHAR(4) NOT NULL,
    `Country2` VARCHAR(4) NOT NULL,
    `Length` FLOAT NULL,

    PRIMARY KEY (`Country1`, `Country2`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `city` (
    `Name` VARCHAR(35) NOT NULL,
    `Country` VARCHAR(4) NOT NULL,
    `Province` VARCHAR(35) NOT NULL,
    `Population` INTEGER NULL,
    `Longitude` FLOAT NULL,
    `Latitude` FLOAT NULL,

    PRIMARY KEY (`Name`, `Country`, `Province`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `continent` (
    `Name` VARCHAR(20) NOT NULL,
    `Area` FLOAT NULL,

    PRIMARY KEY (`Name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `country` (
    `Name` VARCHAR(35) NOT NULL,
    `Code` VARCHAR(4) NOT NULL,
    `Capital` VARCHAR(35) NULL,
    `Province` VARCHAR(35) NULL,
    `Area` FLOAT NULL,
    `Population` INTEGER NULL,

    UNIQUE INDEX `Name`(`Name`),
    PRIMARY KEY (`Code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `desert` (
    `Name` VARCHAR(35) NOT NULL,
    `Area` FLOAT NULL,
    `Longitude` FLOAT NULL,
    `Latitude` FLOAT NULL,

    PRIMARY KEY (`Name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `economy` (
    `Country` VARCHAR(4) NOT NULL,
    `GDP` FLOAT NULL,
    `Agriculture` FLOAT NULL,
    `Service` FLOAT NULL,
    `Industry` FLOAT NULL,
    `Inflation` FLOAT NULL,

    PRIMARY KEY (`Country`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `encompasses` (
    `Country` VARCHAR(4) NOT NULL,
    `Continent` VARCHAR(20) NOT NULL,
    `Percentage` FLOAT NULL,

    INDEX `encompasses_Country_IDX`(`Country`),
    PRIMARY KEY (`Country`, `Continent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ethnicGroup` (
    `Country` VARCHAR(4) NOT NULL,
    `Name` VARCHAR(50) NOT NULL,
    `Percentage` FLOAT NULL,

    PRIMARY KEY (`Name`, `Country`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `geo_desert` (
    `Desert` VARCHAR(35) NOT NULL,
    `Country` VARCHAR(4) NOT NULL,
    `Province` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`Province`, `Country`, `Desert`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `geo_estuary` (
    `River` VARCHAR(35) NOT NULL,
    `Country` VARCHAR(4) NOT NULL,
    `Province` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`Province`, `Country`, `River`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `geo_island` (
    `Island` VARCHAR(35) NOT NULL,
    `Country` VARCHAR(4) NOT NULL,
    `Province` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`Province`, `Country`, `Island`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `geo_lake` (
    `Lake` VARCHAR(35) NOT NULL,
    `Country` VARCHAR(4) NOT NULL,
    `Province` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`Province`, `Country`, `Lake`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `geo_mountain` (
    `Mountain` VARCHAR(35) NOT NULL,
    `Country` VARCHAR(4) NOT NULL,
    `Province` VARCHAR(35) NOT NULL,

    INDEX `geo_mountain_Country_IDX`(`Country`),
    INDEX `geo_mountain_Mountain_IDX`(`Mountain`),
    PRIMARY KEY (`Province`, `Country`, `Mountain`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `geo_river` (
    `River` VARCHAR(35) NOT NULL,
    `Country` VARCHAR(4) NOT NULL,
    `Province` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`Province`, `Country`, `River`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `geo_sea` (
    `Sea` VARCHAR(35) NOT NULL,
    `Country` VARCHAR(4) NOT NULL,
    `Province` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`Province`, `Country`, `Sea`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `geo_source` (
    `River` VARCHAR(35) NOT NULL,
    `Country` VARCHAR(4) NOT NULL,
    `Province` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`Province`, `Country`, `River`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `isMember` (
    `Country` VARCHAR(4) NOT NULL,
    `Organization` VARCHAR(12) NOT NULL,
    `Type` VARCHAR(35) NULL DEFAULT 'member',

    PRIMARY KEY (`Country`, `Organization`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `island` (
    `Name` VARCHAR(35) NOT NULL,
    `Islands` VARCHAR(35) NULL,
    `Area` FLOAT NULL,
    `Height` FLOAT NULL,
    `Type` VARCHAR(10) NULL,
    `Longitude` FLOAT NULL,
    `Latitude` FLOAT NULL,

    PRIMARY KEY (`Name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `islandIn` (
    `Island` VARCHAR(35) NULL,
    `Sea` VARCHAR(35) NULL,
    `Lake` VARCHAR(35) NULL,
    `River` VARCHAR(35) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lake` (
    `Name` VARCHAR(35) NOT NULL,
    `Area` FLOAT NULL,
    `Depth` FLOAT NULL,
    `Altitude` FLOAT NULL,
    `Type` VARCHAR(10) NULL,
    `River` VARCHAR(35) NULL,
    `Longitude` FLOAT NULL,
    `Latitude` FLOAT NULL,

    PRIMARY KEY (`Name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `language` (
    `Country` VARCHAR(4) NOT NULL,
    `Name` VARCHAR(50) NOT NULL,
    `Percentage` FLOAT NULL,

    PRIMARY KEY (`Name`, `Country`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `located` (
    `City` VARCHAR(35) NULL,
    `Province` VARCHAR(35) NULL,
    `Country` VARCHAR(4) NULL,
    `River` VARCHAR(35) NULL,
    `Lake` VARCHAR(35) NULL,
    `Sea` VARCHAR(35) NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locatedOn` (
    `City` VARCHAR(35) NOT NULL,
    `Province` VARCHAR(35) NOT NULL,
    `Country` VARCHAR(4) NOT NULL,
    `Island` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`City`, `Province`, `Country`, `Island`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mergesWith` (
    `Sea1` VARCHAR(35) NOT NULL,
    `Sea2` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`Sea1`, `Sea2`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mountain` (
    `Name` VARCHAR(35) NOT NULL,
    `Mountains` VARCHAR(35) NULL,
    `Height` FLOAT NULL,
    `Type` VARCHAR(10) NULL,
    `Longitude` FLOAT NULL,
    `Latitude` FLOAT NULL,

    INDEX `mountain_Name_IDX`(`Name`),
    PRIMARY KEY (`Name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mountainOnIsland` (
    `Mountain` VARCHAR(35) NOT NULL,
    `Island` VARCHAR(35) NOT NULL,

    PRIMARY KEY (`Mountain`, `Island`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organization` (
    `Abbreviation` VARCHAR(12) NOT NULL,
    `Name` VARCHAR(80) NOT NULL,
    `City` VARCHAR(35) NULL,
    `Country` VARCHAR(4) NULL,
    `Province` VARCHAR(35) NULL,
    `Established` DATE NULL,

    UNIQUE INDEX `OrgNameUnique`(`Name`),
    PRIMARY KEY (`Abbreviation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `politics` (
    `Country` VARCHAR(4) NOT NULL,
    `Independence` DATE NULL,
    `Dependent` VARCHAR(4) NULL,
    `Government` VARCHAR(120) NULL,

    PRIMARY KEY (`Country`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `population` (
    `Country` VARCHAR(4) NOT NULL,
    `Population_Growth` FLOAT NULL,
    `Infant_Mortality` FLOAT NULL,

    PRIMARY KEY (`Country`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `province` (
    `Name` VARCHAR(35) NOT NULL,
    `Country` VARCHAR(4) NOT NULL,
    `Population` INTEGER NULL,
    `Area` FLOAT NULL,
    `Capital` VARCHAR(35) NULL,
    `CapProv` VARCHAR(35) NULL,

    PRIMARY KEY (`Name`, `Country`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `religion` (
    `Country` VARCHAR(4) NOT NULL,
    `Name` VARCHAR(50) NOT NULL,
    `Percentage` FLOAT NULL,

    PRIMARY KEY (`Name`, `Country`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `river` (
    `Name` VARCHAR(35) NOT NULL,
    `River` VARCHAR(35) NULL,
    `Lake` VARCHAR(35) NULL,
    `Sea` VARCHAR(35) NULL,
    `Length` FLOAT NULL,
    `SourceLongitude` FLOAT NULL,
    `SourceLatitude` FLOAT NULL,
    `Mountains` VARCHAR(35) NULL,
    `SourceAltitude` FLOAT NULL,
    `EstuaryLongitude` FLOAT NULL,
    `EstuaryLatitude` FLOAT NULL,

    PRIMARY KEY (`Name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sea` (
    `Name` VARCHAR(35) NOT NULL,
    `Depth` FLOAT NULL,

    PRIMARY KEY (`Name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `language` ADD CONSTRAINT `language_Country_fkey` FOREIGN KEY (`Country`) REFERENCES `country`(`Code`) ON DELETE RESTRICT ON UPDATE CASCADE;
