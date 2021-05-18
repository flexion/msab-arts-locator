exports.getLocationCoordinates = async ({
  applicationContext,
  artLocation,
}) => {
  // The interactor invokes a very specific persistence gateway operation.
  const coordinateData = await applicationContext
    .getPersistenceGateway()
    .getCoordsFromAddress(
      {
        apiKey: applicationContext.environment.apiKey,
        artLocation,
      },
      applicationContext,
    );
  if (coordinateData.status === 'success') {
    return coordinateData;
  }
  return coordinateData;
};
