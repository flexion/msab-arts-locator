/**
 *
 * @param requestData.requestData
 * @param requestData
 * @param applicationContext
 * @param requestData.applicationContext
 * @returns {result}
 */
exports.updateArtLocation = async ({ applicationContext, requestData }) => {
  const result = await applicationContext
    .getPersistenceGateway()
    .updateLocationApproval({
      applicationContext,
      artLocationData: requestData,
    });

  return result;
};
