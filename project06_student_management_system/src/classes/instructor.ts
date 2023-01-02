import { Course } from "./courses.js";
import { Person } from "./person.js";

export class Instructor extends Person {
  salary: number;
  // private salary: number;
  courses: string[] = [];

  constructor(name:string, age:number,salary:number) {
    super(name,age);
    this.salary = salary;
  }

  assignCourse(course: Course) {
    this.courses.push(course.name);
    course.setInstructor_this(this)
  }
}
