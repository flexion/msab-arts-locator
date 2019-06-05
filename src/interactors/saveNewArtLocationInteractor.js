exports.saveNewArtLocation = async ({ requestData, applicationContext }) => {
  await applicationContext
    .getPersistenceGateway()
    .submitNewLocation({ requestData, applicationContext });
  return { status: 'success' };
};
