import { Course } from "./courses.js";
import { Person } from "./person.js";

let rollNumber:number = 0;

export class Student extends Person {
  rollNo: number;
  courses: string[]=[];

  constructor(name: string, age: number) {
    rollNumber ++ ;
    super(name, age);
    this.rollNo = rollNumber;
  }

  registerForCourse(course:Course){
    this.courses.push(course.name);
    course.addStudent_this(this);
  }
}
