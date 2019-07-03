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
    let cityName = null;
    const response = await axios.get(url);

    if (response.data.results && response.data.results.length > 0) {
      const coords = response.data.results[0].geometry.location;
      const address_comps = response.data.results[0].address_components;
      address_comps.forEach((comp) => {
        if (comp.types[0] === 'locality') {
          cityName = comp.long_name;
        }
      });

      return { status: 'success', coords, cityName };
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
