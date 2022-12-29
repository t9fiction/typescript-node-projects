export class Person {
    name;
    age;
    // gender: male || female ;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
}
