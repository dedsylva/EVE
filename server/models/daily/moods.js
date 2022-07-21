const Joi = require('joi');
const mongoose = require('mongoose');

moodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  moodData: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10   
  },
  moodCount: {
    type: Number,
    required: false
  }
})

const Mood = mongoose.model('Mood', moodSchema);

function validateMood(mood) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    moodData: Joi.string().min(3).max(10).required(),
    moodCount: Joi.number()
  };

  return Joi.validate(mood, schema);
}


exports.Mood = Mood;
exports.validate = validateMood;