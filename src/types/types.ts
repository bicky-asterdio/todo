interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

export type Todos = Todo[];
export type Active = "all" | "completed" | "not-completed";
