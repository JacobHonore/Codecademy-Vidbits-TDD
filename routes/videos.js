const router = require('express').Router();
const Video = require('../models/video')
module.exports = router;

// Catch post to videos and return 201
router.post('/', async function(req, res) {
  const {title, description} = req.body;
  const newVideo = new Video({title, description});
  newVideo.validateSync();
  if (newVideo.errors) {
    res.sendStatus(400);
  }
  else {
    await newVideo.save();
  }
  res.status(201).render('videos/show', {video: newVideo});
});

router.get('/create', async function(req, res) {
  res.render('videos/create');
});
