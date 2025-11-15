"use client";

import { useQueries, useQuery } from "@tanstack/react-query";

const usersData = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Alice Johnson", email: "alice@example.com" },
];

const messagesData = [
  { id: "201", content: "Hello!", userId: "1" },
  { id: "202", content: "How are you?", userId: "1" },
  { id: "203", content: "Good morning", userId: "2" },
  { id: "204", content: "Good night", userId: "3" },
];

async function getUsers() {
  // Simulate fetching user data
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return usersData;
}

// Mock function for fetching messages by user ID
async function getMessagesByUsers(userId: string) {
  // Simulate fetching messages data
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return messagesData.filter((message) => message.userId === userId);
}

export default function DependentQueries() {
  const { status: getUsersStatus, data: userIds } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    select: (users) => users.map((user) => user.id),
  });

  const usersMessages = useQueries({
    queries: userIds
      ? userIds.map((id) => {
          return {
            queryKey: ["messages", id],
            queryFn: () => getMessagesByUsers(id),
          };
        })
      : [], // if userIds is undefined, an empty array will be returned
  });

  if (getUsersStatus === "pending") {
    return <div>Loading user IDs...</div>;
  }
  if (getUsersStatus === "error") {
    return <div>Error fetching user IDs</div>;
  }

  return (
    <div>
      <h2>Users Messages</h2>
      {usersMessages.map((result, index) => {
        if (result.status === "pending") {
          return <div key={index}>Loading messages...</div>;
        }
        if (result.status === "error") {
          return <div key={index}>Error fetching messages</div>;
        }
        if (result.data) {
          return (
            <div key={index}>
              {result.data?.map((message) => (
                <div key={message.id}>
                  {usersData.find((user) => user.id === message.userId)?.name}
                  {": "}
                  {message.content}
                </div>
              ))}
            </div>
          );
        }
        return <div key={index}>No messages found</div>;
      })}
    </div>
  );
}
