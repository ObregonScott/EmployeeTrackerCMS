CREATE TABLE department(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  dep_name VARCHAR(30)
);

CREATE TABLE employee_role(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE employee(
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR (30),
  role_id INT,
  manager_id INT
);
