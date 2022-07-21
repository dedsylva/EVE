const Joi = require('joi');
const mongoose = require('mongoose');

apptSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  apptDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  apptType: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50   
  }
})

const Appt = mongoose.model('Appt', apptSchema);

function validateAppt(appt) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    apptDate: Joi.date().required(),
    apptType: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(appt, schema);
}


exports.Appt= Appt;
exports.validate = validateAppt;