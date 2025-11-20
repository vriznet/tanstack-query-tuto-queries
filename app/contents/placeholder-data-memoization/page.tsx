"use client";

import { getTodos, Todo } from "@/app/actions/todos";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";

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
  const functionCreationCountRef = useRef(0);

  const queryClient = useQueryClient();
  const [renderCount, setRenderCount] = useState(0);

  if (!queryClient.getQueryData(["todo-previews"])) {
    queryClient.setQueryData(["todo-previews"], todoPreviews);
  }

  /*
  나쁜 예: 매 렌더링마다 새로운 함수 객체가 생성됨
    const placeholderData = (() => {
    functionCreationCountRef.current++;
    console.log(`함수 객체 생성: ${functionCreationCountRef.current}번째`);

    return () => {
      return queryClient.getQueryData(["todo-previews"]) as Todo[];
    };
  })();
  */

  // 좋은 예: useMemo로 함수 객체를 메모이제이션
  const placeholderData = useMemo(() => {
    functionCreationCountRef.current++;
    console.log(`함수 객체 생성: ${functionCreationCountRef.current}번째`);

    return () => {
      return queryClient.getQueryData(["todo-previews"]) as Todo[];
    };
  }, []); // queryClient는 안정적인 참조이므로 의존성 불필요

  const { status, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    placeholderData, // 메모이제이션된 함수 전달
  });

  return (
    <div>
      <h2>Placeholder Data Memoization Example</h2>

      {/* 리렌더링 유발 버튼 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "16px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <button
          onClick={() => setRenderCount((c) => c + 1)}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          리렌더링 강제 실행 ({renderCount}번)
        </button>
        <p style={{ fontSize: "14px", marginTop: "8px", color: "#666" }}>
          💡 버튼 클릭 시 컴포넌트가 리렌더링되지만, useMemo 덕분에
          placeholderData 함수는 재생성되지 않음
        </p>
      </div>

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
          💡 useMemo가 없다면: 리렌더링마다 새 함수 생성 → 불필요한 재계산
        </p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          💡 useMemo가 있다면: queryClient가 변하지 않으면 함수 재사용
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
            {todo.completed !== undefined ? (
              <>
                <input type="checkbox" checked={todo.completed} readOnly />
                {todo.title}
              </>
            ) : (
              <>{todo.title} (preview만 있음)</>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
