const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root123",
    database: "quiz_system"
});

connection.connect((err) => {

    if (err) {
        console.log("Database Connection Failed");
    }
    else {
        console.log("Database Connected");
    }

});

module.exports = connection;