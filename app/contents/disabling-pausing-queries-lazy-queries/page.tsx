"use client";

import { getTodosWithFilter, Todo } from "@/app/actions/todos";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type FiltersFormProps = {
  onApply: (value: string) => void;
};

function FiltersForm({ onApply }: FiltersFormProps) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onApply(value?.trim()); // 공백 제거 후 적용
      }}
      style={{ display: "flex", gap: 8, marginBottom: 12 }}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Filter 입력 후 Apply 클릭"
      />
      <button type="submit">Apply</button>
      <button
        type="button"
        onClick={() => {
          setValue("");
          onApply(""); // 필터 해제
        }}
      >
        Clear
      </button>
    </form>
  );
}

function TodosTable({ data }: { data: Todo[] }) {
  if (!data.length) return <div>결과가 없습니다.</div>;
  return (
    <table border={1} cellPadding={6} style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {data.map((t) => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.title}</td>
            <td>{t.completed ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function DisablingPausingQueries() {
  const [filter, setFilter] = useState("");

  const { data } = useQuery({
    queryKey: ["todos", filter],
    queryFn: () => getTodosWithFilter(filter),
    // disabled as long as filter is empty
    enabled: !!filter,
  });

  return (
    <div>
      <FiltersForm onApply={setFilter} />
      {data && <TodosTable data={data} />}
    </div>
  );
}
