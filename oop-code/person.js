const Person = function(firstName, lastName, age, likes = []) { // Initially didn't provide any arguments 
  // Initially didn't fill anything in the function body
  // console.log(this); // 'this' refers to the person object
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.likes = likes;
}
Person.prototype.getBio = function() {
  let bio = `${this.firstName} ${this.lastName} is ${this.age} years old. `;
  this.likes.forEach((like) => {
    bio += `${this.firstName} likes ${like}. `; // Understand why here 'this' can be accessed.
  });
  return bio;
}
Person.prototype.setName = function(fullName) {
  const names = fullName.split(' ');
  this.firstName = names[0];
  this.lastName = names[1];
}
/**
 * prototype is an object. 
 * With prototype, we put everything we want to share with the instances of the constructor function
 */

// const tmp_p = Person(); // undefined
// const p = new Person();  // person {}
/** Use it as a constructor function
 * Notice the difference between the two examples.
 * the 'new' keyword generates a new empty object for this new instance 
 * then it gives us access to that empty object in the constructor function via the 'this' value
*/
let person1 = new Person('Jane', 'Alica', 39, ['cooking', 'swimming', 'writing']);
console.log(person1); 
let person2 = new Person('Jack', 'Turner', 28);
console.log(person2);

console.log(person1.getBio()); 
console.log(person2.getBio());

person1.setName('Fan Yang');
console.log(person1.getBio());

console.log(person1.getBio === Person.prototype.getBio);  // true

////////////////////////////////////////////////////////
class CPerson { // ES6 class definition
  constructor(firstName, lastName, age, likes) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.likes = likes;
  }

  getBio() {
    let bio = `${this.firstName} ${this.lastName} is ${this.age} years old. `;
    this.likes.forEach((like) => {
      bio += `${this.firstName} likes ${like}. `; // Understand why here 'this' can be accessed.
    });
    return bio;
  }

  setName(fullName) {
    const names = fullName.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}
let person3 = new CPerson('John', 'Jackson', 23, ['riding', 'cooking']);
console.log(person3);
console.log(person3.getBio());
person3.setName('David Beckham');
console.log(person3.getBio());

class Employee extends CPerson { // Create a subclass of CPerson
  constructor(firstName, lastName, age, position, likes) {
    super(firstName, lastName, age, likes); // Call the constructor of the parent class
    this.position = position; // Assign a value to the property which is unique in this class
  }

  getBio() {  // Override the setBio() method of the parent class
    let bio = `${this.firstName} ${this.lastName} is ${this.age} years old.`;
    bio += `He works as a ${this.position}. `;
    this.likes.forEach((like) => {
      bio += `${this.firstName} likes ${like}. `; // Understand why here 'this' can be accessed.
    });
    return bio;
  }

  getYearsLeft(yearsToRetire) {
    return yearsToRetire - this.age;
  }
}
let employee = new Employee('Sue', 'Mason', 28, 'manager', ['riding', 'cooking']);
console.log(employee);
console.log(employee.getBio());
console.log(employee.getYearsLeft(60));
