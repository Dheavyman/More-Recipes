import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  }
});

const sendEmail = (to, subject, message) => {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to,
    subject,
    text: message,
  };

  transport.sendMail(mailOptions);
};

export default sendEmail;
