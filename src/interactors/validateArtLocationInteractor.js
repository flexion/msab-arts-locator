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
      rawArtLocation: requestData.data,
      applicationContext,
    });

    //TODO: Possibly return artLocation including unique ids
    return { status: 'success' };
  } catch (e) {
    console.log('e');
    return { status: 'error' };
  }
};
