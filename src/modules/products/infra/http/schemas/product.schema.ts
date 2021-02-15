import { Joi } from 'celebrate'

export const ParamsSchema = { id: Joi.string().required() }

export const BodySchema = {
  id: Joi.string().optional().allow('', null),
  name: Joi.string().required(),
  description: Joi.string().required(),
  value: Joi.string().required(),
  active: Joi.string().optional().allow('', null)
}
