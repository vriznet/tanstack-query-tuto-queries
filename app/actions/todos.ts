"use server";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

let todos: Todo[] = [
  { id: "1", title: "Learn TanStack Query", completed: false },
  { id: "2", title: "Learn Server Actions", completed: true },
  { id: "3", title: "Build Amazing Apps", completed: false },
];

export async function getTodos() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return todos;
}

export async function getTodoById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    console.log("Todo not found");
    return null;
  }
  return todo;
}

export async function getTodoByIdAndConfig(
  id: string,
  { title, completed }: { title?: string; completed?: boolean }
) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const todo = todos.find(
    (todo) =>
      todo.id === id &&
      (title === undefined || todo.title === title) &&
      (completed === undefined || todo.completed === completed)
  );

  if (!todo) {
    console.log("Todo not found");
    return null;
  }
  return todo;
}

export async function getTodosWithFilter(filter: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!filter) {
    return todos;
  }
  return todos.filter((todo) => todo.title.includes(filter));
}

export async function createTodo(title: string) {
  if (!title || title.trim().length === 0) {
    throw new Error("Title is required");
  }

  const newTodo: Todo = {
    id: Date.now().toString(),
    title: title.trim(),
    completed: false,
  };

  todos.push(newTodo);
  return newTodo;
}

export async function deleteTodo(id: string) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    throw new Error("Todo not found");
  }

  todos.splice(todoIndex, 1);
  return { success: true };
}

export async function toggleTodo(id: string) {
  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    throw new Error("Todo not found");
  }

  todo.completed = !todo.completed;
  return todo;
}
