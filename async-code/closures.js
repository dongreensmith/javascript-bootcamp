// Learning and understanding closures by examples

// Example 1
const func = () => {
  const message = 'This is a test message!';
  const printMessage = () => {
    console.log(message);
  }
  return printMessage;
}

const printMessageFunc = func();
printMessageFunc();   // Output: This is a test message!
// the function in the global scope can still access
// the variable(message) defined in func(). It is closure!

// Example 2
const createCounter = () => {
  let count = 0;
  return {
    increment: () => {
      count++;
    },
    decrement: () => {
      count--;
    },
    get: () => {
      return count;
    }
  }
}
const counter = createCounter();
console.log(counter.get())  // Output: 0
counter.increment();  // count = 1  
counter.increment();  // count = 2
counter.decrement();  // count = 1
console.log(counter.get()); // Output: 1
// This is more obvious. The outside function counter() can not only
// access the variable defined in function createCounter, but also can manipulate it.
// Using closures in this way provides a number of benefits that are normally associated with object-oriented programming
// in particular, data hiding and encapsulation.

// Example 3
const createAdder = (a) => {
  return (b) => {
    return a + b;
  }
}

const add10 = createAdder(10);
console.log(add10(-3)); // 10 + (-3) | Output: 7
const add99 = createAdder(99);
console.log(add99(10)); // 99 + 10 | Output: 109

// Example 4
const createTipper = (tip) => {
  return amount => tip*amount;
};

const tip15 = createTipper(0.15);
console.log(tip15(200));  // 200 * 0.15 | Output: 30
const tip7 = createTipper(0.07);
console.log(tip7(50));  // 50 * 0.07 | Output: 3.5