import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import { Student } from "./classes/student.js";
import { Instructor } from "./classes/instructor.js";
import { Course } from "./classes/courses.js";
import { Department } from "./classes/department.js";
//___________________________________________________________________________
const sleep = (ms = 500) => new Promise((r) => setTimeout(r, ms));
let isLoggedIn = false;
const spinner = createSpinner("Checking answer...\n");
// let currentUser: any = "";
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
//___________________________________________________________________________
//login credentials / Database
const admin_branch = [
    {
        userName: "admin",
        password: "admin",
        status: "Active",
    },
];
const student = new Student('student1', 24);
const student_dashboard = [student];
const students_logins = [
    {
        userName: "student",
        password: "student",
        status: "Active",
    },
];
const instruct1 = new Instructor("instructor1", 50, 1000000);
const teachers_dashboard = [instruct1];
const teachers_logins = [
    {
        userName: "instructor1",
        password: "instructor1",
        status: "Active",
    },
];
//___________________________________________________________________________
// ---- Rainbow Effect ----
async function welcome() {
    console.clear();
    console.log("\n");
    let rainbow = chalkAnimation.rainbow(`\t\t******************************\n
     \t\t*     UNIVERSITY  PORTAL     *\n 
     \t\t*       Sohail Ishaque       *\n
     \t\t*         PIAIC105167        *\n
     \t\t******************************\n`);
    rainbow.start(); // Animation resumes
    await sleep();
    console.log("\n");
}
//___________________________________________________________________________
//Sub user
const anotherAction = async () => {
    console.log("\n");
    await inquirer
        .prompt({
        type: "list",
        name: "anotheraction",
        message: "Do you perform another Action ?",
        choices: ["Yes", "No"],
    })
        .then(async (result) => {
        if (result.anotheraction === "Yes") {
        }
        else {
            console.log("------------------ Thanks ------------------");
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
        message: chalk.greenBright("Registration of "),
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
        }
        else if (result.loginfor === "teacher") {
            teachers_logins.push({
                userName: tx.id,
                password: tx.password,
                status: tx.status,
            });
            const txsub = await inquirer.prompt([
                {
                    name: "salary",
                    type: "input",
                    message: chalk.green("Enter Salary of the new instructor"),
                    validate: (id) => {
                        if (isNaN(id)) {
                            return "Salary not valid";
                        }
                        return true;
                    },
                },
                {
                    name: "age",
                    type: "input",
                    message: chalk.green("Enter Age of the instructor"),
                    validate: (pass) => {
                        if (isNaN(pass)) {
                            return "Wrong age";
                        }
                        return true;
                    },
                },
            ]);
            // Creating the class of the instructor
            const instruct1 = new Instructor(tx.id, txsub.age, txsub.salary);
            // console.log(instruct1)
            teachers_dashboard.push(instruct1);
            // const instructor = new Instructor(tx.id, txsub.age, txsub.salary);
            // console.log(teachers_dashboard);
            spinner.success({
                text: chalk.green(`> New Teacher login has been created`),
            });
            await anotherAction();
        }
        else {
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
        spinner.start();
        await sleep();
        if (result.loginfor === "student") {
            if (students_logins.find((obj) => obj.userName === tx.userName && obj.password === tx.password)) {
                spinner.success({
                    text: chalk.green(`> Logged in Successfully`),
                });
                // currentUser = tx;
            }
            else {
                spinner.error({
                    text: chalk.green("> Incorrect username or password"),
                });
            }
        }
        else if (result.loginfor === "teacher") {
            if (teachers_logins.find((obj) => obj.userName === tx.userName && obj.password === tx.password)) {
                spinner.success({
                    text: chalk.green(`> Logged in Successfully`),
                });
                // currentUser = tx;
                await instructorPortal(tx);
            }
            else {
                spinner.error({
                    text: chalk.green("> Incorrect username or password"),
                });
            }
        }
        else {
            if (admin_branch.find((obj) => obj.userName === tx.userName && obj.password === tx.password)) {
                spinner.success({
                    text: chalk.green(`> Logged in Successfully`),
                });
            }
            else {
                spinner.error({
                    text: chalk.green("> Incorrect username or password"),
                });
            }
        }
    });
};
//___________________________________________________________________________
//Dashboard
const courseInstructor = async () => {
    console.log("\n");
    const txsub = await inquirer.prompt([
        {
            name: "course",
            type: "list",
            message: chalk.green("Instructor's Portal"),
            choices: ["View your Subjects", "View Salary", "Add another Subject", "Exit"],
        },
    ]);
    return { txsub };
};
//___________________________________________________________________________
//Instructor Portal
const instructorPortal = async (tx) => {
    const { txsub } = await courseInstructor();
    let currentTeacher;
    currentTeacher = teachers_dashboard.find((obj) => {
        tx.userName == obj.name;
        return obj;
    });
    // console.log(currentUser);
    async function dashbaord() {
        if (txsub.course === "View your Subjects") {
            console.log(currentTeacher.courses);
        }
        else if (txsub.course === "View Salary") {
            console.log(currentTeacher.salary);
        }
        else if (txsub.course === "Add another Subject") {
            // currentUser.assignCourse(bcc);
        }
        else {
            //exit
        }
    }
    await dashbaord();
};
//___________________________________________________________________________
// Operation Function
async function operation() {
    await inquirer
        .prompt({
        type: "list",
        name: "operation",
        message: chalk.greenBright(" Login or Registration(only Admins are allowed to do Registration)"),
        choices: ["Login", "Registration"],
    })
        .then(async (result) => {
        let answer = 0;
        spinner.start();
        await sleep();
        if (result.operation === "Login") {
            spinner.stop();
            await login();
        }
        else {
            spinner.stop();
            await createLogin();
        }
    });
}
//___________________________________________________________________________
// Main function
async function app() {
    // await instructorPortal();
    await welcome();
    await login();
}
//___________________________________________________________________________
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
console.log(instructor1);
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
