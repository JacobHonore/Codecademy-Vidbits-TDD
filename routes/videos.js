const router = require('express').Router();

module.exports = router;

// Catch post to videos and return 201
router.post('/', function(req, res) {
  res.sendStatus(201);
});
