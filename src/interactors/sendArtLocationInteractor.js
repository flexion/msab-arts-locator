/**
 *
 * @param requestData.requestData
 * @param requestData
 * @param applicationContext
 * @param requestData.applicationContext
 * @returns {result}
 */
exports.sendArtLocation = async ({ applicationContext, requestData }) => {
  const result = await applicationContext
    .getPersistenceGateway()
    .submitNewLocation({
      applicationContext,
      artLocationData: requestData,
    });

  return result;
};
