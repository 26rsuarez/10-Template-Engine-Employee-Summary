const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
employees = [];

questions = [
    {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    },
    {
        type: "input",
        name: "name",
        message: "What is your name?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "github",
        message: "What is your github username?",
        when: (answers) => answers.role === 'Engineer'
    },
    {
        type: "input",
        name: "school",
        message: "What is your school?",
        when: (answers) => answers.role === 'Intern'
    },
    {
        type: "number",
        name: "officeNumber",
        message: "What is your Office number?",
        when: (answers) => answers.role === 'Manager'
    }
]


//this function creates the objects and pushes the object into the employees array
function createEmployee(data){
        if (data.role==="Manager"){
            const manager = new Manager(data.name, employees.length, data.email, data.officeNumber);
            employees.push(manager);
        } 
        else if (data.role==="Engineer"){
            const engineer = new Engineer(data.name, employees.length, data.email, data.github);
            employees.push(engineer);
        } 
        else {
            const manager = new Intern(data.name, employees.length, data.email, data.school);
            employees.push(manager);
        }
        
}

//if they want to add more they will be prompted again otherwise the file will be created with the data
function addMore() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "addmore",
            message: "Add more employees?"
        }
        
    ]).then(val =>{
        if(val.addmore){
            promptUser()
        }
        else{
            const html = render(employees);
            fs.writeFileSync(outputPath, html);
        }
    })
}

//the user is prompted with questions then asked if they want to add more
async function promptUser(){
    const data = await inquirer.prompt(questions);
    createEmployee(data);
    addMore();
    }


promptUser() 


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
