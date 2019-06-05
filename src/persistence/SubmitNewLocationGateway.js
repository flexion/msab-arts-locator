const makeRequest = (method, url, data) => {
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
    if (data) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
};

const submitNewLocation = async ({ location }) => {
  if (location) {
    const method = 'POST';
    const lambdaURL = 'https://pre.msab.flexion.us/api/v1/saveLocation';
    const response = await makeRequest(method, lambdaURL, data);
    const results = { response };
    return results;
  } else {
    return {};
  }
};

module.exports = { submitNewLocation };
