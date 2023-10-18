const path = require('path');

const express = require('express');

const defautlRoutes = require('./routes/default');
const restaurantRout = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', defautlRoutes);

app.use('/',restaurantRout);

app.use(function(req,res) {
  res.status(404).render('404');
});

// app.use(function(error,req,res,next) {
//   res.status(500).render('500');
// });

app.listen(3000);