
DROP DATABASE project_harmonia;

CREATE DATABASE project_harmonia;

CREATE USER 'project_harmonia'@'localhost' IDENTIFIED BY '***REMOVED***';
GRANT ALL PRIVILEGES ON project_harmonia.* TO 'project_harmonia'@'localhost';
FLUSH PRIVILEGES;
