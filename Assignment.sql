CREATE DATABASE Indian_Census;
USE Indian_Census;
CREATE TABLE Census (
    CensusYear INT,
    Notes VARCHAR(255),
    INPopulation INT
);

CREATE TABLE State (
    StateName VARCHAR(50),
    Area FLOAT
);

CREATE TABLE StateParticipate (
    StateName VARCHAR(50),
    CensusYear INT,
    StatePopulation INT
);

CREATE TABLE Person (
    SSN VARCHAR(11),
    Name VARCHAR(100),
    Birthday DATE,
    AddressID INT
);

CREATE TABLE PersonParticipate (
    SSN VARCHAR(11),
    CensusYear INT,
    PersonAge INT
);

CREATE TABLE Address (
    AddressID INT,
    Street VARCHAR(100),
    City VARCHAR(50),
    State VARCHAR(50),
    ZipCode VARCHAR(10),
    PRIMARY KEY (AddressID)
);
alter table census add column CensusID int primary key;
alter table state add column StateID int primary key;
alter table StateParticipate add column StateParticipateID int primary key;
alter table Person add column PersonID int primary key;
alter table PersonParticipate add column PersonParticipateID int primary key;

-- Insert into Census table
INSERT INTO Census 
VALUES (2020, 'National Census', 1393409038, 1),
       (2011, 'Previous Census', 1210854977, 2);

-- Insert into State table
INSERT INTO State
VALUES ('Maharashtra', 307713, 1),
       ('Uttar Pradesh', 243290,2);

-- Insert into StateParticipate table
INSERT INTO StateParticipate 
VALUES ('Maharashtra', 2020, 112374333,1),
       ('Uttar Pradesh', 2020, 199812341,2);

-- Insert into Person table
INSERT INTO Person 
VALUES ('111-22-3333', 'John Doe', '1990-05-15', 2, 1),
       ('444-55-6666', 'Jane Smith', '1985-11-02', 1, 2);

-- Insert into PersonParticipate table
INSERT INTO PersonParticipate
VALUES ('111-22-3333', 2020, 30, 1),
       ('444-55-6666', 2020, 35, 2);

-- Insert into Address table
INSERT INTO Address
VALUES (1, '123 Main St', 'Mumbai', 'Maharashtra', '400001'),
       (2, '456 Oak Ave', 'Lucknow', 'Uttar Pradesh', '226001');
