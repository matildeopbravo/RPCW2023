/* eslint-disable no-console */
const http = require("http");
const url = require("url");
const axios = require("axios");
const mypages = require("./mypages");
const fs = require("fs");

http
  .createServer((req, res) => {
    var dicURL = url.parse(req.url, true);

    console.log(req.method + " " + req.url);

    if (dicURL.pathname == "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(mypages.mainPage());
    } else if (dicURL.pathname == "/pessoas") {
      if (dicURL.query.id) {
        axios
          .get("http://localhost:3000/pessoas?id=" + dicURL.query.id)
          .then((resp) => {
            const pessoa = resp.data;
            if (pessoa) {
              res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",
              });
              pag = mypages.pessoaPage(pessoa[0]);
              res.end(pag);
            } else {
              error_page("Person Not Found");
            }
          })
          .catch((erro) => {
            error_page(erro);
          });
      } else {
        search = dicURL.search ? "&" + dicURL.search.slice(1) : "";
        axios
          .get("http://localhost:3000/pessoas?_sort=nome&order=asc" + search)
          .then((resp) => {
            const pessoas = resp.data;
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            pag = mypages.pessoasPage(pessoas);
            res.end(pag);
            // debugging
            fs.writeFile("pagina.html", pag, (err) => {
              if (err) console.log(err);
            });
          })
          .catch((erro) => {
            console.log("Erro: " + erro);
            res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
            res.end("ERRO: " + erro);
          });
      }
    } else if (dicURL.pathname == "/distribuicao_sexo") {
      let feminino_req = axios.get(
        "http://localhost:3000/pessoas?sexo=feminino"
      );
      let masculino_req = axios.get(
        "http://localhost:3000/pessoas?sexo=masculino"
      );
      let outro_req = axios.get("http://localhost:3000/pessoas?sexo=outro");

      Promise.all([feminino_req, masculino_req, outro_req])
        .then((resp) => {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(
            mypages.distribuicaoSexo(resp[0].data, resp[1].data, resp[2].data)
          );
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(`Error: ${err}`);
        });
    } else if (dicURL.pathname == "/w3.css") {
      fs.readFile("w3.css", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/css" });
        if (err) {
          console.log("erro na leitura da stylesheet");
          res.write("Erro: " + err);
        } else res.write(data);
        res.end();
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end("Erro: " + "Operação não suportada");
    }
  })
  .listen(7777);
console.log("Servidor à escuta na porta 7777...");

function error_page(erro) {
  console.log("Erro: " + erro);
  res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
  res.end("ERRO: " + erro);
}
