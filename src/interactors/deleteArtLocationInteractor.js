exports.deleteArtLocation = async ({ applicationContext, requestData }) => {
  const deleteLocation = await applicationContext
    .getPersistenceGateway()
    .deleteLocation({ applicationContext, requestData });
  if (deleteLocation.status != 'success') {
    throw new Error(
      `Failed to delete location: ${JSON.stringify(deleteLocation)}`,
    );
  }
  return deleteLocation;
};
