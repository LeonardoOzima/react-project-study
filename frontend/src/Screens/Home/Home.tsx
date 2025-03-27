import React from "react";
import { useEffect, useState, useRef } from "react";
import UserForm from "./Components/UserForm";
import { UserBackendType } from "./Interfaces/UserTypes";
import UserBlock from "./Components/UserBlock";
import api from "../../Services/api";
import Navbar from "./Components/Navbar";

function Home() {
  const [users, setUsers] = useState<UserBackendType[]>([]);

  async function getUsers() {
    const resFromApi = await api.get("/users");
    setUsers(resFromApi.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar />
      <UserForm />
      {users.map((user) => (
        <UserBlock key={user.id} {...user} />
      ))}
    </>
  );
}

export default Home;
