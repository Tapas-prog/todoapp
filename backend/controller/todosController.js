const asyncHandler = require("express-async-handler");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const path = require("path");

const addTodo = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { title, progress, date } = req.body;
  const Todos = loadTodos();
  const duplicate = Todos.find((todo) => todo.title === title);

  if (!duplicate) {
    Todos.push({
      id: uuid(),
      userId: req.user.id,
      title: title,
      progress,
      date,
    });
    saveTodos(Todos);

    res.status(201).send();
  } else {
    res.status(500);
    throw new Error("Something Went Wrong");
  }
});

const getAllTodos = asyncHandler(async (req, res) => {
  try {
    const Todos = loadTodos();
    console.log(Todos, req.user);
    const allTodos = Todos.filter((todo) => todo.userId === req.user.id);
    res.status(200).json({
      allTodos,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    throw new Error("Something Went Wrong");
  }
});

const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const Todos = loadTodos();
    const todosToKeep = Todos.filter(
      (todo) => todo.id !== req.params.id.toString()
    );

    if (Todos.length > todosToKeep.length) {
      saveTodos(todosToKeep);

      res.status(200).send();
    } else {
      res.status(404);
      throw new Error("No todo found!");
    }
  } catch (err) {
    res.status(500);
    throw new Error("Something Went Wrong");
  }
});

const editTodo = asyncHandler(async (req, res) => {
  const { title, progress, date } = req.body;

  try {
    const Todos = loadTodos();
    const index = Todos.map((todo) => todo.id).indexOf(req.params.id);
    console.log(index);
    if (index !== -1) {
      Todos[index].title = title;
      Todos[index].progress = progress;
      Todos[index].date = date;
      saveTodos(Todos);

      res.status(200).send();
    } else {
      res.status(404);
      throw new Error("'No todo found!'");
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    throw new Error("Something Went Wrong");
  }
});

const saveTodos = (todo) => {
  const fileName = path.join(__dirname, "Todos.json");
  const dataJSON = JSON.stringify(todo);
  fs.writeFileSync(fileName, dataJSON);
};

const loadTodos = () => {
  try {
    const fileName = path.join(__dirname, "Todos.json");
    const dataBuffer = fs.readFileSync(fileName);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = { addTodo, getAllTodos, deleteTodo, editTodo };
