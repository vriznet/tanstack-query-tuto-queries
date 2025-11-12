"use client";

import { getTodoById } from "@/app/actions/todos";
import { useQuery } from "@tanstack/react-query";

export default function QueryKeys() {
  const todoId = "3";

  const { status, error, data } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: ({ queryKey }) => getTodoById(queryKey[1]),
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }
  if (data) {
    return (
      <div>
        <h2>Todo Detail</h2>
        <div>
          <input type="checkbox" checked={data.completed} readOnly />
          {data.title}
        </div>
      </div>
    );
  }

  return <div>No todos found</div>;
}
