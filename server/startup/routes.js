const express = require('express');
const exams = require('../routes/exam');
const pills = require('../routes/pill');
const todos = require('../routes/todo');
const appts = require('../routes/appointment');
const weights = require('../routes/weight');
const hearts = require('../routes/heart');
const moods = require('../routes/mood');
const diseases = require('../routes/disease');
const skin = require('../routes/skin');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function (app) {
app.use(express.json());
app.use('/api/exams', exams);
app.use('/api/pills', pills);
app.use('/api/todos', todos);
app.use('/api/appts', appts);
app.use('/api/weights', weights);
app.use('/api/hearts', hearts);
app.use('/api/moods', moods);
app.use('/api/diseases', diseases);
app.use('/api/skin', skin);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Express middleware function, always at the end of the middleware functions
app.use(error);
}
