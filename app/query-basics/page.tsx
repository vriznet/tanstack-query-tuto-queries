"use client";

import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../actions/todos";

export default function QueryBasics() {
  const { status, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
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
