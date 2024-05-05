const inquirer = require('inquirer');
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

// function to get department choices
const getDepartmentChoices = async () => {
    const departments = await db.query('SELECT * FROM department');
    return departments.rows.map(department => ({
        name: department.name,
        value: department.id
    }));
};

// function to get employee choices
const getEmployeeChoices = async () => {
    const employees = await db.query('SELECT * FROM employee');
    const choices = employees.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));
    choices.unshift({ name: 'None', value: null }); // Add "None" option at the beginning
    return choices;
};

// function to get role choices
const getRoleChoices = async () => {
    const roles = await db.query('SELECT * FROM role');
    return roles.rows.map(role => ({
        name: role.title,
        value: role.id
    }));
};

// Validation functions
const validateName = async (input) => {
    if (!input) {
        return 'Name cannot be empty.';
    }
    return true;
};

const validateSalary = async (input) => {
    if (isNaN(input) || parseFloat(input) <= 0) {
        return 'Salary must be a positive number.';
    }
    return true;
};

const validateDepartmentId = async (input) => {
    const departments = await db.query('SELECT * FROM department');
    const departmentIds = departments.rows.map(department => department.id.toString());
    if (!departmentIds.includes(input)) {
        return 'Invalid department ID.';
    }
    return true;
};

const addDepartment = async () => {
    const { name } = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:',
        validate: validateName
    });

    await db.query(SQL_QUERIES.addDepartment, [name]);
    console.log('Department added');
}

const addRole = async () => {
    const { title, salary, department_id } = await inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the role:',
            validate: validateName
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for this role:',
            validate: validateSalary
        },
        {
            name: 'department_id',
            type: 'list',
            message: 'Which department does the role belong to?',
            choices: await getDepartmentChoices(),
            validate: validateDepartmentId
        }
    ]);

    await db.query(SQL_QUERIES.addRole, [title, salary, department_id]);
    console.log('Role added');
}

const addEmployee = async () => {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter the employee\'s first name:',
            validate: validateName
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the employee\'s last name:',
            validate: validateName
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'What is the employee\'s role?',
            choices: await getRoleChoices(),
            validate: async (input) => {
                const roles = await db.query('SELECT * FROM role');
                const roleIds = roles.rows.map(role => role.id.toString());

                if (!roleIds.includes(input)) {
                    return 'Invalid role ID';
                }
                return true;
            }
        },
        {
            name: 'manager_id',
            type: 'list',
            message: 'Who is the employee\'s manager? (leave blank if none)',
            choices: await getEmployeeChoices(),
            validate: async (input) => {
                
                if(input === '') {
                    return true; // Allow empty manager_id
                }

                const employee = await db.query('SELECT * FROM employee');
                const employeeIds = employee.rows.map(employee => employee.id.toString());

                if (!employeeIds.includes(input)) {
                    return 'Invalid manager ID';
                }
                return true;
            }
        },
    ]);

    await db.query(SQL_QUERIES.addEmployee, [first_name, last_name, role_id, manager_id]);
    console.log('Employee added');
}

const updateEmployeeRole = async () => {
    const employee = await db.query('SELECT * FROM employee');
    const employeeChoices = employee.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
    }));

    const roles = await db.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const { employeeId, roleId } = await inquirer.prompt([
        {
            name: 'employeeId',
            type: 'list',
            message: 'Select the employee you want to update:',
            choices: employeeChoices
        },
        {
            name: 'roleId',
            type: 'list',
            message: 'Select the new role for the employee:',
            choices: roleChoices
        }
    ]);

    await db.query(SQL_QUERIES.updateEmployeeRole, [roleId, employeeId]);
    console.log('Employee Role Updated');
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