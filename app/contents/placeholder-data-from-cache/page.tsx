"use client";

import { getTodoById, getTodos, Todo } from "@/app/actions/todos";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function PlaceholderDataFromCacheExample() {
  const queryClient = useQueryClient();
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  // 1. 전체 todos 리스트 조회 (preview 데이터로 사용)
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // 2. 선택한 개별 todo 상세 조회
  const todoDetailQuery = useQuery({
    queryKey: ["todo", selectedTodoId],
    queryFn: () => getTodoById(selectedTodoId!),
    enabled: !!selectedTodoId, // selectedTodoId가 있을 때만 실행
    placeholderData: () => {
      // todos 리스트 캐시에서 해당 todo를 찾아서 placeholder로 사용
      return queryClient
        .getQueryData<Todo[]>(["todos"])
        ?.find((todo) => todo.id === selectedTodoId);
    },
  });

  return (
    <div>
      <h2>Placeholder Data from Cache Example</h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "16px",
          backgroundColor: "#e3f2fd",
        }}
      >
        <p style={{ fontSize: "14px", color: "#1565c0", marginBottom: "8px" }}>
          💡 <strong>패턴:</strong> 리스트 캐시 데이터를 개별 아이템 조회의
          placeholder로 활용
        </p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          1. 전체 todos 리스트가 캐시됨
        </p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          2. 개별 todo 클릭 시 리스트에서 찾아서 즉시 표시 (placeholder)
        </p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          3. 동시에 서버에서 최신 상세 데이터 fetch
        </p>
      </div>

      {/* 전체 Todos 리스트 */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Todos List (캐시된 데이터)</h3>
        <p style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>
          Status: {todosQuery.status} | Fetching:{" "}
          {todosQuery.isFetching ? "Yes 🔄" : "No ✅"}
        </p>

        {todosQuery.data?.map((todo) => (
          <div
            key={todo.id}
            onClick={() => setSelectedTodoId(todo.id)}
            style={{
              padding: "12px",
              marginBottom: "8px",
              backgroundColor:
                selectedTodoId === todo.id ? "#fff3cd" : "#f5f5f5",
              cursor: "pointer",
              border:
                selectedTodoId === todo.id
                  ? "2px solid #ffc107"
                  : "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              style={{ marginRight: "8px" }}
            />
            {todo.title}
            <span
              style={{ fontSize: "12px", color: "#999", marginLeft: "8px" }}
            >
              (클릭하여 상세보기)
            </span>
          </div>
        ))}
      </div>

      {/* 선택한 Todo 상세 */}
      {selectedTodoId && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <h3>Todo Detail (ID: {selectedTodoId})</h3>

          <div style={{ marginBottom: "12px" }}>
            <p style={{ fontSize: "12px", marginBottom: "4px" }}>
              <strong>Status:</strong> {todoDetailQuery.status}
            </p>
            <p style={{ fontSize: "12px", marginBottom: "4px" }}>
              <strong>Is Fetching:</strong>{" "}
              {todoDetailQuery.isFetching ? "Yes 🔄" : "No ✅"}
            </p>
            <p style={{ fontSize: "12px", marginBottom: "4px" }}>
              <strong>Is Placeholder Data:</strong>{" "}
              <span
                style={{
                  color: todoDetailQuery.isPlaceholderData
                    ? "#f57c00"
                    : "#2e7d32",
                  fontWeight: "bold",
                }}
              >
                {todoDetailQuery.isPlaceholderData
                  ? "Yes (캐시에서 가져온 임시 데이터)"
                  : "No (서버에서 가져온 최신 데이터)"}
              </span>
            </p>
          </div>

          {todoDetailQuery.data && (
            <div
              style={{
                padding: "16px",
                backgroundColor: todoDetailQuery.isPlaceholderData
                  ? "#fff3cd"
                  : "#d4edda",
                borderRadius: "4px",
                border: `2px solid ${
                  todoDetailQuery.isPlaceholderData ? "#ffc107" : "#4caf50"
                }`,
              }}
            >
              <p style={{ marginBottom: "8px" }}>
                <strong>ID:</strong> {todoDetailQuery.data.id}
              </p>
              <p style={{ marginBottom: "8px" }}>
                <strong>Title:</strong> {todoDetailQuery.data.title}
              </p>
              <p style={{ marginBottom: "8px" }}>
                <strong>Completed:</strong>{" "}
                {todoDetailQuery.data.completed ? "✅" : "❌"}
              </p>

              {todoDetailQuery.isPlaceholderData && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#f57c00",
                    marginTop: "12px",
                  }}
                >
                  ⚡ 리스트 캐시에서 즉시 표시 중... 서버에서 최신 데이터
                  가져오는 중
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
