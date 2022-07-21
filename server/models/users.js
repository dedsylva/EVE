const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    unique: true
  },
  isAdmin: Boolean
  // TODO: roles: [], and create middleware for checking vallid roles
  // TODO: roles for read-only (doctor reading pacients info)
});

// Adding new method to the user object
// Because this will be a method of user, we use this
// Because we use this, we have to put function (can't use => syntax)
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, 
    config.get('dedsPrivateKey'));

}

const User = mongoose.model('User', userSchema);


function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
