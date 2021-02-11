import { Joi } from 'celebrate'

export const ParamsSchema = { id: Joi.string().required() }

export const BodySchema = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  value: Joi.string().required()
}
