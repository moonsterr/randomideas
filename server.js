const express = require('express');
const port = 5000;
const app = express();
const ideas = [
  {
    id: '1',
    title: 'Solar-Powered Backpack',
    type: 'Invention',
    content: 'A backpack that charges your devices using solar panels.',
    authorId: 'user123',
  },
  {
    id: '2',
    title: 'Daily Joke Bot',
    type: 'Joke',
    content: 'A bot that sends you a new joke every day to brighten your mood.',
    authorId: 'user456',
  },
  {
    id: '3',
    title: 'Virtual Study Group',
    type: 'Idea',
    content: 'An online platform for students to create and join study groups.',
    authorId: 'user789',
  },
  {
    id: '4',
    title: 'Smart Plant Watering System',
    type: 'Invention',
    content: 'Automates watering your plants based on soil moisture sensors.',
    authorId: 'user123',
  },
  {
    id: '5',
    title: 'Healthy Snack Subscription',
    type: 'Business',
    content: 'Monthly delivery of healthy snacks tailored to your diet.',
    authorId: 'user321',
  },
  {
    id: '6',
    title: 'AI-Powered Resume Builder',
    type: 'Idea',
    content: 'Helps users create professional resumes with AI suggestions.',
    authorId: 'user654',
  },
  {
    id: '7',
    title: 'Recycling Awareness Campaign',
    type: 'Campaign',
    content: 'Promotes recycling through community events and education.',
    authorId: 'user456',
  },
  {
    id: '8',
    title: 'Interactive Storytelling App',
    type: 'Idea',
    content: 'An app where users can co-create stories with friends.',
    authorId: 'user987',
  },
  {
    id: '9',
    title: 'Language Exchange Platform',
    type: 'Business',
    content: 'Connects people wanting to learn languages through video chat.',
    authorId: 'user123',
  },
  {
    id: '10',
    title: 'Eco-Friendly Packaging',
    type: 'Invention',
    content: 'Develop biodegradable packaging materials for products.',
    authorId: 'user654',
  },
];

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to RandomIdeas API' });
});
//get all ideas
app.get('/api/ideas', (req, res) => {
  res.json({ succes: true, data: ideas });
});
//get specific idea
app.get('/api/ideas/:id', (req, res) => {
  const idea = ideas.find((idea) => +idea.id === +req.params.id);
  if (!idea) {
    return res.status(404).json({ success: false, resource: 'not found' });
  }
  res.json({ success: true, data: idea });
});
app.listen(port, () => console.log('hi'));
