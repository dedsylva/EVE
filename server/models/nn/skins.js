const Joi = require('joi');
const mongoose = require('mongoose');

skinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  skinDate: {
    type: Date,
    required: false,
    default: Date.now
  },
  skinCancer: {
    type: Boolean,
    required: true,
  },
})

const Skin = mongoose.model('Skin', skinSchema);

function validateSkin(skin) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    skinDate: Joi.date(),
    skinCancer: Joi.bool().required(),
  };

  return Joi.validate(skin, schema);
}


exports.Skin = Skin;
exports.validate = validateSkin;