// src/pages/Home/Components/UserDataTable.tsx

import React from "react";
import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { UserType } from "../Interfaces/UserTypes";
import DefaultHeader from "@/components/default-header";

interface UserDataTableProps {
  data: UserType[];
}

export default function UserDataTable({ data }: UserDataTableProps) {
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

  return <DataTable<UserType, string | number> columns={columns} data={data} />;
}
