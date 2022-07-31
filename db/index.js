const connection = require('./connection.js')

class DB {

    constructor(connection) {
        this.connection = connection;
    }

    // Find Employees

    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    // Find Managers

    findAllPossibleManagers(employeeId) {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }

    //Create New Employee

    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
      }

    //Remove Employee

    removeEmployee(employeeId) {
        return this.connection.promise().query(
          "DELETE FROM employee WHERE id = ?",
          employeeId
        );
      }
      
      //Update Employees Role

      updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [roleId, employeeId]
        );
      }
    
      //Update thier manager

      updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query(
          "UPDATE employee SET manager_id = ? WHERE id = ?",
          [managerId, employeeId]
        );
      }

      // Find All Roles

      findAllRoles() {
        return this.connection.promise().query(
          "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
      }

      //Create New Role

      createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
      }
    
}