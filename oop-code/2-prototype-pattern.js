/**
 * Each function is created with a 'prototype' property, which is an object
 * containing properties and methods that should be available to instances of
 * a particular reference type. This object is literally a prototype for the object
 * to be created once the constructor is called.
 *
 * The benefit of using the prototype is that all of its properties and methods
 * are shared among object instances.
 *
 * Instead of assigning object information in the constructor,
 * they can be assigned directly to the prototype.
 */

function Person() {}

Person.prototype.name = "Nicole";
Person.prototype.age = 29;
Person.prototype.job = "Engineer";
Person.prototype.sayName = function() {
  console.log("Hello, " + this.name);
};

var person1 = new Person();
var person2 = new Person();
person1.sayName(); // Hello, Nicole
person2.sayName(); // Hello, Nicole
console.log(person1.sayName === person2.sayName); // true
// console.log(person1.name);

/**
 * Here, the properties and method are added directly to the prototype property of Person,
 * leaving the constructor empty.
 * Unlike constructor pattern, the properties and methods are all shared among instances.
 * So person1 and person2 are both accessing the same set of properties and same function.
 */

/**
 * If you add a property to an instance that has the same name as a property on the prototype,
 * you create the property on the instance, which then masks the property on the prototype.
 * Once a property is added to the object instance, it shadows any properties of the same name
 * on the prototype, which means that it simply blocks access to the property on the prototype
 * without altering it.
 */
person1.name = "Greg";
console.log(person1.name); // "Greg" - from instance
console.log(person2.name); // "Nicole" - from prototype

/**
 * The 'delete' operator, however, completely removes the instance property and
 * allows the prototype property to be accessed again.
 */
delete person1.name;
console.log(person1.name); // "Nicole" - from prototype again.

/**
 * hasOwnProperty() method returns true only if the property exists
 * on the object instance, not prototype
 */
console.log(person1.hasOwnProperty("name")); // false
person1.name = "Greg";
console.log(person1.hasOwnProperty("name")); // true
delete person1.name;
console.log(person1.hasOwnProperty("name")); // false

/**
 * in operator returns true when a property of the given name is accessible by the object,
 * no matter it is on the instance or prototype.
 * So with hasOwnProperty() and in operator, we can determine if the property of an object
 * exists on the property or prototype
 */
console.log("name" in person1); // true

/**
 * When using for-in loop, all properties that are accessible by the object and
 * can be enumerated will be returned, including properties on both the instance
 * and prototype.
 */
for (var prop in person1) {
  console.log(prop);
}
// name
// age
// job
// sayName

/**
 * Alternate Prototype Syntax
 */
function PersonAlt() {}
PersonAlt.prototype = {
  name: "Jane",
  age: 30,
  job: "Accountant",
  sayName: function() {
    console.log("Hello, " + this.name);
  }
};
/**
 * In this rewritten version, the end result is the same,
 * with one exception: the constructor property no longer points to Person.
 * Essentially, this syntax overwrites the default prototype object completely,
 * meaning that the constructor property is equal to that of a completely new object
 * instead of the function itself.
 */
var person3 = new PersonAlt();
console.log(person3.constructor == PersonAlt); // false
console.log(person3.constructor == Object); // true

/** If the constructor's value is important, it can be set specifically back
 * to the appropriate value as shown below
 */
function PersonAlt2() {}
PersonAlt2.prototype = {
  constructor: PersonAlt2,
  name: "Mike",
  age: 33,
  job: "Doctor",
  sayName: function() {
    console.log("Hello, " + this.name);
  }
};
var person4 = new PersonAlt2();
console.log(person4.constructor == PersonAlt2); // true
console.log(person4.constructor == Object); // false

/**
 * Prototype has its problems:
 * Problem1: it negates the ability to pass initialization arguments into the constructor,
 * meaning that all instances get the same property values by default.
 * Problem2: All properties on the prototype are shared among instances.
 * The problem occurs when a property contains a reference value.
 */
function PersonFriends() {}
PersonFriends.prototype = {
  constructor: PersonFriends,
  name: "Jack",
  age: 40,
  job: "Manager",
  friends: ["Shelby", "Mark"],
  sayName: function() {
    console.log("Hello, " + this.name);
  }
};

var person5 = new PersonFriends();
var person6 = new PersonFriends();
person5.friends.push("Van");
console.log(person5.friends); // [ 'Shelby', 'Mark', 'Van' ]
console.log(person6.friends); // [ 'Shelby', 'Mark', 'Van' ]
/**
 * The person5.friends array is altered by adding another element.
 * The changes made are also reflected on person2.friends, which is not what we want.
 */
