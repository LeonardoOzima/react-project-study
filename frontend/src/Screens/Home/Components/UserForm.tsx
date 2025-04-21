import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserType from "../Interfaces/UserTypes";

const schema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  age: z.coerce.number().gte(18, "Deve ser maior de 18 anos"),
});

type FormFields = z.infer<typeof schema>;

function UserForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "anonymous",
      email: "anonymous@",
      age: 20,
    },
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false); // Para gerenciar o estado de carregamento

  const onSubmit: SubmitHandler<UserType> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 shadow-md rounded-md flex flex-col w-1/2 space-y-2"
    >
      <h1 className="text-xl font-bold mb-2">Cadastro</h1>

      <div className="flex flex-col gap-2">
        <input
          {...register("name")}
          name="name"
          type="text"
          placeholder="Nome"
          className="input-style"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        <input
          {...register("email")}
          name="email"
          type="email"
          placeholder="Email"
          className="input-style"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <input
          {...register("age")}
          name="age"
          type="number"
          placeholder="Idade"
          className="input-style"
        />
        {errors.age && (
          <span className="text-red-500">{errors.age.message}</span>
        )}
        <button
          type="submit"
          disabled={loading} // Desabilita o botão enquanto a requisição está em andamento
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
