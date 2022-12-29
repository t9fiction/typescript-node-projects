export class Person {
    name: string;
    age: number;
    // gender: male || female ;
  
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  
    getName() {
      return this.name;
    }
  }
  