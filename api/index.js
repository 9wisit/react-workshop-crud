const express = require('express')
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const port = 5000
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/customers', (req, res) => {
    con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
})

app.get('/customers/:id', (req, res) => {
    const { id } = req.params
    const sql = `
        SELECT * FROM customers WHERE id = ${id}
    `
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
})

app.get('/customers/order/:orderBy', (req, res) => {
    const { orderBy } = req.params
    const sql = `
        SELECT * FROM customers ORDER BY id ${orderBy}
    `
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    });
})

app.post('/customers', (req, res) => {
    const { name } = req.body
    const sql = `
        INSERT INTO customers (name) VALUES ('${name}')
    `
    con.query(sql, function (err, result, fields) {
        if (err) res.send(err);
        res.send(result)
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))