INSERT INTO department 
VALUES
(1, 'Engineering'), 
(2, 'Finance'),
(3, 'Legal'), 
(4, 'Managment'),
(5, 'Operations');

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, 'manager', 100000, 5),
(2, 'salesperson', 50000, 2), 
(3, 'engineer', 60000, 1), 
(4, 'researcher', 70000, 3), 
(5, 'coordinator', 80000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
VALUES
(1, 'Mike', 'Chan', 2, 10),
(2, 'Ashley', 'Rodriguez', 2, 10),
(3, 'Kevin', 'Tupik', 4, 10),
(4, 'Kunal', 'Singh', 5, 10),
(5, 'Malia', 'Brown', 2, 10),
(6, 'Sara', 'Lourd', 3, 10),
(7, 'Tom', 'Allen', 3, 10),
(8, 'Scott', 'Obregon', 4, 10),
(9, 'Karen', 'Kerrayzee', 5, 10),
(10, 'Barack', 'Obama', 1, 10);