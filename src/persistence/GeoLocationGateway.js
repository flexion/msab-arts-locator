const requestPosition = () => {
  let options = {
    enableHighAccuracy: false,
    //timeout: 15000, // time in millis when error callback will be invoked
    maximumAge: 10, // max cached age of gps data, also in millis
  };

  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log('found location');
        resolve(pos);
      },
      (err) => {
        console.log('did not find location');
        reject({ status: 'failed', error: err });
      },
      options,
    );
  });
};

const getGeoLocation = async () => {
  if (!navigator.geolocation) {
    console.log('no geolocation');
    return { status: 'denied' };
  } else {
    console.log('finding geolocation');
    const geoPos = await requestPosition();
    return geoPos;
  }
};

module.exports = { getGeoLocation };
