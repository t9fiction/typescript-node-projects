export class Department {
    name;
    course = [];
    // course:Course[] = []
    constructor(name) {
        this.name = name;
    }
    addCourse(course) {
        this.course.push(course.name);
    }
}
