import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    
  },
});




transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

export const sendEmail = async ({ to, subject, html, text }) => {
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  };



  try {
    const details = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', details);
    return details;
  } catch (error) {
    console.error('❌ EXACT MAIL ERROR DETAILS:');
    console.error('Error Code:', error.code); // e.g. EAUTH
    console.error('Error Command:', error.command); // e.g. AUTH LOGIN / AUTH PLAIN
    console.error('Response Message:', error.response); // Gmail ka exact reason
    console.error('Full Error Object:', error);
    throw error;
  }
};
