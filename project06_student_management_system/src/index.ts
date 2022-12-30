import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";

import { Student } from "./classes/student.js";
import { Instructor } from "./classes/instructor.js";
import { Course } from "./classes/courses.js";
import { Department } from "./classes/department.js";

//___________________________________________________________________________

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
let isLoggedIn = false;
const spinner = createSpinner("Checking answer...\n");
//___________________________________________________________________________
//login credentials / Database
const admin_branch = [
  {
    userName: "admin",
    password: "admin",
    status: "Active",
  },
];
const students_logins = [
  {
    userName: "student",
    password: "student",
    status: "Active",
  },
];
const teachers_logins = [
  {
    userName: "teacher",
    password: "teacher",
    status: "Active",
  },
];

//___________________________________________________________________________
// ---- Rainbow Effect ----
async function welcome() {
  console.clear();
  console.log("\n");

  let rainbow = chalkAnimation.rainbow(
    `\t\t******************************\n
     \t\t*     UNIVERSITY  PORTAL     *\n 
     \t\t*       Sohail Ishaque       *\n
     \t\t*         PIAIC105167        *\n
     \t\t******************************\n`
  );

  rainbow.start(); // Animation resumes
  await sleep();
  console.log("\n");
}

//___________________________________________________________________________
//Sub user
const anotherAction = async () => {
  console.log("\n")
  await inquirer
    .prompt({
      type: "list",
      name: "anotheraction",
      message: "Do you perform another Action ?",
      choices: ["Yes", "No"],
    })
    .then(async (result) => {
      if (result.anotheraction === "Yes") {
      } else {
        // break;
      }
    });
};

//___________________________________________________________________________
//Sub user
const subCreation = async () => {
  const tx = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: chalk.green("Create an ID : "),
      validate: (id) => {
        // if (isNaN(id) || input === "") {
        if (id === "") {
          return "Not a valid ID";
        }
        // if (id == admin_branch) {
        //     return "b";
        // }
        return true;
      },
      // default: "User",
    },
    {
      name: "password",
      type: "password",
      mask: true,
      message: chalk.green("Set a password"),
      validate: (pass) => {
        if (pass === "") {
          return "Password cannot be empty";
        }
        return true;
      },
    },
    {
      name: "status",
      type: "list",
      choices: ["Active", "Inactive"],
      message: chalk.green("Set the status"),
    },
  ]);
  return { tx };
};

//___________________________________________________________________________
//Creating a new user
const createLogin = async () => {
  await inquirer
    .prompt({
      type: "list",
      name: "loginfor",
      message: chalk.greenBright("Register "),
      choices: ["student", "teacher", "admin"],
    })
    .then(async (result) => {
      const { tx } = await subCreation();
      if (result.loginfor === "student") {
        students_logins.push({
          userName: tx.id,
          password: tx.password,
          status: tx.status,
        });
        spinner.success({
          text: chalk.green(`> New Student login has been created`),
        });
        await anotherAction();
      } else if (result.loginfor === "teacher") {
        teachers_logins.push({
          userName: tx.id,
          password: tx.password,
          status: tx.status,
        });
        spinner.success({
          text: chalk.green(`> New Teacher login has been created`),
        });
        await anotherAction();
      } else {
        admin_branch.push({
          userName: tx.id,
          password: tx.password,
          status: tx.status,
        });
        spinner.success({
          text: chalk.green(`> New Admin has been created`),
        });
        await anotherAction();
      }
      operation();
    });
};

//___________________________________________________________________________
//Sub Login function
const subLogin = async () => {
  const tx = await inquirer.prompt([
    {
      name: "userName",
      type: "input",
      message: chalk.green("Enter User name"),
      validate: (id) => {
        if (id === "") {
          return "Not a valid ID";
        }
        return true;
      },
    },
    {
      name: "password",
      type: "password",
      mask: true,
      message: chalk.green("Enter Password"),
      validate: (pass) => {
        if (pass === "") {
          return "Password cannot be empty";
        }
        return true;
      },
    },
  ]);

  return { tx };
};

//___________________________________________________________________________
//Login function
const login = async () => {
  await inquirer
    .prompt({
      type: "list",
      name: "loginfor",
      message: chalk.greenBright("Login as a  ?"),
      choices: ["student", "teacher", "admin"],
    })
    .then(async (result) => {
      const { tx } = await subLogin();
      if (result.loginfor === "student") {
        students_logins.find(
          (obj) => obj.userName === tx.userName && obj.password === tx.password
        )
          ? spinner.success({
              text: chalk.green(`> Logged in Successfully`),
            })
          : spinner.error({
              text: chalk.green("> Incorrect username or password"),
            });
      } else if (result.loginfor === "teacher") {
        teachers_logins.find(
          (obj) => obj.userName === tx.userName && obj.password === tx.password
        )
          ? spinner.success({
              text: chalk.green(`> Logged in Successfully`),
            })
          : spinner.error({
              text: chalk.green("> Incorrect username or password"),
            });
      } else {
        admin_branch.find(
          (obj) => obj.userName === tx.userName && obj.password === tx.password
        )
          ? spinner.success({
              text: chalk.green(`> Logged in Successfully`),
            })
          : spinner.error({
              text: chalk.green("> Incorrect username or password"),
            });
      }
    });
};

//___________________________________________________________________________
// Operation Function
async function operation() {
  await inquirer
    .prompt({
      type: "list",
      name: "operation",
      message: chalk.greenBright("Register(only for Admins) or Login"),
      choices: ["Login", "Register"],
    })
    .then(async (result) => {
      let answer = 0;
      spinner.start();
      await sleep();
      if (result.operation === "Login") {
        spinner.stop()
        await login();
      } else {
        spinner.stop()
        await createLogin();
      }
    });
}

//___________________________________________________________________________
// Main function
async function app() {
  await welcome();
  await operation();
}

//___________________________________________________________________________
const bcc = new Course("BCC", "Blockchain");
const mtv = new Course("MTV", "Metaverse");

const instructor1 = new Instructor("Sir Zia", 50, 800000);
const instructor2 = new Instructor("Sir Imran", 30, 500000);

const student1 = new Student("Sohail", 39);
const student2 = new Student("Nawaz", 36);

const IT_dept = new Department("IT");

instructor1.assignCourse(bcc);
instructor1.assignCourse(mtv);
instructor2.assignCourse(bcc);

bcc.addStudent(student1);
bcc.addStudent(student2);
bcc.setInstructor(instructor1);

student1.registerForCourse(bcc);
student1.registerForCourse(mtv);
student2.registerForCourse(mtv);

IT_dept.addCourse(bcc);

// console.log(
//   "----------------------------------------------------------------------"
// );
// console.log(student1);
// console.log(
//   "----------------------------------------------------------------------"
// );
// console.log(student2);
// console.log(
//   "----------------------------------------------------------------------"
// );
// console.log(instructor1);
// console.log(
//   "----------------------------------------------------------------------"
// );
// console.log(instructor2);
// console.log(
//   "----------------------------------------------------------------------"
// );
// console.log(bcc);
// console.log(
//   "----------------------------------------------------------------------"
// );
// console.log(mtv);
// console.log(
//   "----------------------------------------------------------------------"
// );
// console.log(
//   "----------------------------------------------------------------------"
// );
app();
// subLogin()
// createLogin()
