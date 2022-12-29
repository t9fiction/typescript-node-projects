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
import chalkAnimation from "chalk-animation";
import fs from "fs";
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
// ---- Rainbow Effect ----
function welcome() {
    return __awaiter(this, void 0, void 0, function* () {
        let rainbow = chalkAnimation.rainbow(`\t\t********************\n
     \t\t*     ATM Bank     *\n 
     \t\t*  Sohail Ishaque  *\n
     \t\t*   PIAIC105167    *\n
     \t\t********************`);
        rainbow.start(); // Animation resumes
        yield sleep();
        console.log("\n");
    });
}
let isLoggedIn = false;
let quit = false;
const account = {
    balance: 1000000,
    transactionCount: 0,
    userName: "",
    password: "",
};
const setUsernamePassword = () => __awaiter(void 0, void 0, void 0, function* () {
    const details = yield inquirer.prompt([
        {
            name: "userName",
            type: "input",
            message: "Set a username",
        },
        {
            name: "password",
            type: "password",
            mask: true,
            message: "Set a password",
        },
    ]);
    account.userName = details.userName;
    account.password = details.password;
});
const login = () => __awaiter(void 0, void 0, void 0, function* () {
    const tx = yield inquirer.prompt([
        {
            name: "userName",
            type: "input",
            message: "Enter User name",
        },
        {
            name: "password",
            type: "input",
            message: "Enter Password",
        },
    ]);
    if (tx.userName === account.userName && tx.password === account.password) {
        isLoggedIn = true;
        console.log("Logged in Successfully");
    }
    else {
        console.log("Incorrect username or password");
    }
});
const accounts = {
    "ABL": ["Zia", "Zeeshan"],
    "HBL": ["Ali", "Umar", "Zeeshan"],
    "IPL": ["Ali", "Zia", "Zeeshan"],
};
const options = () => __awaiter(void 0, void 0, void 0, function* () {
    const tx = yield inquirer.prompt([
        {
            name: "transaction",
            type: "list",
            choices: ["Transfer", "quit"],
            message: "Choose a transaction type"
        }
    ]);
    switch (tx.transaction) {
        case "Transfer":
            const bank = yield inquirer.prompt([
                {
                    name: "bank",
                    type: "list",
                    choices: ["ABL", "HBL", "IPL"],
                    message: "Choose a bank to transfer",
                },
            ]);
            const transfer = yield inquirer.prompt([
                {
                    name: "transfer",
                    type: "list",
                    choices: accounts[bank.bank],
                    message: "Choose an account"
                },
            ]);
            // console.log("transfer: ", tx2.transfer)
            console.log("Your Balance: ", account.balance + " Rs");
            const amount = yield inquirer.prompt([
                {
                    name: "amount",
                    type: "input",
                    message: "Enter an amount",
                    validate: (input) => {
                        if (isNaN(input) || input === "") {
                            return "Please enter a number";
                        }
                        if (Number(input) > account.balance) {
                            return "Insiffucient Balance";
                        }
                        return true;
                    }
                },
            ]);
            console.log("amount: ", amount.amount);
            account.balance -= Number(amount.amount);
            account.transactionCount++;
            console.log("Transaction completed");
            break;
        case "quit":
            quit = true;
            break;
    }
});
//-----Asking for user Name function-----
// async function inputNewUser() {
//   let userID = await inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "id",
//         message: chalk.whiteBright("Create a User ID : "),
//         validate: function (input) {
//           if (input == "") {
//             return "ID can't be empty";
//           } else {
//             return true;
//           }
//         },
//         // default: "User",
//       },
//       {
//         type: "password",
//         name: "password",
//         message: chalk.whiteBright("Create a Password : "),
//         mask: true,
//         validate: function (input) {
//           if (input == "") {
//             return "Password can't be empty";
//           } else {
//             return true;
//           }
//         },
//       },
//     ])
//     .then(
//       async (result) => {
//         console.log(
//           chalk.red(
//             "\n Hello ",
//             chalk.blue(result.id) + " Welcome to the Online Banking App",
//             "...\n"
//           )
//         );
//         // const id = result.id;
//         // const password = result.password;
//         // parse json
//         let logStream = await fs.createWriteStream("users.json", {
//           flags: "a",
//         });
//         // use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
//         logStream.write(",");
//         var jsonObj = JSON.parse(
//           `{ "id": ${result.id}, "password": ${result.password} }`
//         );
//         console.log(jsonObj);
//         // readFile({ id: "result.id", password: "result.password" });
//         var jsonContent = JSON.stringify(jsonObj);
//         console.log(jsonContent);
//         fs.appendFile(
//           "users.json",
//           jsonContent + os.EOL,
//           "utf8",
//           function (err) {
//             if (err) {
//               console.log(
//                 "An error occured while writing JSON Object to File."
//               );
//               return console.log(err);
//             }
//           }
//         );
//       },
//       (error) => {
//         console.log("error : ", error);
//       }
//     );
// }
// ----End of function myName----
// async function ifChecking() {
//   const spinner = createSpinner("Checking answer...\n").start();
//   await sleep();
//   if (num1 >= 0 && num1 <= 10) {
//     if (num1 == magicNum) {
//       spinner.success({
//         text: chalk.blue(`Hurrah, You have guessed the number`),
//       });
//     } else if (magicNum <= 5) {
//       spinner.error({
//         text: chalk.green(
//           `Your guess is not correct. `+ chalk.blueBright("Hint!") +` Try something between 1 - 5`
//         ),
//       });
//       subGuess();
//     } else {
//       spinner.error({
//         text: chalk.green(
//           `Your guess is not correct. `+ chalk.blueBright("Hint!") +` Try something between 6 - 10`
//         ),
//       });
//       subGuess();
//     }
//   } else {
//     console.log(num1);
//     console.log(magicNum);
//     spinner.error({
//       text: chalk.green(`Wrong input`),
//     });
//     subGuess();
//   }
// }
//Reading the File
const readFile = (result) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        fs.appendFile("users.txt", result, function (err) {
            if (err) {
                // append failed
            }
            else {
                // done
            }
        });
        // const banks = fs.readFile("banks", (err, result) => {
        //   if (err) {
        //     console.log("error", err);
        //   } else {
        //     console.log(result);
        //     return result;
        //   }
        // });
    }
    catch (error) {
        console.log(error);
    }
});
// // ----- Guess the num -----
function newUserCheck() {
    return __awaiter(this, void 0, void 0, function* () {
        let guess = yield inquirer
            .prompt({
            type: "checkbox",
            name: "newuser",
            message: "Are you a new user ?",
            choices: ["Yes", "No"],
        })
            .then((result) => __awaiter(this, void 0, void 0, function* () {
            if (result.newuser === "Yes") {
                return setUsernamePassword();
            }
            // readFile(result.newuser);
        }));
    });
}
//---- Start of  Main Function ----
function mainFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        console.log("\n");
        // console.log("\n");
        // console.log(magicNum);
        yield welcome();
        // await inputNewUser();
        yield newUserCheck();
        yield login();
        // await makingGuess();
    });
}
//---- End of guessNumber ----
mainFunction();
