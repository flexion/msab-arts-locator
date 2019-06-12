/**
 *
 * @param requestData
 * @param applicationContext
 * @returns {result}
 */
exports.sendArtLocation = async ({ requestData, applicationContext }) => {
  const result = await applicationContext
    .getPersistenceGateway()
    .submitNewLocation({
      artLocationData: requestData,
      applicationContext,
    });

  return result;
};
