const {Skin, validate} = require('../models/nn/skins');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const skin = await Skin.find().sort('name');
  res.send(skin);
});


router.get('/:name', async (req, res) => {
  let skin = await Skin.find({ name: req.params.name });

  if (skin.length == 0) return res.status(404).send('No skin condition with given name was not found');

  res.send(skin);
});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  let skin = new Skin({
    name: req.body.name, 
    skinDate: Date.now(),
    skinCancer: req.body.skinCancer
  })

  skin = await skin.save();
  res.send(skin);

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const skin = await Skin.findByIdAndUpdate(req.params.id, { name: req.body.name, skinDate: Date.now(), skinCancer: req.body.skinCancer},
    { new: true }
    );

  if (!skin) return res.status(404).send('No skin with given ID was not found');

  res.send(skin);
});

router.delete('/:id', async (req, res) => {
  const skin= await Skin.findByIdAndRemove(req.params.id);

  if (!skin) return res.status(404).send('No skin with given ID was not found');

  res.send(skin);
});


module.exports = router;
