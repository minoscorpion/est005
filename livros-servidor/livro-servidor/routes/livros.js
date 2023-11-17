// routes/livros.js
const express = require('express');
const LivroDAO = require('../modelo/livro-dao');

const router = express.Router();

// Rota para obter todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await LivroDAO.obterLivros();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ mensagem: `Erro ao obter livros: ${err.message}` });
  }
});

// Rota para incluir um novo livro
router.post('/', async (req, res) => {
  try {
    const novoLivro = await LivroDAO.incluir(req.body);
    res.json({ mensagem: 'Livro incluído com sucesso!', livro: novoLivro });
  } catch (err) {
    res.status(500).json({ mensagem: `Erro ao incluir livro: ${err.message}` });
  }
});

// Rota para excluir um livro
router.delete('/:codigo', async (req, res) => {
  const codigoLivro = req.params.codigo;

  try {
    const resultado = await LivroDAO.excluir(codigoLivro);
    res.json({ mensagem: 'Livro excluído com sucesso!', resultado });
  } catch (err) {
    res.status(500).json({ mensagem: `Erro ao excluir livro: ${err.message}` });
  }
});

module.exports = router;
