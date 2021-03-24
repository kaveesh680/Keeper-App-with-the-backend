const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const mysql = require('mysql');
const { query } = require("express");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "keeperapp"
});


//connect to database
db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to the database!");
});

app.get("/api/get", (req, res) => {

    const query = "SELECT * FROM notes";

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })

});

app.post("/api/insert", (req, res) => {

    const query = "INSERT INTO notes (title,content) VALUES (?,?) ";

    db.query(query, [req.body.title, req.body.content], (err, rsult) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Hello World")
        }
    })

});

app.post("/api/delete", (req, res) => {

    const query = "DELETE FROM notes WHERE id = ?";

    db.query(query, req.body.id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Server is running");
})