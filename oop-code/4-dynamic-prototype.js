/**
 * Developers coming from other OO languages may find visual separation between
 * the constructor and prototype confusing. 
 * The dynamic prototype pattern seeks to solve this problem by encapsulating 
 * all of the information within the constructor while maintaining the 
 * benefits of using both a constructor and a prototype.
 */
function Person(name, age, job) {
  // properties
  this.name = name;
  this.age = age;
  this.job = job;

  // methods
  if(typeof this.sayName != 'function') {
    Person.prototype.sayName = function() {
      console.log('Hello, ' + this.name);
    }
  }
}

var person = new Person('Nicole', 29, 'Engineer');
person.sayName();