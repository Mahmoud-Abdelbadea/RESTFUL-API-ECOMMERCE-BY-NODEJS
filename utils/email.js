const nodemailer = require('nodemailer');
const sendGridTransport=require('nodemailer-sendgrid-transport')

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport(sendGridTransport({
    auth:{
      api_key:process.env.SENDGRID_API_KEY
    }
  })
  
  );

  // 2) Define the email options
  const mailOptions = {
    from: 'Ecommerce<projectsandprojects475@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
