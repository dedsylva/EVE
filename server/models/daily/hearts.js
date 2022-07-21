const Joi = require('joi');
const mongoose = require('mongoose');

heartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  heartDate: {
    type: Date,
    required: false,
    default: Date.now
  },
  systolicData: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 5   
  },
  diastolicData: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 5   
  },
  pulseData: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 5   
  }
})

const Heart = mongoose.model('Heart', heartSchema);

function validateHeart(heart) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    heartDate: Joi.date(),
    systolicData: Joi.string().min(2).max(5).required(),
    diastolicData: Joi.string().min(2).max(5).required(),
    pulseData: Joi.string().min(2).max(5).required()
  };

  return Joi.validate(heart, schema);
}


exports.Heart = Heart;
exports.validate = validateHeart;