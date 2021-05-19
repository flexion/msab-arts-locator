exports.saveNewArtLocation = async ({
  applicationContext,
  artLocation,
  coords,
}) => {
  const saveResp = await applicationContext
    .getPersistenceGateway()
    .saveNewLocationGeo({ applicationContext, artLocation, coords });
  return { status: saveResp.status };
};
