const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


let employeeArray = [];

const whatEmployee = [
    {
        type: 'list',
        name: 'type',
        message: 'What type of employee is it?',
        choices: ['Manager', 'Engineer', 'Intern'],
    },
]

const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        messsage: "What is the manager's name?",
    },
    {
        type:'input',
        name: 'id',
        message: "What is the manager's ID number?",
    },
    {
        type: 'input',
        name: 'email',
        mesage: "What is the manager's email?",
    },
    {
        type: 'input',
        name: 'office',
        message: "What is the manager's office number?",
    },
    {
        type: 'list',
        name: 'last',
        message: "Have you input all employees?",
        choices:['Yes','No']
    },
]

const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        messsage: "What is the engineer's name?",
    },
    {
        type:'input',
        name: 'id',
        message: "What is the engineer's ID number?",
    },
    {
        type: 'input',
        name: 'email',
        mesage: "What is the engineer's email?",
    },
    {
        type: 'input',
        name: 'github',
        message: "What is the engineer's github username?",
    },
    {
        type: 'list',
        name: 'last',
        message: "Have you input all employees?",
        choices:['Yes','No']
    },
]

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        messsage: "What is the intern's name?",
    },
    {
        type:'input',
        name: 'id',
        message: "What is the intern's ID number?",
    },
    {
        type: 'input',
        name: 'email',
        mesage: "What is the intern's email?",
    },
    {
        type: 'input',
        name: 'school',
        message: "What school does this intern attend?",
    },
    {
        type: 'list',
        name: 'last',
        message: "Have you input all employees?",
        choices:['Yes','No']
    },
]

function makeManagerArray (input) {
    let currentArray = new Manager (input.name, input.id, input.email, input.office)
    // renderHTML(currentArray)
    employeeArray.push(currentArray);
    if (input.last == "Yes"){
        fs.writeFile('./output/team.html', render(employeeArray),(err) => err? console.log(err): console.log("HTML Created"));
    } else {init()}
}

function makeEngineerArray (input) {
    let currentArray = new Engineer (input.name, input.id, input.email, input.github)
    employeeArray.push(currentArray);
    if (input.last == "Yes"){
        fs.writeFile('./output/team.html', render(employeeArray),(err) => err? console.log(err): console.log("HTML Created"));
    } else {init()}
}

function makeInternArray (input) {
    let currentArray = new Intern (input.name, input.id, input.email, input.school)
    employeeArray.push(currentArray);
    if (input.last == "Yes"){
        fs.writeFile('./output/team.html', render(employeeArray),(err) => err? console.log(err): console.log("HTML Created"));
    } else {init()}
}

function init() {
    inquirer.prompt(whatEmployee)
    .then((input) => {
        if(input.type == 'Manager'){
            inquirer.prompt(managerQuestions).then((input) => makeManagerArray(input)
            )
        } else if(input.type == 'Engineer'){
            console.log('Engineer');
            inquirer.prompt(engineerQuestions).then((input) => makeEngineerArray(input)
            )
        } else{
            console.log('Intern');
            inquirer.prompt(internQuestions).then((input) => makeInternArray(input)
            )
        }
    }
    )
}

init();



// const renderHTML = (employee) => {
//     console.log(`rendering ${employee.name}`);
//     console.log(`rendering ${employee.email}`);
//     console.log(`rendering ${employee.id}`);
// }


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
