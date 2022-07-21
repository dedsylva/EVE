const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort('name');
    if (users.length === 0)
      return res.send('No users in the database');

    for (let i = 0; i< users.length; i++) {
      res.send(_.pick(users[i], ['_id', 'name', 'email']));
    }
  }
  catch (err) {
    res.status(400).send(err);
  }
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  // Returning a JSON Web Token (for identifying user)
  // jwt.sign(payload, private_key)
  const token = user.generateAuthToken();
  res.send(token);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name },
    { new: true }
    );

  if (!user) return res.status(404).send('The user with the given ID was not found');

  res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found');

  res.send(_.pick(user, ['_id', 'name', 'email']));
});


function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}


module.exports = router;