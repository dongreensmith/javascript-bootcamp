// Get data asynchronously - Callback version
const getDataCallback = (callback) => {
  setTimeout(() => {
    callback(undefined, 'Data to return');
  }, 2000);
}

getDataCallback((error, data) => {
  if(!error) {
    console.log(data);  // Data to return (after 2 seconds)
  }
});

console.log('Something else...'); // This line will be printed first.

// Get data asynchronously - Promise version
const getDataPromise = (data) => new Promise((resolve, reject) => {
    if(1===1) { // Async operation succeeds
      setTimeout(() => {
        resolve('Data returned successfully: ' + data);
      }, 2000);
    } else {  // Async operation fails
      setTimeout(() => {
        reject('Data failed to return');
      }, 2500);
    }
  }); 

const dataPromise = getDataPromise('hello');

dataPromise.then((data) => {
  console.log(data);  // Data returned successfully (after 2 seconds);
}, (error) => {
  console.log(error); // Error returned when failed
});

// If we want to complete more than one async operation.
// With callback, we can do as below...
const getDataCallbackChain = (num, callback) => {
  setTimeout(() => {
    if(typeof num === 'number') {
      callback(undefined, num * 2);
    } else {
      callback('Number must be provided');
    }
  }, 2000);
};

getDataCallbackChain(2, (err, data) => {
  if(err) {
    console.log(`Callback nesting failed: ${err}`);
  } else {
    getDataCallbackChain(data, (err, data) => {
      if(err) {
        console.log(`Callback nesting failed: ${err}`);
      } else {
        console.log(`Callback nesting: ${data}`);  // 8
      }
    });
  }
});
// From the above, we can see the code is nested and much duplicated code, 
// which is very clumsy and difficult to read and understand.
// For this, we need promise chaining.

const getDataPromiseChain = (num) => new Promise((resolve, reject) => {
  if(typeof num === 'number') { 
    setTimeout(() => {
      resolve(num*2);
    }, 2000);
  } else { 
    setTimeout(() => {
      reject('Number must be provided');
    }, 2000);
  }
}); 

const dataPromiseChain = getDataPromiseChain(3);
dataPromiseChain.then((data) => {
  return getDataPromiseChain(data);
}).then((data) => {
  console.log(`Promise chain: ${data}`);  // 12
}).catch((error) => { // Handle with error, which is set in reject() function
  console.log(`Promise chain failed: ${error}`);
});
