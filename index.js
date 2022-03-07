
// html design:
// employee class with manager, engineer, and intern as subclasses
// manager at the top
// engineer below that
// interns below that
// 6 wide for team and interns 


// inquirer collects the data but use tests to set those variables directly\


// add a gitignore 


// employee class: * `name`

// * `id`

// * `email`

// * `getName()`

// * `getId()`

// * `getEmail()`

// * `getRole()`&mdash;returns `'Employee'`

// ------------------------------------------------------------------------//

// manager subclass : `officeNumber`

// * `getRole()`&mdash;overridden to return `'Manager'`

// ------------------------------------------------------------------------//

// engineer subclass:

// * `github`&mdash;GitHub username

// * `getGithub()`

// * `getRole()`&mdash;overridden to return `'Engineer'`

// ------------------------------------------------------------------------//

// intern subclass: 

// * `school`

// * `getSchool()`

// * `getRole()`&mdash;overridden to return `'Intern'`



// pseudo code 

// prompts should flow something like this:
// "What is the employee's name?"
// "What is their ID number?"
// "What is their email address?"
// "What is their role?"
// then the getName(), getId(), getEmail(), and getRole() all assign the answers to the specific variables. I'm thinking about using the ID number to ensure each employee is unique. Possibly include a function to check whether the id is unique and if display a message something like "that employee number is already taken. Do you wish to overwrite ${display employee}?"
// at this point branch the prompts to be specific to the role
// if manager: 
// "What is their office number?"
// if engineer:
// "what is their github username?"
// if interen: 
// "What school do they go to?"
// Possibly do getName()right away and include the name in the remaining prompts (would probably require async's and awaits)

// Once all the questions are filled out, ask if there are more employees to add
// Once all employees are added then write the page. Maybe include a running count so you can cap the employees at a certain level. 

// write a function that loops through each subclass and creates the html code appropriately (maybe do a switch for each case and then just run the function 3 times for each subclass)
// something like function renderCard(subclass) 
// switch subclass
// case manager:
// case engineer:
// case intern: 


// functions: 

// init(): "What team member would you like to add (choice between manager, engineer, and intern)"

// addManager() If the employee is a manager, go through the elements and compile them as the appropriate html card

// addEngineer() see above

// addIntern() see above

// checker() after each add function, present the answers as a list and ask if they would like to change anything (first thoice should be 'looks good')

// addMore() this function will run at the bottom of each one and it gives a prompts of "would you like to add any more" with the list type being manager, engineer, intern, all done. run the associated function for the three employee types

// createHTML() this will run when 'all done' is selected and it generates the html

// renderEmployee() start with a switch statement to determine the employee type and then go through a for loop to render each element to the page. this will run inside createHTML().

// employeeCheck() checks that the new employee being added doesn't share an ID with another (or if you are adding another manager?). if so prompt the user. ideally include this within the id question. might need to break out that one in to it's own const 

// DONE getRole() assigns the next block of prompts

// build a function that compiles all the answers and pushes in to an array of employee objects


const inquirer = require('inquirer');

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
        message: 'What is the employees name?'
    },

    {
        type: 'input',
        name: 'id',
        message: 'What is their ID number?'
    },

    {
        type: 'input',
        name: 'email',
        message: 'What is their email address?'
    },

]


// question specific to the manager
const managerQuestion = [
    {
        type: 'input',
        name: 'office',
        message: 'What is their office number?'
    }
]

// question specific to the engineer
const engineerQuestion = [
    {
        type: 'input',
        name: 'github',
        messge: 'What is their github username?'
    }
]

// question specific to the intern
const internQuestion = [
    {
        type: 'input',
        name: 'school',
        message: 'What school do they attend?'
    }
]

// initializes the global variable of all the employees
let employeeList = []

async function init() {

    let newEmployee;

    let employeeRole = await inquirer.prompt(setEmployee);

    let employeeInfo = await inquirer.prompt(employeeQuestions);

    let employeeSpec = await getRole(employeeRole.role);


    // builds out the employee entry and adds to the list
    newEmployee = {
        name: employeeInfo.name, 
        role: employeeRole.role,
        id: employeeInfo.id,
        email: employeeInfo.email 
    }

    switch (employeeRole.role) {

        case 'Manager':
            newEmployee.office = employeeSpec.office;
            break;

        case 'Engineer':
            newEmployee.github = employeeSpec.github;
            break;
        
        case 'Intern': 
            newEmployee.school = employeeSpec.school;
            break;

        default: 
            break;
    }

    employeeList.push(newEmployee)

    console.log(employeeList)


    let another = await inquirer.prompt(
        [{
            type: 'confirm',
            name: 'addAnother',
            message: 'Would you like to add another employee?',
        }]
    )


    // checks to see if you want to add more employees
    if (another.addAnother){
        init();
    }

    else{
        
        // createHTML()
        console.log('All done!')
        return;
    }

}


async function getRole(type) {


    let answers;

    switch (type) {
        case 'Manager': 

            answers = await inquirer.prompt(managerQuestion)
            return answers;

        case 'Engineer':

            answers = await inquirer.prompt(engineerQuestion)
            return answers;

        case 'Intern': 
            answers = await inquirer.prompt(internQuestion)
            return answers;

        default: 
            return
    }

}

// async function checker(obj) {


    
// }

init()
