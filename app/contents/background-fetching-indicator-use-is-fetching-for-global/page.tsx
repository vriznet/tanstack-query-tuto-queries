"use client";

import { getTodos } from "@/app/actions/todos";
import { useIsFetching, useQuery } from "@tanstack/react-query";

export default function BackgroundFetchingIndicator() {
  const {
    status,
    data: todos,
    error,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // If you would like to show a global loading indicator
  // when any queries are fetching (including in the background),
  // you can use the useIsFetching hook:
  const isFetching = useIsFetching();

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
        {/* Avoid using isFetching with && (e.g. isFetching && ...). Since isFetching is a number, JSX may render '0' */}
        {isFetching ? (
          <div>🔄 Queries are fetching in the background...</div>
        ) : null}
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
