

const FILMES_MOCK = [
  { 
    id: '1', 
    titulo: 'Matrix', 
    ano: 1999, 
    sinopse: 'Um programador descobre a verdade sobre a realidade.',
    genero: 'Ficção Científica',
    diretor: 'Lana e Lilly Wachowski',
    duracao: '136 min'
  },
  { 
    id: '2', 
    titulo: 'Interestelar', 
    ano: 2014, 
    sinopse: 'Exploradores viajam por um buraco de minhoca no espaço.',
    genero: 'Ficção Científica / Aventura',
    diretor: 'Christopher Nolan',
    duracao: '169 min'
  },
  { 
    id: '3', 
    titulo: 'O Poderoso Chefão', 
    ano: 1972, 
    sinopse: 'O patriarca de uma dinastia do crime organizado.',
    genero: 'Drama / Crime',
    diretor: 'Francis Ford Coppola',
    duracao: '175 min'
  },
];


export const buscarFilmes = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(FILMES_MOCK);
    }, 1000); 
  });
};