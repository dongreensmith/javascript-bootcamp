# Async JS

## Intro

This small project contains sample code and notes to help you understand how asynchronous Javascript works. Starting from introduction of closures, it walks you through different approaches to realizing async operation in Javascript.

## Code Overview

#### closures.js

By four examples, understand what closures is and how it works.<br><br>
_How to run:_ This is a console app. Run `node closures.js` and you can see the result in console.

#### request.js, index.html

Learn how to use different ways to apply Ajax. <br>
`request.js` use different ways(below) to fetch data from API asynchronously and print the results in browser's console. Note: XMLHttpRequest object can only be used in browser environment.

1. Use built-in XMLHttpRequest object
2. Use callback function combined with XMLHttpRequest object
3. Use Promise combined with XMLHttpRequest object
4. Use fetch API
5. Use async-await operator

_How to run_: Open `index.html` in browser and check console to see results

#### promise.js

Learn how to use callback and promise to realize async operation, understand the advantage of promise over callback and understand the async mechanism in node.js

#### async-await.js

Learn how to use async function combined with await operator and understand its advantage over promise.

## Installation

- Install [Node](https://nodejs.org/en/)

## Running

- For closures.js, promise.js and async-await.js, run the code in CLI:

```sh
$ node <File name>
```

- For request.js, run in Chrome by opening index.html.

## Tech Concept

- [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures/)
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [await operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
