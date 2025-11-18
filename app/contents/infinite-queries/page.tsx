"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

type Project = {
  id: string;
  name: string;
  description: string;
};

type ProjectsResponse = {
  data: Project[];
  nextCursor: number | undefined;
};

// 목업 프로젝트 데이터 (50개)
const mockProjects: Project[] = Array.from({ length: 50 }, (_, i) => ({
  id: `project-${i + 1}`,
  name: `Project ${i + 1}`,
  description: `Description for project ${i + 1}`,
}));

// 페이지당 10개씩 반환
async function fetchProjects({ pageParam = 0 }): Promise<ProjectsResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const pageSize = 10;
  const start = pageParam * pageSize;
  const end = start + pageSize;

  const data = mockProjects.slice(start, end);
  const nextCursor = end < mockProjects.length ? pageParam + 1 : undefined;

  return { data, nextCursor };
}

export default function InfiniteQueries() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    /*
    ↓ for bi-directional pagination ↓
    getPreviousPageParam: (firstPage, pages) => firstPage.prevCursor,

    ↓ for presenting reversed order ↓
    select: (data) => ({
      pages: [...data.pages].reverse(),
      pageParams: [...data.pageParams].reverse(),
    }),

    ↓ for limiting the number of pages ↓
    maxPages: 3

    ↓ for api that doesn't return cursor info ↓
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - 1
    },
    */
  });

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {
            /* prettier-ignore */
            isFetchingNextPage ?
              "Loading more..."
            :
              hasNextPage ? 
                "Load More"
              : 
                "Nothing more to load"
          }
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}
