CREATE TABLE room (  
 roomID int NOT NULL PRIMARY KEY,  
 name VARCHAR(100) NOT NULL,  
 isDeleted boolean NOT NULL DEFAULT FALSE); 
 CREATE SEQUENCE room_seq START 1; 
 ALTER TABLE room ALTER COLUMN roomID SET DEFAULT nextval('room_seq');

CREATE TABLE person ( 
 personID int NOT NULL PRIMARY KEY, 
 login VARCHAR(100) NOT NULL, 
 mail VARCHAR(100) NOT NULL, 
 numbers VARCHAR(100) NOT NULL,
 isDeleted boolean NOT NULL DEFAULT FALSE,
 roomID int NOT NULL, 
 FOREIGN KEY (roomID) 
 REFERENCES room (roomID) ON DELETE CASCADE ON UPDATE CASCADE);  

CREATE SEQUENCE person_seq START 1;



ALTER TABLE person ALTER COLUMN personID SET DEFAULT nextval('person_seq');