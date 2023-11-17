// LivroLista.js
import React, { useState, useEffect } from 'react';
import { ControleLivros } from '../controle/ControleLivros';

import LinhaLivro from '../controle/LinhaLivro';

const controleLivros = new ControleLivros();

const LivroLista = ( {controleLivro} ) => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    controleLivros.obterLivros().then((resultado) => {
      setLivros(resultado);
      setCarregado(true);
    });
  }, [carregado, controleLivro]); 

  const excluir = (codigo) => {
    const controleLivros = new ControleLivros();

    controleLivros.excluir(codigo).then(() => {
      setCarregado(false);
    });
  };

  // const excluir = async (codigo) => {
  //   await controleLivro.excluir(codigo);
  //   setCarregado((prev) => !prev);
  // };

   return (
    <div>
      <h2>Livros</h2>
      {carregado ? (
        <table className='table'>
          <thead>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <LinhaLivro
                key={index}
                livro={livro}
                excluir={() => excluir(livro.codigo)}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default LivroLista;
