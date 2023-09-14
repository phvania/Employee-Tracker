      
      INSERT INTO department ( id, dpt_name)
      VALUES
      ( 1, 'Accounting'),
      ( 2, 'Human Resources'),
      ( 3, 'Marketing'),
      ( 4, 'Sales');


      INSERT INTO  emp_role ( id, title, salary, department_id)
      VALUES 
      
      (1, 'Account Manager', '70000', 1),
      (2, 'Accountant', '80000', 1),
      (3, 'Payroll Specialist', '60000', 4),  
      (4, 'Marketing Strategist', '120000', 2),
      (5, 'Graphic Designer', '60000', 2),
      (6, 'HR Manager', '90000', 3);



      INSERT INTO  employee ( id, first_name, last_name, role_id, manager_id)
      VALUES
     (1, 'Peter', 'Park', 2, NULL),
     (2, 'Derek', 'Chan', 3, 1),
     (3, 'Paulina', 'Rios', 6, 1),
     (4, 'Heather', 'Mealey', 6, 2),  
     (5, 'Sandy', 'Cheeks', 5, 3),
     (6, 'Emily', 'Smith', 5, 2);
     
            
