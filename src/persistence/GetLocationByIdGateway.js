const makeRequest = (method, url) => {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
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

const getLocationById = async ({
  entityId,
  actionType,
  applicationContext,
}) => {
  const lambdaURL = applicationContext.environment().apiURL + 'get-location';
  const method = 'GET';
  let url = `${lambdaURL}?entityId=${entityId}&actionType=${actionType}`;
  const location = await makeRequest(method, url);
  return location;
};

module.exports = { getLocationById };
