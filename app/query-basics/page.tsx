"use client";

import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../actions/todos";

export default function QueryBasics() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.title}
          </li>
        ))}
      </ul>
    );
  }

  return <div>No todos found</div>;
}
