const {
  validateArtLocation,
} = require('../interactors/validateArtLocationInteractor');

exports.createNewLocation = async ({ locationData, applicationContext }) => {
  validateResult = await validateArtLocation({
    applicationContext,
    requestData: locationData,
  });
  msg = validateResult.status;
  console.log(msg);
};
