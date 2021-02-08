import mongoose, { Schema } from 'mongoose'

const products = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    require: true
  },
  value: {
    type: String,
    require: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const Product = mongoose.model('products', products)

export { Product }
