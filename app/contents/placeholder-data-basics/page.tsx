"use client";

import { getTodos, Todo } from "@/app/actions/todos";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// 실제 서버에서 받은 데이터지만 불완전함 (completed 필드 없음)
type TodoPreview = {
  id: string;
  title: string;
};

const todoPreviews: TodoPreview[] = [
  { id: "1", title: "Learn TanStack Query" },
  { id: "2", title: "Learn Server Actions" },
  { id: "3", title: "Build Amazing Apps" },
];

export default function PlaceholderDataExample() {
  const queryClient = useQueryClient();

  // 목업: todoPreviews를 캐시에 미리 저장 (리스트 페이지에서 받았다고 가정)
  if (!queryClient.getQueryData(["todo-previews"])) {
    queryClient.setQueryData(["todo-previews"], todoPreviews);
  }

  const { status, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos, // 완전한 데이터 반환 (completed 포함)
    placeholderData: () => {
      // 불완전한 실제 데이터 (preview만)
      const previews = queryClient.getQueryData<TodoPreview[]>([
        "todo-previews",
      ]);
      // Todo[] 타입으로 캐스팅 (completed는 undefined)
      return previews as Todo[];
    },
  });

  return (
    <div>
      <h2>Placeholder Data Example</h2>
      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Is Fetching:</strong> {isFetching ? "Yes 🔄" : "No ✅"}
        </p>
        <p>
          <strong>Is Placeholder Data:</strong>{" "}
          {isPlaceholderData ? "Yes (불완전)" : "No (완전)"}
        </p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          💡 preview 데이터(불완전)를 먼저 표시 → 완전한 데이터로 교체
        </p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          💡 placeholderData는 캐시에 저장되지 않음 (완전한 데이터만 저장)
        </p>
      </div>

      <div>
        <h3>Todos:</h3>
        {data?.map((todo) => (
          <div
            key={todo.id}
            style={{
              padding: "8px",
              marginBottom: "4px",
              backgroundColor: isPlaceholderData ? "#fff3cd" : "#d4edda",
            }}
          >
            {/* completed 필드가 있으면 표시 (완전한 데이터) */}
            {todo.completed !== undefined ? (
              <>
                <input type="checkbox" checked={todo.completed} readOnly />
                {todo.title}
              </>
            ) : (
              // completed 필드가 없으면 미표시 (불완전한 데이터)
              <>{todo.title} (preview만 있음)</>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
