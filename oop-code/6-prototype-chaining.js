/**
 * Inheritance: Prototype chaining
 * Implementing prototype chaining involves the following code pattern:
 */
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function() {
  return this.property;
};

function SubType() {
  this.subProperty = false;
}

// Inherit from SuperType
SubType.prototype = new SuperType();
// SubType.prototype = Object.create(SuperType.prototype);
// Understand why we use first line with new instead of second line with Object.create()
// The problem is with Object.create, SubType can not access the property from SuperType

SubType.prototype.getSubValue = function() {
  return this.subProperty;
};

var instance = new SubType();
console.log(instance.getSubValue()); // false (From SubType)
console.log(instance.getSuperValue()); // true (getSuperValue() is the method inherited from SuperType)

/**
 * instance object is technically an instance of SubType, SuperType and Object due to prototype chain relationship
 */
console.log(instance instanceof SubType); // true
console.log(instance instanceof SuperType); // true
console.log(instance instanceof Object); // true

/**
 * Each prototype in the chain has access to this method
 */
console.log(SubType.prototype.isPrototypeOf(instance)); // true
console.log(SuperType.prototype.isPrototypeOf(instance)); // true
console.log(Object.prototype.isPrototypeOf(instance)); // true

/**
 * A subtype can override a supertype method
 */
SubType.prototype.getSuperValue = function() {
  return "I'm overridden";
};

console.log(instance.getSuperValue()); // I'm overridden

/**
 * Problems with prototype chaining
 */
function SuperColor() {
  this.colors = ["red", "blue", "green"];
}

function SubColor() {}

//Inherit from SuperColor
SubColor.prototype = new SuperColor();
var color1 = new SubColor();
color1.colors.push("black");
console.log(color1.colors); // 'red', 'blue', 'green', 'black'

var color2 = new SubColor();
console.log(color2.colors); // 'red', 'blue', 'green', 'black'
/**
 * All instances of SubColor share a colors property.
 * The changes made to color1.colors are reflected on color2.colors
 */
