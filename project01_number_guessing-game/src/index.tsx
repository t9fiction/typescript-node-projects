#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import chalkAnimation from "chalk-animation";

let magicNum = Math.floor(Math.random()*100)

const log = console.log;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function gussNum() {
    console.clear();
    log("\n");
    log(chalk.bgGreen("Calculator by Sohail Ishaque : PIAIC105167"));
    log("\n");

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

}

console.log(magicNum)