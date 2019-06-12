//Interactor goes here
const { ArtLocation } = require('../entities/ArtLocation');
/**
 *
 * @param requestData
 * @param applicationContext
 * @returns {Promise<*>}
 */
exports.validateArtLocation = async ({ requestData, applicationContext }) => {
  try {
    const artLocation = new ArtLocation({
      rawArtLocation: requestData,
      applicationContext,
    });

    //TODO: Possibly return artLocation including unique ids
    return { status: 'success', artLocation };
  } catch (e) {
    console.log('e: ', e.message);
    return { status: 'error validating data', data: e.message };
  }
};
