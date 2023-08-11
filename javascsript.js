// selectors
const todoInputs = document.querySelector(".todo-inputs")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todos")

//event listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodos)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)

function addTodos(e) {
  e.preventDefault()

  const todoText = todoInputs.value.trim() // Trim whitespace from the input
  if (todoText === "") return // Return if the input is empty

  const todos = getLocalStorageTodos() // Get existing todos from local storage

  todos.push(todoText) // Add new todo to the array
  localStorage.setItem("todos", JSON.stringify(todos)) // Store updated todos in local storage

  createTodoElement(todoText) // Create the UI element for the new todo
  todoInputs.value = "" // Clear the input field
}

function createTodoElement(todoText) {
  const todoDiv = document.createElement("div")
  todoDiv.classList.add("todo")

  const newTodo = document.createElement("li")
  newTodo.classList.add("todo-item")
  newTodo.innerText = todoText
  todoDiv.appendChild(newTodo)

  const compleatedButton = document.createElement("button")
  compleatedButton.innerHTML = '<i class="fas fa-check"></i>'
  compleatedButton.classList.add("complete-btn")
  todoDiv.appendChild(compleatedButton)

  const trashButton = document.createElement("button")
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add("trash-btn")
  todoDiv.appendChild(trashButton)

  todoList.appendChild(todoDiv)
}

function deleteCheck(e) {
  const items = e.target

  if (items.classList[0] === "trash-btn") {
    const todo = items.parentElement
    todo.classList.add("fall")
    todo.addEventListener("transitionend", function () {
      removeTodoFromLocalStorage(todo)
      todo.remove()
    })
  }

  if (items.classList[0] === "complete-btn") {
    const todo = items.parentElement
    todo.classList.toggle("completed")
  }
}

function filterTodo() {
  const todos = todoList.childNodes
  todos.forEach(function (todo) {
    switch (filterOption.value) {
      case "all":
        todo.style.display = "flex"
        break
      case "completed":
        todo.style.display = todo.classList.contains("completed")
          ? "flex"
          : "none"
        break
      case "uncompleted":
        todo.style.display = !todo.classList.contains("completed")
          ? "flex"
          : "none"
        break
    }
  })
}

function getLocalStorageTodos() {
  return JSON.parse(localStorage.getItem("todos")) || []
}

function getTodos() {
  const todos = getLocalStorageTodos()
  todos.forEach(createTodoElement)
}

function removeTodoFromLocalStorage(todo) {
  const todos = getLocalStorageTodos()
  const todoText = todo.querySelector(".todo-item").innerText
  const todoIndex = todos.indexOf(todoText)
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
  }
}
