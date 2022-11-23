// Start
import inquirer from "inquirer";
import chalk from "chalk";

// const prompt = inquirer.createPromptModule();
const log = console.log;

async function app() {
  console.clear();
  console.log("\n");
  log(chalk.bgBlue("Calculator by Sohail Ishaque : PIAIC105167"));
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

        if (result.operation === "Addition") {
          answer = num1 + num2;
          log(
            chalk.green(result.operation, " of the given numbers = "),
            answer
          );
          return answer;
        } else if (result.operation === "Multiplication") {
          answer = num1 * num2;
          log(
            chalk.green(result.operation, " of the given numbers = "),
            answer
          );
          return answer;
        } else if (result.operation === "Subraction") {
          answer = num1 - num2;
          log(
            chalk.green(result.operation, " of second number from first = "),
            answer
          );
          return answer;
        } else if (result.operation === "Division") {
          answer = num1 / num2;
          log(
            chalk.green(result.operation, " of first number by second = "),
            answer
          );
          return answer;
        } else if (result.operation === "Modulus") {
          answer = num1 % num2;
          log(
            chalk.green(result.operation, " of first number by second = "),
            answer
          );
          return answer;
        } else if (result.operation === "Percentage") {
          answer = num1 / 100;
          log(answer, chalk.green("%"));
          return answer;
        } else if (result.operation === "Sq root") {
          answer = num1 ** 0.5;
          log(chalk.green(result.operation, " of given number = "), answer);
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
}
app();
