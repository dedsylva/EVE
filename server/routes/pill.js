const {Pill, validate, AvailablePill, validateAvailable} = require('../models/schedule/pills');
const express = require('express');
const router = express.Router();


// ** PILLS avaiable ** \\

router.get('/available/', async (req, res) => {
  const avPill = await AvailablePill.find().sort('name');
  res.send(avPill);
});

router.post('/available/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  let avPill= new AvailablePill({
    name: req.body.name, 
    frequency: req.body.frequency
  })

  avPill= await avPill.save();
  res.send(avPill);

});

router.put('/available/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const avPill= await Pill.findByIdAndUpdate(req.params.id, { name: req.body.name , frequency: req.body.frequency},
    { new: true }
    );

  if (!avPill) return res.status(404).send('No pill with given ID was not found');

  res.send(avPill);
});

router.delete('/available/:name', async (req, res) => {
  let avPill = await AvailablePill.find({ name: req.params.name});

  if (avPill.length == 0) return res.status(404).send('No pill with given name was not found');

  avPill= await AvailablePill.deleteOne({name: req.params.name});

  res.send(avPill);
});



// ** PILLS user takes ** \\

router.get('/', async (req, res) => {
  const pill = await Pill.find().sort('name');
  res.send(pill);
});


router.get('/:name', async (req, res) => {
  let pill = await Pill.find({ name: req.params.name });
  res.send(pill);

});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  let pill = new Pill({
    name: req.body.name, 
    frequency: req.body.frequency
  })

  pill = await pill.save();
  res.send(pill);

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const pill = await Pill.findByIdAndUpdate(req.params.id, { name: req.body.name , frequency: req.body.frequency},
    { new: true }
    );

  if (!pill) return res.status(404).send('No pill with given ID was not found');

  res.send(pill);
});

router.delete('/:name', async (req, res) => {
  let pill = await Pill.find({name: req.params.name});

  if (pill.length == 0) return res.status(404).send('No pill with given name was not found');

  pill = await Pill.deleteOne({name: req.params.name});

  res.send(pill);

});


module.exports = router;
