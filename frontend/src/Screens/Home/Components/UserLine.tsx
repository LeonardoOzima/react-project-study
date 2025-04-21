import React from "react";
import { UserBackendType } from "../Interfaces/UserTypes";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../../../Services/api";

export default function UserLine(user: UserBackendType) {
  async function handleDeleteUser(id: string) {
    await api.delete(`/users/${id}`);
    console.log("Usuário deletado com sucesso");
  }

  return (
    <>
      <div className="bg-slate-700 text-white flex flex-row p-4 rounded-lg">
        <div className="flex flex-col p-4 justify-center align-middle">
          {" "}
          <span>Nome </span>
          <span>Idade </span>
          <span>Email</span>
        </div>
        <div className="flex flex-col px-4 bg-white text-black justify-center align-middle">
          <h1> {user.name}</h1>
          <h1> {user.age} </h1>
          <h1> {user.email} </h1>
        </div>
        <div className="bg-white text-black flex flex-col align-middle justify-center">
          <button
            className="flex align-middle justify-center 
          bg-gray-500 p-4 rounded-full w-12 h-12 items-center"
          >
            Editar
          </button>
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="text-red-800 hover:text-white
            bg-slate-300 hover:bg-red-800 rounded-full
            transition-all duration-300 ease-linear
             flex align-middle justify-center w-12 h-12 items-center"
          >
            <FaRegTrashAlt size={20}></FaRegTrashAlt>
          </button>
        </div>
      </div>
    </>
  );
}
