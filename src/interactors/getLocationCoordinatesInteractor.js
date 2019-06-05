exports.getGeoLocationInteractor = async ({
  requestData,
  applicationContext,
}) => {
  // The interactor invokes a very specific persistence gateway operation.
  const coordinateData = await applicationContext
    .getPersistenceGateway()
    .getCoordsFromAddress({ requestData, applicationContext });
  console.log('coords: ', coordinateData);
  return { status: 'success', data: coordinateData };
};
