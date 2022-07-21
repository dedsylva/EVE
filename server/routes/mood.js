const {Mood, validate} = require('../models/daily/moods');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const mood = await Mood.find().sort('name');
  res.send(mood);
});


router.get('/:name', async (req, res) => {
  let mood = await Mood.find({ name: req.params.name });
  res.send(mood);

});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  let mood = new Mood({
    name: req.body.name, 
    moodData: req.body.moodData,
    moodCount: req.body.moodCount
  })

  mood = await mood.save();
  res.send(mood);

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const mood = await Mood.findByIdAndUpdate(req.params.id, { name: req.body.name , moodData: req.body.moodData},
    { new: true }
    );

  if (!mood) return res.status(404).send('No mood with given ID was not found');

  res.send(mood);
});

router.delete('/:id', async (req, res) => {
  const mood = await Mood.findByIdAndRemove(req.params.id);
  if (!mood) return res.status(404).send('No mood with given ID was not found');

  res.send(mood);
});


module.exports = router;
