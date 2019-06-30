/**
 *
 * @param requestData
 * @param applicationContext
 * @returns {result}
 */
exports.sendUserEmail = async ({
  artLocation,
  initial,
  approved,
  applicationContext,
}) => {
  console.log('artlocation updateid: ', artLocation.updateId);
  // to, subject, bodyText,
  let requestData = null;
  if (initial) {
    requestData = {
      to: artLocation.contactEmail,
      subject: `Location submitted to Arts Around MN: ${artLocation.name}`,
      body: `Thank you for your interest in reaching a wider group of participants or audience members through the Arts Around MN site.
We have received and will review the content you submitted.  The Arts Board reserves the right to approve or disapprove any content submitted.
You will receive a notification message when the content has been approved or disapproved to post on the site. Meanwhile, you can update your content
submitted here: 
https://${applicationContext.environment.domainName}/update-location/${
        artLocation.updateId
      }`,
    };
  } else {
    if (approved) {
      requestData = {
        to: artLocation.contactEmail,
        subject: `Location approved for Arts Around MN: ${artLocation.name}`,
        body: `Congratulations!  The content you submitted for the Arts Around MN site has been reviewed and approved.  Your listing will now appear on the site. To make this site a valuable resources for users, the content needs to be accurate.  Please periodically review your listing and update any information that may have changed. You can keep your location information up to date using the following link: https://${
          applicationContext.environment.domainName
        }/update-location/${
          artLocation.updateId
        } Please retain this email to be able to later update your content. `,
      };
    } else {
      requestData = {
        to: artLocation.contactEmail,
        subject: `Location NOT approved for Arts Around MN: ${
          artLocation.name
        }`,
        body: `Thank you for your interest in the Arts Around MN site. The Minnesota State Arts Board reserves the sole right to determine what content can and cannot be included on the Arts Around MN site. We have reviewed the information you submitted and determined that we will not be able to add your listing to the site.`,
      };
    }
  }

  console.log('user email data: ', requestData);
  const result = await applicationContext
    .getPersistenceGateway()
    .sendEmail({ requestData, applicationContext });

  return result;
};
