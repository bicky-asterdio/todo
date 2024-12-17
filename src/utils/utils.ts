import { Todos } from "../types/types";
const TODOS = "todos";

// Function to generate a unique ID
export const generateId = () => {
  return Date.now() + Math.random().toString(36).slice(2, 11);
};

export const saveTodos = (todos: Todos) => {
  localStorage.setItem(TODOS, JSON.stringify(todos));
};

export const getTodos: () => Todos = () => {
  const storedTodos: Todos = JSON.parse(localStorage.getItem(TODOS) || "[]");

  return storedTodos;
};
