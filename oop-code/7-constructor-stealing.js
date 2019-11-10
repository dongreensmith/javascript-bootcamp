/**
 * Constructor stealing is used to solve the inheritance problem with reference values on prototypes
 * The idea is to call the supertype constructor from within the subtype constructor
 */
function SuperType() {
  this.colors = ["red", "blue", "green"];
}

function SubType() {
  // inherit from SuperType
  SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push("blcak");
console.log(instance1.colors); // [ 'red', 'blue', 'green', 'blcak' ]

var instance2 = new SubType();
console.log(instance2.colors); // [ 'red', 'blue', 'green' ]

/**
 * Another advantage of constructor stealing is its ability to pass arguments
 * into supertype constructor from within the subtype constructor
 */
function SuperPerson(name) {
  this.name = name;
}

function SubPerson() {
  SuperPerson.call(this, "Nicole"); // bind 'this' to current object - SubPerson
  this.age = 29;
}

var person = new SubPerson();
console.log(person.name); // Nicole
console.log(person.age); // 29

/**
 * Combination inheritance：Combine prototype chaining and constructor stealing
 * To use prototype chaining to inherit properties and methods on the prototype
 * and to use constructor stealing to inherit instance properties
 */
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
  console.log("Hello, " + this.name);
};

function SubType(name, age) {
  // inherit properties
  SuperType.call(this, name);
  this.age = age;
}

// inherit methods
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function() {
  console.log("I'm " + this.age + " years old.");
};

var instance1 = new SubType("Nicole", 29);
instance1.colors.push("black");
console.log(instance1.colors); // 'red', 'blue', 'green', 'black
instance1.sayName();
instance1.sayAge();

var instance2 = new SubType("Greg", 27);
console.log(instance2.colors); // 'red', 'blue', 'green'
instance2.sayName();
instance2.sayAge();

/**
 * Combination inheritance is the most frequently used inheritance pattern in JS.
 */
