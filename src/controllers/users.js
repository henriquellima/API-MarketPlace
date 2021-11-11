const useful = require("../useful/users");
const { query } = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

const register = async (req, res) => {
  const body = req.body;

  const verifybody = useful.verifyBodyAll(body);

  if (verifybody) {
    return res.status(400).json({ mensagem: verifybody });
  }

  try {
    const emailExists = await query("select * from usuarios where email = $1", [
      body.email
    ]);
    if (emailExists.rowCount !== 0) {
      return res
        .status(400)
        .json({ mensagem: "Email já cadastrado em nosso servidor!!" });
    }

    const passwordHash = await bcrypt.hash(body.senha, 10);

    const user = await query(
      `insert into usuarios (nome, email, senha, nome_loja) values ($1, $2, $3, $4)`,
      [body.nome, body.email, passwordHash, body.nome_loja]
    );

    if (user.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "Não foi possivel registrar o usuario" });
    }

    return res.status(201).json();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const login = async (req, res) => {
  const body = req.body;

  const verifyBodyLogin = useful.verifyBodyLogin(body);

  if (verifyBodyLogin) {
    return res.status(400).json({ mensagem: verifyBodyLogin });
  }

  try {
    const { rows: user } = await query(
      "select * from usuarios where email = $1",
      [body.email]
    );

    if (user.length === 0) {
      return res.status(400).json({ mensagem: "Email/Senha incoreto" });
    }

    const verifypassword = await bcrypt.compare(body.senha, user[0].senha);

    if (!verifypassword) {
      return res.status(401).json({mensagem: "Email/Senha incoreto" });
    }

    const token = await jwt.sign({ id: user[0].id }, secret, {
      expiresIn: "1d",
    });
    return res.status(200).json({ token });

  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

const profileData = (req, res) => {
  return res.status(200).json(req.user);
};

const update = async (req, res) => {
  const body = req.body;

  const verifyBody = useful.verifyBodyAll(body);
  if (verifyBody) {
    return res.status(400).json({ mensagem: verifyBody });
  }
  const user = req.user;

  try {
    const emailExists = await query("select * from usuarios where email = $1 and id <> $2", [
      body.email, user.id
    ]);
    if (emailExists.rowCount !== 0) {
      return res
        .status(400)
        .json({ mensagem: "Email já cadastrado em nosso servidor!!" });
    }

    const newHash = await bcrypt.hash(body.senha, 10);

    const modifiedUser = await query(
      `update usuarios set nome=$1, email=$2, senha=$3, nome_loja=$4 where id = $5`,
      [body.nome, body.email, newHash, body.nome_loja, user.id]
    );

    if (modifiedUser.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "Não foi possivel atualizar o usuario :C" });
    }
    res.status(200).json();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  register,
  login,
  profileData,
  update,
};
