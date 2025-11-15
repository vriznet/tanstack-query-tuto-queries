"use client";

import { getTodos } from "@/app/actions/todos";
import { useQuery } from "@tanstack/react-query";

export default function BackgroundFetchingIndicator() {
  const {
    status,
    data: todos,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return status === "pending" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>Error: {error.message}</div>
  ) : (
    <>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => refetch()}>Refetch</button>
      </div>

      <div>
        <h2>Todos List</h2>
        {isFetching && <div>🔄 Refreshing...</div>}
        {todos?.map((todo) => (
          <div key={todo.id}>
            <input type="checkbox" checked={todo.completed} disabled readOnly />
            {todo.title}
          </div>
        ))}
      </div>
    </>
  );
}
