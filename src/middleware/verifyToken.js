const { query } = require("../conexao");
const { verify } = require("jsonwebtoken");
const secret = require("../secret");

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({mensagem: "Token não informado!"});
  }
  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const { id } = await verify(token, secret);

    const { rowCount, rows } = await query(
      "select * from usuarios where id = $1",
      [id]
    );

    if (rowCount === 0) {
      res.status(404).json({ mensagem: "Usuario não encontrado" });
    }

    const { senha, ...user } = rows[0];

    req.user = user;

    next();
  } catch (error) {
    res.status(400).json({mensagem: "Para acessar este recurso, um token de autenticação válido deve ser enviado."});
  }
};

module.exports = verifyToken;
