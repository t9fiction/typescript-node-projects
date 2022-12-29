import { Instructor } from "./instructor.js";
import { Student } from "./student.js";

// let courseId = 0

export class Course{
    courseId: string;
    name: string;
    students:string[]=[];
    instructor:string[]=[]; 
    // instructor!:string[]; // "!" tells that it will be defined later

    constructor(id:string,name:string){
        this.courseId = id;
        this.name = name;
    }

    
    addStudent(student:Student){
        // this.students.push(student.name);
        student.registerForCourse(this)
    }

    addStudent_this(student:Student){
        this.students.push(student.name)
    }

    setInstructor(instructor:Instructor){
        // this.instructor.push(instructor.name)
        instructor.assignCourse(this)
    }

    setInstructor_this(instructor:Instructor){
        this.instructor.push(instructor.name)
    }
}