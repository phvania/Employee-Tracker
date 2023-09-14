DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id  INT  PRIMARY KEY,
   dpt_name  VARCHAR(30) 
);

CREATE TABLE  emp_role(
    id INT  PRIMARY KEY,
    title VARCHAR(30),  
    salary DECIMAL(9, 2), 
    department_id INT,  
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL


);
    

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30),   
  last_name VARCHAR(30),  
  role_id INT,   
  manager_id INT,    
  FOREIGN KEY (role_id)
  REFERENCES emp_role(id)  
  ON DELETE SET NULL,
  FOREIGN KEY(manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL

);


