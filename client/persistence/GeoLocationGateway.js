const requestPosition = () => {
  let options = {
    enableHighAccuracy: false,
    //timeout: 15000, // time in millis when error callback will be invoked
    //maximumAge: 0, // max cached age of gps data, also in millis
  };

  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve(pos);
      },
      (err) => {
        reject({ status: 'failed', error: err });
      },
      options,
    );
  });
};

const getGeoLocation = async () => {
  if (!navigator.geolocation) {
    return { status: 'denied' };
  } else {
    const geoPos = await requestPosition();
    return geoPos;
  }
};

module.exports = { getGeoLocation };
