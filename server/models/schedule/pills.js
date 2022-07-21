const Joi = require('joi');
const mongoose = require('mongoose');

pillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  frequency: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 50,
    default: 'daily'  
  }
})

availablePillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  frequency: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 50,
    default: 'daily'  
  }
})

const Pill = mongoose.model('Pill', pillSchema);
const AvailablePill = mongoose.model('AvailablePill', availablePillSchema);

function validatePill(pill) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    frequency: Joi.string().min(5).max(50)
  };

  return Joi.validate(pill, schema);
}

function validateAvailablePill(avp) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    frequency: Joi.string().min(5).max(50)
  };

  return Joi.validate(avp, schema);
}


exports.Pill = Pill;
exports.AvailablePill= AvailablePill;
exports.validate = validatePill;
exports.validateAvailable = validateAvailablePill;