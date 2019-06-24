const axios = require('axios');

const getCoordsFromAddress = async (
  { artLocation, apiKey },
  applicationContext,
) => {
  if (artLocation && apiKey) {
    const address = encodeURIComponent(
      `${artLocation.street}+${artLocation.city}+${artLocation.state}+${
        artLocation.zip
      }`,
    );

    let url = `${
      applicationContext.apiURLs().geocodeAPIUrl
    }?address=${address}&key=${apiKey}`;

    const response = await axios.get(url);
    if (response.data.results && response.data.results.length > 0) {
      const coords = response.data.results[0].geometry.location;
      return { status: 'success', coords };
    } else {
      console.log('geolocation failure for :', artLocation, response.data);
      return { status: 'geolocation failure', msg: response.data };
    }
  } else {
    console.log('missing data for coords', artLocation);
    return { status: 'geolocation failure', msg: 'missing data' };
  }
};

module.exports = { getCoordsFromAddress };
