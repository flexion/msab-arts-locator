const axios = require('axios');

const getCoordsFromAddress = async (
  { apiKey, artLocation },
  applicationContext,
) => {
  if (artLocation && apiKey) {
    const address = encodeURIComponent(
      `${artLocation.street}+${artLocation.city}+${artLocation.state}+${artLocation.zip}`,
    );

    let url = `${
      applicationContext.apiURLs().geocodeAPIUrl
    }?address=${address}&key=${apiKey}`;
    let cityName = null;
    const response = await axios.get(url);

    if (response.data.results && response.data.results.length > 0) {
      const coords = response.data.results[0].geometry.location;
      const address_comps = response.data.results[0].address_components;
      address_comps.forEach(comp => {
        if (comp.types[0] === 'locality') {
          cityName = comp.long_name;
        }
      });

      return { cityName, coords, status: 'success' };
    } else {
      console.log('geolocation failure for :', artLocation, response.data);
      return { msg: response.data, status: 'geolocation failure' };
    }
  } else {
    console.log('missing data for coords', artLocation);
    return { msg: 'missing data', status: 'geolocation failure' };
  }
};

module.exports = { getCoordsFromAddress };
