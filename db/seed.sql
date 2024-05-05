-- seed.sql
INSERT INTO department (name) VALUES ('HR');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('IT');

INSERT INTO role (title, salary, department_id) VALUES ('Manager', 60000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 50000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Developer', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL); -- No manager
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1); -- reporting to John Doe (manager id 1)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Johnson', 3, 1); -- reporting to John Doe (manager id 1)
