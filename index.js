// allows use of file system
const fs = require('fs');
// allows use of inquirer
const inquirer = require('inquirer');

// allows use of classes
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');


// question that determines the employee type
const setEmployee = [
    {
        type: 'list',
        name: 'role',
        message: 'What type of employee would you like to add?',
        choices: [
            'Manager',
            'Engineer', 
            'Intern'
        ]
    }
]

// information shared across the employee types
const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the employees name?',
    },

    {
        type: 'input',
        name: 'id',
        message: 'What is their ID number?',
    },

    {
        type: 'input',
        name: 'email',
        message: 'What is their email address?',
    },

]


// question specific to the manager
const managerQuestion = [
    {
        type: 'input',
        name: 'office',
        message: 'What is their office number?',
    }
]

// question specific to the engineer
const engineerQuestion = [
    {
        type: 'input',
        name: 'github',
        messge: 'What is their github username?',
    }
]

// question specific to the intern
const internQuestion = [
    {
        type: 'input',
        name: 'school',
        message: 'What school do they attend?',
    }
]

// initializes the global variable of all the employees
let managerList = [];
let engineerList = [];
let internList = [];



async function init() {

    // let newEmployee;

    // asks what type of employee
    let employeeRole = await inquirer.prompt(setEmployee);

    // asks the shared questions
    // let employeeInfo = await inquirer.prompt(employeeQuestions);
    let {name, id, email}= await inquirer.prompt(employeeQuestions);


    // asks the question specific to the role and then pushes it to the correct array 
    await compile(name, id, email, employeeRole);


    let finalQues = await inquirer.prompt(
        [{
            type: 'confirm',
            name: 'addAnother',
            message: 'Would you like to add another employee?',
        }]
    )


    // checks to see if you want to add more employees
    if (finalQues.addAnother){
        init();
    }

    else{

        let manCards = renderCards(managerList);
        let engCards = renderCards(engineerList);
        let intCards = renderCards(internList);

        renderPage(manCards, engCards, intCards);

        return;
    }

}


// builds out the employee information and pushes it to the array specific to the type specified
async function compile(name, id, email, role) {

    let answer;

    
    switch (role.role) {

        case 'Manager':

            // asks the manager question
            answer = await inquirer.prompt(managerQuestion)

            // compiles the information in to a manager class
            let newManager = new Manager(name, id, email, answer.office)

            // pushes the manager in to the associated array
            managerList.push(newManager);

            break;

        case 'Engineer':

            // asks the engineer question
            answer = await inquirer.prompt(engineerQuestion)

            // compiles the information to a new engineer class
            let newEngineer = new Engineer(name, id, email, answer.github)

            // pushes the engineer to the associated array
            engineerList.push(newEngineer);

            break;
        
        case 'Intern': 

            // asks the intern question
            answer = await inquirer.prompt(internQuestion)

            // compiles the information in to a new student class
            let newIntern = new Intern(name, id, email, answer.school)

            // pushes the intern to the associated list
            internList.push(newIntern);

            break;

        default: 
            break;
    }

}

// function that generates the employee cards from a passed array and returns the total html text
function renderCards (arr) {

    let allCards = '<div class="row">'

    let cardText = '';

    for (let i = 0; i < arr.length; i++) {

        let role = arr[i].getRole();
        
        switch (role) {

            case 'Manager':
                cardText = `<div class="col s8 m6 card ">
                <div class="header">
                    <h2 class="card-title red"><img class="icon left" src="./assets/images/grandparents-icon-2-removebg-preview.png" alt="icon of grandparents">${arr[i].getName()}</h2>
                </div>
                <div>
                    <p class="man-text">Role: ${arr[i].getRole()}</p>
                    <p class="man-text">ID: ${arr[i].getId()}</p>
                    <p class="man-text">email: <a href="mailto:${arr[i].getEmail()}">${arr[i].getEmail()}</a></p>
                    <p class="man-text">Office Number: ${arr[i].getOffice()}</p>
                </div>
            </div>`

            allCards += cardText;
            break;

            case 'Engineer': 
                cardText = `<div class="col s6 m4 card">
                <h2 class="card-title blue"><img class="icon left" src="./assets/images/alcohol-icon-14.jpg" alt="icon of alcohol">${arr[i].getName()}</h2>
                <div>
                    <p class="eng-text">Role: ${arr[i].getRole()}</p>
                    <p class="eng-text">ID: ${arr[i].getId()}</p>
                    <p class="eng-text">email: <a href="mailto:${arr[i].getEmail()}">${arr[i].getEmail()}</a></p>
                    <p class="eng-text">github: www.github.com/${arr[i].getGithub()}</p>
                </div>
            </div>`
                
            allCards += cardText;
            break;

            case 'Intern':
                cardText = `<div class="col s4 m3 card">
                <h2 class="card-title green"><img class="icon left" src="./assets/images/baby.jpg" alt="icon of a baby">${arr[i].getName()}</h2>
                <div>
                    <p class="int-text">Role: ${arr[i].getRole()}</p>
                    <p class="int-text">ID: ${arr[i].getId()}</p>
                    <p class="int-text">email: <a href="mailto:${arr[i].getEmail()}">${arr[i].getEmail()}</a></p>
                    <p class="int-text">School: ${arr[i].getSchool()}</p>
                </div>
            </div>`

            allCards += cardText;
            break;

            default: 
            break;

            

        }
        
    }

    allCards = allCards + '</div>';

    return allCards;

}


function renderPage(managers, engineers, interns) {

    fs.writeFile('./dist/index.html',`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <!-- Compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    
        <link rel="stylesheet" href="./assets/css/style.css">
    
        <title>Full Team</title>
    </head>
    <body>
    
        <h1 class="center">Here is the full team</h1>
        
        <div class="container center">
        
        ${managers}
        ${engineers}
        ${interns}
        </div>
    



    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

</body>
</html>`, (err) => err ? console.log(err) : console.log('Your webpage has been created'))

}




init()


