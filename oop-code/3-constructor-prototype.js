/**
 * The most common way of defining custom types is to combine the constructor and prototype patterns.
 * The constructor pattern defines instance properties,
 * whereas the prototype pattern defines methods and shared properties.
 */
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ['Shelby', 'Mark'];
}
Person.prototype = {
  constructor: Person,
  sayName: function() {
    console.log(this.name);
  }
};

var person1 = new Person('Nicole', 29, 'Engineer');
var person2 = new Person('Greg', 27, 'Doctor');
person1.friends.push('Van');
console.log(person1.friends);
console.log(person2.friends);
console.log(person1.friends === person2.friends); // false
console.log(person1.sayName === person2.sayName); // true
/**
 * The hybrid constructor/prototype pattern is the most widely used and accepted practice for
 * defining custom reference types in ECMAScript.
 */