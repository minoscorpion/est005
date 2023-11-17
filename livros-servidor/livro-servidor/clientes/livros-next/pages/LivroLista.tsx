// pages/LivroLista.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Menu } from '../classes/componentes/Menu';
import { LinhaLivro } from './LinhaLivro';
import { Livro } from '../classes/modelo/Livro';
import { ControleLivros } from '../classes/controle/ControleLivros';

import styles from '.';

const LivroLista: React.FC = () => {
  const controleLivros = new ControleLivros();

  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    controleLivros.obterLivros().then((dados) => {
      setLivros(dados);
      setCarregado(true);
    });
  }, [carregado]);

  const excluir = async (codigo: string) => {
    await controleLivros.excluir(codigo);
    setCarregado(false);
  };

  return (
    <div className="mb-2">
      <Head>
        <title>Livros</title>
      </Head>

      <Menu />

      <main className="main">
        <h1 className="title">Lista de Livros</h1>

        <table className="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Editora</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <LinhaLivro key={index} livro={livro} excluir={() => excluir(livro.codigo)} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
