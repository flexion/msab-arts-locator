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
    subject: `Arts Around MN Received a new location request: ${
      artLocation.name
    }`,
    body: `Admin link: <a href='https://${
      applicationContext.environment.domainName
    }/curate-location/${artLocation.adminId}'>${artLocation.name}</a>`,
  };

  const result = await applicationContext
    .getPersistenceGateway()
    .sendEmail({ requestData, applicationContext });

  return result;
};
