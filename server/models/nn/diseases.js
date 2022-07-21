const Joi = require('joi');
const mongoose = require('mongoose');

diseasesShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  diseaseDate: {
    type: Date,
    required: false,
    default: Date.now
  },
  diseaseData: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50   
  },
})

const Diseases = mongoose.model('Diseases', diseasesShema);

function validateDisease(disease) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    diseaseDate: Joi.date(),
    diseaseData: Joi.string().min(2).max(50).required(),
  };

  return Joi.validate(disease, schema);
}


exports.Diseases = Diseases;
exports.validate = validateDisease;