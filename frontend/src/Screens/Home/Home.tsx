import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserForm from "./Components/UserForm";
import { UserType } from "./Interfaces/UserTypes";
import { UserBackendType } from "./Interfaces/UserTypes";
import UserLine from "./Components/UserLine";
import api from "../../Services/api";
import Navbar from "./Components/Navbar";
import UserBlock from "./Components/UserBlock";
import { DataTable } from "../data-table";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { usersData } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";

function Home() {
  const { data: users, isLoading, isError, error } = useUsersQuery();
  const columnHelper = createColumnHelper<UserType>();

  const columns: ColumnDef<UserType>[] = [
    columnHelper.display({
      id: "action",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(), // string
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(), // string
    }),
    columnHelper.accessor("age", {
      header: "Age",
      cell: (info) => info.getValue(), // number
    }),
  ] as ColumnDef<UserType>[];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center p-4">
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
        <DataTable<UserType, string | number>
          columns={columns}
          data={usersData}
        />
      </main>
    </div>
  );
}

// Custom hook for query logic
function useUsersQuery() {
  return useQuery<UserBackendType[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get<UserBackendType[]>("/users");
      return response.data;
    },
  });
}

// Extracted components
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
