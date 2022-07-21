const Joi = require('joi');
const mongoose = require('mongoose');

examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isDoctor: {
    type: Boolean,
    default: false
  },
  examDate: {
    type: Date,
    required: true
  },
  examType: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50   
  }
})

const Exam = mongoose.model('Exam', examSchema);

function validateExam(exam) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    examDate: Joi.date().required(),
    examType: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(exam, schema);
}


exports.Exam= Exam;
exports.validate = validateExam;