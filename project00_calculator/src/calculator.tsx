// Start
import inquirer from 'inquirer';

inquirer
  .prompt([
    /* Pass your questions in here */
    "What is your Name"
  ])
  .then((answers:string) => {
    // Use user feedback for... whatever!!
    console.log("Your name is : ",answers)
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });