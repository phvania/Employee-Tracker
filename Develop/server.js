
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
        case  "view All Roles":
          viewAllRoles()
          break;
          case "Add Role":
            addRole()
            break;
          case "view All Employees":
            viewAllEmployees() 
            break;
          case "Add  Employee":
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
            db.exit();
            break;
      }
     
    })

}
mainquestions()


function viewAllDepartments(){
  db.query('SELECT * FROM department',  function (err, res) {
    if (err) throw err;
  console.log("View all departments")
  mainquestions()
  })
}
//add new department
  function addDepartment() {
    inquirer
          .prompt({
            name: 'name',
            type: 'input',
            message: 'Enter name of new department:',
          }) .then(({ name }) => {
            const query = 'insert into department  values (?)';
            db. query( query, name,  (err, res) => {
              if (err) throw err;
              mainquestions();
            } )
          })
  }
     
    //view function
     function viewAllRoles(){
      db.query('SELECT * FROM  emp_role',  function (err, res) {
        if (err) throw err;
      console.log("View all Roles")
      mainquestions()
      })
    }
     //add new role
    function addRole() {
      db.query('SELECT * FROM departments', (err, departments) => {
        if (err) { console.log(err) }
        inquirer.prompt([
          {
            type: 'input',
            name: 'title',
            message: 'what is the name of your role?:'
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
              name: `${department.name}`,
              value: department.id
            }))
          }]).then(function (answers) {
            db.query('INSERT INTO roles SET ?', {
              title: answers.title,
              salary: answers.salary,
              departmentId: answers.departmentId
            }, function (err, res) {
              if (err) throw err;
              console.table(res)
              mainquestions()
            })
          })
        })
      }
//view employees function
    function viewAllEmployees(){
      db.query('SELECT * FROM  employee',  function (err, res) {
        if (err) throw err;
      console.log("View all Employees")
      mainquestions()
      })
    }
    //add new employee
    function  addEmployee()  {
      db.query('SELECT * FROM roles', (err, roles) => {
        if (err) { console.log(err) }
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
    db.query('INSERT INTO employees SET ?', {
      firstName: answers.firstName,
      lastName: answers.lastName,
      roleId: answers.roleId,
      //managerId null for now
      managerId: null
    }, function (err, res) {
      if (err) throw err;
      console.table(res)
      start()
    })
  })
})}

//update employee role function
function updateEmployeeRole() {

  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) { console.log(err) }
    db.query(`SELECT * FROM emp_roles`, (err, roles) => {
      if (err) { console.log(err) }
      inquirer.prompt([
        {
          type: "list",
          name: "selectEmployee",
          message: "Select the employee who's role will be updated",
          choices: employees.map(employee => ({
            name: `${employee.firstName} ${employee.lastName} - Role ID:${employee.roleId}`,
            value: employee.id
          }))
        },
        {
          type: 'list',
          name: 'updatedRole',
          message: 'New Role ID:',
          choices: roles.map(role => ({
            name: `${role.title}`,
            value: role.id
          })) }
        ]).then(function (answers) {
          db.query('UPDATE employees SET ? WHERE ?', [{ roleId: answers.updatedRole }, { id: answers.selectEmployee }], function (err, res) {
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
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: "list",
        name: "removeEmp",
        message: "Select the employee which will be removed",
        choices: employees.map(employee => ({
          name: `${employee.firstName} ${employee.lastName}`,
          value: employee.id
        }))
      }
    ]).then(function (answer) {
      db.query(`DELETE FROM employees WHERE id = ${answer.removeEmp}`
        , function (err, res) {
          if (err) throw err
          console.log('Employee removed!')
          start()
        })
    })
  })
}
  


//module.exports = db;