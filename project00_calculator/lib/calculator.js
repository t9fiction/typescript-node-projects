"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Start
const inquirer_1 = __importDefault(require("inquirer"));
inquirer_1.default
    .prompt([
    /* Pass your questions in here */
    "What is your Name"
])
    .then((answers) => {
    // Use user feedback for... whatever!!
    console.log("Your name is : ", answers);
})
    .catch((error) => {
    if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
    }
    else {
        // Something else went wrong
    }
});
