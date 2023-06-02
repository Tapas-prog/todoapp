const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addTodo,
  getAllTodos,
  deleteTodo,
  editTodo,
} = require("../controller/todosController");

router.get("/", protect, getAllTodos);
router.post("/addtodo", protect, addTodo);
router.delete("/delete/:id", protect, deleteTodo);
router.patch("/edit/:id", protect, editTodo);

module.exports = router;
