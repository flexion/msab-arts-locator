const {
  validateArtLocation,
} = require('../interactors/validateArtLocationInteractor');

exports.createNewLocation = async ({ applicationContext, locationData }) => {
  let state = {};
  const validateResult = await validateArtLocation({
    applicationContext,
    requestData: locationData,
  });
  state.validateArtLocation = validateResult;
  if (validateResult.status != 'success') {
    throw new Error(`Invalid ArtLocation: ${validateResult.data}`);
  }

  const { artLocation } = validateResult;
  const coordResult = await applicationContext
    .getUseCases()
    .getLocationCoordinates({
      applicationContext,
      artLocation,
    });
  state.locationCoordinates = coordResult;
  if (coordResult.status != 'success') {
    throw new Error(
      `Error getting location coordinates: ${coordResult.status}`,
    );
  }

  artLocation.city = coordResult.cityName;
  let saveResult = await applicationContext.getUseCases().saveNewArtLocation({
    applicationContext,
    artLocation,
    coords: coordResult.coords,
  });
  state.saveResult = saveResult;

  return state;
};
