'use strict';
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
let transporter = undefined;

const sendEmail = async ({ applicationContext, requestData }) => {
  // create reusable transporter object using the default SMTP transport
  const emailConfig = smtpTransport({
    host: applicationContext.emailConfig.smtpHost,
    port: applicationContext.emailConfig.smtpPort,
  });

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

module.exports = { sendEmail };
