//Interactor goes here
const { ArtLocation } = require('../entities/ArtLocation');
/**
 *
 * @param requestData.requestData
 * @param requestData
 * @param applicationContext
 * @param requestData.applicationContext
 * @returns {Promise<*>}
 */
exports.validateArtLocation = async ({ applicationContext, requestData }) => {
  try {
    const artLocation = new ArtLocation({
      applicationContext,
      rawArtLocation: requestData,
    });

    //TODO: Possibly return artLocation including unique ids
    return { artLocation, status: 'success' };
  } catch (e) {
    return { data: e.message, status: 'error validating data' };
  }
};
