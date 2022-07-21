const Joi = require('joi');
const mongoose = require('mongoose');

todosSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  todoDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

const Todos = mongoose.model('Todos', todosSchema);

function validateTodo(todo) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    todoDate: Joi.date().required(),
  };

  return Joi.validate(todo, schema);
}


exports.Todos = Todos;
exports.validate = validateTodo;