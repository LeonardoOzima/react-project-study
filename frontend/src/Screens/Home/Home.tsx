import React from "react";
import { useEffect, useState } from "react";
import UserForm from "./Components/UserForm";
import UserType from "./Interfaces/UserType";
import UserBlock from "./Components/UserBlock";
import api from "../../Services/api";

function Home() {
  const [users, setUsers] = useState<UserType[]>([]);

  async function getUsers() {
    const resFromApi = await api.get("/users");
    setUsers(resFromApi.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <UserForm />
      {users.map((user) => (
        <UserBlock {...user} />
      ))}
    </>
  );
}

export default Home;
