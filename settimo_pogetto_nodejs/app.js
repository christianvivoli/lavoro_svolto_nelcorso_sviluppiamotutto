const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));

app.get('/currenttime', function(req, res) {
     res.send('<h1>' +  new Date().toISOString() + '</h1>');
});

app.get('/',function(req,res){
    res.send('<form action="/store-user" method="POST"> <label>Yuor name</label><input type="text" name="username"><button>Submit</button></form>');
})

app.post('/store-user', function(req, res) {
    const username = req.body.username;
    console.log(username);

    const filePath = path.join(__dirname, 'data' , 'users.json');

    const fileData = fs.readFileSync(filePath);

    const existingUesers = JSON.parse(fileData);

    existingUesers.push(username);
 
    
    fs.writeFileSync(filePath, JSON.stringify(existingUesers));

    res.send('<form action="/user"><button>lista</button></form>');
})

app.get('/user',function(rep,res){

    const filePath = path.join(__dirname, 'data' , 'users.json');

    const fileData = fs.readFileSync(filePath);
    const existingUesers = JSON.parse(fileData);

    let responseData = '<ul>';

    for (const user of existingUesers){
        responseData += '<li>'+ user + '</li>';
    }
    responseData += '</ul>';

    res.send(responseData + '<form action="/"><button>home</button></form>');
});

app.listen(3000);
