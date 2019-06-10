exports.saveNewArtLocation = async ({
  artLocation,
  applicationContext,
  coords,
}) => {
  const saveResp = await applicationContext
    .getPersistenceGateway()
    .saveNewLocationGeo({ artLocation, applicationContext, coords });
  return { status: saveResp.status };
};
