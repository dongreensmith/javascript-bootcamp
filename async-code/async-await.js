const returnData = async () => {
  // Add keyword async to make the function async. 
  // Accordingly, its return value is a promise object
  return 'abc';
}

// To call the function as a promise
returnData().then((data) => {
  console.log(`Data returned from async function: ${data}`);  // abc
}).catch((error) => {
  console.log(`Error returned from async function: ${error}`);
});

// From the above example, we can understand what an async function returns and how to use it.
// Next, we apply it to an async operation to see how it works with promise

const getDataPromise = (num) => new Promise((resolve, reject) => {
  setTimeout(() => {
    typeof num === 'number' ? resolve(num*2) : reject('Number must be provided!');
  }, 2000);
});

const processDataPromise = async () => {
  let data = await getDataPromise(2);   // data = 4
  // use await operator with a function that returns a promise
  // note: await always works with async function
  // With await, resolve() and reject() can be automatically processed. 
  data = await getDataPromise(data);  // data = 8
  return data;
}

processDataPromise().then((data) => {
  console.log(`Data returned from processDataPromise: ${data}`);  // 8
}).catch((error) => {
  console.log(`Error returned from processDataPromise: ${error}`);
});
