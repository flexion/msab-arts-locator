const makeRequest = (method, url, artLocationData) => {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
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
    if (artLocationData) {
      xhr.send(artLocationData);
    } else {
      xhr.send();
    }
  });
};
const getBase64 = (image) => {
  let file = null;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      file = reader.result.split(',')[1];
      resolve(file);
    };
  });
};

const submitNewLocation = async ({ artLocationData }) => {
  if (artLocationData) {
    if (artLocationData.image) {
      artLocationData.imageContentType = artLocationData.image.type;
      console.log('image: ', artLocationData.image);
      artLocationData.base64Image = await getBase64(artLocationData.image);
      console.log('base64Image:', artLocationData.base64Image);
    }
    const method = 'POST';
    const lambdaURL = 'https://pre.msab.flexion.us/api/v1/save-location';
    const data = JSON.stringify(artLocationData);
    const response = await makeRequest(method, lambdaURL, data);
    const results = { response };
    return results;
  } else {
    return {};
  }
};

module.exports = { submitNewLocation };
