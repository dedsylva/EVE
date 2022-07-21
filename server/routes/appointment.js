const {Appt, validate} = require('../models/schedule/appointments');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	const appt = await Appt.find().sort('name');
	res.send(appt);
});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  let appt = new Appt({
    name: req.body.name, 
    apptDate: req.body.apptDate,
    apptType: req.body.apptType
  })

  appt = await appt.save();
  res.send(appt);

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const appt = await Appt.findByIdAndUpdate(req.params.id, { name: req.body.name , apptDate: req.body.apptDate},
    { new: true }
    );

  if (!appt) return res.status(404).send('No appointments with given ID was not found');

  res.send(appt);
});

router.delete('/:id', async (req, res) => {
  const appt = await Appt.findByIdAndRemove(req.params.id);

  if (!appt) return res.status(404).send('No appointments with given ID was not found');

  res.send(appt);
});


module.exports = router;
