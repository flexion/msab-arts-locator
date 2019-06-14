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
  let geoJson = null;
  if (typeof location.geoJson === 'string') {
    geoJson = JSON.parse(location.geoJson);
  } else {
    geoJson = location.geoJson;
  }
  console.log('geoJson: ', geoJson);
  // https://www.google.com/maps/search/?api=1&query=28.6139,77.2090
  location.googleURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${geoJson.coordinates[1]}, ${geoJson.coordinates[0]}`,
  )}`;
  return location;
};

export const locationListHelper = (get) => {
  const arr = get(state.locationsList);
  return arr.length ? arr.map(createLocationURL) : [];
};
