"use client";

import { getTodoById } from "@/app/actions/todos";
import { queryOptions, useQuery } from "@tanstack/react-query";

function todoOptions(id: string) {
  return queryOptions({
    queryKey: ["todo", id],
    queryFn: () => getTodoById(id),
    staleTime: 5 * 1000,
  });
}

export default function QueryOptions() {
  const { data, status, error } = useQuery(todoOptions("1"));
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
          <input type="checkbox" checked={data.completed} disabled readOnly />
          {data.title}
        </div>
      </div>
    );
  }
  return <div>No todo found</div>;
}

/*
// For Infinite Queries, a separate infiniteQueryOptions helper is available.

// You can still override some options at the component level. A very common and useful pattern is to create per-component select functions:
// Type inference still works, so query.data will be the return type of select instead of queryFn

const query = useQuery({
  ...groupOptions(1),
  select: (data) => data.groupName,
})
*/
