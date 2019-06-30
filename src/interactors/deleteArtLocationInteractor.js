exports.deleteArtLocation = async ({ requestData, applicationContext }) => {
  const deleteLocation = await applicationContext
    .getPersistenceGateway()
    .deleteLocation({ requestData, applicationContext });
  return deleteLocation;
};
