const axios = require('axios');

const getCoordsFromAddress = async ({ artLocation, apiKey }) => {
  console.log('artLocation: ', artLocation);
  console.log('apikey: ', apiKey);
  if (artLocation && apiKey) {
    const address = `${artLocation.street}+${artLocation.city}+${
      artLocation.state
    }+${artLocation.zip}`;
    const mapsAPIUrl = `https://maps.googleapis.com/maps/api/geocode/json`;
    let url = `${mapsAPIUrl}?address=${address}&key=${apiKey}`;
    const response = await axios.get(url);
    const coords = response.data.results[0].geometry.location;
    return { status: 'success', coords };
  } else {
    console.log('missing data for coords', artLocation);
    return { status: 'geolocation failure' };
  }
};

module.exports = { getCoordsFromAddress };
