import Joi from 'joi';

export const RegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),
});

export const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});
