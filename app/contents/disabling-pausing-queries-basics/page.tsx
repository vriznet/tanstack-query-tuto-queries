"use client";

import { getTodos } from "@/app/actions/todos";
import { useQuery } from "@tanstack/react-query";

export default function DisablingPausingQueries() {
  const { isLoading, isError, data, error, refetch, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    enabled: false, // Disable automatic query execution
  });
  return (
    <div>
      <button onClick={() => refetch()}>Fetch Todos</button>

      {data ? (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>Not ready ...</div>
      )}

      <div>{isFetching ? "Fetching..." : null}</div>
    </div>
  );
}
