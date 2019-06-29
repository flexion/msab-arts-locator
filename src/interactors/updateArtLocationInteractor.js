/**
 *
 * @param requestData
 * @param applicationContext
 * @returns {result}
 */
exports.updateArtLocation = async ({ requestData, applicationContext }) => {
  const result = await applicationContext
    .getPersistenceGateway()
    .updateLocationApproval({
      artLocationData: requestData,
      applicationContext,
    });

  return result;
};
