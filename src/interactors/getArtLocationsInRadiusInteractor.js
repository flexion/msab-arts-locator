const { validateRequestData } = require('../utilities/CleanUtils');

exports.getArtLocationsInRadius = async ({
  applicationContext,
  requestData,
}) => {
  const dataSchema = {
    additionalProperties: false,
    errorMessage:
      "should be an object with string properties 'lat', 'long', 'radius'",
    properties: {
      lat: { type: 'number' },
      long: { type: 'number' },
      radius: { type: 'number' },
    },
    required: ['lat', 'long', 'radius'],
    type: 'object',
  };

  // An interactor validates that the required objects are present.
  validateRequestData({ applicationContext, data: requestData, dataSchema });

  const lat = parseFloat(requestData.lat);
  const long = parseFloat(requestData.long);
  const radius = parseFloat(requestData.radius);
  // The interactor invokes a very specific persistence gateway operation.
  const artLocationData = await applicationContext
    .getPersistenceGateway()
    .getLocationsByRadius({ lat, long, radius }, applicationContext);
  if (artLocationData) {
    return { result: artLocationData };
  } else {
    return {};
  }
};
