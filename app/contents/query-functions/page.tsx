"use client";

import { getTodoById } from "@/app/actions/todos";
import { useQuery } from "@tanstack/react-query";

export default function QueryKeys() {
  const todoId = "3";

  const { status, error, data } = useQuery({
    queryKey: ["todo", todoId],
    // If the conditions that determine the query has failed are met, the query function must throw or return a rejected Promise.
    queryFn: async () => {
      const somethingGoesWrong = false; // Simulate error condition
      const somethingElseGoesWrong = false; // Simulate another error condition

      if (somethingGoesWrong) {
        throw new Error("Oh no!");
      }
      if (somethingElseGoesWrong) {
        return Promise.reject(new Error("Something else went wrong!"));
      }

      return getTodoById(todoId);
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
