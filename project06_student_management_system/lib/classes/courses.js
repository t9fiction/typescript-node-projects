// let courseId = 0
export class Course {
    courseId;
    name;
    students = [];
    instructor = [];
    // instructor!:string[]; // "!" tells that it will be defined later
    constructor(id, name) {
        this.courseId = id;
        this.name = name;
    }
    addStudent(student) {
        // this.students.push(student.name);
        student.registerForCourse(this);
    }
    addStudent_this(student) {
        this.students.push(student.name);
    }
    setInstructor(instructor) {
        // this.instructor.push(instructor.name)
        instructor.assignCourse(this);
    }
    setInstructor_this(instructor) {
        this.instructor.push(instructor.name);
    }
}
