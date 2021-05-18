/**
 *
 * @param requestData
 * @param requestData.artLocation
 * @param applicationContext
 * @param requestData.applicationContext
 * @returns {result}
 */
exports.sendAdminEmail = async ({ applicationContext, artLocation }) => {
  // to, subject, bodyText,
  const requestData = {
    body: `Admin link to approve or deny the listing: <a href='https://${applicationContext.environment.domainName}/curate-location/${artLocation.adminId}'>${artLocation.name}</a>`,
    subject: `${artLocation.name} submitted a new location`,
    to: applicationContext.emailConfig.from,
  };

  const result = await applicationContext
    .getPersistenceGateway()
    .sendEmail({ applicationContext, requestData });

  return result;
};
