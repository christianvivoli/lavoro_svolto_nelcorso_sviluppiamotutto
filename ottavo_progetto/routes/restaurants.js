const express = require('express'); 
const uuid = require('uuid');

const router = express.Router();
const resData = require('../util/restaurant-data');

router.get('/restaurants', function (req, res) {
    let order = req.query.order;
    let nextOrder = 'desc';

    if(order !=='asc' && order !== 'desc'){
        order = 'asc';
    }

    if(order === 'desc'){
        nextOrder = 'asc'; 
    }

    const storedRestaurants = resData.getStoreRestaurants();
  
    storedRestaurants.sort(function (reA, reB) {
        if((order === 'asc' && reA.name > reB.name) || (order === 'desc' && reA.name < reB.name)){
            return 1;
        }
        return -1;
    });

    res.render('restaurants', {
      numberOfRestaurants: storedRestaurants.length,
      restaurants: storedRestaurants,
      nextOrder: nextOrder
    });
});

router.get('/restaurants/:id',function(req,res){
    const restaurantId = req.params.id;
    const storedRestaurants = resData.getStoreRestaurants();

    for (const restaurant of storedRestaurants) {
    if(restaurant.id === restaurantId){
        return res.render('restaurant-detail',{restaurant: restaurant});
    }
    }
    res.status(400).render('404');

})

router.get('/recommend', function (req, res) {
    res.render('recommend');
});

router.post('/recommend', function (req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
  
    const restaurants = resData.getStoreRestaurants();
  
    console.log(restaurants);
    restaurants.push(restaurant);
  
    resData. storeRestaurants(restaurants);
  
    res.redirect('/confirm');
});

router.get('/confirm', function (req, res) {
    res.render('confirm');
});

module.exports = router;