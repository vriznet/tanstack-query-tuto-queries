"use client";

import { getTodoById } from "@/app/actions/todos";
import { useQueries } from "@tanstack/react-query";

export default function ParallelQueries() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["todo", "1"],
        queryFn: () => getTodoById("1"),
      },
      {
        queryKey: ["todo", "2"],
        queryFn: () => getTodoById("2"),
      },
    ],
  });

  return (
    <div>
      <h2>Parallel Todos</h2>
      {results.map((result, index) => {
        if (result.status === "pending") {
          return <div key={index}>Loading...</div>;
        }
        if (result.status === "error") {
          return <div key={index}>Error: {result.error.message}</div>;
        }
        if (result.data) {
          return (
            <div key={index}>
              <input
                type="checkbox"
                checked={result.data.completed}
                disabled
                readOnly
              />
              {result.data.title}
            </div>
          );
        }
        return <div key={index}>No todo found</div>;
      })}
    </div>
  );
}
