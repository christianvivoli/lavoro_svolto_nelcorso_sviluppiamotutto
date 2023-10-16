const fs = require('fs');
const path = require('path');

const express = require('express');
const { log } = require('console');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extends: false}))

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/restaurants',function(req,res){
    const filePath = path.join(__dirname,'data','restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurant = JSON.parse(fileData);
    
    res.render('restaurants', { numberOfRestaurants: storedRestaurant.length});
});

app.post('/recommend', function (req,res){
    const restaurant = req.body;

    const filePath = path.join(__dirname,'data','restaurants.json');
    const fileData = fs.readFileSync(filePath);

    const storedRestaurant = JSON.parse(fileData);

    storedRestaurant.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurant));

    res.redirect('/confirm');
});

app.get('/recommend',function(req,res){
    res.render('recommend');
});

app.get('/confirm',function(req,res){
    res.render('confirm');
});

app.get('/about',function(req,res){
    res.render('about');
});

app.listen(3000);