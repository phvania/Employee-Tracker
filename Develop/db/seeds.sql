      
      INSERT INTO department (  dpt_name)
      VALUES
      ( 'Accounting'),
      (  'Human Resources'),
      (  'Marketing'),
      ( 'Sales');


      INSERT INTO  emp_role (  title, salary, department_id)
      VALUES 
      
      ( 'Account Manager', '70000', 1),
      ( 'Accountant', '80000', 1),
      ( 'Payroll Specialist', '60000', 2),  
      ( 'Marketing Strategist', '120000', 3),
      ( 'Graphic Designer', '60000', 4),
      ( 'HR Manager', '90000', 2);



      INSERT INTO  employee (  first_name, last_name, role_id, manager_id)
      VALUES
     ( 'Peter', 'Park', 2, NULL),
     ( 'Derek', 'Chan', 1,  1),
     ( 'Paulina', 'Rios', 3, null),
     ( 'Heather', 'Mealey', 4, null),  
     ( 'Sandy', 'Cheeks', 2, null),
     ( 'Emily', 'Smith', 5, null);
     
            
