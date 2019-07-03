const requestPosition = () => {
  let options = {
    enableHighAccuracy: false,
    timeout: 30000, // time in millis when error callback will be invoked
    maximumAge: 10, // max cached age of gps data, also in millis
  };

  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve(pos);
      },
      (err) => {
        console.log('geolocation failed on this device');
        reject({ result: { status: 'failed', error: err } });
      },
      options,
    );
  });
};

const getGeoLocation = async () => {
  if (!navigator.geolocation) {
    console.log('geolocation not allowed on this device');
    return { status: 'denied' };
  } else {
    const geoPos = await requestPosition();
    return geoPos;
  }
};

module.exports = { getGeoLocation };
