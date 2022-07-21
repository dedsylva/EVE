const {Todos, validate} = require('../models/schedule/todos');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const todo = await Todos.find().sort('name');
  res.send(todo);
});

router.get('/:todoDate', async (req, res) => {
  let todos = await Todos.find().sort('name');
  let finalResult = new Array;

  // TODO: Make this query better, mongoose should treat this date thing better
  for (let i = 0; i< todos.length; i++) {
   // TODO: Check if we need this split. If we pass URL string like :todoDate=2022-01-22 we do
   // But with postman there is a way of sending key,value pairs.
    if (todos[i].todoDate.toISOString().split('T')[0] === req.params.todoDate.split('=')[1]) {
     finalResult.push(todos[i]);
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

  let todo = new Todos({
    name: req.body.name, 
    todoDate: req.body.todoDate
  })

  todo = await todo.save();
  res.send(todo);

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todos.findByIdAndUpdate(req.params.id, { name: req.body.name , todoDate: req.body.todoDate},
    { new: true }
    );

  if (!todo) return res.status(404).send('No todo with given ID was not found');

  res.send(todo);
});

router.delete('/:name/:todoDate', async (req, res) => {

  let todos = await Todos.find({name: req.params.name, todoDate: req.params.todoDate});
  let results = [];

  if (todos.length == 0 ) return res.status(404).send('No todo with given information was not found');

  // Validate Date 
  for (let i = 0; i< todos.length; i++) {
    if (todos[i].todoDate.toISOString().split('T')[0] === req.params.todoDate.split('T')[0]) {
      results.push(todos[i]);
    }
  }

  // Delete by Id
  for (let i = 0; i< results.length; i++) {
    todos = await Todos.findByIdAndRemove(results[i]._id);
  }

  res.send(results);



  
});


module.exports = router;
