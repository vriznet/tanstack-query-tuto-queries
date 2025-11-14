"use client";

import { useQuery } from "@tanstack/react-query";

// Mock function for fetching user by email
async function getUserByEmail(email: string) {
  // Simulate fetching user data
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: "1",
    name: "John Doe",
    email: email,
    todoId: "2",
  };
}

// Mock function for fetching projects by user ID
async function getProjectsByUserId(userId: string) {
  // Simulate fetching projects data
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: "101", name: "Project A", userId: userId },
    { id: "102", name: "Project B", userId: userId },
  ];
}

export default function DependentQueries() {
  const email = "user@example.com";
  const { status: getUserStatus, data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: () => getUserByEmail(email),
  });

  const userId = user?.id;

  const { status: getProjectsStatus, data: projects } = useQuery({
    queryKey: ["projects", userId],
    queryFn: () => getProjectsByUserId(userId!),
    enabled: !!userId, // The query will not execute until the userId exists
  });

  if (getUserStatus === "pending") {
    return <div>Loading user data...</div>;
  }
  if (getProjectsStatus === "pending") {
    return <div>Loading projects data...</div>;
  }
  if (getUserStatus === "error") {
    return <div>Error fetching user data</div>;
  }
  if (getProjectsStatus === "error") {
    return <div>Error fetching projects data</div>;
  }
  return (
    <div>
      <h2>User Projects</h2>
      <div>User: {user?.name}</div>
      <ul>
        {projects?.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}
