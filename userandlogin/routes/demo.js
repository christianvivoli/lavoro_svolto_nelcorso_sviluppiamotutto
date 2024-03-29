const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  let sessionInputData = req.session.inputData;

  if(!sessionInputData){
    sessionInputData = {
      hasError: false,
      email:'',
      confirmEmail:'',
      password:''
    };
  }

  req.session.inputData = null;

  res.render('signup', {inputData: sessionInputData});
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredConfirmEmail = userData['confirm-email'];
  const enteredPassword = userData.password;

  if (
    !enteredEmail || 
    !enteredConfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim() < 6 ||
    enteredEmail !== enteredConfirmEmail || 
    enteredEmail.includes('@')
    ) {
    console.log('dati non convalidati');

  req.session.inputData = {
    hasError: true,
    message: 'invalid input -please check yuor data',
    email: enteredEmail,
    enteredConfirmEmail: enteredConfirmEmail,
    password: enteredPassword
  }

  req.session.save(function () {
    res.redirect('/signup');
  });
  return;
    // return res.redirect('/signup');
  }

  const existingUser = await db.getDb().collection('user').findOne({ email: enteredEmail })
  if (existingUser) {
    console.log('email gia esistente');
    return res.redirect('/signup');
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword
  };

  await db.getDb().collection('user').insertOne(user);

  res.redirect('/login');
});

router.post('/login', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = await db.getDb().collection('user').findOne({ email: enteredEmail });

  if (!existingUser) {
    console.log('non sei entrato, email sbagliata');
    return res.redirect('/login');
  }

  const passwordsAreEqual = await bcrypt.compare(enteredPassword, existingUser.password);

  if (!passwordsAreEqual) {
    console.log('non sei entrato, password sbagliata');
    return res.redirect('/login');
  }

  req.session.user = { id: existingUser._id, email: existingUser.email};
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect('/profile');
  });
});

router.get('/admin',async function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).rende('401');
  }

  const user =await db.getDb.collection('users').findOne({_id: req.session.user.id})

  if(!user || !user.isAdmin){
    res.status(403).render('403');
  }
  res.render('admin');
});

router.get('/profile', function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).rende('401');
  }

  res.render('profile');
});

router.post('/logout', function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
});

module.exports = router;
