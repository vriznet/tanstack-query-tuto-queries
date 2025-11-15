"use client";

import { getTodos } from "@/app/actions/todos";
import { useQuery } from "@tanstack/react-query";

function Todos({ completed }: { completed: boolean }) {
  const result = useQuery({
    queryKey: ["todo", { completed }],
    queryFn: fetchTodoList,
  });

  return (
    <ul>
      {result.data?.map((todo) => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.completed} disabled readOnly />
          {todo.title}
        </li>
      ))}
    </ul>
  );
}

// Access the key, `completed` variables in the query function
async function fetchTodoList({
  queryKey,
}: {
  queryKey: [string, { completed: boolean }];
}) {
  const [_key, { completed }] = queryKey;
  return getTodos().then((todos) =>
    todos.filter((todo) => todo.completed === completed)
  );
}

export default function QueryFunctions() {
  return <Todos completed={false} />;
}
