var express = require("express");
var router = express.Router();
var Pessoa = require("../controllers/pessoa");

/* GET home page. */
router.get(["/", "/pessoas"], function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  Pessoa.list()
    .then((pessoas) => {
      res.render("index", { lista_pessoas: pessoas, data: data });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/pessoas/:id", function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  Pessoa.getPessoa(req.params.id)
    .then((pessoa) => {
      res.render("pessoa", { pessoa: pessoa, d: data });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/pessoas/delete/:id", function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  Pessoa.getPessoa(req.params.id)
    .then((pessoa) => {
      res.render("deletePessoaForm", { p: pessoa, data: data });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/pessoas/delete/:id/confirm/", function (req, res, next) {
  Pessoa.deletePessoa(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/pessoas/edit/:id", function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  Pessoa.getPessoa(req.params.id)
    .then((pessoa) => {
      res.render("edit", { pessoa: pessoa, data: data });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});
module.exports = router;
