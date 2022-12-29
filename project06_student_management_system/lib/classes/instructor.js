import { Person } from "./person.js";
export class Instructor extends Person {
    salary;
    courses = [];
    constructor(name, age, salary) {
        super(name, age);
        this.salary = salary;
    }
    assignCourse(course) {
        this.courses.push(course.name);
        course.setInstructor_this(this);
    }
}
