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

const getCityFromGeo = async ({ data }) => {
  if (data.lat && data.long) {
    const method = 'GET';
    const geoApiUrl = 'https://nominatim.openstreetmap.org/reverse?format=json';
    let url = `${geoApiUrl}&lat=${data.lat}&lon=${data.long}&addressdetails=1`;
    const addressData = await makeRequest(method, url);
    const results = { cityValue: JSON.parse(addressData).address.town };
    return results;
  } else {
    return {};
  }
};

module.exports = { getCityFromGeo };
