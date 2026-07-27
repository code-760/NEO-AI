import { body, validationResult } from 'express-validator';

/**
 * Middleware to handle validation errors
 */

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      success: false,
      errors: errors.array().reduce((acc, err) => {
        acc[err.param] = err.msg;
        return acc;
      }, {}),
    });
  }
  next();
};

/**
 * Registration validation rules
 */
export const registerValidationRules = () => {
  return [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters'),
      // .matches(/^[a-zA-Z0-9_-]+$/)
      // .withMessage('Username can only contain letters, numbers, underscores, and hyphens'),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8, max: 128 })
      .withMessage('Password must be between 8 and 128 characters'),
      // .matches(/[A-Z]/)
      // .withMessage('Password must contain at least one uppercase letter')
      // .matches(/[a-z]/)
      // .withMessage('Password must contain at least one lowercase letter')
      // .matches(/[0-9]/)
      // .withMessage('Password must contain at least one number')
      // .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
      // .withMessage('Password must contain at least one special character'),

    validate,
  ];
};

/**
 * Login validation rules
 */
export const loginValidationRules = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),

    body('password').notEmpty().withMessage('Password is required'),

    validate,
  ];
};
