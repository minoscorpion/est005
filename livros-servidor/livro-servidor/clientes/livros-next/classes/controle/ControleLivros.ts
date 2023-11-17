// ControleLivros.ts
import { Livro } from '../modelo/Livro';
const baseURL = 'http://localhost:3000/livros';

interface LivroMongo {
  _id: string;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

export class ControleLivros {
  //private livros: Livro[];

  constructor() {
    //  this.livros = [
    //   new Livro(1, 'Livro 1', 'Resumo 1', ['Autor 1'], 1),
    //   new Livro(2, 'Livro 2', 'Resumo 1', ['Autor 2'], 2),
    //   new Livro(3, 'Livro 3', 'Resumo 1', ['Autor 3'], 1),
    // ];
  }

  // obterLivros(): Livro[] {
  //   return this.livros;
  // }

  async obterLivros(): Promise<Livro[]> {
    const response = await fetch(baseURL);
    const livrosMongo: LivroMongo[] = await response.json();
    
    const livros: Livro[] = livrosMongo.map(livroMongo => {
      return new Livro(livroMongo._id, livroMongo.titulo, livroMongo.resumo, livroMongo.autores, livroMongo.codEditora);
    });

    return livros;
  }

  // incluir(livro: Livro): void {
  //   const novoCodigo = Math.max(...this.livros.map(l => l.codigo), 0) + 1;
  //   livro.codigo = novoCodigo;

  //   this.livros.push(livro);
  // }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: object = {
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores
    };

    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livroMongo),
    });

    return response.ok;
  }

  // excluir(codigo: number): void {
  //   const indice = this.livros.findIndex(l => l.codigo === codigo);
  //   if (indice !== -1) {
  //     this.livros.splice(indice, 1);
  //   }
  // }

  async excluir(codigo: string): Promise<boolean> {
    const response = await fetch(`${baseURL}/${codigo}`, {
      method: 'DELETE',
    });

    return response.ok;
  }

}