const inquirer = require('inquirer');
const { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./utils/queries');

// Array containing options for the main menu
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

// Function to start the application
const start = async () => {
    console.log('Welcome to the Employee-Tracker System');

    // Call the function to prompt the main menu
    await promptMainMenu();
}

// Function to prompt the main menu
const promptMainMenu = async () => {
    // Prompt the user to choose an option from the main menu
    const { choice } = await inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: mainMenuOptions
    });

    // Switch statement to handle user's choice
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
            // Exit the process with the status code 0
            process.exit(0);
    }

    // // Call the main menu again for continuous operation
    await promptMainMenu();
}

// Start the application
start();