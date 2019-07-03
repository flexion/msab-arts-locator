/**
 *
 * @param requestData
 * @param applicationContext
 * @returns {result}
 */
exports.sendAdminEmail = async ({ artLocation, applicationContext }) => {
  // to, subject, bodyText,
  const requestData = {
    to: applicationContext.emailConfig.from,
    subject: `${
      artLocation.name
    } submitted a new location`,
    body: `Admin link to approve or deny the listing: <a href='https://${
      applicationContext.environment.domainName
    }/curate-location/${artLocation.adminId}'>${artLocation.name}</a>`,
  };
  console.log('admin email data: ', requestData);
  const result = await applicationContext
    .getPersistenceGateway()
    .sendEmail({ requestData, applicationContext });

  return result;
};
