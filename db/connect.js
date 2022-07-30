const mysql = require('mysql');

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your My SQL password: '',
    password: 'password',
    database: 'team'
});


module.exports = db;