// modelo/conexao.js
const mongoose = require('mongoose');

const banco = mongoose.connection;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose.connect('mongodb://localhost/livros', options);

module.exports = banco;