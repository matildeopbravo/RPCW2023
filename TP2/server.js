var http = require('http')
var fs = require('fs')

function serve_file(filename, filetype, res) {
        fs.readFile(filename, function(err,data) {
            res.writeHead(200, {'Content-Type': `text/${filetype}`})
            if (err)
                res.write("Erro: " + err)
            else
                res.write(data)
            res.end();
        })
}

http.createServer(function(req, res) {
    console.log("Chegou o pedido: " + req.url )
    if (req.url == '/') {
        serve_file("index.html", "html", res)
    }
    else if(req.url.match(/\/html\/\d+$/)) {
        num = req.url.split("/")[2]
        console.log(num)
        serve_file(`htmls/arq${num}.html`, "html", res)
    }
    else if (req.url.match(/\/xml\/\d+$/)) {
        num = req.url.split("/")[2]
        serve_file(`xmls/arq${num}.xml`, "xml", res)
    }
    else {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.write('404 Not Found')
        res.end();
    }

}).listen(7777)

