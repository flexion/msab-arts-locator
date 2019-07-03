const makeRequest = (method, url, artLocationData) => {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    // xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    //xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
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
    if (artLocationData) {
      xhr.send(artLocationData);
    } else {
      xhr.send();
    }
  });
};

const submitNewLocation = async ({ artLocationData, applicationContext }) => {
  if (artLocationData) {
    const method = 'POST';
    const lambdaURL = applicationContext.environment().apiURL + 'save-location';
    const data = JSON.stringify(artLocationData);
    const response = await makeRequest(method, lambdaURL, data);
    const results = { response };
    return results;
  } else {
    return {};
  }
};

module.exports = { submitNewLocation };
