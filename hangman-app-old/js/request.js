// Use async function to get puzzle from API
const getPuzzleAsync = async () => {
  const response = await fetch('http://puzzle.mead.io/puzzle/?wordCount=1');
  if(response.status === 200) {
    const data = await response.json();
    return data.puzzle;
  } else {
    throw new Error('Cannot generate a puzzle!');
  }
}

// Use fetch API to get puzzle from API
const getPuzzleFetch = () => {
  return fetch('http://puzzle.mead.io/puzzle/?wordCount=1', {}).then((response) => {
    if(response.status === 200) {
      return response.json(); // response.json() returns a promise object, which makes promise chaining possible
    } else {
      throw new Error('Cannot generate a puzzle!');
    }
  }).then((data) => {
    return data.puzzle;
  });
}

// Primise version of getPuzzle()
const getPuzzlePromise = () => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', (e) => {
    if(e.target.readyState === 4 && e.target.status === 200) { 
      const data = JSON.parse(e.target.response).puzzle;
      resolve(data);
    } else if(e.target.readyState === 4) {
      const errorMsg = 'Cannot generate a puzzle!';
      reject(errorMsg);
    }
  });
  request.open('GET', 'http://puzzle.mead.io/puzzle/?wordCount=1');
  request.send();
});

///////////////////////////////////////////////////////////////////
const getPuzzle = (callback) => {   // the original version of async getPuzzle()
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', (e) => {
    if(e.target.readyState === 4 && e.target.status === 200) { 
      const data = JSON.parse(e.target.response).puzzle;
      callback(false, data);
    } else if(e.target.readyState === 4) {
      const errorMsg = 'Cannot generate a puzzle'
      callback(errorMsg, '');
    }
  });
  request.open('GET', 'http://puzzle.mead.io/puzzle/?wordCount=1');
  request.send();
}

///////////////////////////////////////////////////////////////////
const getPuzzleSync = () => {   // Sync version of getPuzzle() only for demo
  const request = new XMLHttpRequest();

  request.open('GET', 'http://puzzle.mead.io/slow-puzzle/?wordCount=1', false);
  request.send();

  if(request.readyState === 4 && request.status === 200) { 
    const data = JSON.parse(request.response).puzzle;
    return data;
  } else if(request.readyState === 4) {
    throw new Error('Cannot generate a puzzle!');
  }
}