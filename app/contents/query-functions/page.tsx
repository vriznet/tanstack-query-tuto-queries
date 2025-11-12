"use client";

import { useQuery } from "@tanstack/react-query";

export default function QueryKeys() {
  const todoId = "3";

  const { status, error, data } = useQuery({
    queryKey: ["todo", todoId],
    // Some utilities like `fetch` do not throw errors by default. If that's the case, you'll need to throw them on your own.
    queryFn: async () => {
      const response = await fetch("/todos/" + todoId);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
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
