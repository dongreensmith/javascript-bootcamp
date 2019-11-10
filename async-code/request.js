//////////////////////////////////////////////////////////
// 1 - Async request using XMLHttpRequest object
//////////////////////////////////////////////////////////
const myCountryCode = "cn";
const request = new XMLHttpRequest();

request.addEventListener("readystatechange", e => {
  if (e.target.readyState === 4 && e.target.status === 200) {
    // e.target refers to the instance of XMLHttpRequest i.e. constant request
    // with it, we can access its property
    data = JSON.parse(e.target.response); // Convert JSON string to JS object
    // console.log('XMLHttpRequest() - Data requested(in JSON string): ', e.target.response);
    console.log("XMLHttpRequest() - Country name: ", data.name);
  } else if (e.target.readyState === 4) {
    console.log("XMLHttpRequest() - Some error occurs!");
  }
});
request.open("GET", `https://restcountries.eu/rest/v2/alpha/${myCountryCode}`);
request.send();

//////////////////////////////////////////////////////////
// 2 - Async request using callback
//////////////////////////////////////////////////////////
const getCountry = (countryCode, callback) => {
  const requestCountries = new XMLHttpRequest();

  requestCountries.addEventListener("readystatechange", e => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const data = JSON.parse(e.target.response);

      // Execute callback function if request succeeded.
      callback(false, data.name);
    } else if (e.target.readyState === 4) {
      // Execute callback function if request failed.
      callback("Cannot fetch country name!", "");
    }
  });
  requestCountries.open(
    "GET",
    `https://restcountries.eu/rest/v2/alpha/${countryCode}`
  );
  requestCountries.send();
};

// Implement getCountry function.
getCountry("es", (error, data) => {
  if (error) {
    console.log(`Error happens: ${error}`);
  } else {
    console.log("Callback function - Country name: ", data);
  }
});

//////////////////////////////////////////////////////////
// 3 - Async request using Promise
//////////////////////////////////////////////////////////
const getCountryPromise = countryCode =>
  new Promise((resolve, reject) => {
    const requestCountries = new XMLHttpRequest();

    requestCountries.addEventListener("readystatechange", e => {
      if (e.target.readyState === 4 && e.target.status === 200) {
        const data = JSON.parse(e.target.response);
        resolve(data.name);
      } else if (e.target.readyState === 4) {
        reject("Cannot fetch the country name!", "");
      }
    });
    requestCountries.open(
      "GET",
      `https://restcountries.eu/rest/v2/alpha/${countryCode}`
    );
    requestCountries.send();
  });

const countryPromise = getCountryPromise("ca");
countryPromise.then(
  data => {
    console.log("Promise Object - Country name: " + data);
  },
  error => {
    console.log(`Error happens: ${error}`);
  }
);

/////////////////////////////////////////////////////////
// 4 - Async request using fetch API
/////////////////////////////////////////////////////////
fetch("http://puzzle.mead.io/puzzle/?wordCount=1", {})
  .then(response => {
    if (response.status === 200) {
      // console.log(response.json());
      return response.json(); // response.json() returns a promise object, which makes promise chaining possible
    } else {
      throw new Error("Unable to fetch data");
    }
  })
  .then(data => {
    console.log(`Data returned by Fetch API: ${data.puzzle}. `);
  })
  .catch(error => {
    console.log(`Fetch API failed: ${error}`);
  });

// Use fetch API for exercise
const getCountryFetch = countryCode => {
  return fetch(
    `https://restcountries.eu/rest/v2/alpha/${countryCode}`,
    {}
  ).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("getCountry fetch API failed: Unable to fetch country!");
    }
  });
  // .then((data) => {
  //   return data.name;
  // });
};

getCountryFetch("au")
  .then(data => {
    console.log("Fetch API - Country name: " + data.name);
  })
  .catch(error => {
    console.log(error);
  });

/////////////////////////////////////////////////////////
// Another exercise to use fetch API
/////////////////////////////////////////////////////////
const getLocationFetch = () => {
  return fetch("http://ipinfo.io/json/?token=1a11bd55cc8f9c", {}).then(
    response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(
          "getLocation fetch API failed: Unable to fetch your location!"
        );
      }
    }
  );
};

// Two methods to combine location api and country api
// Method One...
getLocationFetch()
  .then(locationData => {
    // console.log(`Your location: ${locationData.city}, ${locationData.region}, ${locationData.country}`);
    let country = locationData.country;
    getCountryFetch(country)
      .then(countryData => {
        console.log(
          `Fetch API 1 - Your location: ${locationData.city}, ${locationData.region}, ${countryData.name}`
        );
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });

// Method Two... (promise chaining)
getLocationFetch()
  .then(locationData => {
    return getCountryFetch(locationData.country);
  })
  .then(countryData => {
    console.log(`Fetch API 2 - You are in ${countryData.name}`);
  })
  .catch(error => {
    console.log(error);
  });

/////////////////////////////////////////////////////////
// 5 - Async request using async-await syntax
/////////////////////////////////////////////////////////
const getCountryAsync = async countryCode => {
  const response = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${countryCode}`,
    {}
  );
  if (response.status === 200) {
    const data = await response.json();
    return data.name;
  } else {
    throw new Error("getCountry async function failed");
  }
};

getCountryAsync("jp")
  .then(country => {
    console.log("Async - Country name: ", country);
  })
  .catch(error => {
    console.log(error);
  });

const getLocationAsync = async () => {
  const response = await fetch(
    "http://ipinfo.io/json/?token=1a11bd55cc8f9c",
    {}
  );
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error("getLocation async function failed");
  }
};

getLocationAsync()
  .then(locationData => {
    let country = locationData.country;
    getCountryAsync(country)
      .then(countryData => {
        console.log(
          `Async - Your location: ${locationData.city}, ${locationData.region}, ${countryData}`
        );
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });

const getCurrentCountryAsync = async () => {
  // "Async-Await" pattern makes promise chaining easier.
  const location = await getLocationAsync();
  const country = await getCountryAsync(location.country);
  return country;
};

getCurrentCountryAsync()
  .then(currentCountry => {
    console.log(`Async - You are in ${currentCountry}`);
  })
  .catch(error => {
    console.log(error);
  });
