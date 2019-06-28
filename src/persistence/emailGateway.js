'use strict';
const nodemailer = require('nodemailer');
let transporter = undefined;

const sendMail = async ({ to, subject, bodyText, applicationContext }) => {
  // create reusable transporter object using the default SMTP transport
  if (transporter == undefined) {
    transporter = nodemailer.createTransport({
      service: 'Outlook365',
      logger: applicationContext.shouldLogMailer(), // true:false
      debug: applicationContext.shouldDebugLogMailer(), // true:false
      auth: {
        user: applicationContext.getMailCredentials().user,
        pass: applicationContext.getMailCredentials().pass,
      },
    });
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: applicationContext.getMailFrom(), // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: bodyText, // plain text body
    html: `<p>${bodyText}</p>`, // html body
  });
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

module.exports = { sendMail };
