import { Course } from "./courses.js";

export class Department{
    name: string;
    course:string[] = []
    // course:Course[] = []

    constructor(name:string){
        this.name = name;
    }

    addCourse(course:Course){
        this.course.push(course.name)
    }
}