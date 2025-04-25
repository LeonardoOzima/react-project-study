import { HeaderContext } from "@tanstack/react-table";
import { UserType } from "../Screens/Home/Interfaces/UserTypes";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuCheckboxItem,
} from "./ui/context-menu";
import React from "react";
import {} from "@radix-ui/react-context-menu";

interface DefaultHeaderProps<T> {
  info: HeaderContext<UserType, T>;
  name: string;
}

export function DefaultHeader<T>({ info, name }: DefaultHeaderProps<T>) {
  const isSorted = info.column.getIsSorted();
  const { table } = info;
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          onPointerDown={(e) => {
            if (e.button === 2) return; // Prevent right-click from triggering sorting
            e.preventDefault();
            info.column.toggleSorting(info.column.getIsSorted() === "asc");
          }}
          className="flex w-full h-full justify-start items-center"
        >
          {name}
          {isSorted === "asc" && <FaSortAlphaUp />}
          {isSorted === "desc" && <FaSortAlphaDown />}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <ContextMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => {
                column.toggleVisibility(!!value);
              }}
            >
              {column.id}
            </ContextMenuCheckboxItem>
          ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default DefaultHeader;
