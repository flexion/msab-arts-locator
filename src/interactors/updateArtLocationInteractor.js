/**
 *
 * @param requestData
 * @param applicationContext
 * @returns {result}
 */
exports.updateArtLocation = async ({ requestData, applicationContext }) => {
  const result = await applicationContext
    .getPersistenceGateway()
    .updateLocation({
      artLocationData: requestData,
      applicationContext,
    });

  return result;
};
