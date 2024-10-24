const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/sobre', (req, res) => {
    res.render('sobre');
});

app.get('/recomendacoes', (req, res) => {
    res.render('recomendacoes');
});

app.get('/mapa', (req, res) => {
    res.render('mapa');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

