import Todo from "../models/Todo.js";
import { checkPermission } from "../utils/checkPermission.js";
import jwt from "jsonwebtoken";

export const getMyTodos = async (req, res) => {
  const { id: tokenId } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

  const todos = await Todo.find({ userId: tokenId });

  res.status(200).json({ todos });
};

export const editMyTodo = async (req, res) => {
  try {
    const { userId, text, done } = req.body;

    const permission = checkPermission(userId, req);

    if (!permission) {
      return res.status(401).json({ msg: "you are not authorized for this" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      { text, done },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ updatedTodo });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMyTodo = async (req, res) => {
  const todoId = req.params.id;

  const deleteTodo = await Todo.findOne({ _id: todoId });

  if (!deleteTodo) {
    return res.status(400).json({ msg: "no todo with this id" });
  }

  const userId = deleteTodo.userId.toString();

  const permission = checkPermission(userId, req);

  if (!permission) {
    return res.status(401).json({ msg: "you are not authorized for this" });
  }

  const deletedTodo = await Todo.findByIdAndDelete({ _id: todoId });

  res.status(200).json({ deletedTodo });
};

export const createMyTodo = async (req, res) => {
  const { text, userId } = req.body;

  if (!text || !userId) {
    res.send(400).json({ msg: "please fill the needed fileds" });
  }

  const permission = checkPermission(userId, req);

  if (!permission) {
    return res.status(401).json({ msg: "you are not authorized for this" });
  }

  const newTodo = await new Todo({ text, userId });

  const savedTodo = await newTodo.save();

  res.status(200).json({ savedTodo });
};

export const getOneTodo = async (req, res) => {
  const todoId = req.params.id;

  const todo = await Todo.findOne({ _id: todoId });

  res.status(200).json({ todo });
};
