exports.getLocationCoordinates = async ({
  artLocation,
  applicationContext,
}) => {
  console.log('coords requestdata', artLocation);
  // The interactor invokes a very specific persistence gateway operation.
  const coordinateData = await applicationContext
    .getPersistenceGateway()
    .getCoordsFromAddress({
      artLocation,
      APIKEY: applicationContext.environment.apiKey,
    });
  console.log('coords: ', coordinateData);
  return { status: 'success', data: coordinateData };
};
