const {Heart, validate} = require('../models/daily/hearts');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const heart = await Heart.find().sort('name');
  res.send(heart);
});


router.get('/:name', async (req, res) => {
  let heart = await Heart.find({ name: req.params.name });
  res.send(heart);

});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  let heart = new Heart({
    name: req.body.name, 
    heartDate: req.body.heartDate,
    systolicData: req.body.systolicData,
    diastolicData: req.body.diastolicData,
    pulseData: req.body.pulseData
  })

  heart = await heart.save();
  res.send(heart);

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const heart = await Heart.findByIdAndUpdate(req.params.id, 
    { name: req.body.name,
      heartDate: Date.now(),
      systolicData: req.body.systolicData,
      diastolicData: req.body.diastolicData,
      pulseData: req.body.pulseData
    },
    { new: true }
    );

  if (!heart) return res.status(404).send('No heart with given ID was not found');

  res.send(heart);
});

router.delete('/:id', async (req, res) => {
  const heart = await Heart.findByIdAndRemove(req.params.id);
  if (!heart) return res.status(404).send('No heart with given ID was not found');

  res.send(heart);
});


module.exports = router;
