import { state } from 'cerebral';
const urlFormat = require('format-url');
/* eslint-disable */
// const getMapUrl = () => {
//   let mapUrlFullPath;
//   var mapUrl = '?q=' + geocoding.latitude + ',' + geocoding.longitude;
//   // Check if a mobile device exists, or is web browser
//   if (typeof device !== 'undefined') {
//     mapUrlFullPath =
//       device.platform.toLowerCase() === 'ios'
//         ? 'maps://' + mapUrl
//         : 'geo:' + mapUrl;
//   } else {
//     mapUrlFullPath = 'geo:' + mapUrl;
//   }
//   window.open(mapUrlFullPath, '_system');
// };

const formatWebsiteURL = location => {
  if (location.website) {
    location.website = urlFormat(location.website);
  }
  return location;
};

const formatDistance = location => {
  if (typeof location.distance === 'number') {
    const distance = Math.round(location.distance * 10) / 10;
    location.distance = `${distance} miles`;
  }
  return location;
};

const formatCategories = location => {
  location.categories = [];

  let cats = location.category;
  if (typeof cats === 'string') {
    cats = JSON.parse(cats);
  }

  Object.keys(cats).forEach(function (cat) {
    if (cats[cat]) {
      location.categories.push(cat);
    }
  });
  return location;
};

const formatMapsURL = location => {
  // location.coordinates is [long, lat]
  // https://www.google.com/maps/search/?api=1&query=28.6139,77.2090
  location.googleURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.street} ${location.city} ${location.state} ${location.zip}`,
  )}`;
  return location;
};

const formatLocation = location => {
  location = formatDistance(location);
  location = formatCategories(location);
  return formatMapsURL(formatWebsiteURL(location));
};

export const locationListHelper = (get, list) => {
  if (!list) {
    list = get(state.locationsList);
  }
  return list.length ? list.map(formatLocation) : [];
};
