#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import chalkAnimation from "chalk-animation";
let magicNum = Math.floor(Math.random() * 10) + 1;
let num1 = 0;
const log = console.log;
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
//---- Start of  Main Function ----
function guessNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        log("\n");
        // log("\n");
        // console.log(magicNum);
        yield rainbowEffect();
        yield myName();
        yield makingGuess();
    });
}
//---- End of guessNumber ----
// ---- Rainbow Effect ----
function rainbowEffect() {
    return __awaiter(this, void 0, void 0, function* () {
        let rainbow = chalkAnimation.rainbow(`\t"Guessing the Number"\n 
    by Sohail Ishaque : PIAIC105167`);
        rainbow.start(); // Animation resumes
        yield sleep();
        // setTimeout(() => {
        //   rainbow.stop(); // Animation stops
        // }, 5000);
        // setTimeout(() => {
        // rainbow.start(); // Animation resumes
        // }, 200);
        log("\n");
    });
}
//-----Asking for user Name function-----
function myName() {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield inquirer
            .prompt([
            {
                type: "input",
                name: "name",
                message: chalk.green("What is your Name ?"),
                default: "User",
            },
        ])
            .then((result) => {
            log(chalk.bgCyan("\n Welcome ", chalk.red(result.name), "...\n"));
            return result.name;
        }, (error) => {
            log("error : ", error);
        });
    });
}
// ----End of function myName----
// guessing
function subGuess() {
    return __awaiter(this, void 0, void 0, function* () {
        let guess = yield inquirer
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
    });
}
function ifChecking() {
    return __awaiter(this, void 0, void 0, function* () {
        const spinner = createSpinner("Checking answer...\n").start();
        yield sleep();
        if (num1 >= 0 && num1 < 10) {
            if (num1 == magicNum) {
                spinner.success({
                    text: chalk.blue(`Hurrah, You have guessed the number`),
                });
            }
            else if (magicNum <= 5) {
                spinner.error({
                    text: chalk.green(`Your guess is not correct. ` + chalk.blueBright("Hint!") + ` Try something between 1 - 5`),
                });
                subGuess();
            }
            else {
                spinner.error({
                    text: chalk.green(`Your guess is not correct. ` + chalk.blueBright("Hint!") + ` Try something between 6 - 10`),
                });
                subGuess();
            }
        }
        else {
            console.log(num1);
            console.log(magicNum);
            spinner.error({
                text: chalk.green(`Wrong input`),
            });
            subGuess();
        }
    });
}
// ----- Guess the num -----
function makingGuess() {
    return __awaiter(this, void 0, void 0, function* () {
        let guess = yield inquirer
            .prompt({
            type: "number",
            name: "tukka",
            message: "Guess the number between 1 to 10 =>  ",
            default: "0",
        })
            .then((result) => {
            num1 = result.tukka;
        });
        yield ifChecking();
    });
}
guessNumber();
