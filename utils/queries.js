const db = require('../db/db.js');

const SQL_QUERIES = {
    viewAllDepartments: 'SELECT * FROM department',
    viewAllRoles: 'SELECT * FROM role',
    viewAllEmployees: 'SELECT * FROM employee',
    addDepartment: 'INSERT INTO department (name) VALUES ($1)',
    addRole: 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    addEmployee: 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    updateEmployeeRole: 'UPDATE employee SET role_id = $1 WHERE id = $2'
};

const viewAllDepartments = async () => {
    const result = await db.query(SQL_QUERIES.viewAllDepartments);
    console.table(result.rows);
}

const viewAllRoles = async () => {
    const result = await db.query(SQL_QUERIES.viewAllRoles);
    console.table(result.rows);
}

const viewAllEmployees = async () => {
    const result = await db.query(SQL_QUERIES.viewAllEmployees);
    console.table(result.rows);
}

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole, 
    addEmployee, 
    updateEmployeeRole,
};