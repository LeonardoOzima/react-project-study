import React from "react";
import UserType from "../Interfaces/UserType";

export default function UserBlock(user: UserType) {
  return (
    <>
      <div className="bg-slate-700 text-white p-4 rounded-lg">
        <h1>{user.name} </h1>
        <h2>{user.age} </h2>
        <h3>{user.email} </h3>
        <div className="bg-white text-black rounded-md">
          <button>Editar</button>
          <button>Excluir</button>
        </div>
      </div>
    </>
  );
}
