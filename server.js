// Paquetes
const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');


// Almacenamiento en memoria
let store = {};
store.accounts = [];


// Crear la app
let app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());


// Rutas
app.get('/accounts', (req, res) => {
    res.status(200).send(store.accounts);
});

app.get('/accounts/:id', (req, res) => {
    res.status(200).send(store.accounts[req.params.id - 1]);
});

app.post('/accounts', (req, res) => {
    let newAccount = req.body;
    store.accounts.push(newAccount);
    res.status(201).send({message: "The new account has been added"});
});

app.put('/accounts/:id', (req, res) => {
    store.accounts[req.params.id - 1] = req.body;
    res.status(200).send(store.accounts[req.params.id - 1]);
});

app.delete('/accounts/:id', (req, res) => {
    store.accounts.splice(req.params.id - 1, 1);
    res.status(200).send({message: "The specified account has been deleted"});
});


// Conexión local
app.listen(3000, "localhost", () => {
    console.log("Server is listening on http://localhost:3000");
});