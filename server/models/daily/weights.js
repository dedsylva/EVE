const Joi = require('joi');
const mongoose = require('mongoose');

weightsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  weightDate: {
    type: Date,
    required: false,
    default: Date.now
  },
  weightValue: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50   
  }
})

const Weights = mongoose.model('Weights', weightsSchema);

function validateWeight(weight) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    weightDate: Joi.date(),
    weightValue: Joi.string().min(2).max(50).required()
  };

  return Joi.validate(weight, schema);
}


exports.Weights= Weights;
exports.validate = validateWeight;