"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Project = {
  id: string;
  name: string;
  description: string;
};

// 목업 프로젝트 데이터
const mockProjects: Project[] = Array.from({ length: 25 }, (_, i) => ({
  id: `project-${i + 1}`,
  name: `Project ${i + 1}`,
  description: `Description for project ${i + 1}`,
}));

// 페이지당 5개씩 프로젝트 반환
async function fetchProjects(page: number = 0) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const pageSize = 5;
  const start = page * pageSize;
  const end = start + pageSize;

  const projects = mockProjects.slice(start, end);
  const hasMore = end < mockProjects.length;

  return { projects, hasMore };
}

export default function PaginatedQueries() {
  const [page, setPage] = useState(0);

  const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["projects", page],
      queryFn: () => fetchProjects(page),
      placeholderData: keepPreviousData,
    });

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.projects.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <div>Current Page: {page + 1}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPlaceholderData && data?.hasMore) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPlaceholderData || !data?.hasMore}
      >
        Next Page
      </button>
      {isFetching ? <div> Loading...</div> : null}
    </div>
  );
}
