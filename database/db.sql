CREATE DATABASE database_pbe;

USE database_pbe;

CREATE TABLE students(
    name VARCHAR(60), 
    student_id VARCHAR(10)
);

DESCRIBE students;

CREATE TABLE tasks(
    date VARCHAR(60), 
    subject VARCHAR(60), 
    name VARCHAR(60)
);

DESCRIBE tasks;

CREATE TABLE timetables(
    day VARCHAR(60), 
    hour VARCHAR(60), 
    subject VARCHAR(60),
    room VARCHAR(60)
);

DESCRIBE timetables;

CREATE TABLE marks(
    subject VARCHAR(60),
    name VARCHAR(60),
    mark   DECIMAL(3,1),
    student VARCHAR(60)
);

DESCRIBE marks;