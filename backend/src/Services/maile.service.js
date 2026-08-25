import { google } from 'googleapis';

// 1. Google API ko apni keys ke sath initialize karo
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground',
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    // 2. Email ka format set karna
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
      `From: Admin <${process.env.GOOGLE_USER}>`,
      `To: ${to}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      '',
      html || text,
    ];

    // 3. Message ko encode karna (Google ki strict requirement)
    const encodedMessage = Buffer.from(messageParts.join('\n'))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // 4. Email bhejna
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log('✅ Email sent successfully via Google API:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Google API Error:', error);
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
