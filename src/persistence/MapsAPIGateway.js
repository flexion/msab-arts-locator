const axios = require('axios');

const getCoordsFromAddress = async ({ artLocation, APIKEY }) => {
  if (artLocation && APIKEY) {
    const address = `${artLocation.street}+${artLocation.city}+${
      artLocation.state
    }+${artLocation.zip}`;
    const mapsAPIUrl = `https://maps.googleapis.com/maps/api/geocode/json`;
    let url = `${mapsAPIUrl}?address=${address}&key=${APIKEY}`;
    const response = await axios.get(url);
    const coords = response.data.results[0].geometry.location;
    return { status: 'success', coords };
  } else {
    console.log('missing data for coords');
    return { status: 'failure' };
  }
};

module.exports = { getCoordsFromAddress };
