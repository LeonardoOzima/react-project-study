// src/pages/Home/Components/UserDataTable.tsx

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const [openDialog, setOpenDialog] = useState<"edit" | "delete" | null>(null);
  const [selectedRow, setSelectedRow] = useState<UserType | null>(null);

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
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRow(user);
                  setOpenDialog("edit");
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRow(user);
                  setOpenDialog("delete");
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>Paste</DropdownMenuItem>
              <DropdownMenuItem>Cut</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ] as ColumnDef<UserType>[];

  return (
    <>
      <DataTable<UserType, string | number> columns={columns} data={data} />

      {/* Edit Dialog */}
      <Dialog
        open={openDialog === "edit"}
        onOpenChange={(open) => {
          if (!open) setOpenDialog(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Editing user: {selectedRow?.name}
              <br />
              Email: {selectedRow?.email}
              <br />
              Age: {selectedRow?.age}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={openDialog === "delete"}
        onOpenChange={(open) => {
          if (!open) setOpenDialog(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              {selectedRow?.name}
              <br /> This action cannot be undone. This will permanently delete
              the user and remove them from the list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" type="submit">
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
