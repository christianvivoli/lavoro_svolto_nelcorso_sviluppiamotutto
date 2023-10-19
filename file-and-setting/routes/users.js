const express = require('express');
const multer = require('multer');

const upload = nulter({dest: });
const router = express.Router();

router.get('/', function(req, res) {
  res.render('profiles');
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profile', upload.single('image'), function (req, res) {
  const upload = req.file;
  const userData = req.body;
});

module.exports = router;