'use strict';
const nodemailer = require('nodemailer');
let transporter = undefined;

const sendEmail = async ({ applicationContext, requestData }) => {
  // create reusable transporter object using the default SMTP transport

  const emailConfig = {
    service: 'gmail',
    ...applicationContext.emailConfig,
  };

  if (transporter == undefined) {
    transporter = nodemailer.createTransport(emailConfig);
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
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
  console.log('email info: ', info);
  return info;
};

// const debugContext = {
//   shouldLogMailer: () => {
//     return true;
//   },
//   shouldDebugLogMailer: () => {
//     return true;
//   },
//   getMailCredentials: () => {
//     return {
//       user: 'someone@example.com',
//       pass: 'l33tp455',
//     };
//   },
//   getMailFrom: () => {
//     return 'someone@example.com';
//   },
// };

// sendMail({
//   to: 'someone.else@domain.com',
//   subject: 'sendMail ✔',
//   bodyText: 'Howdy!',
//   applicationContext: debugContext,
// }).catch(console.error);

module.exports = { sendEmail };
