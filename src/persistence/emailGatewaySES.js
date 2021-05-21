// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

const sendEmail = async ({ applicationContext, requestData }) => {
  // Create sendEmail params
  let params = {
    Destination: {
      /* required */
      CcAddresses: [],
      ToAddresses: [
        applicationContext.emailConfig.from,
        /* more items */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: requestData.body,
        },
        Text: {
          Charset: 'UTF-8',
          Data: requestData.body,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: requestData.subject,
      },
    },
    ReplyToAddresses: [
      applicationContext.emailConfig.from,
      /* more items */
    ] /* required */,
    Source: applicationContext.emailConfig.from,
  };

  // Create the promise and SES service object
  let sendPromise = new AWS.SES({ apiVersion: '2010-12-01' })
    .sendEmail(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  await sendPromise
    .then(function (data) {
      console.log(data.MessageId);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });
};

module.exports = { sendEmail };
