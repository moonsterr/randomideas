const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// require('dotenv').config();

router.post('/create', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).send({ success: true, data: 'User created succesfuly' });
  } catch (error) {
    res.status(500).send({ success: false, data: error });
  }
});
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send({ success: false, data: 'user' });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).send({ success: false, data: 'password' });
    }
    console.log(process.env.JWT_SECRET);

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(401).send({ success: false, resource: `Something went wrong` });
  }
});
module.exports = router;
