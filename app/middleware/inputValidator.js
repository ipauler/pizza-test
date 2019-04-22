const Joi = require('joi');
const constans = require('./../config/constants.json');

const _validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
};
const _orderItemSchema = Joi.object().keys({
  type: Joi.string(),
  size: Joi.string(),
  count: Joi.number(),
});

const _orderSchema = Joi.object().keys({
  items: Joi.array().items(
    Joi.object().keys({
      type: Joi.string().required(),
      size: Joi.string().required(),
      count: Joi.number().required(),
    })
  ),
  customer: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().required(),
  })
});
const _updateOrderSchema = Joi.object().keys({
  status: Joi.number().valid(Object.values(constans.ORDER_STATUS))
});

const validate = (schema) => {
  return (req, res, next) => {
    return Joi.validate(req.body, schema, _validationOptions, (err, data) => {
      if (err) {
        const JoiError = {
          status: 'failed',
          error: {
            details: err.details.map(({ message, type }) => ({
              message: message.replace(/['"]/g, '')
            }))
          }
        };
        res.status(422).json(JoiError);
      } else {
        req.body = data;
        next();
      }
    });
  }
}

module.exports = {
  createOrder: validate(_orderSchema),
  updateOrder: validate(_updateOrderSchema),
  orderItem: validate(_orderItemSchema)
}