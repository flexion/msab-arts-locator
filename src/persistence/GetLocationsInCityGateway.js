const makeRequest = (method, url) => {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    // xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
};

const getLocationsInCity = async ({ city, applicationContext }) => {
  const method = 'GET';
  const lambdaURL = applicationContext.environment().apiURL + 'get-locations';
  let url = `${lambdaURL}?city=${city}`;
  const locations = await makeRequest(method, url);
  console.log('gateway locations: ', locations);
  return locations;
};

module.exports = { getLocationsInCity };
