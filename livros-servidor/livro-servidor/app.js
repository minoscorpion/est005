// app.js
const express = require('express');
const bodyParser = require('body-parser');
const livrosRouter = require('./routes/livros');
var cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar o sistema de CORS
const corsOptions = {
  origin: '*', // Permitir acesso de qualquer origem
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Usar a rota para gerenciamento de livros
app.use('/livros', livrosRouter);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
  