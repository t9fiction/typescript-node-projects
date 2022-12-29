import { Person } from "./person.js";
let rollNumber = 0;
export class Student extends Person {
    rollNo;
    courses = [];
    constructor(name, age) {
        rollNumber++;
        super(name, age);
        this.rollNo = rollNumber;
    }
    registerForCourse(course) {
        this.courses.push(course.name);
        course.addStudent_this(this);
    }
}
