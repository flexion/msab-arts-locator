const makeRequest = (method, url) => {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
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
    xhr.send();
  });
};

const getLocationsByRadius = async ({ lat, long, radius }) => {
  if (window.location.hostname === 'localhost') {
    const locations = `{"message":"success","results":[{"website":"meow","contactEmail":"meow","zip":"53590","hashKey":-86449,"geoJson":{"type":"POINT","coordinates":[-89.2383182,43.1795039]},"name":"Flexion","state":"WI","city":"Sun Prairie","contactName":"asdf","rangeKey":"af4a9430-33ea-4ee5-8d36-c2972dab4771","geohash":-8644949777826250000,"category":{"folk":false,"visual":false,"literary":false,"music":false,"craft":false,"photo":false,"opera":false,"dance":false},"contactPhone":"1231231231","description":"asdfasdf","street":"1500 W Main St"},{"website":"meow","contactEmail":"meow","zip":"53590","hashKey":-86449,"geoJson":{"type":"POINT","coordinates":[-89.2383182,43.1795039]},"name":"Flexion","state":"WI","city":"Sun Prairie","contactName":"asdf","rangeKey":"257b5de4-d597-4add-82af-50f27ffe6c05","geohash":-8644949777826250000,"category":{"folk":false,"visual":false,"literary":false,"music":false,"craft":false,"photo":false,"opera":false,"dance":false},"contactPhone":"1231231231","description":"asdfasdf","street":"1500 W Main St"},{"website":"meow","contactEmail":"meow","zip":"53590","hashKey":-86449,"geoJson":{"type":"POINT","coordinates":[-89.2383182,43.1795039]},"name":"Flexion","state":"WI","city":"Sun Prairie","contactName":"asdf","rangeKey":"450dc057-4b25-481a-bcde-500bf337b276","geohash":-8644949777826250000,"category":{"folk":false,"visual":false,"literary":false,"music":false,"craft":false,"photo":false,"opera":false,"dance":false},"contactPhone":"1231231231","description":"asdfasdf","street":"1500 W Main St"},{"website":"meow","contactEmail":"meow","zip":"53590","hashKey":-86449,"geoJson":{"type":"POINT","coordinates":[-89.2383182,43.1795039]},"name":"Flexion","state":"WI","city":"Sun Prairie","contactName":"asdf","rangeKey":"8613fe9f-72d2-4d54-9e48-4773f133d42e","geohash":-8644949777826250000,"category":{"folk":false,"visual":false,"literary":false,"music":false,"craft":false,"photo":false,"opera":false,"dance":false},"contactPhone":"1231231231","description":"asdfasdf","street":"1500 W Main St"}]}`;
    return locations;
  } else {
    const method = 'GET';
    const lambdaURL = 'https://pre.msab.flexion.us/api/v1/get-locations';
    let url = `${lambdaURL}?lat=${lat}&lon=${long}&radius=${radius}`;
    const locations = await makeRequest(method, url);
    return locations;
  }
};

module.exports = { getLocationsByRadius };
