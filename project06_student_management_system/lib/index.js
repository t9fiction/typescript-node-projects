import inquirer from "inquirer";
import chalk from "chalk";
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
//Creating a new user
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
            choices: ["Active", "Inactive", "Blocked"],
            message: chalk.green("Set the status"),
        },
    ]);
    return { tx };
};
//___________________________________________________________________________
//Login function
const login = async () => {
    const tx = await inquirer.prompt([
        {
            name: "userName",
            type: "input",
            message: chalk.green("Enter User name"),
        },
        {
            name: "password",
            type: "input",
            message: chalk.green("Enter Password"),
        },
    ]);
    if (admin_branch.find((obj) => obj.userName === tx.userName && obj.password === tx.password)) {
        isLoggedIn = true;
        spinner.success({
            text: chalk.green(`> Logged in Successfully`),
        });
    }
    else {
        spinner.error({
            text: chalk.green("> Incorrect username or password"),
        });
    }
};
//___________________________________________________________________________
//Sub Login function
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
        console.log(result);
        if (result.loginfor === "student") {
            students_logins.push({
                userName: tx.id,
                password: tx.password,
                status: tx.status,
            });
            console.log(students_logins);
        }
        else if (result.loginfor === "teacher") {
            teachers_logins.push({
                userName: tx.id,
                password: tx.password,
                status: tx.status,
            });
            console.log(teachers_logins);
        }
        else {
            admin_branch.push({
                userName: tx.id,
                password: tx.password,
                status: tx.status,
            });
            console.log(admin_branch);
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
        message: chalk.greenBright("Login or Register(only for Admins)"),
        choices: ["Login", "Register"],
    })
        .then(async (result) => {
        let answer = 0;
        spinner.start();
        await sleep();
        if (result.operation === "Login") {
            spinner.success({
                text: chalk.green(`> ${result.role} of the given numbers = `) +
                    ` ${answer}`,
            });
        }
        else {
            spinner.success({
                text: chalk.green(`> Welcome to Administration Portal`),
            });
            await createLogin();
        }
    });
}
//___________________________________________________________________________
// Main function
async function app() {
    console.clear();
    console.log("\n");
    // log(chalkAnimation.radar("Calculator by Sohail Ishaque : PIAIC105167"));
    console.log(chalk.bgGreen("University Portal by Sohail Ishaque : PIAIC105167"));
    console.log("\n");
    operation();
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
