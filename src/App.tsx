import { useState, useRef, useMemo } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import TodoList from "./components/TodoList";
import type { Active, Todos } from "./types/types";
import { generateId, getTodos, saveTodos } from "./utils/utils";
import FilterList from "./components/FilterList";

/**
 * const data = {
 * id: string;
 * task: string;
 * completed: boolean;
 * }
 *
 * const todos = [
 * {
 * id: string;
 * task: string;
 * completed: booelan;
 * },
 * {
 * id: string;
 * task: string;
 * completed: boolean;
 * }
 * ]
 *
 */

function App() {
  const [todos, setTodos] = useState<Todos>(() => getTodos());
  const [task, setTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const currentIdRef = useRef("");
  const [activeFilter, setActiveFilter] = useState<Active>("all");

  const handleActiveFilter = (value: Active) => {
    setActiveFilter(value);
  };

  const filteredTodos = useMemo(() => {
    switch (activeFilter) {
      case "all":
        return todos;
        break;
      case "completed": {
        const filteredTodoList = todos.filter((todo) =>
          Boolean(todo.completed)
        );
        return filteredTodoList;
        break;
      }
      case "not-completed": {
        const filteredTodoList = todos.filter((todo) => !todo.completed);
        return filteredTodoList;
        break;
      }
      default:
        return todos;
        break;
    }
  }, [activeFilter, todos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const addEditTodo = () => {
    if (!currentIdRef.current) {
      if (!task) return;

      setTodos((prevTodos) => {
        const newTodos = [
          ...prevTodos,
          {
            id: generateId(),
            task,
            completed: false,
          },
        ];
        saveTodos(newTodos);
        return newTodos;
      });
    } else {
      const updatedTodos = todos.map((todo) => {
        if (currentIdRef.current !== todo.id) return todo;
        return {
          ...todo,
          task,
        };
      });

      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      currentIdRef.current = "";
      setIsEdit(false);
    }
    setTask("");
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        completed: !todo.completed,
      };
    });

    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const handleEdit = (id: string) => {
    const toEditTodo = todos.find((todo) => todo.id === id);
    setTask(toEditTodo?.task || "");
    setIsEdit(true);
    currentIdRef.current = id;
  };

  return (
    <main className="container">
      <h1>Todo Lists</h1>

      <div className="todo-toolbox">
        <Input
          value={task}
          onChange={handleChange}
          type="text"
          placeholder="What needs to be done?"
          className="input"
        />
        <Button className="add-todo-button" onClick={addEditTodo}>
          {isEdit ? "Edit" : "Add"} Todo
        </Button>
      </div>
      <FilterList active={activeFilter} handleActive={handleActiveFilter} />
      <TodoList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        handleEdit={handleEdit}
      />
    </main>
  );
}

export default App;
