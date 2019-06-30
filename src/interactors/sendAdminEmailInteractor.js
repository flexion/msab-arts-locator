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
    body: `Admin link: https://${
      applicationContext.environment.domainName
    }/curate-location/${artLocation.adminId} \n\n ${JSON.stringify(
      artLocation,
      null,
      2,
    )}; `,
  };
  console.log('admin email data: ', requestData);
  const result = await applicationContext
    .getPersistenceGateway()
    .sendEmail({ requestData, applicationContext });

  return result;
};
