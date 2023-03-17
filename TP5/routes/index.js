var express = require("express");
var router = express.Router();
var Task = require("../controllers/task");

function renderPage(res, wasAdded = false) {
  Promise.all([Task.getTodo(), Task.getDone()])
    .then((tasks) => {
      res.render("index", {
        todo: tasks[0],
        done: tasks[1],
        wasAdded: wasAdded,
      });
    })
    .catch((error) => {
      res.render("error", error);
    });
}

/* GET home page. */
router.get("/", function (req, res, next) {
  renderPage(res);
});

router.post("/", function (req, res, next) {
  switch (req.body.method) {
    case "POST":
      Task.createTask(req.body)
        .then(renderPage(res, true))
        .catch((error) => {
          res.render("error", error);
        });
      break;
    case "PATCH":
      Task.markComplete(req.body.id)
        .then(renderPage(res))
        .catch((error) => {
          res.render("error", error);
        });
      break;
    default:
      Task.deleteTask(req.body.id)
        .then(renderPage(res, true))
        .catch((error) => {
          res.render("error", error);
        });
  }
});
module.exports = router;
