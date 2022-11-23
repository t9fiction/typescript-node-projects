#!/usr/bin/env node
// Start
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";

// const prompt = inquirer.createPromptModule();
const log = console.log;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function app() {
  console.clear();
  console.log("\n");
  // log(chalkAnimation.radar("Calculator by Sohail Ishaque : PIAIC105167"));
  log(chalk.bgGreen("Calculator by Sohail Ishaque : PIAIC105167"));
  console.log("\n");

  //Asking for user Name
  let user = await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: chalk.green("What is your Name ?"),
        default: "User",
      },
    ])
    .then(
      (result) => {
        log(chalk.bgGreen("\n Welcome ", chalk.red(result.name), "...\n"));
        return result.name;
      },
      (error) => {
        log("error : ", error);
      }
    );

  //variables declaration
  let num1 = 0;
  let num2 = 0;
  let checkVar = "true";

  // Operation selection
  // log("\nHello ", user, " .....");

  async function operation() {
    await inquirer
      .prompt({
        type: "list",
        name: "operation",
        message: chalk.greenBright("Select the operation"),
        choices: [
          "Addition",
          "Subraction",
          "Multiplication",
          "Division",
          "Percentage",
          "Modulus",
          "Sq root",
        ],
      })
      .then(async (result) => {
        let answer = 0;

        // Input Number 1
        await inquirer
          .prompt({
            type: "number",
            name: "firstNumber",
            message: chalk.green("Enter number"),
            default: 0,
          })
          .then((result) => {
            num1 = result.firstNumber;
          });

        // Input Number 2
        if (result.operation !== "Percentage" && result.operation !== "Sq root")
          await inquirer
            .prompt({
              type: "number",
              name: "secondNumber",
              message: chalk.green("Enter Second number"),
              default: 0,
            })
            .then((result) => {
              num2 = result.secondNumber;
            });

        const spinner = createSpinner("Checking answer...\n").start();
        await sleep();

        if (result.operation === "Addition") {
          answer = num1 + num2;
          spinner.success({
            text: chalk.green(`> ${result.operation} of the given numbers = `)+` ${answer}`,
          });
          return answer;
        } else if (result.operation === "Multiplication") {
          answer = num1 * num2;
          spinner.success({
            text: chalk.green(`> ${result.operation} of the given numbers =`)+` ${answer}`,
          });
          return answer;
        } else if (result.operation === "Subraction") {
          answer = num1 - num2;
          spinner.success({
            text: chalk.green(`> ${result.operation} of second number from first =`)+` ${answer}`,
          });
          return answer;
        } else if (result.operation === "Division") {
          answer = num1 / num2;
          spinner.success({
            text: chalk.green(`> ${result.operation} of first number by second =`)+` ${answer}`,
          });
          return answer;
        } else if (result.operation === "Modulus") {
          answer = num1 % num2;
          spinner.success({
            text: chalk.green(`> ${result.operation} of first number by second =`)+` ${answer}`,
          });
          return answer;
        } else if (result.operation === "Percentage") {
          answer = num1 / 100;
          spinner.success({ text: chalk.green(`>`)+` ${answer} %`});
          return answer;
        } else if (result.operation === "Sq root") {
          answer = num1 ** 0.5;
          spinner.success({
            text: chalk.green(`> ${result.operation} of the given number =`)+` ${answer}`,
          });
          return answer;
        } else {
          return 0;
        }
      });
  }

  async function reRun() {
    await inquirer
      .prompt({
        type: "confirm",
        name: "continue",
        message: chalk.bgGreen("Do you want to perform an other operation ?"),
      })
      .then((result) => {
        if (result.continue === true) {
          checkVar = "true";
        } else {
          checkVar = "false";
        }
      });
  }

  while (checkVar == "true") {
    await operation();
    await reRun();
  }

  console.clear();
}
app();
