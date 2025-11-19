"use client";

import { getTodoById, getTodos, Todo } from "@/app/actions/todos";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function InitialQueryDataFromCache() {
  const queryClient = useQueryClient();
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  // 1단계: 전체 todos 리스트 가져오기
  const {
    data: todos,
    status: todosStatus,
    isFetching: isFetchingTodos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    staleTime: 60 * 1000, // 1분
  });

  // 2단계: 개별 todo 가져오기 (캐시 재사용)
  const {
    data: selectedTodo,
    status: todoStatus,
    isFetching: isFetchingTodo,
  } = useQuery({
    queryKey: ["todo", selectedTodoId],
    queryFn: () => getTodoById(selectedTodoId!),
    enabled: !!selectedTodoId, // selectedTodoId가 있을 때만 쿼리 실행
    // 캐시에서 initialData 가져오기
    initialData: () => {
      return queryClient
        .getQueryData<Todo[]>(["todos"])
        ?.find((t) => t.id === selectedTodoId);
    },
    // 캐시의 업데이트 시간 가져오기
    initialDataUpdatedAt: () => {
      return queryClient.getQueryState(["todos"])?.dataUpdatedAt;
    },
    staleTime: 30 * 1000, // 30초
  });

  return (
    <div>
      <h2>Initial Query Data from Cache</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>1. Todos List</h3>
        <p>
          <strong>Status:</strong> {todosStatus}{" "}
          {isFetchingTodos && "🔄 Fetching..."}
        </p>
        {todosStatus === "pending" && <div>Loading todos...</div>}
        {todosStatus === "success" && (
          <div>
            {todos?.map((todo) => (
              <div key={todo.id} style={{ marginBottom: "8px" }}>
                <button
                  onClick={() => setSelectedTodoId(todo.id)}
                  style={{
                    padding: "4px 8px",
                    marginRight: "8px",
                    backgroundColor:
                      selectedTodoId === todo.id ? "#007bff" : "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Select
                </button>
                <input type="checkbox" checked={todo.completed} readOnly />
                {todo.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTodoId && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <h3>2. Selected Todo Detail</h3>
          <p>
            <strong>Status:</strong> {todoStatus}{" "}
            {isFetchingTodo && "🔄 Background Fetching..."}
          </p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            💡 캐시에서 가져온 initialData로 즉시 표시 → background refetch
          </p>
          {selectedTodo && (
            <div>
              <p>
                <strong>ID:</strong> {selectedTodo.id}
              </p>
              <p>
                <strong>Title:</strong> {selectedTodo.title}
              </p>
              <p>
                <strong>Completed:</strong>{" "}
                {selectedTodo.completed ? "Yes" : "No"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
