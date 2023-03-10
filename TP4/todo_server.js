var http = require("http");
var axios = require("axios");
var templates = require("./templates");
var static = require("./static.js");

const { parse } = require("querystring");

// Aux function to process body
function collectRequestBodyData(request, callback) {
  if (request.headers["content-type"] === "application/x-www-form-urlencoded") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      callback(parse(body));
    });
  } else {
    callback(null);
  }
}

`
GET / => Shows page
POST / => Creates a task
PUT /:id => updates a task == mark as done
DELETE /:id => removes a task
`;

function renderPage(res) {
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  Promise.all([
    axios.get("http://localhost:3000/tasks?isCompleted=false"),
    axios.get("http://localhost:3000/tasks?isCompleted=true"),
  ])
    .then((resp) => {
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });
      res.write(templates.todoPage(false, resp[0].data, resp[1].data));
      res.end();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`Error: ${err}`);
    });
}
var server = http.createServer(function (req, res) {
  // Logger: what was requested and when it was requested
  var d = new Date().toISOString().substring(0, 16);
  console.log(req.method + " " + req.url + " " + d);

  // Handling request
  if (static.staticResource(req)) {
    static.serveStaticResource(req, res);
  } else {
    switch (req.method) {
      case "GET":
        // GET /
        if (req.url == "/") {
          renderPage(res);
        }
        break;
      case "POST":
        if (req.url == "/") {
          collectRequestBodyData(req, (result) => {
            if (result) {
              console.dir(result);
              switch (result.method) {
                case "PATCH":
                  axios
                    .patch(`http://localhost:3000/tasks/${result.id}`, {
                      isCompleted: true,
                    })
                    .then(function (resp) {
                      console.log(resp.status);
                      renderPage(res);
                    })
                    .catch((erro) => {
                      console.log("Erro " + erro);
                    });
                  break;
                case "DELETE":
                  axios
                    .delete(`http://localhost:3000/tasks/${result.id}`)
                    .then(function (resp) {
                      console.log(resp.status);
                      renderPage(res);
                    })
                    .catch((erro) => {
                      console.log("Erro " + erro);
                    });
                  break;
                default:
                  result["isCompleted"] = false;
                  axios
                    .post("http://localhost:3000/tasks", result)
                    .then(function (resp) {
                      console.log(resp.status);
                      renderPage(res);
                    })
                    .catch((erro) => {
                      console.log("Erro " + erro);
                    });
              }
            } else {
              res.writeHead(201, { "Content-Type": "text/html;charset=utf-8" });
              res.write("<p>Unable to collect data from body...</p>");
              res.end();
            }
          });
        } else {
          res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
          res.write("<p>Unsupported POST request: " + req.url + "</p>");
          res.write('<p><a href="/">Return</a></p>');
          res.end();
        }
        break;
      default:
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write("<p>" + req.method + " unsupported in this server.</p>");
        res.end();
    }
  }
});

server.listen(7777, () => {
  console.log("Servidor à escuta na porta 7777...");
});
