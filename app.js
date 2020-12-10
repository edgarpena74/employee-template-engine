const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { format } = require("path");

const employeeArr = [];

//function to first ask which type of employee the user would like to enter
function getEmployeeTitle(){
    inquirer.prompt([
    {
        type: "list",
        message: "Select employee's job title.",
        name: "titleInput",
        choices: ["Engineer", "Manager", "Intern"],
    },
    ])
    .then((res) => {
    if(res.titleInput === "Manager") {
        addManager()
    } else if(res.titleInput === "Engineer") {
        addEngineer()
    } else {
        addIntern()
    }
    })
}

//function to confirm whether or not the user would like to add a new employee
function addNewEmp() {
    inquirer.prompt([
    {
        type: "confirm",
        message: "Would you like to add another team member?",
        name: "addMember",
        default: true,
    },
    ]).then(addRes => {
    if (addRes.addMember) {
        getEmployeeTitle();
    } else {
        renderMain();
    };
    });
};

//function with add manager prompts
function addManager () {
    inquirer.prompt([
    {
        type: "input",
        message: "Enter Manager name.",
        name: "managerName",
    },
    {
        type: "input",
        message: "Enter Manager employee ID.",
        name: "managerID",
    },
    {
        type: "input",
        message: "Enter Manager email.",
        name: "managerEmail",
        validate: function (managerEmail) {
            managerFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(managerEmail)

            if (managerFormat) {
                return true;
            } else {
                console.log(" Invalid Email")
                return false;
            }
        }
    },
    {
        type: "input",
        message: "Enter Manager office number.",
        name: "managerOfficeNum",
    },
  ])
  .then((managerRes) => {
    console.log(managerRes);
    const newManager = new Manager(managerRes.managerName, managerRes.managerID, managerRes.managerEmail, managerRes.managerOfficeNum);
    employeeArr.push(newManager);
    addNewEmp()
 })
}

//function with add engineer prompts
function addEngineer () {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter Engineer name.",
            name: "engineerName",
        },
        {
            type: "input",
            message: "Enter Engineer employee ID.",
            name: "engineerID",
        },
        {
            type: "input",
            message: "Enter Engineer email.",
            name: "engineerEmail",
            validate: function (engineerEmail) {
                engineerFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(engineerEmail)
    
                if (engineerFormat) {
                    return true;
                } else {
                    console.log(" Invalid Email")
                    return false;
                }
            }
        },
        {
            type: "input",
            message: "Enter Engineer GitHub user name.",
            name: "engineerGithub",
        },
    ])
    .then((engineerRes) => {
        console.log(engineerRes)
        const newEngineer = new Engineer(engineerRes.engineerName, engineerRes.engineerID, engineerRes.engineerEmail, engineerRes.engineerGithub);
        employeeArr.push(newEngineer);
        addNewEmp()
    })
}

//function with add intern prompts
function addIntern () {
    inquirer.prompt([
        {
                type: "input",
                message: "Enter Intern name.",
                name: "internName",
        },
        {
                type: "input",
                message: "Enter Intern employee ID.",
                name: "internID",
        },
        {
                type: "input",
                message: "Enter Intern email.",
                name: "internEmail",
                validate: function (internEmail) {
                    internFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(internEmail)
        
                    if (internFormat) {
                        return true;
                    } else {
                        console.log(" Invalid Email")
                        return false;
                    }
                }
        },
        {
                type: "input",
                message: "Enter Intern's school.",
                name: "internSchool",
        },
    ])
    .then((internRes) => {
        console.log(internRes)
        const newIntern = new Intern(internRes.internName, internRes.internID, internRes.internEmail, internRes.internSchool);
        employeeArr.push(newIntern);
        addNewEmp()
    })
}

//function to write team.html once all employees are entered
function renderMain () {
    const HTML = render(employeeArr);
    fs.writeFile(outputPath, HTML, (err) => {
        if (err) throw err
    })
}

getEmployeeTitle()
