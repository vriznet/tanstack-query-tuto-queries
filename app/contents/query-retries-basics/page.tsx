"use client";

import { useQuery } from "@tanstack/react-query";
import { Todo } from "@/app/actions/todos";

// 처음 3번은 실패하고 4번째(3번 재시도 후)에 성공하는 함수
let attemptCount = 0;

async function fetchTodos(): Promise<Todo[]> {
  attemptCount++;
  console.log(`Attempt ${attemptCount}`);

  await new Promise((resolve) => setTimeout(resolve, 500));

  // 3번째 재시도(총 4번째 시도)까지 실패
  if (attemptCount < 4) {
    throw new Error(`Failed attempt ${attemptCount}`);
  }

  // 4번째 시도에 성공
  return [
    { id: "1", title: "Learn TanStack Query", completed: false },
    { id: "2", title: "Learn Server Actions", completed: true },
    { id: "3", title: "Build Amazing Apps", completed: false },
  ];
}

export default function QueryRetries() {
  const { status, data, error, failureCount, failureReason } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    retry: 3, // 3번 재시도 (총 4번 시도)
  });

  return (
    <div>
      <h2>Query Retries Example</h2>
      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Failure Count:</strong> {failureCount}
        </p>
        {failureReason && (
          <p>
            <strong>Failure Reason:</strong> {failureReason.message}
          </p>
        )}
      </div>

      {status === "pending" && <div>Loading... (재시도 중)</div>}
      {status === "error" && <div>Error: {error.message}</div>}
      {status === "success" && (
        <div>
          <h3>Todos List (재시도 성공!)</h3>
          {data.map((todo) => (
            <div key={todo.id}>
              <input type="checkbox" checked={todo.completed} readOnly />
              {todo.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
