const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  const info = await transporter.sendMail({
    from: `"${process.env.BREVO_FROM_NAME}" <${process.env.BREVO_FROM_EMAIL}>`,
    to,
    subject,
    html,
  });

  console.log("Email sent:", info.messageId);

  return info;
};

module.exports = {
  transporter,
  sendEmail,
};