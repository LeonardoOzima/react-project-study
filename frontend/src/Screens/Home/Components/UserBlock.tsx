import React, { ReactNode } from "react";

interface UserBlockProps {
  children: ReactNode | ReactNode[]; // Aceita elementos únicos ou arrays
}

export default function UserBlock({ children }: UserBlockProps) {
  return (
    <div className="bg-slate-700 text-white flex flex-row p-4 rounded-t-lg w-full h-full">
      {children}
    </div>
  );
}
