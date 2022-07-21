const {Weights, validate} = require('../models/daily/weights');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const weight = await Weights.find().sort('name');
  res.send(weight);
});


router.get('/:name', async (req, res) => {
  let weight = await Weights.find({ name: req.params.name });
  res.send(weight);

});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  let weight = new Weights({
    name: req.body.name, 
    weightDate: req.body.weightDate,
    weightValue: req.body.weightValue,
  })

  weight = await weight.save();
  res.send(weight);

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const weight = await Weights.findByIdAndUpdate(req.params.id, 
    { name: req.body.name,
      weightDate: Date.now(),
      weightValue: req.body.weightValue,
    },
    { new: true }
    );

  if (!weight) return res.status(404).send('No weight with given ID was not found');

  res.send(weight);
});

router.delete('/:id', async (req, res) => {
  const weight = await Weights.findByIdAndRemove(req.params.id);
  if (!weight) return res.status(404).send('No weight with given ID was not found');

  res.send(weight);
});


module.exports = router;
