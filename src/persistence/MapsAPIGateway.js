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

const getCoordsFromAddress = async ({ artLocation, APIKEY }) => {
  console.log('getcoords: ', artLocation, APIKEY);
  if (artLocation && APIKEY) {
    const method = 'GET';
    const address = `${artLocation.street}+${artLocation.city}+${
      artLocation.state
    }+${artLocation.zip}`;
    const mapsAPIUrl = `https://maps.googleapis.com/maps/api/geocode/json`;
    let url = `${mapsAPIUrl}?address=${address}&key=${APIKEY}`;
    console.log('api url: ', url);
    const addressData = await makeRequest(method, url);
    const results = {
      coords: JSON.parse(addressData).results.geometry.artLocation,
    };
    console.log('results: ', results);
    return results;
  } else {
    return {};
  }
};

module.exports = { getCoordsFromAddress };
