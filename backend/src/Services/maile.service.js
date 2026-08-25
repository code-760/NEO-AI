
import { Resend } from 'resend';

// Resend ko API key ke sath initialize karo
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html,}) => {
  try {
    const data = await resend.emails.send({
      // Free tier me 'from' address yahi same rakhna padta hai
      from: 'onboarding@resend.dev',
      to: to,
      subject: subject,
      html: html,
    });

    console.log('Email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Resend API Error:', error);
    throw error;
  }
};


















// import nodemailer from 'nodemailer';

// const resend = new Resend(process.env.RESEND_API_KEY);

// const transporter = nodemailer.createTransport({
//  service: 'gmail',
//   family: 4,
//   auth: {
//     type: 'OAuth2',
//     user: process.env.GOOGLE_USER,
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error connecting to email server:', error);
//   } else {
//     console.log('Email server is ready to send messages');
//   }
// });

// export const sendEmail = async ({ to, subject, html, text }) => {
//   const mailOptions = {
//     from: process.env.GOOGLE_USER,
//     to,
//     subject,
//     html,
//     text,
//   };

//   try {
//     const details = await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully:', details);
//     return details;
//   } catch (error) {
//     console.error('❌ EXACT MAIL ERROR DETAILS:');
//     console.error('Error Code:', error.code); // e.g. EAUTH
//     console.error('Error Command:', error.command); // e.g. AUTH LOGIN / AUTH PLAIN
//     console.error('Response Message:', error.response); // Gmail ka exact reason
//     console.error('Full Error Object:', error);
//     throw error;
//   }
// };
