const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function getManager() {
    console.log('Build your Team!')
    inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: 'What is your managers name?',
            validate: (managerName) => {
                if (managerName) {
                    return true;
                } else {
                    console.log("Enter managers name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is youre managers id?',
            validate: (managerId) => {
                if (managerId) {
                    return true;
                } else {
                    console.log("Enter manager Id!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: 'what is your managers email?',
            validate: (managerEmail) => {
                if (managerEmail) {
                    return true;
                } else {
                    console.log("Enter managers email!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'managerOffice',
            message: 'what is your managers office number?',
            validate: (managerOffice) => {
                if (managerOffice) {
                    return true;
                } else {
                    console.log("Enter managers office number!");
                    return false;
                }
            }
        },     
    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice, answers.manager);
        team.push(manager);
        addTeam();
    });
};

function addTeam() {
    inquirer.prompt([
     {
        type: 'list',
        name: 'memberType',
        message: 'which type of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'I don\'t want to add any more team members']         
    }   
    ]).then(chosen => {
        switch (chosen.memberType) {
            case 'Engineer':
                addEngineer();
                break;
            case 'Intern':
                addIntern();
                break;
            case 'I don\'t want to add any more team members':
                buildTeam();
                break;
        }
    })
    
}

function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: 'What is the engineers name?',
            validate: (engineerName) => {
                if (engineerName) {
                    return true;
                } else {
                    console.log("Enter engineers name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'engineerId',
            message: 'What is youre engineers id?',
            validate: (engineerId) => {
                if (engineerId) {
                    return true;
                } else {
                    console.log("Enter engineers Id!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: 'what is the engineers email?',
            validate: (engineerEmail) => {
                if (engineerEmail) {
                    return true;
                } else {
                    console.log("Enter engineers email!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: 'what is the engineer\'s Github?',
            validate: (engineerGithub) => {
                if (engineerGithub) {
                    return true;
                } else {
                    console.log("Enter engineer\'s Github!");
                    return false;
                }
            }
        },     
    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub, answers.engineer);
        team.push(engineer);
        addTeam();
    });
};
function addIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'internName',
            message: 'What is the interns name?',
            validate: (internName) => {
                if (internName) {
                    return true;
                } else {
                    console.log("Enter interns name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'internId',
            message: 'What is youre interns id?',
            validate: (internId) => {
                if (internId) {
                    return true;
                } else {
                    console.log("Enter interns Id!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'internEmail',
            message: 'what is the interns email?',
            validate: (internEmail) => {
                if (internEmail) {
                    return true;
                } else {
                    console.log("Enter interns email!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'internSchool',
            message: 'what is the intern\'s School?',
            validate: (internSchool) => {
                if (internSchool) {
                    return true;
                } else {
                    console.log("Enter intern\'s School!");
                    return false;
                }
            }
        },     
    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internGithub, answers.intern);
        team.push(intern);
        addTeam();
    });
};

function buildTeam() {
    fs.writeFileSync(outputPath, render(team), 'UTF-8');
}

getManager();
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
