var Pessoa = require("../models/pessoa");

module.exports.list = () => {
  return Pessoa.find()
    .sort({ nome: 1 })
    .then((pessoas) => {
      return pessoas;
    })
    .catch((erro) => {
      throw Error(erro);
    });
};

module.exports.getPessoa = (id) => {
  return Pessoa.findOne({ id: id })
    .then((pessoa) => {
      return pessoa;
    })
    .catch((erro) => {
      throw Error(erro);
    });
};

module.exports.addPessoa = (pessoa) => {
  return Pessoa.create(pessoa)
    .then((pessoa) => {
      return pessoa;
    })
    .catch((erro) => {
      throw Error(erro);
    });
};

module.exports.deletePessoa = (id_pessoa) => {
  return Pessoa.deleteOne({ id: id_pessoa })
    .then((res) => {
      return res;
    })
    .catch((erro) => {
      throw Error(erro);
    });
};

module.exports.updatePessoa = (pessoa) => {
  return Pessoa.updateOne({ id: pessoa.id }, pessoa)
    .then((res) => {
      return res;
    })
    .catch((erro) => {
      throw Error(erro);
    });
};
