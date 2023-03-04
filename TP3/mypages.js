exports.pessoasPage = function (lista) {
  var pagHTML = `
    <!DOCTYPE html>
    <html>
         <head>
               <meta charset="UTF-8"/>
               <title> About people... </title>
               <link rel="stylesheet" href="w3.css">
          </head>
          <body>
                <div class="w3-card-4 w3-hoverable">
                    <header class="w3-container w3-blue">
                        <h1>Lista de Pessoas</h1>
                    </header>

        <div class="w3-container">
    `;
  pagHTML += criaTabelaPessoas(lista);

  pagHTML += `
            </div>
                <footer class="w3-container w3-blue">
                <h5>Generated in RPCW</h5>
                </footer>
            </div>
            </table>
        </body>
    </html>
    `;
  return pagHTML;
};

exports.mainPage = function () {
  var pagHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <title> Main Page </title>
                <link rel="stylesheet" href="w3.css">
            <style>
            a {
                text-decoration: none

            }
            </style>
            </head>
            <body>

                    <header class="w3-container w3-blue">
                        <h1>Página Principal</h1>
                    </header> `;

  pagHTML += `
        <div class="w3-display-middle">
        <a href="/pessoas">
            <button class="w3-button w3-light-green">Lista de Indivíduos</button>
        </a>
        <a href="/distribuicao_sexo">
            <button class="w3-button w3-light-green">Distribuição por sexo</button>
        </a>
        <a href="/distribuicao_desporto">
            <button class="w3-button w3-light-green">Distribuição por desporto</button>
        </a>
        <a href="/top10_profissoes">
            <button class="w3-button w3-light-green">Top 10 profissões</button>
        </a>
        </div> `;
  pagHTML += `
            </body>
        </html>
    `;
  return pagHTML;
};

exports.pessoaPage = function (pessoa) {
  var pagHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${pessoa.nome}</title>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="w3.css">
      </head>
      <body>
          <h1>Perfil</h1>
          <table class="w3-table-all w3-card-4">
            <tr>
              <th>Nome</th>
              <td>${pessoa.nome}</td>
            </tr>
            <tr>
              <th>Idade</th>
              <td>${pessoa.idade}</td>
            </tr>
            <tr>
              <th>Sexo</th>
              <td>${pessoa.sexo}</td>
            </tr>
            <tr>
              <th>Morada</th>
              <td>${pessoa.morada.cidade}, ${pessoa.morada.distrito}</td>
            </tr>
            <tr>
              <th>${pessoa.BI ? "BI" : "CC"}</th>
              <td>${pessoa.BI ? pessoa.BI : pessoa.CC}</td>
            </tr>
            <tr>
              <th>Profissão</th>
              <td>${pessoa.profissao}</td>
            </tr>
            <tr>
              <th>Religião</th>
              <td>${pessoa.religiao}</td>
            </tr>
            <tr>
              <th>Desportos</th>
              <td>${pessoa.desportos ? pessoa.desportos.join(", ") : ""}</td>
            </tr>
            <tr>
              <th>Animais</th>
              <td>${pessoa.animais ? pessoa.animais.join(", ") : ""}</td>
            </tr>
            </tr>
            <tr>
              <th>Figura Pública PT</th>
              <td>${
                pessoa.figura_public_pt
                  ? pessoa.figura_public_pt.join(", ")
                  : ""
              }</td>
            </tr>
            <tr>
              <th>Marca Carro</th>
              <td>${pessoa.marca_carro}</td>
            </tr>
            <tr>
              <th>Destinos Favorito</th>
              <td>${
                pessoa.destinos_favoritos
                  ? pessoa.destinos_favoritos.join(", ")
                  : ""
              }</td>
            </tr>
            `;
  for (let k in pessoa.atributos) {
    pagHTML += `
        <tr>
            <th> ${k} </th>
            <td> ${pessoa.atributos[k]} </td>
        </tr> `;
  }

  pagHTML += `</table>
      </body>
    </html>`;

  return pagHTML;
};
function criaTabelaPessoas(pessoas) {
  var pagHTML = `
            <table class="w3-table-all">
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr> `;

  for (let i = 0; i < pessoas.length; i++) {
    pagHTML += `
        <tr>
            <td> ${pessoas[i].id} </td>
            <td> ${pessoas[i].nome} </td>
            <td> ${pessoas[i].idade} </td>
            <td> ${pessoas[i].sexo} </td>
            <td> ${pessoas[i].morada.cidade} </td>
            <td><a href="/pessoas?id=${pessoas[i].id}" class="w3-button w3-light-green">Informação</a></td>
        </tr>
        `;
  }
  pagHTML += "</table>";
  return pagHTML;
}
exports.distribuicaoSexo = function (
  pessoasFeminino,
  pessoasMasculino,
  pessoasOutro
) {
  var pagHTML = `
    <!DOCTYPE html>
    <html>
         <head>
               <meta charset="UTF-8"/>
               <title> Distribuição por Sexo </title>
               <link rel="stylesheet" href="w3.css">
          </head>
          <body>
                <div class="w3-card-4 w3-hoverable">
                    <header class="w3-container w3-blue">
                        <h1>Distribuição por sexo</h1>
                    </header>

        <div class="w3-container">
    `;
  pagHTML += `<h2> Feminino - ${Object.keys(pessoasFeminino).length}</h2>`;
  pagHTML += criaTabelaPessoas(pessoasFeminino);
  // por numero or something
  pagHTML += `<h2> Masculino - ${Object.keys(pessoasMasculino).length}</h2>`;
  pagHTML += criaTabelaPessoas(pessoasMasculino);
  pagHTML += `<h2> Outro - ${Object.keys(pessoasOutro).length}</h2>`;
  pagHTML += criaTabelaPessoas(pessoasOutro);

  pagHTML += `
            </div>
                <footer class="w3-container w3-blue">
                <h5>Generated in RPCW</h5>
                </footer>
            </div>
            </table>
        </body>
    </html>
    `;
  return pagHTML;
};
