let todos;
const savedTodos = JSON.parse(localStorage.getItem("todos"));

if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [
    {
      title: "Get groceries",
      dueDate: "2021-10-04",
      id: "id1",
    },
    {
      title: "Wash car",
      dueDate: "2021-02-03",
      id: "id2",
    },
    {
      title: "Make dinner",
      dueDate: "2021-03-08",
      id: "id3",
    },
  ];
}

function createTodo(title, dueDate) {
  const id = "" + new Date().getTime();

  todos.push({
    title: title,
    dueDate: dueDate,
    id: id,
  });
  saveTodos();
}

// Deletes a todo
function removeTodo(idToDelete) {
  todos = todos.filter(function (todo) {
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });

  saveTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Controller
function addTodo() {
  if (todos.length >= 7) {
    alert("Only 7 tasks can be stored, please complete previous tasks.");
    addTodo.preventDefault();
  }
  const textbox = document.getElementById("todo-title");
  const title = textbox.value;
  document.getElementById("todo-title").value = "";

  const datePicker = document.getElementById("date-picker");
  const dueDate = datePicker.value;

  createTodo(title, dueDate);
  render();
}

function deleteTodo(event) {
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;

  removeTodo(idToDelete);
  render();
}

// View
function render() {
  // reset our list
  document.getElementById("todo-list").innerHTML = "";

  todos.forEach(function (todo) {
    const element = document.createElement("div");
    element.className = "task-list";
    element.innerText = todo.title + " \xa0 " + todo.dueDate;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerText = "Delete";
    deleteButton.onclick = deleteTodo;
    deleteButton.id = todo.id;
    element.appendChild(deleteButton);

    const todoList = document.getElementById("todo-list");
    todoList.appendChild(element);
  });
}

render();

function handleKeyPress(event) {
  if (event.key === "Enter") {
    location.reload(); // Refresh the page
  }
}
