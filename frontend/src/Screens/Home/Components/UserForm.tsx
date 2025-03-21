import React, { useState, useRef } from "react";
import api from "../../../Services/api";

function UserForm() {
  const [loading, setLoading] = useState(false); // Para gerenciar o estado de carregamento
  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);

  async function handleCreateUser() {
    if (
      !inputName.current?.value ||
      !inputEmail.current?.value ||
      !inputAge.current?.value
    ) {
      return;
    }

    setLoading(true); // Define o estado de carregamento como true

    try {
      await api.post("/users", {
        name: inputName.current?.value,
        age: inputAge.current?.value,
        email: inputEmail.current?.value,
      });
    } catch (error) {
      console.error("Erro ao criar usuário", error);
    } finally {
      setLoading(false); // Define o estado de carregamento como false após a requisição
    }
  }

  return (
    <form className="bg-white p-4 shadow-md rounded-md flex flex-col w-1/2 space-y-2">
      <h1 className="text-xl font-bold mb-2">Cadastro</h1>

      <div className="flex flex-col gap-2">
        <input
          name="name"
          type="text"
          placeholder="Nome"
          className="input-style"
          ref={inputName}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input-style"
          ref={inputEmail}
        />

        <input
          name="age"
          type="number"
          placeholder="Idade"
          className="input-style"
          ref={inputAge}
        />
        <button
          type="button"
          onClick={handleCreateUser}
          disabled={loading} // Desabilita o botão enquanto a requisição está em andamento
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
