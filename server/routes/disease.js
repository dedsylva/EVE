const {Diseases, validate} = require('../models/nn/diseases');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const disease = await Diseases.find().sort('name');
  res.send(disease);
});


router.get('/:name', async (req, res) => {
  let disease = await Diseases.find({ name: req.params.name });

  if (disease.length == 0) return res.status(404).send('No disease with given name was not found');

  res.send(disease);

});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  let disease = new Diseases({
    name: req.body.name, 
    diseaseDate: Date.now(),
    diseaseData: req.body.diseaseData
  })

  disease = await disease.save();
  res.send(disease);

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const disease = await Diseases.findByIdAndUpdate(req.params.id, { name: req.body.name, diseaseDate: Date.now(), diseaseData: req.body.diseaseData},

    { new: true }
    );

  if (!disease) return res.status(404).send('No disease with given ID was not found');

  res.send(disease);
});

router.delete('/:id', async (req, res) => {
  const disease = await Diseases.findByIdAndRemove(req.params.id);

  if (!disease) return res.status(404).send('No disease with given ID was not found');

  res.send(disease);
});


module.exports = router;
