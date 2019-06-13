exports.getLocationCoordinates = async ({
  artLocation,
  applicationContext,
}) => {
  // The interactor invokes a very specific persistence gateway operation.
  const coordinateData = await applicationContext
    .getPersistenceGateway()
    .getCoordsFromAddress({
      artLocation,
      apiKey: applicationContext.environment.apiKey,
    });
  if (coordinateData.status === 'success') {
    return coordinateData;
  }
  return coordinateData;
};
