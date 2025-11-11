"use client";

import { getTodoByIdAndConfig } from "@/app/actions/todos";
import { useQuery } from "@tanstack/react-query";

export default function QueryKeys() {
  const { status, error, data } = useQuery({
    queryKey: ["todo", "3", { completed: false }],
    queryFn: () => getTodoByIdAndConfig("3", { completed: false }),
  });

  // The query is currently fetching
  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  // data는 단일 Todo 객체
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
