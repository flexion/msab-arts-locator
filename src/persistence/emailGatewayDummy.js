const sendEmail = async ({ applicationContext, requestData }) => {
  console.log({
    from: applicationContext.emailConfig.from,

    // plain text body
    html: `<p>${requestData.body}</p>`,

    // list of receivers
    subject: requestData.subject,

    // Subject line
    text: requestData.body,

    // sender address
    to: requestData.to, // html body
  });
  return { dummyEmail: true };
};

module.exports = { sendEmail };
