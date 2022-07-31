const connection = require('./connect')

class DB {

    constructor(connection) {
        this.connection = connection;
    }

    // Find
    findRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }
    findDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }
    findEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }
    findEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
        );
    }
    findEmployeesByManager(managerId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
            managerId
        );
    }
    findAllPossibleManagers(employeeId) {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }

    // Create
    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }
    createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    }
    createDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    }

    // Delete
    deleteEmployee(employeeId) {
        return this.connection.promise().query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }
    deleteRole(roleId) {
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
    }
    deleteDepartment(departmentId) {
        return this.connection.promise().query(
            "DELETE FROM department WHERE id = ?",
            departmentId
        );
    }

    //Updates
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerId, employeeId]
        );
    }

    // View
    viewDepartmentBudgets() {
        return this.connection.promise().query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }
}

module.exports = new DB(connection)