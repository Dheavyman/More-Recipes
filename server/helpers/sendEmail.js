import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  }
});

/**
 * Function to send email messages
 *
 * @param {string} to - The recipient address
 * @param {string} subject - Message subject
 * @param {string} message - Message body
 *
 * @returns {any} Sends mail
 */
const sendEmail = (to, subject, message) => {
  const mailOptions = {
    from: `"No-reply" <${process.env.ADMIN_EMAIL}>`,
    to,
    subject,
    text: message,
  };

  transport.sendMail(mailOptions);
};

export default sendEmail;
