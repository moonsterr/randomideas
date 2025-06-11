const { text } = require('express');
const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add a text field'],
  },
  tag: {
    type: String,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // ← fix here
    required: true,
  },
  name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Idea', ideaSchema);
