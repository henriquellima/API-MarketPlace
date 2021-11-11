const { query } = require("../conexao");

function verifyBodyAll(body) {
  if (!body.nome) return "O campo 'nome' é obrigatório.";
  if (!body.quantidade) return "O campo 'quantidade' é obrigatório.";
  if (body.quantidade <= 0) return "A quantidade precisa ser maior que zero"
  if (!body.preco) return "O campo 'preco' é obrigatório.";
  if (!body.descricao) return "O campo 'descricao' é obrigatório.";
}

async function verifyProductAndUserQualify(user_id, product_id) {
  try {
    const { rows: product } = await query(
      "select * from produtos where id = $1",
      [product_id]
    );

    if (product.length === 0) {
      return {
        status: 404,
        message: `Não existe produto cadastrado com id ${product_id}`,
      };
    }

    if (product[0].usuario_id !== user_id) {
      return {
        status: 403,
        message: "Você não possui autorização para acessar esse serviço",
      };
    }

    return {
      status: 200,
      product: product,
    };
  } catch (error) {
    return { status: 400, message: error.message };
  }
}

module.exports = { verifyBodyAll, verifyProductAndUserQualify };
