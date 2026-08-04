import jwt from 'jsonwebtoken';
import userModel from '../model/user.model.js';
import { sendEmail } from '../Services/maile.service.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const isuserExsit = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isuserExsit) {
    return res.status(400).json({
      message: 'User with this email or username already exists',
      success: false,
      err: 'User already exists',
    });
  }
  

  const user = await userModel.create({ username, email, password });

  const emailVerificationToken = await jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  await sendEmail({
    to: email,
    subject: 'Welcome to NEO Ai!',
    html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                 <a href="http://localhost:3000/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>Best regards,<br>The Perplexity Team</p>
        `,
  });

  res.status(200).json({
    message: 'User registered successfully',
    success: true,
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: 'Invalid email or password',
      success: false,
      err: 'User not found',
    });
  }


  const isPasswordMatch = await user.comparePassword(password);


  if (!isPasswordMatch) {
    return res.status(401).json({
      message: 'Invalid password',
      success: false,
      err: 'Incorrect password',
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: 'Please verify your email before logging in',
      success: false,
      err: 'Email not verified',
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );

  res.cookie('token', token);

  res.status(200).json({
    message: 'Login successful',
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};


export const getme = async (req, res) => {

  console.log(req.user)
  try {
    const user = await userModel.findById(req.user.id).select('-password');


    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
        err: 'User not found',
      });
    }

    res.status(200).json({
      message: 'User fetched successfully',
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error fetching user',
      success: false,
      err: err.message,
    });
  }
}

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decode.email });

    if (!user) {
      return res.status(404).json({
        message: 'Invalid token',
        success: false,
        err: 'User not found',
      });
    }

    user.verified = true;

    await user.save();

    const html = `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:3000/login">Go to Login</a>
    `;

    return res.send(html);
  } catch (err) {
    return res.status(400).json({
      message: 'Invalid or expired token',
      success: false,
      err: err.message,
    });
  }
};

