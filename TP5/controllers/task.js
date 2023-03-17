var axios = require("axios");

module.exports.getTodo = () => {
  return axios
    .get("http://localhost:3000/tasks?isCompleted=false")
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};
module.exports.getDone = () => {
  return axios
    .get("http://localhost:3000/tasks?isCompleted=true")
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.createTask = (task) => {
  task["isCompleted"] = false;
  return axios
    .post("http://localhost:3000/tasks", task)
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.deleteTask = (task_id) => {
  return axios
    .delete("http://localhost:3000/tasks/" + task_id)
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};

module.exports.markComplete = (task_id) => {
  return axios
    .patch("http://localhost:3000/tasks/" + task_id, { isCompleted: true })
    .then((resposta) => {
      return resposta.data;
    })
    .catch((erro) => {
      return erro;
    });
};
