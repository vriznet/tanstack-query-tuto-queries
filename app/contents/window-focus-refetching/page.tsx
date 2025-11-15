"use client";

import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../actions/todos";
import { useState } from "react";

export default function QueryBasics() {
  const [isRefetchOnWindowFocus, setIsRefetchOnWindowFocus] = useState(false);

  const { status, data, error, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    refetchOnWindowFocus: isRefetchOnWindowFocus, // this line disables refetching on window focus
  });

  // You can also disables refetching on window focus globally when creating the QueryClient instance.
  /*
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  })

  function App() {
    return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
  }
  */

  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }
  // The query is not doing anything at the moment and has data
  if (data) {
    return (
      <>
        <div style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="checkbox"
              checked={isRefetchOnWindowFocus}
              onChange={(e) => setIsRefetchOnWindowFocus(e.target.checked)}
            />
            Refetch on Window Focus
          </label>
        </div>
        {isFetching && <div>🔄 Refreshing...</div>}
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                disabled
                readOnly
              />
              {todo.title}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return <div>No todos found</div>;
}
