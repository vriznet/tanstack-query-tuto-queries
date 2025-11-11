"use client";

import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../actions/todos";

export default function QueryBasics() {
  const { status, fetchStatus, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // The query is currently fetching
  if (fetchStatus === "fetching") {
    return <div>Loading...</div>;
  }
  // The query wanted to fetch, but it is paused. Commonly happens with network connectivity issues.
  if (fetchStatus === "paused") {
    return <div>Fetch Paused...</div>;
  }
  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }
  // The query is not doing anything at the moment and has data
  if (fetchStatus === "idle" && data) {
    return (
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.title}
          </li>
        ))}
      </ul>
    );
  }
  /*
  왜 status와 fetchStatus라는 두개의 다른 상태를 쓰는가.
  백그라운드 재요청과 stale-while-revalidate 로직 때문에 `status`와 `fetchStatus`의 모든 조합이 가능할 수 있습니다. 예를 들어:

  - `success` 상태의 쿼리는 보통 `idle` fetchStatus이지만, 백그라운드 재요청 중이라면 `fetching`일 수도 있습니다.
  - 마운트되었으나 데이터가 없는 쿼리는 보통 `pending` 상태이면서 `fetching` fetchStatus이지만, 네트워크 연결이 없다면 `paused`일 수도 있습니다.

  따라서 쿼리가 실제로 데이터를 가져오지 않더라도 status는 `pending` 일 수 있다는 점을 기억하세요. 요점은 다음과 같습니다.
  - status는 `data`에 대한 정보입니다. 데이터가 있는가 없는가?
  - fetchStatus는 `queryFn`에 대한 정보입니다. 실행 중인가 아닌가?
  */

  return <div>No todos found</div>;
}
