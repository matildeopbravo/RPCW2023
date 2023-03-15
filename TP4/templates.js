exports.todoPage = function (wasCreated, todo, done) {
  console.log("todo", todo);
  var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Todo App</title>
        </head>
        <body>
            <div class="w3-card-4">

            <header  class="w3-container w3-blue">
                    <h5> Todo App </h5>
            </header>
        ${createForm(wasCreated)}
        <div class="w3-row-padding w3-border">
        ${showTodo(todo)}
        ${showDone(done)}
        </div>
                <footer class="w3-container w3-blue">
                    Made with ♥ by Matilde
                </footer>
            </div>
        </body>
    </html>
    `;
  return pagHTML;
};

// description, Due date, person,
function createForm(wasCreated) {
  return `
                <form class="w3-container" method="POST">
                        <fieldset>
                            <legend>Description</legend>
                            <input class="w3-input w3-round" type="text" name="description", required="true">
                        </fieldset>
                        <fieldset>
                            <legend>Due Date</legend>
                            <input class="w3-input w3-round" type="date" name="due_date", require="true">
                        </fieldset>
                        <fieldset>
                            <legend>Person</legend>
                            <input class="w3-input w3-round" type="text" name="person" required="true">
                        </fieldset>
                        <br/>
                        <button class="w3-btn w3-light-green w3-mb-2" type="submit">Create</button>
                        ${wasCreated ? "<p> Success </p>" : ""}
                </form>
    `;
}
function showTodo(tasks) {
  pagHTML = `<div class="w3-container w3-half">
        <h1> Todo </h1>
    `;
  for (let i in tasks) {
    pagHTML += `<div class="w3-container w3-border">
          <p>${tasks[i].description} </p>
          <p> ${tasks[i].due_date} </p> <p> ${tasks[i].person} </p>
      <form method="POST" style="display:inline">
           <input type="hidden" name="id" value="${tasks[i].id}" />
           <input type="hidden" name="method" value="PATCH" />
           <input type="hidden" name="isComplete" value="false" />
            <button class="w3-btn w3-light-green w3-mb-2" type="submit">Complete</button>
    </form>
     <form method="POST" style="display:inline">
           <input type="hidden" name="id" value="${tasks[i].id}" />
           <input type="hidden" name="method" value="DELETE" />
            <button class="w3-btn w3-red w3-mb-2" type="submit">Delete</button>
    </form>
    </div>
          `;
  }
  pagHTML += "</div>";
  return pagHTML;
}
function showDone(tasks) {
  pagHTML = `<div class="w3-container w3-half">
        <h1> Done </h1>
    `;
  for (let i in tasks) {
    pagHTML += `<div class="w3-container w3-border">
          <p>${tasks[i].description} </p>
          <p> ${tasks[i].due_date} </p> <p> ${tasks[i].person} </p>
          <form method="POST" >
           <input type="hidden" name="id" value="${tasks[i].id}" />
           <input type="hidden" name="method" value="DELETE" />
            <button class="w3-btn w3-red w3-mb-2" type="submit">Delete</button>
    </form>
          </div>

          `;
  }
  pagHTML += "</div>";
  return pagHTML;
}
