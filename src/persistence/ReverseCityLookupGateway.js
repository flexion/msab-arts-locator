const makeRequest = (method, url) => {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
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

const getCityFromGeo = async ({ applicationContext, data }) => {
  if (data.lat && data.long) {
    const method = 'GET';

    let url = `${applicationContext.apiURLs().reverseApiUrl}&lat=${
      data.lat
    }&lon=${data.long}&addressdetails=1`;
    const addressData = await makeRequest(method, url);
    const results = { cityValue: JSON.parse(addressData).address.town };
    return results;
  } else {
    return {};
  }
};

module.exports = { getCityFromGeo };
