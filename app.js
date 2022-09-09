const inquirer = require('inquirer');

// const fs = require('fs');

// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage (name, github);

// fs.writeFile('index.html', generatePage(name, github), err=> {
//   if (err) throw err;
//   console.log('Portfolio complete! Check out index.html to see the output!');
// });

console.log(inquirer);


const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name');
          return false;
          
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your Github username',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter Github Username');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter info about yourself and create an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide info about yourself',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
      }
    

  ]);
};

const promptProject = portfolioData => {

  //If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer.prompt ([
    {
      type: 'input',
      name: 'name',
      message: 'Name of your project?',
      validate: projectInput => {
        if (projectInput) {
          return true;
        } else {
          console.log('Please enter Project Name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide project description?',
      validate: descriptionInput => {
        if(descriptionInput) {
          return true;
        } else {
          console.log('Please write project description');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What language did you build this project (check all that apply)?',
      choices: ['JS', 'HTML', 'CSS', 'ES6', 'JQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter Github link',
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log('Please include Github link');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default:false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Add another project?',
      default: false
    }
  ]
  )
  .then (projectData => {
    portfolioData.projects.push(projectData);
    if(projectData.confirmAddProject) {
      return promptProject (portfolioData);
    } else {
      return portfolioData;
    }
  });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });
