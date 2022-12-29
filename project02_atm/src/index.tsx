#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import chalkAnimation from "chalk-animation";
import fs from "fs";
import os from "os";

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

// ---- Rainbow Effect ----
async function welcome() {
  let rainbow = chalkAnimation.rainbow(
    `\t\t********************\n
     \t\t*     ATM Bank     *\n 
     \t\t*  Sohail Ishaque  *\n
     \t\t*   PIAIC105167    *\n
     \t\t********************`
  );

  rainbow.start(); // Animation resumes
  await sleep();
  console.log("\n");
}

let isLoggedIn = false;
let quit = false;
const account = {
  balance: 1000000,
  transactionCount: 0,
  userName: "",
  password: "",
};

const setUsernamePassword = async () => {
  const details = await inquirer.prompt([
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
};

const login = async () => {
  const tx = await inquirer.prompt([
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

};

const accounts = {
  "ABL": ["Zia", "Zeeshan"],
  "HBL": ["Ali", "Umar", "Zeeshan"],
  "IPL": ["Ali", "Zia", "Zeeshan"],
}

const options = async () => {

  const tx = await inquirer.prompt([
      {
          name: "transaction",
          type: "list",
          choices: ["Transfer", "quit"],
          message: "Choose a transaction type"
      }
  ]);

  switch(tx.transaction){
      case "Transfer":
          const bank = await inquirer.prompt([
              {
                  name: "bank",
                  type: "list",
                  choices: ["ABL", "HBL", "IPL"],
                  message: "Choose a bank to transfer",
              },
          ]);
          const transfer = await inquirer.prompt([
              {
                  name: "transfer",
                  type: "list",
                  choices: accounts[bank.bank as "ABL"|"HBL"|"IPL"],
                  message: "Choose an account"
                  },
          ]);
          // console.log("transfer: ", tx2.transfer)
          console.log("Your Balance: ", account.balance + " Rs");
          const amount = await inquirer.prompt([
              {
                  name: "amount",
                  type: "input",
                  message: "Enter an amount",
                  validate: (input) => {
                      if (isNaN(input) || input === "") {
                          return "Please enter a number"
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


}

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
const readFile = async (result: any) => {
  try {
    fs.appendFile("users.txt", result, function (err) {
      if (err) {
        // append failed
      } else {
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
  } catch (error) {
    console.log(error);
  }
};
// // ----- Guess the num -----
async function newUserCheck() {
  let guess = await inquirer
    .prompt({
      type: "checkbox",
      name: "newuser",
      message: "Are you a new user ?",
      choices: ["Yes", "No"],
    })
    .then(async(result) => {
      if (result.newuser === "Yes") {
        return setUsernamePassword();
      } 
        // readFile(result.newuser);
    });
}

//---- Start of  Main Function ----
async function mainFunction() {
  console.clear();
  console.log("\n");
  // console.log("\n");

  // console.log(magicNum);
  await welcome();
  // await inputNewUser();
  await newUserCheck();
  await login()
  // await makingGuess();
}
//---- End of guessNumber ----

mainFunction();
