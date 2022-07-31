const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username
    user: 'root',
    // Your My SQL password:
    password: 'password',
    database: 'team'
});

//Err
db.connect((err) => {
    if (err) throw err;
});

module.exports = connection;