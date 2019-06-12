/**
 *
 * @param requestData
 * @param applicationContext
 * @returns {result}
 */
exports.sendArtLocation = async ({ requestData, applicationContext }) => {
  console.log('send art location requestData: ', requestData);
  const result = await applicationContext
    .getPersistenceGateway()
    .submitNewLocation({
      artLocationData: requestData,
      applicationContext,
    });

  return result;
};
