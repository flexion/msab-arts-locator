const {
  validateArtLocation,
} = require('../interactors/validateArtLocationInteractor');

exports.createNewLocation = async ({ locationData, applicationContext }) => {
  const validateResult = await validateArtLocation({
    applicationContext,
    requestData: locationData,
  });
  if (validateResult.status != 'success') { throw new Error(`Invalid ArtLocation: ${validateResult.data}`)}

  const artLocation = validateResult.artLocation;
  const coordResult = await applicationContext
    .getUseCases()
    .getLocationCoordinates({
      applicationContext,
      artLocation,
    });

  if (coordResult.status != 'success') { throw new Error(`Error getting location coordinates: ${coordResult.status}`)}
  return coordResult
};
