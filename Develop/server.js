
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer");

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
         // console.log("add Department")
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


          default:
            //console.log("no case matched")
            db.exit();
            break;
      }
     
    })

}
mainquestions()


//function viewAllDepartments(){
  //console.log("View all departments")

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
  /// do work in here
  //ask questions show results return to main question
  mainquestions()











//module.exports = db;