"use client";

import { getTodos, Todo } from "@/app/actions/todos";
import { useQuery } from "@tanstack/react-query";

// 목업: 로컬 스토리지에서 가져온 데이터라고 가정
// 실제로는: JSON.parse(localStorage.getItem('todos') || '[]')
const savedTodos: Todo[] = [
  { id: "1", title: "Learn TanStack Query", completed: false },
  { id: "2", title: "Learn Server Actions", completed: true },
];

// 목업: 이 데이터를 5분 전에 저장했다고 가정
// 실제로는: Number(localStorage.getItem('todos_timestamp'))
const savedTimestamp = Date.now() - 5 * 60 * 1000; // 5분 전

export default function InitialQueryData() {
  const { status, data, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    initialData: savedTodos, // 로컬 스토리지에서 가져온 데이터
    initialDataUpdatedAt: savedTimestamp, // 5분 전에 저장된 시간
    staleTime: 60 * 1000, // 1분
    // 5분 > 1분 → 오래된 데이터이므로 즉시 background refetch!
  });

  return (
    <div>
      <h2>Initial Query Data Example</h2>
      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Is Fetching:</strong> {isFetching ? "Yes 🔄" : "No ✅"}
        </p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          💡 initialData는 5분 전 데이터 → staleTime(1분) 초과 → 즉시 background
          refetch 발생!
        </p>
      </div>

      <div>
        <h3>Todos:</h3>
        {data?.map((todo) => (
          <div key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.title}
          </div>
        ))}
      </div>
    </div>
  );
}
