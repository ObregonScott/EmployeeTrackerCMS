require("console.table");
// const mysql = require("mysql2");
const { prompt } = require("inquirer");
const db = require("./db");

// List Questions Here
function serveQuest() {
   prompt({
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View Employees By Department",
                "View Employees By Manager",
                "Add Employee",
                "Delete Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
                "Add Role",
                "Remove Role",
                "View All Departments",
                "Add Department",
                "Remove Department",
                "View Budget By Department",
                "Quit"
            ]
        })
        // Sort Answers
        .then((answer) => {
            if (answer.options === "View All Employees") {
                viewAllEmployees();
            } else if (answer.choice === "View Employees By Department") {
                viewEmployeesByDepartment();
            } else if (answer.choice === "View Employees By Manager") {
                viewEmployeesByManager();
            } else if (answer.choice === "Add Employee") {
                addEmployee();
            } else if (answer.choice === "Delete Employee") {
                deleteEmployee();
            } else if (answer.choice === "Update Employee Role") {
                updateRole();
            } else if (answer.choice === "Update Employee Manager") {
                updateManager();
            } else if (answer.choice === "View All Roles") {
                viewAllRoles();
            } else if (answer.choice === "Add Role") {
                addRole();
            } else if (answer.choice === "Delete Role") {
                deleteRole();
            } else if (answer.choice === "View All Departments") {
                viewAllDepartments();
            } else if (answer.choice === "Add Department") {
                addDepartment();
            } else if (answer.choice === "Delete Department") {
                deleteDepartment();
            } else if (answer.choice === "View Budget By Department") {
                viewDepartmentBudget();
            } else if (answer.choice === "Quit") {
                quit();
            }
        });
};

// View Employees
function viewAllEmployees() {
    db.findEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => serveQuest());
}
// View Employees By Department
function viewEmployeesByDepartment() {
    db.findDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));
            prompt([
                {
                    type: "list",
                    name: "departmentId",
                    message: "What department would you like to view employees from?",
                    choices: departmentChoices
                }
            ])
                .then(res => db.findEmployeesByDepartment(res.departmentId))
                .then(([rows]) => {
                    let employees = rows;
                    console.log("\n");
                    console.table(employees);
                })
                .then(() => serveQuest())
        });
}
// View Employees By Manager
function viewEmployeesByManager() {
    db.findEmployees()
        .then(([rows]) => {
            let managers = rows;
            const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "managerId",
                    message: "Which employee do you need to see the Manager for?",
                    choices: managerChoices
                }
            ])
                .then(res => db.findEmployeesByManager(res.managerId))
                .then(([rows]) => {
                    let employees = rows;
                    console.log("\n");
                    if (employees.length === 0) {
                        console.log("Your employee has no direct Manager.");
                    } else {
                        console.table(employees);
                    }
                })
                .then(() => serveQuest())
        });
}
// Add Employee
function addEmployee() {
    prompt([
        {
            name: "firstName",
            message: "What is your employee's first name?"
        },
        {
            name: "lastName",
            message: "What is your employee's last name?"
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            db.findRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    prompt({
                        type: "list",
                        name: "roleId",
                        message: "What is your employee's role?",
                        choices: roleChoices
                    })
                        .then(res => {
                            let roleId = res.roleId;

                            db.findEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));

                                    managerChoices.unshift({ name: "None", value: null });

                                    prompt({
                                        type: "list",
                                        name: "managerId",
                                        message: "Who is your employee's manager?",
                                        choices: managerChoices
                                    })
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }

                                            db.createEmployee(employee);
                                        })
                                        .then(() => console.log(
                                            `You Added ${firstName} ${lastName} To The Database!`
                                        ))
                                        .then(() => serveQuest())
                                })
                        })
                })
        })
}
// Delete Employee
function deleteEmployee() {
    db.findEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee do you want to delete?",
                    choices: employeeChoices
                }
            ])
                .then(res => db.deleteEmployee(deleteployeeId))
                .then(() => console.log("You Deleted Employee Info From The Database!"))
                .then(() => serveQuest())
        })
}
// Update Employee Role
function updateRole() {
    db.findEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Whos role do you need to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.findRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));

                            prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "What role do you need to assign the selected employee?",
                                    choices: roleChoices
                                }
                            ])
                                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                                .then(() => console.log("You Updated Your Employee's Role!"))
                                .then(() => serveQuest())
                        });
                });
        })
}
// Update Employee Manager
function updateManager() {
    db.findEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's manager do you want to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId
                    db.findAllPossibleManagers(employeeId)
                        .then(([rows]) => {
                            let managers = rows;
                            const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));

                            prompt([
                                {
                                    type: "list",
                                    name: "managerId",
                                    message:
                                        "Which employee do you need to set as manager for the selected lacky?",
                                    choices: managerChoices
                                }
                            ])
                                .then(res => db.updateEmployeeManager(employeeId, res.managerId))
                                .then(() => console.log("You Updated Employee's Manager!"))
                                .then(() => serveQuest())
                        })
                })
        })
}
// View Roles
function viewAllRoles() {
    db.findRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => serveQuest());
}
// Add Role
function addRole() {
    db.findDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    name: "title",
                    message: "What is the name of the role?"
                },
                {
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.createRole(role)
                        .then(() => console.log(`Added ${role.title} to the database`))
                        .then(() => serveQuest())
                })
        })
}
// Delete Role
function deleteRole() {
    db.findRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "roleId",
                    message:
                        "Which role do you want to delete? (Warning: This will also delete employees)",
                    choices: roleChoices
                }
            ])
                .then(res => db.deleteRole(res.roleId))
                .then(() => console.log("Deleted role from the database"))
                .then(() => serveQuest())
        })
}
// Delete Department
function deleteDepartment() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt({
                type: "list",
                name: "departmentId",
                message:
                    "Which department would you like to delete? (Warning: This will also delete roles and employees)",
                choices: departmentChoices
            })
                .then(res => db.deleteDepartment(res.departmentId))
                .then(() => console.log(`Deleted department from the database.`))
                .then(() => serveQuest())
        })
}
// View Department Budget
function viewDepartmentBudget() {
    db.viewDepartmentBudgets()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => serveQuest());
}
// Quit
function quit() {
    console.log("See Ya!");
    process.exit();
}

serveQuest()

// function updateRole() {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 name: "select_employee_to_update",
//                 message: "Enter id of employee you want to update (Required)",
//                 validate: (employeeUpdateInput) => {
//                     if (isNaN(employeeUpdateInput)) {
//                         console.log("Enter a number for the employee ID");
//                         return false;
//                     } else {
//                         return true;
//                     }
//                 },
//             },
//             {
//                 type: "input",
//                 name: "update_employee_role",
//                 message: "Enter new role ID(Required)",
//                 validate: (newRoleInput) => {
//                     if (isNaN(newRoleInput)) {
//                         console.log("Enter a number for the new role ID");
//                         return false;
//                     } else {
//                         return true;
//                     }
//                 },
//             },
//         ])
//         .then((answers) => {
//             const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
//             const params = [
//                 answers.update_employee_role,
//                 answers.select_employee_to_update,
//             ];
//             db.query(sql, params, (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 console.table(result);
//                 serveQuest();
//             });
//         });
// };
// const viewAllRoles = () => {
//     const sql = `SELECT role.*, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id`;
//     db.query(sql, (err, rows) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.table(rows);
//         serveQuest();
//     });
// };
// function addRole() {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 name: "new_role",
//                 message: "Enter new role name (Required)",
//                 validate: (roleNameInput) => {
//                     if (roleNameInput) {
//                         return true;
//                     } else {
//                         console.log("Enter new role name");
//                         return false;
//                     }
//                 },
//             },
//             {
//                 type: "number",
//                 name: "new_role_salary",
//                 message: "Enter new role salary (Required)",
//                 validate: (roleSalaryInput) => {
//                     if (roleSalaryInput) {
//                         return true;
//                     } else {
//                         console.log("Enter new role salary");
//                         return false;
//                     }
//                 },
//             },
//             {
//                 type: "number",
//                 name: "new_role_department",
//                 message: "Enter new role department id (Required)",
//                 validate: (roleDepartmentInput) => {
//                     if (roleDepartmentInput) {
//                         return true;
//                     } else {
//                         console.log("Enter new role department id");
//                         return false;
//                     }
//                 },
//             },
//         ])
//         .then((answers) => {
//             const sql = `INSERT INTO role (title, salary, department_id) VALUE (?,?,?)`;
//             const params = [
//                 answers.new_role,
//                 answers.new_role_salary,
//                 answers.new_role_department,
//             ];

//             db.query(sql, params, (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 console.table(result);
//                 console.log("A New Role Has Been Addded!!!");
//                 serveQuest();
//             });
//         });
// };
// View All Departments
// Add Department
// const viewAllDepartments = () => {
//     const sql = `SELECT * FROM department`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.table(rows);
//         serveQuest();
//     });
// };
// function addDepartment() {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 name: "department_name",
//                 message: "Enter name of new department(Required)",
//                 validate: (departmentNameInput) => {
//                     if (departmentNameInput) {
//                         return true;
//                     } else {
//                         console.log("Enter name of new department");
//                         return false;
//                     }
//                 },
//             },
//         ])
//         .then((answers) => {
//             const sql = `INSERT INTO department (name) VALUE (?)`;
//             const params = [answers.department_name];

//             db.query(sql, params, (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     return;
//                 }
//                 console.table(result);
//                 console.log("New department has been addded!!!");
//                 serveQuest();
//             });
//         });
// };