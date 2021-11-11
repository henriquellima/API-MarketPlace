const useful = require("../useful/products");
const { query } = require("../conexao");

const getAll = async (req, res) => {
  const { id } = req.user;
  const category = req.query.categoria;

  try {
    if(!category) {
      const { rows: list } = await query(
        "select * from produtos where usuario_id = $1",
        [id]
      );
  
      res.status(200).json(list);
    } else {
      const { rows: list } = await query(
        "select * from produtos where usuario_id = $1 and categoria = $2",
        [id, category]
      );
  
      res.status(200).json(list);
    }
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

const getOne = async (req, res) => {
  const  { id: user_id }  = req.user;
  const  { id: product_id } = req.params;

  try {
    const verifyProductAndUserQualify =
      await useful.verifyProductAndUserQualify(user_id, product_id);

    if (verifyProductAndUserQualify.status !== 200) {
      return res
        .status(verifyProductAndUserQualify.status)
        .json({ mensagem: verifyProductAndUserQualify.message });
    }

    return res.status(200).json(verifyProductAndUserQualify.product[0]);
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

const register = async (req, res) => {
  const { id: usuario_id } = req.user;
  const body = req.body;

  const verifyBody = useful.verifyBodyAll(body);
  if (verifyBody) {
    return res.status(400).json({ mensagem: verifyBody });
  }

  try {
    const product = await query(
      `insert into produtos (usuario_id, nome, quantidade, categoria, preco, descricao, imagem)
       values ($1, $2, $3, $4, $5, $6, $7)`,
      [
        usuario_id,
        body.nome,
        body.quantidade,
        body.categoria,
        body.preco,
        body.descricao,
        body.imagem,
      ]
    );

    if (product.rowCount === 0) {
      return res.status(404).json({ mensagem: "Erro ao cadastrar produto" });
    }

    return res.status(201).json();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

const update = async (req, res) => {
  const product_id = req.params.id;
  const user = req.user;
  const body = req.body;

  const verifyBody = useful.verifyBodyAll(body);
  if (verifyBody) {
    return res.status(400).json({ mensagem: verifyBody });
  }

  try {
    const verifyProductAndUserQualify =
      await useful.verifyProductAndUserQualify(user.id, product_id);

    if (verifyProductAndUserQualify.status !== 200) {
      return res
        .status(verifyProductAndUserQualify.status)
        .json({ mensagem: verifyProductAndUserQualify.message });
    }

    const productUpdated = await query(
      `update produtos set nome = $1, quantidade = $2, categoria = $3,
       preco = $4, descricao = $5, imagem = $6 where id = $7`,
      [
        body.nome,
        body.quantidade,
        body.categoria ? body.categoria : product[0].categoria,
        body.preco,
        body.descricao,
        body.imagem ? body.imagem : product[0].imagem,
        product_id,
      ]
    );

    if (productUpdated.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "Não foi possivel editar o usuario" });
    }

    return res.status(204).json();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const product_id = req.params.id;
  const { id: user_id } = req.user;

  try {
    const verifyProductAndUserQualify =
      await useful.verifyProductAndUserQualify(user_id, product_id);

    if (verifyProductAndUserQualify.status !== 200) {
      return res
        .status(verifyProductAndUserQualify.status)
        .json({ mensagem: verifyProductAndUserQualify.message });
    }

    const deletedProduct = await query("delete from produtos where id = $1", [
      product_id,
    ]);
    if (deleteProduct.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "Não foi possivel excluir o produto" });
    }

    return res.status(204).json();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  register,
  update,
  deleteProduct,
};
