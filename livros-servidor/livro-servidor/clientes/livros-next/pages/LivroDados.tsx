// pages/LivroDados.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router'; // Importando useRouter
import { Menu } from '../classes/componentes/Menu';
import Head from 'next/head';
import { Livro } from '../classes/modelo/Livro';  
import { ControleLivros } from '../classes/controle/ControleLivros';  
import { Editora } from '../classes/modelo/Editora';
import { ControleEditora } from '../classes/controle/ControleEditora';  
import styles from '.';

const controleLivros = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroDados: React.FC = () => {
  const router = useRouter();

  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(opcoes[0]?.value || 0);

  const tratarCombo = (event: ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Alteração no construtor do livro para utilizar um texto vazio para o código
    const livro: Livro = {
      codigo: '',
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora,
    };

    console.log('Livro a ser incluído:', livro); 

    const sucesso = await controleLivros.incluir(livro);

    console.log('resp:', sucesso); 

    if (sucesso) {
      controleLivros.obterLivros().then(() => {
        router.push('/LivroLista');
      });
    } else {
      console.error('Erro ao incluir livro.');
    }
  };

  return (
    <div className="mb-3">
      <Head>
        <title>Incluir Livro</title>
      </Head>

      <Menu />

      <main className="main">
        <h1 className="title">Incluir Livro</h1>

        <form onSubmit={incluir}>
          <div className="mb-3">
            <label htmlFor="titulo">Título:</label>
            <input className='form-control'
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div  className="mb-3">
            <label htmlFor="resumo">Resumo:</label>
            <textarea  className='form-control'
              id="resumo"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
            ></textarea>
          </div>
          <div  className="mb-3">
            <label htmlFor="autores">Autores:</label>
            <textarea  className='form-control'
              id="autores"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
            ></textarea>
          </div>
          <div className='mb-3'>
            <label htmlFor="codEditora">Editora:</label>
            <select id="codEditora" className='form-select' value={codEditora} onChange={tratarCombo}>
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit">Incluir Livro</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
