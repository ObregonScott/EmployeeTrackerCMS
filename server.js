const cTable = require("console.table");
const mysql = require("mysql");
const inquirer = require("inquirer");
const db = require("./db"); 




// List Questions Here
// const serveQuest = () => {
function serveQuest() {
    inquirer
        .prompt({
            type: "list",
            name: "choice",
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
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        serveQuest();
    });
};

//next view Roles
const viewAllRoles = () => {
    const sql = `SELECT role.*, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        serveQuest();
    });
};

//next view Employees
const viewAllEmployees = () => {
    const sql = `SELECT employee.*, role.title, role.salary, department.name AS department_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(rows);
        serveQuest();
    });
};

//next add Department
// const addDepartment = () => {
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "department_name",
                message: "Enter name of new department(Required)",
                validate: (departmentNameInput) => {
                    if (departmentNameInput) {
                        return true;
                    } else {
                        console.log("Enter name of new department");
                        return false;
                    }
                },
            },
        ])
        .then((answers) => {
            const sql = `INSERT INTO department (name) VALUE (?)`;
            const params = [answers.department_name];

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.table(result);
                console.log("New department has been addded!!!");
                serveQuest();
            });
        });
};

//next add Role
// const addRole = () => {
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "new_role",
                message: "Enter new role name (Required)",
                validate: (roleNameInput) => {
                    if (roleNameInput) {
                        return true;
                    } else {
                        console.log("Enter new role name");
                        return false;
                    }
                },
            },
            {
                type: "number",
                name: "new_role_salary",
                message: "Enter new role salary (Required)",
                validate: (roleSalaryInput) => {
                    if (roleSalaryInput) {
                        return true;
                    } else {
                        console.log("Enter new role salary");
                        return false;
                    }
                },
            },
            {
                type: "number",
                name: "new_role_department",
                message: "Enter new role department id (Required)",
                validate: (roleDepartmentInput) => {
                    if (roleDepartmentInput) {
                        return true;
                    } else {
                        console.log("Enter new role department id");
                        return false;
                    }
                },
            },
        ])
        .then((answers) => {
            const sql = `INSERT INTO role (title, salary, department_id) VALUE (?,?,?)`;
            const params = [
                answers.new_role,
                answers.new_role_salary,
                answers.new_role_department,
            ];

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.table(result);
                console.log("A New Role Has Been Addded!!!");
                serveQuest();
            });
        });
};

//next add Employee
// const addEmployee = () => {
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "employee_first_name",
                message: "Enter new employee first name (Required)",
                validate: (employeeFirstNameInput) => {
                    if (employeeFirstNameInput) {
                        return true;
                    } else {
                        console.log("Enter new employee first name");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "employee_last_name",
                message: "Enter new employee last name (Required)",
                validate: (employeeLastNameInput) => {
                    if (employeeLastNameInput) {
                        return true;
                    } else {
                        console.log("Enter new employee last name");
                        return false;
                    }
                },
            },
            {
                type: "input",
                name: "employee_role",
                message: "Enter role id of new employee (Required)",
                validate: (employeeRoleInput) => {
                    if (isNaN(employeeRoleInput)) {
                        console.log("Enter a number for the new employee role id");
                        return false;
                    } else {
                        return true;
                    }
                },
            },
            {
                type: "input",
                name: "employee_manager",
                message: "Enter new employee manager id (Required)",
                validate: (employeeManagerInput) => {
                    if (isNaN(employeeManagerInput)) {
                        console.log(
                            "Enter a number for the new employee manager id"
                        );
                        return false;
                    } else {
                        return true;
                    }
                },
            },
        ])
        .then((answers) => {
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?,?,?,?)`;
            const params = [
                answers.employee_first_name,
                answers.employee_last_name,
                answers.employee_role,
                answers.employee_manager,
            ];

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.table(result);
                console.log("New Employee Has Been Added!!!");
                serveQuest();
            });
        });
};

//next Update Role
// const updateRole = () => {
function updateRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "select_employee_to_update",
                message: "Enter id of employee you want to update (Required)",
                validate: (employeeUpdateInput) => {
                    if (isNaN(employeeUpdateInput)) {
                        console.log("Enter a number for the employee ID");
                        return false;
                    } else {
                        return true;
                    }
                },
            },
            {
                type: "input",
                name: "update_employee_role",
                message: "Enter new role ID(Required)",
                validate: (newRoleInput) => {
                    if (isNaN(newRoleInput)) {
                        console.log("Enter a number for the new role ID");
                        return false;
                    } else {
                        return true;
                    }
                },
            },
        ])
        .then((answers) => {
            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
            const params = [
                answers.update_employee_role,
                answers.select_employee_to_update,
            ];

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.table(result);
                serveQuest();
            });
        });
};

serveQuest();