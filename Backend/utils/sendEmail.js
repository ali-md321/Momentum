const sgMail = require('@sendgrid/mail');
const ErrorHandler = require('./errorhandler');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {

  const msg = {
    to: options.email,
    from: process.env.SENDGRID_MAIL,
    templateId: options.templateId,
    dynamic_template_data: options.data,
  };

  try {
    const data = await sgMail.send(msg);
    console.log("✅ Email sent to", options.email);
  } catch (error) {
    console.error("❌ SendGrid Error:", error?.response?.body || error.message);
    throw new ErrorHandler("Email failed to send",400);
  }
};

module.exports = sendEmail;
