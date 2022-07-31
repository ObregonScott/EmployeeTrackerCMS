use employees;

INSERT INTO department (name)
VALUES
(1, 'Operations'), 
(2, 'Finance'),
(3, 'Legal'),
(4, 'Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
('Operations Lead', 650000, 1),
('Sales', 55000, 1), 
('Lead Engineer', 150000, 2), 
('Electrical Engineer', 122000, 2), 
('Coordinator', 80000, 3),
('Janitor', 999999, 3),
('Lawyer', 150000, 4)
('Paralegal', 60000,4)

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
('Barack', 'Obama', 1, 1),
('Scott', 'Obregon', 1, 2),
('Mike', 'Chan', 3, NULL),
('Kevin', 'Tupik', 4, NULL),
('Kunal', 'Singh', 5, NULL),
('Sara', 'Lourd', 6, NULL),
('Tom', 'Allen', 7, NULL),
('Karen', 'Kerrayzee', 8, NULL)