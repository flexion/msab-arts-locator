const makeRequest = (method, url, formdata) => {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    // xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    // xhr.setRequestHeader('enctype', 'multipart/form-data');
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
    if (formdata) {
      xhr.send(formdata);
    } else {
      xhr.send();
    }
  });
};
const buildForm = (artLocationData) => {
  const form = new FormData();
  form.append('data', JSON.stringify(artLocationData));
  console.log('typeof:', typeof artLocationData.image);
  console.log('image: ', artLocationData.image);
  form.append('image', artLocationData.image);
  return form;
};
const submitNewLocation = async ({ artLocationData }) => {
  if (artLocationData) {
    const formdata = buildForm(artLocationData);
    const method = 'POST';
    const lambdaURL = 'https://pre.msab.flexion.us/api/v1/save-location';
    const response = await makeRequest(method, lambdaURL, formdata);
    const results = { response };
    return results;
  } else {
    return {};
  }
};

module.exports = { submitNewLocation };
