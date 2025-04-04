import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserForm from "./Components/UserForm";
import { UserBackendType } from "./Interfaces/UserTypes";
import UserLine from "./Components/UserLine";
import api from "../../Services/api";
import Navbar from "./Components/Navbar";
import UserBlock from "./Components/UserBlock";

function Home() {
  async function fetchUsers(): Promise<UserBackendType[]> {
    const response = await api.get<UserBackendType[]>("/users");
    return response.data;
  }

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<UserBackendType[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <div className="flex items-center space-y-4">
        <Navbar />
        <div className="flex flex-col w-screen h-screen items-center justify-center">
          <UserForm />
          <UserBlock>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
              <p className="text-white">Loading...</p>
            </div>
          </UserBlock>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center space-y-4">
        <Navbar />
        <div className="flex flex-col w-screen h-screen items-center justify-center">
          <UserForm />
          <UserBlock>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <p className="text-red-500">Error: {error.message}</p>
            </div>
          </UserBlock>
        </div>
      </div>
    );
  }

  if (!users) {
    return null;
  }

  return (
    <div className="flex items-center space-y-4">
      <Navbar />
      <div className="flex flex-col w-screen h-screen items-center justify-center">
        <UserForm />
        <UserBlock>
          {users.map((user) => (
            <UserLine key={user.id} {...user} />
          ))}
        </UserBlock>
      </div>
    </div>
  );
}

export default Home;
