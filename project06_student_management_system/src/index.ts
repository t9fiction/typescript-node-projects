import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";

import { Student } from "./classes/student.js";
import { Instructor } from "./classes/instructor.js";
import { Course } from "./classes/courses.js";
import { Department } from "./classes/department.js";

const log = console.log;
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

// Main function
async function app() {
  console.clear();
  console.log("\n");
  // log(chalkAnimation.radar("Calculator by Sohail Ishaque : PIAIC105167"));
  log(chalk.bgGreen("University Portal by Sohail Ishaque : PIAIC105167"));
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

    async function operation() {
      await inquirer
      .prompt({
        type: "list",
        name: "role",
        message: chalk.greenBright("Select your Role"),
        choices: [
          "Student",
          "Teacher",
          "Admin",
        ],
      }).then(async (result) => {
        let answer = 0;

        const spinner = createSpinner("Checking answer...\n").start();
        await sleep();

        if (result.role === "Student") {
          spinner.success({
            text: chalk.green(`> ${result.role} of the given numbers = `)+` ${answer}`,
          });
        } else if (result.role === "Teacher") {
          spinner.success({
            text: chalk.green(`> ${result.role} of the given numbers =`)+` ${answer}`,
          });
        } else if (result.role === "Admin") {
          spinner.success({
            text: chalk.green(`> ${result.role} of second number from first =`)+` ${answer}`,
          });
        } else{
          spinner.success({
            text: chalk.green(`> of second number from first =`),
          });
        }
      });
    }

    operation()
}

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

console.log(
  "----------------------------------------------------------------------"
);
console.log(student1);
console.log(
  "----------------------------------------------------------------------"
);
console.log(student2);
console.log(
  "----------------------------------------------------------------------"
);
console.log(instructor1);
console.log(
  "----------------------------------------------------------------------"
);
console.log(instructor2);
console.log(
  "----------------------------------------------------------------------"
);
console.log(bcc);
console.log(
  "----------------------------------------------------------------------"
);
console.log(mtv);
console.log(
  "----------------------------------------------------------------------"
);
console.log(
  "----------------------------------------------------------------------"
);
app();