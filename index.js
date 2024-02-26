const db = require('./db');
const { prompt } = require('inquirer');
const logo = require('asciiart-logo');

init();

function init() {
    const logoText = logo({ name: 'Employee Tracker' }).render();

    console.log(logoText);

    loadMainPrmpts();

    function loadMainPrmpts() {
        prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: [
                    {
                        name: 'View all employees',
                        value: 'View_Employees'
                    },
                    {
                        name: 'View all departments',
                        value: 'View_Departments'
                    },
                    {
                        name: 'View all employees by department',
                        value: 'View_Employees_By_Department'
                    },
                    {
                        name: 'View all employees by manager',
                        value: 'View_Employees_By_Manager'
                    },
                    {
                        name: 'Add employee',
                        value: 'Add_Employee'
                    },
                    {
                        name: 'Remove employee',
                        value: 'Remove_Employee'
                    },
                    {
                        name: "Update Employee Role",
                        value: "UPDATE_EMPLOYEE_ROLE"
                    },
                    {
                        name: "Update Employee Manager",
                        value: "UPDATE_EMPLOYEE_MANAGER"
                    },
                    {
                        name: "View All Roles",
                        value: "VIEW_ROLES"
                    },
                    {
                        name: "Add Role",
                        value: "ADD_ROLE"
                    },
                    {
                        name: "Remove Role",
                        value: "REMOVE_ROLE"
                    },
                    {
                        name: "View All Departments",
                        value: "VIEW_DEPARTMENTS"
                    },
                    {
                        name: "Add Department",
                        value: "ADD_DEPARTMENT"
                    },
                    {
                        name: "Remove Department",
                        value: "REMOVE_DEPARTMENT"
                    },
                    {
                        name: "View Total Utilized Budget By Department",
                        value: "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT"
                    },
                    {
                        name: "Quit",
                        value: "QUIT"
                    }
                ]
            }
        ]).then(res => {
            const { choice } = res;
            switch (choice) {
                case 'View_Employees':
                    db.query('SELECT * FROM employee', (err, rows) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(rows);)
