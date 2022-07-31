const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    // MySQL username
    user: 'root',
    // MySQL password:
    password: 'password',
    database: 'employees'
});

//Err
db.connect((err) => {
    if (err) throw err;
});

module.exports = db;