import type { Todos } from "../types/types";
import Button from "./Button";
import Checkbox from "./Checkbox";

type ActionType = (id: string) => void;

interface ITodoListPorps {
  todos: Todos;
  deleteTodo: ActionType;
  toggleTodo: ActionType;
  handleEdit: ActionType;
}

export default function TodoList({
  todos,
  deleteTodo,
  toggleTodo,
  handleEdit,
}: ITodoListPorps) {
  return (
    <div className="todo-list">
      {todos.length > 0 &&
        todos.map((todo) => (
          <div className="todo-item" key={todo.id}>
            <Checkbox
              checked={todo.completed}
              id={todo.id}
              label={todo.task}
              onChange={() => toggleTodo(todo.id)}
            />
            <div className="todo-item-btn-box">
              {!todo.completed && (
                <Button
                  className="btn-edit"
                  onClick={() => handleEdit(todo.id)}
                >
                  Edit
                </Button>
              )}
              <Button
                className="btn-delete"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
}
