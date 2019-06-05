const makeRequest = (method, url) => {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
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

const getCoordsFromAddress = async ({ location, APIKEY }) => {
  if (location && APIKEY) {
    const method = 'GET';
    const address = `${location.street}+${location.city}+${location.state}+${
      location.zip
    }`;
    const mapsAPIUrl = `https://maps.googleapis.com/maps/api/geocode/json`;
    let url = `${mapsAPIUrl}?address=${address}&key=${APIKEY}`;
    console.log('api url: ', url);
    const addressData = await makeRequest(method, url);
    const results = {
      coords: JSON.parse(addressData).results.geometry.location,
    };
    console.log('results: ', results);
    return results;
  } else {
    return {};
  }
};

module.exports = { getCoordsFromAddress };
