const Joi = require('joi');

const expenseValidation = {
  create: Joi.object({
    amount: Joi.number().required().min(0),
    description: Joi.string().required().min(3),
    category: Joi.string().required().valid(
      'Food',
      'Transportation',
      'Entertainment',
      'Utilities',
      'Shopping',
      'Other'
    )
  }),

  update: Joi.object({
    amount: Joi.number().min(0),
    description: Joi.string().min(3),
    category: Joi.string().valid(
      'Food',
      'Transportation',
      'Entertainment',
      'Utilities',
      'Shopping',
      'Other'
    )
  })
};

const userValidation = {
  register: Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6)
  }),

  login: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
};

module.exports = {
  expenseValidation,
  userValidation
};
