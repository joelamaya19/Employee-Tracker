const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./utils/queries');

const mainMenuOptions = [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add A Department',
    'Add A Role',
    'Add An Employee',
    'Update An Employee Role',
    'Exit'
];

const start = async () => {
    console.log('Welcome to the Employee-Tracker System');
    await promptMainMenu;
}

const promptMainMenu = async () => {
    const { choice } = await inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: mainMenuOptions
    });

    switch (choice) {
        case 'View All Departments':
            await viewAllDepartments();
            break;
        case 'View All Roles':
            await viewAllRoles();
            break;
        case 'View All Employees':
            await viewAllEmployees();
            break;
        case 'Add A Department':
            await addDepartment();
            break;
        case 'Add A Role':
            await addRole();
            break;
        case 'Add An Employee':
            await addEmployee();
            break;
        case 'Update An Employee Role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Have a nice day! Goodbye');
            process.exit(0);
    }
}

start();