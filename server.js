const express = require('express');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDb = require('./config/db.js');
const cors = require('cors');
// console.log('MONGO_URI:', process.env.MONGO_URI);
connectDb();
const app = express();
app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to RandomIdeas API' });
// });
const routerIdeas = require('./routes/ideas.js');
app.use('/app/ideas', routerIdeas);
const routerUsers = require('./routes/users.js');
app.use('/app/users', routerUsers);

app.listen(port, () => console.log('hi'));
