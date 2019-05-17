import { state } from 'cerebral';
const getMapUrl = () => {
  let mapUrlFullPath;
  var mapUrl = '?q=' + geocoding.latitude + ',' + geocoding.longitude;
  // Check if a mobile device exists, or is web browser
  if (typeof device !== 'undefined') {
    mapUrlFullPath =
      device.platform.toLowerCase() === 'ios'
        ? 'maps://' + mapUrl
        : 'geo:' + mapUrl;
  } else {
    mapUrlFullPath = 'geo:' + mapUrl;
  }
  window.open(mapUrlFullPath, '_system');
};

const createLocationURL = (location) => {
  const address = `${location.address1} ${location.ad2} ${location.city} ${
    location.st
  } ${location.zip}`;
  location.googleURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;
  return location;
};

export const locationListHelper = (get) => {
  const arr = get(state.locationsList);
  return arr.length ? arr.map(createLocationURL) : [];
};
