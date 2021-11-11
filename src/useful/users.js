function verifyBodyAll(body) {
  if (!body.nome) return "O campo 'nome' é obrigatório.";
  if (!body.nome_loja) return "O campo 'nome_loja' é obrigatório.";
  if (!body.email) return "O campo 'email' é obrigatório.";
  if (!body.senha) return "O campo 'senha' é obrigatório.";
}

function verifyBodyLogin(body) {
  if (!body.email) return "O campo 'email' é obrigatório.";
  if (!body.senha) return "O campo 'senha' é obrigatório.";
}

function verifyAnyone(body, array) {
  
}

module.exports = {
  verifyBodyAll,
  verifyBodyLogin,
};