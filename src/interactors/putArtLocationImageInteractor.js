exports.putArtLocationImage = async (requestData, applicationContext) => {
  const putImageResults = await applicationContext
    .getPersistenceGateway()
    .putImage(requestData, applicationContext);
  return putImageResults;
};
