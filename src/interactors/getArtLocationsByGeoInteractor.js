const { validateRequestData } = require('../utilities/CleanUtils');

exports.getArtLocationsByGeo = async ({ applicationContext, requestData }) => {
  const dataSchema = {
    additionalProperties: false,
    errorMessage:
      "should be an object with string properties 'lat', 'lon', 'radius'",
    properties: {
      lat: { type: 'string' },
      lon: { type: 'string' },
      radius: { type: 'string' },
    },
    required: ['lat', 'lon', 'radius'],
    type: 'object',
  };

  // An interactor validates that the required objects are present.
  validateRequestData({ applicationContext, data: requestData, dataSchema });

  const lat = parseFloat(requestData.lat);
  const long = parseFloat(requestData.lon);
  const radius = parseFloat(requestData.radius);
  // The interactor invokes a very specific persistence gateway operation.
  const artLocationData = await applicationContext
    .getPersistenceGateway()
    .getLocationsByGeo({ lat, long, radius });
  return artLocationData;
};
