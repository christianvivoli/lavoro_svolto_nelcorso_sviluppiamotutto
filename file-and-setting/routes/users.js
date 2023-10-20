const express = require('express');
const multer = require('multer');

const db = require('../data/database');

const storageConfig =multer.diskstorage({
  destination: function (req,file,cb) {
    cb(null, 'images');
  },
  filename: function(req,file,cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
}) 

const upload = nulter({storage: storageConfig });
const router = express.Router();

router.get('/',async function(req, res) {
  const users = db.getDb().collection('users').find().toArray();
  res.render('profiles', {users: users});
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profile', upload.single('image'), function (req, res) {
  const upload = req.file;
  const userData = req.body;

  db.getDb().collection('users').insertOne({
    name: userData.username,
    imagePath: uploadImageFile.path
  });

  res.redirect('/');
});

module.exports = router;