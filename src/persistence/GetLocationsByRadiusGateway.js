const makeRequest = (method, url) => {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    // xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
};

const getLocationsByRadius = async (
  { lat, long, radius },
  applicationContext,
) => {
  const lambdaURL = applicationContext.environment().apiURL + 'get-locations';
  const method = 'GET';
  let url = `${lambdaURL}?lat=${lat}&lon=${long}&radius=${radius}`;
  const locations = await makeRequest(method, url);
  return locations;
};

module.exports = { getLocationsByRadius };
