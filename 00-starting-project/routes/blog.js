const express = require('express');

const router = express.Router();

const db = require('../data/database');

router.get('/',function (req,res) {
    res.redirect('/posts');
});

router.get('/posts',function (req,res) {
    res.render('posts-list');
});

router.get('/new-post',function (req,res) {
    const [result] = await db.query('query');
    res.render('create-post', {result: result});
});  

module.exports = router;