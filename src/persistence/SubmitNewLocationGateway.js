const makeRequest = (method, url, data) => {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
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
    if (data) {
      data = JSON.stringify(data);
      xhr.send(data);
    } else {
      xhr.send();
    }
  });
};

const submitNewLocation = async ({ artLocationData }) => {
  if (artLocationData) {
    const method = 'POST';
    const lambdaURL = 'https://pre.msab.flexion.us/api/v1/save-location';
    const response = await makeRequest(method, lambdaURL, artLocationData);
    const results = { response };
    return results;
  } else {
    return {};
  }
};

module.exports = { submitNewLocation };
