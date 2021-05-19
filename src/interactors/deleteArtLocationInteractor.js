exports.deleteArtLocation = async ({ applicationContext, requestData }) => {
  const deleteLocation = await applicationContext
    .getPersistenceGateway()
    .deleteLocation({ applicationContext, requestData });
  return deleteLocation;
};
