/**
 * The simplest way to create a custom object is to create a new instance of Object
 * and add properties and methods to it, as in this example.
 */

let person = new Object();
person.name = "Nicole";
person.age = 29;
person.job = "Engineer";
person.sayName = function() {
  console.log("Hello " + this.name);
};

person.sayName();

/**
 * Early JS developers used this pattern frequently to create new objects.
 * There was an obvious downside to this approach: creating multiple objects
 * with the same interface requires a lot of code duplication.
 * To solve this problem, developers began using a variation of the factory pattern.
 */

/**
 * The factory pattern is a well-known design pattern used in software engineering
 * to abstract away the process of creating specific objects.
 * With no way to define classes in ECMAScript, developers created functions
 * to encapsulate the creation of objects with specific interfaces.
 */
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log("Hello " + this.name);
  };
  return o;
}

let person1 = createPerson("Jason", 29, "Engineer");
let person2 = createPerson("Mike", 32, "Doctor");
person1.sayName();
person2.sayName();

/**
 * Factory pattern solves the problem of creating multiple similar objects
 * but didn't address the issue of object identification
 * (what type of object an object is)
 */

/**
 * Constructor pattern
 * There are native constructors, such as Object and Array,
 * it is also possible to define custome constructors that define properties and methods
 * for your own type of object.
 */
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log("Hello " + this.name);
  };
}
let person3 = new Person("Judy", 20, "Accountant");
person3.sayName(); // Hello Judy
console.log(person3 instanceof Object); // true
console.log(person3 instanceof Person); // true

Person("John", 27, "Teacher");
// PAY ATTENTION: called as a function without new operator,
// the methods and properties get added to the global object
global.sayName();

// call in the scope of another object
var o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName(); // Hello Kristen

/**
 * The major downside to constructors is that methods are created once for each instance
 * To solve this, move the function definition outside of the constructors as follows
 */
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = sayName;
}
function sayName() {
  console.log("Hello " + this.name);
}
let person4 = new Person("Dan", 30, "Driver");
person4.sayName(); // Hello Dan
