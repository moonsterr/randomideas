const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const authenticateToken = require('../middleware/authentication');
//get all ideas
router.get('/', authenticateToken, async (req, res) => {
  try {
    const ideas = await Idea.find();
    console.log(req.user);
    res.status(200).json({
      success: true,
      data: ideas,
      user: req.user.userId,
      username: req.user.username,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, resource: `Something went wrong $${error}` });
  }
});
//get specific idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res
        .status(500)
        .json({ success: false, message: 'Idea not found' });
    }
    res.status(200).json({ success: true, data: idea });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Something went wrong: ${error.message}`,
    });
  }
});
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { text, tag, name } = req.body;
    if (!text) {
      return res
        .status(500)
        .json({ success: false, message: 'Text is required' });
    }
    if (!tag) {
      return res
        .status(500)
        .json({ success: false, message: 'Text is required' });
    }
    const newIdea = new Idea({
      text,
      tag,
      author: req.user.userId,
      name: req.user.username,
    });
    const savedIdea = await newIdea.save();
    res.status(200).json({ success: true, data: savedIdea });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea || idea.author.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ success: false, message: 'Not authorized' });
    }
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedIdea });
  } catch (error) {
    res.status(500).json(`something went wrong ${error}`);
  }
});
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea || idea.author.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    const deletedIdea = await Idea.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Idea deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
