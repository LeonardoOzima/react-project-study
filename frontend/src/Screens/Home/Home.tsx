import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserForm from "./Components/UserForm";
import { UserType } from "./Interfaces/UserTypes";
import { UserBackendType } from "./Interfaces/UserTypes";
import UserLine from "./Components/UserLine";
import api from "../../Services/api";
import Navbar from "./Components/Navbar";
import UserBlock from "./Components/UserBlock";
import { DataTable } from "../../components/data-table";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { usersData } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import DefaultHeader from "@/components/default-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
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
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("name", {
      header: (info) => <DefaultHeader info={info} name="Name" />,
      cell: (info) => info.getValue(), // string
    }),
    columnHelper.accessor("email", {
      header: (info) => <DefaultHeader info={info} name="Email" />,
      cell: (info) => info.getValue(), // string
    }),
    columnHelper.accessor("age", {
      header: (info) => <DefaultHeader info={info} name="Age" />,
      cell: (info) => info.getValue(), // number
    }),
    columnHelper.display({
      id: "more",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <MoreVertical></MoreVertical>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
              <DropdownMenuLabel className="">Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Copy</DropdownMenuItem>
              <DropdownMenuItem>Paste</DropdownMenuItem>
              <DropdownMenuItem>Cut</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ] as ColumnDef<UserType>[];

  return (
    <div className="flex min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
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
        <DataTable<UserType, string | number>
          columns={columns}
          data={usersData}
        />
      </div>
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
