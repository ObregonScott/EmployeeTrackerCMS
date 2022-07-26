// Imports & Dependencies
const cTable = require('console.table');
const inquirer = require('inquirer');

// List Questions Here
const serveQuest = () => {
    inquirer
    .prompt({
        type:"list",
        name:"choice",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "Update A Employee Role"
        ]
    })
    // Sort Answers
    .then((answer) => {
        if (answer.options === "View All Departments") {
            viewAllDepartments();
          } else if (answer.choice === "View All Roles") {
            viewAllRoles();
          } else if (answer.choice === "View All Employees") {
            viewAllEmployees();
          } else if (answer.choice === "Add A Department") {
            addDepartment();
          } else if (answer.choice === "Add A Role") {
            addRole();
          } else if (answer.choice === "Add An Employee") {
            addEmployee();
          } else if (answer.choice === "Update A EmployeeRole") {
            updateRole();
          }
    });
};

// What to do with questions after questions
    //view all Depts first
    const viewAllDepartments = () => {

    };

    //next view Roles
    const viewAllRoles = () => {

    };

    //next view Employees
    const viewAllEmployees = () => {

    };

    //next add Department
    const addDepartment = () => {

    };

    //next add Role
    const addRole = ()  => {

    };

    //next add Employee
    const addEmployee = () => {

    };

    //next Update Role
    const updateRole = () => {

    };

    serveQuest();