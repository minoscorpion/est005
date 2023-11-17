// modelo/livro-schema.js
const mongoose = require('mongoose');
const banco = require('./conexao');
//const { Schema } = banco;

const LivroSchema = new mongoose.Schema({
  ID: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: String },
  codEditora: { type: Number },
  resumo: { type: String },
  autores: [{ type: String }]
});

const Livro = banco.model('livros', LivroSchema);

module.exports = Livro;