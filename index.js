const db = require('./db');
const { prompt } = require('inquirer');
const logo = require('asciiart-logo');

init();

function init() {
    const logoText = logo({ name: 'Emp-oyee Tracker' }).render();

    console.log(logoText);

    loadMainPrmpts();
}
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
                    value: "Update_Employee_Role"
                },
                {
                    name: "Update Employee Manager",
                    value: "Update_Employee_Manager"
                },
                {
                    name: "View All Roles",
                    value: "View_Roles"
                },
                {
                    name: "Add Role",
                    value: "Add_Role"
                },
                {
                    name: "Remove Role",
                    value: "Remove_Role"
                },
                {
                    name: "View All Departments",
                    value: "View_Departments"
                },
                {
                    name: "Add Department",
                    value: "Add_Department"
                },
                {
                    name: "Remove Department",
                    value: "Remove_Department"
                },
                {
                    name: "View Total Utilized Budget By Department",
                    value: "View_Utilized_Budget_By_Department"
                },
                {
                    name: "Quit",
                    value: "Quit"
                }
            ]
        }
    ]).then(res => {
        const { choice } = res.choice;
        switch (choice) {
            case 'View_Employees':
                viewEmployees();
                break;
            case 'View_Departments':
                viewDepartments();
                break;
            case 'View_Employees_By_Department':
                viewEmployeesByDepartment();
                break;
            case 'View_Employees_By_Manager':
                viewEmployeesByManager();
                break;
            case 'Add_Employee':
                addEmployee();
                break;
            case 'Remove_Employee':
                removeEmployee();
                break;
            case 'Update_Employee_Role':
                updateEmployeeRole();
                break;
            case 'Update_Employee_Manager':
                updateEmployeeManager();
                break;
            case 'View_Roles':
                viewRoles();
                break;
            case 'Add_Role':
                addRole();
                break;
            case 'Remove_Role':
                removeRole();
                break;
            case 'View_Departments':
                viewDepartments();
                break;
            case 'Add_Department':
                addDepartment();
                break;
            case 'Remove_Department':
                removeDepartment();
                break;
            case 'View_Utilized_Budget_By_Department':
                viewUtilizedBudgetByDepartment();
                break;
            default:
                quit();
        }
    });
}

// View all employees
function viewEmployees() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees);
        })
        .then(() => loadMainPrmpts());
}

// view all departments
function viewDepartments() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => loadMainPrmpts());
}

// view all employees by department
function viewEmployeesByDepartment() {
    db.findAllEmployeesByDepartment()
        .then(([rows]) => {
            let employeesByDepartment = rows;
            console.table(employeesByDepartment);
        })
}

// view all employees by manager
function viewEmployeesByManager() {
    db.findAllEmployeesByManager()
        .then(([rows]) => {
            let employeesByManager = rows;
            console.table(employeesByManager);
        })
}

// delete employee
function removeEmployee() {
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    name: 'employeeId',
                    type: 'list',
                    message: 'Which employee do you want to remove?',
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    const { employeeId } = res;
                    db.removeEmployee(employeeId);
                    console.log('Removed employee!');

                })
                .then(() => loadMainPrmpts());
        });
}

// view all roles
function viewRoles() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.table(roles);
        })
        .then(() => loadMainPrmpts());
}

// add role
function addRole() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    name: 'title',
                    message: 'What is the name of the role?'
                },
                {
                    name: 'salary',
                    message: 'What is the salary of the role?'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Which department does the role belong to?',
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.createRole(role);
                    console.log(`Added ${role.title} to the database`);
                })
                .then(() => loadMainPrmpts())
        })
}

// delete role
function removeRole() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));

            prompt([
                {
                    name: 'roleId',
                    type: 'list',
                    message: 'Which role do you want to remove?',
                    choices: roleChoices
                }
            ])
                .then(res => db.removeRole(res.roleId))
                .then(() => console.log('Removed role from the database'))
                .then(() => loadMainPrmpts())
        })
}


// add a department
function addDepartment() {
    prompt([
        {
            name: 'name',
            message: 'What is the name of the department?'
        }
    ])
        .then(res => {
            db.createDepartment(res);
            console.log(`Added ${res.name} to the database`);

        })
}

// delete department
function removeDepartment() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Which department do you want to remove?',
                    choices: departmentChoices
                }
            ])
                .then(res => db.removeDepartment(res.departmentId))
                .then(() => console.log('Removed department from the database'))
                .then(() => loadMainPrmpts())
        })
}

// View all departments and show utilized budget
function viewDepartmentBudgets() {
    db.viewDepartmentBudgets()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);

        })
        .then(() => loadMainPrmpts())
}

//add employee
function addEmployee() {
    prompt([
        {
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            name: 'last_name',
            message: "What is the employee's last name?"
        }
    ])
        .then(res => {
            let employee = res;
            db.findAllRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    prompt({
                        type: 'list',
                        name: 'roleId',
                        message: "What is the employee's role?",
                        choices: roleChoices
                    })
                        .then(res => {
                            employee.role_id = res.roleId;

                            db.findAllEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));

                                    managerChoices.unshift({ name: 'None', value: null });

                                    prompt({
                                        type: 'list',
                                        name: 'managerId',
                                        message: "Who is the employee's manager?",
                                        choices: managerChoices
                                    })
                                        .then(res => {
                                            employee.manager_id = res.managerId;
                                            db.createEmployee(employee);
                                            console.log(
                                                `Added ${employee.first_name} ${employee.last_name} to the database`
                                            );
                                        })
                                        .then(() => loadMainPrmpts())
                                })
                        })
                })
        })
}


// quit the app
function quit() {
    process.exit();
}
