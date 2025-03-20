import React from "react";

function UserForm() {
  return (
    <>
      <form className="bg-white p-4 shadow-md rounded-md flex flex-col w-1/2 space-y-2">
        <h1 className="text-xl font-bold mb-2">Cadastro</h1>

        <div className="flex flex-col gap-2">
          <input
            name="name"
            type="text"
            placeholder="Nome"
            className="input-style"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input-style"
          />

          <input
            name="age"
            type="number"
            placeholder="Idade"
            className="input-style"
          />
        </div>
      </form>
    </>
  );
}

export default UserForm;
