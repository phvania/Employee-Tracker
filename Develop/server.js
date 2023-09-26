
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer");
require('console.table')

//const db = require('./db/connection')


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'pass',
    database: 'employee_db'
  }
);

//main questions
function mainquestions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Please choose one of the following options:",
        choices: [
          "View All Departments",
          "Add Department",
          "View All Roles",
          "Add Role",
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "Remove Employee",
          "Exit"
        ]
      }
    ])
    .then(answers => {
      console.log(answers)
      switch(answers.choice){
        case "View All Departments":
          viewAllDepartments()
          break;
        case "Add Department":
         
          addDepartment()
          break;
        case  "View All Roles":
          viewAllRoles()
          break;
          case "Add Role":
            addRole()
            break;
          case "View All Employees":
            viewAllEmployees() 
            break;
          case "Add Employee":
            addEmployee() 
            break;
          case "Update Employee Role":
            updateEmployeeRole() 
            break;
          case "Remove Employee" :
            removeEmployee()
            break;
          
          default:
            //console.log("no case matched")
            db.exit;
            break;
      }
     
    })

}
mainquestions()


function viewAllDepartments(){
  db.query('SELECT * FROM department',  function (err, res) {
    if (err) throw err;
  console.log("View all departments")
  console.table(res)
  mainquestions()
  })
}
//add new department
  function addDepartment() {
    inquirer
          .prompt({
            name: 'name',
            type: 'input',
            message: 'Enter name of  the new department:',
          }).then(({ name }) => {
            const query = 'INSERT INTO  department (dpt_name)  VALUES (?)';
            db. query( query, name,  (err, res) => {
              if (err) throw err;
              mainquestions();
              //validate: departmentInput => {
                //if (departmentInput) {
                 // return true;
                //} else {
                 // console.log('please Add a Department');
                 // return false;
                //}
              //}
              //mainquestions();
            } )
          })
  }
     
    //view function
     function viewAllRoles(){
      db.query('SELECT * FROM  emp_role left join department on emp_role.department_id = department.id ',  function (err, res) {
        if (err) throw err;
      console.log("View all Roles")
      console.table(res)
      mainquestions()
      })
    }
     //add new role
    function addRole() {
      db.query('SELECT * FROM department', (err, departments) => {
        if (err) { console.log(err) }
        inquirer.prompt([
          {
            type: 'input',
            name: 'role',
            message:  'name of the role?:'
          },
          {
            type: 'number',
            name: 'salary',
            message: 'What is a salary of  this role:'
          },
          {
            type: 'list',
            name: 'departmentId',
            message: 'Department ID:',
          
            choices: departments.map(department => ({
              name: `${department.dpt_name}`,
              value: department.id
            }))
          }]).then(function (answers) {
            console.log(answers)
            db.query('INSERT INTO emp_role SET ?, ?, ?', [{title: answers.role},
              {salary: answers.salary},
              {department_id: answers.departmentId}
            ], function (err, res) {
              //if (err) throw err;
              console.log(`Added ${answers.role} to the database.`)
              //console.table(res)
              viewAllRoles()
              mainquestions()
            })
          })
        })
      }
//view employees function
    function viewAllEmployees(){
      db.query('SELECT *  FROM  employee left join emp_role on employee.role_id = emp_role.id left join department on emp_role.department_id = department.id  ',  function (err, res) {
        if (err) throw err;
      console.log("View All Employees")
      console.table(res)
      mainquestions()
      })
    }
    //add new employee
    function  addEmployee()  {
      db.query('SELECT * FROM  emp_role', (err, roles) => {
        if (err) { console.log(err) }
        console.log(roles)
        inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: '  First Name of new  employee:'
          },
          {
            type: 'input',
            name: 'lastName',
            message: 'Last Name of new employee:'
          },
          {
            type: 'list',
            name: 'roleId',
            message: 'Role ID:',
            choices: roles.map(role => ({
              name: `${role.title}`,
              value: role.id
            }))
          }
        
      ]
      
  ).then(function (answers) {
    console.log(answers)
    db.query('INSERT INTO employee SET ?,?,?,?',[ {first_name: answers.firstName},
      {last_name: answers.lastName},
      {role_id: answers.roleId},
      //managerId null for now
      {manager_id: null}],
     function (err, res) {
      if (err) throw err;
    viewAllEmployees()
      mainquestions()
    })
  })
})}

//update employee role function
function updateEmployeeRole() {

  db.query('SELECT * FROM employee', (err, employee) => {
    if (err) { console.log(err) }
    console.log(employee)
    db.query(`SELECT * FROM emp_role`, (err, role) => {
      if (err) { console.log(err) }
      console.log(role)
      inquirer.prompt([
        {
          type: "list",
          name: "selectEmployee",
          message: "Select the employee who's role will be updated",
          choices: employee.map(employee => ({
            name: `${employee.first_name} ${employee.last_name} - RoleID:${employee.role_id}`,
            value: employee.id
          }))
        },
        {
          type: 'list',
          name: 'updatedRole',
          message: 'New Role ID:',
          choices: role.map(role => ({
            name: `${role.title}`,
            value: role.id
          })) }
        ]).then(function (answers) {
          db.query('UPDATE employee SET ? WHERE ?', [{ role_id: answers.updatedRole }, { id: answers.selectEmployee }], function (err, res) {
            if (err) throw err
            console.log('Employee role updated!')
            mainquestions()
          })
        })
      })
    })
  }

//remove employee
function removeEmployee() {
  db.query('SELECT * FROM employee', (err, employee) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: "list",
        name: "removeEmp",
        message: "Select the employee which will be removed",
        choices: employee.map (employee => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        }))
      }
    ]).then(function (answer) {
      db.query(`DELETE FROM employee WHERE id = ${answer.removeEmp}`
        , function (err, res) {
          if (err) throw err
          console.log('Employee removed!')
          start()
        })
    })
  })
}
  


module.exports = db;