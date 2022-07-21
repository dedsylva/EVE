const {Exam, validate} = require('../models/schedule/exams');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const exam = await Exam.find().sort('name');
  res.send(exam);
});


router.get('/:examDate', async (req, res) => {
  let exams = await Exam.find().sort('name');
  let finalResult = new Array;

  // TODO: Make this query better, mongoose should treat this date thing better
  for (let i = 0; i< exams.length; i++) {
   if (exams[i].examDate.toISOString().split('T')[0] === req.params.examDate) {
     finalResult.push(exams[i]);
   }
  }

  if (finalResult.length === 0) {
    return res.send({ results: 0 });
  } else {
    return res.send(finalResult);
  }
});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  let exam = new Exam({
    name: req.body.name, 
    examDate: req.body.examDate,
    examType: req.body.examType
  })

  exam = await exam.save();
  res.send(exam);

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const exam = await Exam.findByIdAndUpdate(req.params.id, { 
      name: req.body.name , examDate: req.body.examDate, examType: req.body.examType
      },
    { new: true }
    );

  if (!exam) return res.status(404).send('No exam with given ID was not found');

  res.send(exam);
});

router.delete('/:name/:examDate/:examType', async (req, res) => {
  let exams = await Exam.find({name: req.params.name, examType: req.params.examType});
  let results = [];

  if (exams.length == 0 ) return res.status(404).send('No exam with given information was not found');

  // Validate Date 
  for (let i = 0; i< exams.length; i++) {
    if (exams[i].examDate.toISOString().split('T')[0] === req.params.examDate.split('T')[0]) {
      results.push(exams[i]);
    }
  }

  // Delete by Id
  for (let i = 0; i< results.length; i++) {
    exams = await Exam.findByIdAndRemove(results[i]._id);
  }

  res.send(results);

});


module.exports = router;
