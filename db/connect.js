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
try{
    db.connect((err) => {
        if (err) throw err;
    });
}
catch(error) {
    console.log(error);

}

module.exports = db;