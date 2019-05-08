exports.getArtLocationsInCity = async ({
  requestData,
  responseCallback,
  applicationContext,
}) => {
  const { city } = requestData;
  // The interactor invokes a very specific persistence gateway operation.
  const artLocationData = applicationContext
    .getPersistenceGateway()
    .readAllLocationsByCity({ city, applicationContext });

  // The interactor invokes a callback (probably in the presenter) to provide results. The
  // function signature should be at the same semantic level as the interactor.
  responseCallback({ status: 'success', data: artLocationData });
};
