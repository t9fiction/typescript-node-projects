#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import chalkAnimation from "chalk-animation";

let magicNum = Math.floor(Math.random() * 10) + 1;

let num1 = 0;
const log = console.log;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

//---- Start of  Main Function ----
async function guessNumber() {
  console.clear();
  log("\n");
  // log("\n");

  // console.log(magicNum);
  await rainbowEffect();
  await myName();
  await makingGuess();
}
//---- End of guessNumber ----

// ---- Rainbow Effect ----
async function rainbowEffect() {
  let rainbow = chalkAnimation.rainbow(
    `\t"Guessing the Number"\n 
    by Sohail Ishaque : PIAIC105167`
  );

  rainbow.start(); // Animation resumes
  await sleep();
  // setTimeout(() => {
  //   rainbow.stop(); // Animation stops
  // }, 5000);

  // setTimeout(() => {
  // rainbow.start(); // Animation resumes
  // }, 200);
  log("\n");
}

//-----Asking for user Name function-----
async function myName() {
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
        log(chalk.bgCyan("\n Welcome ", chalk.red(result.name), "...\n"));
        return result.name;
      },
      (error) => {
        log("error : ", error);
      }
    );
}
// ----End of function myName----

// guessing
async function subGuess() {
  let guess = await inquirer
    .prompt({
      type: "number",
      name: "tukka",
      message: "Make another Guess =>  ",
      default: "0",
    })
    .then((result) => {
      num1 = result.tukka;
    });
  return ifChecking();
}

async function ifChecking() {
  const spinner = createSpinner("Checking answer...\n").start();
  await sleep();

  if (num1 >= 0 && num1 < 10) {
    if (num1 == magicNum) {
      spinner.success({
        text: chalk.blue(`Hurrah, You have guessed the number`),
      });
    } else if (magicNum <= 5) {
      spinner.error({
        text: chalk.green(
          `Your guess is not correct. `+ chalk.blueBright("Hint!") +` Try something between 1 - 5`
        ),
      });
      subGuess();
    } else {
      spinner.error({
        text: chalk.green(
          `Your guess is not correct. `+ chalk.blueBright("Hint!") +` Try something between 6 - 10`
        ),
      });
      subGuess();
    }
  } else {
    console.log(num1);
    console.log(magicNum);
    spinner.error({
      text: chalk.green(`Wrong input`),
    });
    subGuess();
  }
}

// ----- Guess the num -----
async function makingGuess() {
  let guess = await inquirer
    .prompt({
      type: "number",
      name: "tukka",
      message: "Guess the number between 1 to 10 =>  ",
      default: "0",
    })
    .then((result) => {
      num1 = result.tukka;
    });

  await ifChecking();
}

guessNumber();
