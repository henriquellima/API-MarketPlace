
DROP TABLE IF EXISTS usuarios CASCADE;

CREATE TABLE usuarios (
  id serial PRIMARY KEY,
  nome text NOT NULL,
  email text NOT NULL UNIQUE,
  senha text NOT NULL,
  nome_loja text NOT NULL
);

DROP TABLE IF EXISTS produtos CASCADE;

CREATE TABLE produtos (
  id serial PRIMARY KEY,
  usuario_id integer NOT NULL references usuarios(id),
  nome text NOT NULL,
  quantidade integer NOT NULL,
  categoria text,
  preco integer NOT NULL,
  descricao text NOT NULL,
  imagem text
);
