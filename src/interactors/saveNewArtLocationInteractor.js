exports.saveNewArtLocation = async ({
  artLocation,
  applicationContext,
  coords,
}) => {
  await applicationContext
    .getPersistenceGateway()
    .saveNewLocationGeo({ artLocation, applicationContext, coords });
  return { status: 'success' };
};
