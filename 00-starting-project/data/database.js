const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    databaase: 'blog',
    user:'root',
    password: 'root'
});

module.exports = pool;