const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/users');
const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');

// See which user is current logged in
router.get('/me', auth, async (req,res) => {
   // exclude showing password
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
})

router.get('/', async (req, res) => {
  const results = [];
  try {
    const users = await User.find().sort('name');
    if (users.length === 0)
      return res.send('No users in the database');

    for (let i = 0; i< users.length; i++) {
      results.push(_.pick(users[i], ['_id', 'name', 'email']));
    }
    res.send(results);
  }
  catch (err) {
    res.status(400).send(err);
  }
});

router.get('/:id', validateObjectId, auth, async (req, res) => {

  const user= await User.findById(req.params.id);
  if (!user) return res.status(404).send('The user with given ID was not found');

  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = await User.findOne({ name: req.body.name});
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  const token = user.generateAuthToken();

  // lets not send the user their password, I think thats a good choice
  // send in the header the user's token
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

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

module.exports = router;
