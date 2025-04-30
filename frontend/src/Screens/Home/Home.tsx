import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserForm from "./Components/UserForm";
import { UserBackendType } from "./Interfaces/UserTypes";
import UserLine from "./Components/UserLine";
import api from "../../Services/api";
import Navbar from "./Components/Navbar";
import UserBlock from "./Components/UserBlock";
import { usersData } from "@/lib/data";
import UserDataTable from "./Components/UserDataTable";

function Home() {
  const { data: users, isLoading, isError, error } = useUsersQuery();

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1 ml-[16.666%] md:ml-[8.333%] p-4 flex flex-col gap-4">
        <UserForm />
        <UserBlock>
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <ErrorMessage error={error} />
          ) : (
            <UserList users={users} />
          )}
        </UserBlock>
        <UserDataTable data={usersData} />
      </div>
    </div>
  );
}

function useUsersQuery() {
  return useQuery<UserBackendType[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get<UserBackendType[]>("/users");
      return response.data;
    },
  });
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      <p className="text-white">Loading...</p>
    </div>
  );
}

function ErrorMessage({ error }: { error: unknown }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-red-500">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </p>
    </div>
  );
}

function UserList({ users }: { users: UserBackendType[] | undefined }) {
  if (!users || users.length === 0) {
    return <p className="text-white">No users found</p>;
  }

  return (
    <>
      {users.map((user) => (
        <UserLine key={user.id} {...user} />
      ))}
    </>
  );
}

export default Home;
