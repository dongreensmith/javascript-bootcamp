/**
 * The parastic constructor pattern is typeically a fallback 
 * when the other patterns fail. The basic idea of this pattern
 * is to create a constructor that simply wraps the creation and return of
 * another object while looking like a typical constructor. 
 */
function Person(name, age, job){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log('Hello, ' + this.name);
  };
  return o;
}

var person = new Person('Nicole', 29, 'Engineer');
person.sayName();

/**
 * In this example, the Person constructor creates a new object, 
 * initializes it with properties and methods,
 * and then returns the object. 
 * This is exactly the same as the factory pattern except that the function is
 * called as a constructor, using the new operator.
 * 
 * This pattern allows you to create constructors for objects that 
 * may not be possible otherwise. 
 * For example, you may want to create a special array that has an extra method.
 * Since you don't have direct access to the Array constructor, this pattern works:
 */
function SpecialArray() {
  var arrObj = new Array();

  arrObj.push.apply(arrObj, arguments);

  arrObj.toPipedString = function() {
    return this.join('|');
  };

  return arrObj;
}

var specialArray = new SpecialArray('red', 'blue','green');
console.log(specialArray.toPipedString());