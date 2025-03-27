import React from "react";
import UserType from "../Interfaces/UserTypes";
import { UserBackendType } from "../Interfaces/UserTypes";
import api from "../../../Services/api";

export default function UserBlock(user: UserBackendType) {
  async function handleDeleteUser(id: string) {
    await api.delete(`/users/${id}`);
    console.log("Usuário deletado com sucesso");
  }

  return (
    <>
      <div className="bg-slate-700 text-white p-4 rounded-lg">
        <h1>{user.name} </h1>
        <h2>{user.age} </h2>
        <h3>{user.email} </h3>
        <div className="bg-white text-black rounded-md">
          <button>Editar</button>
          <button onClick={() => handleDeleteUser(user.id)}>Excluir</button>
        </div>
      </div>
    </>
  );
}
