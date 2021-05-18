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
  // to, subject, bodyText,
  let requestData = null;
  if (initial) {
    requestData = {
      to: artLocation.contactEmail,
      subject: `Thank you for your submission to Arts Around MN`,
      body: `<p>Thank you for your interest in promoting your work and your activities through Arts Around MN.</p>
      <p>The Arts Board will review your submission and determine if we’re able to publish the contents on our site or not. We reserve the right to approve or deny any content submitted.</p>
      <p>Once we’ve reviewed your submission, you’ll receive another e-mail to let you know whether or not we’ve published it.</p>
      <p>Sincerely,<p>
      <p>The Minnesota State Arts Board</p>`,
    };
  } else {
    if (approved) {
      requestData = {
        to: artLocation.contactEmail,
        subject: `Your submission to Arts Around MN is approved`,
        body: `<p>Congratulations! The listing you submitted for the Arts Around MN site has been approved and can now be viewed on the site.</p>
        <p>You can edit your listing at any time. We suggest reviewing your listing once a year to make sure the information is still up to date.</p>
        <p><strong>THIS IS THE ONLY WAY TO EDIT YOUR LISTING, SO KEEP THIS E-MAIL IN A SAFE PLACE OR BOOKMARK THE URL.</strong></p>
        <p>1. Click on your listing URL https://${
          applicationContext.environment.domainName
        }/update-location/${artLocation.updateId} </p>
        <p>2. Make any necessary changes or updates to your listing.</p>
        <p>3. Press the “Update” button.</p>
        <p>4. The Arts Board will review your changes.</p>
        <p>5. You’ll get an e-mail letting you know if your changes were approved or not.</p>
        <p>If you have questions or would like us to remove your listing, please contact us at <a href = "mailto:artsaroundmn.admin@state.mn.us">artsaroundmn.admin@state.mn.us</a>.</p>
        <p>Thank you again for being a part of Arts Around MN!</p>
        <p>Sincerely,</p>
        <p>The Minnesota State Arts Board</p>
         `,
      };
    } else {
      requestData = {
        to: artLocation.contactEmail,
        subject: `Your submission to Arts Around MN was not approved`,
        body: `<p>Thank you for your interest in being listed on Arts Around MN.</p>
        <p>The Minnesota State Arts Board reserves the right to approve or deny any content submitted. Based on our review of the information you submitted, we have determined that we won’t be able to add your listing to the site. </p>
        <p>Sincerely,</p>
        <p>The Minnesota State Arts Board</p>
        `,
      };
    }
  }

  const result = await applicationContext
    .getPersistenceGateway()
    .sendEmail({ requestData, applicationContext });

  return result;
};
